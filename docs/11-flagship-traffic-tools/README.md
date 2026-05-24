# Flagship Traffic Tools — Implementation Specs

This folder contains the actionable deliverables from the **Higher-Level Tools Research for Maximum Traffic** plan. Use these specs when building Phase A–D flagship tools.

## Documents

| # | Document | Purpose |
|---|----------|---------|
| 01 | [Phase A Priorities](01-phase-a-priorities.md) | Confirmed flagship build order and success criteria |
| 02 | [Rental Deal Analyzer Spec](02-rental-deal-analyzer-spec.md) | Full spec for the real estate cluster anchor tool |
| 03 | [Mortgage Calculator Pro Spec](03-mortgage-calculator-pro-spec.md) | Full spec for finance cluster anchor tool |
| 04 | [Generic Tools Audit](04-generic-tools-audit.md) | Keep / upgrade / complement decisions for all 108 generic tools |
| 05 | [Health & Fitness Category Plan](05-health-fitness-category-plan.md) | New category hub plan for Phase B |
| 06 | [Developer Tools Expansion](06-developer-tools-expansion.md) | Priority order for Regex, JWT, CSV-to-Table, Cron |
| 07 | [File Upload UX Pattern](07-file-upload-ux-pattern.md) | Reusable client-side file UX for PDF/image flagships |
| 08 | [Traffic Baseline](08-traffic-baseline.md) | Pre-launch metrics setup and flagship event tracking |

## Code References

- File upload components: [`src/components/tools/FileDropZone.tsx`](../../src/components/tools/FileDropZone.tsx), [`FileListPreview.tsx`](../../src/components/tools/FileListPreview.tsx)
- Shareable URL state: [`src/lib/tools/url-state.ts`](../../src/lib/tools/url-state.ts)
- Flagship analytics events: [`src/lib/analytics/flagship-events.ts`](../../src/lib/analytics/flagship-events.ts)

## Related Docs

- [Product brief](../01-product-brief.md)
- [SEO programmatic pages](../05-seo-programmatic-pages.md)
- [Future roadmap](../10-future-roadmap.md)
