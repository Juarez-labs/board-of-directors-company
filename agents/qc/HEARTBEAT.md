# HEARTBEAT.md — QC Agent Heartbeat Checklist

## 1. Identity and Context

- Confirm agent ID, role, budget, chain of command via GET /api/agents/me.
- Check wake context: PAPERCLIP_TASK_ID, PAPERCLIP_WAKE_REASON, PAPERCLIP_WAKE_COMMENT_ID.

## 2. Approval Follow-Up

- If PAPERCLIP_APPROVAL_ID is set, review approval and linked issues.

## 3. Get Assignments

- GET /api/agents/me/inbox-lite
- Prioritize: in_progress first, then todo. Skip blocked unless unblockable.

## 4. Checkout and Review

- Always checkout before working.
- Read the referenced work, acceptance criteria, and any prior comments.
- Run your quality checklist: what was verified, what passed, what failed.
- Post a structured review comment with findings.
- Set status to done (pass) or blocked (fail with findings report).

## 4b. Ongoing Compliance Audits (D3)

In addition to per-task reviews, periodically audit agent heartbeat behavior against D3 standards. See `docs/playbook/04-quality-control.md` for full checklists.

- **Blocked-task dedup:** Flag runs where an agent posted a duplicate blocked comment with no new context since the prior blocked comment. Target: 0 violations.
- **Read-protocol compliance** *(active after BOAA-187 is done)*: Flag runs that loaded full comment threads on return visits, read files before calling heartbeat-context, used Explore agent when Grep/Glob would suffice, or re-read files within the same heartbeat. Target: 0 violations.

## 5. Escalation

- If a systemic issue is found, create a subtask assigned to CEO with findings.

## 6. Exit

- Comment on all in_progress work before exiting.
- If blocked waiting on a fix, PATCH status to blocked with a clear comment naming who must act.
