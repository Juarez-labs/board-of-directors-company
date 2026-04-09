import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import type { SharedFact, WriteFact, QueryOptions, TrailEntry } from './types';

const MEMORY_DIR = path.resolve(
  __dirname,
  '../../../shared-knowledge/memory'
);

function entityFile(entity: string): string {
  const safe = entity.replace(/[^a-zA-Z0-9._-]/g, '_');
  return path.join(MEMORY_DIR, 'entities', `${safe}.yaml`);
}

function trailFile(): string {
  return path.join(MEMORY_DIR, '_trail.jsonl');
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function makeId(entity: string, attribute: string): string {
  return `${entity.replace(/[^a-zA-Z0-9._-]/g, '_')}-${attribute}-${Date.now()}`;
}

function loadEntityFacts(entity: string): SharedFact[] {
  const file = entityFile(entity);
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, 'utf-8');
  return (yaml.load(raw) as SharedFact[]) ?? [];
}

function saveEntityFacts(entity: string, facts: SharedFact[]): void {
  const file = entityFile(entity);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, yaml.dump(facts, { lineWidth: 120 }), 'utf-8');
}

function appendTrail(entry: TrailEntry): void {
  fs.appendFileSync(trailFile(), JSON.stringify(entry) + '\n', 'utf-8');
}

function updateIndex(): void {
  const entitiesDir = path.join(MEMORY_DIR, 'entities');
  if (!fs.existsSync(entitiesDir)) return;

  const rows: string[] = [];
  for (const file of fs.readdirSync(entitiesDir).sort()) {
    if (!file.endsWith('.yaml')) continue;
    const entity = file.replace(/\.yaml$/, '');
    const facts = loadEntityFacts(entity);
    const active = facts.filter(f => f.status === 'active');
    const last = active.sort((a, b) => b.date.localeCompare(a.date))[0];
    if (last) {
      rows.push(`| ${entity} | entities/${file} | ${active.length} | ${last.date} | ${last.source_agent} |`);
    }
  }

  const header = [
    '# Shared Memory — Entity Index',
    '',
    'Auto-updated by the shared-memory write protocol. Lists all entities with active facts.',
    '',
    '| Entity | File | Active Facts | Last Written | Last Writer |',
    '|---|---|---|---|---|',
  ];
  const content = rows.length > 0 ? header.concat(rows) : header.concat(['| — | — | — | — | — |']);
  fs.writeFileSync(
    path.join(MEMORY_DIR, 'index.md'),
    content.join('\n') + '\n\n*This index is regenerated on each write. Do not edit manually.*\n',
    'utf-8'
  );
}

/** Write a fact to the shared store. Returns the new fact. */
export function write(input: WriteFact): SharedFact {
  const facts = loadEntityFacts(input.entity);

  const existing = facts.find(
    f => f.attribute === input.attribute && f.status === 'active'
  );

  const newId = makeId(input.entity, input.attribute);
  const now = todayISO();

  // Conflict detection: same timestamp, different agent
  let conflict = false;
  if (existing && existing.date === now && existing.source_agent !== input.source_agent) {
    conflict = true;
  }

  if (existing) {
    existing.status = 'superseded';
    existing.superseded_by = newId;
  }

  const newFact: SharedFact = {
    id: newId,
    entity: input.entity,
    attribute: input.attribute,
    value: input.value,
    date: now,
    source_agent: input.source_agent,
    tags: input.tags ?? [],
    status: 'active',
    superseded_by: null,
  };

  facts.push(newFact);
  saveEntityFacts(input.entity, facts);

  appendTrail({
    ts: new Date().toISOString(),
    agent: input.source_agent,
    entity: input.entity,
    attribute: input.attribute,
    old_id: existing?.id ?? null,
    new_id: newId,
    ...(conflict ? { conflict: true } : {}),
  });

  updateIndex();
  return newFact;
}

/** Query the shared store. Returns active facts by default. */
export function query(options: QueryOptions = {}): SharedFact[] {
  const entitiesDir = path.join(MEMORY_DIR, 'entities');
  if (!fs.existsSync(entitiesDir)) return [];

  let entityFiles: string[];
  if (options.entity) {
    const file = entityFile(options.entity);
    entityFiles = fs.existsSync(file) ? [path.basename(file)] : [];
  } else {
    entityFiles = fs.readdirSync(entitiesDir).filter(f => f.endsWith('.yaml'));
  }

  const results: SharedFact[] = [];
  for (const file of entityFiles) {
    const entity = file.replace(/\.yaml$/, '');
    let facts = loadEntityFacts(entity);

    if (!options.includeSuperseded) {
      facts = facts.filter(f => f.status === 'active');
    }
    if (options.attribute) {
      facts = facts.filter(f => f.attribute === options.attribute);
    }
    if (options.tags && options.tags.length > 0) {
      facts = facts.filter(f => options.tags!.some(t => f.tags.includes(t)));
    }
    results.push(...facts);
  }
  return results;
}
