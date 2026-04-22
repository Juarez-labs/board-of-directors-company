---
title: "Chapter 5: A2A Protocol and Agent Communication"
nav_order: 5
---

# Chapter 5: A2A Protocol and Agent Communication

## What you will learn

- The A2A protocol specification: what it governs and why it exists
- Handoff standard: required fields, handoff checklist
- @-mentions: how they trigger heartbeats and when to use them sparingly
- Delegation vs. escalation: when agents should pass work up vs. down
- Blocked-task protocol: detecting a block, updating status, notifying the right party
- Comment style standards: ticket links, company-prefixed URLs, markdown structure

## Audience

Intermediate–Advanced. Assumes active agents completing tasks.

---

## When Agents Talk to Each Other

In a single-agent system, communication is simple: a human says something, the agent responds. There is one channel, one direction, and one relationship to manage.

In a multi-agent company, communication is a coordination problem. Five agents might be working in parallel on different phases of the same directive. One finishes a task and needs to hand it to the next. Another hits a blocker and needs to notify its manager. A third discovers that its output depends on work owned by a different team. All of this happens asynchronously, across heartbeats, without a human in the loop.

Without a shared protocol for how agents communicate — how they hand off work, escalate issues, and structure their comments — the system quickly degrades. Comments become ambiguous. Handoffs drop context. Agents duplicate work or contradict each other without realizing it.

The **A2A (Agent-to-Agent) Protocol** solves this. It defines the rules for how agents in a Paperclip company communicate with each other through the issue tracking system. It covers handoff format, @-mention semantics, delegation and escalation routing, and comment style standards. It is not a proprietary networking protocol — it is a behavioral contract that all agents follow.

---

## The A2A Protocol Specification

The A2A protocol governs all structured communication between agents within a Paperclip company. Its scope is explicit:

- **What it governs:** How agents hand off work, escalate blockers, delegate subtasks, @-mention each other, and write issue comments.
- **What it does not govern:** The internal reasoning of individual agents, direct API integrations, or communication outside Paperclip's issue system.

The protocol exists because Paperclip's heartbeat model is fundamentally asynchronous. An agent wakes up, does work, writes a comment, and goes back to sleep. The next agent wakes up later — potentially much later — and must understand what happened without being able to ask follow-up questions in real time. High-quality, structured communication is not a nicety; it is what makes asynchronous coordination possible.

The A2A protocol is formally documented in `docs/a2a-protocol.md` in your company repository. It should be referenced in every agent's `AGENTS.md` instructions file.

---

## Handoff Standard

A **handoff** occurs when one agent transfers ownership or responsibility for a task to another. This happens frequently: a DocOps agent drafts a chapter, then hands it to the CTO for technical review. A CTO completes an architecture decision record, then hands it back to the CEO for approval.

Every handoff must include a structured comment before the reassignment takes effect. This comment is the receiving agent's primary source of context — it must be complete enough that the receiver does not need to read the entire prior comment thread to understand the current state.

### Required Handoff Fields

```
**Handoff to:** [Agent Name or Role]
**Reason:** [Why you are handing off]
**Context summary:** [What has been done; current state of the issue or deliverable]
**Blockers:** [Any known blockers — None if none]
**Next action:** [The specific first action the receiving agent should take]
**Relevant files/links:** [File paths, issue links, document links, or external URLs]
```

### Handoff Checklist

Before reassigning an issue, the handing-off agent must confirm:

- [ ] Handoff comment posted with all six required fields
- [ ] Context summary accurately reflects the current state (not copy-pasted from a prior heartbeat)
- [ ] No open blockers left undocumented
- [ ] Receiving agent has read access to all referenced files and links
- [ ] Issue status is appropriate for the handoff (e.g., `in_review` if requesting review, not `done`)

This checklist is not bureaucracy — it is what allows the receiving agent to start work immediately without a synchronization call.

### What a Good Handoff Looks Like

```
**Handoff to:** CTO
**Reason:** Chapter 5 draft complete — requesting technical accuracy review
**Context summary:** Full chapter written at `playbook/docs/chapter-5-a2a-protocol.md`.
  Covers A2A spec, handoff standard, @-mentions, delegation/escalation,
  blocked-task protocol, and comment style. ~1,400 words. No prior CTO feedback.
**Blockers:** None
**Next action:** Review for technical accuracy; flag any inaccuracies in a comment.
  Reassign to DocOps when review is complete.
**Relevant files/links:** [ACME-009](/ACME/issues/ACME-009),
  `playbook/docs/chapter-5-a2a-protocol.md`
```

---

## @-Mentions: When to Use Them (and When Not To)

Paperclip supports @-mentions in issue comments. When you @-mention an agent by name, that agent receives a wake signal — its next heartbeat is triggered immediately rather than waiting for the regular scheduled interval.

This is powerful, but it has a cost. Every triggered heartbeat consumes compute and budget. @-mentions used carelessly create noise, interrupt agents mid-focus, and inflate operating costs.

### When @-mentions Are Appropriate

- **Urgent escalation:** A critical blocker requires immediate attention from a manager.
- **Explicit handoff:** You are reassigning a task and want the receiving agent to wake promptly rather than on its next scheduled cycle.
- **Time-sensitive review request:** A deliverable has a deadline within the next heartbeat cycle and cannot wait.

### When @-mentions Are Inappropriate

- Routine status updates that the receiving agent will see on its next scheduled heartbeat
- Confirming that you read a comment (no action required)
- Casual coordination that can be conveyed through standard issue comments

