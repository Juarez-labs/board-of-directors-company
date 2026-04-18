# BOAA Agent Onboarding Standard

**Owner:** DocOps
**Last updated:** 2026-04-17
**Source:** [BOAA-197](/BOAA/issues/BOAA-197) — Gate 0.1, Phase 0 Pre-Implementation

This document defines the canonical onboarding standard for all agents at Board of Directors Company. It is the authoritative reference for anyone setting up a new agent, whether from scratch or during project bootstrapping.

For step-by-step procedural checklists, see [Agent Hiring Runbook](runbooks/agent-hiring-runbook.md). This document defines the **standard** — the rules, templates, and validation criteria — that the runbook implements.

---

## 1. Agent Role Definition (AGENTS.md Template)

Every agent MUST have an `AGENTS.md` file in `agents/<role>/AGENTS.md`. This file is the agent's charter and is loaded by the Paperclip harness on every heartbeat wake.

### Required Sections

All `AGENTS.md` files must include these sections in order:

```markdown
# <Role> Agent — Instructions

You are the **<Role>** of Board of Directors Company. [One sentence on core ownership.]

## Role

- [3–5 bullets: what you own and are accountable for]

## Responsibilities

- [Specific deliverables, directories owned, and recurring duties]

## Constraints

- [What you must NOT do — delegation boundaries, escalation triggers]

## Chain of Command

<Manager> → <This Role> → <Direct Reports>

## References

- Company mission: mission.md
- Company memory: company memory/index.md
- Docs: docs/index.md
- Operations: operations/index.md
- Your memory index: memory/MEMORY.md
- Heartbeat checklist: HEARTBEAT.md
- Soul / voice: SOUL.md
- Tools: TOOLS.md
```

The **References** section is mandatory. Every agent must be able to navigate from their `AGENTS.md` to all seven company-wide documents.

### Full Agent Directory Structure

```
agents/<role>/
├── AGENTS.md           ← Role charter (required)
├── HEARTBEAT.md        ← Per-heartbeat execution checklist (required)
├── SOUL.md             ← Voice, persona, values (required)
├── TOOLS.md            ← Tool catalog with usage notes (required)
└── memory/
    └── MEMORY.md       ← Persistent memory index (required)
```

No agent goes live without all five files. Use templates in `agents/templates/` as starting points. Every template section must be customized — do not ship placeholders.

---

## 2. Skill Assignment at Hire

### Default Skills (All Agents)

Every agent receives these two skills at hire, no exceptions:

| Skill | Purpose |
|-------|---------|
| `paperclip` | Task management, inbox, status updates, coordination |
| `para-memory-files` | Persistent memory system across heartbeat sessions |

Assign via:

```bash
POST /api/agents/{agentId}/skills/sync
{
  "desiredSkills": ["paperclip", "para-memory-files"]
}
```

### Role-Specific Skills

Additional skills are assigned on top of the defaults based on role:

| Role | Additional Skills |
|------|------------------|
| CEO | `paperclip-create-agent`, `company-creator` |
| CTO | `simplify`, `capsule-start`, `capsule-closeout`, `capsule-validate` |
| CMO | `design-guide` |
| DocOps | *(defaults only)* |

When hiring a new agent, include `desiredSkills` in the hire request payload so skills are assigned on day one.

### Instructions Path Registration

After files are created, set the agent's instructions path so the harness loads the correct `AGENTS.md`:

```bash
PATCH /api/agents/{agentId}/instructions-path
{
  "path": "agents/<role>/AGENTS.md"
}
```

Relative paths are resolved against the agent's `adapterConfig.cwd`. Verify the path resolves correctly before triggering a heartbeat.

---

## 3. File Root Path Isolation

Each agent operates within a defined file root. Agents MUST NOT read or write outside their designated scope without an explicit task authorizing cross-boundary access.

### Scope Rules

| Agent | Owned Paths | Read-Only Paths |
|-------|-------------|-----------------|
| CEO | `agents/ceo/`, top-level governance files | All |
| CTO | `agents/cto/`, `projects/`, `packages/`, `docs/` | All |
| CMO | `agents/cmo/`, `company memory/`, `operations/`, `growth/` | All |
| DocOps | `agents/docops/`, `docs/` | All |
| QC | `agents/qc/` | All (read-only enforcement role) |
| Security | `agents/security/` | All (read-only audit role) |
| IC/UX agents | `agents/<role>/`, assigned project subdirectory | Assigned project only |

**Rule:** Agents may read broadly for context but MUST only write within their owned paths or into a path explicitly granted by a parent task.

### Isolation Enforcement at Onboarding

When onboarding a new agent:

1. Define owned paths in the agent's `AGENTS.md` under a **File Root** section.
2. Scope the agent's adapter `cwd` to their primary working directory when possible.
3. Do not grant broad write access as a convenience — assign the minimum scope needed for the role.

