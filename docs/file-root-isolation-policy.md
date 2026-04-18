# File Root Isolation Policy

**Version:** 1.0
**Status:** Active
**Effective Date:** 2026-04-17
**Owner:** DocOps
**Scope:** All agent deployments under Board of Directors Company (BOAA) and Aurion Group

---

## Purpose

This policy defines the file root boundaries for BOAA and Aurion Group agent deployments. Agents and processes MUST NOT read from, write to, or reference files outside their designated root. Cross-root access constitutes a policy violation.

---

## File Root Definitions

| Company | Root Path | Identifier |
|---|---|---|
| Board of Directors Company | `/home/jarvis2048/paperclip/Board of Directors company/` | BOAA |
| Aurion Group | `/home/jarvis2048/paperclip/aurion-group/` | Aurion |

---

## Isolation Rules

### 1. Agent Scope Confinement

Each agent MUST operate exclusively within its company's root path:

- **BOAA agents** read and write only under `/home/jarvis2048/paperclip/Board of Directors company/`
- **Aurion agents** read and write only under `/home/jarvis2048/paperclip/aurion-group/`

### 2. No Cross-Root File Access

- An Aurion agent MUST NOT access any path under the BOAA root, and vice versa.
- File references in issue descriptions, comments, AGENTS.md files, and documents MUST use paths within the agent's own root.
- No symbolic links, mount points, or path traversal patterns that bridge the two roots are permitted.

### 3. Shared Utilities

- Company-level CLI tools (e.g., `paperclipai`, `npx`, system binaries) installed at the OS level are permitted. These are not file root violations.
- No shared application data, configuration files, or state files may span both roots.

### 4. Documentation and Deliverables

- BOAA documentation is stored under: `Board of Directors company/docs/`
- Aurion documentation is stored under: `aurion-group/docs/` (to be created as the Aurion repo is built out)
- Cross-company references in documents are permitted as **links only** (e.g., Paperclip issue links, URLs). File paths must never cross roots.

### 5. Git Repository Isolation

- BOAA has its own git repository at `/home/jarvis2048/paperclip/Board of Directors company/`
- Aurion Group has (or will have) its own git repository at `/home/jarvis2048/paperclip/aurion-group/`
- Commits, branches, and history MUST remain separate. No shared git remote is permitted unless explicitly approved by CEO.

### 6. Workspace Configuration

When configuring agent workspaces in Paperclip:
- BOAA agent `cwd` MUST be set to `/home/jarvis2048/paperclip/Board of Directors company/` (or a subdirectory thereof)
- Aurion agent `cwd` MUST be set to `/home/jarvis2048/paperclip/aurion-group/` (or a subdirectory thereof)

---

## Enforcement

### Agent Responsibilities

Each agent is responsible for verifying that:
1. Their `adapterConfig.cwd` is set to the correct root before performing any file operations.
2. Any file path they reference in a task is within their own root.
3. They do not follow paths that resolve outside their root, even if passed by another agent or issue.

### QC Responsibility

QCAgent MUST check file path references during PR review for:
- Hardcoded cross-root paths in AGENTS.md files
- File operation commands that target the other company's root
- Workspace `cwd` configurations pointing to the wrong root

### Violation Handling

If a cross-root access is detected:
1. The offending agent MUST stop immediately and mark the task `blocked`.
2. A comment MUST be posted noting the violation and the path that was accessed.
3. The issue MUST be escalated to the CEO.

---

## Rationale

Isolating file roots between BOAA and Aurion Group:
- Prevents accidental leakage of proprietary strategy, personnel, or client data between companies.
- Ensures each company's git history remains clean and auditable.
- Establishes a clean separation of concerns for multi-company Paperclip deployments.
- Supports future security auditing and compliance requirements.

---

## Related Documents

- [Agent Onboarding Standard](agent-onboarding-standard.md) — file root verification is part of Gate 0 onboarding
- [Output Standards](output-standards.md)
- [BOAA-198](/BOAA/issues/BOAA-198) — Gate 0.2 task that produced this document
- [BOAA-196](/BOAA/issues/BOAA-196) — Phase 0 pre-implementation gates for Aurion Group
