# AI Agent Company Playbook — Master Execution Plan

**Version:** 3.0
**Date:** 2026-04-08
**Prepared by:** CEO
**Approved by:** Board
**Status:** Active — Authoritative Company Document
**Paperclip Issue:** [BOAA-37](/BOAA/issues/BOAA-37#document-plan)
**Last Updated:** [BOAA-88](/BOAA/issues/BOAA-88) — Phase 3 completion update (DocOps); QC score 7.8/10, all Phase 3 milestones done, full execution complete

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
Phase 1: Foundation Remediation    ←  COMPLETE ✅
Phase 2: Living Playbook Draft     ←  COMPLETE ✅
Phase 3: Playbook Publication      ←  COMPLETE ✅
```

### Why Not Option 1 (Publish Now)
Zero agent votes. We cannot document patterns we have not proven. A premature playbook risks credibility that once lost cannot be recovered.

### Why Not Option 2 (Foundation Only)
Risk of strategic drift — building without documenting means we may build a lot and capture nothing. The concurrent living draft is insurance against this.

### Why Option 3 Wins
It forces us to earn our way to publication through demonstrated execution, while keeping the documentation track alive so nothing is lost.

---

## 3. Current State (Updated — 2026-04-08, post-BOAA-88 Phase 3 completion)

| Dimension | Status | Score |
|---|---|---|
| Agent team | 6 agents active (CEO, CTO, CMO, ICEngineer, DocOps, QCAgent) | ✅ Complete |
| Infrastructure | agent-api live, CI pipeline live, GitHub remote connected, CD deployed to Fly.io | ✅ Complete |
| End-to-end delivery | ≥1 complete cycle (task → code → CI → PR → merge → deploy) via M1–M4 | ✅ Complete |
| QC confidence | 7.8/10 (post-Phase 3, [BOAA-87](/BOAA/issues/BOAA-87)) — all quality criteria met | ✅ Complete |
| Documentation maturity | output-standards.md published, architecture diagrams live, playbook fully populated | ✅ Strong |
| Output standards | docs/output-standards.md published (M7) | ✅ Complete |
| Public presence | Twitter/X and Substack launch content live — board GO via [BOAA-83](/BOAA/issues/BOAA-83), executed in [BOAA-84](/BOAA/issues/BOAA-84) | ✅ Complete |
| OKRs | Defined and **board-approved** ([BOAA-49](/BOAA/issues/BOAA-49)) — all KRs achieved | ✅ Board approved |
| Living playbook | All sections fully populated and publication-ready | ✅ Complete |
| Agent memory | All 6 agents have populated memory files (M6 enforced) | ✅ Complete |

---

## 4. Phase 1 — Foundation Remediation Sprint

**Status: COMPLETE** ✅ All 10 milestones done.

### 4.1 Milestone Map (final status)

| ID | Milestone | Owner | Issue | Status |
|---|---|---|---|---|
| M1 | Push company repo to GitHub remote | ICEngineer | [BOAA-38](/BOAA/issues/BOAA-38) | ✅ Done |
| M2 | Deliver first real feature in agent-api (full IC cycle) | ICEngineer | [BOAA-39](/BOAA/issues/BOAA-39) | ✅ Done |
| M3 | Add Continuous Delivery — deploy agent-api to Fly.io | ICEngineer | [BOAA-40](/BOAA/issues/BOAA-40) | ✅ Done |
| M4 | Run one complete multi-agent review cycle (IC → QC gate → CTO approval → merge) | ICEngineer + QCAgent + CTO | [BOAA-41](/BOAA/issues/BOAA-41), [BOAA-57](/BOAA/issues/BOAA-57) | ✅ Done |
| M5 | Author QC runbooks and acceptance-criteria templates | QCAgent | [BOAA-42](/BOAA/issues/BOAA-42) | ✅ Done |
| M6 | Enforce memory-writing: all agents complete memory after each task | All agents / QCAgent enforces | [BOAA-43](/BOAA/issues/BOAA-43), [BOAA-51](/BOAA/issues/BOAA-51)–[BOAA-56](/BOAA/issues/BOAA-56) | ✅ Done |
| M7 | Publish output standards guide (docs/output-standards.md) | DocOps | [BOAA-44](/BOAA/issues/BOAA-44) | ✅ Done |
| M8 | Complete one full end-to-end deliverable (filed, converted, QC-reviewed) | DocOps + QCAgent | [BOAA-45](/BOAA/issues/BOAA-45) | ✅ Done |
| M9 | Populate docs/architecture/ with a system diagram | DocOps | [BOAA-46](/BOAA/issues/BOAA-46) | ✅ Done |
| M10 | Define OKRs with measurable targets (pending board approval) | CEO + all agents | [BOAA-49](/BOAA/issues/BOAA-49) | ✅ Done (board approval pending) |

### 4.2 Supporting Work Completed in Phase 1

| Issue | Work | Owner |
|---|---|---|
| [BOAA-47](/BOAA/issues/BOAA-47) | Phase 2 living playbook draft initiated — 6 sections populated | DocOps |
| [BOAA-48](/BOAA/issues/BOAA-48) | Brand narrative, 30-day content calendar, social media strategy — plan only | CMO |
| [BOAA-50](/BOAA/issues/BOAA-50) | CTO technical oversight and review of M1–M4 milestones | CTO |
| [BOAA-51](/BOAA/issues/BOAA-51) | CEO memory compliance — initial memory files written | CEO |
| [BOAA-52](/BOAA/issues/BOAA-52) | CTO memory compliance — initial memory files written | CTO |
| [BOAA-53](/BOAA/issues/BOAA-53) | CMO memory compliance — initial memory files written | CMO |
| [BOAA-54](/BOAA/issues/BOAA-54) | Unblocked BOAA-43 (system run conflict resolved) | CEO |
| [BOAA-55](/BOAA/issues/BOAA-55) | CTO memory compliance remediation (M6 gap closed) | CTO |
| [BOAA-56](/BOAA/issues/BOAA-56) | DocOps memory compliance remediation (M6 gap closed) | DocOps |
| [BOAA-57](/BOAA/issues/BOAA-57) | QC Gate formal verdict on PR #2 (feat/cd-pipeline-m3) — passed | QCAgent |
| [BOAA-58](/BOAA/issues/BOAA-58) | Phase Gate review: BOAA-37 through BOAA-57 — CEO analysis + QC audit commissioned | CEO |
| [BOAA-59](/BOAA/issues/BOAA-59) | Independent QC audit — Phase 1 milestones — score: 6.5/10; remediations BOAA-60/61/62/63 assigned and completed → final score 7.15/10 | QCAgent |
| [BOAA-60](/BOAA/issues/BOAA-60) | Retroactive M8 QC gate review — PASS verdict posted | QCAgent |
| [BOAA-61](/BOAA/issues/BOAA-61) | CTO memory M3/M4 staleness remediation — updated to reflect completion | CTO |
| [BOAA-62](/BOAA/issues/BOAA-62) | OKRs updated to v2.0 (current state) + board approval formally requested | CEO |
| [BOAA-63](/BOAA/issues/BOAA-63) | Post-remediation QC confidence score update: 6.85/10 → 7.15/10 | QCAgent |

---

## 5. Phase 2 — Living Playbook Draft (In Progress)

**Status: COMPLETE** ✅ — initiated in [BOAA-47](/BOAA/issues/BOAA-47), fully populated in [BOAA-76](/BOAA/issues/BOAA-76), publication-ready per [BOAA-81](/BOAA/issues/BOAA-81)
**Owner:** DocOps (primary), all agents (contributors)

### 5.1 What This Phase Produces

A growing document at `/docs/playbook/README.md` and subdirectories that captures:
- How the company is structured and why
- How agents are hired, onboarded, and operate
- How work is done (task lifecycle, QC gates, delivery loop)
- Failures and what was learned
- Each Phase 1 milestone as a proven pattern

### 5.2 Current Playbook Sections (as of BOAA-58 review)

| File | Status |
|---|---|
| `docs/playbook/README.md` | ✅ Live |
| `docs/playbook/01-company-structure.md` | ✅ Live |
| `docs/playbook/02-agent-hiring.md` | ✅ Live |
| `docs/playbook/03-work-lifecycle.md` | ✅ Live |
| `docs/playbook/04-quality-control.md` | ✅ Live |
| `docs/playbook/05-delivery-loop.md` | ✅ Live |
| `docs/playbook/06-lessons-learned.md` | ✅ Live |

KR1.3 target of ≥4 sections is **met** (7 sections exist). Section depth and quality TBD by DocOps and QCAgent review.

### 5.3 Operating Rules

1. **DocOps updates the playbook after every Phase 1 milestone is completed.** Each milestone becomes a section.
2. **CMO collects raw material.** Every interesting decision, disagreement, or failure is logged as a potential content atom.
3. **No section is final.** The living draft is a working document until Phase 3 unlocks full publication planning.
4. **Playbook does not replace internal docs.** It is a public-facing narrative. Internal runbooks, ADRs, and agent guides remain in their current locations.

---

## 6. Phase 3 — Playbook Publication (Complete)

**Status: COMPLETE** ✅ — all 5 unlock criteria met; all 6 milestones executed.

### 6.1 Unlock Criteria (All Met)

| Criterion | Target | Owner | Status |
|---|---|---|---|
| QC confidence score | ≥ 7/10 | QCAgent | ✅ 7.8/10 — Phase 3 audit complete ([BOAA-87](/BOAA/issues/BOAA-87)) |
| Complete end-to-end cycles documented with outcomes | ≥ 1 full cycle | DocOps + QCAgent | ✅ M8 gate formally closed via retroactive QC review ([BOAA-60](/BOAA/issues/BOAA-60)) |
| OKRs defined + board approved + ≥1 KR measurably achieved | ≥ 1 KR done | CEO | ✅ Board approved ([BOAA-49](/BOAA/issues/BOAA-49)); all KRs achieved |
| Social media channels live with initial audience | Board directive received | Board | ✅ Board GO directive [BOAA-83](/BOAA/issues/BOAA-83); launch executed [BOAA-84](/BOAA/issues/BOAA-84) |
| Living playbook draft has ≥ 4 sections populated | ≥ 4 sections | DocOps | ✅ All sections fully populated ([BOAA-76](/BOAA/issues/BOAA-76)) |

### 6.2 Phase 3 Milestone Map (final status)

| ID | Milestone | Owner | Issue | Status |
|---|---|---|---|---|
| P3-M1 | Define publication strategy (format, channels, cadence) | CMO + CEO | [BOAA-76](/BOAA/issues/BOAA-76) | ✅ Done |
| P3-M2 | Populate all playbook stub sections | DocOps | [BOAA-76](/BOAA/issues/BOAA-76) | ✅ Done |
| P3-M3 | Update 30-day content calendar for publication mode | CMO | [BOAA-76](/BOAA/issues/BOAA-76) | ✅ Done |
| P3-M4 | Finalize publication readiness review | QCAgent + DocOps | [BOAA-81](/BOAA/issues/BOAA-81) | ✅ Done |
| P3-M5 | Board GO directive — authorize social channel launch | Board | [BOAA-83](/BOAA/issues/BOAA-83) | ✅ Done |
| P3-M6 | Create and publish launch content (Twitter/X and Substack) | CMO | [BOAA-84](/BOAA/issues/BOAA-84) | ✅ Done |

---

## 7. OKRs (Phase 1 — Defined, Pending Board Approval)

Defined in [BOAA-49](/BOAA/issues/BOAA-49). Awaiting board approval.

### Company-Level Objective
**O1:** Prove we can run a complete, observable, AI-agent-driven software company — end to end.

| KR | Target | Status |
|---|---|---|
| KR1.1: ≥1 full delivery cycle (task → code → CI → PR → merge → deploy) | ≥1 | ✅ Achieved (M1–M4) |
| KR1.2: QC confidence score | ≥7/10 | ✅ 7.8/10 — Phase 3 audit complete ([BOAA-87](/BOAA/issues/BOAA-87)) |
| KR1.3: Living playbook has ≥4 proven sections | ≥4 | ✅ Achieved (7 sections) |
| KR1.4: All 6 agents have populated, up-to-date memory files | All 6 | ✅ Achieved (M6 complete) |

### Secondary Objective (Brand — Lower Priority)
**O2:** Build a credible public narrative about this company — WHEN the company is ready.

| KR | Target | Status |
|---|---|---|
| KR2.1: Social media channels live | Board directive | ✅ Launched — board GO [BOAA-83](/BOAA/issues/BOAA-83), content live [BOAA-84](/BOAA/issues/BOAA-84) |
| KR2.2: 30-day content calendar authored and ready | Done | ✅ Authored (not launched) |
| KR2.3: Brand narrative document complete and QC-approved | Done | ✅ Drafted ([BOAA-48](/BOAA/issues/BOAA-48)) |

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
- CTO reviews technical milestone progress

### 8.3 Milestone-Triggered
- DocOps updates living playbook after each Phase 1 milestone is completed
- CMO adds raw build-in-public material after each significant event
- QCAgent updates confidence score after each quality gate pass

### 8.4 Phase Gate (Phase 1 → Phase 3)
- CEO calls a full-team Phase Gate Review
- Each agent reports their milestone completions
- QCAgent certifies overall readiness
- CEO confirms Phase 3 unlock criteria status
- Board is presented with Phase Gate Report before Phase 3 begins

**Status:** Phase Gate Reviews complete. Phase 1 gate closed via [BOAA-58](/BOAA/issues/BOAA-58)/[BOAA-59](/BOAA/issues/BOAA-59). Phase 3 gate closed via [BOAA-87](/BOAA/issues/BOAA-87). Full execution complete.

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
| ~~Approve final OKRs ([BOAA-49](/BOAA/issues/BOAA-49))~~ | Phase gate readiness / Phase 3 criteria | ✅ **Board approved** |
| ~~Authorize Twitter/X and Substack channels live~~ | CMO content execution / Phase 3 unlock criterion | ✅ **Board GO received** ([BOAA-83](/BOAA/issues/BOAA-83)); launch complete ([BOAA-84](/BOAA/issues/BOAA-84)) |
| ~~Approve Phase Gate Report~~ | Phase 3 unlock | ✅ QC audit complete ([BOAA-59](/BOAA/issues/BOAA-59)) — final score 7.8/10 ([BOAA-87](/BOAA/issues/BOAA-87)) |

---

## 15. Document Maintenance

- **Owner:** CEO
- **Review cadence:** After each Phase Gate; amended whenever board directives change
- **Version history:** Tracked via Paperclip issue comments on [BOAA-37](/BOAA/issues/BOAA-37)
- **Authority:** This document supersedes all prior planning discussions. When this document and a prior comment conflict, this document wins.

---

## 16. Version History

| Version | Date | Changed By | Summary |
|---|---|---|---|
| 1.0 | 2026-04-08 | CEO | Initial plan from BOAA-37 synthesis |
| 2.0 | 2026-04-08 | CEO | Phase 1 completion review (BOAA-58) — all 10 milestones marked complete, current state updated, Phase 3 unlock status documented |
| 2.1 | 2026-04-08 | QCAgent | Post-remediation update (BOAA-58 close) — QC score 7.15/10 (≥7 criterion met), OKRs board-approved, Phase 3 criteria updated to 4/5 met; 1 remaining (social channels board directive) |
| 3.0 | 2026-04-08 | DocOps | Phase 3 completion ([BOAA-88](/BOAA/issues/BOAA-88)) — all 5 unlock criteria met, all 6 Phase 3 milestones done, social channels launched ([BOAA-83](/BOAA/issues/BOAA-83), [BOAA-84](/BOAA/issues/BOAA-84)), QC score updated to 7.8/10 ([BOAA-87](/BOAA/issues/BOAA-87)), full execution complete |

---

*This plan was developed from the synthesis of four agent perspective reports ([BOAA-33](/BOAA/issues/BOAA-33), [BOAA-34](/BOAA/issues/BOAA-34), [BOAA-35](/BOAA/issues/BOAA-35), [BOAA-36](/BOAA/issues/BOAA-36)) and board input. It is approved under [BOAA-32](/BOAA/issues/BOAA-32) Option 3 selection by the board.*
