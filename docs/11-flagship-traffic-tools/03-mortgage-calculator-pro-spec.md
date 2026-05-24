# Mortgage Calculator Pro — Tool Spec

**Tool ID:** `mortgage-calculator-pro`  
**Path:** `/finance-calculators/loans-payments/mortgage-calculator-pro/`  
**Component:** `MortgageCalculatorProTool`  
**Execution:** Client-side  
**Schema:** `Calculator`  
**Status:** Planned (Phase A2)

Note: A basic `mortgage-calculator` exists under real-estate-calculators (3 fields, payment only). This flagship lives in **finance-calculators** as the cluster anchor and links to the RE mortgage tool as a simplified sibling.

---

## Purpose

Full mortgage analysis: monthly PITI payment, amortization schedule, total interest, extra payment modeling, and affordability reverse-solve. Materially distinct from the generic `loan-payment-calculator` (amount + rate + term → one line of output).

---

## Target Keywords

Primary: `mortgage calculator`, `mortgage payment calculator`, `home loan calculator`  
Secondary: `amortization calculator`, `mortgage affordability calculator`, `PITI calculator`, `extra mortgage payment calculator`

---

## Modes

### Mode 1: Payment Calculator (default)

**Inputs:**

| Field | Key | Type | Default |
|-------|-----|------|---------|
| Home price | `homePrice` | currency | — |
| Down payment | `downPayment` | currency or % toggle | 20% |
| Loan amount | `loanAmount` | computed | home − down |
| Interest rate | `interestRate` | percent | 6.5 |
| Loan term | `termYears` | 15 / 20 / 30 select | 30 |
| Start date | `startDate` | date | today |
| Property tax (annual) | `propertyTaxAnnual` | currency | 0 |
| Home insurance (annual) | `insuranceAnnual` | currency | 0 |
| PMI (monthly) | `pmiMonthly` | currency | auto if LTV > 80% |
| HOA (monthly) | `hoaMonthly` | currency | 0 |

**Outputs:**

| Output | Description |
|--------|-------------|
| Principal & interest | Standard amortization formula |
| Monthly property tax | annual / 12 |
| Monthly insurance | annual / 12 |
| PMI | if applicable |
| HOA | as entered |
| **Total monthly (PITI+HOA)** | Sum |
| Total interest over life | Sum of interest payments |
| Total cost | Principal + total interest |
| Payoff date | From start date + term |
| LTV | loan / home price |

### Mode 2: Amortization Schedule

- Table: payment #, date, payment, principal, interest, balance
- Show first 12 rows + “show all” expand (virtualize if > 360 rows)
- Optional: mini chart of principal vs interest over time (CSS bars, no chart lib required)
- Export: Download CSV of full schedule

### Mode 3: Extra Payments

Additional inputs:

| Field | Key | Type |
|-------|-----|------|
| Extra monthly payment | `extraMonthly` | currency |
| One-time lump sum | `lumpSum` | currency |
| Lump sum at month | `lumpSumMonth` | number |

Outputs:

- New payoff date
- Interest saved
- Months saved
- Side-by-side: with vs without extra payments

### Mode 4: Affordability (reverse solve)

**Inputs:**

| Field | Key | Type |
|-------|-----|------|
| Annual gross income | `annualIncome` | currency |
| Monthly debts | `monthlyDebts` | currency |
| Target DTI | `targetDti` | percent (default 36) |
| Down payment available | `downPaymentAvailable` | currency |
| Interest rate | `interestRate` | percent |
| Term | `termYears` | years |
| Estimated tax + insurance + HOA | `estimatedEscrow` | currency/mo |

**Outputs:**

- Max affordable monthly payment
- Max loan amount
- Max home price (loan + down payment)
- Actual DTI at max price

---

## Core Formulas

