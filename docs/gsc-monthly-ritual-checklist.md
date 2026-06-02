# GSC monthly ritual checklist

Run in the **first week of each month** after you have at least a few weeks of Search Console data. Full rationale: [content/monthly-review-process.md](./content/monthly-review-process.md).

## 1. Export and compare

- [ ] Export GSC Performance → Pages (last 28 days) → tab `GSC-YYYY-MM`
- [ ] Export GSC Performance → Queries (last 28 days)
- [ ] Note indexed page count vs prior month

## 2. CTR fixes (no new URLs)

For URLs with **impressions > 100** and **CTR < 2%**:

- [ ] Rewrite `metaTitle` / `metaDescription` in registry (tool) or content module (guide/resource)
- [ ] Redeploy and request indexing for changed URLs only

## 3. Question-intent content (surgical)

Filter queries containing `what`, `how`, `why`, `when`:

- [ ] If query maps to an **existing** flagship tool → deepen linked guide/resource or add FAQ on tool page
- [ ] If no guide exists and impressions justify it → **one** new guide tied to existing tool (see [12-tool-content-enrichment.md](./12-tool-content-enrichment.md))
- [ ] Do **not** create numeric variation URLs or duplicate tool+guide angles

## 4. Cannibalization

Same query ranks tool page and guide/resource:

- [ ] Shorten duplicate FAQ on tool page, or
- [ ] Narrow guide angle to “explainer” and tool to “do the task”

## 5. Bespoke / product queue

Update spreadsheet from [14-gsc-bespoke-upgrade-queue.md](./14-gsc-bespoke-upgrade-queue.md):

- [ ] Mark shipped rows `done`
- [ ] Pick next 3–5 tools for UX/content upgrades from impressions + low CTR + cluster priority

## 6. Analytics cross-check (if GA4 enabled)

- [ ] Tier C tools: content link CTR target > 5% (`guide_click`, `workflow_link_click`)
- [ ] High `tool_example_load` + low `tool_copy` → confusing output UX

## 7. When **not** to add content

Skip new guides/resources when:

- SERP is all calculators/tools (task intent only)
- Topic duplicates an existing article
- Ranking would require value-only URL spam

## 8. Quality sweep (optional)

```bash
npm run content:quality
```

Address published tools flagged as thin before adding any new indexed pages.
