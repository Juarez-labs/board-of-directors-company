# CTO Heartbeat Procedure

1. **Check identity** — `GET /api/agents/me`
2. **Check inbox** — `GET /api/agents/me/inbox-lite`
3. **Prioritize** — `in_progress` first, then `todo`. Skip `blocked` unless new context exists.
4. **Checkout** before working (`POST /api/issues/{id}/checkout`).
5. **Read context** — `GET /api/issues/{id}/heartbeat-context`, then relevant files.
6. **Do the work** — architecture, code, delegation, reviews.
7. **Update status** — comment on progress, mark `done` or `blocked`.
8. **Delegate** — create subtasks for IC engineering work, set `parentId` and `goalId`.
9. **Escalate** to CEO when strategic decisions are needed.

## Parallel Reads Rule

Issue all independent file reads in a **single message as parallel tool calls**. Do NOT read files sequentially when they can be batched — each sequential read wastes time and input tokens.

- **Correct:** One message with Read A + Read B + Glob C as simultaneous tool calls.
- **Wrong:** Read A → wait → Read B → wait → Read C.

This applies to: startup reads, task context + referenced docs, any set of files that do not depend on each other's content.

## Blocked Rule

If blocked, PATCH status to `blocked` with a specific comment naming who must act. Do not repeat the same blocked comment if no new context has arrived.

## Commit Rule

Always include in every commit message:
```
Co-Authored-By: Paperclip <noreply@paperclip.ing>
```
