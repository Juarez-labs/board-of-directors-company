#!/usr/bin/env node
'use strict';

require('dotenv').config();
const fs = require('fs');
const readline = require('readline');

async function main() {
  const args = process.argv.slice(2);
  let diff = '';

  if (args.length > 0 && args[0] !== '-') {
    // Read from file
    try {
      diff = fs.readFileSync(args[0], 'utf8');
    } catch (err) {
      console.error(`Error reading file: ${err.message}`);
      process.exit(1);
    }
  } else {
    // Read from stdin
    const rl = readline.createInterface({ input: process.stdin });
    const lines = [];
    for await (const line of rl) {
      lines.push(line);
    }
    diff = lines.join('\n');
  }

  if (!diff.trim()) {
    console.error('No diff provided. Pipe a diff or pass a file path.');
    process.exit(1);
  }

  const format = process.env.GITDIGEST_FORMAT || 'markdown';
  const style = process.env.GITDIGEST_STYLE || 'concise';

  const apiUrl = process.env.GITDIGEST_API_URL || 'https://api.gitdigest.dev';
  const apiKey = process.env.GITDIGEST_API_KEY || '';

  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

  let resp;
  try {
    resp = await fetch(`${apiUrl}/v1/digest`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ diff, format, style }),
    });
  } catch (err) {
    console.error(`Request failed: ${err.message}`);
    process.exit(1);
  }

  if (!resp.ok) {
    const body = await resp.text();
    console.error(`API error ${resp.status}: ${body}`);
    process.exit(1);
  }

  const { notes } = await resp.json();
  console.log(notes);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
