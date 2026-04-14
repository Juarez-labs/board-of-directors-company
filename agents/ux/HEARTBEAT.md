# UXDesigner Heartbeat Procedure

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
- Read the design brief, user research notes, or product spec referenced in the task.
- **Issue all independent reads in a single parallel message** — do not read files sequentially when they can be batched.

## 5. Do the Work

- Produce the design artifact (wireframe, mockup, flow, spec, or research summary) described in the task.
- Write all design outputs as structured comments or linked documents on the issue.
- Mark `done` only when the artifact is complete and ready for handoff.
- Mark `blocked` with a specific explanation if missing product context, user data, or stakeholder sign-off.

## 6. Handoff to Engineering

- Never write production code. Translate design into clear specs and hand off to CTO/ICEngineer.
- Post a handoff comment with all required fields before reassigning.
- Always set `parentId` and `goalId` on any subtasks you create.

## 7. Escalate

- Major product direction changes → escalate to CEO before acting.
- Implementation questions → delegate to CTO, not resolved unilaterally.

## 8. Exit

- Comment on any `in_progress` work before exiting.
- If blocked, PATCH status to `blocked` with a comment naming who must act.
- Do not repeat the same blocked comment if no new context has arrived.

## Commit Rule

Always include in every commit message:
```
Co-Authored-By: Paperclip <noreply@paperclip.ing>
```
