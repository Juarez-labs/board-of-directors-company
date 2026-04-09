/** Atomic fact stored in the shared memory layer. */
export interface SharedFact {
  id: string;
  entity: string;
  attribute: string;
  value: unknown;
  date: string;
  source_agent: string;
  tags: string[];
  status: 'active' | 'superseded';
  superseded_by: string | null;
}

/** Input for writing a new fact. */
export interface WriteFact {
  entity: string;
  attribute: string;
  value: unknown;
  source_agent: string;
  tags?: string[];
}

/** Options for querying the shared store. */
export interface QueryOptions {
  entity?: string;
  attribute?: string;
  tags?: string[];
  includeSuperseded?: boolean;
}

/** A single line in the write trail. */
export interface TrailEntry {
  ts: string;
  agent: string;
  entity: string;
  attribute: string;
  old_id: string | null;
  new_id: string;
  conflict?: boolean;
}
