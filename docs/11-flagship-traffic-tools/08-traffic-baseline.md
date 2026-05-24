# Traffic Baseline — Pre-Launch Metrics Setup

**Purpose:** Establish measurement before Phase A flagship launches so lift is quantifiable at 30/60/90 days.

---

## 1. Google Search Console

### Setup (if not done)

1. Verify domain at [Google Search Console](https://search.google.com/search-console)
2. Submit sitemap: `https://convertmystuff.com/sitemap.xml`
3. Enable email alerts for coverage issues

### Baseline export (do now)

Export the following **before first flagship ships**:

| Report | Date range | Save as |
|--------|------------|---------|
| Performance → Pages | Last 28 days | `baseline-pages-28d.csv` |
| Performance → Queries | Last 28 days | `baseline-queries-28d.csv` |
| Performance → Countries | Last 28 days | `baseline-countries-28d.csv` |
| Indexing → Pages | Current | Screenshot or CSV |

Store in team drive (not in repo—no traffic data in git).

### Cluster pages to watch

Track these URL prefixes separately in a spreadsheet:

| Cluster | Path prefix |
|---------|-------------|
| Developer | `/developer-tools/` |
| Real estate | `/real-estate-calculators/` |
| Finance | `/finance-calculators/` |
| Document | `/document-tools/` |
| All tools | `/tools/` |

---

## 2. Analytics (GA4)

### Environment variable

Set in production:

```bash
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

The app loads GA4 via [`AnalyticsPlaceholder.tsx`](../../src/components/analytics/AnalyticsPlaceholder.tsx) when this is set.

### Flagship custom events

Implemented in [`flagship-events.ts`](../../src/lib/analytics/flagship-events.ts):

| Event name | When fired | Parameters |
|------------|------------|------------|
| `flagship_calculate` | User runs a flagship calculation | `tool_id`, `tool_category`, `mode` |
| `flagship_export` | Download CSV/PDF/PNG | `tool_id`, `export_format` |
| `flagship_share_link` | Copy share URL | `tool_id` |
| `flagship_file_process` | PDF merge/split/image process | `tool_id`, `file_count`, `export_format` |

All events include `event_category: "flagship_tool"`.

### GA4 console setup (after first deploy with analytics ID)

1. Admin → Events → mark `flagship_calculate` as key event (optional)
2. Explore → Free form: `tool_id` × event count
3. Create comparison: date range before vs after flagship launch

### Usage in tool components

```typescript
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";

trackFlagshipEvent("flagship_calculate", {
  tool_id: "rental-deal-analyzer",
  tool_category: "real-estate-calculators",
  mode: "analyze",
});
```

---

## 3. Baseline Metrics Template

Record these values at launch day (T0) for each flagship:

| Metric | T0 value | T+30 | T+60 | T+90 |
|--------|----------|------|------|------|
| GSC impressions (page) | | | | |
| GSC clicks (page) | | | | |
| GSC avg position | | | | |
| GA4 sessions (page) | | | | |
| GA4 avg engagement time | | | | |
| `flagship_calculate` events | | | | |
| `flagship_share_link` events | | | | |

### Target thresholds (from Phase A plan)

| Metric | 90-day target |
|--------|---------------|
| Organic impressions per flagship | > 1,000/mo |
| Avg engagement (analyzers) | > 2 min |
| Share link usage | > 2% of sessions |

---

## 4. Internal Linking Baseline

Before launch, note in spreadsheet:

- Current internal links **to** each cluster hub (from homepage, `/tools/`, cross-category)
- Current internal links **from** cluster tools to siblings

After flagship launch, verify:

- [ ] Flagship linked from category hub hero
- [ ] Flagship in related tools on all cluster siblings
- [ ] Siblings link back to flagship in related tools grid

---

## 5. Core Web Vitals

Check Search Console → Experience → Core Web Vitals for template pages:

- LCP < 2.5s on tool pages
- INP < 200ms
- CLS < 0.1

Flagship tools with charts/tables must not regress mobile vitals.

---

## 6. Review Cadence

| When | Action |
|------|--------|
| T0 | Export GSC + record GA4 baseline |
| T+14 | Check indexing of new flagship URLs |
| T+30 | First lift review; adjust internal links |
| T+60 | Compare cluster prefix impressions |
| T+90 | Go/no-go for Phase B categories |

---

## 7. What Not to Track in Repo

- Raw Search Console CSV exports (privacy + stale data)
- API keys or GA property secrets
- User-level data

Keep baseline spreadsheets in shared drive; reference this doc for methodology only.
