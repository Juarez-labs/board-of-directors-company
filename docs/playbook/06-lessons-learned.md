# 06 — Lessons Learned

**Status:** Populated
**Last updated:** 2026-04-08
**Proven by:** Phase 1 completion (10 milestones), independent QC audit (BOAA-59), and post-remediation review

---

## Why This Section Exists

This is the most valuable section of the playbook for anyone building their own AI-agent company. Not because it documents what worked — the other sections cover that — but because it documents what didn't work the first time and what we changed.

Anyone can describe a system in its successful final state. This section shows the path from "it didn't work" to "it works now" — including the specific failures, the diagnoses, and the remediations.

No pattern in this section is hypothetical. Every entry happened.

---

## Lesson 1: An Independent QC Audit Reveals What Self-Assessment Misses

**What we tried:** At the end of Phase 1, the CEO declared all 10 milestones complete based on agent reports. The assumption was that if an agent said it was done, it was done.

**What happened:** We commissioned an independent QC audit (QCAgent, BOAA-59). The initial score was 6.5/10 — below the 7.0/10 threshold required to unlock Phase 3. The audit found specific gaps:

- M8 (end-to-end deliverable) had no formal QC gate review on record
- CTO memory files were stale — reflected the state during work, not post-completion
- OKRs had not received formal board approval at the time of the initial review

**What we changed:** Each gap was assigned a remediation issue. QCAgent issued a formal retroactive verdict on M8 (BOAA-60). CTO updated memory files to reflect completion (BOAA-61). CEO formally requested board OKR approval and received it (BOAA-62). Final score: 7.15/10.

**Why it matters for you:** Self-assessment is structurally biased toward "done." Build in independent review even when you believe things are complete. The gap between "the agent thinks it's done" and "a disinterested reviewer confirms it's done" is where quality lives.

---

## Lesson 2: Memory Compliance Requires Enforcement, Not Intention

**What we tried:** Memory-writing was declared mandatory in the Phase 1 milestone plan (M6). The expectation was that agents would write memory files as part of task completion.

**What happened:** Multiple agents either skipped memory-writing entirely or wrote stubs that did not reflect the actual work completed. This was discovered during the M6 enforcement audit (BOAA-43) and surfaced again in the Phase Gate review.

**What we changed:** QCAgent added memory compliance to its post-task audit. A specific remediation was run for each non-compliant agent (BOAA-51 through BOAA-56). Memory compliance became an explicit step in the agent HEARTBEAT.md files, not just an expectation.

**Why it matters for you:** Agents without persistent, populated memory files degrade over time. Each run starts from a lower baseline. The information loss is invisible until you need something the agent should have remembered. Treat memory-writing as a first-class deliverable — not a post-task nicety.

---

## Lesson 3: Blocked Status Is a Feature, Not a Failure Mode

**What we tried:** Early in Phase 1, agents encountering blockers would sometimes continue working around the blocker, making assumptions, or silently stalling.

**What happened:** Silent stalls were invisible. Work-arounds created correctness problems discovered later. Assumptions that turned out to be wrong caused rework.

**What we changed:** The blocked-task protocol was tightened. An agent that cannot proceed MUST:
1. Set the task to `blocked` before exiting the heartbeat
2. Post a comment naming the specific blocker and who needs to act
3. Not repeat the blocked comment on subsequent runs unless new context arrives (blocked-task dedup)

**Why it matters for you:** "Blocked" is not a shameful state — it is communication. An agent that hits a wall and immediately makes it visible is performing correctly. The actual failure is silence. A task that sits `in_progress` with no update for multiple runs is hiding a problem; a task that is `blocked` with a clear comment is asking for help.

---

## Lesson 4: Scope Constraints Are More Valuable Than Scope Grants

**What we tried:** Initial agent charters focused on what agents could do — their capabilities and tools. The constraints section was shorter and less specific.

**What happened:** Agents occasionally drifted into adjacent domains. DocOps started suggesting engineering approaches. ICEngineer started making architectural decisions. Not malicious — just filling apparent gaps.

**What we changed:** AGENTS.md files were updated to make the "must NOT do" section as explicit as the "owns" section. Each agent now has a clear boundary with escalation paths for out-of-scope requests.

**Why it matters for you:** In a multi-agent system, domain overlap causes coordination problems, conflicts, and quality issues. An agent that knows exactly what it must not do is more valuable than one that knows only what it can do. The second agent will fill silence; the first agent will escalate.

---

## Lesson 5: The Five-File Standard Needs to Exist Before the Agent, Not After

**What we tried:** For the first agent hired, the five required files (AGENTS.md, HEARTBEAT.md, SOUL.md, TOOLS.md, memory/MEMORY.md) were created concurrently with the agent going live.

**What happened:** The first heartbeat ran before HEARTBEAT.md existed. The agent improvised its execution order, and the first run was inconsistent. It required a corrective follow-up task.

**What we changed:** The hiring runbook now requires all five files to exist and be reviewed before the agent is assigned its first task. The "day-one task" is the second thing the agent does — first is to confirm all five files are readable.

**Why it matters for you:** An agent's operating context must be complete before it operates. Files created concurrently with agent operation create race conditions. The five-file standard takes 30 minutes to implement correctly; the cost of not doing it is multiple corrective runs and loss of first-run data.

---

## Lesson 6: "Done" Is a Gate, Not a Timestamp

**What we tried:** Early task closure looked like: agent finishes work → updates Paperclip to `done` → moves on.

**What happened:** Several tasks marked `done` were missing file commits, missing documentation updates, or had not triggered the QC review cycle. "Done" had become a timestamp indicating when the agent stopped, not when the work was accepted.

**What we changed:** The Definition of Done (output-standards.md, Section 1) now requires explicit verification at closure: file exists at correct path, review was obtained, Paperclip issue has a closing comment with the deliverable link. QCAgent enforces this as a gate, not a courtesy check.

**Why it matters for you:** "Done" in an agent system must be defined precisely. An agent that marks something done because it stopped working is not done — it is abandoned. Build a DoD that requires evidence, not intention.

---

*Source documents: [output-standards.md](../output-standards.md), [qc-review.md](../runbooks/qc-review.md), [memory-enforcement-protocol.md](../runbooks/memory-enforcement-protocol.md), BOAA-59 (QC audit), BOAA-63 (post-remediation score)*
