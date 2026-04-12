# Directive Builder Skill

**Purpose:** Encode the company's directive creation process as a structured, repeatable playbook for the CEO.

**Invoke with:** `Skill tool` using skill name `directive-builder`, or read this file directly.

**Reference files:**
- [`references/directive-template.md`](references/directive-template.md) — Directive document template
- [`references/plan-template.md`](references/plan-template.md) — Sprint-level execution plan template
- [`references/progress-template.md`](references/progress-template.md) — Living milestone tracker template
- [`references/log-template.md`](references/log-template.md) — Operational decision log template
- [`references/qc-checklist.md`](references/qc-checklist.md) — QCAgent review checklist
- [`references/lessons-learned.md`](references/lessons-learned.md) — D1/D2 retrospective findings

---

## Directive Modes

Before starting any directive, the CEO must declare the **Directive Mode**. Use this decision checklist at Stage 1:

**→ Mode B (Targeted)** if the board instruction includes a specific goal or outcome (e.g., "build X to achieve Y", "create a directive-builder skill").
**→ Mode A (Exploratory)** if the board instruction is open-ended (e.g., "decide what we should focus on next", "what is the right move here?").

When in doubt, ask the board to clarify before proceeding.

### Mode A — Exploratory
*"What should we do next?"*

The board provides no specific goal. The company surfaces options and recommends a direction.

- All 7 stages run in full.
- Board touchpoints at **Stage 3.5** (draft preview) and **Stage 5** (final approval).
- Board input at Stage 3.5 shapes the direction before QC review.
- Board provides explicit approval at Stage 5 before project setup begins.

### Mode B — Targeted
*"Build X with goal Y"*

The board provides a clear, specific goal. The company runs the full internal process and presents one solid final plan.

- Stages 1–4 run **without intermediate board checkpoints**.
- **Stage 3.5 is SKIPPED.**
- The board only engages at **Stage 5** to approve the final, QC-cleared plan.
- This prevents back-and-forth on minor approvals and keeps the board focused on the final decision.

---

## The 7-Stage Directive Lifecycle

### Stage 1 — Trigger & Context

**Input:** Board request or CEO strategic initiative
**Deliverable:** CEO summary comment confirming directive scope, mode, and that execution will proceed

**Checklist:**
- [ ] Declare **Directive Mode** (A or B) — see decision rule above
- [ ] Identify whether this is a full directive (> 30 days) or a lightweight task (< 30 days)
  - If lightweight: see **Lightweight Mode** section below
- [ ] Check active directives — at most 1 should be active at a time; escalate to board if conflict
- [ ] Check company goals for alignment — note which goal this directive supports
- [ ] Check available agents and capacity — identify any agents already at capacity
- [ ] Post a CEO summary comment on the board-facing issue confirming: scope, mode, capacity check, and timeline expectation

**Paperclip API actions:**
- `GET /api/companies/{companyId}/dashboard` — check active work and agent load
- Create a top-level Paperclip issue for the directive (status: `in_progress`, assigned to CEO)
- Post comment on the triggering board request confirming mode and scope

---

### Stage 2 — Multi-Agent Input Gathering

**Input:** CEO summary
**Deliverable:** Draft Recommendations document (R1–Rn) with rationale

**Checklist:**
- [ ] Create one subtask per agent asking for their perspective on directive content
  - Include: context, what you need from them, and a deadline
- [ ] Wait for all agent perspectives (or enforce the deadline)
- [ ] Synthesize agent responses into a numbered Recommendations list (R1, R2, ... Rn)
  - Each recommendation must have: title, agent source, rationale, risks, estimated effort
- [ ] Post recommendations as a document on the directive issue (key: `recommendations`)

**Paperclip API actions:**
- `POST /api/companies/{companyId}/issues` for each agent subtask (set `parentId`, `goalId`, `assigneeAgentId`)
- `PUT /api/issues/{directiveIssueId}/documents/recommendations` with the synthesized list

---

### Stage 3 — CEO Synthesis & Draft Directive

**Input:** Agent recommendations
**Deliverable:** `directive.md` + `plan.md` in `directives/active/dN-{name}/` folder; plan document on Paperclip issue

**Checklist:**
- [ ] Score and select recommendations based on: goal alignment, feasibility, risk, agent capacity
- [ ] Create `directives/active/dN-{name}/` directory (use next available directive number)
- [ ] Author `directive.md` using [`references/directive-template.md`](references/directive-template.md)
  - All REQUIRED fields must be filled in
  - Directive Mode must be declared in the governance section
- [ ] If directive spans > 30 days: author `plan.md` using [`references/plan-template.md`](references/plan-template.md)
- [ ] Create or update Paperclip issue document (key: `plan`) with the plan content
- [ ] Commit all files to git

**Paperclip API actions:**
- `PUT /api/issues/{directiveIssueId}/documents/plan`

---

### Stage 3.5 — Board Draft Preview *(Mode A only — skip for Mode B)*

**Input:** Draft directive
**Deliverable:** Revised directive reflecting board input

> **Mode B:** This stage is entirely skipped. Do not request board input here. Proceed directly to Stage 4.

**Mode A checklist:**
- [ ] Share the draft directive document link with the board via comment
  - Use format: `[BOAA-NNN plan document](/BOAA/issues/BOAA-NNN#document-plan)`
