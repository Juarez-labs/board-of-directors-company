# ADR-003 — Continuous Delivery Pipeline Architecture for agent-api

**Date:** 2026-04-08
**Status:** Accepted
**Deciders:** CTO
**Signed off by:** CTO (BOAA-50)
**Related milestones:** [M3 — BOAA-40](/BOAA/issues/BOAA-40)

---

## Context

Phase 1 milestone M3 requires deploying agent-api to a live environment via an automated CD pipeline. We need a solution that:

1. Triggers automatically on merge to `master` (after CI passes).
2. Is executable by AI agents via CLI commands — no GUI-only configuration steps.
3. Has a free or near-zero cost tier adequate for a proof-of-concept API.
4. Exposes a public HTTPS endpoint so the health check can be verified externally.
5. Stays within our single-repo, company-directory-scoped model (see [ADR-002](ADR-002-agent-file-scope.md)).
6. Does not require a custom server or infrastructure management for the proof-of-concept phase.

---

## Decision

**Deploy agent-api to [Fly.io](https://fly.io) using GitHub Actions as the CD trigger.**

The pipeline runs in two stages:

```
Stage 1 — CI (already live)          Stage 2 — CD (added in M3)
────────────────────────────────      ──────────────────────────────────────
Push / PR to master                   Merge to master
  → Typecheck                           → CI passes (Stage 1 gates this)
  → Lint                                → GitHub Actions calls flyctl deploy
  → Test                                → Fly.io builds container, routes traffic
                                        → Health check (/health) confirms live
```

### Why Fly.io

| Criterion | Fly.io | Railway | Render | Heroku |
|---|---|---|---|---|
| Agent-executable CLI | ✅ `flyctl deploy` | ⚠️ Dashboard-first | ⚠️ Dashboard-first | ✅ `heroku` CLI |
| GitHub Actions native | ✅ Official action | ✅ Plugin | ✅ Plugin | ✅ |
| Free tier | ✅ Machines pause when idle | ✅ Limited hours | ✅ Spins down on idle | ❌ Paid only |
| HTTPS out of the box | ✅ | ✅ | ✅ | ✅ |
| Config as code | ✅ `fly.toml` | ⚠️ Partial | ⚠️ Partial | ✅ `Procfile` |
| Container control | ✅ Dockerfile or buildpack | ⚠️ Buildpack-only | ⚠️ Buildpack-only | ⚠️ Buildpack-only |
| No credit card for POC | ✅ | ✅ | ✅ | ❌ |

Fly.io wins on agent-executability (full CLI, `fly.toml` config-as-code) and container control, which makes M3 reproducible and inspectable by agents without manual GUI steps.

---

## Implementation Specification

### Required files (all inside company directory)

```
.github/workflows/agent-api-cd.yml       ← CD workflow, triggers on master merge
projects/agent-api/Dockerfile            ← Container definition
projects/agent-api/fly.toml              ← Fly.io app config
```

### `fly.toml` configuration

```toml
app = "boaa-agent-api"
primary_region = "iad"

[build]

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0

[[vm]]
  memory = "256mb"
  cpu_kind = "shared"
  cpus = 1
```

### `Dockerfile`

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### CD GitHub Actions workflow (`.github/workflows/agent-api-cd.yml`)

```yaml
name: agent-api CD

on:
  push:
    branches:
      - master
    paths:
      - 'projects/agent-api/**'
      - '.github/workflows/agent-api-cd.yml'

jobs:
  deploy:
    name: Deploy to Fly.io
    runs-on: ubuntu-latest
    timeout-minutes: 15

    defaults:
      run:
        working-directory: 'projects/agent-api'

    steps:
      - uses: actions/checkout@v4
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

### Required GitHub Secret

| Secret name | How to obtain |
|---|---|
| `FLY_API_TOKEN` | `flyctl auth token` (run once; store in GitHub repo secrets) |

### App initialization (one-time setup by ICEngineer or CTO)

```bash
# From projects/agent-api directory
flyctl launch --name boaa-agent-api --region iad --no-deploy
```

This generates `fly.toml` and registers the app. Subsequent deploys are fully automated via the CD workflow.

---

## Deployment Verification

After each deploy, the CD pipeline must confirm the `/health` endpoint returns HTTP 200:

```bash
curl -f https://boaa-agent-api.fly.dev/health
```

If the health check fails, the deploy is considered failed. GitHub Actions will report a non-zero exit code. The issue must be escalated to CTO before the next merge is permitted.

---

## Alternatives Considered

| Alternative | Why rejected |
|---|---|
| Self-hosted VPS (PM2) | Requires server provisioning, firewall rules, and ongoing ops — out of scope for Phase 1 |
| AWS/GCP/Azure | Too much IAM and infra complexity for a proof-of-concept; budget overhead |
| Docker Compose on localhost | Not a "live environment" by any reasonable definition; fails the public endpoint criterion |
| Serverless (Vercel / Netlify) | Express long-lived connections need container runtime; Edge runtimes don't fit |

---

## Consequences

- ICEngineer (M3) must produce `Dockerfile`, `fly.toml`, and `.github/workflows/agent-api-cd.yml`.
- CTO reviews the CD workflow, `fly.toml`, and `Dockerfile` as part of the M3 PR review.
- `FLY_API_TOKEN` must be stored as a GitHub Actions secret before the CD workflow can run — this is a one-time human or agent action.
- Machines auto-pause when idle (Fly.io free tier behavior); cold starts are expected on a low-traffic POC.
- When load justifies it, `min_machines_running = 1` can be set to eliminate cold starts (cost: ~$2/month).
- This ADR should be revisited at Phase 3 if the playbook recommends a different hosting pattern for production workloads.

---

## Related

- [ADR-001: Tech Stack](ADR-001-tech-stack.md)
- [ADR-002: Agent File Scope](ADR-002-agent-file-scope.md)
- [M3 issue: BOAA-40](/BOAA/issues/BOAA-40) — Add Continuous Delivery
- [M2 issue: BOAA-39](/BOAA/issues/BOAA-39) — Deliver first real feature (CD builds on this)
