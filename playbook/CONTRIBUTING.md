# Contributing to the AI Agent Company Playbook

Thank you for reading and wanting to improve this resource. Contributions are welcome — corrections, clarifications, new examples, and chapter proposals.

---

## Ways to Contribute

### Report an Error or Outdated Content

Open a GitHub Issue with:
- The chapter and section heading
- What is wrong or outdated
- A suggested correction (if you have one)

Label it `bug` for factual errors, `outdated` for content that no longer matches current Paperclip behavior.

### Suggest a Clarification or Improvement

Open a GitHub Issue labeled `enhancement`. Describe:
- Which chapter and section
- What is unclear or missing
- What a clearer version would look like

### Propose a New Chapter or Major Section

New chapters must address a real practitioner gap not covered in chapters 1–9. Open an Issue labeled `proposal` with:
- A one-paragraph summary of the topic
- Why it belongs in this playbook (not a blog post or separate repo)
- The intended audience level (Beginner / Intermediate / Advanced)
- A proposed outline (H2 headings)

Proposals that duplicate existing content or go off-topic (e.g., general LLM prompting guides) will be declined.

### Submit a Pull Request

1. Fork the repo and create a branch: `git checkout -b fix/chapter-3-typo`
2. Make your changes following the style guide below
3. Open a PR with a clear title and a one-sentence summary of what changed and why
4. Link the related Issue number in the PR description

PRs that touch multiple unrelated chapters will be asked to split.

---

## Style Guide

Follow these conventions so every chapter reads as part of the same document.

### Voice and Tone

- **Direct.** Write for practitioners, not academics. "Do this" not "one might consider doing this."
- **Concrete.** Every concept should have a concrete example or code snippet within two paragraphs.
- **Honest.** If something is hard or has failure modes, say so. The Lessons Learned chapter (Ch. 9) exists because honesty is more useful than polish.
- **Second person.** Use "you" and "your agents." Not "the user" or "one."

### Structure

- Each chapter opens with a `> **Audience:**` and `> **Prerequisites:**` block.
- Use H2 (`##`) for major sections, H3 (`###`) for subsections. No H4 or deeper.
- Use tables for comparisons. Use code blocks for all commands and JSON. Use blockquotes sparingly — only for callouts that genuinely need visual separation.
- End each major section with a concrete takeaway or transition to the next section.

### Code and Commands

- All shell commands use `bash` fenced code blocks.
- All JSON uses `json` fenced code blocks.
- Never use placeholder values like `YOUR_KEY_HERE` without explaining what to replace them with.
- Commands must work on a standard Linux/macOS environment with Paperclip installed.

### Formatting Rules

- **Bold** for key terms on first use. Italics for emphasis only — use sparingly.
- Numbered lists for sequential steps. Bullet lists for unordered sets.
- Link to other chapters by relative path: `[Chapter 3](chapters/03-agent-roles.md)`.
- Do not link to external resources unless they are directly required for the reader to proceed.

### Chapter Length

Target: 1,500–4,000 words per chapter. Shorter is better if the content is complete. Chapters that run over 4,000 words should be split.

---

## What We Will Not Accept

- Marketing copy for Paperclip or Anthropic products
- Content that only applies to specific private forks or enterprise configurations
- Chapters that require proprietary tooling not available to all readers
- Auto-generated content submitted without human review and editing
- Changes that touch the Lessons Learned chapter (Ch. 9) — it is a first-person retrospective and should remain stable

---

## Questions

Open an Issue labeled `question`. We read them.
