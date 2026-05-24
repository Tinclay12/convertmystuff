# Developer Tools Expansion — Priority Plan

**Phase:** B (parallel with health hub)  
**Goal:** Add 4 high-value bespoke developer tools that complement the JSON/CSV cluster

---

## Priority Ranking

| Rank | Tool ID | Title | Est. monthly volume | Build effort | Priority score |
|------|---------|-------|---------------------|--------------|----------------|
| **1** | `regex-tester` | Regex Tester | 30K–80K | Medium | ★★★★★ |
| **2** | `jwt-decoder` | JWT Decoder | 20K–50K | Low | ★★★★★ |
| **3** | `csv-to-html-table` | CSV to HTML Table | 10K–30K | Low | ★★★★☆ |
| **4** | `cron-builder` | Cron Expression Builder | 15K–40K | Medium | ★★★★☆ |

Referenced in [`05-seo-programmatic-pages.md`](../05-seo-programmatic-pages.md) as internal link target from JSON/CSV cluster but not yet built.

---

## 1. Regex Tester (Build First)

**Path:** `/developer-tools/formatters-validators/regex-tester/`  
**Component:** `RegexTesterTool`

### Why first
- Daily dev utility; strong backlink potential from tutorials
- AI tools struggle with live match highlighting + capture groups
- No new dependencies (native `RegExp`)

### Features
- Pattern input with flags toggle (g, i, m, s, u)
- Test string input
- Match highlighting in output panel
- Match list: full match, index, capture groups
- Common pattern library (email, URL, phone, date) as insert chips
- Explain flags in tooltip
- Error display for invalid regex

### Logic
```typescript
// logic/regex-tester.ts
type RegexTestResult = {
  ok: true;
  matches: { match: string; index: number; groups: string[] }[];
} | { ok: false; error: string };
```

### Related tools
- `json-validator`, `json-formatter`, `html-encode`

---

## 2. JWT Decoder (Build Second)

**Path:** `/developer-tools/encoders-decoders/jwt-decoder/`  
**Component:** `JwtDecoderTool`

### Why second
- Low effort, high utility
- Complements encoders/decoders subcategory
- Client-side only (decode, never verify signature in v1)

### Features
- Paste JWT string
- Split header / payload / signature sections
- JSON pretty-print header and payload
- Highlight `exp`, `iat`, `nbf` as human-readable dates
- Algorithm display from header
- Warning: “Signature not verified — for debugging only”

### Logic
```typescript
// Base64url decode header + payload
// No crypto verification in v1 (optional Phase 5 with Web Crypto)
```

### Security note
- Never send tokens to server
- Display prominent “do not paste production secrets in untrusted tools” (we run client-side — turn into trust message)

### Related tools
- `base64-decode`, `json-formatter`, `hash-generator`

---

## 3. CSV to HTML Table (Build Third)

**Path:** `/developer-tools/data-converters/csv-to-html-table/`  
**Component:** `CsvToHtmlTableTool`

### Why third
- Explicitly referenced in SEO doc internal linking plan
- Natural sibling of JSON/CSV cluster
- Useful for bloggers, email devs, quick previews

### Features
- Paste CSV or upload `.csv` file (FileDropZone)
- Delimiter auto-detect or manual select
- Header row toggle
- Output: styled HTML table snippet
- Options: striped rows, border, class name, id attribute
- Copy HTML / preview rendered table inline
- Optional: responsive wrapper div

### Logic
- Reuse CSV parsing from `csv-to-json` logic
- Generate escaped HTML cells

### Related tools
- `csv-to-json`, `json-to-csv`, `markdown-to-html`

---

## 4. Cron Expression Builder (Build Fourth)

**Path:** `/developer-tools/generators/cron-builder/`  
**Component:** `CronBuilderTool`

### Why fourth
- Slightly more UI complexity (schedule widgets)
- Strong niche intent (“cron expression generator”)
- DevOps audience shares tool links

### Features
- Visual builder: minute, hour, day of month, month, day of week
- Presets: every minute, hourly, daily midnight, weekly, monthly
- Live cron string output (standard 5-field Unix cron)
- Human-readable description (“At 09:30 AM, Monday through Friday”)
- Reverse mode: paste cron → explain (optional v1.1)
- Copy button

### Logic
```typescript
// logic/cron-builder.ts
// Map UI selections to cron fields
// Validate field ranges
```

### Related tools
- `uuid-generator`, `hash-generator`, `json-formatter`

---

## Phase A3: JSON/CSV Pro Upgrade (Developer Cluster Anchor)

Runs in Phase A before Phase B dev tools. Enhances existing bespoke tools:

| Enhancement | json-to-csv | csv-to-json |
|-------------|-------------|-------------|
| File drop (FileDropZone) | ✓ | ✓ |
| Flatten nested objects | ✓ | — |
| Excel UTF-8 BOM option | ✓ | — |
| Column reorder | ✓ | — |
| NDJSON support | ✓ | — |
| Type inference toggle | — | ✓ |
| Header row detect | — | ✓ |

---

## Additional Dev Tools (Phase C backlog)

| Tool | Volume | Notes |
|------|--------|-------|
| JSON Schema Validator | 10K–30K | Extends json-validator |
| Password generator | 400K+ | Separate security subcategory |
| Number base converter | 10K+ | Binary/hex/octal |
| Diff checker (upgrade text-diff) | 20K+ | Side-by-side |

---

## Registry & Subcategory Updates

Add to existing subcategories (no new subcategory required):

| Tool | Subcategory |
|------|-------------|
| regex-tester | formatters-validators |
| jwt-decoder | encoders-decoders |
| csv-to-html-table | data-converters |
| cron-builder | generators |

---

## Test Requirements

Each tool needs `src/lib/tools/logic/*.test.ts`:

- Regex: valid/invalid patterns, capture groups, global flag
- JWT: well-formed token, expired exp display, malformed input
- CSV-to-HTML: escaping `<>&"`, empty cells, quoted commas
- Cron: preset mappings, invalid ranges

---

## SEO Keywords (primary)

| Tool | Primary keyword |
|------|-----------------|
| regex-tester | `regex tester`, `regular expression tester online` |
| jwt-decoder | `jwt decoder`, `decode jwt token online` |
| csv-to-html-table | `csv to html table`, `csv to html converter` |
| cron-builder | `cron expression generator`, `cron builder online` |

---

## Build Sequence

```
Phase A3: JSON/CSV Pro upgrade
    ↓
Phase B: jwt-decoder (quick win)
    ↓
Phase B: csv-to-html-table (cluster link)
    ↓
Phase B: regex-tester (highest engagement)
    ↓
Phase B: cron-builder
```

Estimated total: 4–5 dev days for Phase B tools after shared FileDropZone pattern exists.
