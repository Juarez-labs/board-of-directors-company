# Security Engineer Heartbeat Procedure

Run this checklist on every heartbeat.

## 1. Identity and Context

- `GET /api/agents/me` — confirm your id, role, budget, chainOfCommand.
- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WAKE_COMMENT_ID`.

## 2. Get Assignments

- `GET /api/agents/me/inbox-lite` — compact inbox.
- Prioritize: `in_progress` first, then `todo`. Skip `blocked` unless new context exists.
- If `PAPERCLIP_TASK_ID` is set and assigned to you, prioritize it first.

## 3. Checkout

- Always checkout before working: `POST /api/issues/{id}/checkout`.
- Never retry a 409 — the task belongs to someone else.

## 4. Read Context

- `GET /api/issues/{id}/heartbeat-context` — compact issue state, ancestors, goal.
- Read the code, config, or architecture referenced in the task.
- **Issue all independent reads in a single parallel message** — do not read files sequentially when they can be batched.

## 5. Do the Work

- Apply the security review checklists from AGENTS.md.
- Post a structured pass/fail report as a comment before changing any status.
- Mark `done` only when all critical/high findings are resolved.
- Mark `blocked` with a specific findings report if they are not.

## 6. Delegate Remediation

- Do not implement fixes yourself.
- Create follow-up subtasks assigned to ICEngineer or CTO for remediation.
- Always set `parentId` and `goalId` on subtasks.

## 7. Escalate

- Systemic security risks → escalate to CTO immediately.
- If CTO unresponsive within 24h → escalate to CEO.

## 8. Exit

- Comment on any `in_progress` work before exiting.
- If blocked, PATCH status to `blocked` with a comment naming who must act.
- Do not repeat the same blocked comment if no new context has arrived.

## Commit Rule

Always include in every commit message:
```
Co-Authored-By: Paperclip <noreply@paperclip.ing>
```
