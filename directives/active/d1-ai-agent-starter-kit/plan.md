# Directive D1 — AI Agent Company Starter Kit
## Execution Plan (Final — Board Approved)

**Directive Code:** D1
**Prepared by:** CEO
**QC Reviewed by:** QCAgent ([BOAA-97](/BOAA/issues/BOAA-97))
**Board Approved:** 2026-04-09
**Revision:** 3 — Board priority preferences integrated
**Duration:** 90 days (13 sprints × 1 week each, with buffer)
**Project:** [Directive D1](/BOAA/projects/directive-d1)
**Source:** [BOAA-92](/BOAA/issues/BOAA-92)
**Status:** ACTIVE — Execution begins Sprint 1
**Living document:** Updated as work progresses. Check [log.md](./log.md) for running decisions and status.

---

## Board Questions Answered

### Q1 — What is an MIT License? Do I need one? How do I get it?

An **MIT License** is the most common open-source software license. It tells anyone who finds your code: *"You can use, copy, modify, distribute, and sell this freely — just keep the copyright notice."* It is permissive, business-friendly, and widely trusted.

**How do you get one?** There is nothing to register or pay for. You create a file called `LICENSE` in your repository containing the standard MIT License text with your name and year. ICEngineer will do this in WS1-T2 (Sprint 1). That's it — you now have an MIT License.

**Is it an issue that you don't have one yet?** No. The license file is created when we scaffold the public GitHub repo (WS1-T2, Sprint 1). Until the repo is public, there is no licensing exposure. The decision that matters before Sprint 1 ends is simply: **MIT or Apache 2.0?** CEO recommends MIT for maximum adoption. Board confirms this before Sprint 1 ends.

**MIT vs Apache 2.0 (brief):** Both are permissive. Apache 2.0 adds an explicit patent grant, which can matter for enterprise users. For a starter kit targeting builders and developers, MIT is simpler and more familiar. Either is fine — we just need to decide before the first commit.

---

### Q2 — What is the purpose of work streams, sprints, and milestones?

These three layers exist to make 90 days of coordinated work by 6 agents manageable and legible:

**Work Streams (WS):** Parallel tracks of work organized by theme. Each work stream has a single owner and a clear deliverable. Because they run in parallel, the team makes progress on multiple fronts simultaneously instead of waiting for one thing to finish before starting another. D1 has 5 work streams: the starter kit, shared memory, social automation, QC, and handoff protocols.

**Sprints (S1–S13):** Fixed 1-week time boxes. Every week, each agent knows exactly what they are working on. Sprints create rhythm: at the end of each week, we can see what was done and adjust the next week's focus. They also prevent indefinite drifting — if a task is not done by the end of its sprint, that's a visible signal, not a silent delay.

**Milestones (D1-M1–M7):** Quality gates at meaningful phases. A milestone is not just "we completed some tasks" — it is a checkpoint where QCAgent formally verifies the work meets the success criteria before we proceed. If a milestone scores below 7.5/10, we fix it before moving on. Milestones are also the reporting points for the board (you) — at D1-M6, you approve the v1.0 publish; at D1-M7, you sign off the whole directive.

**In short:** Work streams let us go wide. Sprints let us stay on pace. Milestones let us know we're on track.

---

### Q3 — Board Priority Input: WS-2, WS-4, WS-5 first; then WS-3; then WS-1 completion

**CEO Assessment:** The board's priority ordering is strategically sound and compatible with the plan — it just needed to be made explicit. Here is the reasoning:

WS-4 (QC) and WS-5 (Handoffs) launch in **Sprint 1** — the earliest possible point. ✓

WS-2 (Shared Memory) launches in **Sprint 2** at full intensity. It runs through Sprint 9. ✓

WS-3 (Social Automation) launches in **Sprint 2** alongside WS-2. ✓

WS-1 (Starter Kit) begins its setup in Sprint 1–2, but the **heavy lifting and packaging happen in Sprints 9–12** — *after* WS-2, WS-4, and WS-5 have been proven.

This is the key insight: **WS-1 is the packaging layer.** The starter kit will only be as good as what goes into it. By completing WS-2 (shared memory), WS-4 (QC framework), and WS-5 (handoff protocols) first, WS-1 packages a proven, battle-tested system — not a sketch. The board's priority ordering and the plan's critical path are naturally aligned.

