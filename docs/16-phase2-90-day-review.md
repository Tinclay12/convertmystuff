# Phase 2 — 90-Day Review Ritual

Run this at **week 8–10** after Phase 2 start (see [15-phase2-measurement-kit.md](./15-phase2-measurement-kit.md)).

## Compare to Week 1 baseline

| Metric | Baseline (Week 1) | Current | Notes |
|--------|-------------------|---------|-------|
| GSC indexed pages | | | Target: 75+ |
| Homepage impressions | | | |
| Flagship tool impressions (top 10 URLs) | | | |
| `tool_copy` / `tool_share` (GA4) | | | By `tool_id` |

## GSC-led content actions

1. Re-export **Queries** (28d); filter question intent (`how`, `what`, `why`, `when`).
2. Add guides only when a query maps to an existing flagship tool (no thin URL spam).
3. Fix CTR outliers: title/meta refresh on pages with impressions > 500 and CTR < 2%.

## Engineering verification

- [ ] Homepage + category hubs show **Workflow paths** and **Flagship spotlight**
- [ ] Tier 1–4 bespoke `componentKey` entries resolve in `component-map`
- [ ] `npm test` and production build pass
- [ ] Indexing requests submitted for new guides and updated hubs (GSC URL inspection)

## Spreadsheet cleanup

Update [14-gsc-bespoke-upgrade-queue.md](./14-gsc-bespoke-upgrade-queue.md) statuses: mark shipped bespoke rows `done`, reprioritize Tier 2+ from fresh GSC data.

## Post-launch checklist

Tick relevant items in [13-post-launch-checklist.md](./13-post-launch-checklist.md) (canonical host, OG consistency, sitemap).
