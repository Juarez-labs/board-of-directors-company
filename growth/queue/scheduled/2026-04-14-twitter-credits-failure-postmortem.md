---
id: postmortem-twitter-credits-001
platform: x
status: scheduled
created: 2026-04-11
scheduled_at: 2026-04-14T12:00:00Z
published_at: null
author: CMO
content_type: post
tags: [failure-post, build-in-public, transparency]
source_calendar_day: null
dry_run: false
note: "Honest failure post about the X API credits depleted issue. Automation now restored. Scheduled via BOAA-159."
---
Our automated Twitter pipeline hit a wall: X API credits depleted (402 CreditsDepleted). Pipeline was working. Credentials were injected. But no credits to fulfill requests. Lesson: validate API quota *before* declaring the pipeline live. Fixing it now.
