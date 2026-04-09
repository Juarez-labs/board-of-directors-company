# 05 — The Delivery Loop

**Status:** Populated
**Last updated:** 2026-04-08
**Proven by:** M1–M4 (GitHub push, first feature, CD pipeline, multi-agent review cycle)

---

## What the Delivery Loop Is

The delivery loop is the path a piece of code takes from an agent's checkout to a running deployment. It has four agents involved, three automated systems, and one hard gate that nothing can bypass.

We proved this loop works end to end in Phase 1. It is not aspirational — this is the process we ran.

---

## The Stack

```
ICEngineer commits → GitHub push → CI pipeline (lint / typecheck / test)
                                          ↓
                                    QCAgent review
                                          ↓
                                    CTO approves merge
                                          ↓
                                    merge to master
                                          ↓
                                    CD deploys to Fly.io
```

---

## CI Pipeline

Every push to any branch triggers the CI pipeline automatically via GitHub Actions. The pipeline runs three checks in sequence:

```bash
npm ci         # clean install, verifies lockfile integrity
npm run typecheck   # TypeScript type checking
npm run lint        # ESLint style and quality rules
npm run test        # unit and integration tests
```

**Hard rule:** All CI checks must pass before a PR is reviewable. QCAgent does not begin manual review on a red CI run. If CI fails, the task is set to `blocked` with the exact failure output and returned to the IC.

This sounds strict. It eliminates an entire class of review comments ("you have a type error on line 42"). Automated checks catch mechanical issues so reviewers can focus on correctness and design.

---

## QC Gate Review

Once CI is green, ICEngineer posts a "ready for review" comment on the Paperclip issue and tags QCAgent. QCAgent then runs the code review checklist:

| Check | Pass criteria |
|-------|--------------|
| Correctness | Code does what the ticket describes |
| Security | No command injection, SQL injection, XSS, hard-coded secrets, or OWASP Top 10 issues |
| Error handling | Errors at system boundaries are handled; no swallowed exceptions |
| Test coverage | Happy path + at least one failure path tested for every new route or function |
| No over-engineering | No unused abstractions, feature flags, or speculative code |
| Commit hygiene | Every commit references the task identifier; `Co-Authored-By: Paperclip <noreply@paperclip.ing>` present |

QCAgent posts one of two verdicts:
- **Pass** — issue moves to `in_review` for CTO
- **Request changes** — issue is set to `blocked` with specific, actionable items; IC revises and re-submits

QCAgent does not approve — it gates. CTO approves.

---

## CTO Approval and Merge

After QCAgent passes the PR, CTO reviews for:
- Architectural alignment with the system design
- Infrastructure implications
- Any strategic concerns (e.g., does this change affect deployment assumptions?)

CTO merges the PR to `master`. No IC agent self-merges.

---

## CD Pipeline: Deploy to Fly.io

Merge to `master` automatically triggers the CD pipeline:

1. GitHub Actions detects the merge
2. Docker image is built
3. Image is deployed to the Fly.io application (`agent-api`)
4. Deployment is verified via Fly.io health checks

The agent-api is our live production service. Every merged PR to master is live within minutes of merge.

---

## The First Complete Loop (M4)

The first time we ran this full cycle end to end was the M4 milestone. An ICEngineer built a feature, CI ran, QCAgent reviewed and passed it, CTO approved and merged, and the CD pipeline deployed to Fly.io. All four agents participated, all three automated systems ran, and the deployment succeeded.

This was the moment the delivery loop went from designed to proven.

---

## What We Learned from Building the Delivery Loop

- **CI is the first line of defense, not QCAgent.** Before we had a hard CI requirement, QCAgent was occasionally reviewing PRs with type errors. Making CI a prerequisite for human review eliminated that waste entirely.
- **The IC/QC/CTO division removes bias.** The agent who writes the code is not the agent who reviews it. The agent who reviews it is not the agent who approves the merge. This three-role split adds latency but removes the natural tendency to approve your own work.
- **Fly.io CD was operationally straightforward.** The CD pipeline from GitHub Actions to Fly.io was the simplest part of M3 to get right. The hard part was defining the rollback procedure — which we documented in the runbooks but have not yet had to use.
- **Deployment verification is not optional.** After the first deployment, we added an explicit health-check step. "Deployed successfully" without a health check is "we pushed the image" — not "the service is alive."

---

*Source documents: [deploy-agent-api.md](../runbooks/deploy-agent-api.md), [pr-review-checklist.md](../runbooks/pr-review-checklist.md), [qc-review.md](../runbooks/qc-review.md), [BOAA-40](/BOAA/issues/BOAA-40) (M3), [BOAA-57](/BOAA/issues/BOAA-57) (M4 QC gate)*
