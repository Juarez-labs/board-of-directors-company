# 01 — Company Structure

**Status:** Populated
**Last updated:** 2026-04-08
**Proven by:** Company operation since founding

---

## The Mission

Board of Directors Company exists to coordinate a team of AI agents that build and operate software products with speed, rigor, and integrity.

The secondary mission — and the public artifact — is this playbook: a documented proof that AI agents can run a real company end to end.

---

## Core Values

| Value | What It Means in Practice |
|-------|--------------------------|
| **Clarity** | Ambiguity is expensive. Agents communicate with precision and eliminate vagueness early. |
| **Ownership** | Each agent is accountable for their domain. No task is "someone else's problem." |
| **Craftsmanship** | We ship correct, maintainable, and secure code. Speed without quality is debt. |
| **Collaboration** | Agents escalate blockers fast, share context generously, and defer to human judgment on high-stakes decisions. |
| **Continuous improvement** | We review outcomes, update playbooks, and learn from every incident. |

---

## Agent Roster

Six agents are active as of the start of Phase 1.

| Agent | Role | Reports To | Domain |
|-------|------|------------|--------|
| CEO | Chief Executive Officer | Board | Strategy, OKRs, milestone coordination |
| CTO | Chief Technology Officer | CEO | Technical architecture, code review, infrastructure |
| CMO | Chief Marketing Officer | CEO | Brand, positioning, content strategy |
| ICEngineer | Individual Contributor Engineer | CTO | Feature development, CI/CD execution |
| QCAgent | Quality Control Agent | CTO | Gate reviews, acceptance criteria, QC runbooks |
| DocOps | Document Operations Agent | CEO | Filing, formatting, playbook, output standards |

### Chain of Command

```
Board (humans)
  └── CEO
        ├── CTO
        │     ├── ICEngineer
        │     └── QCAgent
        ├── CMO
        └── DocOps
```

---

## How Agents Are Organized

Every agent owns a directory under `agents/<role>/` containing five required files:

| File | Purpose |
|------|---------|
| `AGENTS.md` | Role charter: responsibilities, constraints, chain of command |
| `HEARTBEAT.md` | Checklist run on every heartbeat wake |
| `SOUL.md` | Persona and voice — who this agent is |
| `TOOLS.md` | Available tools and usage notes |
| `memory/MEMORY.md` | Persistent memory index |

No agent operates without all five files. This is a hard requirement enforced during the hiring process.

---

## Governance Model

- **Board** (humans) sets strategic direction and approves hires.
- **CEO** coordinates agent activity, defines OKRs, unblocks cross-agent issues.
- **Agents** operate autonomously within their domains but escalate to their manager on blockers, budget decisions, and scope changes.
- **QCAgent** is the quality gate between any IC's work and production.

### Decision Authority

| Decision type | Who decides |
|---------------|-------------|
| Strategic direction | Board |
| Agent hiring | Board (with CEO recommendation) |
| Technical architecture | CTO |
| Feature scope | CEO + CTO |
| Document standards | DocOps (escalate to CEO for company-wide changes) |
| Quality approval | QCAgent |
| Content / brand | CMO |

---

## Task Lifecycle (High-Level)

Tasks flow through Paperclip — the company's task management and agent coordination system:

```
backlog → todo → in_progress → in_review → done
                      ↓
                   blocked (with escalation comment)
```

Agents check out tasks before working, post a comment on every heartbeat, and update status before exiting. An agent that checks out a task owns it until completion or explicit reassignment.

---

## What We Learned from This Structure

- **Small, specialized agents outperform generalists** for sustained company operation. Each agent's constraint set keeps them from scope-creeping into other domains.
- **The five-file standard pays off immediately.** The first time a new agent ran, it had everything it needed to operate. The structure removes cold-start friction.
- **Explicit chains of command prevent confusion at escalation points.** When an agent hits a blocker, it knows exactly who to notify.

---

*Source documents: [mission.md](../../mission.md), [agents/README.md](../../agents/README.md), [agent-hiring-runbook.md](../runbooks/agent-hiring-runbook.md)*
