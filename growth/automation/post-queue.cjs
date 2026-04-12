#!/usr/bin/env node
/**
 * post-queue.js — X Content Queue Posting Pipeline
 * WS3-T2b: Mock pipeline (no real API calls when X_MOCK_MODE=true)
 * WS3-T3:  Real X API v2 posting (when X_MOCK_MODE=false and credentials set)
 *
 * Usage:
 *   node post-queue.js              # Run pipeline (respects X_MOCK_MODE env)
 *   node post-queue.js --dry-run    # Force dry-run regardless of env
 *
 * Required env vars (real mode only):
 *   X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET
 *
 * Optional env vars:
 *   X_MOCK_MODE=true   (default: true for safety — set false for real posting)
 *   QUEUE_BASE_DIR     (default: auto-detected relative to this script)
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const MOCK_MODE =
  process.argv.includes("--dry-run") ||
  process.env.X_MOCK_MODE !== "false"; // Default: mock ON for safety

const SCRIPT_DIR = __dirname;
const QUEUE_BASE = process.env.QUEUE_BASE_DIR
  ? path.resolve(process.env.QUEUE_BASE_DIR)
  : path.resolve(SCRIPT_DIR, "../queue");

const DIRS = {
  scheduled: path.join(QUEUE_BASE, "scheduled"),
  published: path.join(QUEUE_BASE, "published"),
  archived:  path.join(QUEUE_BASE, "archived"),
  draft:     path.join(QUEUE_BASE, "draft"),
};
const QUEUE_LOG = path.join(QUEUE_BASE, "queue-log.md");

// ---------------------------------------------------------------------------
// Front matter parser (handles the YAML subset used in the queue format)
// ---------------------------------------------------------------------------

function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const raw = match[1];
  const body = match[2].trim();
  const meta = {};

  for (const line of raw.split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w_-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    // Unquote strings, parse null/true/false/numbers
    if (value === "null" || value === "~" || value === "") {
      meta[key] = null;
    } else if (value === "true") {
      meta[key] = true;
    } else if (value === "false") {
      meta[key] = false;
    } else if (/^\d+$/.test(value)) {
      meta[key] = parseInt(value, 10);
    } else if (/^\[.*\]$/.test(value)) {
      // Simple array: [a, b, c]
      meta[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      meta[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return { meta, body };
}

function serializeFrontMatter(meta, body) {
  const lines = ["---"];
  for (const [k, v] of Object.entries(meta)) {
    if (v === null || v === undefined) {
      lines.push(`${k}: null`);
    } else if (Array.isArray(v)) {
      lines.push(`${k}: [${v.join(", ")}]`);
    } else if (typeof v === "boolean") {
      lines.push(`${k}: ${v}`);
    } else {
      lines.push(`${k}: ${v}`);
    }
  }
  lines.push("---");
  lines.push("");
  lines.push(body);
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Queue log
// ---------------------------------------------------------------------------

function appendLog(entry) {
  const timestamp = new Date().toISOString();
  const block = [
    `## [${timestamp}] ${entry.action}`,
    `- File: ${entry.file}`,
    `- Platform: ${entry.platform}`,
    `- Status: ${entry.status}`,
    `- Post ID: ${entry.postId || "null"}`,
    `- Error: ${entry.error || "null"}`,
    "",
  ].join("\n");

  // Prepend after the header comment
  let log = fs.existsSync(QUEUE_LOG) ? fs.readFileSync(QUEUE_LOG, "utf8") : "# Queue Log\n\n";
  const insertAfter = "<!-- Pipeline appends entries here in reverse-chronological order -->";
  const insertIdx = log.indexOf(insertAfter);
  if (insertIdx !== -1) {
    const before = log.slice(0, insertIdx + insertAfter.length);
    const after = log.slice(insertIdx + insertAfter.length);
    log = before + "\n\n" + block + after;
  } else {
    log += "\n" + block;
  }
  fs.writeFileSync(QUEUE_LOG, log, "utf8");
}

// ---------------------------------------------------------------------------
// File management
// ---------------------------------------------------------------------------

function ensureDirs() {
  for (const dir of Object.values(DIRS)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getScheduledFiles() {
  if (!fs.existsSync(DIRS.scheduled)) return [];
  return fs
    .readdirSync(DIRS.scheduled)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(DIRS.scheduled, f));
}

function isDue(meta) {
  if (!meta.scheduled_at) return false;
  if (meta.status !== "scheduled") return false;
  return new Date(meta.scheduled_at) <= new Date();
}

function markPublished(filePath, meta, body, postId) {
  const now = new Date().toISOString();
  const updatedMeta = { ...meta, status: "published", published_at: now };
  const newContent = serializeFrontMatter(updatedMeta, body);

  const filename = path.basename(filePath);
  const destPath = path.join(DIRS.published, filename);
  fs.writeFileSync(destPath, newContent, "utf8");
  fs.unlinkSync(filePath);
  return destPath;
}

// ---------------------------------------------------------------------------
// Thread parser
// ---------------------------------------------------------------------------

/**
 * Parse [tweet-N]...[/tweet-N] blocks from a thread body.
 * Returns an array of trimmed tweet text strings in order.
 * If no blocks are found, returns the full body as a single-element array.
 */
function parseThread(body) {
  const tweets = [];
  const re = /\[tweet-\d+\]([\s\S]*?)\[\/tweet-\d+\]/g;
  let match;
  while ((match = re.exec(body)) !== null) {
    const text = match[1].trim();
    if (text) tweets.push(text);
  }
  return tweets.length > 0 ? tweets : [body.trim()];
}

