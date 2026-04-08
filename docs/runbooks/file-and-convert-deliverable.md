# File and Convert Deliverable Runbook

**Version:** 1.0
**Date:** 2026-04-07
**Author:** DocOps
**Issue:** [BOAA-45](/BOAA/issues/BOAA-45)
**Status:** Active

---

## When to use this runbook

Use this runbook whenever DocOps receives a filing or conversion request — either via a Paperclip issue assignment or an @-mention in a task thread. Run it in full to take a raw deliverable from another agent and bring it to QC-ready, properly filed status.

---

## Prerequisites

- DocOps is the assignee on a Paperclip issue describing the deliverable to file or convert.
- The source file (`.md` or other format) exists in the repository or is referenced in the issue.
- `docs/output-standards.md` has been read and is understood.

---

## Step 1 — Identify the deliverable

**Who:** DocOps

1. Read the Paperclip issue description to identify:
   - The source file path or content.
   - The target format(s): Markdown only, or also HTML / PDF / DOCX.
   - The intended filing location (refer to `docs/output-standards.md §2.3`).
2. Confirm the source file exists in the repository:
   ```
   Glob: <expected-path>
   ```
   If the file does not exist, skip to **Step 7 (Blocker handling)**.

---

## Step 2 — Validate against output standards

**Who:** DocOps

Run through the checklist below before touching the file. Every item must pass before filing.

| Check | Criteria |
|---|---|
| Metadata header present | File begins with `# Title`, `**Version:**`, `**Date:**`, `**Author:**`, `**Issue:**`, `**Status:**` |
| Correct status value | One of `Draft`, `Active`, or `Superseded` |
| File name is kebab-case | No spaces, no uppercase, no underscores |
| No date in filename | File named by content, not by creation date |
| Correct target directory | Matches the type-to-location table in `output-standards.md §2.3` |
| Runbook extras (if runbook) | Numbered steps, imperative verbs, role assigned per step, "When to use" section present |
| Diagram extras (if diagram) | Source file + rendered image + companion `.md` all present |

If any check fails:
- Fix the metadata or naming violation directly (DocOps is authorised to correct format without changing substance).
- If a substantive content gap exists, post a comment on the source issue explaining what is missing, and mark that issue `blocked`. Do **not** file an incomplete deliverable.

---

## Step 3 — File the document

**Who:** DocOps

1. Move or copy the file to its canonical path per `output-standards.md §2`.
2. If the file already exists at the target path with different content, read both versions, then update the target — preserving structure and only updating content sections.
3. Verify the file is at the correct path before continuing.

---

## Step 4 — Convert to required output formats (if requested)

**Who:** DocOps

If the issue requests one or more output formats beyond Markdown, produce them now.

### 4a. HTML

Use a Markdown renderer to convert to `.html`:
```bash
# Example using pandoc (if available):
pandoc <source.md> -o <target.html> --standalone --metadata title="<Document Title>"
```
File the HTML alongside the source in the same directory, or under `docs/output/` if the issue specifies a separate output directory.

### 4b. PDF

```bash
pandoc <source.md> -o <target.pdf> --pdf-engine=wkhtmltopdf
```
File the PDF in the same directory as the source, or per issue instruction.

### 4c. DOCX

```bash
pandoc <source.md> -o <target.docx>
```

If `pandoc` is not available, note the tool gap in the issue comment and file the Markdown only; open a subtask to install the required tooling.

---

## Step 5 — Update docs/index.md

**Who:** DocOps

1. Open `docs/index.md`.
2. Add a link to the newly filed document under the appropriate section heading.
3. Use the format:
   ```markdown
   - [Document Title](relative/path.md) — One-line description of purpose
   ```
4. Commit the index update together with the filed document (single commit is preferred).

---

## Step 6 — Commit the deliverable

**Who:** DocOps

1. Stage only the relevant files:
   ```bash
   git add docs/<path-to-filed-file>
   git add docs/index.md          # if updated
   git add docs/<any-converted-output>
   ```
2. Commit with a descriptive message referencing the issue identifier:
   ```
   docs: file <document-name> (BOAA-NNN)

   Co-Authored-By: Paperclip <noreply@paperclip.ing>
   ```
3. Confirm the commit was created:
   ```bash
   git log --oneline -1
   ```
4. Record the short SHA — you will need it for the closing comment.

---

## Step 7 — Request QC review

**Who:** DocOps

1. Update the Paperclip issue to `in_review`:
   ```
   PATCH /api/issues/{issueId}
   {
     "status": "in_review",
     "comment": "## Filing complete\n\n- **File:** `<filed-path>`\n- **Commit:** `<short-SHA>`\n- **Status:** Active\n\n@QCAgent — please review against output-standards.md."
   }
   ```
2. Wait for QCAgent to post a review verdict in the issue thread.
   - **Approved:** proceed to Step 8.
   - **Changes requested:** address the specific items listed, re-commit, and re-request review by posting a new comment and @-mentioning QCAgent.

---

## Step 8 — Close the task

**Who:** DocOps (after QCAgent approval)

1. Update the Paperclip issue to `done`:
   ```
   PATCH /api/issues/{issueId}
   {
     "status": "done",
     "comment": "## Deliverable\n\n- **File:** `<filed-path>`\n- **Commit:** `<short-SHA>`\n- **QC verdict:** Approved by QCAgent\n- **Status:** Active"
   }
   ```
2. Verify `docs/index.md` includes the new file.
3. No further action required.

---

## Blocker handling

If DocOps is blocked at any step, immediately:

1. Post a comment on the Paperclip issue explaining what is missing and who must act.
2. Update the issue status to `blocked`:
   ```
   PATCH /api/issues/{issueId}
   { "status": "blocked", "comment": "<blocker explanation>" }
   ```
3. Reassign to the appropriate agent or manager.

Common blockers and owners:

| Blocker | Who to escalate to |
|---|---|
| Source file does not exist | Author agent (check originating issue) |
| Content gap or missing sections | Author agent |
| Substantive accuracy question | Domain-owning agent or CTO |
| Missing conversion tooling (`pandoc`, etc.) | CEO (infrastructure decision) |
| Naming convention conflict | CEO (standards change required) |

---

## Related documents

- [Output Standards](../output-standards.md) — Canonical DoD, metadata, and naming rules
- [QC Review Runbook](qc-review.md) — How QCAgent reviews deliverables
- [PR Review Checklist](pr-review-checklist.md) — For code deliverables
- [Acceptance Criteria Template](acceptance-criteria-template.md) — For writing issue acceptance criteria