**Board preferences integrated into this revision:**
- Sprint plan now explicitly labels WS-4/WS-5 as Priority Tier 1, WS-2 as Priority Tier 2, WS-3 as Tier 3, WS-1 packaging as Tier 4 (the synthesis)
- If resource conflicts arise, this tier order governs which work gets attention first
- The sprint overview table below reflects this with priority markers

**"Ideally the starter kit would have all items completed as part of this directive"** — Agreed. The plan closes with D1-M7 including all 5 work streams. Nothing is deferred to a future directive. WS-1 is the container that holds the rest.

---

## 1. Mission & Strategic Context

**Mission:** Package everything the Board of Directors company has built into a reusable, launchable starter kit that any business can use to stand up their own AI agent company — protected by a billing/paywall tier.

**Why now:**
- All 3 phases of our Master Execution Plan are complete
- We have proven the pattern; packaging it is the natural next product
- The board explicitly endorsed this as most interesting and feasible
- D1 is the foundation for the long-term company goal: "Build an Agent-as-a-Service public platform"

**What D1 is NOT:**
- Not a full AaaS platform (that is the company goal D1 builds toward)
- Not an audience growth campaign (CMO work is secondary and automation-focused)
- Not a research project — each WS has a concrete, shippable deliverable

**License decision (Board to confirm before S1):** The starter kit will be released under the **MIT License** unless the board specifies otherwise. This decision must be made before WS1-T2 (repo scaffold) so it is baked into the initial commit.

---

## 2. Team & Ownership

| Role | Agent | D1 Responsibilities |
|---|---|---|
| Director | CEO | Strategy, cross-WS coordination, board reporting, QC gates, S1 Paperclip milestone setup |
| Technical Lead | CTO | WS-1 architecture + billing design, WS-2 (design + later tasks), WS-3 API integrations |
| Execution Engineer | ICEngineer | WS-1 implementation, repo scaffolding, CI/CD, billing PoC, **WS2-T2 (shared store impl)** |
| Marketing Automation | CMO | WS-3 content workflow, X posting automation |
| Quality & Process | QCAgent | WS-4 QC integration, WS-5 handoff protocols, all QC gates |
| Documentation | DocOps | WS-1 documentation, setup guides, template documentation |

> **DocOps prerequisite:** Confirm DocOps agent is active and configured before Sprint 1 ends. DocOps is needed from S2 onward (WS1-T4, WS1-T5). CEO to verify in S1.

---

## 3. Work Stream Priority Tiers (Board-Directed)

| Priority Tier | Work Streams | Rationale |
|---|---|---|
| **Tier 1 — Foundations** | WS-4 (QC), WS-5 (Handoffs) | Internal process infrastructure; launches S1 |
| **Tier 2 — Core Systems** | WS-2 (Shared Memory) | Architectural capability all agents will depend on |
| **Tier 3 — Automation** | WS-3 (Social Media) | External-facing automation; depends on X API |
| **Tier 4 — Packaging** | WS-1 (Starter Kit) | Synthesizes all other WS into the shippable product; peaks S9-S12 |

If resource conflicts arise between work streams, resolve in tier order. WS-1 "packaging" work is never blocked — it runs on its own scaffold track in parallel — but deepens in Tier 4 only after Tier 1-3 foundations are proven.

---

## 4. Work Streams

### WS-1: Core Starter Kit
**Priority Tier:** 4 (Packaging — runs parallel, intensifies S9–S12)
**Owner:** ICEngineer (execution) + CTO (architecture) + DocOps (docs)
**Goal:** A public GitHub template repository that any team can fork and use to stand up an AI agent company identical to ours — complete with Paperclip integration, agent templates, and a billing/paywall layer.

#### Deliverables
1. **Company Directory Structure Template** — Mirrored from `Board of Directors company/`, sanitized of secrets
2. **Agent AGENTS.md Templates** (one per role) — CEO, CTO, CMO, QCAgent, DocOps, ICEngineer; parameterized
3. **Paperclip Setup Guide** — Step-by-step install, create company, hire agents, connect workspace, troubleshooting
4. **agent-api Scaffold** — Baseline API with GitHub Actions CI/CD, health endpoint, auth middleware, Fly.io deployment
5. **Billing/Paywall Tier Architecture** — Open-core model; architecture doc + Stripe integration PoC with at least one gated route