- [ ] Ask the board explicitly: priority ordering, scope adjustments, additional requirements
- [ ] Wait for board response before proceeding
- [ ] Revise `directive.md` and `plan.md` to integrate board input
- [ ] Document changes made in a revision comment
- [ ] Update the Paperclip plan document

**Paperclip API actions:**
- `POST /api/issues/{directiveIssueId}/comments` — share draft with board
- `PUT /api/issues/{directiveIssueId}/documents/plan` — update with board revisions

---

### Stage 4 — QC Review Gate

**Input:** Draft directive (post-board preview for Mode A; initial draft for Mode B)
**Deliverable:** QC-approved directive (score ≥ 7.5/10)

**Checklist:**
- [ ] Create a subtask assigned to QCAgent: "Review draft directive for [Directive Name]"
  - Attach link to directive document and plan document
  - Attach link to [`references/qc-checklist.md`](references/qc-checklist.md)
- [ ] Wait for QCAgent verdict (score + required changes)
- [ ] If score < 7.5: revise directive and resubmit to QCAgent
- [ ] If score ≥ 7.5: proceed to Stage 5
- [ ] Document QC score and any revisions made in a comment on the directive issue

**Paperclip API actions:**
- `POST /api/companies/{companyId}/issues` — create QC review subtask
- `PATCH /api/issues/{directiveIssueId}` with comment noting QC outcome

---

### Stage 5 — Board Approval & Project Setup

**Input:** QC-approved directive
**Deliverable:** Active Paperclip project + all milestone tasks + `progress.md` + `log.md`

**Checklist:**
- [ ] Present the final directive to the board with:
  - The directive document link
  - Key decisions requiring board input (budget, license, scope)
  - QC score and changes made since last board touchpoint
  - **For Mode B:** this is the board's first and only review — present the complete, QC-cleared plan
  - Clear ask: "Approve to proceed?"
- [ ] Wait for **explicit board approval comment** before proceeding (implicit approval is not sufficient)
- [ ] Create a Paperclip project for the directive
- [ ] Create all milestone issues as Paperclip tasks linked to the project (`goalId`, `projectId`, `parentId`)
- [ ] **Immediately** create `directives/active/dN-{name}/progress.md` using [`references/progress-template.md`](references/progress-template.md)
- [ ] **Immediately** create `directives/active/dN-{name}/log.md` using [`references/log-template.md`](references/log-template.md)
- [ ] Commit both files to git

**Paperclip API actions:**
- `POST /api/companies/{companyId}/projects` — create directive project
- `POST /api/companies/{companyId}/issues` for each milestone task
- `PUT /api/issues/{directiveIssueId}/documents/progress` (optional Paperclip mirror)

---

### Stage 6 — Execution & Close-Out

**Input:** Active directive with tasks
**Deliverable:** Completed directive with full audit trail

**During execution:**
- [ ] Delegate milestone tasks to appropriate agents
- [ ] Maintain `progress.md` — update milestone status after each QC gate
- [ ] Update `log.md` with key decisions, pivots, and operational changes
- [ ] QCAgent reviews at each milestone gate (score ≥ 7.5 to proceed to next milestone)
  - QCAgent requires **evidence** of completion — not self-reported status
- [ ] If a milestone is blocked: post blocker comment, update Paperclip issue to `blocked`, escalate to board if needed

**At close-out:**
- [ ] QCAgent runs final audit (score ≥ 7.5)
- [ ] CEO moves folder: `directives/active/dN-{name}/` → `directives/completed/dN-{name}/`
- [ ] Update `directives/completed/dN-{name}/directive.md` with actual outcomes vs. planned
- [ ] CEO posts board summary: what was completed, what was deferred, lessons learned
- [ ] CEO closes the Paperclip project and marks directive issue `done`

**Paperclip API actions:**
- `PATCH /api/issues/{milestoneIssueId}` — update milestone status
- `PATCH /api/projects/{projectId}` — close project at completion
- `PATCH /api/issues/{directiveIssueId}` — mark directive `done` with close-out comment

---

## Lightweight Mode (Directives < 30 Days)

For small, well-scoped directives under 30 days, use the condensed checklist instead of the full 7-stage process.

**Criteria for lightweight mode:**
- Single clear deliverable
- Estimated duration under 30 days
- 3 or fewer agents involved
- No budget or licensing decisions required

**Condensed 4-step checklist:**
1. **Scope** — Write a one-paragraph brief covering: what, why, success criteria, owner, deadline. Post as comment.
2. **Plan** — Create milestone tasks in Paperclip. No formal directive doc required, but create `progress.md`.
3. **QC gate** — QCAgent reviews the deliverable (score ≥ 7.0 threshold for lightweight mode).
4. **Close-out** — CEO posts a brief summary comment. Mark issue `done`. No folder move required.

> Even in lightweight mode, board approval is required if the work involves budget, new hires, or policy changes.

---

## How to Update This Skill

When the directive process evolves (new lessons from D3+, governance changes, etc.):

1. Open a Paperclip issue titled "Update directive-builder skill: [what changed]"
2. Assign to CTO (file authoring) and DocOps (documentation quality)
3. Edit the relevant files in `skills/directive-builder/`
4. If the QC checklist changes, assign QCAgent to review the updated checklist
5. After QC approval, have CEO announce the update to the board
6. Commit with clear message describing what changed and why
7. Update the lesson that drove the change in `references/lessons-learned.md`

> **Do not** make silent changes to this skill. All updates must go through a Paperclip issue with QC review.
