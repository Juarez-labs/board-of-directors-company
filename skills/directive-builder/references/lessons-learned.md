# Lessons Learned: D1 & D2 Retrospective

**Purpose:** Capture what worked and what caused friction in Directives D1 and D2, so future directives avoid known pitfalls.
**Maintained by:** CEO (update after each completed directive)
**Last updated:** 2026-04-12

---

## Directive D1 Retrospective

**Directive:** *(D1 details)*
**Outcome:** Completed

### What Worked Well

- **Structured milestones with QC gates.** Prevented scope drift and caught issues early. Having a clear threshold (score ≥ 7.5) removed ambiguity about whether to proceed.
- **Out-of-scope list.** Explicitly listing excluded items prevented scope creep when adjacent ideas surfaced during execution.
- **QC score threshold as a hard gate.** A non-negotiable standard meant QCAgent reviews were taken seriously by all agents, not treated as rubber stamps.
- **Board priority input cycle.** Having a formal moment for the board to adjust priorities mid-plan (now codified as Stage 3.5 for Mode A) prevented surprises at final approval.

### What Caused Friction

- **No formal draft preview before final approval.** The board saw the full plan for the first time at the approval gate, which led to revision cycles at the worst possible moment.
  - **Fix:** Stage 3.5 (Board Draft Preview) added for Mode A directives. Board sees the draft before QC review, not after.
- **DocOps dependency identified late.** A documentation dependency surfaced partway through execution that should have been caught in planning.
  - **Fix:** Stage 2 (Multi-Agent Input Gathering) now explicitly surfaces agent capacity and dependencies before planning begins.

---

## Directive D2 Retrospective

**Directive:** *(D2 details)*
**Outcome:** Completed

### What Worked Well

- **Multi-agent input gathering.** Asking each agent for their perspective before drafting the directive produced better recommendations than CEO deciding alone. Surface-level perspectives were challenged and improved by cross-functional input.
- **Living progress.md as single source of truth.** The board always knew where to look for directive status. Eliminated "what's the latest?" questions.
- **Mode B pattern (emergent).** D2 had a clear, specific goal from the board, so intermediate approval checkpoints added friction without adding value. This experience directly motivated the formal Mode B definition.

### What Caused Friction

- **R3 (Transparency Dashboard) approved then cancelled mid-execution.** A recommendation was accepted into the plan but lacked a clear owner and budget at approval time.
  - **Fix:** QC checklist now flags any recommendation that lacks an owner or budget estimate before it can be approved.
- **progress.md not created at project setup.** The milestone tracker was created partway through execution, meaning early decisions weren't captured.
  - **Fix:** Stage 5 now explicitly requires both `progress.md` and `log.md` to be created **immediately** when the Paperclip project is set up. Not as a follow-up — as a blocker to beginning Stage 6.
- **Board approval was implicit.** "No objections" was treated as approval. When a question arose later about whether something was approved, there was no clear record.
  - **Fix:** Stage 5 requires an **explicit board approval comment** before CEO proceeds. Implicit approval is not sufficient.
- **R5 (UXDesigner) declared done before actually hired ([BOAA-162](/BOAA/issues/BOAA-162)).** A deliverable was reported complete in planning, but the actual work had not been verified.
  - **Fix:** QCAgent now requires **evidence** of completion — a Paperclip issue, commit, artifact, or observable state. Self-reported status alone does not count.
- **Multiple small board approval touchpoints created unnecessary friction.** Each stage generating a board handoff slowed execution for directives with clear goals.
  - **Fix:** Mode B formally removes intermediate board checkpoints for targeted directives. Board only engages at Stage 5.

---

## Cross-Directive Patterns

### Consistently worked across both D1 and D2
- Multi-agent input (when done early) → better plans
- Hard QC thresholds → agents take reviews seriously
- Out-of-scope lists → prevents scope creep
- Explicit milestone deliverables → clear done conditions

### Consistently caused friction
- Implicit approvals → disputes later about what was agreed
- Late dependency discovery → scrambles during execution
- Missing artifacts at project start (progress.md, log.md) → gaps in audit trail
- Self-reported "done" without evidence → leads to premature milestone closure

---

## Update Instructions

After each completed directive, add a new retrospective section following the same format:

1. Directive name and outcome
2. What worked well (keep doing this)
3. What caused friction (fix this in the next directive or update the skill)

If a friction point leads to a skill update, reference the Paperclip issue that drove the change.
