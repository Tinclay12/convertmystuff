# Rental Property Deal Analyzer — Tool Spec

**Tool ID:** `rental-deal-analyzer`  
**Path:** `/real-estate-calculators/investment-metrics/rental-deal-analyzer/`  
**Component:** `RentalDealAnalyzerTool`  
**Execution:** Client-side  
**Schema:** `Calculator`  
**Status:** Planned (Phase A1)

---

## Purpose

Analyze a rental property investment in one workflow: income, expenses, financing, and return metrics together. This is **materially distinct** from single-metric calculators (cap rate, NOI, DSCR) because it solves the full “should I buy this deal?” task.

---

## Target Keywords

Primary: `rental property analyzer`, `rental deal analyzer`, `investment property calculator`  
Secondary: `rental cash flow calculator`, `real estate deal analyzer`, `rental property ROI calculator`

---

## Input Sections

### 1. Property & Purchase

| Field | Key | Type | Default | Validation |
|-------|-----|------|---------|------------|
| Purchase price | `purchasePrice` | currency | — | > 0 |
| Closing costs | `closingCosts` | currency | 0 | ≥ 0 |
| Rehab / capex | `rehabCosts` | currency | 0 | ≥ 0 |
| Square footage | `squareFeet` | number | optional | ≥ 0 |

### 2. Income

| Field | Key | Type | Default | Validation |
|-------|-----|------|---------|------------|
| Gross monthly rent | `grossMonthlyRent` | currency | — | ≥ 0 |
| Other monthly income | `otherMonthlyIncome` | currency | 0 | ≥ 0 |
| Vacancy rate | `vacancyRate` | percent | 5 | 0–100 |
| Annual rent growth | `rentGrowthRate` | percent | 0 | optional |

### 3. Operating Expenses (monthly)

| Field | Key | Type | Default |
|-------|-----|------|---------|
| Property tax (monthly) | `propertyTax` | currency | 0 |
| Insurance | `insurance` | currency | 0 |
| HOA | `hoa` | currency | 0 |
| Maintenance / repairs | `maintenance` | currency | 0 |
| Property management | `management` | currency | 0 |
| Utilities (owner-paid) | `utilities` | currency | 0 |
| Other expenses | `otherExpenses` | currency | 0 |
| **Or:** Expense ratio shortcut | `expenseRatio` | percent | optional — overrides line items if set |

### 4. Financing

| Field | Key | Type | Default | Validation |
|-------|-----|------|---------|------------|
| Down payment | `downPayment` | currency | — | ≥ 0, ≤ purchase price |
| Loan amount | `loanAmount` | computed | purchase − down | — |
| Interest rate | `interestRate` | percent | 6.5 | ≥ 0 |
| Loan term | `termYears` | years | 30 | > 0 |
| Interest-only toggle | `interestOnly` | boolean | false | — |

### 5. Cash Invested (for CoC)

| Field | Key | Type | Default |
|-------|-----|------|---------|
| Total cash invested | `totalCashInvested` | computed | down + closing + rehab |

---

## Calculations

Reuse and compose existing logic from [`real-estate-calculators.ts`](../../src/lib/tools/logic/real-estate-calculators.ts) and [`cap-rate-calculator.ts`](../../src/lib/tools/logic/cap-rate-calculator.ts):

```
grossAnnualIncome = (grossMonthlyRent + otherMonthlyIncome) × 12
vacancyLoss = grossAnnualIncome × (vacancyRate / 100)
effectiveGrossIncome = grossAnnualIncome − vacancyLoss

monthlyOpEx = sum of expense line items OR (effectiveGrossIncome/12 × expenseRatio)
annualOpEx = monthlyOpEx × 12

NOI = effectiveGrossIncome − annualOpEx
capRate = NOI / purchasePrice × 100

monthlyDebtService = mortgage payment (P&I or interest-only)
annualDebtService = monthlyDebtService × 12

annualCashFlow = NOI − annualDebtService
monthlyCashFlow = annualCashFlow / 12

cashOnCash = annualCashFlow / totalCashInvested × 100

DSCR = NOI / annualDebtService  (if debt service > 0)

GRM = purchasePrice / grossAnnualIncome  (if rent > 0)

LTV = loanAmount / purchasePrice × 100

pricePerSqFt = purchasePrice / squareFeet  (if sqft provided)

breakEvenOccupancy = (annualOpEx + annualDebtService) / grossAnnualIncome × 100
```

---

## Output Dashboard

### Primary metric cards (above fold)

