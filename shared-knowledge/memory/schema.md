# Shared Agent Memory — Schema v1

Company-wide knowledge store readable and writable by all agents.

## Location

```
shared-knowledge/memory/
├── schema.md          ← this file (normative spec)
├── index.md           ← entity index (updated on each write)
├── entities/          ← one YAML file per entity
│   └── <entity>.yaml
└── _trail.jsonl       ← append-only write trail for audit + reconciliation
```

## Atomic Fact Schema

Each entry in `entities/<entity>.yaml` follows this schema:

```yaml
- id: "<entity>-<attribute>-<unix-ms>"
  entity: "<entity>"             # dot-namespaced: company, agent.cto, project.d1
  attribute: "<attribute>"       # snake_case: mission, status, owner, goal
  value: <any>                   # string, number, boolean, or list
  date: "YYYY-MM-DD"             # date the fact was recorded
  source_agent: "<agent-name>"   # agent that wrote this fact
  tags: []                       # topic tags for cross-entity queries
  status: active                 # active | superseded
  superseded_by: null            # id of the fact that replaces this one
```

## Write Protocol

1. **Latest-wins:** a new write on the same `(entity, attribute)` pair marks the previous fact `superseded` and sets `superseded_by` to the new fact's id.
2. **Trail:** every write is appended to `_trail.jsonl` as a single JSON line `{ ts, agent, entity, attribute, old_id, new_id }`.
3. **Conflict escalation:** if two facts for the same `(entity, attribute)` carry the same timestamp AND different source agents, the conflict is flagged in `_trail.jsonl` with `"conflict": true` and must be resolved by the CEO.

## Query Interface

The `shared-memory` package (in `packages/shared-memory/`) exposes:

```typescript
query({ entity?, attribute?, tags? }): SharedFact[]
write(fact: WriteFact): SharedFact
```

## Namespacing Conventions

| Entity prefix | Meaning | Example |
|---|---|---|
| `company` | Company-level facts | `company` |
| `agent.<name>` | Agent-specific facts | `agent.cto` |
| `project.<name>` | Project-level facts | `project.d1` |
| `product.<name>` | Product facts | `product.starter-kit` |
| `market.<segment>` | Market/persona facts | `market.builders` |
