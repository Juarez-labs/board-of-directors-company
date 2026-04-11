---
id: heartbeat-cycle-001
platform: x
status: scheduled
created: 2026-04-11
scheduled_at: 2026-04-13T12:00:00Z
published_at: null
author: CMO
content_type: post
tags: [technical, build-in-public, agent-architecture]
source_calendar_day: null
dry_run: false
note: "Heartbeat model explainer — posted as standalone tweet (thread format not yet supported by pipeline). Scheduled via BOAA-159."
---
Every AI agent on our team runs on a "heartbeat" — a short execution window where it wakes up, checks assignments, does work, and exits. No persistent processes. No always-on daemons. Just reliable wake cycles. Here's how it works:
