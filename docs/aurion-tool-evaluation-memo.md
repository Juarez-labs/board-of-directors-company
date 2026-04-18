# Tool Evaluation Memo — Aurion Group Use Cases

**Date:** 2026-04-17
**Author:** CTO (Board of Directors Company)
**Status:** Final — confirming board-approved decision
**Board Decision:** Standalone prototype first (approved prior to this memo)

---

## Executive Summary

This memo evaluates four tooling options for Aurion Group's top three automation use cases. The board has already approved the **standalone Claude API script** approach as the starting point. This memo validates that decision with evidence and establishes criteria for when to revisit it.

**Options evaluated:**
- **A — Full Paperclip agent system** (multi-agent, full governance)
- **B — Standalone Claude API script** (targeted Python/Node scripts calling Claude directly)
- **C — n8n/Zapier workflow automation** (no-code/low-code triggers and actions)
- **D — Claude Projects** (shared knowledge base with persistent instructions)

---

## Use Case 1: Work Order Follow-Up Automation

**Problem:** Maintenance coordinators spend significant time following up on open work orders — checking status, nudging vendors, updating residents, and escalating overdue tickets.

### Option Evaluation

| Option | Fit | Rationale |
|--------|-----|-----------|
| **A — Full Paperclip** | Low (for now) | Overkill for a single workflow. Requires agent hiring, governance config, and heartbeat scheduling before any value is delivered. Build cost is 4–8 weeks before first prototype. |
| **B — Standalone Claude API** ✅ | **High** | A single script can ingest open work orders (CSV/AppFolio export), generate follow-up messages, and output them for human review or direct send. Deliverable in days. No infrastructure required beyond an API key. |
| **C — n8n/Zapier** | Medium | Suitable for trigger-based notifications (e.g., work order age > 5 days → send email). Lacks judgment — cannot assess whether a vendor response is actually satisfactory. No LLM reasoning without additional integration. |
| **D — Claude Projects** | Low | Designed for conversational use, not automated batch processing. Requires a human in the loop for every work order. Not scalable. |

**Recommendation: Option B**

A standalone script that reads open work orders, drafts follow-up messages, and outputs them for coordinator review delivers immediate value with minimal risk. The script can be extended later (auto-send, AppFolio API write-back) once the pattern is proven.

**Upgrade trigger:** When the volume exceeds what one coordinator can review, or when cross-system coordination (vendor + resident + property manager) requires more than one script, evaluate moving to Paperclip.

---

## Use Case 2: Leasing Workflow Support

**Problem:** Leasing agents handle repetitive inquiry responses, application status updates, move-in checklist coordination, and follow-ups with prospective tenants — all requiring consistent, on-brand communication with context-specific detail.

### Option Evaluation

| Option | Fit | Rationale |
|--------|-----|-----------|
| **A — Full Paperclip** | Low (for now) | The leasing workflow spans multiple handoffs (inquiry → tour → application → approval → move-in). A full Paperclip implementation with dedicated agents per stage is the right long-term architecture — but not for a first prototype. Setup complexity before first value is high. |
| **B — Standalone Claude API** ✅ | **High** | Scripts can handle the highest-volume, most repetitive steps: drafting inquiry responses from a lead form, generating application status emails, and producing move-in checklists. Each task is a clean input/output loop — ideal for a targeted script. |
| **C — n8n/Zapier** | Medium | Can automate routing (new lead → assigned agent → CRM update) but cannot draft contextual, personalized responses. Useful as a complement to Option B, not a replacement. |
| **D — Claude Projects** | Low–Medium | Better fit here than in Use Case 1 because leasing agents can use Claude Projects as a knowledge-augmented assistant during live conversations. However, it requires manual invocation and does not automate batch workflows. Treat as a leasing agent productivity tool, not an automation layer. |

**Recommendation: Option B (with Claude Projects as a secondary productivity tool)**

Build targeted scripts for the top 3 leasing email types (new inquiry response, application received acknowledgement, move-in instructions). Separately, evaluate a Claude Project loaded with Aurion's lease terms, pet policies, and FAQ as a lookup assistant for leasing agents. This is not automation — it's augmentation.

**Upgrade trigger:** When scripts need to share state across workflow steps (e.g., application status must be referenced when generating move-in instructions), evaluate a lightweight orchestration layer or migrate to Paperclip.

---

## Use Case 3: AppFolio Reporting / Analytics

**Problem:** Property managers need regular reporting from AppFolio data — occupancy rates, delinquency summaries, maintenance cost trends — currently assembled manually from AppFolio exports or the web UI.

### Option Evaluation

| Option | Fit | Rationale |
|--------|-----|-----------|
| **A — Full Paperclip** | Low (for now) | Reporting is a well-scoped, deterministic task. Full agent governance is not needed for data summarization. Would add unnecessary complexity to what is fundamentally a data pipeline with narrative output. |
| **B — Standalone Claude API** ✅ | **High** | A script that ingests AppFolio CSV exports, runs Claude to generate a natural-language summary with key observations, and emails or Slacks the output is directly implementable. No dependencies beyond file access and an API key. Covers the core ask: human-readable summaries from structured data. |
| **C — n8n/Zapier** | Low–Medium | Can schedule and deliver reports but cannot interpret the data. Would still need an LLM call for the narrative layer, making it functionally equivalent to Option B with more moving parts. |
| **D — Claude Projects** | Low | Claude Projects is conversational. It can answer ad hoc questions about reports if the data is pasted in, but it does not support scheduled automation or structured data ingestion at scale. Useful for one-off analysis, not regular reporting. |

**Recommendation: Option B**

A weekly reporting script that reads AppFolio exports and produces a structured markdown summary (occupancy, delinquency, top maintenance issues, notable variances) covers the full ask. Output can be emailed, posted to a shared folder, or piped to Slack. The script can evolve to use AppFolio's API directly when credentials are available.

**Upgrade trigger:** When reports need to drive actions (e.g., delinquency summary → automatically draft demand letters → assign to coordinator for review), the workflow complexity justifies a Paperclip agent chain.

---

## Summary Table

| Use Case | Recommended Option | Upgrade Trigger |
|----------|--------------------|-----------------|
| Work order follow-up | B — Standalone Claude API | Volume > reviewer capacity; multi-system coordination needed |
| Leasing workflow support | B — Standalone Claude API (+ Claude Projects as agent tool) | State must be shared across workflow steps |
| AppFolio reporting/analytics | B — Standalone Claude API | Reports need to drive automated downstream actions |

---

## Decision Confirmation

The board approved **standalone prototype first** prior to this evaluation. This memo confirms that decision is correct across all three use cases.

Key evidence:
1. All three use cases have clean input/output boundaries — they do not require persistent state, multi-agent coordination, or complex approval flows in their initial form.
2. The standalone approach delivers working prototypes in days, not weeks, enabling real user feedback before any infrastructure investment.
3. Upgrade paths to Paperclip are clearly defined and non-disruptive — scripts can be wrapped in Paperclip agents incrementally without rewriting core logic.
4. n8n/Zapier and Claude Projects are complementary, not primary — they can be layered on top of the standalone approach where appropriate.

**Next step:** Assign prototype development for each use case (recommended: one script per use case, phased over 3 sprints).

---

*Gate 0.3 complete. See parent: [BOAA-196](/BOAA/issues/BOAA-196)*
