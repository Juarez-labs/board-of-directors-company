# gitdigest

AI-powered git diff summarizer — pipe a diff, get clean release notes. Powered by Claude, deployable in seconds.

## Quickstart

**Via `npx` (no install):**

```bash
# Pipe a diff from stdin
git diff main..feature-branch | npx gitdigest

# Pass a diff file
npx gitdigest changes.diff
```

**Output format and style** are controlled via env vars:

```bash
GITDIGEST_FORMAT=markdown GITDIGEST_STYLE=concise git diff HEAD~1 | npx gitdigest
```

| `GITDIGEST_FORMAT` | Values | Default |
|----|----|----|
| Output format | `markdown`, `plaintext`, `json` | `markdown` |

| `GITDIGEST_STYLE` | Values | Default |
|----|----|----|
| Note style | `concise`, `detailed`, `conventional` | `concise` |

## Self-hosting

### Docker

```bash
docker build -t gitdigest .
docker run -p 3000:3000 \
  -e ANTHROPIC_API_KEY=sk-ant-... \
  -e REDIS_URL=redis://localhost:6379 \
  gitdigest
```

The server starts on port `3000` (or `PORT` if set).

### Environment variables

| Variable | Required | Default | Description |
|----|----|----|----|
| `ANTHROPIC_API_KEY` | Yes | — | Anthropic API key |
| `PORT` | No | `3000` | HTTP listen port |
| `REDIS_URL` | No | — | Redis connection URL. Required in multi-instance deployments for shared rate limiting. Falls back to in-memory store if unset. |
| `LOG_LEVEL` | No | `info` | Winston log level (`debug`, `info`, `warn`, `error`) |
| `DIGEST_MODE` | No | `speed` | Model selection: `speed` uses claude-haiku (faster, cheaper); `quality` uses claude-sonnet (higher accuracy) |
| `NODE_ENV` | No | `development` | Set to `production` in deployed environments |

## Running locally

> **Note:** The CLI defaults to `https://api.gitdigest.dev` which may not be publicly available. For local use, start the server yourself and point the CLI at it.

**1. Set your API key** — the server requires `ANTHROPIC_API_KEY` in its environment. Create a `.env` file in the project root (loaded automatically at startup):

```
ANTHROPIC_API_KEY=sk-ant-...
```

For Paperclip-managed environments, load from the shared instance env:

```bash
export $(grep ANTHROPIC_API_KEY /home/jarvis2048/.paperclip/instances/default/.env)
```

**2. Start the server:**

```bash
node src/server.js
```

**3. Point the CLI at your local instance:**

```bash
export GITDIGEST_API_URL=http://localhost:3000
git diff HEAD~1 | npx gitdigest
```

## API usage

```bash
curl -X POST http://localhost:3000/v1/digest \
  -H "Content-Type: application/json" \
  -d '{
    "diff": "'"$(git diff HEAD~1)"'",
    "format": "markdown",
    "style": "concise"
  }'
```

Response:

```json
{
  "notes": "- **feat**: Added user authentication middleware\n- **fix**: Resolved null pointer in session handler",
  "tokensUsed": 342
}
```

See [docs/api-reference.md](docs/api-reference.md) for the full request/response schema.

## Rate limits

The hosted API enforces **100 requests per day per IP**. Rate limit status is returned in standard headers on every response:

```
RateLimit-Limit: 100
RateLimit-Remaining: 87
RateLimit-Reset: 1746057600
```

Self-hosted instances have no rate limit by default (configure `express-rate-limit` to suit your needs).

## License

MIT
