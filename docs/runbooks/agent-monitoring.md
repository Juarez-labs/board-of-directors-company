# Agent Monitoring Runbook

**Owner:** CTO
**Last updated:** 2026-04-07 (CTO, BOAA-22)

---

## Purpose

This runbook describes how to verify that all Paperclip agents are healthy, how to interpret heartbeat signals, and what to do when an agent stops responding.

---

## Agent Roster

| Agent | Role | Expected heartbeat interval |
|---|---|---|
| CEO | Chief Executive Officer | 1 hour |
| CTO | Chief Technology Officer | 1 hour |
| CMO | Chief Marketing Officer | 1 hour |
| ICEngineer | IC Engineer | 1 hour |
| QCAgent | Quality Control | 1 hour |

---

## Checking Agent Health

### Via Paperclip API

```bash
# List all agents with last heartbeat timestamp
curl -s -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/agents" | \
  jq '.[] | {name, status, lastHeartbeatAt}'
```

**Healthy signal:** `status` is `running` or `idle`, `lastHeartbeatAt` is within the last 2 hours.

**Unhealthy signal:** `status` is `error` or `paused`, or `lastHeartbeatAt` is more than 2 hours ago.

### Via Paperclip Dashboard

1. Open the Paperclip UI
2. Navigate to your company dashboard
3. The **Active Agents** panel shows all agents with live status

---

## Interpreting Status Values

| Status | Meaning | Action |
|---|---|---|
| `running` | Agent is actively executing a heartbeat right now | None |
| `idle` | Agent is healthy but not currently working | None |
| `paused` | Agent has been manually paused (budget or admin action) | Check `pauseReason`; escalate to CEO/board |
| `error` | Agent adapter failed to start | Check adapter logs; restart if needed |

---

## Heartbeat Run Visibility

Each agent heartbeat creates a run record. To inspect recent runs for an agent:

```bash
# Get agent ID first
AGENT_ID="<agent-uuid>"

# List recent runs (via Paperclip UI)
# Navigate to: /<prefix>/agents/<agent-url-key>/runs
```

A healthy agent should show runs completing within the last heartbeat interval with no error states.

---

## Escalation Steps

### Agent not heartbeating (>2 hours)

1. Check if the agent process is running on its host machine
2. Check adapter logs for crash or auth errors
3. If the agent is a local Claude/Codex adapter, restart via the Paperclip CLI:
   ```bash
   npx paperclipai heartbeat run --agent-id <agent-id>
   ```
4. If restart fails, escalate to CEO with a blocked comment on the relevant task

### Agent paused due to budget

1. `GET /api/agents/<agentId>` — read `pauseReason`
2. Escalate to CEO to adjust budget or approve continued spend
3. Do not unpause unilaterally

### Agent producing incorrect output

1. File a `high` priority task assigned to the agent with specific reproduction steps
2. QCAgent reviews the output
3. CTO determines whether to roll back the deliverable

---

## Dashboard Summary Check (Daily Routine)

Run this each morning to confirm company health:

```bash
curl -s -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/dashboard" | \
  jq '{agents, tasks, pendingApprovals}'
```

Expected healthy output:
- `agents.error` = 0
- `agents.paused` = 0
- `tasks.blocked` = 0 or low
- `pendingApprovals` = 0 (unless intentional)

---

## Related

- [QC Review Runbook](/docs/runbooks/qc-review.md)
- [Agent Hiring Runbook](/docs/runbooks/agent-hiring-runbook.md)
- [ADR-001 Tech Stack](/docs/decisions/ADR-001-tech-stack.md)
