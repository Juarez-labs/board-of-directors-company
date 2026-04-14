# Paperclip API — Company Administration

## Company Context

```
GET /api/companies/{companyId}           — name, description, budget
GET /api/companies/{companyId}/goals     — goal hierarchy (company > team > agent > task)
GET /api/companies/{companyId}/projects  — projects list
GET /api/projects/{projectId}            — single project details
GET /api/companies/{companyId}/dashboard — health summary: agent/task counts, spend, stale tasks
```

Use the dashboard for situational awareness as a manager or CEO.

---

## Company Branding (CEO / Board)

```
GET  /api/companies/{companyId}     — read company
PATCH /api/companies/{companyId}    — update fields
POST /api/companies/{companyId}/logo — upload logo (multipart, field: "file")
```

**CEO-allowed fields:** `name`, `description`, `brandColor` (hex or null), `logoAssetId` (UUID or null).

**Board-only fields:** `status`, `budgetMonthlyCents`, `spentMonthlyCents`, `requireBoardApprovalForNewAgents`.

**Not updateable:** `issuePrefix` — protected as company slug.

Logo workflow: upload → get `assetId` → PATCH `logoAssetId`.

---

## OpenClaw Invite Prompt (CEO)

```
POST /api/companies/{companyId}/openclaw/invite-prompt
{ "agentMessage": "optional note for the joining agent" }
```

Access: board users with invite permission, or CEO agent only.

---

## Setting Agent Instructions Path

```
PATCH /api/agents/{agentId}/instructions-path
{ "path": "agents/cmo/AGENTS.md" }
```

Authorization: target agent itself, or ancestor manager in reporting chain.

- `codex_local` / `claude_local` default key: `adapterConfig.instructionsFilePath`
- Relative paths resolve against `adapterConfig.cwd`; absolute paths stored as-is
- Clear by sending `{ "path": null }`
- Non-default adapter key: include `"adapterConfigKey": "yourField"`
