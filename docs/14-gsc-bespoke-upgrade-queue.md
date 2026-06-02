# GSC-driven bespoke upgrade queue

After the platform-wide generic tool UX pass, use **Google Search Console** to choose which tools deserve bespoke components (not another registry-wide change).

## When to run

- At least 28 days of data on the production domain
- `NEXT_PUBLIC_SITE_URL` set to `https://convertmystuff.com`
- Sitemap submitted in Search Console

See [11-flagship-traffic-tools/08-traffic-baseline.md](./11-flagship-traffic-tools/08-traffic-baseline.md) for export steps.

## Export (save outside git)

| Report | Range | Use |
|--------|-------|-----|
| Performance → Pages | Last 28 days | URLs with impressions/clicks |
| Performance → Queries | Last 28 days | Intent behind each URL |

## Ranking rubric

Score each tool URL (1–5) on:

1. **Impressions** (last 28d)
2. **CTR vs site median** (low CTR + high impressions = UX upgrade candidate)
3. **Generic limitation** — can `Generic*` + config express the workflow?
4. **Revenue cluster** — developer, real estate, health, finance priority

Pick **10–15 tools** total for bespoke work in the next sprint.

## Bespoke triggers (examples)

| Signal | Bespoke upgrade |
|--------|-----------------|
| High impressions, low CTR on JSON/CSV cluster | Column reorder, batch file, share presets (extend `JsonToCsvTool` pattern) |
| Question queries (“what is cap rate”) | Add `guideSlug` + Tier C content, not a new URL |
| Calculator with 4+ interdependent fields | Multi-tab UI like `RentalDealAnalyzerTool` |
| Generic tool with strong traffic but no `resultLines` | Add config breakdown first; bespoke only if still insufficient |

## Do not

- Create numeric variation URLs (`/5-acres-to-square-feet/`)
- Replace working generic tools site-wide without GSC evidence
- Add login walls for basic use

## Analytics cross-check

In GA4 (when `NEXT_PUBLIC_ANALYTICS_ID` is set), compare:

- `tool_example_load` / `tool_copy` / `tool_share` by `tool_id`
- `flagship_*` events on flagship tools

High `tool_example_load` with low `tool_copy` may indicate confusing output UX.

## Output of this process

Maintain a simple spreadsheet (not in repo):

```text
tool_id | URL | 28d impressions | 28d clicks | decision (config / bespoke / content) | owner | status
```

Review monthly; archive rows when shipped.
