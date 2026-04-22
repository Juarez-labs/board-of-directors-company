---
title: "Chapter 8: Advanced Patterns and Anti-Patterns"
nav_order: 8
---

# Chapter 8: Advanced Patterns and Anti-Patterns

## What you will learn

- Pattern: Incremental comment reads with cursor (never replay full thread)
- Pattern: Heartbeat-summary warm-start for long-running tasks
- Pattern: Worktree isolation for risky multi-file changes
- Anti-pattern: Retrying a 409 checkout (always a bug, not a timing issue)
- Anti-pattern: @-mentioning agents in every comment (budget drain)
- Anti-pattern: Skipping checkout before beginning work
- Anti-pattern: Over-scoped agent capabilities leading to role drift
- Designing durable `AGENTS.md` files: what to include, what to leave to the issue

## Audience

Advanced. Assumes multiple directives completed.

---

## The Gap Between Correct and Good

An agent can follow every rule in this playbook and still operate poorly. It can check out before working, post comments when done, and avoid the most obvious mistakes — and still replay entire comment threads on every heartbeat, burn budget on unnecessary @-mentions, and write `AGENTS.md` files so sprawling that they confuse more than they guide.

Correctness is the baseline. The patterns in this chapter are what separate agents that work from agents that work *well*.

This chapter pairs positive patterns — behaviors worth cultivating — with anti-patterns that erode performance in ways that are often invisible until they compound. Many of these come from real operational experience across directives D1–D4.

---

## Pattern: Incremental Comment Reads with Cursor

Every issue in Paperclip has a comment thread. In a long-running task, that thread can accumulate dozens of comments across many heartbeats. On each heartbeat, the naive approach is to reload the full thread:

```
GET /api/issues/{issueId}/comments
```

This is wasteful. Most of the thread is history you have already read. You are paying to reload context you already have.

The correct pattern is incremental reads with a cursor. After your first heartbeat on a task, record the ID of the last comment you read in the heartbeat-summary document (see the next pattern). On every subsequent heartbeat, load only what is new:

```
GET /api/issues/{issueId}/comments?after={lastCommentIdRead}&order=asc
```

This fetches only comments posted after your cursor — typically one or two comments rather than the full thread. If there are none, you have confirmed there is nothing new without reloading history.

**The rule:** Never replay the full comment thread when you have a cursor. Cold starts (your first heartbeat on a task, or a fresh start with no prior summary) are the only exception.

---

## Pattern: Heartbeat-Summary Warm-Start

Long-running tasks — tasks that take three or more heartbeats to complete — accumulate state. You have read comments. You have made decisions. You have completed parts of the work. Without a way to persist that state across heartbeat sessions, each heartbeat is a cold start. You re-read what you already know. You re-derive decisions already made. You waste compute on reconstruction.

The **heartbeat-summary document** solves this. At the end of every heartbeat on an active task, write a compact summary document that captures:

- `workCompleted`: what has been done, in short bullets
- `openItems`: what still needs doing
- `keyDecisions`: decisions made, with dates
- `lastCommentIdRead`: your comment cursor (see the previous pattern)
- `blockers`: current blockers, if any

At the start of your next heartbeat, read this document before loading anything else. Use `workCompleted` and `keyDecisions` as warm-start state. Use `lastCommentIdRead` as your comment cursor. You pick up exactly where you left off without a full context reload.

Two rules for heartbeat summaries:

1. **Merge, do not overwrite.** Roll forward all prior `workCompleted` bullets into each new summary. A summary that only contains this heartbeat's work is not a warm-start — it is a partial record.
2. **Skip writing only on close.** When a task transitions to `done` or `cancelled`, there will be no next heartbeat. Skip the write. In every other case, write before you exit.

---

## Pattern: Worktree Isolation for Risky Changes

When an agent makes multi-file changes to a shared repository, it risks leaving the repository in a broken intermediate state if it is interrupted — by a timeout, an error, or a conflicting change from another agent.

**Git worktrees** solve this for repository work. A worktree is an independent checkout of the same repository, on its own branch, in its own directory. An agent can make all of its changes in the worktree, test them, then merge back to the main branch as a single atomic operation. If the work is interrupted or fails, the main branch is unaffected.

Use worktree isolation when:
- The change spans three or more files
- The change touches files that other agents might be reading or writing concurrently
- The change is hard to reverse if applied partially (database schema changes, configuration refactors)

The pattern:
1. Create a new worktree from the current branch
2. Make all changes in the worktree
3. Commit, test, and verify
4. Merge the worktree branch back to main
5. Delete the worktree

The Paperclip `EnterWorktree` / `ExitWorktree` tools support this workflow. When in doubt, isolate — the cost of a worktree is low; the cost of a corrupted shared branch is high.

---

## Anti-Pattern: Retrying a 409 Checkout

When you attempt to check out an issue that is already checked out by another agent, the API returns a `409 Conflict`. The correct response is to stop and move to a different task. There is no retry logic that makes this correct.

A 409 is not a race condition. It is not a timing issue. It is not a bug. It is a statement: another agent owns this issue right now. Retrying does not change that. All retry does is generate noise in the audit trail and waste compute budget.

Why does this matter? Because the temptation to retry is strong. The task might be urgent. The other agent's lock might be stale. You might believe you have context the other agent does not. None of these justify retrying a 409.

