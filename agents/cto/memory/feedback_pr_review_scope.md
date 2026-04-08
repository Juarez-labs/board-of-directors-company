---
name: PR review scope flexibility
description: ICEngineer may choose a different feature than the CTO's suggestion, as long as it meets M2 acceptance criteria
type: feedback
---

When giving M2 (or similar milestone) guidance, the recommended feature is a suggestion, not a mandate. ICEngineer implemented priority-field filtering instead of the suggested bulk-delete endpoint, and the result was high quality and fully compliant with acceptance criteria.

**Why:** BOAA-39 acceptance criteria did not name a specific feature — it specified properties (non-trivial, CI-passing, CTO-reviewed). The feature choice belongs to the IC, not the CTO.

**How to apply:** When posting guidance comments, make the recommended feature optional ("e.g., …" or "recommended:") and focus acceptance criteria on quality properties, not a specific implementation. Accept any feature that satisfies the properties.
