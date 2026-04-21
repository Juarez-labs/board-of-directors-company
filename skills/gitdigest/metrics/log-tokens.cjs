#!/usr/bin/env node
/**
 * gitdigest token logger — append-only telemetry for gitdigest runs.
 *
 * Reads a run-digest.js JSON result from stdin (or --file), extracts token
 * usage, and appends one JSONL record to the telemetry log. Emits a stderr
 * alert when a single run exceeds a configurable token threshold.
 *
 * Usage:
 *   git diff ... | node run-digest.js | node metrics/log-tokens.js
 *   node metrics/log-tokens.js --file /tmp/digest.json
 *
 * Environment:
 *   GITDIGEST_TOKEN_LOG      Override log path.
 *   GITDIGEST_TOKEN_ALERT    Per-run alert threshold (default: 50000).
 *   PAPERCLIP_TASK_ID        Optional — recorded if present.
 *   PAPERCLIP_RUN_ID         Optional — recorded if present.
 *   PAPERCLIP_AGENT_NAME     Optional — recorded if present.
 *
 * Output:
 *   - Echoes the original JSON input to stdout unchanged (so this stays
 *     pipeline-composable).
 *   - Appends one JSONL record to the log file.
 *   - Writes a single stderr alert line if tokensUsed > threshold.
 *
 * Implements R7 from BOAA-226 / BOAA-233.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const DEFAULT_LOG =
  process.env.GITDIGEST_TOKEN_LOG ||
  path.join(
    os.homedir(),
    '.paperclip',
    'instances',
    'default',
    'telemetry',
    'gitdigest-tokens.jsonl'
  );

const ALERT_THRESHOLD = parseInt(
  process.env.GITDIGEST_TOKEN_ALERT || '50000',
  10
);

function parseArgs(argv) {
  const opts = { file: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--file') opts.file = argv[++i];
    else {
      process.stderr.write(`Unknown argument: ${argv[i]}\n`);
      process.exit(1);
    }
  }
  return opts;
}

function readInput(file) {
  if (file) return fs.readFileSync(file, 'utf8');
  return fs.readFileSync('/dev/stdin', 'utf8');
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const raw = readInput(opts.file);

  if (!raw.trim()) {
    process.stderr.write('[gitdigest-metrics] No input; nothing to log.\n');
    process.exit(0);
  }

  let digest;
  try {
    digest = JSON.parse(raw);
  } catch (err) {
    process.stderr.write(
      `[gitdigest-metrics] Failed to parse digest JSON: ${err.message}\n`
    );
    // Pass through anyway so we don't break the pipeline.
    process.stdout.write(raw);
    process.exit(1);
  }

  const tokensUsed = Number.isFinite(digest.tokensUsed) ? digest.tokensUsed : 0;
  const record = {
    ts: new Date().toISOString(),
    taskId: process.env.PAPERCLIP_TASK_ID || null,
    runId: process.env.PAPERCLIP_RUN_ID || null,
    agent: process.env.PAPERCLIP_AGENT_NAME || null,
    tokensUsed,
    chunks: digest.chunks || 1,
    warn: !!digest.warn,
  };

  try {
    fs.mkdirSync(path.dirname(DEFAULT_LOG), { recursive: true });
    fs.appendFileSync(DEFAULT_LOG, JSON.stringify(record) + '\n');
  } catch (err) {
    process.stderr.write(
      `[gitdigest-metrics] Failed to write log at ${DEFAULT_LOG}: ${err.message}\n`
    );
  }

  if (tokensUsed > ALERT_THRESHOLD) {
    process.stderr.write(
      `[gitdigest-metrics] ALERT: single run used ${tokensUsed} tokens ` +
        `(threshold ${ALERT_THRESHOLD}). taskId=${record.taskId || 'n/a'}\n`
    );
  }

  // Pass-through so the pipeline stays composable.
  process.stdout.write(raw.endsWith('\n') ? raw : raw + '\n');
}

main();
