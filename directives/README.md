# Company Directives

## What Is a Company Directive?

A **Company Directive** is a focused, time-boxed strategic initiative that guides the company for a defined period (typically 60–120 days). It is the primary unit of intentional, board-approved strategy.

Directives differ from individual tasks or projects:

| | Task / Issue | Project | **Company Directive** |
|---|---|---|---|
| Scope | Single deliverable | Feature or workstream | Full strategic chapter |
| Duration | Hours–days | Days–weeks | 60–120 days |
| Owner | One agent | One team | CEO + Board |
| Approval | CEO / manager | CEO | **Board required** |
| Folder | Paperclip only | `projects/` | **`directives/active/`** |

The master execution plan (v3.0, 2026-04-08) was the first implicit directive. This system formalizes the pattern.

---

## Directory Layout

```
directives/
├── README.md                  ← this file (index + submission guide)
├── templates/
│   └── directive-template.md  ← copy this to start a new directive
├── active/
│   └── {directive-name}/      ← one folder per active directive
│       ├── directive.md       ← mission, success criteria, milestones, owners
│       ├── plan.md            ← detailed execution plan (may be a Paperclip doc)
│       └── log.md             ← running log of key decisions and outcomes
└── completed/
    └── {directive-name}/      ← archived after directive closes
```

---

## Active Directives

| Code | Name | Status | Paperclip Project | Owner |
|---|---|---|---|---|
| D1 | AI Agent Company Starter Kit | Active | [Directive D1](/BOAA/projects/directive-d1) | CEO |

---

## Completed Directives

| Code | Name | Dates | Outcome |
|---|---|---|---|
| *(implicit)* Master Execution Plan v1–v3 | Foundation → Playbook → Publication | 2026 | All 3 phases complete ✅ |

---

## How to Submit a Company Directive

### Step 1 — Draft the directive locally

Copy `templates/directive-template.md` into a new folder:

```
directives/active/{your-directive-name}/directive.md
```

Fill in all required fields (marked `[REQUIRED]`). Be specific about success criteria — vague directives don't get approved.

### Step 2 — Commit the draft to GitHub

```bash
cd ~/paperclip/"Board of Directors company"
git checkout -b directive/{your-directive-name}
git add directives/active/{your-directive-name}/
git commit -m "feat(directive): draft {your-directive-name} directive

Co-Authored-By: Paperclip <noreply@paperclip.ing>"
git push origin directive/{your-directive-name}
```

### Step 3 — Create a Paperclip task

Create a new task in Paperclip assigned to the CEO with:
- **Title:** `Company Directive Proposal: {Your Directive Name}`
- **Description:** Brief summary + link to the draft file in GitHub
- **Goal:** Assign to the most relevant company goal

### Step 4 — CEO reviews and consults the team

The CEO will:
1. Review the draft against current company goals
2. Commission agent-team perspectives (CTO, CMO, QCAgent at minimum)
3. Synthesize ≥3 options if multiple proposals are in flight
4. Present recommendations to the board

### Step 5 — Board approval

The board reviews the recommendations and approves one. The CEO then:
1. Moves the directive folder to `directives/active/` (if not already)
2. Creates a Paperclip project linked to the directive
3. Opens the execution plan and assigns milestone tasks
4. Updates the Active Directives table above

### Step 6 — Close-out

When a directive is complete:
1. Move folder from `directives/active/` to `directives/completed/`
2. Update the Completed Directives table above
3. QCAgent runs a final audit
4. DocOps adds the directive's key learnings to `docs/playbook/`

---

## Governance Rules

1. **Board approval is required** before any directive is considered active.
2. **One active directive at a time** (unless the board explicitly authorizes parallel directives).
3. **Every directive must have measurable success criteria.** "Improve X" is not a criterion. "Achieve X by date Y" is.
4. **CEO owns all directives** — they are accountable to the board for progress.
5. **Directive > individual task.** When a task conflicts with the active directive, the directive wins unless the board says otherwise.
6. **QCAgent gates directive close-out.** A directive is not complete until QCAgent formally signs off.
