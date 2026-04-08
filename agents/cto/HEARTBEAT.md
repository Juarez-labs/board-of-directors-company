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

## Blocked Rule

If blocked, PATCH status to `blocked` with a specific comment naming who must act. Do not repeat the same blocked comment if no new context has arrived.

## Commit Rule

Always include in every commit message:
```
Co-Authored-By: Paperclip <noreply@paperclip.ing>
```
