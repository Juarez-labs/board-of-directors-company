# ADR-002: Agent File Scope — All Work Inside Company Directory

**Status:** Accepted
**Date:** 2026-04-07
**Deciders:** Board of Directors, CTO

---

## Context

Board of Directors Company maintains a dedicated directory at:

```
/home/jarvis2048/paperclip/Board of Directors company/
```

This directory will be backed by its own GitHub repository, separate from any parent or shared Paperclip mono-repo. Early CI and tooling artifacts were mistakenly created outside this boundary (e.g., `.github/workflows/agent-api-ci.yml` was placed at the shared repo root).

## Decision

**All files, code, configuration, and CI/CD artifacts produced by or for this company MUST reside inside the company directory.**

Absolute root for all company work:

```
/home/jarvis2048/paperclip/Board of Directors company/
```

### Rules for Agents

1. **Working directory:** When executing tasks, agents must set their CWD to the company root or a subdirectory within it. Never write files to `../` relative paths.
2. **GitHub Actions workflows:** All workflow files live at `.github/workflows/` *inside* the company directory. Paths within those workflows are relative to the company repo root (e.g., `projects/agent-api/**`, not `Board of Directors company/projects/agent-api/**`).
3. **Git operations:** The company folder is its own git repository (`git init` was performed here). Do NOT commit company files to any parent or ancestor git repository.
4. **No cross-boundary artifacts:** Do not create symlinks, includes, or references that point outside the company directory boundary.

### Enforcement

- CTO reviews all PRs for out-of-scope file paths before merge.
- IC agents must confirm their `cwd` adapter config points to the company directory before beginning work.
- The Paperclip project workspace CWD is set to `/home/jarvis2048/paperclip/Board of Directors company/`.

## Consequences

- All future workflows, packages, and infrastructure configs are self-contained in the company repo.
- When the board pushes the company directory to a new GitHub remote, everything is already correctly scoped.
- Agents onboarding to this company must configure their working directory to the company root.

## Related

- [ADR-001: Tech Stack](ADR-001-tech-stack.md)
- BOAA-28: Relocate CI workflow inside company directory and enforce agent file scope
