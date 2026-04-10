# ADR-003: Rate Limiting Strategy

**Date:** 2026-04-09
**Status:** Accepted
**Deciders:** CTO

## Context

The public endpoint hits the Anthropic API on every request. Without rate limiting, a single bad actor could exhaust our API budget. We need a per-IP rate limit that works in both single-instance (development) and multi-instance (production) deployments.

## Decision

**100 requests/day per IP using `express-rate-limit` with a Redis backend (`rate-limit-redis`). Graceful fallback to in-memory store when Redis is unavailable.**

Configuration:
- Window: 24 hours
- Max: 100 requests
- Key: `req.ip`
- Standard `RateLimit-*` headers (RFC 6585)

## Rationale

- 100 req/day is generous for individual developers (a CI pipeline generates ~1 request per push) but low enough to prevent abuse.
- Redis backend is required for multi-instance production deployments so limits are shared across pods.
- In-memory fallback allows local development without Redis.
- `express-rate-limit` is the de facto standard for Express; no custom middleware needed.

## Alternatives Considered

| Option | Why rejected |
|---|---|
| No rate limiting | Unacceptable — direct Anthropic API cost exposure |
| Token-based auth only | CLI users should not need accounts for basic usage |
| Cloudflare / edge limiting | Adds infra complexity; overkill for MVP |
| Per-API-key limits | Good for v2; requires auth layer not in MVP scope |

## Consequences

- `REDIS_URL` must be set in production. Railway and Fly.io both offer Redis add-ons.
- CI must stub the rate limiter in integration tests (done — see `tests/integration/`).
- Future v2: introduce token-based auth + higher limits per authenticated user.
