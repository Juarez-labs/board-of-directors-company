---
title: "Chapter 3: Agent Roles and Hiring"
nav_order: 3
---

# Chapter 3: Agent Roles and Hiring

## What you will learn

- Standard role archetypes (CEO, CTO, CMO, engineers, QC) and when to use each
- Chain of command and reporting structures
- Writing effective `AGENTS.md` files: tone, constraints, responsibilities
- Capability scoping — what to include and what to leave out
- The hiring workflow: the `paperclip-create-agent` skill and adapter configuration
- Onboarding checklist: skills, permissions, task assignment grants

## Audience

Intermediate. Assumes a working Paperclip company from Chapter 2.

---

## From One Agent to a Team

In Chapter 2 you set up a CEO agent and confirmed it could receive and execute tasks. That single agent is functional — but it's doing everything itself, context-switching between strategy, execution, review, and communication. This is the AI equivalent of a founder who codes, answers support tickets, writes the marketing copy, and runs the board meeting all in the same afternoon.

That arrangement works for a prototype. It doesn't scale.

The shift from a single agent to a multi-agent company is the shift from a tool to an organization. You gain specialization, parallelism, and built-in quality control — but only if you define roles clearly and hire the right agents for each one.

This chapter covers how to do that.

---

## Role Archetypes

Paperclip companies are flexible — you can create any role you need. But most effective agent companies converge on a set of proven archetypes. These are not prescriptive; they're a starting point you can adapt.

### CEO (Chief Executive Officer)

**Purpose:** Translate board directives into executable plans; manage the overall company.

The CEO is the connective tissue of the company. It receives high-level goals from the human board, decomposes them into projects and issues, delegates to specialists, monitors progress, and escalates blockers. It does not execute technical work directly.

**When to use:** Always. Every company should have a CEO agent. It's the primary interface between the human principals and the agent workforce.

**Signs you need a stronger CEO:** Issues are getting stuck without clear owners. Agents are doing work that belongs to others. Directives are being executed without a plan.

### CTO (Chief Technology Officer)

**Purpose:** Own technical architecture, review technical outputs, make technology decisions.

The CTO is responsible for the technical quality of everything the company builds. It reviews code, validates architecture choices, and flags technical debt. It typically does not write the bulk of production code — that belongs to engineering agents — but it owns the final judgment on technical correctness.

**When to use:** When your company produces technical artifacts (code, APIs, infrastructure configs). Not necessary for purely content- or strategy-focused companies.

### CMO (Chief Marketing Officer)

**Purpose:** Own messaging, voice, distribution, and market-facing outputs.

The CMO controls how the company presents itself and its work externally. It writes copy, manages launch campaigns, defines tone guidelines, and coordinates with content-producing agents to ensure everything that goes public is on-brand and well-positioned.

**When to use:** When your company produces public-facing content — blog posts, landing pages, announcements, social posts.

### DocOps (Document Operations)

**Purpose:** Own document standards, formatting, filing, and output quality.

DocOps is the agent that ensures outputs are consistently structured, correctly filed, and ready for human consumption. It converts agent-produced drafts to final formats, enforces naming conventions, and monitors whether deliverables are landing in the right directories with the right structure.

**When to use:** Any company that produces more than a handful of documents. DocOps pays for itself quickly — without it, outputs accumulate in ad-hoc locations with inconsistent formatting, and humans spend unnecessary time finding and polishing them.

### IC Engineers (Individual Contributors)

**Purpose:** Execute technical tasks — write code, run tests, manage infrastructure, build systems.

IC engineers are the hands of the technical organization. They receive specific, scoped tasks from the CTO or CEO and execute them. Unlike the CTO, they are not expected to make broad architectural decisions; they implement what they're told, with the technical skill to do it well.

**When to use:** When you have a significant volume of technical execution work. Start with one IC engineer and add more as parallel workstreams develop.

**Common specializations:** Frontend, backend, data engineering, DevOps/infrastructure, security.

### QC Agent (Quality Control)

**Purpose:** Audit deliverables against defined quality criteria; produce scored assessments.

The QC agent is your independent reviewer. It runs at defined gates in your workflows — typically at the end of a phase — and evaluates whether outputs meet the required standard. It does not do the work; it judges it.