#### Task Breakdown (WS-1)
| ID | Task | Owner | Sprint | Depends On |
|---|---|---|---|---|
| WS1-T1 | Audit current company folder; identify what to include in template | ICEngineer | S1 | — |
| WS1-T2 | Scaffold starter-kit GitHub repo (structure, .gitignore, MIT LICENSE) | ICEngineer | S1 | WS1-T1 |
| WS1-T3 | Create sanitized company directory structure in repo | ICEngineer | S2 | WS1-T2 |
| WS1-T4 | Write parameterized AGENTS.md templates for all 6 roles | DocOps | S2-S3 | WS1-T1 |
| WS1-T5 | Write Paperclip setup guide (draft) | DocOps | S3 | WS1-T2 |
| WS1-T6 | CTO: design agent-api scaffold architecture | CTO | S2 | — |
| WS1-T7 | ICEngineer: implement agent-api scaffold + CI/CD pipeline | ICEngineer | S3-S5 | WS1-T6 |
| WS1-T8 | CTO: design billing/paywall architecture (open-core model) | CTO | S4 | — |
| WS1-T9 | ICEngineer: implement billing PoC (Stripe integration stub) | ICEngineer | S6-S8 | WS1-T8 |
| WS1-T9-SEC | QCAgent: mandatory security review of billing PoC before merge | QCAgent | S8 | WS1-T9 |
| WS1-T10 | DocOps: finalize all documentation + README | DocOps | S9-S10 | WS1-T3,T4,T5,T7 |
| WS1-T11 | ICEngineer + CTO: v1.0 review + publish | ICEngineer+CTO | S10-S12 | WS1-T9-SEC,T10 |

> **Security gate:** WS1-T9 (Stripe PoC) must pass a mandatory QCAgent security review (WS1-T9-SEC) before it can be marked done. This review covers: no secrets in code, auth/payment flow correctness, input validation, and dependency vulnerability scan.

---

### WS-2: Shared Agent Memory Layer
**Priority Tier:** 2 (Core Systems)
**Owner:** CTO (design + integration tasks) + ICEngineer (WS2-T2 file-store implementation)
**Goal:** Replace per-agent file-based memory silos with a company-wide shared knowledge layer.

> **CTO load note:** To reduce single-point-of-failure risk, WS2-T2 (file-based store implementation) is assigned to ICEngineer. CTO owns design and integration; ICEngineer owns build.

#### Deliverables
1. **Shared Memory Store** — structured files at a known company path, readable by all agents
2. **Query Interface** — agents read facts by entity, topic, or tag without scanning all memory files
3. **Write Protocol** — structured schema (entity, attribute, value, date, source-agent); latest-wins with trail
4. **Memory Reconciliation Protocol** — conflict resolution: latest-wins with source trail; edge cases escalate to CEO
5. **PARA Skill Integration** — `para-memory-files` reads shared store first, falls back to private memory
6. **Starter Kit Integration** — packaged as part of WS-1 starter kit

#### Task Breakdown (WS-2)
| ID | Task | Owner | Sprint | Depends On |
|---|---|---|---|---|
| WS2-T1 | CTO: design shared memory schema + storage format | CTO | S2-S3 | — |
| WS2-T2 | ICEngineer: implement shared memory store (file-based v1) | ICEngineer | S4-S5 | WS2-T1 |
| WS2-T3 | CTO: implement query interface (read by entity/topic) | CTO | S5-S6 | WS2-T2 |
| WS2-T4 | CTO: implement write protocol + reconciliation rules | CTO | S6-S7 | WS2-T3 |
| WS2-T5 | CTO: update para-memory-files skill to use shared store | CTO | S7-S8 | WS2-T4 |
| WS2-T6 | CTO + ICEngineer: PoC validation — 2+ agents reading/writing shared store | CTO+ICEngineer | S8 | WS2-T5 |
| WS2-T7 | ICEngineer: integrate shared memory into WS-1 starter kit repo | ICEngineer | S9 | WS2-T6, WS1-T3 |

---

### WS-3: Social Media Automation
**Priority Tier:** 3 (Automation)
**Owner:** CMO (content workflow) + CTO (API integration)
**Goal:** Eliminate manual social media posting.

#### Deliverables
1. **X API Credentials Configured** — securely stored in env vars
2. **Automated Posting Workflow** — CMO drafts → staged → auto-publishes on schedule
3. **Substack Integration** — investigated; semi-automated where API allows
4. **Metrics Access** — read-only X engagement metrics for CMO reporting

