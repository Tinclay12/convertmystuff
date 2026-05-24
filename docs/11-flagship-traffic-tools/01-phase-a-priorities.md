# Phase A Flagship Priorities — Confirmed

**Status:** Confirmed  
**Target window:** 4–6 weeks  
**Goal:** Ship four bespoke flagship tools that elevate existing clusters and establish patterns for Phase B–D.

---

## Confirmed Build Order

| Priority | Tool ID | Title | Category | Rationale |
|----------|---------|-------|----------|-----------|
| **A1** | `rental-deal-analyzer` | Rental Property Deal Analyzer | real-estate-calculators | Composite dashboard elevates all 10 RE tools; high intent; strong affiliate potential |
| **A2** | `mortgage-calculator-pro` | Mortgage Calculator with Amortization | finance-calculators | Highest-volume finance query; replaces thin generic loan calculator |
| **A3** | `json-csv-pro` | JSON ↔ CSV Pro (upgrade) | developer-tools | Differentiates developer cluster from generic converter spam |
| **A4** | `pdf-merge-split-pro` | PDF Merge & Split (client-side) | document-tools | Makes document cluster real; targets privacy long-tail |

---

## Why These Four First

1. **Cluster lift** — Each flagship sits at the center of an existing topical cluster with 6–19 sibling pages already indexed.
2. **Client-side only** — No auth, storage, or queues required (Phase 6 deferred).
3. **Distinct workflows** — Each passes the materially-distinct-task test in [`05-seo-programmatic-pages.md`](../05-seo-programmatic-pages.md).
4. **Reusable patterns** — Deal analyzer establishes multi-metric dashboard + URL state; PDF tools establish file UX pattern; JSON Pro establishes file-drop + export options.

---

## Explicitly Out of Phase A

| Item | Defer to | Reason |
|------|----------|--------|
| Health & Fitness hub | Phase B | New category; needs hub + 3 flagships |
| Password generator | Phase B | New tool; low dependency on existing code |
| Construction wizards | Phase C | Requires room-dimension UX pattern |
| PDF compress (quality) | Phase D | Quality tradeoffs need server or heavy client libs |
| PDF to Word | Phase D | Server OCR required for acceptable output |

---

## Success Criteria (90 days post-launch)

| Metric | Target |
|--------|--------|
| Organic impressions (flagship pages) | > 1,000/mo each |
| Avg engagement time (analyzers) | > 2 min |
| Internal CTR to related tools | > 5% of sessions |
| Shareable URL usage | > 2% of sessions with query params |
| Build quality | All logic covered by unit tests |

---

## Engineering Checklist (per flagship)

- [ ] Bespoke `componentKey` in registry (not `Generic*`)
- [ ] Logic module in `src/lib/tools/logic/` with tests
- [ ] URL state via `url-state.ts` helpers
- [ ] 8–12 FAQs, 4+ examples, formula/assumptions blocks
- [ ] Related tools link to cluster siblings + flagship
- [ ] `trackFlagshipEvent()` on calculate/export/share actions
- [ ] Mobile-first layout; tool above the fold
- [ ] `premiumEligible: true` for future PDF export / saved scenarios

---

## Registry Placeholders

Phase A tool IDs are registered as `planned` stubs in [`registry-planned.ts`](../../src/lib/tools/registry-planned.ts) until implementation ships. Live entries always win deduplication per registry rules.

---

## Next Steps After Phase A

Proceed to Phase B per roadmap:

1. Health hub (BMI, calorie, macro)
2. Password/passphrase generator
3. Regex tester + JWT decoder

See [05-health-fitness-category-plan.md](05-health-fitness-category-plan.md) and [06-developer-tools-expansion.md](06-developer-tools-expansion.md).
