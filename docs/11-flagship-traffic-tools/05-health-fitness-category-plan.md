# Health & Fitness Category Plan — Phase B

**Status:** Planned for Phase B (after Phase A flagships)  
**New category slug:** `health-fitness-calculators`  
**Priority:** 13 (after kitchen-recipe-tools)

---

## Why Add This Category

- BMI, calorie, and macro calculators drive **300K–800K monthly searches** each (evergreen, high engagement)
- Mostly **client-side** — fits architecture rules
- Low overlap with existing 12 categories
- Strong internal linking potential (BMI ↔ ideal weight ↔ calorie ↔ macro)
- Medical disclaimers manage liability without blocking utility

---

## Category Definition

```typescript
{
  id: "health-fitness-calculators",
  title: "Health & Fitness Calculators",
  slug: "health-fitness-calculators",
  path: "/health-fitness-calculators/",
  description: "Calculate BMI, daily calories, macros, and fitness metrics in your browser.",
  metaTitle: "Health & Fitness Calculators - BMI, Calories, and Macros",
  metaDescription:
    "Free health calculators for BMI, daily calorie needs, and macronutrient targets. Private, instant, no login.",
  priority: 13,
}
```

---

## Subcategories

| Subcategory slug | Title | Tools |
|------------------|-------|-------|
| `body-metrics` | Body Metrics | BMI, ideal weight, body fat estimator |
| `nutrition` | Nutrition | Calorie, macro, TDEE |
| `fitness` | Fitness | Target heart rate, protein intake *(Phase C)* |

Launch Phase B with **body-metrics** and **nutrition** only (3 flagships).

---

## Phase B Flagship Tools (3)

### 1. BMI Calculator (`bmi-calculator`)

**Path:** `/health-fitness-calculators/body-metrics/bmi-calculator/`

**Inputs:**
- Height (ft/in or cm toggle)
- Weight (lbs or kg toggle)
- Optional: age, sex (for context text only—not diagnostic)

**Outputs:**
- BMI value (1 decimal)
- Category: Underweight / Normal / Overweight / Obese (WHO ranges)
- Visual range bar showing position on scale
- Healthy weight range for entered height

**Higher-level features:**
- Unit toggles (US / metric)
- URL state: `?heightCm=175&weightKg=70`
- Share link button
- **Not** a generic 2-field form — include visual scale + healthy range

**Keywords:** `bmi calculator`, `body mass index calculator`, `calculate bmi`

---

### 2. Calorie Calculator (`calorie-calculator`)

**Path:** `/health-fitness-calculators/nutrition/calorie-calculator/`

**Inputs:**
- Age, sex, height, weight
- Activity level (sedentary → extra active)
- Goal: lose / maintain / gain weight
- Optional: target weekly change (lbs/kg per week)

**Outputs:**
- BMR (Mifflin-St Jeor)
- TDEE (maintenance calories)
- Target daily calories for selected goal
- Safe minimum calorie warning if target too low

**Formula:**
```
BMR (male) = 10×weight(kg) + 6.25×height(cm) − 5×age + 5
BMR (female) = 10×weight(kg) + 6.25×height(cm) − 5×age − 161
TDEE = BMR × activityMultiplier
Target = TDEE ± (weeklyChange × 3500 / 7)  // caloric deficit/surplus
```

**Keywords:** `calorie calculator`, `tdee calculator`, `daily calorie intake calculator`

---

### 3. Macro Calculator (`macro-calculator`)

**Path:** `/health-fitness-calculators/nutrition/macro-calculator/`

**Inputs:**
- Daily calorie target (or link from calorie calculator via URL param)
- Diet style preset: balanced / low-carb / high-protein / keto / custom
- Custom protein/carbs/fat percentages if selected

**Outputs:**
- Grams per day: protein, carbs, fat
- Calories from each macro
- Visual pie/bar breakdown
- Per-meal split (optional: 3 or 4 meals)

**Keywords:** `macro calculator`, `macronutrient calculator`, `protein carb fat calculator`

---

## Internal Linking Cluster

```
bmi-calculator ←→ ideal-weight-calculator (Phase C)
       ↓
calorie-calculator ←→ macro-calculator
       ↓
kitchen-recipe-tools (recipe-scaler, serving-calculator)
```

Cross-link from homepage category grid and `/tools/` index.

---

## SEO & Compliance

### Required on every health tool page

- **Disclaimer:** “For informational purposes only. Not medical advice. Consult a healthcare provider before changing diet or exercise.”
- No diagnostic claims (“you are healthy/unhealthy”)
- Cite formula sources in `sourceNotes` (Mifflin-St Jeor, WHO BMI categories)
- Unique examples per tool (not templated swaps)

### Avoid

- Disease-specific calculators without medical review (defer)
- Weight loss promises in meta descriptions
- Indexed BMI “for age X” numeric variation pages

---

## Component Architecture

All three use bespoke components:

| Tool | Component | Logic module |
|------|-----------|--------------|
| BMI | `BmiCalculatorTool` | `logic/bmi-calculator.ts` |
| Calorie | `CalorieCalculatorTool` | `logic/calorie-calculator.ts` |
| Macro | `MacroCalculatorTool` | `logic/macro-calculator.ts` |

Shared UI primitives:
- `UnitSystemToggle` (metric / US)
- `ResultGauge` (visual range bar)
- `MacroBreakdownChart` (CSS-only bars)

---

## Registry Files to Create

- `src/lib/tools/registry-live-health-fitness.ts`
- Update `src/lib/tools/registry.ts` to import
- `src/lib/tools/categories.ts` — add category
- `src/lib/tools/subcategories.ts` — add subcategories
- `src/lib/seo/sitemaps.ts` — include new section

---

## Phase C Extensions (not Phase B)

| Tool | Est. volume | Notes |
|------|-------------|-------|
| Ideal weight calculator | 100K+ | Devine formula |
| Body fat estimator (Navy method) | 50K+ | Requires measurements |
| Target heart rate | 50K+ | Age-based zones |
| Water intake calculator | 30K+ | Simple daily estimate |

---

## Success Metrics (90 days)

| Tool | Impression target | Engagement target |
|------|-------------------|-------------------|
| BMI | 5,000/mo | > 1.5 min |
| Calorie | 3,000/mo | > 2 min |
| Macro | 2,000/mo | > 2 min |

---

## Build Order within Phase B

1. Category + subcategory hubs (empty state OK with 3 tools)
2. BMI calculator (simplest; validates category plumbing)
3. Calorie calculator (feeds macro via URL param)
4. Macro calculator (completes nutrition cluster)
5. Homepage + cross-links from kitchen/finance categories