**Fallback scope (if X API credentials not available by S2):** CMO and CTO build the posting workflow as a mock/simulated pipeline in S2-S3 (content queue, scheduling logic, dry-run mode). Real API credentials are slotted in when provided, without re-doing the workflow design. This ensures sprint S2-S3 is not wasted waiting on the board.

#### Task Breakdown (WS-3)
| ID | Task | Owner | Sprint | Depends On |
|---|---|---|---|---|
| WS3-T1 | **Board:** Provide X API credentials | Board | Pre-S1 | — |
| WS3-T2 | CTO: configure X API credentials in secure env store | CTO | S2 | WS3-T1 |
| WS3-T2b | CMO + CTO: build mock posting pipeline (fallback if WS3-T1 delayed) | CMO+CTO | S2-S3 | — |
| WS3-T3 | CTO: build X posting script/tool (post text + optional image) | CTO | S3 | WS3-T2 |
| WS3-T4 | CMO: define content queue format (draft → scheduled → published) | CMO | S2 | — |
| WS3-T5 | CTO: integrate content queue with posting script | CTO | S4 | WS3-T3, WS3-T4 |
| WS3-T6 | CMO + CTO: end-to-end test — queue a post, confirm it publishes | CMO+CTO | S4 | WS3-T5 |
| WS3-T7 | CTO: investigate Substack API / automation options | CTO | S3 | — |
| WS3-T8 | CTO: configure X metrics read access + CMO reporting view | CTO | S5 | WS3-T2 |

> **Board action required:** Provide X API credentials before Sprint 2. WS3-T2b (fallback mock pipeline) will run in parallel so no sprint is wasted.

---

### WS-4: Continuous QC Integration
**Priority Tier:** 1 (Foundations — launches Sprint 1)
**Owner:** QCAgent (WS4-T1 through T7) + CTO (WS4-T5)
**Goal:** Shift quality left — per-task QC checklists, weekly scoring, and CI coverage gates.

#### QC Score Formula (seed definition — QCAgent refines in WS4-T2)
**Weekly QC Score = (Issues passing all checklist items / Total issues closed that week) × 10**

Components tracked separately:
- Checklist compliance rate (primary score driver)
- Blocked-task aging (penalty: issues blocked >72h without escalation)
- Security review compliance (binary gate)
- Coverage gate pass rate (for code issues only)

Threshold: ≥7.5 to pass any milestone gate.

#### QC Checklist (Standard — all issues)
```
[ ] Deliverable matches the task description
[ ] No open sub-tasks left incomplete
[ ] Relevant documentation updated
[ ] No new `blocked` issues created as side effects
[ ] Comment trail is clear and traceable
[ ] Cross-team dependencies confirmed resolved (no downstream blocking)
[ ] Memory entries updated if task generated organizational knowledge
```

#### QC Checklist (Code issues — additional items)
```
[ ] Tests written or updated for changed code
[ ] CI pipeline passes
[ ] No secrets or credentials in committed code
[ ] PR reviewed by at least one other agent or board
[ ] Security review completed for any code handling credentials, payments, or auth
```

#### WS4-T3 — Trigger Mechanism
Paperclip does not natively trigger agents on status transitions. Implementation approach:
- **QCAgent will run a scheduled heartbeat routine** (via Paperclip cron/schedule, or periodic manual heartbeat) that scans issues closed since last run and posts the checklist as a comment if not already present.
- CTO to advise on the specific Paperclip scheduling mechanism available (cron skill or heartbeat frequency config) — WS4-T3 begins with a CTO consultation in S2 before QCAgent implements.

#### Task Breakdown (WS-4)
| ID | Task | Owner | Sprint | Depends On |
|---|---|---|---|---|
| WS4-T1 | QCAgent: define per-issue QC checklists (standard + code variants) | QCAgent | S1 | — |
| WS4-T2 | QCAgent: define rolling QC score formula and weekly tracking format | QCAgent | S1 | — |
| WS4-T3a | CTO: advise on Paperclip scheduling mechanism for QC trigger | CTO | S2 | — |
| WS4-T3b | QCAgent: implement QC checklist trigger routine | QCAgent | S2 | WS4-T3a, WS4-T1 |
| WS4-T4 | QCAgent: publish first weekly QC score | QCAgent | S2 | WS4-T2 |
| WS4-T5 | CTO: enforce test coverage gate in CI pipeline | CTO | **S5** | WS1-T7 |
| WS4-T6 | QCAgent: run 2 consecutive sprints of checklist usage and report | QCAgent | S3-S5 | WS4-T3b |
| WS4-T7 | QCAgent: package QC scorecard template for WS-1 starter kit | QCAgent | S5 | WS4-T6 |

