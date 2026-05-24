# Generic Tools Audit — Keep / Upgrade / Complement

**Audit date:** 2026-05-23  
**Scope:** 108 generic tools + 9 bespoke tools (117 total)

## Legend

| Action | Meaning |
|--------|---------|
| **Keep** | Generic shell is sufficient; maintain for long-tail SEO |
| **Upgrade** | Replace or enhance with bespoke flagship (Phase A–C) |
| **Complement** | Keep generic; add flagship sibling that links back |
| **Consolidate** | Merge into flagship workflow; generic may redirect or stay as simplified view |

---

## Summary

| Action | Count |
|--------|-------|
| Keep | 78 |
| Upgrade | 12 |
| Complement | 15 |
| Consolidate | 3 |

---

## Real Estate Calculators (10 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| `cap-rate-calculator` | Bespoke | **Keep** | Flagship sibling; link to deal analyzer |
| `cash-on-cash-calculator` | Generic | **Complement** | Keep; deal analyzer superset |
| `roi-calculator` | Generic | **Keep** | Distinct formula (gain/cost) |
| `noi-calculator` | Generic | **Complement** | Keep; embedded in deal analyzer |
| `grm-calculator` | Generic | **Complement** | Keep |
| `mortgage-calculator` | Generic | **Complement** | Keep quick RE version; link to mortgage pro |
| `loan-to-value-calculator` | Generic | **Complement** | Keep |
| `dscr-calculator` | Generic | **Complement** | Keep |
| `price-per-square-foot` | Generic | **Keep** | Simple comparison metric |
| `property-tax-estimator` | Generic | **Keep** | Jurisdiction-agnostic estimate |
| `rental-deal-analyzer` | *Planned* | **Upgrade** | Phase A1 flagship |

---

## Finance Calculators (8 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| `percentage-calculator` | Generic | **Keep** | High volume, simple |
| `tip-calculator` | Generic | **Keep** | Daily utility |
| `discount-calculator` | Generic | **Keep** | E-commerce intent |
| `margin-calculator` | Generic | **Keep** | Business intent |
| `markup-calculator` | Generic | **Keep** | Pairs with margin |
| `compound-interest-calculator` | Generic | **Upgrade** | Phase C: add chart + contribution schedule |
| `loan-payment-calculator` | Generic | **Complement** | Keep for non-mortgage loans |
| `break-even-calculator` | Generic | **Keep** | Distinct business workflow |
| `mortgage-calculator-pro` | *Planned* | **Upgrade** | Phase A2 flagship |

---

## Developer Tools (19 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| `json-to-csv` | Bespoke | **Upgrade** | Phase A3: file drop, flatten modes, Excel BOM |
| `csv-to-json` | Bespoke | **Upgrade** | Phase A3: header detect, type inference UI |
| `nested-json-to-csv` | Bespoke | **Keep** | Distinct nested workflow |
| `json-formatter` | Bespoke | **Keep** | Core dev tool |
| `yaml-to-json` | Generic | **Keep** | Long-tail format pair |
| `json-to-yaml` | Generic | **Keep** | Reverse pair |
| `xml-to-json` | Generic | **Keep** | Distinct format |
| `tsv-to-csv` | Generic | **Keep** | Distinct delimiter task |
| `base64-encode` | Generic | **Keep** | Single-purpose |
| `base64-decode` | Generic | **Keep** | Reverse |
| `url-encode` | Generic | **Keep** | Single-purpose |
| `url-decode` | Generic | **Keep** | Reverse |
| `html-encode` | Generic | **Keep** | Distinct encoding |
| `sql-formatter` | Generic | **Upgrade** | Phase C: dialect select, keyword case |
| `css-formatter` | Generic | **Keep** | Simpler scope |
| `json-validator` | Generic | **Complement** | Keep; JSON Schema validator is new flagship |
| `uuid-generator` | Generic | **Keep** | Simple generator |
| `hash-generator` | Generic | **Keep** | Distinct from UUID |
| `lorem-ipsum-generator` | Generic | **Keep** | Content/dev utility |
| `csv-to-html-table` | *Planned* | **Upgrade** | Phase B dev expansion |
| `regex-tester` | *Planned* | **Upgrade** | Phase B |
| `jwt-decoder` | *Planned* | **Upgrade** | Phase B |
| `cron-builder` | *Planned* | **Upgrade** | Phase B |

---

## Document Tools (6 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| `markdown-to-html` | Generic | **Keep** | Text workflow |
| `html-to-markdown` | Generic | **Keep** | Reverse |
| `word-count-document` | Generic | **Complement** | Upgrade to match text-tools word counter depth |
| `text-to-pdf` | Generic | **Upgrade** | Phase C: styling options |
| `pdf-merge` | Generic | **Upgrade** | Phase A4: FileDropZone, reorder, preview |
| `pdf-split` | Generic | **Upgrade** | Phase A4: page range select |

---

