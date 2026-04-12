# QCAgent Directive Review Checklist

**Purpose:** QCAgent uses this checklist to review draft directives at Stage 4 and the final close-out at Stage 6.
**Score threshold:** ≥ 7.5/10 to proceed. For lightweight mode: ≥ 7.0/10.
**Instructions for QCAgent:** Review the directive document, plan document, and any linked recommendations. Score each section. Post your score and required changes as a comment on the directive Paperclip issue.

---

## How to Score

Each section below is worth points toward the 10-point total. Mark each item as:
- ✅ Pass
- ⚠️ Partial (counts as 0.5 if the rest of the section passes)
- ❌ Fail (blocks that section's points)

Calculate score: (total passing points / total possible points) × 10.

**If any REQUIRED section fails entirely, cap the total score at 6.0 regardless of other section scores.**

---

## Section 1 — Structure & Template Compliance *(2 points)*

- [ ] `directive.md` uses the approved `directive-template.md` structure
- [ ] All REQUIRED fields are present and filled in (none left as `{placeholder}`)
- [ ] Directive Mode (A or B) is explicitly declared
- [ ] Mission statement is exactly one sentence and is actionable (not vague)
- [ ] "Why Now" section connects to current company state, not generic justification

**Notes for QCAgent:** If mission is multi-sentence or uses vague language like "improve" without measurable targets, mark ❌. If mode is not declared, mark ❌.

---

## Section 2 — Success Criteria *(2 points)*

- [ ] Minimum 3 success criteria present
- [ ] Every criterion is measurable (no "improve X", "ensure Y" without a target)
- [ ] Each criterion has a "How Measured" column filled in
- [ ] Each criterion has an owner assigned
- [ ] Criteria collectively confirm the directive's mission when all are met

**Notes for QCAgent:** "Measurable" means there is a specific number, date, artifact, or observable state. "The skill is complete" is not measurable without defining what complete means.

---

## Section 3 — Milestones *(2 points)*

- [ ] Minimum 3 milestones defined
- [ ] Each milestone has: owner, target date, and a specific deliverable
- [ ] At least one QC gate is assigned to QCAgent at a meaningful checkpoint
- [ ] Close-out milestone exists with QCAgent final audit
- [ ] Milestone sequence is logical (dependencies are respected)

**Notes for QCAgent:** A milestone without a deliverable (e.g., "Review Phase 1") does not count. The deliverable must be a concrete artifact or verifiable state.

---

## Section 4 — Risks & Out of Scope *(1 point)*

- [ ] Minimum 2 risks documented with mitigations
- [ ] Risk likelihood and impact are assessed (not left blank)
- [ ] Out-of-scope list is non-empty and meaningful (not a catch-all "everything else")
- [ ] Out-of-scope items are things that might otherwise be assumed in scope

---

## Section 5 — Governance *(2 points)*

- [ ] Directive Mode (A or B) is declared AND applied consistently throughout the document
- [ ] For Mode A: Stage 3.5 (Board Draft Preview) is documented as completed or scheduled
- [ ] For Mode B: Confirmation that Stage 3.5 was correctly skipped
- [ ] Board checkpoint schedule is defined (at minimum: Stage 5 approval)
- [ ] QC gate milestones are defined and assigned to QCAgent
- [ ] Close-out criteria are explicitly stated and not vague
- [ ] Explicit board approval comment (not implicit) is required at Stage 5

**Notes for QCAgent:** If Mode A was declared but Stage 3.5 was skipped without explanation, mark ❌. If Mode B was used but the directive is open-ended or unclear, flag as a concern.

---

## Section 6 — Feasibility *(1 point)*

- [ ] Agent capacity has been checked — no overloaded agents assigned critical milestones
- [ ] All required agents exist in the company (no references to hypothetical future agents)
- [ ] Dependencies on board decisions are explicit (not assumed)
- [ ] Any recommendation declared "done" in planning has evidence of completion — not self-reported status
- [ ] Timeline is realistic given agent capacity and milestone complexity

**Notes for QCAgent:** If a recommendation is listed as "completed" but you cannot find a Paperclip issue, commit, or other artifact showing it was done, mark ❌ on the self-reported status item.

---

## Scoring Summary Template

Copy and paste this into your QCAgent comment when submitting the review:

```
## QC Review — D{N}: {Directive Name}

**Reviewer:** QCAgent
**Date:** {YYYY-MM-DD}
**Issue:** [{PREFIX}-{NNN}](/{PREFIX}/issues/{PREFIX}-{NNN})

| Section | Points Possible | Points Earned | Notes |
|---------|----------------|---------------|-------|
| 1. Structure & Template Compliance | 2 | {X} | {notes} |
| 2. Success Criteria | 2 | {X} | {notes} |
| 3. Milestones | 2 | {X} | {notes} |
| 4. Risks & Out of Scope | 1 | {X} | {notes} |
| 5. Governance | 2 | {X} | {notes} |
| 6. Feasibility | 1 | {X} | {notes} |
| **Total** | **10** | **{X}** | |

**Score:** {X}/10
**Threshold:** 7.5/10 required to proceed

**Verdict:** ✅ Approved to proceed / ❌ Requires revision before proceeding

### Required changes before re-review:
1. {change required}
2. {change required}

### Observations (non-blocking):
- {observation}
```

---

## Close-Out Audit (Stage 6 Final)

At directive close-out, QCAgent runs an additional audit beyond the standard checklist:

- [ ] All success criteria met — evidence provided for each (not self-reported)
- [ ] All QC gate scores documented in `progress.md`
- [ ] `log.md` reflects key decisions made during execution (not empty or sparse)
- [ ] `directive.md` updated with actual outcomes vs. planned
- [ ] Folder moved to `directives/completed/` before board summary is posted
- [ ] Board summary includes: what was completed, what was deferred, and lessons learned

**Close-out audit score threshold:** ≥ 7.5/10 (same as standard threshold)
