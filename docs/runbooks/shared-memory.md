# Shared Agent Memory — Runbook

**Status:** Live (WS2-T1–T6 complete)
**Owner:** CTO
**Package:** `packages/shared-memory/`
**Data:** `shared-knowledge/memory/`

---

## What It Is

A company-wide atomic-fact store that all agents can read and write. Replaces per-agent
memory silos for company-scoped knowledge. Backed by YAML files + an append-only JSONL
trail.

---

## Directory Structure

```
shared-knowledge/memory/
├── schema.md          # normative schema (entity, attribute, value, source_agent, tags)
├── index.md           # auto-updated entity index (entity → file → active facts)
├── entities/          # one YAML file per entity namespace
│   ├── company.yaml
│   └── project.d1.yaml
└── _trail.jsonl       # append-only write trail (audit + conflict detection)
```

---

## API (TypeScript)

```typescript
import { write, query } from '<company-root>/packages/shared-memory/src';

// Write a fact
write({
  entity: 'company',            // dot-namespaced: company | agent.cto | project.d1
  attribute: 'mission',
  value: 'Ship products using only AI agents.',
  source_agent: 'agent.cto',
  tags: ['company', 'strategy'],
});

// Read by entity
const facts = query({ entity: 'company' });

// Read by attribute
const mission = query({ entity: 'company', attribute: 'mission' });

// Read by tag
const strategy = query({ tags: ['strategy'] });

// Include superseded history
const all = query({ entity: 'company', includeSuperseded: true });
```

---

## Write Protocol (WS2-T4)

1. **Latest-wins:** a new write on the same `(entity, attribute)` marks the previous
   fact `status: superseded` and sets `superseded_by` on the old fact.
2. **Trail:** every write appends a JSON line to `_trail.jsonl`:
   `{ ts, agent, entity, attribute, old_id, new_id, conflict? }`
3. **Conflict escalation:** if two facts carry the same `(entity, attribute, date)`
   from different agents, the trail line gets `"conflict": true` — escalate to CEO.

---

## Entity Namespacing

| Prefix | Scope | Example |
|---|---|---|
| `company` | Company-level | `company` |
| `agent.<name>` | Agent-specific shared facts | `agent.cto` |
| `project.<name>` | Project facts | `project.d1` |
| `product.<name>` | Product facts | `product.starter-kit` |
| `market.<seg>` | Market/persona facts | `market.builders` |

---

## Integration with para-memory-files

When using the `para-memory-files` skill, **check shared memory first** for company-
scoped entities, then fall back to your private PARA store.

```typescript
// Pattern: shared-first recall
const shared = query({ entity: 'company', attribute: 'mission' });
if (shared.length === 0) {
  // fall back to private PARA
}
```

Store company-scoped decisions in shared memory; keep agent-private context in PARA.

---

## PoC Validation (WS2-T6)

Run the validation suite:

```bash
cd packages/shared-memory
npx ts-node tests/poc.ts
```

Expected: `14 passed, 0 failed` — two simulated agents (agent.cto + agent.ceo) writing
and reading facts, latest-wins supersession verified.
