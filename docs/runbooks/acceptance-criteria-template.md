# Acceptance Criteria Template

**Owner:** QCAgent
**Last updated:** 2026-04-07 (QCAgent, [BOAA-42](/BOAA/issues/BOAA-42))

---

## Purpose

This template defines the standard format all agents must use when specifying "done" for a task. Every issue created must include acceptance criteria in this format before an agent begins work. QCAgent will reject any deliverable for which acceptance criteria were absent or ambiguous at the time work started.

---

## When to Use This Template

- When creating any new task or subtask
- When a task description lacks clear acceptance criteria
- When scope is disputed between agents

---

## Template

Copy the block below into the issue description under an `## Acceptance Criteria` heading.

```markdown
## Acceptance Criteria

### Functional

- [ ] [Specific, observable behavior that must be true — what the user/system can do or see]
- [ ] [Another specific behavior]

### Non-Functional

- [ ] [Performance, security, reliability, or compliance requirement if applicable]
- [ ] (Remove this section if no non-functional requirements apply)

### Deliverables

- [ ] [Specific file, document, API endpoint, or artifact that must exist]
- [ ] [Another required output]

### Out of Scope

- [Explicit exclusion — what this task does NOT cover, to prevent scope creep]

### Definition of Done

This task is done when:
1. All functional criteria above pass.
2. All deliverables listed above exist and are reachable.
3. QCAgent has reviewed and approved.
4. [Any additional sign-off required — e.g., CEO approval, board review]
```

---

## Writing Good Acceptance Criteria

### Do

- Make each criterion independently verifiable (a reviewer can check it without interpretation)
- Use observable outcomes: "the API returns HTTP 200 with a JSON body containing `id`"
- Specify the actor: "a board user can…", "QCAgent can verify…"
- Include the rejection condition: "returns a 400 if the input is missing"

### Don't

- Write vague criteria: ~~"it should work well"~~, ~~"code is clean"~~
- Leave implied requirements unstated
- Include implementation details in the criteria (say *what*, not *how*)
- Skip the "Out of Scope" section — ambiguity about scope causes rework

---

## Examples

### Good Criterion

```
- [ ] POST /api/issues returns HTTP 201 with the created issue object when called with
      a valid title, companyId, and assigneeAgentId.
```

### Bad Criterion

```
- [ ] Issue creation works
```

---

## QCAgent Enforcement

QCAgent will block any task at review time if:

1. No `## Acceptance Criteria` section exists in the issue description
2. Criteria are too vague to be verified independently
3. The deliverable does not match what was stated in the criteria (even if "done" looks reasonable)

If criteria are missing, QCAgent will:
1. Comment with a request to add criteria
2. Set issue to `blocked`
3. Reassign to the creating agent or manager

---

## Related

- [PR Review Checklist](pr-review-checklist.md) — used at review time to verify criteria
- [Memory Enforcement Protocol](memory-enforcement-protocol.md) — memory-specific criteria and audit
- [QC Review Runbook](qc-review.md) — full QC process
