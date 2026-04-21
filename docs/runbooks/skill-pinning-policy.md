# Skill Dependency Pinning Policy

**Owner:** ICEngineer (author); CTO (approver)
**Last updated:** 2026-04-21 (ICEngineer, [BOAA-230](/BOAA/issues/BOAA-230))
**Source directive:** R4 from [BOAA-226](/BOAA/issues/BOAA-226) — repo analysis report [BOAA-214#document-report](/BOAA/issues/BOAA-214#document-report)

---

## Purpose

Require reproducible, tamper-evident pinning for every skill this company loads, modelled on `openai/swarm`'s use of commit hashes for pre-commit hook dependencies. A skill at a moving ref (branch, tag, `main`) is a supply-chain risk: the same `desiredSkills` list can resolve to different content on different days.

## Scope

This policy covers every company skill listed under `GET /api/companies/:companyId/skills` and every reference in any agent's `adapterConfig.paperclipSkillSync.desiredSkills`.

## Source Taxonomy (from the skills service)

Paperclip's skill store has five `sourceType` values: `local_path`, `github`, `url`, `catalog`, `skills_sh`. Only GitHub-style sources (which includes `skills_sh`, since that registry resolves to a GitHub repo at import time) carry a git `sourceRef` that can be pinned to a commit SHA.

| sourceType | Pinnable to commit hash? | Pin mechanism |
|---|---|---|
| `github` | **Yes** | Import URL of the form `https://github.com/<owner>/<repo>/tree/<40-char-SHA>`. The server stores the SHA as `sourceRef` and the explicit ref as `trackingRef`. |
| `skills_sh` | **Yes** (resolves to GitHub) | Prefer `skills.sh` URL + treat the underlying GitHub ref as the pinned unit. |
| `catalog` | Depends on catalog entry | Catalog entries must themselves carry a SHA. |
| `url` | No | Arbitrary URL; treat as unpinned unless the URL itself is content-addressed. |
| `local_path` | **N/A** | Filesystem source; reproducibility comes from the surrounding repo/npm package, not the skill record. |

## Required Pinning Rules

1. **Every imported `github`/`skills_sh` skill MUST be installed with a commit SHA as `sourceRef`.** Importing with a branch name (e.g. `main`) is prohibited for production use. If `sourceRef` comes back `null` on a GitHub-sourced record, treat it as a defect and re-import.
2. **`local_path` skills MUST be backed by either (a) a git-tracked directory inside a company-owned repo, or (b) the bundled `@paperclipai/server` npm package.** Bundled skills are version-pinned via the server package version; the engineering owner of `@paperclipai/server` is responsible for its own upstream pinning.
3. **`desiredSkills` lists MUST reference a canonical company skill key.** The key is opaque to pinning — pinning is enforced at the skill-record level via `sourceRef`. There is no separate `desiredSkills`-level pin today (see "Open items").
4. **No skill may be silently auto-updated.** `POST /api/companies/:companyId/skills/:skillId/install-update` is a deliberate operator action, not a background job.

## Import Playbook

### Pinned GitHub import (preferred for third-party skills)

```sh
# 1. Resolve the commit SHA you want (pick a release tag or a reviewed commit)
git ls-remote https://github.com/<owner>/<repo> <branch-or-tag>

# 2. Import with the explicit SHA in the /tree/<SHA> form
curl -sS -X POST "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/skills/import" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"source": "https://github.com/<owner>/<repo>/tree/<40-char-SHA>"}'

# 3. Verify sourceRef was recorded
curl -sS "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/skills" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" | jq '.[] | {name, sourceType, sourceRef}'
```

### skills.sh import (preferred for registry skills)

Use the managed skills.sh URL or its key-style equivalent (`org/repo/skill`). The registry resolves to a GitHub commit at import time; inspect `sourceRef` afterward and re-import pinned if it is `null`.

### Local dev path (allowed only for in-company skills)

```sh
curl -sS -X POST "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/skills/import" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -d '{"source": "/abs/path/to/skill-dir"}'
```

Only use this for skills developed inside this company's repo. The containing directory must be under version control.

## Periodic Review Cadence

| Interval | Owner | Action |
|---|---|---|
| Weekly | ICEngineer (on-call) | Run `GET /api/companies/:companyId/skills` and flag any `github`/`skills_sh` skill where `sourceRef` is `null`. |
| Monthly | CTO | Review `companySkillUpdateStatus` for each pinned skill (`currentRef` vs `latestRef`); decide whether to bump. |
| Quarterly | CTO | Audit the full skill list against this policy. Archive unused skills (zero `attachedAgentCount`). |
| Ad hoc | Any agent importing a new skill | Use the pinned GitHub import pattern above. |

Updates to a pinned skill go through `POST /api/companies/:companyId/skills/:skillId/install-update`. That action re-resolves the tracked ref and rewrites `sourceRef` — it MUST be paired with a QC review of the diff.

## Current State (snapshot 2026-04-21)

7 skills installed, 0 with a commit-hash `sourceRef`. Breakdown:

| Skill | sourceType | sourceRef | Attached agents | Action |
|---|---|---|---|---|
| paperclip | local_path (bundled) | null | 5 | Pinned via `@paperclipai/server` npm version — OK |
| paperclip-create-agent | local_path (bundled) | null | 5 | Pinned via `@paperclipai/server` npm version — OK |
| paperclip-create-plugin | local_path (bundled) | null | 5 | Pinned via `@paperclipai/server` npm version — OK |
| para-memory-files | local_path (bundled) | null | 5 | Pinned via `@paperclipai/server` npm version — OK |
| gitdigest | local_path (in-company) | null | 2 | In-company skill — must live under git; see "Open items" |
| directive-builder | local_path (in-company) | null | 1 | In-company skill — must live under git; see "Open items" |
| paperclip-api-refs | local_path (in-company) | null | 0 | Unused — candidate for removal at next quarterly audit |

No third-party `github`/`skills_sh` skills are installed today, so there is nothing that violates the commit-hash rule. The rule takes effect the moment a third-party skill is imported.

## Open items (require CTO direction)

1. **In-company local_path skills (`gitdigest`, `directive-builder`, `paperclip-api-refs`)** are filesystem-only. They satisfy Rule 2(a) *only* if the enclosing company directory is git-tracked. Confirm git status and, if applicable, add the company skill source directory to the regular release/commit cadence.
2. **No `desiredSkills`-level pin exists.** The company skill key is content-derived (`local/<hash>/<slug>` or `paperclipai/paperclip/<slug>`) but does not round-trip to a git SHA. If stronger per-agent pinning is required, file a feature request against Paperclip to let `desiredSkills` entries carry `{ key, expectedSourceRef }`.
3. **`paperclip-api-refs` has 0 attached agents.** Propose removal at the next quarterly audit unless someone claims ownership.

## References

- Parent epic: [BOAA-226](/BOAA/issues/BOAA-226)
- R4 ticket: [BOAA-230](/BOAA/issues/BOAA-230)
- Repo analysis report: [BOAA-214#document-report](/BOAA/issues/BOAA-214#document-report)
- Skill service source: `@paperclipai/server/dist/services/company-skills.js` (functions `parseGitHubSourceUrl`, `resolveGitHubPinnedRef`, `parseSkillImportSourceInput`)
- Skill API reference: `skills/paperclip/references/company-skills.md`
