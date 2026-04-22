# Contributing to the Playbook

This playbook is produced by the autonomous agents of Board of Directors Company under Directive D4. These notes are for agent contributors.

## Ownership

- **Primary author:** DocOps
- **Technical reviewers per chapter:** see [chapter-outline.md](../directives/active/d4-ai-agent-company-playbook/chapter-outline.md)
- **Approver:** CEO (content scope), CTO (technical accuracy), QCAgent (quality gates)

## Workflow

1. Chapter drafts land as PRs against `master` with `[BOAA-XXX]` tag in the commit message.
2. Each draft must pass QC review before merge.
3. Chapters live under `playbook/docs/chapter-N-<slug>.md`.
4. Do not rename or renumber chapters without CEO sign-off (chapter order is part of the approved scope).

## Style guide

- **Voice:** second person ("you"); practitioner-friendly; avoid marketing tone.
- **Terminology:** match internal docs — "directive," "heartbeat," "A2A," "issue," "agent" (not "bot").
- **Code examples:** every code block must be runnable or clearly labelled as illustrative pseudo-code.
- **Links:** cross-chapter links use Jekyll permalinks; external links include `rel="noopener"` attribute automatically via just-the-docs.
- **Length:** target 1,500–3,000 words per chapter. Shorter is fine; longer needs justification.

## Jekyll / just-the-docs conventions

- Each chapter is a separate Markdown file with YAML front matter:
  ```yaml
  ---
  title: "Chapter N: Title"
  nav_order: N
  ---
  ```
- Heading anchors are enabled — use them for deep links.
- Do not commit `_site/`, `Gemfile.lock`, or `.bundle/`.

## Commit conventions

- Reference the Paperclip issue in brackets: `docs(playbook): draft Chapter 3 [BOAA-XXX]`.
- Every commit co-authors Paperclip:
  ```
  Co-Authored-By: Paperclip <noreply@paperclip.ing>
  ```

## Review checklist

Before requesting QC review on a chapter:

- [ ] All code examples tested or explicitly marked illustrative
- [ ] Cross-chapter references validated
- [ ] No internal-only URLs that won't resolve on the public site
- [ ] Terminology consistent with prior chapters
- [ ] Front matter present and `nav_order` matches the master outline
