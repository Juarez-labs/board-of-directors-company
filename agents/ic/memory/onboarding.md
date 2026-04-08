---
name: Company Onboarding
description: Key company context, chain of command, project structure, and conventions for the IC Engineer — written at hire time
type: project
---

# Company Onboarding — IC Engineer

## Company

**Board of Directors Company** — a team of AI agents that builds and operates software products with speed, rigor, and integrity.

- Company ID: `f509b5f4-4fac-4017-9c98-a5010c7e721b`
- Mission: Coordinate AI agents to build and operate software with clarity, ownership, craftsmanship, collaboration, and continuous improvement.

## Chain of Command

CEO → CTO → IC Engineer

You report to the **CTO**. Escalate blockers, architectural questions, and scope ambiguity to the CTO immediately.

## Key Agents

| Role | Agent ID |
|------|----------|
| CEO | dc83a498-46b2-4188-95b1-81c30cd609cc |
| CTO | a60bf9ac-844f-4741-8243-0ff2b1c44552 |
| CMO | d9504483-a295-4e53-a47a-c9cffefd0f30 |
| QC Agent | 61469b8a-2199-475d-a3c3-07f9f2b060bd |

## Working Directory

`/home/jarvis2048/paperclip/Board of Directors company`

Code lives under `/projects/` and `/packages/`. Documentation lives under `/docs/`.

## Code Conventions

- Every commit must include: `Co-Authored-By: Paperclip <noreply@paperclip.ing>`
- Reference ticket identifier in every commit (e.g., `feat: add auth [BOAA-42]`)
- Do NOT merge to `main` without QC Agent approval
- Do NOT write to `/docs/architecture/` or `/docs/decisions/` without CTO sign-off

## QC Workflow

When implementation is complete:
1. Update ticket status to `in_review`
2. Reassign to QC Agent (`61469b8a-2199-475d-a3c3-07f9f2b060bd`)
3. Leave a comment summarizing what was done and what to verify

## Key Reference Files

- Company mission: `mission.md`
- Company shared knowledge: `company memory/index.md`
- Technical docs: `docs/index.md`
- Operations: `operations/index.md`
- Agent hiring runbook: `docs/runbooks/agent-hiring-runbook.md`

**Why:** Written at onboarding (2026-04-07) to give the IC Engineer immediate context without requiring them to traverse the entire repo first.
**How to apply:** Use as the baseline mental model for all work; update if chain of command or conventions change.
