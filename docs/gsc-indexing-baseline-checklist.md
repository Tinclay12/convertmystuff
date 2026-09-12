# GSC indexing baseline checklist

Run once at Phase 2 start, then re-check after major deploys. Store exports **outside git** (see [15-phase2-measurement-kit.md](./15-phase2-measurement-kit.md)).

**Prerequisites**

- [ ] `NEXT_PUBLIC_SITE_URL` matches live canonical host (apex or `www`, not `.vercel.app`)
- [ ] Google Search Console property uses the same host
- [ ] Sitemap submitted: `https://convertmystuff.com/sitemap.xml`

## Week 1 — Baseline exports

| Step | Action | Output file (local) |
|------|--------|---------------------|
| 1 | GSC → Performance → Pages → Last 28 days → Export | `baseline-pages-28d.csv` |
| 2 | GSC → Performance → Queries → Last 28 days → Export | `baseline-queries-28d.csv` |
| 3 | GSC → Indexing → Pages → note indexed count | Screenshot or notes |
| 4 | Optional GA4 → Events `tool_copy`, `tool_share`, `tool_example_load` by `tool_id` | Explore export |

Record **Phase 2 start date** and indexed page count in your spreadsheet.

## URL inspection batch

In GSC → URL inspection → **Request indexing** for each URL below (or run `npm run gsc:urls` to print the list).

**Core**

- [ ] `/`
- [ ] `/tools/`
- [ ] `/guides/`
- [ ] `/resources/`
- [ ] `/about/`
- [ ] `/privacy/`
- [ ] `/terms/`

**Category hubs** (visible categories only)

- [ ] `/developer-tools/`
- [ ] `/unit-converters/`
- [ ] `/finance-calculators/`
- [ ] `/real-estate-calculators/`
- [ ] `/health-fitness-calculators/`
- [ ] `/construction-calculators/`
- [ ] `/document-tools/`
- [ ] `/image-tools/`
- [ ] `/text-tools/`
- [ ] `/marketing-tools/`

**Flagship tools**

> **Tool URLs include their subcategory segment** (`/{category}/{subcategory}/{slug}/`).
> Run `npm run gsc:urls` to print the canonical list rather than composing URLs by hand;
> the flat `/{category}/{slug}/` form 404s (it now 308s to the real page, but do not submit it).

- [ ] `/developer-tools/json-to-csv/`
- [ ] `/developer-tools/csv-to-json/`
- [ ] `/document-tools/pdf-tools/pdf-merge/`
- [ ] `/document-tools/pdf-tools/pdf-split/`
- [ ] `/finance-calculators/investment-basics/compound-interest-calculator/`
- [ ] `/finance-calculators/loans-payments/mortgage-calculator-pro/`
- [ ] `/health-fitness-calculators/body-metrics/bmi-calculator/`
- [ ] `/real-estate-calculators/investment-metrics/rental-deal-analyzer/`
- [ ] `/construction-calculators/concrete-cement/concrete-calculator/`
- [ ] `/image-tools/resizers-compressors/image-resizer/`
- [ ] `/image-tools/resizers-compressors/image-compressor/`

## 7–14 days after requests

- [ ] Re-check Indexing → Pages; log indexed count vs baseline
- [ ] Fix any “Duplicate, Google chose different canonical” or 404 rows
- [ ] Confirm new `/about/` appears in coverage

## Related

- [14-gsc-bespoke-upgrade-queue.md](./14-gsc-bespoke-upgrade-queue.md)
- [16-phase2-90-day-review.md](./16-phase2-90-day-review.md)
