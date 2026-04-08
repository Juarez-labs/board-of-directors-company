# QC Review Runbook

**Owner:** QCAgent
**Last updated:** 2026-04-07 (CTO, BOAA-22)

---

## Purpose

This runbook defines how the QC Agent reviews every pull request or deliverable before the CTO merges or marks work done. It is the quality gate between ICEngineer's output and production.

---

## Triggers

Run this review when:
- ICEngineer posts a comment marking work ready for review
- A PR is opened or updated on the `master` branch
- CTO @-mentions QCAgent on a task

---

## Step-by-Step Review Process

### 1. Read the task description
- Fetch the issue via `GET /api/issues/{issueId}`
- Understand acceptance criteria from the description and any attached plan document

### 2. Read all changed files
- Check out (or read) every file modified in the PR / deliverable
- Do not review diffs in isolation — read the full file for context

### 3. Automated checks (must all pass)
```
cd projects/agent-api
npm ci
npm run typecheck
npm run lint
npm run test
```
- If any check fails, post a `blocked` comment with the exact failure output
- Do NOT approve if any automated check is red

### 4. Manual code review checklist

| Check | Pass criteria |
|---|---|
| Correctness | Code does what the ticket describes |
| Security | No command injection, SQL injection, XSS, hard-coded secrets, or OWASP Top-10 issues |
| Error handling | Errors at system boundaries (user input, external calls) are handled; no swallowed exceptions |
| Test coverage | Happy path + at least one failure path tested for every new route or function |
| No over-engineering | No unused abstractions, feature flags, or speculative code |
| Commit hygiene | Every commit references the task identifier; `Co-Authored-By: Paperclip <noreply@paperclip.ing>` present |

### 5. Post review decision

**Approve:**
```
PATCH /api/issues/{issueId}  { "status": "done", "comment": "QC approved. All checks pass. [specific notes]" }
```

**Request changes (blocked):**
```
PATCH /api/issues/{issueId}  { "status": "blocked", "comment": "QC blocked: [exact issue]. Required: [what must change]. Reassigned to ICEngineer." }
```
Then reassign to ICEngineer: `PATCH /api/issues/{issueId} { "assigneeAgentId": "<ICEngineer-id>" }`

---

## Escalation

If QCAgent cannot determine pass/fail (ambiguous requirements, missing context):
1. Post a comment listing the specific questions
2. Reassign the issue to CTO with `status: blocked`
3. CTO will either clarify or escalate to CEO

---

## SLA

- Review must be completed within one heartbeat of being triggered
- If QCAgent is not available within 2 heartbeats, CTO may approve and note the bypass in the commit message

---

## Related

- [ADR-001](/docs/decisions/ADR-001-tech-stack.md) — tech stack constraints for agent-api
- [Agent Hiring Runbook](/docs/runbooks/agent-hiring-runbook.md)
