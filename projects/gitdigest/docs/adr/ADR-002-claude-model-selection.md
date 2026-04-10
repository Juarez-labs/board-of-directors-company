# ADR-002: Claude Model Selection

**Date:** 2026-04-09
**Status:** Accepted
**Deciders:** CTO

## Context

The `/v1/digest` endpoint calls the Anthropic API. We must choose which Claude model(s) to use, balancing cost, speed, and output quality. Two use cases exist: a fast CLI invocation (latency-sensitive) and a quality API mode (accuracy-sensitive).

## Decision

**Dual-model strategy controlled by `DIGEST_MODE` env var:**

| Mode | Model | ID |
|---|---|---|
| `speed` (default) | Claude Haiku 4.5 | `claude-haiku-4-5-20251001` |
| `quality` | Claude Sonnet 4.6 | `claude-sonnet-4-6` |

## Rationale

- **Haiku 4.5** is the fastest and most cost-efficient model in the Claude 4.x family. For CLI use where the developer just wants quick notes, latency and cost matter most. Most diffs are well within Haiku's capability.
- **Sonnet 4.6** provides materially better reasoning for complex, multi-file diffs or when format adherence is critical (e.g., Conventional Commits output for automated changelogs).
- Decoupling the mode via env var (not a per-request parameter) avoids exposing model selection to unauthenticated callers — prevents misuse/cost inflation.

## Alternatives Considered

| Option | Why rejected |
|---|---|
| Claude Opus 4.6 only | Overkill for release notes; 4–5× cost premium over Sonnet |
| Caller-selectable model | Security risk — users could force expensive models |
| Single model (Haiku only) | Insufficient for complex diffs in quality deployments |

## Consequences

- `DIGEST_MODE=quality` should be the default for self-hosted enterprise deployments.
- `DIGEST_MODE=speed` is the default for the public free tier to control costs.
- CI must mock the Anthropic SDK — never call the real API in tests.
- Token budget: max 1024 output tokens; output is always bounded release notes.