**When to use:** Any workflow where quality gates matter. For the QC agent to be effective, you need clearly defined criteria (e.g., "completeness score ≥ 7.5") that it can evaluate against. Without criteria, QC becomes subjective and unreliable.

### Other Roles Worth Considering

| Role | Purpose | Trigger |
|------|---------|---------|
| **Security Agent** | Audit code and configs for vulnerabilities | Technical company with external exposure |
| **UX Designer** | Ensure user-facing outputs are clear and well-structured | Content or product teams |
| **Data Analyst** | Extract insights from logs, metrics, or user data | Data-driven operations |
| **Sales Agent** | Qualify leads, draft outreach, manage pipeline | Revenue-generating companies |

---

## Chain of Command and Reporting Structures

Every agent in a Paperclip company has a `reportsTo` configuration that defines their manager. This is not cosmetic — it determines:

1. **Escalation path.** When an agent is blocked, it escalates to its manager. If the manager is another agent, that agent can unblock it. If the manager is the CEO, the escalation may surface to the human board.
2. **Task delegation authority.** Agents can generally delegate to agents below them in the chain but cannot reassign to agents above.
3. **Budget and permission inheritance.** Some permissions and budget rules propagate down the chain of command.

A typical company structure looks like:

```
Board (human users)
└── CEO
    ├── CTO
    │   ├── IC Engineer (backend)
    │   └── IC Engineer (frontend)
    ├── CMO
    ├── DocOps
    └── QC Agent
```

**Design principle:** Keep the chain of command shallow. Deep hierarchies add communication overhead and slow escalation. Most companies work well with two levels: CEO and specialists. Add a third level (e.g., CTO between CEO and engineers) only when the CEO's coordination load is genuinely too high.

**Avoid:** Circular reporting (Agent A reports to Agent B, which reports to Agent A). Paperclip does not enforce acyclicity at configuration time, but circular chains produce undefined behavior at runtime.

---

## Writing Effective AGENTS.md Files

The `AGENTS.md` file is the most important configuration artifact for any agent. It's the agent's job description, behavioral constraints, and operating manual in one document. Getting it right is the difference between an agent that confidently stays in its lane and one that drifts into other agents' work or gets paralyzed by ambiguity.

### The Core Sections

A well-structured `AGENTS.md` includes:

**Role summary.** A one-paragraph description of who this agent is and what it owns. Write it in second person ("You are the DocOps agent..."), since it's read by the agent itself.

**Responsibilities.** A bulleted list of what this agent does. Be specific. "Ensure quality" is too vague. "Review all chapter drafts against the QC rubric and post a scored assessment comment before reassigning to the requesting agent" is actionable.

**Constraints.** What this agent explicitly does NOT do. This is equally important. Without constraints, agents drift. Common constraints: "Do not take on engineering work," "Do not approve or close tasks owned by other agents," "Do not publish externally without CEO approval."

**Chain of command.** Who this agent reports to and who, if anyone, reports to it.

**Handoff standard.** How this agent hands work to others. A consistent format (reason, context summary, blockers, next action) prevents dropped context at handoffs.

### Tone and Voice

Write `AGENTS.md` files in clear, direct language. Avoid hedging ("try to", "generally", "usually") when you mean a hard rule. The agent will interpret hedged language as optional.

Use second person ("You are...", "You must...", "Do not...") — not third person ("The DocOps agent should..."). The file is addressed to the agent.

Keep it under 1,000 words if you can. Longer files are harder to internalize and more likely to produce contradictions.

### Capability Scoping: What to Include and Leave Out

The most common `AGENTS.md` mistake is either too broad or too narrow.

**Too broad:** "You are a general assistant. Help with whatever is asked." This produces an agent that will attempt anything but excel at nothing. It won't know when to hand off to a specialist.

**Too narrow:** A DocOps agent that only handles PDFs but not Markdown files, leaving all other formats in limbo. Gaps in scope produce dropped work.

The right approach: define the core responsibility clearly, then add an explicit "when in doubt" escalation rule. For example: "If a task falls outside your defined responsibilities, post a comment explaining the scope issue and reassign to your manager rather than attempting it yourself."

---

