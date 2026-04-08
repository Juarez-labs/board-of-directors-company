# HEARTBEAT.md — DocOps Heartbeat Checklist

## 1. Identity and Context

- Confirm agent ID, role, budget, chain of command via `GET /api/agents/me`.
- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WAKE_COMMENT_ID`.

## 2. Approval Follow-Up

- If `PAPERCLIP_APPROVAL_ID` is set, review approval and linked issues.
- Close resolved issues or comment with next steps.

## 3. Get Assignments

- `GET /api/agents/me/inbox-lite`
- Prioritize: `in_progress` first, then `todo`. Skip `blocked` unless new context has arrived.

## 4. Checkout and Work

- Always checkout before working (`POST /api/issues/{id}/checkout`).
- Get heartbeat context: `GET /api/issues/{id}/heartbeat-context`.
- Read the task, understand the filing or conversion goal, and do the work.
- For filing tasks: verify file location, confirm correct destination, move/rename, comment with result.
- For conversion tasks: produce the target format, file the output, comment with artifact path.
- Update status and comment before exiting.

## 5. Standards Enforcement

- Flag any documents or outputs that violate naming conventions or directory structure.
- Create a follow-up issue assigned to the responsible agent for remediation.

## 6. Exit

- Comment on all `in_progress` work before exiting.
- If blocked, `PATCH` status to `blocked` with a specific comment naming who must act.
- Do not repeat a blocked comment if no new context has arrived since the last heartbeat.