> **Note:** WS4-T5 is in S5 (not S3-S4) because CI/CD (WS1-T7) must exist before a coverage gate can be added to it.

---

### WS-5: Agent Handoff Protocols
**Priority Tier:** 1 (Foundations — launches Sprint 1)
**Owner:** QCAgent (design + enforcement) + CEO (approval)
**Goal:** Reduce CEO intervention overhead through structured, traceable agent handoffs.

#### Handoff Standard — Required Comment Format
When any agent hands off a task, their final comment MUST include:
```
**Handoff to:** [Agent Name]
**Reason:** [brief reason for handoff]
**Context summary:** [what has been done, what state things are in]
**Blockers:** [any known blockers]
**Next action:** [specific first action for the receiving agent]
**Relevant files/links:** [list]
```

#### Escalation Thresholds (wall-clock time)
| Situation | Action |
|---|---|
| Blocked for 24h with no new context | Post blocked comment with specific blocker |
| Blocked for 72h with no new context | Escalate to direct manager |
| Blocked for 5 days with no resolution | Escalate to CEO + board notification |
| **Critical priority:** blocked for 24h | Escalate to CEO immediately (fast-track) |
| Cross-team dependency unresolved after 48h | CEO creates coordination subtask |
| Manager unresponsive for 48h | Skip to CEO directly (do not wait) |

> **Heartbeat frequency assumption:** Agents are expected to run heartbeats at least once per 24 hours. Wall-clock thresholds above assume this baseline.

#### Task Breakdown (WS-5)
| ID | Task | Owner | Sprint | Depends On |
|---|---|---|---|---|
| WS5-T1 | QCAgent: draft handoff standard document | QCAgent | S1 | — |
| WS5-T2 | QCAgent: draft escalation thresholds | QCAgent | S1 | — |
| WS5-T3 | CEO: review and approve handoff standard + escalation thresholds | CEO | S1-S2 | WS5-T1, WS5-T2 |
| WS5-T4 | QCAgent: distribute to all agents + coordinate with CEO to update AGENTS.md | QCAgent+CEO | S2 | WS5-T3 |
| WS5-T5 | QCAgent: add handoff checklist to per-issue QC checklist | QCAgent | S2 | WS5-T4, WS4-T1 |
| WS5-T6 | QCAgent: define memory hygiene protocol | QCAgent | S3 | WS5-T3 |
| WS5-T7 | QCAgent: run memory hygiene audit (start of D1) | QCAgent | S3 | WS5-T6 |
| WS5-T8a | QCAgent: **mid-point** conformance audit (handoff + escalation compliance) | QCAgent | **S6-S7** | WS5-T4 |
| WS5-T8b | QCAgent: final compliance audit at close-out | QCAgent | S13 | WS5-T8a |

> **WS5-T4 note:** Modifying agent AGENTS.md files requires CEO/manager authorization. CEO must explicitly approve and co-execute WS5-T4 in S2.

---

## 5. Sprint Plan & Milestones

### Sprint Overview (Priority markers: 🔴 Tier 1 · 🟠 Tier 2 · 🟡 Tier 3 · 🟢 Tier 4)

| Sprint | Focus | Active Priority Tiers | Milestone |
|---|---|---|---|
| S1 | 🔴 QC + handoff drafts; WS-1 audit + repo scaffold; CEO milestone setup; board X creds | T1, T4-setup | — |
| S2 | 🔴 QC protocols live, handoff approved; 🟠 WS-2 schema design; 🟡 X creds or mock pipeline; 🟢 WS-1 scaffold | T1, T2, T3, T4 | **D1-M1: QC + Handoff Protocols Live** |
| S3 | 🟠 WS-2 schema; 🟡 X posting script; 🟢 WS-1 templates + setup guide; memory hygiene | T2, T3, T4 | — |
| S4 | 🟠 WS-2 store build begins; 🟡 X automation integrated; 🟢 agent-api scaffold + billing design | T2, T3, T4 | **D1-M2: X Automation Configured** |
| S5 | 🟠 WS-2 store done; 🟡 X metrics; 🟢 agent-api scaffold done; CI coverage gate | T2, T3, T4 | — |
| S6 | 🟠 WS-2 query interface; 🔴 WS-5 mid-point audit begins; 🟢 billing PoC begins | T1, T2, T4 | — |
| S7 | 🟠 WS-2 write protocol + PARA; 🔴 WS-5 mid-point audit complete | T1, T2, T4 | — |
| S8 | 🟠 WS-2 PoC validation; 🟢 billing PoC + security review | T2, T4 | **D1-M3: Starter Kit v0.1 Scaffold** |
| S9 | 🟠→🟢 WS-2 integrated into starter kit; docs begin | T2→T4 | **D1-M4: Shared Memory PoC Live** |
| S10 | 🟢 Billing PoC done; docs finalized | T4 | **D1-M5: Billing/Paywall Architecture Done** |
| S11 | 🟢 WS-1 v1.0 review | T4 | — |
| S12 | 🟢 WS-1 v1.0 publish | T4 | **D1-M6: Starter Kit v1.0 Published** |
| S13 | 🔴 QC gate + close-out audit, retrospective | T1, T4 | **D1-M7: D1 QC Gate + Close-Out** |

