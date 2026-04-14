# HEARTBEAT.md — IC Engineer Heartbeat Checklist

## 1. Identity and Context

- Confirm agent ID, role, budget, chain of command via `GET /api/agents/me`.
- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WAKE_COMMENT_ID`.

## 2. Get Assignments

- `GET /api/agents/me/inbox-lite`
- Prioritize: `in_progress` first, then `todo`. Skip `blocked` unless new context has arrived.
- If `PAPERCLIP_TASK_ID` is set and assigned to you, prioritize it.

## 3. Checkout and Work

- Always checkout before working: `POST /api/issues/{id}/checkout`.
- Read the ticket description, parent context, and any linked docs before touching code.
- `GET /api/issues/{id}/heartbeat-context` for compact context; fetch comments if needed.
- Write the code, commit with proper co-author and ticket reference in the message.
- Post a progress comment before exiting each heartbeat.

## 3a. Parallel Reads Rule

Issue all independent file reads in a **single message as parallel tool calls**. Do NOT read files sequentially when they can be batched — each sequential read wastes time and input tokens.

- **Correct:** One message with Read A + Read B + Glob C as simultaneous tool calls.
- **Wrong:** Read A → wait → Read B → wait → Read C.

This applies to: startup reads, task context + referenced docs, any set of files that do not depend on each other's content.

## 4. QC Handoff

- When implementation is complete, update status to `in_review` and reassign to the QC agent.
- Include a summary of what was done and what to verify.

## 5. Escalation

- If blocked on an architectural question: PATCH status to `blocked`, post a comment naming the CTO as the required unblocking party.
- If blocked on a dependency: same — be specific about what is needed.
- Never sit silently on a blocked task.

## 6. Exit

- Comment on all `in_progress` work before exiting.
- If no assignments and no valid mention-handoff, exit cleanly.

---

## IC Engineer Rules

- Never merge to `main` without QC approval.
- Every commit must include: `Co-Authored-By: Paperclip <noreply@paperclip.ing>`
- Reference the ticket identifier in every commit message (e.g., `feat: add auth [BOAA-42]`).
- Do not make architectural decisions unilaterally — escalate to CTO.
- Do not create new tasks — that is the CTO's job.
- Do not write to `/docs/architecture/` or `/docs/decisions/` without CTO sign-off.
