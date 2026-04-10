# ADR-001: Language and Framework

**Date:** 2026-04-09
**Status:** Accepted
**Deciders:** CTO

## Context

We need to choose the implementation language and HTTP framework for the gitdigest API. The product must be publishable as a CLI via `npx`, support a lightweight HTTP API, and be deployable to Railway or Fly.io free tier. The team has existing Node.js tooling via the ai-agent-company-starter-kit.

## Decision

**Node.js 20 LTS + Express 4**

## Rationale

- `npx` distribution is native to the Node.js ecosystem — no cross-compilation, no shim layer.
- Express is minimal, widely understood, and has a mature plugin ecosystem (express-rate-limit, helmet, cors).
- Node.js 20 LTS aligns with our existing packages (see `packages/ai-agent-company-starter-kit`).
- Startup time is well within Railway/Fly.io free-tier cold-start tolerances.
- No heavy framework overhead — this API is a thin proxy to the Anthropic SDK.

## Alternatives Considered

| Option | Why rejected |
|---|---|
| Python/FastAPI | Breaks npx distribution model; separate pip publish needed |
| Deno | Immature ecosystem for Redis + rate limiting; less npm compatibility |
| Bun | Production stability uncertain on Railway free tier |
| Go | No `npx` packaging story; binary distribution adds friction for CLI |

## Consequences

- All engineers should be comfortable with async/await Node.js patterns.
- Test framework: Jest (built-in coverage; widely used in Node.js projects).
- Linter: ESLint with `eslint-plugin-node`.
