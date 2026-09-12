import type { ToolContentEnrichment } from "@/lib/content/types";

export const rentalDealAnalyzerContent: ToolContentEnrichment = {
  contentTier: "C",
  guideSlug: "rental-deal-analysis-basics",
  resourceSlugs: [
    "real-estate-calculators/what-is-noi",
    "real-estate-calculators/cash-on-cash-return-explained",
  ],
  contentBlocks: [
    {
      id: "vs-single-metric",
      title: "When to use the full analyzer",
      variant: "info",
      paragraphs: [
        "Single-metric calculators like cap rate or NOI answer one question at a time. This dashboard combines income, expenses, financing, and return metrics so you can screen a rental deal without switching tools.",
        "Use cap rate for unlevered yield comparisons. Use cash-on-cash and DSCR when financing matters.",
      ],
      linkedToolIds: ["cap-rate-calculator", "noi-calculator", "dscr-calculator"],
    },
    {
      id: "share-analysis",
      title: "Share assumptions with partners",
      variant: "tip",
      paragraphs: [
        "Copy the share link to save your inputs in the URL. Partners can adjust vacancy, rent, or down payment and compare scenarios side by side.",
      ],
    },
    {
      id: "expenses-people-miss",
      title: "The expenses that get left out",
      variant: "warning",
      paragraphs: [
        "Most optimistic models are optimistic in the same places. Taxes and insurance are usually remembered; what goes missing is capital expenditure, and it is the largest omission by a wide margin. Roofs, water heaters, HVAC, flooring, and appliances all have finite lives, and a property that needs a roof every twenty years owes something toward it every month whether or not you set it aside.",
        "Capex is not the same line as repairs. Repairs are the leaking tap and the broken lock; capex is the replacement of a whole component. Modelling them together tends to hide both, because a year with no repairs reads as a year with no cost.",
        "Vacancy is a cost even in strong markets — turnover means cleaning, listing time, and at least a few empty weeks between tenants. Also budget for whatever you are not doing yourself: management if you will not take calls at midnight, landscaping, snow, pest control, and the accounting the property now generates.",
      ],
      linkedToolIds: ["noi-calculator", "cash-on-cash-calculator"],
    },
    {
      id: "setting-assumptions",
      title: "Setting the assumptions honestly",
      variant: "info",
      paragraphs: [
        "The 50% rule is the usual sanity check: operating expenses, excluding mortgage payments, tend to land near half of gross rent across a full hold period. It is a screening heuristic rather than a forecast, but if your own numbers come out far below it, the gap is usually capex or vacancy rather than an unusually efficient property.",
        "Vacancy is commonly modelled at 5–8% of gross rent, adjusted for local conditions and tenant turnover. Management, where used, typically runs 8–10% of collected rent plus a placement fee. Maintenance and capex reserves are often modelled as percentages of rent, or as a per-unit annual figure for older buildings.",
        "Use actual figures wherever they exist. Request the seller's operating statements, verify taxes against the county record rather than the listing — assessments frequently reset on sale — and price insurance by quote, since a broker's estimate on a coastal or older property can be out by a wide margin.",
      ],
    },
    {
      id: "reading-the-output",
      title: "Reading the metrics together",
      variant: "info",
      paragraphs: [
        "No single number decides a deal, and each of these answers a different question. Cap rate strips out financing entirely, which makes it the right tool for comparing properties but the wrong one for judging what you will actually earn. Cash-on-cash divides annual pre-tax cash flow by the cash you actually put in, so it responds sharply to down payment and rate.",
        "DSCR is NOI divided by annual debt service, and it is primarily the lender's metric: commercial lenders commonly want 1.20–1.25 or better, meaning income exceeds the payment by a comfortable margin. A deal can show an attractive cash-on-cash return and still fail underwriting on DSCR.",
        "Watch how the metrics move when you change one input. If a deal only works at 3% vacancy and zero capex, the model is telling you the margin is thin rather than that the deal is good. Run the pessimistic case before the optimistic one — it is the version that reveals what you are actually exposed to.",
      ],
      linkedToolIds: ["cap-rate-calculator", "dscr-calculator", "roi-calculator"],
    },
  ],
  additionalFaqs: [
    {
      question: "What is the 50% rule?",
      answer:
        "A screening heuristic that operating expenses, excluding the mortgage, tend toward half of gross rent over a full hold period. It is useful for sanity-checking a model rather than for forecasting — if your own figures come in far lower, the difference is usually unbudgeted capex or vacancy.",
    },
    {
      question: "Should capex and repairs be separate lines?",
      answer:
        "Yes. Repairs are ongoing small fixes; capex is replacing whole components like a roof or an HVAC system. Combined, they tend to hide each other, and a quiet year reads as a costless one when a replacement is still accruing.",
    },
    {
      question: "What DSCR do lenders look for?",
      answer:
        "Commercial lenders commonly want 1.20–1.25 or higher, meaning net operating income exceeds annual debt service by that multiple. Requirements vary by lender, property type, and market, so treat it as a screening threshold rather than a fixed rule.",
    },
    {
      question: "Why does cap rate ignore my mortgage?",
      answer:
        "By design — cap rate measures the property's unlevered yield so two properties can be compared independently of how each is financed. To see what your financing does to returns, read cash-on-cash and DSCR alongside it.",
    },
  ],
};