## Image Tools (8 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| `png-to-jpg` | Generic | **Upgrade** | Phase C: real file upload UX |
| `jpg-to-png` | Generic | **Upgrade** | Phase C |
| `png-to-ico` | Generic | **Upgrade** | Phase C: multi-size favicon pack |
| `svg-to-png` | Generic | **Upgrade** | Phase C |
| `image-resizer` | Generic | **Upgrade** | Phase C: drag-drop + dimension lock |
| `image-compressor` | Generic | **Upgrade** | Phase C: quality slider + before/after |
| `favicon-generator` | Generic | **Upgrade** | Phase C: zip download all sizes |
| `dpi-calculator` | Generic | **Keep** | Formula-only; no file needed |

---

## Construction Calculators (10 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| `concrete-calculator` | Generic | **Upgrade** | Phase C wizard: slab dimensions + bags/yards |
| `cement-calculator` | Generic | **Complement** | Keep simplified; link to concrete wizard |
| `drywall-calculator` | Generic | **Upgrade** | Phase C: room dimensions |
| `lumber-calculator` | Generic | **Upgrade** | Phase C: wall framing wizard |
| `flooring-calculator` | Generic | **Upgrade** | Phase C: room area + waste factor |
| `tile-calculator` | Generic | **Upgrade** | Phase C |
| `roofing-calculator` | Generic | **Upgrade** | Phase C: pitch + area |
| `shingles-calculator` | Generic | **Complement** | Keep; links to roofing wizard |
| `mulch-calculator` | Generic | **Keep** | Simple volume calc |
| `gravel-calculator` | Generic | **Keep** | Simple volume calc |

---

## Marketing Tools (9 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| `utm-builder` | Bespoke | **Keep** | Cluster anchor |
| `qr-code-generator` | Bespoke | **Upgrade** | Phase C: custom frames/colors (partially exists) |
| `utm-parser` | Generic | **Keep** | Reverse of UTM builder |
| `meta-tag-generator` | Generic | **Complement** | SERP preview flagship extends this |
| `slug-generator` | Generic | **Keep** | Simple utility |
| `open-graph-preview` | Generic | **Upgrade** | Phase C: full SERP snippet preview |
| `twitter-card-generator` | Generic | **Complement** | Keep with OG preview |
| `robots-txt-generator` | Generic | **Keep** | Distinct task |
| `hashtag-generator` | Generic | **Keep** | Social long-tail |

---

## Text Tools (10 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| `remove-duplicate-lines` | Bespoke | **Keep** | Core text tool |
| `case-converter` | Bespoke | **Keep** | Core text tool |
| `remove-empty-lines` | Generic | **Keep** | Long-tail |
| `trim-lines` | Generic | **Keep** | Long-tail |
| `camel-case-converter` | Generic | **Consolidate** | Could merge into case-converter modes |
| `snake-case-converter` | Generic | **Consolidate** | Could merge into case-converter modes |
| `word-counter` | Generic | **Upgrade** | Phase B: reading time, keyword density |
| `character-counter` | Generic | **Keep** | Twitter/meta limits long-tail |
| `line-counter` | Generic | **Keep** | Simple |
| `add-line-numbers` | Generic | **Keep** | Dev/writing utility |
| `text-diff` | Generic | **Upgrade** | Phase C: side-by-side highlight |

---

## Unit Converters (19 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| All 19 converters | Generic | **Keep** | Correct programmatic SEO strategy; do not merge into mega-converter |

**Future:** Add more distinct unit pairs (board feet, cubic yards) as separate pages—not numeric variations.

---

## Time & Date Tools (6 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| All 6 tools | Generic | **Keep** | Adequate for long-tail; timezone could upgrade later |

---

## Design Tools (6 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| All 6 tools | Generic | **Keep** | Niche design long-tail; low priority for flagships |

---

## Kitchen / Recipe Tools (6 tools)

| Tool ID | Component | Action | Notes |
|---------|-----------|--------|-------|
| `recipe-scaler` | Generic | **Upgrade** | Phase C: ingredient list parser |
| Other 5 | Generic | **Keep** | Measurement long-tail |

---

## Bespoke Tools — No Change Required

These 9 already meet flagship quality bar (continue enhancing in place):

- `json-to-csv`, `csv-to-json`, `nested-json-to-csv`, `json-formatter`
- `remove-duplicate-lines`, `case-converter`
- `cap-rate-calculator`, `utm-builder`, `qr-code-generator`

---

## Implementation Priority from Audit

1. **Phase A upgrades (4):** rental-deal-analyzer, mortgage-calculator-pro, json-csv-pro, pdf-merge-split-pro
2. **Phase B new tools (6):** health hub (3), password generator, regex, jwt, csv-to-html-table
3. **Phase C upgrades (15):** construction wizards, image file UX, marketing SERP preview, text-diff, recipe-scaler
4. **Keep maintaining (78):** generics continue serving long-tail; improve internal links to flagships

---

## Rules for Future Generic Tools

Before adding a new `buildLiveTool()` entry, ask:

1. Is this a materially distinct task? If no → do not index.
2. Will a flagship tool supersede this within 2 phases? If yes → skip generic, build bespoke.
3. Is this a reverse pair of an existing tool? If yes → generic is fine.
4. Does this need file upload? If yes → use `FileDropZone` pattern, not textarea generic.
