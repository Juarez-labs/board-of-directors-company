# Token Usage Tracking — Decision Document

**Status:** Implemented
**Date:** 2026-04-17
**Author:** CTO
**Task:** [BOAA-200](/BOAA/issues/BOAA-200) (Gate 0.4)
**Parent:** [BOAA-196](/BOAA/issues/BOAA-196) (Phase 0 pre-implementation gates)

---

## Problem

Paperclip's billing dashboard shows **$0 spent** for Claude Max plan subscribers. The Max plan is a flat subscription — Anthropic does not expose per-token API billing data for it. This means there is no native way to track actual token consumption across agents from Paperclip's dashboard alone.

We need a way to answer:
- How many tokens are our agents consuming?
- Which models are being used?
- Is consumption trending up?
- What would this cost at API rates (as a budget proxy)?

---

## Solution: `ccusage`

**Tool:** [`ccusage`](https://github.com/ryoppippi/ccusage) (already installed via `npx`)

Claude Code automatically writes every conversation to JSONL files at:
```
~/.claude/projects/<project-slug>/<session-id>.jsonl
```

Each entry includes `inputTokens`, `outputTokens`, `cacheCreationTokens`, `cacheReadTokens`, and `costUSD` (estimated API-equivalent cost). `ccusage` reads these files and aggregates them into usage reports.

### Why this solution

| Criterion | Assessment |
|-----------|-----------|
| Works with Claude Max plan | **Yes** — reads local JSONL files, no API key billing required |
| Covers BOAA + Aurion agents | **Yes** — all agents run on the same host (`jarvis2048`) |
| Lightweight | **Yes** — read-only CLI, no infrastructure changes |
| Already installed | **Yes** — available as `npx ccusage` |
| Per-model breakdown | **Yes** — Opus, Sonnet, Haiku all reported separately |
| Per-session/date views | **Yes** — daily, weekly, monthly, session views available |

### What it cannot do

- **Per-agent attribution**: All agents share `~/.claude/` on the host. `ccusage` does not tag entries by Paperclip agent identity. Per-project breakdowns are possible (see below), but per-agent is not without custom instrumentation.
- **Real cost reporting**: Costs shown are **API-equivalent estimates** — what these tokens would cost at standard Claude API rates. The actual spend is the flat Max subscription.
- **Cross-machine aggregation**: If multiple hosts run agents, each host must be queried separately.

---

## Usage

### Quick monthly report

```bash
npx ccusage monthly
```

### With model breakdown

```bash
npx ccusage monthly --breakdown
```

### Date-filtered (e.g., this week)

```bash
npx ccusage daily --since 20260411
```

### JSON output (for scripting)

```bash
npx ccusage monthly --json
```

### Per-project filtering

Claude Code organizes logs by working directory. To see usage for a specific project:

| Project | Log directory |
|---------|--------------|
| BOAA (company root) | `~/.claude/projects/-home-jarvis2048-paperclip-Board-of-Directors-company/` |
| Aurion Group | `~/.claude/projects/-home-jarvis2048-paperclip-Board-of-Directors-company-projects-aurion-group/` |

To get per-project totals, parse the JSONL files directly:

```bash
# Example: Aurion Group token total
python3 -c "
import json, glob, os

project_dir = os.path.expanduser(
    '~/.claude/projects/-home-jarvis2048-paperclip-Board-of-Directors-company-projects-aurion-group/'
)
total_input, total_output, total_cache_create, total_cache_read = 0, 0, 0, 0
for f in glob.glob(project_dir + '*.jsonl'):
    with open(f) as fh:
        for line in fh:
            try:
                entry = json.loads(line)
                usage = entry.get('usage', {})
                total_input += usage.get('input_tokens', 0)
                total_output += usage.get('output_tokens', 0)
                total_cache_create += usage.get('cache_creation_input_tokens', 0)
                total_cache_read += usage.get('cache_read_input_tokens', 0)
            except:
                pass
print(f'Input: {total_input:,}')
print(f'Output: {total_output:,}')
print(f'Cache creation: {total_cache_create:,}')
print(f'Cache read: {total_cache_read:,}')
"
```

---

## Current Baseline (as of 2026-04-17)

Aggregate across all projects on `jarvis2048`:

| Month | Total Tokens | API-Equiv Cost |
|-------|-------------|----------------|
| 2026-03 | 485,730,268 | ~$261 |
| 2026-04 (to date) | 3,181,014,850 | ~$1,955 |

April's spike reflects the growth of the agent fleet (more agents, more heartbeats, growing context windows from cache).

**Top models used (April 2026):**
- `claude-sonnet-4-6` — primary workhorse
- `claude-opus-4-6` — used for planning/architecture
- `claude-haiku-4-5-20251001` — lightweight tasks

---

## Board Actions Required

1. **Periodic review**: Run `npx ccusage monthly` at least monthly to monitor trends.
2. **Aurion Group baseline**: As Aurion Group agents spin up, track their project directory separately to establish a per-project baseline.
3. **Alert threshold (recommended)**: If API-equivalent cost exceeds $500/week, review agent heartbeat frequency and context sizes.
4. **Status line integration (optional)**: `ccusage statusline` can display live token usage in the Claude Code status bar. Enable via Claude Code hooks if desired:
   ```json
   // ~/.claude/settings.json — add to hooks
   {
     "PostToolUse": [{
       "matcher": "",
       "hooks": [{
         "type": "command",
         "command": "npx ccusage statusline"
       }]
     }]
   }
   ```

---

## Alternatives Considered

| Option | Rejected Because |
|--------|-----------------|
| Anthropic Console billing | Not available for Claude Max plan |
| Custom Paperclip plugin | Over-engineered for current scale |
| Manual JSONL parsing only | `ccusage` already does this cleanly |
| OpenTelemetry / Prometheus | Heavyweight, requires infrastructure changes |

---

## Summary

**Decision: Use `ccusage` as the standard token usage tracking tool.**

- Zero new infrastructure required
- Already works on `jarvis2048`
- Covers all Claude Code agents regardless of Paperclip plan type
- Board reviews monthly via `npx ccusage monthly --breakdown`
- Per-project breakdown possible via direct JSONL directory inspection