```typescript
// Monthly P&I (standard amortization)
monthlyRate = annualRate / 100 / 12
n = termYears * 12
payment = loanAmount * (monthlyRate * (1 + monthlyRate)^n) / ((1 + monthlyRate)^n - 1)
// If monthlyRate === 0: payment = loanAmount / n

// Amortization row i
interest_i = balance_{i-1} * monthlyRate
principal_i = payment - interest_i
balance_i = balance_{i-1} - principal_i

// PMI auto (optional heuristic)
if (downPayment / homePrice < 0.20) {
  pmiMonthly = (loanAmount * 0.005) / 12  // ~0.5% annual, user-editable
}

// Affordability
maxMonthlyPayment = (annualIncome / 12 * targetDti / 100) - monthlyDebts - estimatedEscrow
// Reverse-solve loan amount from maxMonthlyPayment using payment formula
```

Logic module: `src/lib/tools/logic/mortgage-calculator-pro.ts`

---

## URL State

```
/finance-calculators/loans-payments/mortgage-calculator-pro/?homePrice=450000&downPayment=90000&interestRate=6.5&termYears=30&mode=payment
```

Supported params: `mode`, `homePrice`, `downPayment`, `interestRate`, `termYears`, `propertyTaxAnnual`, `insuranceAnnual`, `extraMonthly`

---

## Related Tools

- `loan-payment-calculator` — Simple loan (any purpose)
- `compound-interest-calculator`
- `rental-deal-analyzer` — Investment property financing section
- Real estate `mortgage-calculator` — Quick payment estimate
- `loan-to-value-calculator`

---

## UI Structure

```
┌──────────────────────────────────────────┐
│ [Payment] [Amortization] [Extra] [Afford]│  ← mode tabs
├──────────────────────────────────────────┤
│ Input form (mode-specific)               │
├──────────────────────────────────────────┤
│ PITI breakdown cards                     │
│  P&I │ Tax │ Ins │ PMI │ HOA │ Total    │
├──────────────────────────────────────────┤
│ Amortization table / affordability result│
├──────────────────────────────────────────┤
│ [Copy share link] [Download CSV]         │
└──────────────────────────────────────────┘
```

---

## SEO Content

- **Examples:** $350K home 20% down 30yr; $500K with extra $200/mo; affordability at $120K income
- **Formula:** Standard mortgage payment formula with variable definitions
- **Assumptions:** PMI estimate is illustrative; taxes vary by jurisdiction
- **FAQs (10+):** What is PITI? How is PMI calculated? 15 vs 30 year? How much house can I afford?
- **Monetization:** Contextual mortgage/refinance affiliate placeholders (no gate on results)

---

## Relationship to Existing Tools

| Existing tool | Action |
|---------------|--------|
| `loan-payment-calculator` (finance) | **Keep** — generic loans (auto, personal) |
| `mortgage-calculator` (real-estate) | **Keep** — quick RE-cluster link; add banner “Need full PITI + amortization? → Pro” |
| New `mortgage-calculator-pro` | **Add** — finance cluster flagship |

---

## Premium Hooks (future)

- PDF amortization report with branding
- Save scenarios
- Rate comparison table (affiliate API)

---

## Files to Create

| File | Role |
|------|------|
| `src/lib/tools/logic/mortgage-calculator-pro.ts` | Logic + amortization generator |
| `src/lib/tools/logic/mortgage-calculator-pro.test.ts` | Tests with known amortization values |
| `src/tools/MortgageCalculatorProTool.tsx` | UI |
| Registry entry | finance-calculators / loans-payments |

---

## Acceptance Criteria

- [ ] Payment matches bank-style calculators within $0.01 for standard inputs
- [ ] Amortization sum of principal equals loan amount
- [ ] Extra payment mode reduces term correctly (test against known scenarios)
- [ ] Affordability reverse-solve is consistent with forward payment calc
- [ ] CSV export downloads valid file
- [ ] URL state round-trip for mode 1 inputs
- [ ] `trackFlagshipEvent('mortgage_calculated', { mode })` on calculate
