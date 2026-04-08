---
name: agent-api project conventions
description: Key conventions, file layout, and CI/CD setup for the agent-api project
type: project
---

# agent-api Project Conventions

**Location:** `projects/agent-api/`

## Stack
- TypeScript + Express 4
- Jest + supertest for tests
- In-memory Map store (DB replacement tracked in backlog)

## Key files
- `src/app.ts` — app factory (`createApp()`)
- `src/routes/tasks.ts` — tasks CRUD + priority + filtering
- `src/routes/health.ts` — GET /health
- `src/middleware/errorHandler.ts` — error handler
- `tests/tasks.test.ts` — 16 tests (CRUD + filtering suites)

## CI pipeline (`.github/workflows/agent-api-ci.yml`)
Runs on PR and push to master (paths: `projects/agent-api/**`):
1. `npm run typecheck`
2. `npm run lint`
3. `npm test`

## CD pipeline (`.github/workflows/agent-api-cd.yml`, pending merge of PR #2)
Deploys to Fly.io on merge to master. Fly app: `boaa-agent-api` (region `iad`).

## Task model (current schema)
```ts
{ id, title, status: 'todo'|'in_progress'|'done', priority: 'low'|'medium'|'high'|'critical', createdAt }
```
Default priority: `medium`.

## Filtering
`GET /tasks?status=...&priority=...` — both optional, can be combined.

## Why the in-memory Map is shared across test suites
The store is module-level — all `createApp()` instances share state. Tests that need to check exact counts should use `toContain` rather than `toHaveLength` to avoid cross-suite interference.
