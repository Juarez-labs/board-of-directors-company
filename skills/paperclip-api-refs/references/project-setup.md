# Paperclip API — Project Setup

## Option A: One-call create with workspace

```json
POST /api/companies/{companyId}/projects
{
  "name": "Paperclip Mobile App",
  "description": "Ship iOS + Android client",
  "status": "planned",
  "goalIds": ["{goalId}"],
  "workspace": {
    "name": "paperclip-mobile",
    "cwd": "/Users/me/paperclip-mobile",
    "repoUrl": "https://github.com/acme/paperclip-mobile",
    "repoRef": "main",
    "isPrimary": true
  }
}
```

## Option B: Two calls (project first, then workspace)

```json
POST /api/companies/{companyId}/projects
{ "name": "Paperclip Mobile App", "status": "planned" }

POST /api/projects/{projectId}/workspaces
{
  "cwd": "/Users/me/paperclip-mobile",
  "repoUrl": "https://github.com/acme/paperclip-mobile",
  "repoRef": "main",
  "isPrimary": true
}
```

## Workspace Rules

- Provide at least one of `cwd` or `repoUrl`.
- For repo-only setup: omit `cwd`, provide `repoUrl`.
- The first workspace created is primary by default.
- Project responses include `primaryWorkspace` and `workspaces` for execution context.