| Card | Value | Benchmark hint |
|------|-------|----------------|
| Monthly cash flow | `$X,XXX` | Green if > 0, red if < 0 |
| Cap rate | `X.XX%` | Compare to property type benchmark |
| Cash-on-cash return | `X.XX%` | Compare to 8–12% target range |
| DSCR | `X.XX` | “Lenders often want ≥ 1.20–1.25” |

### Secondary breakdown table

- Effective gross income
- Total operating expenses
- NOI
- Annual debt service
- Annual / monthly cash flow
- Total cash invested
- GRM, LTV, price per sq ft (when applicable)
- Break-even occupancy

### Benchmark cards (contextual, not personalized advice)

| Property type | Typical cap rate range |
|---------------|------------------------|
| Class A multifamily | 4–6% |
| Class B/C multifamily | 6–9% |
| Single-family rental | 5–8% |
| Small commercial | 6–10% |

Display disclaimer: “Benchmarks are illustrative market ranges, not predictions.”

---

## Modes (tabs or toggle)

1. **Analyze deal** — Default; inputs above → full dashboard
2. **Required rent** — Target monthly cash flow OR target DSCR → solve minimum rent
3. **Max offer price** — Target cap rate + known rent/expenses → max purchase price

Each mode is a **distinct workflow** worth separate how-to content; all share one page with mode selector.

---

## URL State (shareable links)

Use [`url-state.ts`](../../src/lib/tools/url-state.ts):

```
/real-estate-calculators/investment-metrics/rental-deal-analyzer/?purchasePrice=350000&downPayment=70000&grossMonthlyRent=2800&vacancyRate=5&interestRate=6.5&termYears=30
```

- Encode numeric inputs only (no PII)
- On mount: hydrate form from search params
- “Copy share link” button updates URL via `history.replaceState`
- Canonical URL remains path without params (per SEO rules)

---

## Related Tools

Link prominently to:

- `cap-rate-calculator` — “Cap rate only”
- `noi-calculator` — “NOI only”
- `dscr-calculator` — “DSCR only”
- `cash-on-cash-calculator` — “CoC only”
- `mortgage-calculator-pro` — “Full amortization”
- `loan-to-value-calculator`
- `grm-calculator`
- `price-per-square-foot`

Reverse links: update generic RE calculator pages to link back to deal analyzer.

---

## UI Structure

```
┌─────────────────────────────────────────────────┐
│ Property & Purchase │ Income │ Expenses │ Finance│  ← section tabs or accordion
├─────────────────────────────────────────────────┤
│ [Calculate] [Reset] [Copy share link]           │
├─────────────────────────────────────────────────┤
│  Cash Flow   │  Cap Rate  │  CoC   │  DSCR     │  ← metric cards
├─────────────────────────────────────────────────┤
│ Full breakdown table                            │
├─────────────────────────────────────────────────┤
│ Benchmark comparison cards                      │
└─────────────────────────────────────────────────┘
```

Mobile: stack sections vertically; metric cards 2×2 grid.

---

## SEO Content Requirements

- **Examples:** 3 worked deals (SFH positive cash flow, marginal multifamily, all-cash high cap rate)
- **Formula block:** NOI, cap rate, CoC, DSCR with definitions
- **Assumptions:** Pre-debt vs post-debt metrics; vacancy applied to gross income; excludes depreciation/tax
- **FAQs (10+):** What is a good cap rate? What DSCR do lenders require? Does this include mortgage? etc.
- **Disclaimer:** Not financial, tax, or legal advice

---

## Premium Hooks (future, not gated at launch)

- Branded PDF deal summary export
- Save scenario templates (requires Phase 4 accounts)
- Compare two deals side-by-side

---

## Files to Create

| File | Role |
|------|------|
| `src/lib/tools/logic/rental-deal-analyzer.ts` | Pure calculation logic |
| `src/lib/tools/logic/rental-deal-analyzer.test.ts` | Unit tests |
| `src/tools/RentalDealAnalyzerTool.tsx` | UI component |
| `src/lib/tools/registry-planned.ts` | Stub until shipped |
| Registry live entry | Full metadata when published |

---

## Acceptance Criteria

- [ ] All metrics match hand-calculated examples in tests
- [ ] URL share link round-trips all primary inputs
- [ ] Works offline after first load (client-only)
- [ ] Mobile layout usable at 375px width
- [ ] Related tools grid includes 6+ cluster links
- [ ] `trackFlagshipEvent('deal_analyzed', { toolId })` fires on calculate
