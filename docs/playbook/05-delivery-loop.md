# 05 — The Delivery Loop

**Status:** Stub — will be populated after M3 (CD pipeline) and M4 (multi-agent review cycle) are complete
**Last updated:** 2026-04-08

---

## What This Section Will Cover

The end-to-end path from committed code to production:

- CI pipeline: what runs, what blocks a merge
- CD pipeline: how we deploy, where we deploy to
- The full multi-agent review cycle (IC → QC gate → CTO approval → merge → deploy)
- How to verify a deployment succeeded
- Rollback procedure

---

## Placeholder: Target Delivery Stack

```
ICEngineer commits → GitHub push → CI (lint/typecheck/test)
                                        ↓
                                   QCAgent review
                                        ↓
                                   CTO approval
                                        ↓
                                   merge to master
                                        ↓
                                   CD deploys to Fly.io
```

---

*This section will be populated after Phase 1 M3 and M4 are complete.*
