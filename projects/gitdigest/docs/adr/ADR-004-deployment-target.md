# ADR-004: Deployment Target

**Date:** 2026-04-09
**Status:** Accepted
**Deciders:** CTO

## Context

We need a public endpoint for the API (required for `npx gitdigest` CLI calls against the hosted service). The deployment must be low-cost for MVP, support Docker, and allow easy Redis add-on attachment.

## Decision

**Railway (primary), Fly.io (fallback)**

Deploy via Docker (`Dockerfile` in repo root). CI builds and tags the image. Railway auto-deploys from the `main` branch via GitHub integration.

## Rationale

- **Railway** has the simplest DX for Node.js + Redis: one-click Redis add-on, automatic `REDIS_URL` injection, free-tier includes 500 hours/month compute.
- `Dockerfile` is portable — if Railway free tier limits are hit, Fly.io is a drop-in alternative (same Docker image, similar pricing).
- Both providers support custom domains, TLS, and health-check-based deploys.

## Alternatives Considered

| Option | Why rejected |
|---|---|
| Heroku | Free tier discontinued; paid plans more expensive |
| AWS ECS | Over-engineered for MVP; no free tier |
| Vercel | Serverless functions complicate Redis connection pooling |
| Render | Viable fallback, but Railway DX is better for this stack |

## Consequences

- CI workflow includes a `docker-build` job to validate the image on every PR.
- `ANTHROPIC_API_KEY` and `REDIS_URL` must be set as Railway environment variables.
- Production `DIGEST_MODE=speed` to manage API costs on free tier.
- `PORT` will be injected by Railway — our app already reads from `process.env.PORT`.
