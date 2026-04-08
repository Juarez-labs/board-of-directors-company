# 04 — Quality Control

**Status:** Populated
**Last updated:** 2026-04-08
**Proven by:** QC runbooks authored and in active use (Phase 1 M5)

---

## The Core Principle

Nothing reaches production without a gate review. In our company, that gate is QCAgent — an agent whose only job is to verify that work meets defined standards before it is marked done or merged.

This creates a clean separation: ICEngineer builds, QCAgent judges. The person who built the thing is not the one who approves it.

---

## Quality Gate: What Gets Reviewed

Every piece of work goes through QC before `done`:

| Deliverable type | Gate owner | Review trigger |
|-----------------|-----------|----------------|
| Code (PR) | QCAgent | IC posts "ready for review" comment |
| Document | DocOps + QCAgent | Author posts "ready for review" comment |
| Runbook | QCAgent | Author posts "ready for review" comment |
| Architecture decision (ADR) | CTO | Author submits for CTO review |

---

## The Code Review Checklist

QCAgent runs this checklist on every code deliverable:

### Automated Checks (must all pass)
```
npm ci
npm run typecheck
npm run lint
npm run test
```

If any automated check fails, the task is set to `blocked` with the exact failure output. No manual review proceeds until automated checks are green.

### Manual Review Checks

| Check | Pass criteria |
|-------|--------------|
| Correctness | Code does what the ticket describes |
| Security | No command injection, SQL injection, XSS, hard-coded secrets, or OWASP Top 10 issues |
| Error handling | Errors at system boundaries are handled; no swallowed exceptions |
| Test coverage | Happy path + at least one failure path tested for every new route or function |
| No over-engineering | No unused abstractions, feature flags, or speculative code |
| Commit hygiene | Every commit references the task identifier; `Co-Authored-By: Paperclip <noreply@paperclip.ing>` present |

---

## Definition of Done — By Type

### Code Deliverable
- All acceptance criteria met
- Committed to the correct branch with a descriptive message
- CI pipeline passes
- PR reviewed by at least one other agent (QCAgent or CTO)
- PR merged to `master`
- Paperclip issue updated to `done` with a link to the merged PR
- Relevant documentation updated

### Document Deliverable
- File exists at the correct path per filing conventions
- Required metadata header present
- Content covers all requirements from the issue
- Committed to the repository
- Reviewer approved

### Runbook Deliverable
All document criteria, plus:
- Every step is numbered and uses imperative verbs
- Each step specifies who performs it
- At least one happy-path walkthrough verified by the author
- "When to use this runbook" section present
- QCAgent confirmed it is executable as written

---

## How QCAgent Reports Decisions

**Approve:**
- Sets issue status to `done`
- Posts a comment: "QC approved. All checks pass. [specific notes]"

**Request changes:**
- Sets issue status to `blocked`
- Tags the IC with specific, actionable change requests
- Does not close the issue

**Escalate:**
- If a security or architecture issue is found, escalates to CTO before approving
- Posts a comment explaining the escalation reason

---

## Memory Compliance (M6)

QCAgent also enforces memory-writing. After any completed task, agents are expected to write a memory file recording what they learned. QCAgent audits this:

- Checks that the completing agent wrote at least one memory after the task
- Flags non-compliant agents to the CEO
- Does not block the task on memory compliance — it is a separate follow-up

---

## What We Learned About Quality Control

- **Automated checks catch the most common failures.** The first time we required CI to pass before human review, the review cycle shortened significantly.
- **A QC agent distinct from the IC removes the natural bias toward approval.** When the builder and reviewer are the same agent, quality degrades over time.
- **"Blocked" is not a failure state — it is communication.** An IC that hits a blocker and immediately posts a clear blocked comment with the reason is behaving correctly. Silence on a blocked task is the actual failure.

---

*Source documents: [qc-review.md](../runbooks/qc-review.md), [pr-review-checklist.md](../runbooks/pr-review-checklist.md), [acceptance-criteria-template.md](../runbooks/acceptance-criteria-template.md), [output-standards.md](../output-standards.md)*
