# Phase 2 Measurement Kit

Use this alongside [14-gsc-bespoke-upgrade-queue.md](./14-gsc-bespoke-upgrade-queue.md) and [08-traffic-baseline.md](./11-flagship-traffic-tools/08-traffic-baseline.md).

**Phase 2 start date:** Record when you begin (e.g. 2026-06-02).

## Week 1 checklist

- [ ] Export GSC **Performance → Pages** (last 28 days) → `baseline-pages-28d.csv` (store outside git)
- [ ] Export GSC **Performance → Queries** (last 28 days) → `baseline-queries-28d.csv`
- [ ] Export GSC **Indexing → Pages** screenshot or CSV
- [ ] GA4 Explore: events `tool_copy`, `tool_share`, `tool_example_load`, `flagship_calculate` by `tool_id`
- [ ] Fill ranking spreadsheet (template below)

## Ranking spreadsheet columns

```text
tool_id | URL | 28d_impressions | 28d_clicks | CTR | action | tier | status | notes
```

**Action values:** `keep` | `content` | `bespoke` | `hub-spotlight`

**Tier values (bespoke queue):** `1-pdf-finance-sql` | `2-image` | `3-construction` | `4-marketing-text`

## Default Phase 2 bespoke queue (reorder after GSC export)

| Priority | tool_id | Rationale |
|----------|---------|-----------|
| 1 | pdf-merge, pdf-split | File UX; document cluster anchor |
| 2 | compound-interest-calculator | Finance depth vs generic |
| 3 | sql-formatter | High dev utility |
| 4 | image-resizer, image-compressor, png-to-ico | File cluster |
| 5 | concrete-calculator, lumber-calculator, roofing-calculator | Construction wizards |
| 6 | open-graph-preview, word-counter, text-diff | Marketing + text |

## Technical SEO indexing push (Weeks 2–4)

1. Confirm `NEXT_PUBLIC_SITE_URL` matches live canonical host (www vs apex).
2. GSC → **Sitemaps** → submit `https://www.convertmystuff.com/sitemap.xml` (or your canonical).
3. **URL inspection** → request indexing for: homepage, each category hub, top 20 flagship tool URLs, new guide URLs.
4. Re-check **Indexing → Pages** after 7–14 days; log count in spreadsheet.

## Monthly review (repeat)

1. Re-export GSC 28d pages/queries
2. Compare indexed count vs prior month
3. Update spreadsheet `status` for shipped items
4. Add guides only for new question-intent queries (see Phase 2 content rules)

## GA4 custom exploration (optional)

Dimensions: `tool_id`, `event_name`  
Metrics: Event count  
Filter: `event_category` = `generic_tool` OR `flagship_tool`

## Success targets (90 days from Phase 2 start)

| Metric | Baseline (you fill) | Target |
|--------|---------------------|--------|
| Indexed pages | ~25 | 75+ |
| Top flagship impressions/mo | — | +50% vs baseline |
| Homepage → tool CTR (GSC) | — | Improve vs baseline |
