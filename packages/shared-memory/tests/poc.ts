/**
 * WS2-T6 PoC Validation
 * Simulates 2 agents (agent.cto and agent.ceo) reading/writing the shared store.
 * Asserts: no errors, both writes persist, query returns correct facts.
 */
import { write, query } from '../src';

let passed = 0;
let failed = 0;

function assert(label: string, condition: boolean): void {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}`);
    failed++;
  }
}

console.log('\n=== Shared Memory PoC — WS2-T6 ===\n');

// --- Agent 1: cto writes company mission ---
console.log('[agent.cto] Writing company mission...');
const f1 = write({
  entity: 'company',
  attribute: 'mission',
  value: 'Build and operate software products using only AI agents.',
  source_agent: 'agent.cto',
  tags: ['company', 'strategy'],
});
assert('Write returns a fact with status=active', f1.status === 'active');
assert('Write records correct entity', f1.entity === 'company');
assert('Write records correct source_agent', f1.source_agent === 'agent.cto');

// --- Agent 2: ceo writes company status ---
console.log('\n[agent.ceo] Writing company status...');
const f2 = write({
  entity: 'company',
  attribute: 'status',
  value: 'active — directive D1 in progress',
  source_agent: 'agent.ceo',
  tags: ['company', 'status'],
});
assert('Write returns a fact with status=active', f2.status === 'active');
assert('Write records correct source_agent', f2.source_agent === 'agent.ceo');

// --- Agent 1: cto reads all company facts ---
console.log('\n[agent.cto] Querying all company facts...');
const companyFacts = query({ entity: 'company' });
assert('Query returns at least 2 facts', companyFacts.length >= 2);
assert('Mission fact is present', companyFacts.some(f => f.attribute === 'mission'));
assert('Status fact is present', companyFacts.some(f => f.attribute === 'status'));

// --- Agent 2: ceo writes project.d1 owner ---
console.log('\n[agent.ceo] Writing project.d1 owner...');
const f3 = write({
  entity: 'project.d1',
  attribute: 'owner',
  value: 'CEO',
  source_agent: 'agent.ceo',
  tags: ['project', 'd1'],
});
assert('project.d1 fact written', f3.entity === 'project.d1');

// --- Agent 1: cto reads by tag ---
console.log('\n[agent.cto] Querying facts by tag "strategy"...');
const stratFacts = query({ tags: ['strategy'] });
assert('Tag query returns mission fact', stratFacts.some(f => f.attribute === 'mission'));

// --- Latest-wins: cto overwrites mission ---
console.log('\n[agent.cto] Updating company mission (latest-wins test)...');
const f4 = write({
  entity: 'company',
  attribute: 'mission',
  value: 'Ship real products using only AI agents — fast, rigorous, and open-source.',
  source_agent: 'agent.cto',
  tags: ['company', 'strategy'],
});
assert('New mission fact is active', f4.status === 'active');

const allMission = query({ entity: 'company', attribute: 'mission', includeSuperseded: true });
const activeMission = allMission.filter(f => f.status === 'active');
const supersededMission = allMission.filter(f => f.status === 'superseded');
assert('Only 1 active mission fact', activeMission.length === 1);
assert('Old mission fact is superseded', supersededMission.length === 1);
assert('Superseded fact points to new id', supersededMission[0]?.superseded_by === f4.id);

// --- Results ---
console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);
if (failed > 0) {
  process.exit(1);
}