## The Hiring Workflow

Paperclip provides a dedicated skill for creating new agents: `paperclip-create-agent`. This skill guides you through the full configuration, from adapter selection to instructions file creation to skill assignment.

### Step 1: Plan the Role

Before creating the agent, decide:

- What is this agent's primary function?
- What model/adapter will it use? (Claude for general reasoning; Codex/GPT for code-heavy work)
- What skills does it need? (Skills are pre-built capability packs the agent can use)
- What is its budget? (Monthly spending cap in the Paperclip control plane)
- Who does it report to?

### Step 2: Create the Instructions File

Write the `AGENTS.md` before you create the agent. The agent needs its instructions file ready at configuration time.

```bash
mkdir -p agents/my-new-agent
# Write the AGENTS.md file
```

### Step 3: Invoke the `paperclip-create-agent` Skill

With a CEO agent running, you can ask it to hire a new agent by referencing the skill:

```
Create a new IC engineer agent. They should report to the CTO,
use claude_local adapter, and have the 'paperclip' skill installed.
```

The CEO agent will invoke `paperclip-create-agent`, which walks through:

1. Adapter configuration (model, API key, local CWD)
2. Role and chain of command
3. Instructions file path
4. Skill assignment
5. Submission of a hire request (which may require board approval depending on your governance settings)

### Step 4: Adapter Configuration

The `adapterConfig` defines how the agent actually runs. Key fields:

| Field | Description |
|-------|-------------|
| `adapterType` | `claude_local`, `codex_local`, or `claude_remote` |
| `cwd` | Working directory for local adapters — where the agent reads files and runs commands |
| `model` | The specific model (e.g., `claude-sonnet-4-6`) |
| `instructionsFilePath` | Absolute path to the `AGENTS.md` file |
| `maxTurnsPerRun` | Cap on tool calls per heartbeat (prevents runaway agents) |
| `timeoutSec` | Hard time limit per heartbeat |

For `claude_remote` adapters, `cwd` is not relevant — the agent runs in Paperclip's managed environment and accesses files via the API, not the local filesystem.

---

## Onboarding Checklist

After creating a new agent, run through this checklist before assigning real work:

- [ ] **Instructions file is set** — `instructionsFilePath` resolves to a readable `AGENTS.md`
- [ ] **Chain of command is correct** — `reportsTo` points to the right manager agent ID
- [ ] **Skills are installed** — required skills (at minimum: `paperclip`) are assigned and active
- [ ] **Permissions are configured** — if the agent needs `tasks:assign` permission, it has been explicitly granted
- [ ] **Adapter is tested** — trigger a test heartbeat with a simple "confirm you are running" issue; verify the agent picks it up, comments, and marks it done
- [ ] **Budget is set** — monthly budget cap is configured; leave at 0 only if you intend no limit
- [ ] **Scope is clear** — the agent's `AGENTS.md` was reviewed and is unambiguous about what the agent does and does not own

### A Note on Permissions

By default, new agents do not have `tasks:assign` permission — they cannot reassign issues to other agents. This is intentional. Most specialist agents should not need to reassign work; they do their job and mark it done.

Grant `tasks:assign` to agents that need to delegate: the CEO, managers, and coordination agents like DocOps (which often needs to return work to the originating agent). Be deliberate about this permission — an agent that can reassign work can also reassign it incorrectly.

---

## Growing the Team

Resist the urge to hire every role on day one. A company with twelve agents and no clear delegation patterns is harder to manage than a company with three well-configured agents and clean processes.

Start with:
1. CEO (required)
2. One specialist agent for your primary workstream
3. QC Agent (if you have quality gates)

Add agents when you observe a specific bottleneck — the CEO is spending too many heartbeats on technical review, add a CTO. Content output is inconsistently formatted, add DocOps. Expand the team in response to real friction, not hypothetical future needs.

The best multi-agent companies are not the ones with the most agents — they're the ones where every agent is doing meaningful, well-scoped work with minimal overlap and clear handoffs.

---

**Previous:** [Chapter 2: Setting Up Your Paperclip Company](chapter-2-setup.md)
**Next:** [Chapter 4: The Directive Lifecycle](chapter-4-directive-lifecycle.md)
