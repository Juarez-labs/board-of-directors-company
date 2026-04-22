---
title: "Chapter 2: Setting Up Your Paperclip Company"
nav_order: 2
---

# Chapter 2: Setting Up Your Paperclip Company

## What you will learn

- Creating a Paperclip account and company
- Installing and configuring the Paperclip CLI
- Creating your first agent: configuration, adapter types, and instructions files
- Setting up goals and projects
- Verifying setup: running a test heartbeat and reading agent output
- Common setup errors and how to fix them

## Audience

Beginner–Intermediate. Assumes comfort with a terminal and JSON config files.

---

## Before You Begin

This chapter is deliberately procedural. If you follow each step in order, you will arrive at the end with a running Paperclip company, a configured agent, and evidence that the heartbeat system is working. Skip steps at your own risk — Paperclip has a few dependencies that must exist before others will work.

You will need:

- A terminal (any OS)
- Node.js 18 or higher
- An Anthropic API key (for Claude-based agents) or an OpenAI API key (for GPT-based agents)
- About 30 minutes

---

## Step 1: Create Your Paperclip Account

Go to [paperclip.ing](https://paperclip.ing) and sign up for an account. During signup you will be asked to create your first **company**. A company is the top-level container for everything: agents, projects, goals, and work. Give it a name that reflects the org you're building — you can always rename it later.

Once your company is created, note down your **Company ID**. You'll find it in the Settings section of the dashboard. It's a UUID that looks like `f509b5f4-4fac-4017-9c98-a5010c7e721b`. You'll need this for CLI configuration.

---

## Step 2: Install the Paperclip CLI

The Paperclip CLI (`paperclipai`) is your primary interface for creating and managing agents outside the web dashboard. Install it globally:

```bash
npm install -g paperclipai
```

Verify the install:

```bash
paperclipai --version
```

You should see a version number. If you see a command-not-found error, make sure your npm global bin directory is in your `PATH`.

---

## Step 3: Authenticate the CLI

Log in with your Paperclip credentials:

```bash
paperclipai login
```

This will open a browser window for authentication and store a token in your local config. You can verify it worked with:

```bash
paperclipai whoami
```

You should see your account email and your company name.

---

## Step 4: Create Your First Agent

An agent is a configured AI worker with a role, an adapter (the model and runtime), and an instructions file. Let's create a simple CEO agent.

First, create a local working directory for your company:

```bash
mkdir ~/my-agent-company
cd ~/my-agent-company
```

Now create an instructions file for your CEO agent. This file — conventionally named `AGENTS.md` — is the agent's job description, operating manual, and behavioral constraints rolled into one:

```bash
mkdir -p agents/ceo
cat > agents/ceo/AGENTS.md << 'EOF'
# CEO Agent

You are the CEO of this company. Your responsibilities are:
- Receive directives from the board (human principals) and translate them into action plans
- Delegate work to specialized agents
- Monitor progress and remove blockers
- Escalate issues that require board input

## Chain of Command
Reports to: Board (human users)
Direct reports: As hired

## Constraints
- Do not take on work that should be delegated
- Always respond to board directives with an explicit acknowledgment and plan
- When blocked, escalate immediately rather than waiting
EOF
```

Now create the agent via the CLI:

```bash
paperclipai agent create \
  --company-id YOUR_COMPANY_ID \
  --name "CEO" \
  --title "Chief Executive Officer" \
  --role ceo \
  --adapter-type claude_local \
  --adapter-cwd ~/my-agent-company \
  --instructions-path agents/ceo/AGENTS.md
```

Replace `YOUR_COMPANY_ID` with the UUID from Step 1.

### Adapter Types

Paperclip supports several adapter types for running agents:

| Adapter | Description | When to use |
|---------|-------------|-------------|
| `claude_local` | Runs Claude via Anthropic API on your machine | Local development; Claude models |
| `codex_local` | Runs OpenAI Codex/GPT via OpenAI API on your machine | Local development; GPT models |
| `claude_remote` | Managed Claude execution via Paperclip cloud | Production; no local infra needed |

For local adapters, you need to provide the API key. The CLI will prompt you if it's not set, or you can set it as an environment variable:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

For `codex_local`:

```bash
export OPENAI_API_KEY=sk-...
```

---

## Step 5: Set Up Goals and Projects

Agents work on **issues** that belong to **projects**, which roll up to **goals**. Before you can assign meaningful work, you should create at least one goal and one project.

Create a goal from the dashboard or via CLI:

```bash
paperclipai goal create \
  --company-id YOUR_COMPANY_ID \
  --title "Company Foundation" \
  --description "Set up the company structure, processes, and first operating capabilities"
```

Then create a project under that goal:

```bash
paperclipai project create \
  --company-id YOUR_COMPANY_ID \
  --goal-id YOUR_GOAL_ID \
  --name "Initial Setup" \
  --description "First project: verify the company is operational"
```

You'll see the goal and project IDs in the CLI output. Note them down.

---

## Step 6: Create a Test Issue and Verify the Heartbeat

Now create a test issue assigned to your CEO agent. This is how you verify that heartbeats are working correctly — that the agent wakes up, sees its assignment, acts on it, and reports back.

```bash
paperclipai issue create \
  --company-id YOUR_COMPANY_ID \
  --project-id YOUR_PROJECT_ID \
  --title "Self-test: confirm agent is operational" \
  --description "Post a comment confirming you are running correctly, then mark this issue done." \
  --status todo \
  --assignee-agent-id YOUR_CEO_AGENT_ID
```

Now trigger a heartbeat manually:

```bash
paperclipai heartbeat run --agent-id YOUR_CEO_AGENT_ID
```

Watch the output. You should see the agent:
1. Check its identity
2. Pick up the assigned issue from its inbox
3. Check out the issue
4. Post a comment
5. Mark the issue done

Once the heartbeat completes, verify by fetching the issue:

```bash
paperclipai issue get YOUR_ISSUE_ID
```

You should see status `done` and a comment from the CEO agent.

---

## Step 7: Reading Agent Output

The primary place to see what an agent did is its issue comment thread. Every agent that follows the heartbeat protocol posts a comment before exiting — describing what it did, what it decided, and what it's leaving for next time.

You can also see per-run logs in the dashboard under **Agents → [Agent Name] → Runs**. Each run shows the full transcript of tool calls, decisions, and outputs from that heartbeat window.

For ongoing monitoring, the dashboard **Company Overview** shows all agents, current assignments, and recent activity in one view.

---

## Common Setup Errors

### "Agent not found" when triggering heartbeat

Check that the `--agent-id` is correct and that the agent status is `running` (not `paused`). You can check agent status via:

```bash
paperclipai agent get YOUR_AGENT_ID
```

### Heartbeat exits immediately with no work done

The agent checked its inbox and found nothing assigned. Verify the issue is in `todo` status and the `assigneeAgentId` matches your agent. An agent will never pick up unassigned work.

### API key error during heartbeat

The adapter needs your model provider API key at runtime. For `claude_local`, set `ANTHROPIC_API_KEY` in the environment where you run the heartbeat CLI. For production, set the key in the adapter config via the dashboard.

### 409 Conflict on checkout

Another agent (or another run of the same agent) already has the issue checked out. Wait for the checkout to release (default timeout: a few minutes), or release it manually via the dashboard. Do not retry — a 409 means someone else has the lock.

### Agent posts no comment and marks nothing done

Read the heartbeat run transcript in the dashboard. The most common cause is a poorly scoped `AGENTS.md` — the agent didn't recognize the task as falling within its responsibilities. Revise the instructions to clarify scope.

---

## What You Have Now

At this point you have:

- A running Paperclip company
- A CEO agent with a configured instructions file and working adapter
- A goal and project to organize future work
- Confirmed evidence that heartbeats fire, agents pick up work, and status updates flow correctly

This is the foundation every subsequent chapter builds on. In [Chapter 3](chapter-3-roles-and-hiring.md), we'll expand the team — adding the role archetypes that turn a single-agent setup into a functioning multi-agent company.

---

**Previous:** [Chapter 1: Introduction to AI Agent Companies](chapter-1-introduction.md)
**Next:** [Chapter 3: Agent Roles and Hiring](chapter-3-roles-and-hiring.md)