// ---------------------------------------------------------------------------
// X API v2 — Real posting (WS3-T3)
// ---------------------------------------------------------------------------

function buildOAuthHeader(method, url, params) {
  const oauthParams = {
    oauth_consumer_key: process.env.X_API_KEY,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: process.env.X_ACCESS_TOKEN,
    oauth_version: "1.0",
  };

  const allParams = { ...params, ...oauthParams };
  const sortedKeys = Object.keys(allParams).sort();
  const paramStr = sortedKeys
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(allParams[k])}`)
    .join("&");

  const sigBase = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(paramStr),
  ].join("&");

  const sigKey = [
    encodeURIComponent(process.env.X_API_SECRET),
    encodeURIComponent(process.env.X_ACCESS_TOKEN_SECRET),
  ].join("&");

  const signature = crypto
    .createHmac("sha1", sigKey)
    .update(sigBase)
    .digest("base64");

  oauthParams.oauth_signature = signature;

  const headerParts = Object.entries(oauthParams)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
    .join(", ");

  return `OAuth ${headerParts}`;
}

function xApiPost(text, inReplyToTweetId = null) {
  return new Promise((resolve, reject) => {
    const url = "https://api.twitter.com/2/tweets";
    const payload = { text };
    if (inReplyToTweetId) {
      payload.reply = { in_reply_to_tweet_id: inReplyToTweetId };
    }
    const body = JSON.stringify(payload);
    const authHeader = buildOAuthHeader("POST", url, {});

    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode === 201) {
            const parsed = JSON.parse(data);
            resolve(parsed.data?.id || "unknown");
          } else {
            reject(new Error(`X API error ${res.statusCode}: ${data}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/**
 * Post a thread: tweet each segment sequentially, chaining replies.
 * Returns the tweet ID of the first (root) tweet.
 */
async function xApiPostThread(tweets) {
  let prevId = null;
  let rootId = null;
  for (const text of tweets) {
    const id = await xApiPost(text, prevId);
    if (!rootId) rootId = id;
    prevId = id;
  }
  return rootId;
}

// ---------------------------------------------------------------------------
// Main pipeline
// ---------------------------------------------------------------------------

async function processPost(filePath) {
  const filename = path.basename(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  const { meta, body } = parseFrontMatter(content);

  if (!isDue(meta)) return null; // Not due yet

  const forceDryRun = meta.dry_run === true;
  const isMock = MOCK_MODE || forceDryRun;

  console.log(`[${filename}] Due. Mock=${isMock}`);

  let postId = null;
  let error = null;
  let status;

  try {
    if (isMock) {
      // Mock mode: log and move, no API call
      postId = `mock-${Date.now()}`;
      status = forceDryRun ? "dry-run" : "dry-run (mock mode)";
      if (meta.content_type === "thread") {
        const tweets = parseThread(body);
        console.log(`[${filename}] Thread: ${tweets.length} tweet(s) (mock)`);
      }
    } else {
      // Real X API call
      if (meta.platform !== "x" && meta.platform !== "both") {
        console.log(`[${filename}] Platform ${meta.platform} — X posting skipped`);
        return null;
      }

      if (meta.content_type === "thread") {
        const tweets = parseThread(body);
        console.log(`[${filename}] Posting thread: ${tweets.length} tweet(s)`);
        postId = await xApiPostThread(tweets);
      } else {
        // content_type === "post" (or unspecified): single tweet, 280 char limit
        postId = await xApiPost(body.slice(0, 280));
      }
      status = "success";
    }

    // Move to published and update front matter
    markPublished(filePath, meta, body, postId);

    appendLog({
      action: "publish",
      file: filename,
      platform: meta.platform,
      status,
      postId,
      error: null,
    });

    console.log(`[${filename}] Published. Post ID: ${postId}`);
    return { filename, status, postId };
  } catch (err) {
    error = err.message;
    status = "failure";

    appendLog({
      action: "publish-failed",
      file: filename,
      platform: meta.platform,
      status,
      postId: null,
      error,
    });

    console.error(`[${filename}] FAILED: ${error}`);
    return { filename, status, error };
  }
}

async function main() {
  console.log("=== X Content Queue Pipeline ===");
  console.log(`Mode: ${MOCK_MODE ? "MOCK (no real API calls)" : "REAL (live X API)"}`);
  console.log(`Queue: ${QUEUE_BASE}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log("");

  ensureDirs();

  const files = getScheduledFiles();
  console.log(`Scheduled files: ${files.length}`);

  if (files.length === 0) {
    console.log("No files in scheduled/. Nothing to do.");
    return;
  }

  let processed = 0;
  let skipped = 0;
  const results = [];

  for (const filePath of files) {
    const result = await processPost(filePath);
    if (result) {
      processed++;
      results.push(result);
    } else {
      skipped++;
    }
  }

  console.log("");
  console.log(`=== Done: ${processed} published, ${skipped} not yet due ===`);
  if (results.length > 0) {
    console.log("Results:");
    for (const r of results) {
      console.log(`  ${r.filename}: ${r.status}${r.postId ? ` (id: ${r.postId})` : ""}${r.error ? ` ERROR: ${r.error}` : ""}`);
    }
  }
}

main().catch((err) => {
  console.error("Pipeline crashed:", err);
  process.exit(1);
});
