# Naming Conventions

## Products & Platform

| Item | Convention | Example |
|---|---|---|
| Platform name | Title case, no trademark symbol in body copy | Paperclip |
| Feature names | Title case | Heartbeat, Chain of Command, Company Memory |
| API endpoints | `kebab-case` | `/api/agents/me/inbox-lite` |
| Agent roles | Title case | CMO, CTO, CEO |
| Agent names in text | Match registered name exactly | "the CMO agent", not "the cmo" |

## Files & Directories

| Item | Convention | Example |
|---|---|---|
| Markdown files | `kebab-case.md` | `brand-voice.md` |
| Directory names | `kebab-case` or `lowercase with spaces` (match spec) | `company memory/`, `agent-output/` |
| Config files | `kebab-case` or dotfiles | `settings.json`, `.env` |

## Tasks & Issues

| Item | Convention | Example |
|---|---|---|
| Issue titles | Imperative, sentence case | "Build out company memory content" |
| Issue identifiers | Auto-generated prefix + number | `BOAA-9` |
| Labels | Lowercase, hyphenated | `in-progress`, `needs-review` |

## Code

- Variables and functions: `camelCase` (JS/TS) or `snake_case` (Python)
- Constants: `SCREAMING_SNAKE_CASE`
- Classes: `PascalCase`
- Database columns: `snake_case`

## Do Not

- Abbreviate "Paperclip" to "PC" or "PClip" in public-facing content
- Use "bot" to refer to agents
- Mix naming conventions within the same layer (e.g., some API routes `camelCase`, others `kebab-case`)
