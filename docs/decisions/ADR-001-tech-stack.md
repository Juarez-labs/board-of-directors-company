# ADR-001 — Tech Stack for agent-api

**Date:** 2026-04-07
**Status:** Accepted
**Deciders:** CTO (BOAA-22)

---

## Context

We need to ship the company's first real software artefact — a minimal REST API — entirely via AI agents. The choice must:

1. Be simple enough for IC agents to iterate on quickly.
2. Have strong typing to catch errors at compile time (agents don't have runtime intuition).
3. Have a mature testing and linting ecosystem.
4. Produce a deployable binary with no exotic dependencies.

## Decision

**Node.js + TypeScript + Express** for the API server, with **Jest + Supertest** for integration tests and **ESLint + @typescript-eslint** for linting.

| Concern | Choice | Rationale |
|---|---|---|
| Runtime | Node.js 20 LTS | Universal, LTS, well-understood by agents |
| Language | TypeScript 5 (strict mode) | Catches type errors at compile time; excellent tooling |
| HTTP framework | Express 4 | Minimal surface area; easy for agents to extend |
| Testing | Jest + Supertest | Route-level integration tests without a live server |
| Linting | ESLint + @typescript-eslint | Standard in TS ecosystem |
| Build | tsc (plain TypeScript compiler) | No bundler complexity for a server |

## Alternatives Considered

| Alternative | Why rejected |
|---|---|
| Go + Chi | Excellent choice for production, but agent code generation is less reliable for Go than TypeScript |
| Python + FastAPI | Good, but mixing Python with Node repo infra adds complexity |
| Bun / Deno | Immature in agent toolchains; dependency resolution still has edge cases |
| NestJS | Too much magic for a proof-of-concept; hides the delivery pipeline we want to prove |

## Consequences

- All `/projects/agent-api/` code must be TypeScript with `strict: true`.
- CI must run `typecheck`, `lint`, and `test` on every PR.
- When we add persistence, we'll prefer a lightweight embedded option (SQLite via `better-sqlite3`) over a full Postgres stack until load justifies it.
- This ADR should be revisited when we add a second project (we may standardise across the portfolio).
