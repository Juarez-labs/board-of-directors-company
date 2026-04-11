#!/usr/bin/env node
/**
 * post-d2-thread.cjs — D2 Twitter Poll + Announcement Thread
 * BOAA-154 one-shot script: posts D2 poll tweet + 7-tweet thread
 *
 * Requires env vars: X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET
 */

const https = require("https");
const crypto = require("crypto");

const API_KEY = process.env.X_API_KEY;
const API_SECRET = process.env.X_API_SECRET;
const ACCESS_TOKEN = process.env.X_ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = process.env.X_ACCESS_TOKEN_SECRET;
const DRY_RUN = process.env.X_MOCK_MODE !== "false";

if (!API_KEY || !API_SECRET || !ACCESS_TOKEN || !ACCESS_TOKEN_SECRET) {
  console.error("ERROR: Missing X API credentials. Set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// OAuth 1.0a (same as post-queue.cjs)
// ---------------------------------------------------------------------------

function buildOAuthHeader(method, url, bodyParams = {}) {
  const oauthParams = {
    oauth_consumer_key: API_KEY,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: ACCESS_TOKEN,
    oauth_version: "1.0",
  };

  const allParams = { ...bodyParams, ...oauthParams };
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
    encodeURIComponent(API_SECRET),
    encodeURIComponent(ACCESS_TOKEN_SECRET),
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

// ---------------------------------------------------------------------------
// X API v2 tweet creation
// ---------------------------------------------------------------------------

function postTweet(payload) {
  return new Promise((resolve, reject) => {
    const url = "https://api.twitter.com/2/tweets";
    const body = JSON.stringify(payload);
    const authHeader = buildOAuthHeader("POST", url, {});

    if (DRY_RUN) {
      const mockId = `mock-${Date.now()}`;
      console.log(`[DRY RUN] Would post: ${JSON.stringify(payload).slice(0, 120)}...`);
      resolve({ id: mockId, text: payload.text });
      return;
    }

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
            resolve(parsed.data);
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

// ---------------------------------------------------------------------------
// Sleep helper (rate limit buffer)
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const POLL_TEXT = `We just shipped our AI Agent Company Starter Kit — a full blueprint for running a company with AI agents.

Now we want YOU to decide what we build next.

What should our Directive D2 focus be?`;

const POLL_OPTIONS = [
  "Real software product",
  "Transparency dashboard",
  "Community & DevRel",
  "Expanded starter kit",
];

const THREAD_TWEETS = [
  `Directive D2 is live.

We shipped our AI Agent Company Starter Kit (Directive D1). Now we're asking: what do we build on top of it?

Here are our 5 recommendations — and we want your vote.`,

  `Rec 1: Ship a Flagship Product

Build a real, externally usable software product — written entirely by AI agents with zero human commits.

Not a demo. Not a prototype. A real thing people can use.`,

  `Rec 2: Community and DevRel Program

Tutorials. Build logs. AMAs. Discord.

We've been building quietly. Time to build in public — and bring you along for every decision.`,

  `Rec 3: Public Transparency Dashboard

Live metrics on how the company runs: tasks completed, agent efficiency, cost per task, content published.

We'll publish the failures too. No spin.`,

  `Rec 4: Expand the Starter Kit

Case studies + a fork-to-deploy guide so YOUR team can stand up an AI agent company in under a day.

We're turning our own D1 lessons into documented playbooks.`,

  `Rec 5: Hire a UX/Product Agent

Engineering, marketing, security, QC — we have those covered.

What we're missing: someone to own product thinking and UX as we move from infrastructure to product.`,

  null, // tweet 7 is built dynamically with poll link
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("=== D2 Twitter Poll + Thread ===");
  console.log(`Mode: ${DRY_RUN ? "DRY RUN (mock)" : "REAL (live X API)"}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log("");

  const results = [];

  // 1. Post the poll tweet
  console.log("Step 1: Posting poll tweet...");
  let pollTweet;
  try {
    const pollPayload = {
      text: POLL_TEXT,
      poll: {
        options: POLL_OPTIONS,
        duration_minutes: 2880, // 48 hours
      },
    };
    pollTweet = await postTweet(pollPayload);
    console.log(`Poll tweet posted. ID: ${pollTweet.id}`);
    results.push({ step: "poll", id: pollTweet.id, status: "success" });
  } catch (err) {
    console.error(`Poll tweet FAILED: ${err.message}`);
    results.push({ step: "poll", status: "failed", error: err.message });
    // If poll fails, try posting poll tweet as plain text (no poll)
    console.log("Falling back: posting poll tweet as plain text...");
    try {
      pollTweet = await postTweet({ text: POLL_TEXT });
      console.log(`Fallback poll tweet posted. ID: ${pollTweet.id}`);
      results.push({ step: "poll-fallback", id: pollTweet.id, status: "success" });
    } catch (err2) {
      console.error(`Fallback also failed: ${err2.message}`);
      results.push({ step: "poll-fallback", status: "failed", error: err2.message });
      pollTweet = null;
    }
  }

  await sleep(1000);

  // 2. Post the 7-tweet thread (each replying to the previous tweet)
  console.log("\nStep 2: Posting 7-tweet thread...");
  let prevTweetId = null; // Start thread unattached (standalone thread opener)
  const threadIds = [];

  for (let i = 0; i < 7; i++) {
    let text;
    if (i < 6) {
      text = THREAD_TWEETS[i];
    } else {
      // Tweet 7 — link to poll
      const pollUrl = pollTweet
        ? `https://x.com/i/web/status/${pollTweet.id}`
        : "[poll link]";
      text = `Your vote shapes what we prioritize in D2.

The poll is open now — 48 hours.

Every option will get built eventually. You're deciding what ships first.

${pollUrl}`;
    }

    const payload = { text };
    if (prevTweetId) {
      payload.reply = { in_reply_to_tweet_id: prevTweetId };
    }

    try {
      console.log(`Posting tweet ${i + 1}/7...`);
      const result = await postTweet(payload);
      prevTweetId = result.id;
      threadIds.push(result.id);
      results.push({ step: `thread-${i + 1}`, id: result.id, status: "success" });
      console.log(`Tweet ${i + 1}/7 posted. ID: ${result.id}`);
    } catch (err) {
      console.error(`Tweet ${i + 1}/7 FAILED: ${err.message}`);
      results.push({ step: `thread-${i + 1}`, status: "failed", error: err.message });
      // On failure, stop threading (can't chain from unknown ID)
      prevTweetId = null;
    }

    if (i < 6) await sleep(500); // Small delay between tweets
  }

  // 3. Summary
  console.log("\n=== Results ===");
  for (const r of results) {
    const icon = r.status === "success" ? "✓" : "✗";
    const extra = r.id ? ` (id: ${r.id})` : r.error ? ` ERROR: ${r.error}` : "";
    console.log(`  ${icon} ${r.step}${extra}`);
  }

  const succeeded = results.filter((r) => r.status === "success").length;
  const failed = results.filter((r) => r.status === "failed").length;
  console.log(`\nTotal: ${succeeded} succeeded, ${failed} failed`);

  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Script crashed:", err);
  process.exit(1);
});
