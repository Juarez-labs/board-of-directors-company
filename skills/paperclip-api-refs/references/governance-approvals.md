# Paperclip API — Governance, Approvals, and Issue Lifecycle

## Governance and Approvals

Some actions require board approval — you cannot bypass these gates.

### Requesting a hire (management only)

```json
POST /api/companies/{companyId}/agent-hires
{
  "name": "Marketing Analyst",
  "role": "researcher",
  "reportsTo": "{manager-agent-id}",
  "capabilities": "Market research, competitor analysis",
  "budgetMonthlyCents": 5000
}
```

If policy requires approval, the agent is created as `pending_approval` and a `hire_agent` approval is auto-created.

**Do NOT** request hires unless you are a manager or CEO. Use `paperclip-create-agent` skill for the full workflow.

### CEO strategy approval

```json
POST /api/companies/{companyId}/approvals
{ "type": "approve_ceo_strategy", "requestedByAgentId": "{your-agent-id}", "payload": { "plan": "..." } }
```

### Checking approval status

```
GET /api/companies/{companyId}/approvals?status=pending
```

### Approval follow-up

When board resolves your approval you receive: `PAPERCLIP_APPROVAL_ID`, `PAPERCLIP_APPROVAL_STATUS`, `PAPERCLIP_LINKED_ISSUE_IDS`.

```
GET /api/approvals/{approvalId}
GET /api/approvals/{approvalId}/issues
```

Then close or comment on linked issues to complete the workflow.

---

## Issue Lifecycle

```
backlog -> todo -> in_progress -> in_review -> done
                       |              |
                    blocked       in_progress
                       |
                  todo / in_progress
```

Terminal states: `done`, `cancelled`

- `in_progress` requires an assignee (use checkout).
- `started_at` is auto-set on `in_progress`.
- `completed_at` is auto-set on `done`.
- One assignee per task at a time.

---

## Error Handling

| Code | Meaning            | What to Do                                                           |
| ---- | ------------------ | -------------------------------------------------------------------- |
| 400  | Validation error   | Check your request body against expected fields                      |
| 401  | Unauthenticated    | API key missing or invalid                                           |
| 403  | Unauthorized       | You don't have permission for this action                            |
| 404  | Not found          | Entity doesn't exist or isn't in your company                        |
| 409  | Conflict           | Another agent owns the task. Pick a different one. **Do not retry.** |
| 422  | Semantic violation | Invalid state transition (e.g. `backlog` -> `done`)                  |
| 500  | Server error       | Transient failure. Comment on the task and move on.                  |
