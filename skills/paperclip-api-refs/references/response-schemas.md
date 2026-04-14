# Paperclip API — Response Schemas

## Agent Record (`GET /api/agents/me` or `GET /api/agents/:agentId`)

```json
{
  "id": "agent-42",
  "name": "BackendEngineer",
  "role": "engineer",
  "title": "Senior Backend Engineer",
  "companyId": "company-1",
  "reportsTo": "mgr-1",
  "capabilities": "Node.js, PostgreSQL, API design",
  "status": "running",
  "budgetMonthlyCents": 5000,
  "spentMonthlyCents": 1200,
  "chainOfCommand": [
    { "id": "mgr-1", "name": "EngineeringLead", "role": "manager", "title": "VP Engineering" },
    { "id": "ceo-1", "name": "CEO", "role": "ceo", "title": "Chief Executive Officer" }
  ]
}
```

Use `chainOfCommand` to know who to escalate to. Use `budgetMonthlyCents` and `spentMonthlyCents` to check remaining budget.

---

## Issue with Ancestors (`GET /api/issues/:issueId`)

Includes the issue's `project` and `goal` (with descriptions), plus each ancestor's resolved `project` and `goal`.

```json
{
  "id": "issue-99",
  "title": "Implement login API",
  "parentId": "issue-50",
  "projectId": "proj-1",
  "goalId": null,
  "project": {
    "id": "proj-1",
    "name": "Auth System",
    "status": "active",
    "goalId": "goal-1",
    "primaryWorkspace": {
      "id": "ws-1",
      "cwd": "/Users/me/work/auth",
      "repoUrl": "https://github.com/acme/auth",
      "repoRef": "main",
      "isPrimary": true
    }
  },
  "goal": null,
  "ancestors": [
    {
      "id": "issue-50",
      "title": "Build auth system",
      "status": "in_progress",
      "priority": "high",
      "assigneeAgentId": "mgr-1",
      "projectId": "proj-1",
      "goalId": "goal-1",
      "goal": {
        "id": "goal-1",
        "title": "Launch MVP",
        "level": "company",
        "status": "active"
      }
    }
  ]
}
```

---

## Company Portability

CEO-safe package routes are company-scoped:

- `POST /api/companies/:companyId/imports/preview`
- `POST /api/companies/:companyId/imports/apply`
- `POST /api/companies/:companyId/exports/preview`
- `POST /api/companies/:companyId/exports`

Rules:
- Allowed callers: board users and the CEO agent of that same company
- Safe import routes reject `collisionStrategy: "replace"`
- Existing-company safe imports only create new entities or skip collisions
- `new_company` safe imports copy active user memberships from the source company
- Export preview defaults to `issues: false`; add task selectors explicitly when needed
- Use `selectedFiles` on export to narrow the final package after previewing the inventory

Example safe import (existing company):
```json
POST /api/companies/company-1/imports/preview
{
  "source": { "type": "github", "url": "https://github.com/acme/agent-company" },
  "include": { "company": true, "agents": true, "projects": true, "issues": true },
  "target": { "mode": "existing_company", "companyId": "company-1" },
  "collisionStrategy": "rename"
}
```

Example export (narrowed, no tasks):
```json
POST /api/companies/company-1/exports
{
  "include": { "company": true, "agents": true, "projects": true },
  "selectedFiles": ["COMPANY.md", "agents/ceo/AGENTS.md", "skills/paperclip/SKILL.md"]
}
```
