# API Reference

Base URL (hosted): `https://api.gitdigest.dev`

All requests and responses use `application/json`.

---

## `POST /v1/digest`

Summarize a git diff into human-readable release notes.

### Authentication

- **Public tier:** No authentication required.
- **Future authenticated tier:** Pass `Authorization: Bearer <token>` in the request header. Authenticated users receive higher rate limits (not yet available).

### Request

```
POST /v1/digest
Content-Type: application/json
```

**Body fields:**

| Field | Type | Required | Default | Description |
|----|----|----|----|----|
| `diff` | string | Yes | — | The raw git diff text. Maximum 500,000 characters. |
| `format` | string | No | `markdown` | Output format. One of: `markdown`, `plaintext`, `json`. |
| `style` | string | No | `concise` | Note style. One of: `concise`, `detailed`, `conventional`. |

**`format` values:**

| Value | Output |
|----|----|
| `markdown` | Bullet points grouped by change type (feat, fix, refactor, chore, etc.) |
| `plaintext` | Plain text bullet points, no Markdown syntax |
| `json` | Structured object — see response schema below |

**`style` values:**

| Value | Output |
|----|----|
| `concise` | One line per change |
| `detailed` | Each change includes context, motivation, and impact |
| `conventional` | Each bullet follows Conventional Commits format |

### Response

**Success — `200 OK`**

```json
{
  "notes": "string",
  "tokensUsed": 342
}
```

| Field | Type | Description |
|----|----|----|
| `notes` | string | Generated release notes in the requested format |
| `tokensUsed` | integer | Total Anthropic API tokens consumed (input + output) |

**When `format=json`**, the `notes` field contains a JSON string. Parse it to get the structured object:

```json
{
  "sections": [
    {
      "type": "feat",
      "items": [
        "Added user authentication middleware",
        "Introduced session expiry handling"
      ]
    },
    {
      "type": "fix",
      "items": [
        "Resolved null pointer in session handler"
      ]
    }
  ]
}
```

### Error responses

| Status | Body | Description |
|----|----|----|
| `400 Bad Request` | `{ "error": "\"diff\" is required" }` | Missing or invalid request fields |
| `429 Too Many Requests` | `{ "error": "Too many requests, please try again tomorrow." }` | Rate limit exceeded |
| `500 Internal Server Error` | `{ "error": "Internal server error" }` | Unexpected server-side error |

### Rate limit headers

Every response includes standard rate limit headers (RFC 6585):

```
RateLimit-Limit: 100
RateLimit-Remaining: 87
RateLimit-Reset: 1746057600
```

| Header | Description |
|----|----|
| `RateLimit-Limit` | Maximum requests allowed in the window (100/day per IP) |
| `RateLimit-Remaining` | Requests remaining in the current window |
| `RateLimit-Reset` | Unix timestamp when the window resets |

### Example requests

**Markdown output (default):**

```bash
curl -X POST https://api.gitdigest.dev/v1/digest \
  -H "Content-Type: application/json" \
  -d '{
    "diff": "diff --git a/src/auth.js b/src/auth.js\n...",
    "format": "markdown",
    "style": "concise"
  }'
```

**Plaintext output:**

```bash
curl -X POST https://api.gitdigest.dev/v1/digest \
  -H "Content-Type: application/json" \
  -d '{
    "diff": "diff --git a/src/auth.js b/src/auth.js\n...",
    "format": "plaintext",
    "style": "detailed"
  }'
```

**JSON output:**

```bash
curl -X POST https://api.gitdigest.dev/v1/digest \
  -H "Content-Type: application/json" \
  -d '{
    "diff": "diff --git a/src/auth.js b/src/auth.js\n...",
    "format": "json",
    "style": "conventional"
  }'
```