> The full File Root Isolation Protocol (rules, escalation triggers, and audit procedures) is defined in [Gate 0.2 — BOAA-198](/BOAA/issues/BOAA-198). This section is a summary for onboarding purposes.

---

## 4. First Heartbeat Validation

A new agent is not fully onboarded until their first heartbeat completes successfully. The following checklist must be verified before marking onboarding done.

### Pre-Heartbeat Checklist

- [ ] All five files exist and are valid markdown: `AGENTS.md`, `HEARTBEAT.md`, `SOUL.md`, `TOOLS.md`, `memory/MEMORY.md`
- [ ] `AGENTS.md` contains all required sections including References
- [ ] Instructions path set via `PATCH /api/agents/{agentId}/instructions-path`
- [ ] Default skills assigned: `paperclip`, `para-memory-files`
- [ ] Role-specific skills assigned
- [ ] Day-one onboarding task created and assigned (see below)

### Day-One Onboarding Task

Assign this exact task to the new agent immediately after hire:

> **"Complete onboarding: read AGENTS.md, HEARTBEAT.md, SOUL.md, TOOLS.md, and memory/MEMORY.md. Read mission.md and company memory/index.md. Post a comment confirming you understand your role, chain of command, and the company filing structure."**

Set `parentId` and `goalId` on the task. This creates an audit trail.

### First Heartbeat Success Criteria

| Check | Expected Outcome |
|-------|-----------------|
| Task transition | `todo` → `in_progress` → `done` |
| Comment posted | Agent confirms understanding of role, chain of command, and filing structure |
| No blocked status | Agent resolves any onboarding ambiguity without escalating on day one |
| Memory seed | Agent has written at least one memory entry to `memory/MEMORY.md` |

### First Heartbeat Failure Diagnosis

If the heartbeat fails or the agent gets stuck, check in this order:

1. **Instructions path** — Was it set correctly? Does it resolve to a real file?
2. **File completeness** — Are all five files present and non-empty?
3. **Skill installation** — Does the agent have the `paperclip` skill?
4. **Task assignment** — Is the day-one task correctly assigned with `parentId` and `goalId`?
5. **AGENTS.md validity** — Does it contain all required sections?

---

## 5. Project and Goal Context Setup

New agents operate within the company's project/goal hierarchy. All task work must be anchored to a project and, when applicable, a goal.

### Setting Up Project Assignment

Once the first heartbeat succeeds:

1. Identify which projects the agent will contribute to
2. Assign the agent to those projects in Paperclip
3. Ensure the agent's `AGENTS.md` references the relevant projects in their Responsibilities section

### Task Creation Rules for New Agents

When creating tasks for a new agent:

- Always set `parentId` — tasks without a parent are orphaned from the hierarchy
- Set `goalId` unless the task is infrastructure/housekeeping with no goal parent
- Include `billingCode` for cross-team work (work done for another team's project)
- Set `projectId` to place the task in the correct project backlog

### Goal Context in AGENTS.md

Each agent's `AGENTS.md` should include, in its Responsibilities section, the goals and projects they contribute to. This keeps goal context visible without requiring agents to query the API on every heartbeat.

Example:

```markdown
## Responsibilities

- Own and maintain `docs/` — all technical documentation
- File and convert deliverables produced by other agents
- Contribute to: Aurion Group (project), D-series directives (ongoing)
```

### Agent Roster Update

After successful onboarding, update `agents/README.md`:

```markdown
| Agent   | Role    | Reports To | Status | Projects         |
|---------|---------|------------|--------|------------------|
| DocOps  | DocOps  | CEO        | Active | Aurion Group     |
```

---

## Quick Reference

### Onboarding Checklist

**Pre-hire:**
- [ ] Role scope and chain of command defined
- [ ] File root (owned paths) defined
- [ ] Skills list determined (default + role-specific)

**On approval:**
- [ ] `agents/<role>/` directory created with all five files
- [ ] All files customized (no generic placeholders)
- [ ] `memory/MEMORY.md` seeded with 2–3 critical context entries
- [ ] Instructions path registered: `PATCH /api/agents/{agentId}/instructions-path`
- [ ] Skills assigned: `POST /api/agents/{agentId}/skills/sync`

**Post-hire:**
- [ ] Day-one onboarding task created and assigned
- [ ] First heartbeat triggered and verified
- [ ] Agent added to relevant projects
- [ ] `agents/README.md` roster updated

---

## Related Documents

- [Agent Hiring Runbook](runbooks/agent-hiring-runbook.md) — Procedural checklist for hire execution
- [BOAA-198 — File Root Isolation Protocol](/BOAA/issues/BOAA-198) — Full isolation rules and audit procedures
- [Output Standards](output-standards.md) — Document formatting and naming conventions
- [agents/templates/](../agents/templates/) — Canonical agent file templates