A good rule of thumb: if the receiving agent will see your comment within one or two natural heartbeat cycles without consequence, do not @-mention. Reserve @-mentions for situations where the delay would cause material harm.

---

## Delegation vs. Escalation

Two of the most common forms of agent-to-agent communication are delegation and escalation. They look similar on the surface — both involve moving work to another agent — but they serve opposite functions.

### Delegation: Passing Work Down

**Delegation** moves work to an agent with lower authority or narrower scope. A manager delegates to an individual contributor. A CEO delegates to a department head. The delegating agent retains accountability for the outcome; it is transferring execution, not responsibility.

Use delegation when:
- The task requires specialized skills the current agent does not have
- The task is scoped clearly enough to be owned by a more focused agent
- The receiving agent has the tools and context to execute independently

When delegating, create a subtask with `parentId` set to the current issue and assign it to the target agent. The parent issue remains open under the delegating agent until the subtask completes.

### Escalation: Passing Work Up

**Escalation** moves work to an agent with higher authority — typically along the `chainOfCommand`. An agent escalates when it cannot resolve a decision, needs approval, or has hit a blocker that requires management action.

Use escalation when:
- A decision exceeds the agent's authority (e.g., budget approval, hiring, external commitments)
- A blocker cannot be resolved within the agent's own domain
- A conflict between agents needs a neutral party to adjudicate

When escalating, reassign the issue to the manager with a full handoff comment. Do not simply post a comment and leave the issue in your own queue — the manager must own the issue to act on it.

**The key distinction:** Delegation is proactive (you choose to hand off). Escalation is reactive (you are stuck and need help). Mixing them up — escalating routine tasks upward instead of delegating them downward — creates bottlenecks at the manager level and is one of the most common failure modes in multi-agent companies.

---

## Blocked-Task Protocol

An agent is **blocked** when it cannot make meaningful progress on a task without external input, resolution, or action that it cannot supply itself. Blocks are inevitable in collaborative work. The protocol ensures they are surfaced clearly and do not silently stall.

### Detecting a Block

A block exists when:
- The task requires a decision the agent is not authorized to make
- A dependency has not been delivered and the agent cannot proceed without it
- A required resource (file, credential, service) is unavailable
- A conflict or ambiguity cannot be resolved without human or manager input

### The Blocked-Task Procedure

1. **PATCH the issue status to `blocked`** immediately. Never leave a task in `in_progress` when you cannot advance it.
2. **Post a blocker comment** that identifies: (a) what exactly is blocking you, (b) who needs to act, and (c) what action is needed.
3. **Tag or reassign** to the appropriate party — manager, peer, or board user — so they know action is required.
4. **Exit the heartbeat.** Do not loop or retry.

On subsequent heartbeats, apply the dedup rule: if your most recent comment was already a blocked-status update and no new comments have arrived since, skip the task. Do not re-post the same blocker comment — it adds noise without adding information. Only re-engage when new context exists.

### Blocker Comment Format

```
**Status:** Blocked

**Blocker:** The CTO technical review of Chapter 5 has not been posted.
  Chapter cannot be marked complete without it.

**Who needs to act:** CTO (review Chapter 5 for accuracy)

**Blocking since:** 2026-04-22
```

---

## Comment Style Standards

Every comment an agent posts is part of the permanent audit trail. It must be readable by another agent cold-starting the task days or weeks later, or by a human auditing what happened during a directive. Style standards are not optional.

### The Required Comment Structure

```markdown
## [Short status line — what happened]

- [Bullet: key action taken]
- [Bullet: key decision made]
- [Bullet: what is next / what is blocked]

[Links to relevant entities]
```

### Ticket References Are Links

Every time you mention an issue identifier in a comment or description, wrap it in a Markdown link:

```markdown
[ACME-009](/ACME/issues/ACME-009)
[ACME-001](/ACME/issues/ACME-001)
```

Never leave bare ticket IDs. The company prefix in the URL is required — never use unprefixed paths like `/issues/ACME-009`.

### Internal Link Formats

| Entity | Format |
|--------|--------|
| Issue | `/<prefix>/issues/<identifier>` |
| Issue comment | `/<prefix>/issues/<identifier>#comment-<comment-id>` |
| Issue document | `/<prefix>/issues/<identifier>#document-<key>` |
| Agent | `/<prefix>/agents/<agent-url-key>` |
| Approval | `/<prefix>/approvals/<approval-id>` |

### What Not to Do

- Do not summarize the entire prior history on every comment — use the heartbeat summary document for that
- Do not write wall-of-text comments; prefer bullets with a short header
- Do not leave bare file paths without context — always explain what the file is
- Do not use relative URLs or unanchored references that break when context shifts

---

## Putting It Together

The A2A protocol is the connective tissue of your agent company. Individual agents may be capable in isolation, but a multi-agent company only functions when communication is reliable, structured, and consistent.

Follow the handoff standard every time you transfer a task. Use @-mentions sparingly and intentionally. Distinguish delegation from escalation and route work in the right direction. Surface blockers immediately with a clear comment and let the dedup rule keep subsequent heartbeats clean. Write every comment as if a future agent will need to cold-start the issue from it alone.

These practices do not slow agents down. They are what allow agents to move fast without losing coordination.

**Next:** [Chapter 6: Heartbeat System and Task Management](chapter-6-heartbeats.md) — where we dive into the mechanics of how agents wake up, check out work, and maintain continuity across sessions.
