# PR Review Checklist

**Owner:** QCAgent
**Last updated:** 2026-04-07 (QCAgent, [BOAA-42](/BOAA/issues/BOAA-42))

---

## Purpose

A concise, field-ready checklist QCAgent runs on every pull request or deliverable before approval. Each item must explicitly pass or be documented as N/A with a reason.

---

## Pre-Review Gate

Before starting the checklist, confirm:

- [ ] The linked issue has clear acceptance criteria (if not, block immediately and ask CTO/CEO)
- [ ] The PR description references the issue identifier (e.g., `BOAA-42`)
- [ ] Automated CI checks have run (do not review a PR with pending CI)

---

## Checklist

### 1. Scope & Correctness

- [ ] All acceptance criteria from the issue are addressed — no partial deliverables
- [ ] No scope creep — changes are limited to what the issue asked for
- [ ] Logic is correct: trace the happy path manually through the changed code/content
- [ ] Edge cases identified in the issue are handled

### 2. Security

- [ ] No hard-coded secrets, tokens, or credentials
- [ ] No command injection vulnerabilities (shell interpolation, `exec`, `eval`)
- [ ] No SQL injection vulnerabilities (parameterized queries used where applicable)
- [ ] No XSS vulnerabilities (output escaping where applicable)
- [ ] Input validation exists at system boundaries (user input, external APIs)
- [ ] No OWASP Top-10 issues introduced

### 3. Code Quality

- [ ] No dead code, unused imports, or commented-out blocks left behind
- [ ] No speculative abstractions or future-proof complexity not required by the task
- [ ] Error handling present at boundaries; no swallowed exceptions
- [ ] Functions/modules do one thing; no god objects
- [ ] Naming is clear and consistent with the surrounding codebase

### 4. Test Coverage

- [ ] At least one test per new public function/route covering the happy path
- [ ] At least one failure-path test per new function/route
- [ ] Existing tests were not weakened or deleted without justification

### 5. Automated Checks (must all pass)

Run from the appropriate project directory:

```bash
npm ci
npm run typecheck
npm run lint
npm run test
```

- [ ] Typecheck passes
- [ ] Lint passes
- [ ] All tests pass

### 6. Commit Hygiene

- [ ] Each commit message references the issue identifier (e.g., `feat: add widget (BOAA-42)`)
- [ ] Every commit includes `Co-Authored-By: Paperclip <noreply@paperclip.ing>`
- [ ] No merge commits in the feature branch (unless explicitly approved)

### 7. Documentation

- [ ] Any new public APIs, endpoints, or agent capabilities are documented
- [ ] Runbooks updated if operational procedures changed
- [ ] `docs/index.md` updated if a new doc was added

---

## Decision

### Approve (mark `done`)

All checklist items are `✓ pass` or `N/A` with justification. Post a comment:

```
QC Approved ✓

Checklist: all items passed.
[Note any N/A items and their justification]
```

Then `PATCH /api/issues/{issueId} { "status": "done" }` with the comment.

### Reject (mark `blocked`)

One or more items failed. Post a comment listing each failure:

```
QC Blocked

Failed items:
- [item name]: [specific finding]
- [item name]: [specific finding]

Required before re-review:
- [action 1]
- [action 2]
```

Then `PATCH /api/issues/{issueId} { "status": "blocked" }` and reassign to the responsible agent.

---

## Related

- [QC Review Runbook](qc-review.md) — full review procedure
- [Acceptance Criteria Template](acceptance-criteria-template.md) — how to define done before work starts
- [Memory Enforcement Protocol](memory-enforcement-protocol.md) — memory-specific audit checklist
