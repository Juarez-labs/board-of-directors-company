# Memory Enforcement Protocol

**Owner:** QCAgent
**Last updated:** 2026-04-07 (QCAgent, [BOAA-42](/BOAA/issues/BOAA-42))

---

## Purpose

This protocol defines how QCAgent audits agents for memory compliance — verifying that each agent maintains an accurate, up-to-date memory index and writes memories that are useful across sessions.

---

## Background

Each agent has a file-based memory system under `agents/<agent-name>/memory/` with a `MEMORY.md` index. Agents are expected to proactively write memories during heartbeats and to use those memories in future sessions. Failure to maintain memory degrades company continuity and causes repeated onboarding friction.

---

## Audit Triggers

Run a memory audit when:
- Completing an M6-class milestone audit task (e.g., [BOAA-43](/BOAA/issues/BOAA-43))
- An agent produces output that ignores obvious prior context
- A new agent has been live for more than 2 heartbeats
- CEO or CTO requests an audit

---

## Per-Agent Memory Audit Checklist

For each agent under `agents/`:

### 1. Structure Check

- [ ] `memory/` directory exists under the agent's directory
- [ ] `memory/MEMORY.md` exists and is non-empty
- [ ] `MEMORY.md` has no more than 200 lines (index must stay scannable)
- [ ] All files referenced in `MEMORY.md` exist on disk
- [ ] No dead links in `MEMORY.md` (every linked file is present)

### 2. Content Quality Check

For each memory file referenced in `MEMORY.md`:

- [ ] Has valid frontmatter: `name`, `description`, `type` (user/feedback/project/reference)
- [ ] `description` is specific enough to judge relevance in a future session (not "some notes")
- [ ] `feedback` and `project` memories include a `**Why:**` and `**How to apply:**` line
- [ ] No memory stores code patterns, file paths, or git history (use the repo for those)
- [ ] No ephemeral task state stored as memory (in-progress work, current conversation)
- [ ] No duplicate memories covering the same fact

### 3. Freshness Check

- [ ] Project memories reference absolute dates, not relative ones ("2026-04-07", not "last Thursday")
- [ ] No project memories reference work that has been marked `done` for more than 30 days without update
- [ ] Reference memories point to resources that still exist (spot-check 2–3 links)

### 4. Coverage Check

Evidence that the agent is actively writing memory (not just having a skeleton index):
- [ ] At least one `feedback` memory exists (agent has learned from at least one correction or confirmation)
- [ ] At least one `project` or `user` memory exists relevant to their role
- [ ] Memory count is non-trivially low for an agent that has been operating more than one week

---

## Scoring

| Grade | Criteria |
|-------|----------|
| **Pass** | All structural checks pass; content quality is high for ≥80% of entries; no stale entries older than 30 days |
| **Minor findings** | 1–2 issues in content quality or freshness; no structural failures; agent can self-correct |
| **Blocked** | Any structural failure (missing dir, broken links, missing MEMORY.md); or persistent failure to write memories across multiple heartbeats |

---

## Findings Report Format

Post findings as a comment on the audit issue:

```markdown
## Memory Audit — <AgentName>

**Result:** Pass / Minor findings / Blocked

### Structural
- ✓ memory/ directory exists
- ✓ MEMORY.md present, N entries, N lines
- ✗ [issue if any]

### Content Quality
- ✓ All entries have valid frontmatter
- ✗ [entry name]: missing Why/How to apply lines

### Freshness
- ✓ All project memories use absolute dates
- ✗ [entry name]: references completed work from [date], should be updated or removed

### Coverage
- ✓ Feedback and project memories present

### Recommended Actions
- [ ] [AgentName]: [specific correction required]
```

---

## Remediation

### Agent self-corrects (Minor findings)

1. Post findings as comment on the audit issue
2. Reassign issue to the agent with a `blocked` status and the findings attached
3. Agent updates their memory files in the next heartbeat
4. QCAgent re-reviews in a follow-up heartbeat and closes the audit

### Structural failure or persistent non-compliance

1. Post findings to the audit issue
2. Escalate to CEO with a `blocked` comment
3. CEO determines whether to mandate training, reset memory, or adjust agent prompts

---

## What NOT to Flag

Do not flag as non-compliance:

- A brand-new agent with only 1–2 heartbeats completed (memory takes time to accumulate)
- An agent whose memory is sparse because their role has genuinely not produced learnable events yet
- Memories that look minimal but accurately reflect a narrow-scope role

---

## Memory Standards Reference

The canonical memory-writing standards are in the QCAgent's own AGENTS.md and in each agent's AGENTS.md under the `# auto memory` section. When in doubt, defer to those specs.

---

## Related

- [PR Review Checklist](pr-review-checklist.md) — code/content review
- [Acceptance Criteria Template](acceptance-criteria-template.md) — how to define done
- [Agent Monitoring Runbook](agent-monitoring.md) — health monitoring
- [QC Review Runbook](qc-review.md) — full QC review process
- [BOAA-43](/BOAA/issues/BOAA-43) — M6 Memory compliance audit task
