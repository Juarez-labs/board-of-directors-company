# AI Agent Company Playbook — Master Execution Plan

**Version:** 1.0
**Date:** 2026-04-08
**Prepared by:** CEO
**Approved by:** Board
**Status:** Active — Authoritative Company Document
**Paperclip Issue:** [BOAA-37](/BOAA/issues/BOAA-37#document-plan)

> This document is the operational backbone of the Board of Directors company. All agents MUST reference it when triaging work, writing plans, and setting priorities. It supersedes any prior planning documents.

---

## 1. North Star

**Mission:** Build and publish the definitive playbook for running a business entirely with AI agents — proven by actually doing it.

**Why this order matters:** We publish a playbook about patterns we have proven, not patterns we aspire to. Credibility is the product. Before we talk publicly, we must have done the thing publicly.

**Board Directive (Non-negotiable):** Build a company we can be proud to take public. Brand and marketing exist to support that company — they do not lead it. Social media channels are planned but not implemented until company readiness criteria are met.

---

## 2. Strategic Framework — Option 3 (Approved)

Three phases run in sequence, with Phase 2 beginning concurrently with Phase 1 and Phase 3 unlocked by explicit criteria.

```
Phase 1: Foundation Remediation    ←  NOW
Phase 2: Living Playbook Draft     ←  CONCURRENT with Phase 1
Phase 3: Playbook Publication      ←  TRIGGERED (criteria below)
```

### Why Not Option 1 (Publish Now)
Zero agent votes. We cannot document patterns we have not proven. A premature playbook risks credibility that once lost cannot be recovered.

### Why Not Option 2 (Foundation Only)
Risk of strategic drift — building without documenting means we may build a lot and capture nothing. The concurrent living draft is insurance against this.

### Why Option 3 Wins
It forces us to earn our way to publication through demonstrated execution, while keeping the documentation track alive so nothing is lost.

---

## 3. Current State (Baseline — 2026-04-08)

| Dimension | Status | Score |
|---|---|---|
| Agent team | 6 agents active (CEO, CTO, CMO, ICEngineer, DocOps, QCAgent) | ✅ Sufficient |
| Infrastructure | agent-api scaffolded, CI pipeline live, GitHub remote not yet connected | ⚠️ Partial |
| End-to-end delivery | Zero complete cycles (task → code → CI → PR → merge → deploy) | ❌ None |
| QC confidence | 3/10 — process scaffolded but never run under observation | ❌ Low |
| Documentation maturity | Structure ~60%, content ~20% | ⚠️ Partial |
| Output standards | Not yet authored | ❌ None |
| Public presence | Channels not live | ⏸️ Paused (Board directive) |
| OKRs | Stubs only | ❌ Not defined |

---

## 4. Phase 1 — Foundation Remediation Sprint

**Target duration:** 4–6 weeks from plan activation
**Gate:** All Phase 1 milestones marked done by owning agent and QC-verified

### 4.1 Milestone Map (ordered)

| ID | Milestone | Owner | Depends On |
|---|---|---|---|
| M1 | Push company repo to GitHub remote | ICEngineer | — |
| M2 | Deliver first real feature in agent-api (full IC cycle: checkout → code → CI → PR → merge) | ICEngineer | M1 |
| M3 | Add Continuous Delivery — deploy agent-api to a live environment | ICEngineer / CTO | M2 |
| M4 | Run one complete multi-agent review cycle (IC → QC gate → CTO approval → merge) | ICEngineer + QCAgent + CTO | M2 |
| M5 | Author QC runbooks and acceptance-criteria templates | QCAgent | — |
| M6 | Enforce memory-writing: all agents complete memory after each task | All agents (enforced by QCAgent) | M5 |
| M7 | Publish output standards guide (docs/output-standards.md) | DocOps | — |
| M8 | Complete one full end-to-end deliverable (filed, converted, QC-reviewed) | DocOps + QCAgent | M5, M7 |
| M9 | Populate docs/architecture/ with a system diagram | DocOps | M7 |
| M10 | Define OKRs with measurable targets (CEO reviews, board approves) | CEO + all agents | M5 |

### 4.2 Agent Execution Responsibilities — Phase 1

#### CEO
- Define OKRs with measurable targets in collaboration with all agents (M10)
- Coordinate Phase 1 milestone tracking — unblock agents when needed
- Plan social media strategy document (CMO input required) — DO NOT implement channels until board directs
- Run weekly heartbeat review of Phase 1 progress

#### CTO
- Technical oversight of M1–M4
- Review ICEngineer PRs for M2, M3, M4
- Sign off on architecture decisions (ADRs) for CD pipeline (M3)
- Ensure M4 multi-agent review cycle runs correctly

#### ICEngineer
- Execute M1: Connect local repo to GitHub remote, push current state
- Execute M2: Deliver one real feature — a non-trivial, PR-merged change with passing CI
- Execute M3: Add CD — agent-api deployed and reachable in a live environment
- Execute M4: Complete one full multi-agent review cycle as the IC

#### QCAgent
- Execute M5: Write QC runbooks — at minimum: PR review checklist, acceptance criteria template, memory-enforcement protocol
- Execute M6: Enforce memory-writing discipline — audit agent memories after each task; flag violations
- Participate in M4: Run QC review gate as gatekeeper
- Verify completion of M8: Confirm DocOps deliverable meets output standards
- Update QC confidence score monthly; target ≥7/10 to unlock Phase 3

#### DocOps
- Execute M7: Publish docs/output-standards.md — defines what a complete deliverable looks like for this company
- Execute M8: Complete one full end-to-end deliverable that goes through M7 standards and M5 QC gate
- Execute M9: Create docs/architecture/ system diagram — one diagram showing agent relationships, data flows, and key infrastructure
- Begin Phase 2 living playbook draft (see Section 5) concurrently

#### CMO
- Draft social media strategy document and 30-day content calendar — **plan only, no publish**
- Identify and document the brand narrative: what this company is, who it is for, why it matters
- Begin collecting raw build-in-public material (agent decisions, failures, iterations) as source content for future publishing
- **No channel launch until board directs.** Marketing is the lowest priority in Phase 1.

---

## 5. Phase 2 — Living Playbook Draft (Concurrent)

**Starts:** Immediately — runs alongside Phase 1
**Owner:** DocOps (primary), all agents (contributors)

### 5.1 What This Phase Produces

A growing document at `/docs/playbook/README.md` and subdirectories that captures:
- How the company is structured and why
- How agents are hired, onboarded, and operate
- How work is done (task lifecycle, QC gates, delivery loop)
- Failures and what was learned
- Each Phase 1 milestone as a proven pattern

### 5.2 Operating Rules

1. **DocOps updates the playbook after every Phase 1 milestone is completed.** Each milestone becomes a section.
2. **CMO collects raw material.** Every interesting decision, disagreement, or failure is logged as a potential content atom.
3. **No section is final.** The living draft is a working document until Phase 3 unlocks full publication planning.
4. **Playbook does not replace internal docs.** It is a public-facing narrative. Internal runbooks, ADRs, and agent guides remain in their current locations.

### 5.3 Playbook Directory Structure (Target)

```
docs/playbook/
  README.md              ← master index
  01-company-structure.md
  02-agent-hiring.md
  03-work-lifecycle.md
  04-quality-control.md
  05-delivery-loop.md
  06-lessons-learned.md
  [additional sections as milestones are proven]
```

---

## 6. Phase 3 — Playbook Publication Planning (Triggered)

**Status:** LOCKED — do not begin until all unlock criteria are met

### 6.1 Unlock Criteria (All Must Be True)

| Criterion | Target | Owner |
|---|---|---|
| QC confidence score | ≥ 7/10 | QCAgent |
| Complete end-to-end cycles documented with outcomes | ≥ 1 full cycle | DocOps + QCAgent |
| OKRs defined and at least one KR measurably achieved | ≥ 1 KR done | CEO |
| Social media channels live with initial audience | Board directive received | Board |
| Living playbook draft has ≥ 4 sections populated | ≥ 4 sections | DocOps |

### 6.2 What Phase 3 Planning Produces

- Publication strategy (format, channels, cadence)
- Final playbook structure review
- CMO-led distribution and launch plan
- Board-approved go/no-go decision

---

## 7. OKRs (To Be Finalized in Phase 1 / M10)

*These are seed OKRs. CEO + all agents will define measurable targets in M10. Board approves final OKRs.*

### Company-Level Objective
**O1:** Prove we can run a complete, observable, AI-agent-driven software company — end to end.

**KR1.1:** Complete at least 1 full delivery cycle (task → code → CI → PR → merge → deploy) by end of Phase 1
**KR1.2:** QC confidence score reaches ≥ 7/10 by end of Phase 1
**KR1.3:** Living playbook has ≥ 4 proven sections by end of Phase 1
**KR1.4:** All 6 agents have populated, up-to-date memory files by end of Phase 1

### Secondary Objective (Brand — Lower Priority)
**O2:** Build a credible public narrative about this company — WHEN the company is ready.

**KR2.1:** Social media channels live (pending board directive)
**KR2.2:** 30-day content calendar authored and ready to execute
**KR2.3:** Brand narrative document complete and QC-approved

---

## 8. Operating Cadences

These routines are mandatory. Each agent must participate in cadences relevant to their role.

### 8.1 Per-Task (Every Task)
- Agent checks out task, does work, writes memory after completion
- QCAgent reviews any deliverable marked done before final status change (if QC gate applies)
- All agents link relevant prior tasks or runbooks in their comments

### 8.2 Weekly
- CEO reviews all in-progress tasks; unblocks or escalates stalled work
- QCAgent audits memory compliance — files violation report if agents skipped memory-writing
- CTO reviews technical milestone progress (M1–M4)

### 8.3 Milestone-Triggered
- DocOps updates living playbook after each Phase 1 milestone is completed
- CMO adds raw build-in-public material after each significant event
- QCAgent updates confidence score after each quality gate pass

### 8.4 Phase Gate (When Phase 1 Completes)
- CEO calls a full-team Phase Gate Review
- Each agent reports their milestone completions
- QCAgent certifies overall readiness
- CEO confirms Phase 3 unlock criteria status
- Board is presented with Phase Gate Report before Phase 3 begins

---

## 9. Quality Gates

No task is `done` unless it passes the relevant gate:

| Gate Type | Applies To | Gate Owner |
|---|---|---|
| PR Review | All code changes | CTO (review) + CI (automated) |
| QC Review | Deliverables, runbooks, standards docs | QCAgent |
| Memory Check | All task completions | QCAgent (enforcement) |
| CEO Approval | OKR definitions, Phase Gate Reports | CEO |
| Board Approval | Phase 3 unlock, publication plans | Board |

---

## 10. Roles & Reporting Structure

```
Board
  └── CEO
        ├── CTO
        │     └── ICEngineer
        ├── CMO
        ├── DocOps
        └── QCAgent
```

### Decision Authority
| Decision | Who Decides |
|---|---|
| Task assignment | CEO (strategic), agent self-assigns from queue |
| Technical architecture | CTO (ADR required for major decisions) |
| Content publishing | Board (final); CMO (planning) |
| QC pass/fail | QCAgent (binding) |
| Phase gate approval | CEO (reviews) → Board (approves) |
| Hiring new agents | CEO proposes → Board approves |

---

## 11. Agent File Standards (Mandatory for All Agents)

Every agent MUST maintain the following files in their directory:

| File | Purpose |
|---|---|
| `AGENTS.md` | Heartbeat instructions and operating rules |
| `HEARTBEAT.md` | What the agent checks and does on each heartbeat |
| `SOUL.md` | Agent identity, values, and voice |
| `TOOLS.md` | Tools the agent has access to |
| `memory/MEMORY.md` | Memory index with links to memory files |

QCAgent audits these files monthly. Missing files are a P1 blocker.

---

## 12. Escalation Paths

| Situation | Who to Escalate To |
|---|---|
| Technical blocker (infra, CI, CD) | CTO |
| Cross-team dependency conflict | CEO |
| Board action required | CEO → Board |
| Quality gate dispute | QCAgent → CEO |
| Agent is non-responsive or stale | CEO → reassign or hire |
| Budget approaching 80% | CEO → prioritize critical tasks only |

---

## 13. What We Do NOT Do (Anti-Patterns)

1. **Do not publish marketing content until board directs.** CMO plans and prepares, does not execute.
2. **Do not skip QC gates.** A task is not done until QC says it is done.
3. **Do not write playbook content about unproven patterns.** Only document what has been done.
4. **Do not create speculative architecture.** Build what the current phase needs.
5. **Do not allow empty agent memory files.** Memory-writing is mandatory, not optional.
6. **Do not begin Phase 3 without all unlock criteria verified.** Phase gates are hard stops.
7. **Do not work on tasks not assigned to you.** Check in, check out — no side work.

---

## 14. Open Board Actions

The following require board input or action and are blocking certain work:

| Action | Blocked Work | Status |
|---|---|---|
| Authorize Twitter/X and Substack channels live | CMO content execution, Phase 3 unlock | Pending board directive |
| Approve final OKRs (after M10 draft) | Phase gate readiness criteria | Pending CEO + agent input |
| Approve Phase Gate Report (end of Phase 1) | Phase 3 unlock | Future |

---

## 15. Document Maintenance

- **Owner:** CEO
- **Review cadence:** After each Phase Gate; amended whenever board directives change
- **Version history:** Tracked via Paperclip issue comments on [BOAA-37](/BOAA/issues/BOAA-37)
- **Authority:** This document supersedes all prior planning discussions. When this document and a prior comment conflict, this document wins.

---

*This plan was developed from the synthesis of four agent perspective reports ([BOAA-33](/BOAA/issues/BOAA-33), [BOAA-34](/BOAA/issues/BOAA-34), [BOAA-35](/BOAA/issues/BOAA-35), [BOAA-36](/BOAA/issues/BOAA-36)) and board input. It is approved under [BOAA-32](/BOAA/issues/BOAA-32) Option 3 selection by the board.*
