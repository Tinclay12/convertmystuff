# Tool Content Enrichment

## Purpose

Increase value on tool pages with contextual snippets, grouped workflow links, and optional standalone guides—without breaking the tool-first product rule from [03-public-tool-page-spec.md](03-public-tool-page-spec.md).

The tool interface stays above the fold. Content supports task completion and topical depth.

## Content Tiers

| Tier | Examples | Minimum bar | Guide page |
|------|----------|-------------|------------|
| **A — Simple converters** | acres→sq ft, meters→feet | 1–2 snippets + workflow link groups | No |
| **B — Mid calculators** | cap rate, tip calculator | 2–3 snippets + expanded FAQs | Only if traffic proves question intent |
| **C — High-intent flagships** | BMI, calorie, JSON→CSV | 3+ snippets, 8+ FAQs, 1 guide | Yes |

**Rule of thumb:** question-intent queries ("what is cap rate?") earn a guide URL. task-intent queries ("convert 2.5 acres") get snippets + workflow links on the tool page.

## Architecture

Content lives outside bloated registry files:

```text
src/lib/content/
  tools/           # per-tool snippets (keyed by tool id)
  guides/          # standalone guide definitions
  linking/         # cross-category workflow matrices
  merge-tool-content.ts
```

`getEnrichedTool()` in `src/lib/tools/access.ts` merges base registry entries with content overlays at read time.

### Registry fields (optional on `ToolDefinition`)

- `contentBlocks[]` — titled snippet cards with paragraphs and optional tool links
- `toolLinkGroups[]` — grouped internal links (reverse, related, workflow)
- `guideSlug` — links to `/guides/{slug}/`

### Guide pages

- Route: `/guides/` (index) and `/guides/[slug]/`
- Definitions: `src/lib/content/guides/definitions.ts`
- Each guide links back to a primary tool with a prominent CTA
- Included in root sitemap

## Authoring Rules

### Do

- Write tool-specific examples, edge cases, and FAQs
- Link reverse conversions where applicable
- Link to higher-value workflow tools (converter → calculator, BMI → calorie → macro)
- Cite formulas and standards in `sourceNotes`
- Update `lastReviewed` when content changes
- Use medical/finance disclaimers on health and real estate content

### Do not

- Repeat the title in filler paragraphs
- Swap keywords across hundreds of pages with the same paragraph structure
- Create indexed numeric variation pages (`/5-acres-to-square-feet/`)
- Block basic tool use with long intros above the fold
- Add FAQ schema for generic or duplicate content

## Internal Linking Playbook

### Converters → complex tools

Defined in `src/lib/content/linking/converter-workflows.ts`:

- Area converters → price per square foot
- Length converters → construction calculators
- Weight converters → BMI, calorie calculators

### Health cluster

Defined in `src/lib/content/linking/health-workflows.ts`:

```text
BMI → calorie → macro
```

### Real estate cluster

Defined in `src/lib/content/linking/real-estate-workflows.ts`:

```text
cap rate ↔ NOI ↔ DSCR ↔ rental deal analyzer
```

## Page Layout Order

1. Tool panel (above the fold)
2. Guide banner (Tier C, when `guideSlug` is set)
3. Explanation, how-to, formula, examples
4. Content blocks ("Learn more")
5. Assumptions, use cases, FAQ, source notes
6. Workflow links (grouped) OR flat related tools grid (fallback)
7. Last reviewed

Tier C pages may show an in-content ad slot between snippet groups.

## Rollout Checklist

### Phase 1 — Platform (done)

- [x] Types and content module pattern
- [x] UI: `ToolContentBlocks`, `ToolWorkflowLinks`, `ToolGuideBanner`
- [x] Guide routes and sitemap
- [x] Pilots: acres-to-square-feet, bmi-calculator, cap-rate-calculator

### Phase 2 — High-intent clusters (done)

- [x] Expand health tools (calorie, macro snippets)
- [x] Real estate workflow groups on all RE tools (linking matrix in place)
- [x] Finance mortgage cluster links
- [x] Developer JSON/CSV cluster with guide links

### Phase 3 — Converter network (done)

- [x] Tier A snippets for remaining unit converters
- [x] Unique conversion-factor context per tool (no keyword swaps)

### Phase 4 — Remaining categories (partial)

- [x] Supplemental FAQs for text, image, kitchen, and marketing tools
- [ ] Add guides only when Search Console shows question-intent queries

## Analytics

Content link clicks fire `trackContentEvent()` with:

- `guide_click`
- `workflow_link_click`
- `content_tool_link_click`

## References

- [03-public-tool-page-spec.md](03-public-tool-page-spec.md)
- [05-seo-programmatic-pages.md](05-seo-programmatic-pages.md)
- [11-flagship-traffic-tools/05-health-fitness-category-plan.md](11-flagship-traffic-tools/05-health-fitness-category-plan.md)
