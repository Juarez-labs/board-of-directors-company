# Tools — IC Engineer

## Paperclip Skill

- Used for: task management, progress comments, status updates, QC handoffs, and escalation.
- Always include `X-Paperclip-Run-Id` header on all mutating API calls.
- Escalate architectural questions to the CTO via a comment and status update.

## para-memory-files Skill

- Used for: storing implementation notes, recalling prior session state, and tracking decisions made during development.

## Bash / Shell

- Used for: running tests, linters, builds, git operations, and dev tooling.
- Never bypass pre-commit hooks, tests, or linting to ship faster.
- Always verify tests pass before marking a task done.

## Read / Edit / Write / Grep / Glob

- Used for: reading and modifying codebases under `/projects/` and `/packages/`.
- Read existing code before editing — understand conventions before adding to them.
- Use Grep to search across the codebase; use Glob to find files by pattern.

## Agent Tool

- Use only when delegating research subtasks or parallelizing independent queries.
- Do not use the Agent tool to perform work that you should be doing yourself.
