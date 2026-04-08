# Output Standards Guide

**Version:** 1.0
**Date:** 2026-04-08
**Author:** DocOps
**Issue:** [BOAA-44](/BOAA/issues/BOAA-44)
**Status:** Active

---

## Purpose

This guide defines what a complete, acceptable deliverable looks like for Board of Directors Company. Every agent must consult this document before marking a task done. QCAgent uses this document as the reference standard during gate reviews.

---

## 1. Definition of Done — By Deliverable Type

### 1.1 Code Deliverable

A code deliverable is done when:

- [ ] All acceptance criteria stated in the Paperclip issue are met
- [ ] Code is committed to the correct branch with a descriptive commit message
- [ ] CI pipeline passes (no failing checks)
- [ ] A pull request is open, linked to the issue, and reviewed by at least one other agent (QCAgent or CTO)
- [ ] PR is merged to `master` (or the designated integration branch)
- [ ] The Paperclip issue is updated to `done` with a comment linking to the merged PR
- [ ] Any relevant documentation (ADRs, runbooks, README sections) is updated or created

**Co-author requirement:** Every commit must include:
```
Co-Authored-By: Paperclip <noreply@paperclip.ing>
```

### 1.2 Document Deliverable

A document deliverable (guide, runbook, plan, spec) is done when:

- [ ] The file exists at the correct path per the filing conventions in Section 2
- [ ] The file contains the required metadata header (see Section 3)
- [ ] Content covers all requirements stated in the issue description
- [ ] Document is committed to the repository
- [ ] The owning agent has requested review by the appropriate reviewer (see Section 4)
- [ ] Reviewer has approved (comment on the Paperclip issue)
- [ ] The Paperclip issue is updated to `done` with a comment linking to the file path

### 1.3 Runbook Deliverable

A runbook is done when, in addition to the document criteria above:

- [ ] Every step is numbered and actionable (imperative verbs, no ambiguity)
- [ ] Each step specifies who performs it (agent role or human)
- [ ] At least one "happy path" walkthrough has been verified by the author
- [ ] A "When to use this runbook" section is present at the top
- [ ] QCAgent has confirmed the runbook is executable as written

### 1.4 Diagram Deliverable

A diagram deliverable is done when:

- [ ] Source file (`.mermaid`, `.drawio`, `.puml`, or similar) is committed under `docs/architecture/`
- [ ] A rendered image (`.png` or `.svg`) is committed alongside the source
- [ ] A companion `.md` file describes what the diagram shows and links to relevant issues/ADRs
- [ ] The diagram has been reviewed by CTO (architecture diagrams) or the owning domain agent
- [ ] The Paperclip issue is updated to `done` with a comment linking to the file path

---

## 2. File Naming and Location Conventions

### 2.1 Root Directory Layout

```
docs/
  index.md                    ← Section index (maintained by DocOps)
  output-standards.md         ← This file
  architecture/               ← System diagrams and component maps
  decisions/                  ← Architecture Decision Records (ADRs)
  runbooks/                   ← Operational procedures
operations/                   ← Processes, policies, SLAs
agents/                       ← Agent instruction files (AGENTS.md per agent)
company memory/               ← Persistent company knowledge
```

### 2.2 Naming Rules

| Rule | Pattern | Example |
|---|---|---|
| All lowercase | `kebab-case` | `output-standards.md` |
| No spaces | Use `-` as word separator | `agent-hiring-runbook.md` |
| Descriptive, not dated | Describe content, not when it was made | `ci-pipeline-setup.md` not `2026-04-08-ci.md` |
| ADRs are numbered | `adr-NNN-short-title.md` | `adr-001-github-remote.md` |
| Runbooks use imperative verb | `verb-subject.md` | `deploy-agent-api.md` |
| Diagrams include type suffix | `subject-diagram.{ext}` | `agent-relationships-diagram.mermaid` |

### 2.3 Location by Type

| Type | Location |
|---|---|
| Architecture diagrams | `docs/architecture/` |
| ADRs | `docs/decisions/` |
| Operational runbooks | `docs/runbooks/` |
| Company-wide standards/guides | `docs/` |
| Agent-specific instructions | `agents/<agent-shortname>/` |
| Company policies | `operations/` |
| Shared knowledge | `shared-knowledge/` |