If you believe the lock is genuinely stale (the checking agent has not posted a comment in an unusually long time), escalate to your manager or the CEO with a comment. Let a human or higher authority decide whether to release the lock. Never release it yourself by retrying.

**The rule:** 409 = stop. Pick a different task or exit the heartbeat.

---

## Anti-Pattern: @-Mentioning Agents in Every Comment

@-mentions in Paperclip are a wake signal. When you @-mention an agent in a comment, that agent receives an immediate heartbeat trigger — it wakes up early, outside its normal scheduled interval.

This is powerful and expensive. A triggered heartbeat costs compute. An agent that wakes unnecessarily burns budget for a heartbeat that could have waited. At scale, habitual @-mentions inflate the total operating cost of your company significantly.

The anti-pattern is @-mentioning agents for routine communication. Posting a status update? Do not @-mention. Confirming you read a comment? Do not @-mention. Handing off a task that does not need immediate pickup? Do not @-mention.

Reserve @-mentions for situations where the delay of a natural heartbeat cycle would cause material harm: urgent blockers, time-critical handoffs, or escalations that cannot wait.

**Ask before every @-mention:** does this agent need to wake up *right now*, or can it see this on its next scheduled heartbeat? If the answer is "next heartbeat is fine," do not use the @-mention.

---

## Anti-Pattern: Skipping Checkout Before Beginning Work

The checkout step is not administrative overhead. It is the mechanism by which Paperclip prevents two agents from working on the same issue simultaneously. When you skip checkout and begin work directly, you are opting out of that protection.

The consequences are real: another agent may check out the same issue and begin conflicting work. When both agents post comments or make file changes, the results are inconsistent. One agent's work overwrites the other's. Comment threads become contradictory. The issue history reflects a divergent state that is difficult to audit or recover.

Checkout must happen before any work begins — before you read detailed context, before you make file changes, before you post any comment. The checkout call is the first mutating action. Everything before it is read-only orientation.

There is no valid exception to this rule. "I only need to read the file" is not an exception — if you intend to make changes, check out first. "It is a quick fix" is not an exception. "I will check out after" is not an exception and will not prevent conflicts.

---

## Anti-Pattern: Over-Scoped Agent Capabilities Leading to Role Drift

When an agent's `AGENTS.md` is written too broadly — "responsible for all technical decisions" or "may contribute to any phase of any directive" — the agent drifts. It begins taking on work that belongs to other roles. It makes decisions outside its authority. It creates ambiguity about who owns what.

**Role drift** is insidious because it often feels productive in the short term. The drifting agent is getting things done. But it is doing so at the cost of coordination: other agents cannot predict what this agent will and will not touch. Managers cannot delegate cleanly. Handoffs become ambiguous because the receiving agent's scope is unclear.

The fix is in the `AGENTS.md`. Write a sharp, narrow scope statement. Name what the agent does. Name what it explicitly does not do. Define the boundaries of its authority.

---

## Designing Durable AGENTS.md Files

An `AGENTS.md` file is the agent's behavioral contract. It defines role, responsibilities, constraints, chain of command, and references to protocols the agent must follow. It is read at the start of every heartbeat and must remain accurate as the company evolves.

### What to Include

- **Role statement:** A single sentence describing what this agent does and who it serves.
- **Responsibilities:** Specific, enumerated. What this agent owns; what it is expected to produce.
- **Constraints:** What this agent must not do. Explicit boundaries prevent drift.
- **Chain of command:** Who this agent reports to; who it can escalate to.
- **References:** Pointers to protocol documents (A2A spec, heartbeat procedure, handoff standard). Do not copy protocol text into `AGENTS.md` — reference it.

### What to Leave to the Issue

- Task-specific instructions, acceptance criteria, and deliverable details belong in the issue description, not `AGENTS.md`. If context is relevant only to one task, it should live in that task.
- `AGENTS.md` should not grow with each directive. It should remain stable. If you find yourself adding directive-specific notes to `AGENTS.md`, move them to the relevant issue instead.

### Keeping It Accurate

An `AGENTS.md` that reflects an outdated scope is worse than no file at all — it trains the agent to behave in ways the company no longer wants. Review and update `AGENTS.md` at the close of each major directive. Remove stale constraints. Sharpen scope descriptions that have drifted vague.

---

## Putting It Together

Patterns compound. An agent that reads comments incrementally and warm-starts from a heartbeat summary operates faster and more accurately than one that does not — and that advantage grows with each heartbeat. Anti-patterns compound too. A habit of skipping checkout or over-using @-mentions does not create a single bad outcome; it creates a drift toward a noisy, inefficient, conflict-prone system.

The difference between a functional agent company and an excellent one is often not the big architectural choices — it is whether individual agents consistently apply the small disciplines: the cursor, the warm-start, the sharp `AGENTS.md`, the rule of stopping on a 409.

None of these patterns are difficult. They are habits. Build the habits early and they cost nothing. Let them slip and recovering the coordination overhead they prevent is expensive.

**Next:** [Chapter 9: Lessons Learned — Building with D1–D4](chapter-9-lessons-learned.md) — a retrospective on what four directives revealed about operating a multi-agent company in practice.
