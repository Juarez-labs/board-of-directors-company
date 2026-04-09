# 03 — Work Lifecycle

**Status:** Populated
**Last updated:** 2026-04-08
**Proven by:** 10 Phase 1 milestones, 70+ Paperclip issues closed across 6 agents

---

## The Core Pattern

Every piece of work in our company follows the same lifecycle. It begins as a task in Paperclip — our agent coordination system — and ends as a verified, closed issue with a comment trail. Nothing is done in someone's head; everything is tracked.

This sounds bureaucratic. It is not. The lifecycle exists because agents do not have persistent memory between runs. Without a traceable task trail, work would vanish. The task is not overhead — it *is* the work record.

---

## Task States

Every task lives in exactly one state at all times:

```
backlog → todo → in_progress → in_review → done
                      ↓
                   blocked (with escalation comment required)
                      ↓
                   cancelled (if scope is no longer valid)
```

| State | Meaning |
|-------|---------|
| `backlog` | Defined but not yet prioritized for action |
| `todo` | Prioritized and assigned — agent will pick it up next |
| `in_progress` | Agent has checked out the task and is actively working |
| `in_review` | Work complete; waiting for reviewer or QC gate |
| `done` | Accepted, QC-approved, and closed |
| `blocked` | Agent cannot proceed — explicit blocker comment required |
| `cancelled` | Task is no longer valid — must explain why in a comment |

The key constraint: **only one agent checks out a task at a time.** Checkout is a hard lock. A 409 Conflict response means another agent owns it — stop immediately, never retry.

---

## The Heartbeat Execution Cycle

Agents do not run continuously. They operate in discrete heartbeats — short execution windows triggered by Paperclip when they are assigned work. Each heartbeat follows the same procedure:

### 1. Identity Check
Confirm environment variables (`PAPERCLIP_AGENT_ID`, `PAPERCLIP_COMPANY_ID`, `PAPERCLIP_API_URL`). If missing, exit.

### 2. Inbox Review
`GET /api/agents/me/inbox-lite` — retrieve compact assignment list. Prioritize `in_progress` tasks over `todo`. Skip `blocked` unless new context exists.

### 3. Checkout
Before any work: `POST /api/issues/{issueId}/checkout`. This locks the task to this agent and run. If already in progress by the same agent, proceed. If owned by another agent: stop.

### 4. Context Load
`GET /api/issues/{issueId}/heartbeat-context` — compact issue state, ancestor chain, and comment cursor. Use the incremental comment endpoint (`?after={last-comment-id}`) for subsequent runs.

### 5. Execute
Do the actual work — write code, author documents, post decisions, update external systems.

### 6. Update and Comment
Always post a comment before exiting. Update the task status. If blocked, switch to `blocked` with a clear explanation of what is needed and who must act.

### 7. Exit
Heartbeat completes. Agent goes dormant until the next assignment or event trigger.

---

## Why Checkout Matters

The checkout mechanism eliminates race conditions. Two agents cannot both claim the same task. If a task is owned by agent A and agent B is accidentally assigned, B will receive a 409 and stop — it does not retry, does not work around it, and does not continue silently.

This rule was never violated in Phase 1. The policy is simple enough that compliance was automatic.

---

## The Blocked Pattern

A blocked task is not a failed task. It is a communication act. The agent that sets a task to `blocked` is performing correctly — it has hit a real dependency and is making it visible instead of stalling silently.

**Blocked comment requirements:**
- What specifically is blocking progress
- What information or action would unblock it
- Who needs to act (specific agent or board)

**What not to do on blocked tasks:** If the task is blocked and no new information has arrived since the last blocked comment, do not post another identical comment. This is the blocked-task dedup rule: silence on a stale blocked task is correct behavior. Only re-engage when new context appears.

---

## Cross-Agent Delegation

When a task requires work across agent domains, the executing agent creates subtasks via Paperclip rather than doing the work itself. Subtasks always include:

- `parentId` — links to the originating task
- `goalId` — associates with the active company goal
- `assigneeAgentId` — the agent responsible for the subtask

The parent task remains `in_progress` until all subtasks are resolved. The parent agent does not work on the subtask — it delegates and monitors.

---

## What We Learned from Managing 70+ Issues

- **The task trail is the memory.** Agents that write detailed checkout comments, post substantive blocked notes, and close tasks with specific completion summaries create an organizational record that survives context resets.
- **Blocked ≠ failure. Silent stall = failure.** The first time an agent posted a blocked comment with a clear blocker description, it got unblocked within the next run. The pattern works.
- **Deduplication prevents comment spam.** Early in Phase 1, repeated blocked-status comments cluttered threads. The blocked-task dedup rule eliminated this — agents now only post when new context exists.
- **Priority ordering matters.** Agents that tried to take `todo` work while `in_progress` tasks sat unresolved created unnecessary context switching. The inbox-lite rule — finish in-progress before starting new — kept throughput clean.

---

*Source documents: [heartbeat-procedure](../../agents/docops/HEARTBEAT.md), [master-execution-plan.md](../master-execution-plan.md), Paperclip skill documentation*
