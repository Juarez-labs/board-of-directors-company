# gitdigest metrics

Lightweight, additive telemetry for the gitdigest skill. Implements R7 from
[BOAA-226](/BOAA/issues/BOAA-226) (parent) and [BOAA-233](/BOAA/issues/BOAA-233)
(this workstream). The core `run-digest.js` runner is intentionally unchanged —
metrics are collected by piping its JSON output through `log-tokens.js`.

## Files

- `log-tokens.cjs` — append-only JSONL logger; passes input through unchanged
  so it stays pipeline-composable.
- `report-tokens.cjs` — aggregator that prints totals, by-day breakdown, and
  top-N largest runs. Supports `--since` filtering and `--format json`.

The `.cjs` extension is intentional: a parent `package.json` higher in the
tree declares `"type": "module"`, so CommonJS files need the explicit
extension to use `require()`.

## Log location

Default: `~/.paperclip/instances/default/telemetry/gitdigest-tokens.jsonl`

Override with `GITDIGEST_TOKEN_LOG`.

## Record shape

```json
{
  "ts": "2026-04-21T14:40:00.000Z",
  "taskId": "BOAA-233",
  "runId": "9ef214a7-2d67-4354-bdf5-5de3bf1f48e2",
  "agent": "icengineer",
  "tokensUsed": 312,
  "chunks": 1,
  "warn": false
}
```

`taskId`, `runId`, and `agent` are populated from `PAPERCLIP_TASK_ID`,
`PAPERCLIP_RUN_ID`, and `PAPERCLIP_AGENT_NAME` when present.

## Usage

### Log a run

```bash
git diff HEAD~1 HEAD \
  | node skills/gitdigest/run-digest.js \
  | node skills/gitdigest/metrics/log-tokens.cjs
```

`log-tokens.cjs` echoes the digest JSON on stdout so you can keep using the
result downstream — the logger is transparent.

### Inspect usage

```bash
node skills/gitdigest/metrics/report-tokens.cjs
node skills/gitdigest/metrics/report-tokens.cjs --since 7d
node skills/gitdigest/metrics/report-tokens.cjs --since 2026-04-01 --format json
node skills/gitdigest/metrics/report-tokens.cjs --top 10
```

## Alerting

`log-tokens.cjs` emits a single stderr line when a run's `tokensUsed` exceeds a
threshold:

```
[gitdigest-metrics] ALERT: single run used 99999 tokens (threshold 50000). taskId=BOAA-...
```

Default threshold: `50000`. Override with `GITDIGEST_TOKEN_ALERT`.

For reference: the full 10-repo analysis in
[BOAA-214](/BOAA/issues/BOAA-214) used ~119K tokens across 10 runs (~12K
average). A single run above 50K is therefore a meaningful outlier that
warrants a quick look.

## Not in scope (intentional)

- No external metrics store (Prometheus/Datadog). JSONL is sufficient at the
  current run volume.
- No dashboard. The `report-tokens.js` output is meant to be pasted into a
  weekly metrics issue if/when one is created.
- No modifications to `run-digest.js` or `DigestService` — the wrapper keeps
  R7 fully reversible and avoids regression risk on the skill itself.

## Follow-up suggestions

- Schedule a weekly routine that runs `report-tokens.js --since 7d` and posts
  the output to a dedicated `gitdigest-cost` metrics issue.
- Revisit the alert threshold after ~1 month of data and tune to the observed
  p95 of real runs.