### Milestone Details

| ID | Milestone | Success Criteria | Owner | Sprint |
|---|---|---|---|---|
| D1-M1 | QC + Handoff Protocols Live | Checklist active, handoff standard distributed, CEO approved | QCAgent | S2 |
| D1-M2 | X Automation Configured | ≥1 post auto-published via API (or mock pipeline validated) | CMO + CTO | S4 |
| D1-M3 | Starter Kit v0.1 Scaffold | Repo live: structure + templates + setup guide | ICEngineer | S8 |
| D1-M4 | Shared Memory PoC Live | 2+ agents reading/writing shared store without errors | CTO | S9 |
| D1-M5 | Billing/Paywall Architecture Done | Architecture doc + ≥1 gated route + security review passed | CTO | S10 |
| D1-M6 | Starter Kit v1.0 Published | Public GitHub repo, complete docs, billing PoC merged | ICEngineer | S12 |
| D1-M7 | D1 QC Gate + Close-Out | QC score ≥7.5, all SCs met, final audit passed, retrospective done | QCAgent + CEO | S13 |

---

## 6. Success Criteria

| # | Criterion | Measurement | Owner | Target Sprint |
|---|---|---|---|---|
| SC-1 | Starter kit template live on GitHub (public repo) | Repo URL exists, forkable | ICEngineer | S12 |
| SC-2 | Billing/freemium architecture defined + scaffolded | Architecture doc + PoC PR merged + security review passed | CTO | S10 |
| SC-3 | X API configured + ≥1 auto-scheduled post executed | Post published via API, not manually | CMO | S4 |
| SC-4 | Shared memory PoC: 2+ agents reading from shared store | PoC demo, no errors | CTO | S9 |
| SC-5 | Per-issue QC checklist adopted for 2+ consecutive sprints | Zero missed checklists in S3 + S4 | QCAgent | S5 |
| SC-6 | Handoff protocol documented + adopted; mid-point audit passed | Zero unstructured reassignments in S3+ | QCAgent | S7 |
| SC-7 | QC score maintained ≥7.5/10 for full duration of D1 | Weekly QC score reports | QCAgent | S13 |

---

## 7. Dependencies & Critical Path

```
S1: WS4-T1, WS4-T2, WS5-T1, WS5-T2, WS1-T1 [T1+T4 parallel]
    ↓
S2: WS4-T3a → WS4-T3b (QC trigger live)         [T1 closes]
    WS5-T3 → WS5-T4+CEO (handoff approved)       [T1 closes]
    WS1-T2, WS1-T3 (repo scaffold)               [T4 scaffold]
    WS3-T2 or WS3-T2b (X creds or mock)          [T3 opens]
    WS2-T1 (memory schema design)                 [T2 opens]
    ↓
S3-S4: WS1-T4, WS1-T5 (templates + docs)
        WS3-T3, WS3-T5 (X automation)
        WS2-T2/ICEngineer (memory store build)    [T2 peak]
        ↓
S4-S5: WS1-T6, WS1-T7 (agent-api scaffold)
        WS1-T8 (billing design)
        WS2-T3 (query interface)
        WS4-T5 ← depends on WS1-T7 (S5)
        ↓
S6-S8: WS1-T9 (billing PoC) + WS1-T9-SEC (security review)
        WS2-T4,T5,T6 (memory write + PARA + PoC) [T2 closes]
        WS5-T8a (mid-point handoff audit)
        ↓
S9-S10: WS1-T10 (docs), WS2-T7 (memory → starter kit)
         ↓
S11-S12: WS1-T11 (v1.0 review + publish)         [T4 closes]
          ↓
S13: D1 close-out + retrospective                 [T1 final gate]
```

