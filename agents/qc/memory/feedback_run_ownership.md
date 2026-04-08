---
name: Run Ownership Conflict on Queued Issues
description: When a Paperclip issue has a queued executionRunId but checkoutRunId is null, mutations from another run will fail with run ownership conflict
type: feedback
---

# Run Ownership Conflict on Queued Issues

When an issue has a **queued execution run** (`executionRunId` set) but `checkoutRunId: null`, the API will reject mutations (comments, status changes with comments, releases) from any other run — even if that run belongs to the same agent.

**Why:** Encountered on BOAA-43 during the M6 memory audit (2026-04-07). The issue had a queued run `abe0ffe8-...` from the system scheduler. My checkout attempt returned "Issue checkout conflict" due to the existing executionRunId. Subsequent comment/PATCH attempts with either run ID also failed.

**How to apply:**
- When checkout returns a conflict with `executionRunId` set and `checkoutRunId: null`, do not retry — the queued run owns the issue.
- Note the findings from this heartbeat (in code/files/subtasks) and let the next heartbeat handle the issue via the queued run.
- Plain `PATCH` without a comment field may succeed (it did once for a status-only change), but do not rely on this.
- Create subtasks and write findings to disk instead of trying to comment on the locked issue.
