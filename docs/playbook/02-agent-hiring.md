# 02 — Agent Hiring Process

**Status:** Populated
**Last updated:** 2026-04-08
**Proven by:** Six agents hired and operational

---

## Why Hiring Matters

In an AI-agent company, the "hiring" step is where you define what an agent can and cannot do. A poorly scoped agent either over-reaches (does work it shouldn't) or under-reaches (escalates everything). Getting this right the first time saves significant coordination cost.

---

## The Five-File Standard

Every agent requires exactly five files before going live. These files form the agent's complete operating context.

```
agents/<role>/
  AGENTS.md        ← role charter
  HEARTBEAT.md     ← execution checklist
  SOUL.md          ← persona and voice
  TOOLS.md         ← available tools
  memory/MEMORY.md ← persistent memory index
```

### AGENTS.md
The role charter. Defines:
- What the agent owns and is accountable for
- Specific deliverables and recurring duties
- What the agent must NOT do (delegation boundaries)
- Chain of command (manager, direct reports)
- Key reference documents

### HEARTBEAT.md
A short checklist the agent runs every time it wakes up. Covers:
- Identity check (confirm Paperclip environment vars)
- Inbox review (what is assigned, what is in progress)
- Work-in-progress check (any unfinished task from last run?)
- Execution steps appropriate to the role
- Exit conditions

### SOUL.md
Persona definition. Covers:
- How the agent communicates (tone, style, formality)
- What it cares about and values
- How it handles ambiguity or conflict
- Its working relationship with other agents

### TOOLS.md
Catalog of every tool the agent can use, with usage notes. Prevents agents from using capabilities they do not have or forgetting capabilities they do.

### memory/MEMORY.md
A persistent index of facts the agent needs across conversations. Organized by memory type:
- **user** — who the user is and their working preferences
- **feedback** — corrections and confirmations from prior sessions
- **project** — ongoing work context and decisions
- **reference** — where to find external information

---

## The Hiring Workflow

### 1. Pre-Hire Checks

Before submitting a hire request:

- Confirm the role gap is real and cannot be covered by an existing agent
- Define the agent's scope, chain of command, and first tasks
- Identify required skills (Paperclip skills installed on the agent at hire)
- Get board budget confirmation (hiring is a budget event)

### 2. Submit the Hire Request

Use the `paperclip-create-agent` skill. This produces a structured hire request for board approval. The request includes:
- Role name and title
- Chain of command
- Agent charter summary
- Desired skills
- First task description

### 3. Board Approval

The board reviews the hire request as a Paperclip approval. No agent goes live until approved.

### 4. On-Approval Steps

Once the board approves:

1. Create the five required files in `agents/<role>/`
2. Set the agent's instructions path via the Paperclip API (`PATCH /api/agents/{id}/instructions-path`)
3. Sync desired skills to the agent (`POST /api/agents/{id}/skills/sync`)
4. Claim the API key (the agent claims its own key on first run)

### 5. Day-One Task

Every new agent's first assignment is a structured onboarding task:
- Read all five of their own files
- Read the company mission and master execution plan
- Write initial memories (role, responsibilities, key references)
- Post a comment confirming they are operational

The CEO (or hiring manager) reviews the first heartbeat run to confirm the agent executed correctly.

### 6. First Heartbeat Verification

Check that the new agent:
- Checked out its task correctly
- Posted a substantive comment (not just "done")
- Wrote at least one memory file
- Updated the task to `done` with a summary

If any of these fail, treat it as a Day 1 defect and assign a follow-up task.

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---------|------------|-----|
| Missing AGENTS.md sections | Agent doesn't know its constraints | Use `agents/templates/AGENTS.md` as the base |
| No HEARTBEAT.md | Agent wakes up without a checklist, improvises | Write the checklist before the agent goes live |
| Vague chain of command | Agent escalates to the wrong manager | Be explicit: `CEO → CTO → ICEngineer` |
| Skills not synced | Agent can't use Paperclip or key tools | Always sync skills at hire |
| No day-one task | Agent has no first move | Always create a day-one onboarding task |

---

## What We Learned from Hiring Six Agents

- **Template compliance reduces onboarding cost dramatically.** The second, third, and sixth agent hires were faster than the first because the template was solid.
- **Scope constraints in AGENTS.md are more valuable than scope grants.** Knowing what an agent must NOT do prevents expensive cross-domain interference.
- **Day-one task quality predicts agent quality.** An agent that writes rich memory files on day one continues to write rich memory files. One that writes stubs continues to write stubs.

---

*Source documents: [agent-hiring-runbook.md](../runbooks/agent-hiring-runbook.md), [agents/templates/](../../agents/templates/)*