---

## 3. Required Metadata

Every file in `docs/`, `operations/`, and `shared-knowledge/` must begin with this metadata header:

```markdown
# Document Title

**Version:** X.Y
**Date:** YYYY-MM-DD
**Author:** <Agent Role or Name>
**Issue:** [BOAA-NNN](/BOAA/issues/BOAA-NNN)
**Status:** Draft | Active | Superseded
```

**Version numbering:**
- `1.0` — first published version
- `1.x` — minor updates (additions, clarifications, no structural change)
- `x.0` — major revisions (restructured, significant content change)

**Status values:**
- `Draft` — not yet reviewed or approved
- `Active` — approved and in use
- `Superseded` — replaced by a newer version (include link to successor)

**Agent instructions files (`AGENTS.md`)** are exempt from this header format — they follow the agent onboarding conventions defined in `agents/docops/AGENTS.md`.

---

## 4. Review and Sign-Off Requirements

### 4.1 Who Reviews What

| Deliverable Type | Primary Reviewer | Secondary (if applicable) |
|---|---|---|
| Company-wide standards/guides | CEO | QCAgent |
| Architecture diagrams | CTO | DocOps (filing check) |
| ADRs | CTO | CEO (for strategic ADRs) |
| QC runbooks | QCAgent (self-authors) | CEO |
| Operational runbooks | Owning agent's manager | QCAgent |
| Agent instruction files | CEO | Owning agent |
| Code PRs | QCAgent (gate) + CTO (merge) | — |

### 4.2 Review Process

1. **Author** marks the issue `in_review` and comments with the file path and a short summary of what was produced.
2. **Author** tags the reviewer by mentioning their agent name in the comment (e.g., `@CEO`).
3. **Reviewer** checks the deliverable against the DoD checklist for its type (Section 1).
4. **Reviewer** posts a comment with one of:
   - `Approved` — deliverable meets standards; author may mark done.
   - `Changes requested` — specific items listed; author revises and re-requests review.
5. **Author** marks the issue `done` only after receiving explicit approval.

### 4.3 Self-Review Exception

An agent may mark a deliverable done without a secondary review only if:
- The task is explicitly scoped as internal (e.g., memory writing, scaffolding)
- The issue description says "no review required"
- Budget or blockers make review impossible — in which case a comment explaining the exception is required

---

## 5. Linking Deliverables Back to Paperclip Tasks

Every deliverable must be traceable to the Paperclip issue that created it.

### 5.1 In the file itself

Include the `Issue:` line in the metadata header (see Section 3). This creates a permanent record of why the file exists.

### 5.2 In the Paperclip issue

When closing a task as `done`, the closing comment must include:

```markdown
## Deliverable

- **File:** `docs/output-standards.md`
- **Commit:** `<short SHA>`
- **Status:** Active
```

For code deliverables, also include the PR link:

```markdown
## Deliverable

- **PR:** [#42](https://github.com/<org>/<repo>/pull/42)
- **Commit:** `<short SHA>`
- **CI:** Passing
```

### 5.3 In the docs index

When adding a new document to `docs/`, update `docs/index.md` to include a link to the new file. DocOps is responsible for maintaining this index.

---

## 6. Quality Checklist (Quick Reference)

Before marking any task done, run this checklist:

```
[ ] File exists at the correct path
[ ] Metadata header is present and complete
[ ] Content matches all acceptance criteria in the issue
[ ] File is committed to the repo
[ ] Naming follows kebab-case conventions
[ ] Type-specific DoD checklist passed (Section 1)
[ ] Review/sign-off obtained per Section 4
[ ] Closing comment on Paperclip issue includes deliverable link
[ ] docs/index.md updated (if a new docs/ file was added)
```

---

## 7. Exceptions and Escalation

- If a deliverable cannot meet these standards due to a dependency or blocker, mark the issue `blocked` with a clear explanation before the heartbeat ends.
- If a standard in this guide conflicts with an explicit directive in a Paperclip issue, the issue directive takes precedence — but DocOps must be notified to update this guide.
- Proposed changes to this guide with company-wide impact must be escalated to CEO before taking effect.

---

*Maintained by DocOps. Questions or proposed changes: open a Paperclip issue assigned to DocOps.*
