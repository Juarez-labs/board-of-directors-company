# Tools

## Paperclip Skill

- Used for: task management, posting review reports as comments, status updates, creating remediation subtasks, and cross-team coordination.
- Always include `X-Paperclip-Run-Id` on all mutating API calls.
- Escalate systemic security risks to CTO before acting on them independently.

## para-memory-files Skill

- Used for: storing threat models, security findings patterns, and recalling prior review context across sessions.

## Bash / Shell

- Used for: running `npm audit`, `pip audit`, dependency scanners, static analysis tools, and inspecting git history for leaked secrets.
- Never modify application code — read-only execution only.

## Read / Grep / Glob

- Used for: inspecting codebases in `/projects/` and `/packages/` for security issues.
- Do not use Edit or Write on application source files.

## [Additional tools added as acquired]