**Critical path:** WS-1 is the longest chain (S1→S12). All other WS are parallel tracks that must deliver by S9 to feed into the final starter kit.

**Biggest blockers:**
1. **External:** X API credentials (Board must provide before S2; fallback mock pipeline mitigates sprint waste)
2. **Internal:** CTO overload — mitigated by ICEngineer owning WS2-T2

---

## 8. Governance & QC Gates

### QC Gate — Milestone Requirements
Before any milestone is marked complete, QCAgent must:
1. Verify all tasks in that milestone are `done` with complete comment trails
2. Apply the full QC checklist to all milestone deliverables
3. Post a milestone QC report as a comment on the milestone issue
4. Score the milestone (1-10) — must be **≥7.5** to proceed

### Failed QC Gate — Remediation Procedure
If a milestone scores <7.5:
1. QCAgent identifies specific failing items and proposes remediation tasks
2. CEO reviews and approves remediation task list within 24h
3. CEO announces sprint extension to the board (1 week max extension per milestone)
4. QCAgent re-scores after remediation tasks are complete
5. If remediation still fails to reach 7.5, CEO escalates to board for directive scope review

### CEO Review Points
| Checkpoint | When | Action |
|---|---|---|
| D1-M1 | S2 end | CEO reviews QC + handoff protocols before distribution |
| D1-M3 | S8 end | CEO reviews v0.1 scaffold before wider sharing |
| D1-M6 | S12 end | CEO approves v1.0 before public publish |
| D1-M7 | S13 end | CEO signs off close-out, marks D1 done |

### Escalation Chain
See WS-5 escalation thresholds for wall-clock triggers.
Chain: agent → direct manager → CEO → board

---

## 9. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| X API credentials not provided (WS3 blocker) | Medium | High | Fallback mock pipeline (WS3-T2b) built in S2-S3 — no sprint wasted |
| Billing/paywall PoC takes longer than estimated | Medium | Medium | CTO architecture doc first; ICEngineer scaffolds around it; security review budgeted in S8 |
| Stripe PoC security gap | Low | High | Mandatory QCAgent security review (WS1-T9-SEC) blocks merge until passed |
| CTO overload | Medium | High | ICEngineer owns WS2-T2 (memory store build); CEO monitors weekly; can re-route more WS-2 tasks to ICEngineer if needed |
| Shared memory layer adds complexity to starter kit | Low | Medium | WS-2 PoC validated (S8) before integration into starter kit (S9) |
| QC score drops below 7.5 | Low | Medium | QCAgent escalates immediately; CEO calls sprint review; remediation procedure defined above |
| DocOps agent not ready for S2 | Low | Medium | CEO confirms DocOps status in S1; WS1-T4 can shift to ICEngineer as fallback |
| License choice disputed post-publish | Low | Low | Board decides MIT vs. Apache 2.0 before WS1-T2 (S1); baked into initial commit |

---

## 10. Communication Cadence

| Cadence | Activity | Owner |
|---|---|---|
| Weekly | QC score posted | QCAgent |
| Per milestone | Milestone QC report | QCAgent |
| Per milestone | CEO checkpoint review | CEO |
| Sprint S1 | Kick-off: all agents read this plan | CEO |
| Sprint S6-S7 | Mid-point handoff compliance audit | QCAgent |
| Sprint S13 | Close-out audit + retrospective | QCAgent + CEO |

---

## 11. How Agents Should Use This Plan

### For every agent
1. Find your tasks in the Work Streams above
2. Confirm sprint assignments and dependencies before starting
3. Create Paperclip issues for your tasks with `parentId` linked to the relevant milestone issue (D1-M1 through D1-M7)
4. Apply the WS-4 QC checklist when marking any task `done`
5. Use the WS-5 handoff comment format when transferring any task
6. Escalate blockers per WS-5 wall-clock thresholds — do not sit blocked silently

### S1 Kick-off Checklist (CEO)
- [ ] Create Paperclip milestone issues D1-M1 through D1-M7 (link all to `Directive D1` project)
- [ ] Confirm DocOps agent is active
- [ ] Ask board for X API credentials (or confirm timeline)
- [ ] Confirm MIT license with board
- [ ] Assign WS4-T1, WS4-T2, WS5-T1, WS5-T2, WS1-T1 to respective agents
- [ ] Notify all agents to read this plan before their first task

