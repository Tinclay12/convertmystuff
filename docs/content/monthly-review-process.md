# Monthly Content Review Process

Run on the first week of each month. Owner: whoever maintains SEO/content.

## 1. Google Search Console export

Filter by path prefix:

- `/guides/`
- `/resources/`

Export queries where:

- Impressions > 50 and average position 4–15 → **expand** those articles first
- Impressions > 100 and CTR < 2% → **rewrite title/meta description**
- Same query ranks both tool page and guide → check **cannibalization**; consolidate or shorten duplicate FAQ on tool page

Record baseline in a spreadsheet tab named `GSC-YYYY-MM`.

## 2. Internal CTR (analytics)

From `trackContentEvent()` events:

- `guide_click` — tool page → guide banner
- `content_tool_link_click` — guide/resource → tool
- `workflow_link_click` — tool → tool cluster links

**Target:** > 5% of Tier C tool sessions click at least one content link.

If CTR is low on a flagship tool, verify `guideSlug` / `resourceSlugs` enrichment in `src/lib/content/tools/`.

## 3. Index coverage

GSC Pages report: all published guide and resource URLs should be indexed. Fix 404s, canonical mismatches, or noindex leaks.

## 4. Refresh queue

Update `lastReviewed` and content when:

- Formula or standard changed (WHO, lending norms)
- Article ranks 4–15 for a high-value query
- Competitor SERP median word count grew > 20% since last review

## 5. KPI targets (90-day windows per wave)

| Metric | Source | Target |
|--------|--------|--------|
| Impressions `/guides/*` + `/resources/*` | GSC | +100% vs wave baseline |
| Avg position on target keywords | GSC | +3 positions on expanded articles |
| Content link CTR | Analytics | > 5% on Tier C tool pages |
| Index coverage | GSC | 100% of published articles |
| Avg engagement time (guides) | GA4 | > 90 seconds |

## 6. When not to add content

Defer new guides when:

- SERP is entirely calculators/tools (task intent)
- Topic duplicates an existing article without a distinct angle
- Ranking would require numeric variation pages (`/5-acres-to-square-feet/`)

See [12-tool-content-enrichment.md](../12-tool-content-enrichment.md) Phase 4 gate.
