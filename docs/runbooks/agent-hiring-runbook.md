# Agent Hiring Runbook

**Owner:** CEO
**Last updated:** 2026-04-07
**Source:** [BOAA-11](/BOAA/issues/BOAA-11) — Agent Onboarding Standardization Plan

This is the canonical reference for hiring and onboarding any new agent at Board of Directors Company. Follow every step in order. Do not skip.

---

## Overview

Every new agent requires five files, two API calls, and a day-one task. This runbook covers:

1. Pre-hire checks
2. Required file structure
3. On-approval steps (files, instructions path, skills sync)
4. Post-hire steps (day-one task, first heartbeat verification, project assignment)

---

## 1. Pre-Hire Checks

Before creating a hire request:

- [ ] Confirm the role is needed and company budget allows
- [ ] Define the agent's scope, chain of command, and first tasks
- [ ] Identify which skills the agent will need (see [Skills Standard](#6-skills-assignment-standard))
- [ ] Use the `paperclip-create-agent` skill to submit the hire request and await board approval

---

## 2. Required File Structure

Every agent MUST have all five files in `agents/<role>/` before they go live:

| File | Purpose |
|------|---------|
| `AGENTS.md` | Role charter: responsibilities, delegation rules, constraints, chain of command |
| `HEARTBEAT.md` | Execution checklist run on every heartbeat wake |
| `SOUL.md` | Persona, voice, values — who this agent is and how they communicate |
| `TOOLS.md` | Catalog of tools available to the agent, with usage notes |
| `memory/MEMORY.md` | Persistent memory index — facts, references, feedback |

No agent goes live without all five.

---

## 3. AGENTS.md Standard Sections

All `AGENTS.md` files must include these sections (copy from `agents/templates/AGENTS.md`):

```
# <Role> Agent — Instructions

You are the **<Role>** of Board of Directors Company. [One sentence on core ownership.]

## Role
- [3-5 bullets: what you own and are accountable for]

## Responsibilities
- [Specific deliverables, directories owned, and recurring duties]

## Constraints
- [What you must NOT do — delegation boundaries, escalation triggers]

## Chain of Command
<Manager> -> <This Role> -> <Direct Reports>

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

The **References** section is mandatory and must point to all seven company-wide documents listed above.

---

## 4. On-Approval Steps

After the board approves the hire request, complete these steps in order:

### 4a. Create agent directory and files

```
agents/<role>/
├── AGENTS.md           ← customized from agents/templates/AGENTS.md
├── HEARTBEAT.md        ← customized from agents/templates/HEARTBEAT.md
├── SOUL.md             ← customized from agents/templates/SOUL.md
├── TOOLS.md            ← customized from agents/templates/TOOLS.md
└── memory/
    └── MEMORY.md       ← customized from agents/templates/memory/MEMORY.md
```

Use the templates in `agents/templates/` as starting points. Customize every file for the specific role — do not ship generic placeholders.

### 4b. Pre-populate MEMORY.md

Seed 2–3 memory entries immediately so the agent has critical context on day one:

- The company ID
- Their manager and direct reports
- The single most important constraint for their role

### 4c. Set the agent's instructions path

```bash
PATCH /api/agents/{agentId}/instructions-path
{
  "path": "agents/<role>/AGENTS.md"
}
```

This tells the Paperclip harness where to find the agent's charter on every wake.

### 4d. Assign company skills

All agents receive these two skills by default:

```bash
POST /api/agents/{agentId}/skills/sync
{
  "desiredSkills": ["paperclip", "para-memory-files"]
}
```

Add role-specific skills on top (see [Skills Standard](#6-skills-assignment-standard)).

---

## 5. Post-Hire Steps

### 5a. Create the day-one task

Assign this exact task to the new agent immediately after hire:

> **"Complete onboarding: read AGENTS.md, HEARTBEAT.md, SOUL.md, TOOLS.md, and memory/MEMORY.md. Read mission.md and company memory/index.md. Post a comment confirming you understand your role, chain of command, and the company filing structure."**

Set `parentId` and `goalId` on the task. This creates an audit trail confirming onboarding happened.

### 5b. Verify the first heartbeat

After the day-one task is assigned:

- Trigger a heartbeat for the new agent
- Confirm the task transitions from `todo` → `in_progress` → `done`
- Confirm a comment is posted with the onboarding confirmation

If the heartbeat fails or the agent gets stuck, check:
1. Was the instructions path set correctly?
2. Are all five files present and valid markdown?
3. Does the agent have the `paperclip` skill installed?

### 5c. Add to project assignments

Once the first heartbeat succeeds:

- Assign the agent to relevant projects
- Create their first real work task with clear scope
- Update `agents/README.md` to add them to the agent roster

---

## 6. Skills Assignment Standard

### Default (all agents)

| Skill | Purpose |
|-------|---------|
| `paperclip` | Task management, coordination, status updates |
| `para-memory-files` | Persistent memory across sessions |

### Role-specific additions

| Role | Additional Skills |
|------|------------------|
| CEO | `paperclip-create-agent`, `company-creator` |
| CTO | `simplify`, `capsule-start`, `capsule-closeout`, `capsule-validate` |
| CMO | `design-guide` |

Add skills via `POST /api/agents/{agentId}/skills/sync` with the full desired list (default + role-specific).

---

## 7. Company Structure Orientation

Every agent's `AGENTS.md` must include a References section pointing here. New agents must read `mission.md` as their first act after onboarding. The company filing structure every agent should know:

```
Board of Directors company/
├── mission.md                    ← Company mission and values (all agents read this)
├── agents/<role>/                ← Agent home directories
├── company memory/index.md       ← Shared brand knowledge (CMO owned)
├── docs/index.md                 ← Technical documentation (CTO owned)
├── operations/index.md           ← Strategy, marketing, OKRs (CMO owned)
├── projects/                     ← Active engineering projects
├── packages/                     ← Shared packages
├── skills/                       ← Company skills
└── growth/                       ← Growth campaigns and experiments
```

---

## 8. Agent Roster

Maintain `agents/README.md` as the live agent registry. Update it every time an agent is hired or offboarded:

```
# Agent Roster
| Agent | Role | Reports To | Status |
|-------|------|------------|--------|
| CEO   | CEO  | Board      | Active |
| CTO   | CTO  | CEO        | Active |
| CMO   | CMO  | CEO        | Active |
```

---

## Quick Checklist

**Pre-hire:**
- [ ] Role defined, budget confirmed
- [ ] Hire request submitted via `paperclip-create-agent`

**On approval:**
- [ ] `agents/<role>/` directory created
- [ ] `AGENTS.md` written and customized
- [ ] `HEARTBEAT.md` written and customized
- [ ] `SOUL.md` written and customized
- [ ] `TOOLS.md` written and customized
- [ ] `memory/MEMORY.md` created and seeded
- [ ] Instructions path set via `PATCH /api/agents/{agentId}/instructions-path`
- [ ] Skills assigned via `POST /api/agents/{agentId}/skills/sync`

**Post-hire:**
- [ ] Day-one onboarding task created and assigned
- [ ] First heartbeat verified successfully
- [ ] Agent added to relevant projects
- [ ] `agents/README.md` roster updated
