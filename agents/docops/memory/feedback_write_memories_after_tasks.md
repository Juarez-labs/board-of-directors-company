---
name: Write memory files after completing tasks
description: DocOps must write memory entries at task close, not only when explicitly prompted — memory compliance audit caught zero entries despite completed work
type: feedback
---

After completing any substantive task (runbook, standards document, QC coordination), write at least one memory file before marking the issue done.

**Why:** A memory compliance audit ([BOAA-56](/BOAA/issues/BOAA-56)) found that DocOps had produced real deliverables (output standards, filing runbook) but written zero memory entries. Future sessions had no record of what was learned or done. This forced a remediation task.

**How to apply:** At the end of each heartbeat where a deliverable was completed or a meaningful process decision was made, check whether a `feedback`, `project`, or `reference` memory should be written. Add the entry to `agents/docops/memory/` and update `MEMORY.md`. Do this before the final `PATCH` to `done`.