### For the board
1. **Provide X API credentials** before Sprint 2 (or confirm timeline so fallback is activated)
2. **Confirm MIT license** before Sprint 1 ends
3. Monitor CEO checkpoint reports at D1-M1, D1-M3, D1-M6, D1-M7
4. Approve v1.0 publish at D1-M6
5. **This document is your living reference.** Check [log.md](./log.md) for sprint-by-sprint progress notes.

---

## Appendix A — Starter Kit Repository Inventory

```
starter-kit/
├── README.md                              ← What this is, how to use it
├── SETUP.md                               ← Paperclip setup guide
├── LICENSE                                ← MIT (pending board confirmation)
├── agents/
│   ├── ceo/AGENTS.md
│   ├── cto/AGENTS.md
│   ├── cmo/AGENTS.md
│   ├── qcagent/AGENTS.md
│   ├── docops/AGENTS.md
│   └── icengineer/AGENTS.md
├── directives/
│   ├── README.md
│   └── templates/directive-template.md
├── operations/index.md
├── docs/index.md
├── agent-api/
│   ├── src/
│   ├── .github/workflows/deploy.yml
│   └── fly.toml
├── memory/
│   └── shared/                            ← Shared memory store (WS-2)
└── billing/
    ├── README.md
    └── src/                               ← Stripe integration stub
```

---

## Appendix B — QC Review Summary (All 15 Findings Incorporated)

The following changes were made in response to QCAgent review ([BOAA-97](/BOAA/issues/BOAA-97)):

| # | Finding | Resolution |
|---|---|---|
| 1 | WS4-T3 trigger mechanism undefined | Specified: QCAgent scheduled heartbeat routine; CTO consults on mechanism (WS4-T3a→T3b) |
| 2 | WS4-T5 dependency conflict | Moved WS4-T5 to S5 (after WS1-T7 CI pipeline exists) |
| 3 | QC score formula undefined | Seed formula added to WS-4 section |
| 4 | WS5-T8 only at S13 | Added WS5-T8a mid-point audit at S6-S7 |
| 5 | WS5-T4 CEO authorization not noted | Explicitly noted: CEO co-executes WS5-T4 in S2 |
| 6 | Escalation thresholds heartbeat-based | Converted to wall-clock time (24h/72h/5-day); fast-track for critical added |
| 7 | QC checklist missing 3 items | Added: cross-team dependencies, security review, memory entries |
| 8 | No critical priority fast-track | Added: critical issues escalate to CEO after 24h |
| 9 | WS-3 milestone slips if creds delayed | Added fallback mock pipeline (WS3-T2b) as parallel track |
| 10 | CTO overload not mitigated | ICEngineer now owns WS2-T2 (memory store build) |
| 11 | CEO S1 setup tasks missing | S1 Kick-off Checklist added for CEO |
| 12 | DocOps availability not confirmed | Added as prerequisite note + S1 CEO action |
| 13 | License decision deferred | Board to confirm MIT before S1 ends; baked into WS1-T2 |
| 14 | No failed QC gate remediation | Remediation procedure defined in Governance section |
| 15 | Security gate missing for billing PoC | Added WS1-T9-SEC as mandatory QCAgent security review |

---

## Appendix C — Board Priority Integration (Revision 3)

Changes made in response to board input ([BOAA-98](/BOAA/issues/BOAA-98)):

| # | Board Input | Integration |
|---|---|---|
| B1 | Highest priority: WS-2, WS-4, WS-5 | Added Priority Tier system (Section 3); sprint table updated with tier markers |
| B2 | Then WS-3 | WS-3 labeled Tier 3; fallback pipeline ensures no wasted sprint |
| B3 | Then WS-1 completion | WS-1 explicitly framed as "packaging synthesis" that benefits from Tier 1-3 being done first |
| B4 | Living document reference | This file (`plan.md`) is the board's living reference; `log.md` tracks sprint-by-sprint progress |
| B5 | MIT License question | Answered in Board Q&A section above |
| B6 | Work streams/sprints/milestones explanation | Answered in Board Q&A section above |

---

*This is the final approved version of the D1 execution plan. It incorporates QCAgent review (all 15 findings) and board priority preferences. Update this file as sprints complete — it is a living document.*
