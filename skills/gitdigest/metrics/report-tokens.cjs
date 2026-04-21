#!/usr/bin/env node
/**
 * gitdigest token report — aggregates the JSONL telemetry log.
 *
 * Usage:
 *   node metrics/report-tokens.js [--since 7d|30d|YYYY-MM-DD] [--format text|json] [--top N]
 *
 * Environment:
 *   GITDIGEST_TOKEN_LOG   Override log path.
 *
 * Outputs totals, by-day breakdown, and the top-N largest runs. Safe to run
 * against an empty or missing log (prints an empty report instead of failing).
 *
 * Implements R7 from BOAA-226 / BOAA-233.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const LOG_PATH =
  process.env.GITDIGEST_TOKEN_LOG ||
  path.join(
    os.homedir(),
    '.paperclip',
    'instances',
    'default',
    'telemetry',
    'gitdigest-tokens.jsonl'
  );

function parseArgs(argv) {
  const opts = { since: null, format: 'text', top: 5 };
  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--since':
        opts.since = argv[++i];
        break;
      case '--format':
        opts.format = argv[++i];
        break;
      case '--top':
        opts.top = parseInt(argv[++i], 10);
        break;
      default:
        process.stderr.write(`Unknown argument: ${argv[i]}\n`);
        process.exit(1);
    }
  }
  return opts;
}

function resolveSince(since) {
  if (!since) return null;
  const rel = /^(\d+)d$/.exec(since);
  if (rel) {
    const days = parseInt(rel[1], 10);
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - days);
    return d;
  }
  const d = new Date(since);
  if (Number.isNaN(d.getTime())) {
    process.stderr.write(`Invalid --since value: ${since}\n`);
    process.exit(1);
  }
  return d;
}

function readRecords(logPath) {
  if (!fs.existsSync(logPath)) return [];
  const raw = fs.readFileSync(logPath, 'utf8');
  const out = [];
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      out.push(JSON.parse(trimmed));
    } catch {
      // Skip malformed lines silently.
    }
  }
  return out;
}

function dayKey(ts) {
  return ts.slice(0, 10); // YYYY-MM-DD
}

function aggregate(records) {
  const byDay = {};
  let totalTokens = 0;
  let totalRuns = 0;
  let warnRuns = 0;

  for (const r of records) {
    const t = Number.isFinite(r.tokensUsed) ? r.tokensUsed : 0;
    totalTokens += t;
    totalRuns += 1;
    if (r.warn) warnRuns += 1;
    const d = dayKey(r.ts || '');
    if (!byDay[d]) byDay[d] = { runs: 0, tokens: 0 };
    byDay[d].runs += 1;
    byDay[d].tokens += t;
  }

  return { totalTokens, totalRuns, warnRuns, byDay };
}

function formatText(agg, topRuns) {
  const lines = [];
  lines.push('# gitdigest token usage report');
  lines.push('');
  lines.push(`Total runs:   ${agg.totalRuns}`);
  lines.push(`Total tokens: ${agg.totalTokens}`);
  lines.push(`Warn runs:    ${agg.warnRuns}`);
  lines.push('');
  lines.push('## By day');
  const days = Object.keys(agg.byDay).sort();
  if (days.length === 0) {
    lines.push('(no data)');
  } else {
    for (const d of days) {
      const e = agg.byDay[d];
      lines.push(`  ${d}  runs=${e.runs}  tokens=${e.tokens}`);
    }
  }
  lines.push('');
  lines.push('## Largest runs');
  if (topRuns.length === 0) {
    lines.push('(no data)');
  } else {
    for (const r of topRuns) {
      lines.push(
        `  ${r.ts}  tokens=${r.tokensUsed}  task=${r.taskId || 'n/a'}  chunks=${r.chunks || 1}`
      );
    }
  }
  return lines.join('\n') + '\n';
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const since = resolveSince(opts.since);

  let records = readRecords(LOG_PATH);
  if (since) {
    records = records.filter((r) => {
      const d = new Date(r.ts);
      return !Number.isNaN(d.getTime()) && d >= since;
    });
  }

  const agg = aggregate(records);
  const topRuns = records
    .slice()
    .sort(
      (a, b) =>
        (Number.isFinite(b.tokensUsed) ? b.tokensUsed : 0) -
        (Number.isFinite(a.tokensUsed) ? a.tokensUsed : 0)
    )
    .slice(0, opts.top);

  if (opts.format === 'json') {
    process.stdout.write(
      JSON.stringify(
        {
          logPath: LOG_PATH,
          since: since ? since.toISOString() : null,
          totals: {
            runs: agg.totalRuns,
            tokens: agg.totalTokens,
            warnRuns: agg.warnRuns,
          },
          byDay: agg.byDay,
          topRuns,
        },
        null,
        2
      ) + '\n'
    );
  } else {
    process.stdout.write(formatText(agg, topRuns));
  }
}

main();
