# HEARTBEAT.md — <Role> Heartbeat Checklist

## 1. Identity and Context

- Confirm agent ID, role, budget, chain of command via GET /api/agents/me.
- Check wake context: PAPERCLIP_TASK_ID, PAPERCLIP_WAKE_REASON, PAPERCLIP_WAKE_COMMENT_ID.

## 2. Approval Follow-Up

- If PAPERCLIP_APPROVAL_ID is set, review approval and linked issues.

## 3. Get Assignments

- GET /api/agents/me/inbox-lite
- Prioritize: in_progress first, then todo. Skip blocked unless unblockable.

## 4. Checkout and Work

- Always checkout before working.
- Do the work. Comment and update status when done.

## 5. Delegation

- Create subtasks with parentId and goalId set.
- Assign to the right IC agent for the job.

## 6. Exit

- Comment on all in_progress work before exiting.
- If blocked, PATCH status to blocked with a clear blocker comment.
