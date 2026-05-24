import type { ToolDefinition } from "./types";
import { buildLiveTool, faq } from "./registry-live-helpers";

export const realEstateLiveTools: ToolDefinition[] = [
  buildLiveTool({
    id: "rental-deal-analyzer",
    slug: "rental-deal-analyzer",
    title: "Rental Property Deal Analyzer",
    category: "real-estate-calculators",
    subcategory: "investment-metrics",
    shortDescription:
      "Analyze rental deals with cap rate, cash flow, DSCR, and cash-on-cash in one dashboard.",
    metaTitle: "Rental Property Deal Analyzer - Investment Property Calculator",
    metaDescription:
      "Analyze rental property deals online. Calculate cap rate, monthly cash flow, DSCR, cash-on-cash return, and NOI in one free dashboard.",
    keywords: [
      "rental property analyzer",
      "rental deal analyzer",
      "investment property calculator",
      "rental cash flow calculator",
    ],
    relatedTools: [
      "cap-rate-calculator",
      "noi-calculator",
      "dscr-calculator",
      "cash-on-cash-calculator",
      "mortgage-calculator-pro",
    ],
    componentKey: "RentalDealAnalyzerTool",
    schemaType: "Calculator",
    priority: 1,
    formula:
      "NOI = effective gross income − operating expenses; cap rate = NOI ÷ price; CoC = annual cash flow ÷ cash invested; DSCR = NOI ÷ debt service",
    explanation:
      "Run a full rental deal analysis in one place: income, expenses, financing, and return metrics together instead of jumping between single-metric calculators.",
    howToUse: [
      "Enter purchase price, down payment, and closing or rehab costs.",
      "Add gross rent, vacancy rate, and monthly operating expenses.",
      "Set loan rate and term, then click Analyze deal.",
      "Review cash flow, cap rate, cash-on-cash, and DSCR with a full breakdown table.",
    ],
    examples: [
      {
        title: "Single-family rental",
        input: "$350K purchase, $70K down, $2,800/mo rent, 5% vacancy, 6.5% rate",
        output: "Monthly cash flow, cap rate ~5–7%, DSCR, and CoC in dashboard",
        explanation: "Typical leveraged SFR screening scenario.",
      },
    ],
    faqs: [
      faq("What is a good DSCR?", "Many lenders prefer 1.20–1.25 or higher for investment property loans."),
      faq("Does this include mortgage?", "Yes. Cash flow is after debt service; cap rate is before financing."),
      faq("Can I share my analysis?", "Use Copy share link to save inputs in the URL."),
      faq("Is this financial advice?", "No. Estimates only for educational screening."),
    ],
    commonUseCases: [
      "Screen rental acquisitions before underwriting",
      "Compare leveraged vs all-cash scenarios",
      "Share deal assumptions with partners",
    ],
    assumptions: [
      "Operating expenses are monthly line items unless an expense ratio is used.",
      "Debt service uses standard amortization unless interest-only is selected.",
    ],
    sourceNotes: [
      "Cap rate and DSCR are standard commercial real estate metrics.",
      "Pair with the cap rate or NOI calculators for single-metric checks.",
    ],
  }),
  buildLiveTool({
    id: "cash-on-cash-calculator",
    slug: "cash-on-cash-calculator",
    title: "Cash-on-Cash Return Calculator",
    category: "real-estate-calculators",
    subcategory: "investment-metrics",
    shortDescription: "Estimate cash-on-cash return from annual cash flow and total cash invested.",
    metaTitle: "Cash-on-Cash Return Calculator - Rental Property ROI",
    metaDescription:
      "Calculate cash-on-cash return for rental properties. Enter annual pre-tax cash flow and total cash invested for an instant percentage estimate.",
    keywords: ["cash on cash calculator", "cash on cash return", "rental property return"],
    relatedTools: ["cap-rate-calculator", "roi-calculator", "mortgage-calculator"],
    componentKey: "GenericRealEstateCalculatorTool",
    schemaType: "Calculator",
    formula: "cash-on-cash return = (annual pre-tax cash flow ÷ total cash invested) × 100",
    explanation:
      "Measure how much cash income a property generates relative to the cash you invested upfront. Commonly used to compare rental acquisitions and refinance scenarios.",
    howToUse: [
      "Enter annual pre-tax cash flow after debt service and operating expenses.",
      "Enter total cash invested including down payment, closing costs, and rehab.",
      "Review the cash-on-cash percentage and compare with other investments.",
    ],
    examples: [
      {
        title: "Single-family rental",
        input: "Annual cash flow: $12,000, Cash invested: $100,000",
        output: "Cash-on-cash return: 12.00%",
        explanation: "12,000 ÷ 100,000 × 100 = 12% cash-on-cash return.",
      },
    ],
    faqs: [
      faq("Is this financial advice?", "No. This calculator provides a basic estimate for educational purposes only."),
      faq("Should I include closing costs?", "Yes. Total cash invested should reflect all out-of-pocket acquisition costs."),
      faq("How is this different from cap rate?", "Cap rate ignores financing. Cash-on-cash reflects leverage and actual cash invested."),
    ],
    commonUseCases: [
      "Compare rental property acquisitions",
      "Evaluate refinance and cash-out scenarios",
      "Screen deals before deeper underwriting",
    ],
    assumptions: [
      "Annual cash flow is pre-tax and after debt service.",
      "Total cash invested includes down payment and upfront costs.",
      "Output is an estimate only and not financial, tax, or investment advice.",
    ],
    sourceNotes: [
      "Cash-on-cash return measures annual cash flow against equity invested at purchase.",
      "Pair with the cap rate calculator to compare unlevered and levered returns.",
    ],
  }),
  buildLiveTool({
    id: "roi-calculator",
    slug: "roi-calculator",
    title: "ROI Calculator",
    category: "real-estate-calculators",
    subcategory: "investment-metrics",
    shortDescription: "Calculate return on investment from net gain and total cost.",
    metaTitle: "ROI Calculator - Real Estate Return on Investment",
    metaDescription:
      "Calculate ROI percentage from net gain and total cost. Free real estate investment return estimator with formula and disclaimer.",
    keywords: ["roi calculator", "return on investment", "real estate roi"],
    relatedTools: ["cap-rate-calculator", "cash-on-cash-calculator", "price-per-square-foot"],
    componentKey: "GenericRealEstateCalculatorTool",
    schemaType: "Calculator",
    formula: "ROI = (net gain ÷ total cost) × 100",
    explanation:
      "Estimate return on investment as a percentage of total cost. Useful for flips, hold-and-sell scenarios, and comparing project outcomes.",
    howToUse: [
      "Enter net gain after sale or project completion.",
      "Enter total cost including purchase, rehab, and carrying costs.",
      "Review ROI percentage and compare across deals.",
    ],
    examples: [
      {
        title: "Fix-and-flip outcome",
        input: "Net gain: $50,000, Total cost: $200,000",
        output: "ROI: 25.00%",
        explanation: "50,000 ÷ 200,000 × 100 = 25% ROI.",
      },
    ],
    faqs: [
      faq("What counts as total cost?", "Include purchase price, rehab, closing costs, taxes, insurance, and financing costs where applicable."),
      faq("Is ROI the same as IRR?", "No. ROI is a simple ratio; IRR accounts for timing of cash flows over time."),
      faq("Can I use this for annual returns?", "This version uses a single gain and cost snapshot, best for project-level outcomes."),
    ],
    commonUseCases: [
      "Evaluate fix-and-flip results",
      "Compare renovation scenarios",
      "Summarize project performance for investors",
    ],
    assumptions: [
      "Net gain and total cost are entered as final project values.",
      "Does not annualize returns or model holding period timing.",
      "Estimate only. Not financial, tax, or investment advice.",
    ],
    sourceNotes: [
      "Simple ROI formula: (Gain − Cost) ÷ Cost, expressed as gain over cost in this calculator.",
      "For income properties, also review cap rate and cash-on-cash metrics.",
    ],
  }),
  buildLiveTool({
    id: "mortgage-calculator",
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    category: "real-estate-calculators",
    subcategory: "lending-metrics",
    shortDescription: "Estimate monthly mortgage payment from loan amount, rate, and term.",
    metaTitle: "Mortgage Calculator - Monthly Payment Estimate",
    metaDescription:
      "Calculate estimated monthly mortgage payments from loan amount, interest rate, and term. Free P&I payment estimator with financial disclaimer.",
    keywords: ["mortgage calculator", "monthly payment calculator", "home loan calculator"],
    relatedTools: ["loan-to-value-calculator", "cap-rate-calculator", "property-tax-estimator"],
    componentKey: "GenericRealEstateCalculatorTool",
    schemaType: "Calculator",
    formula: "M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1], where P = loan amount, r = monthly rate, n = number of payments",
    explanation:
      "Estimate principal and interest payment for a fixed-rate mortgage. Helpful for affordability checks before making offers or comparing loan terms.",
    howToUse: [
      "Enter loan amount, annual interest rate, and term in years.",
      "Review the estimated monthly principal and interest payment.",
      "Add taxes, insurance, and HOA separately for full housing cost.",
    ],
    examples: [
      {
        title: "30-year fixed loan",
        input: "Loan: $350,000, Rate: 6.5%, Term: 30 years",
        output: "Estimated monthly payment: $2,212.00",
        explanation: "Standard amortizing payment formula with monthly compounding.",
      },
    ],
    faqs: [
      faq("Does this include taxes and insurance?", "No. This estimates principal and interest only."),
      faq("Is this a loan offer?", "No. Rates, fees, and approval depend on lender underwriting."),
      faq("What if the rate is 0%?", "The calculator falls back to loan amount divided by number of payments."),
    ],
    commonUseCases: [
      "Estimate monthly payments while house hunting",
      "Compare 15-year versus 30-year terms",
      "Model refinance payment changes",
    ],
    assumptions: [
      "Fixed-rate fully amortizing loan with monthly payments.",
      "Excludes property taxes, insurance, PMI, and HOA dues.",
      "Estimate only. Not financial advice or a lending quote.",
    ],
    sourceNotes: [
      "Uses standard amortization formula for fixed-rate mortgages.",
      "Verify payment amounts with your lender's official disclosure.",
    ],
  }),
  buildLiveTool({
    id: "loan-to-value-calculator",
    slug: "loan-to-value-calculator",
    title: "Loan-to-Value Calculator",
    category: "real-estate-calculators",
    subcategory: "lending-metrics",
    shortDescription: "Calculate LTV ratio from loan amount and property value.",
    metaTitle: "Loan-to-Value Calculator - LTV Ratio Estimate",
    metaDescription:
      "Calculate loan-to-value (LTV) from loan amount and property value. Free LTV ratio tool for purchase, refinance, and underwriting checks.",
    keywords: ["ltv calculator", "loan to value", "ltv ratio"],
    relatedTools: ["mortgage-calculator", "cap-rate-calculator", "price-per-square-foot"],
    componentKey: "GenericRealEstateCalculatorTool",
    schemaType: "Calculator",
    formula: "LTV = (loan amount ÷ property value) × 100",
    explanation:
      "Determine how much of a property's value is financed. Lenders use LTV for pricing, PMI requirements, and refinance eligibility.",
    howToUse: [
      "Enter the loan amount or remaining balance.",
      "Enter current property value or appraised value.",
      "Review LTV percentage and compare with lender guidelines.",
    ],
    examples: [
      {
        title: "Purchase with 20% down",
        input: "Loan: $280,000, Property value: $350,000",
        output: "Loan-to-value (LTV): 80.00%",
        explanation: "280,000 ÷ 350,000 × 100 = 80% LTV.",
      },
    ],
    faqs: [
      faq("What LTV avoids PMI on conventional loans?", "Many conventional programs target 80% LTV or lower for primary residences, but rules vary."),
      faq("Should I use appraised or purchase price?", "Lenders typically use the lower of appraised value or purchase price at closing."),
      faq("Is this financial advice?", "No. LTV thresholds and pricing depend on lender, occupancy, and product type."),
    ],
    commonUseCases: [
      "Check PMI requirements before closing",
      "Evaluate refinance equity positions",
      "Compare down payment scenarios",
    ],
    assumptions: [
      "Property value is a current market or appraised estimate.",
      "Loan amount reflects first-lien financing unless noted otherwise.",
      "Estimate only. Not financial advice or a lending decision.",
    ],
    sourceNotes: [
      "LTV = loan balance divided by property value, expressed as a percentage.",
      "Combined LTV (CLTV) including second liens is not modeled in this version.",
    ],
  }),
  buildLiveTool({
    id: "price-per-square-foot",
    slug: "price-per-square-foot",
    title: "Price Per Square Foot Calculator",
    category: "real-estate-calculators",
    subcategory: "property-comparison",
    shortDescription: "Calculate price per square foot from property price and square footage.",
    metaTitle: "Price Per Square Foot Calculator - Compare Listings",
    metaDescription:
      "Calculate price per square foot from listing price and square footage. Free property comparison metric for buyers and investors.",
    keywords: ["price per square foot calculator", "cost per sq ft", "property comparison"],
    relatedTools: ["cap-rate-calculator", "roi-calculator", "property-tax-estimator"],
    componentKey: "GenericRealEstateCalculatorTool",
    schemaType: "Calculator",
    formula: "price per square foot = property price ÷ square footage",
    explanation:
      "Normalize property prices by size to compare listings, neighborhoods, and asset classes on a common basis.",
    howToUse: [
      "Enter the property price or offer amount.",
      "Enter finished square footage used in the listing.",
      "Review price per square foot and compare with nearby comps.",
    ],
    examples: [
      {
        title: "Single-family listing",
        input: "Price: $450,000, Square footage: 1,800",
        output: "Price per square foot: $250.00",
        explanation: "450,000 ÷ 1,800 = $250 per square foot.",
      },
    ],
    faqs: [
      faq("Should I use living area or total area?", "Use the same square footage basis as your comps, usually above-grade living area."),
      faq("Does this include lot value?", "Price per square foot reflects the full purchase price, including land and improvements."),
      faq("Can I compare different markets?", "Use caution. Location, condition, and product type strongly affect $/sq ft benchmarks."),
    ],
    commonUseCases: [
      "Compare similar listings in one neighborhood",
      "Screen overpriced or underpriced properties",
      "Summarize comp metrics for investors",
    ],
    assumptions: [
      "Square footage matches the basis used in comparable listings.",
      "Price includes the full purchase amount before credits or concessions.",
      "Metric is a comparison aid, not a valuation or appraisal.",
    ],
    sourceNotes: [
      "Price per square foot is a common normalization metric in residential comps.",
      "Pair with cap rate and ROI tools for investment screening.",
    ],
  }),
  buildLiveTool({
    id: "property-tax-estimator",
    slug: "property-tax-estimator",
    title: "Property Tax Estimator",
    category: "real-estate-calculators",
    subcategory: "tax-ownership",
    shortDescription: "Estimate annual property tax from assessed value and tax rate.",
    metaTitle: "Property Tax Estimator - Annual Tax Calculator",
    metaDescription:
      "Estimate annual property taxes from assessed value and local tax rate. Free ownership cost helper with jurisdiction disclaimer.",
    keywords: ["property tax estimator", "property tax calculator", "annual property tax"],
    relatedTools: ["mortgage-calculator", "price-per-square-foot", "cap-rate-calculator"],
    componentKey: "GenericRealEstateCalculatorTool",
    schemaType: "Calculator",
    formula: "annual property tax = assessed value × (tax rate ÷ 100)",
    explanation:
      "Estimate annual property tax liability from assessed value and a local millage or percentage rate. Useful for ownership cost budgeting.",
    howToUse: [
      "Enter assessed value or estimated taxable value.",
      "Enter the local effective tax rate as a percentage.",
      "Review annual tax estimate and add to monthly housing budget.",
    ],
    examples: [
      {
        title: "1.2% effective rate",
        input: "Assessed value: $300,000, Tax rate: 1.2%",
        output: "Estimated annual property tax: $3,600.00",
        explanation: "300,000 × 0.012 = $3,600 annual tax.",
      },
    ],
    faqs: [
      faq("Is assessed value the same as market value?", "Not always. Many jurisdictions assess below or above recent sale prices."),
      faq("Do exemptions apply?", "Homestead, senior, and other exemptions can reduce taxable value. This tool does not model them."),
      faq("Is this official tax advice?", "No. Verify rates and assessments with your county assessor or tax authority."),
    ],
    commonUseCases: [
      "Budget total monthly housing costs",
      "Compare ownership costs across municipalities",
      "Estimate expenses for rental property underwriting",
    ],
    assumptions: [
      "Tax rate is entered as an effective annual percentage.",
      "Exemptions, special assessments, and mello-roos are not included.",
      "Estimate only. Actual tax bills vary by jurisdiction and reassessment cycles.",
    ],
    sourceNotes: [
      "Annual tax = assessed value multiplied by effective tax rate.",
      "Use official county assessor data for purchase and refinance decisions.",
    ],
  }),
  buildLiveTool({
    id: "noi-calculator",
    slug: "noi-calculator",
    title: "NOI Calculator",
    category: "real-estate-calculators",
    subcategory: "investment-metrics",
    shortDescription: "Calculate net operating income from gross rent, vacancy, and expenses.",
    metaTitle: "NOI Calculator - Net Operating Income for Rentals",
    metaDescription:
      "Calculate net operating income (NOI) from gross income, vacancy rate, and operating expenses. Free rental property NOI calculator.",
    keywords: ["noi calculator", "net operating income calculator", "rental noi", "calculate noi real estate"],
    relatedTools: ["cap-rate-calculator", "dscr-calculator", "grm-calculator", "cash-on-cash-calculator"],
    componentKey: "GenericRealEstateCalculatorTool",
    schemaType: "Calculator",
    formula: "NOI = gross income − vacancy loss − operating expenses",
    explanation:
      "Calculate Net Operating Income (NOI) for income-producing properties. NOI is gross rental income minus vacancy and operating expenses, before debt service and income taxes.",
    howToUse: [
      "Enter gross annual rental income.",
      "Add vacancy rate and annual operating expenses.",
      "Review NOI and use with the cap rate or DSCR calculators.",
    ],
    examples: [
      { title: "Small multifamily", input: "Gross: $60,000, Vacancy: 5%, Expenses: $12,000", output: "NOI: $45,000", explanation: "60,000 − 3,000 vacancy − 12,000 expenses = $45,000 NOI." },
      { title: "Single-family rental", input: "Gross: $24,000, Vacancy: 0%, Expenses: $6,000", output: "NOI: $18,000", explanation: "No vacancy loss when fully occupied." },
    ],
    faqs: [
      faq("What is NOI in real estate?", "Net Operating Income is rental income minus vacancy and operating expenses, before mortgage payments."),
      faq("Does NOI include mortgage payments?", "No. Debt service is excluded from NOI and analyzed separately with DSCR."),
      faq("How does NOI relate to cap rate?", "Cap rate = NOI ÷ property value. Use both calculators together to screen deals."),
    ],
    commonUseCases: ["Underwrite rental acquisitions", "Compare property cash flow before financing", "Prepare investor summaries"],
    assumptions: ["Operating expenses exclude capital improvements and mortgage interest.", "Estimate only. Not financial advice."],
    sourceNotes: ["NOI is a standard metric in commercial and residential investment analysis."],
  }),
  buildLiveTool({
    id: "grm-calculator",
    slug: "grm-calculator",
    title: "GRM Calculator",
    category: "real-estate-calculators",
    subcategory: "investment-metrics",
    shortDescription: "Calculate gross rent multiplier from property value and annual rent.",
    metaTitle: "GRM Calculator - Gross Rent Multiplier",
    metaDescription:
      "Calculate gross rent multiplier (GRM) from property price and gross annual rent. Free GRM calculator for rental property comparison.",
    keywords: ["grm calculator", "gross rent multiplier", "rent multiplier calculator", "grm real estate"],
    relatedTools: ["cap-rate-calculator", "noi-calculator", "price-per-square-foot", "mortgage-calculator"],
    componentKey: "GenericRealEstateCalculatorTool",
    schemaType: "Calculator",
    formula: "GRM = property value ÷ gross annual rent",
    explanation:
      "Gross Rent Multiplier (GRM) compares a property's price to its gross rental income. Lower GRM values may indicate higher relative income, but market norms vary.",
    howToUse: ["Enter property value or purchase price.", "Enter gross annual rent.", "Review GRM and compare with local market benchmarks."],
    examples: [
      { title: "Duplex purchase", input: "Value: $500,000, Rent: $48,000/yr", output: "GRM: 10.42", explanation: "500,000 ÷ 48,000 ≈ 10.42." },
    ],
    faqs: [
      faq("What is a good GRM?", "GRM benchmarks vary by market and property type. Compare similar assets in the same submarket."),
      faq("How is GRM different from cap rate?", "GRM uses gross rent; cap rate uses NOI after expenses."),
      faq("Can I use monthly rent?", "Convert monthly rent to annual (× 12) before calculating GRM."),
    ],
    commonUseCases: ["Quickly compare rental listings", "Screen markets by rent-to-price ratio", "Summarize deals for investors"],
    assumptions: ["Uses gross annual rent before expenses.", "Estimate only. Not financial advice."],
  }),
  buildLiveTool({
    id: "dscr-calculator",
    slug: "dscr-calculator",
    title: "DSCR Calculator",
    category: "real-estate-calculators",
    subcategory: "lending-metrics",
    shortDescription: "Calculate debt service coverage ratio for rental property loans.",
    metaTitle: "DSCR Calculator - Debt Service Coverage Ratio",
    metaDescription:
      "Calculate DSCR from net operating income and annual debt service. Free debt service coverage ratio calculator for investment property loans.",
    keywords: ["dscr calculator", "debt service coverage ratio", "dscr real estate", "rental loan dscr"],
    relatedTools: ["noi-calculator", "mortgage-calculator", "cap-rate-calculator", "loan-to-value-calculator"],
    componentKey: "GenericRealEstateCalculatorTool",
    schemaType: "Calculator",
    formula: "DSCR = NOI ÷ annual debt service",
    explanation:
      "Debt Service Coverage Ratio (DSCR) measures whether a property's NOI covers its annual loan payments. Lenders often require minimum DSCR thresholds for investment property loans.",
    howToUse: ["Enter net operating income (NOI).", "Enter total annual debt service (mortgage payments × 12).", "Review DSCR — values above 1.0 mean income covers debt."],
    examples: [
      { title: "Investment property loan", input: "NOI: $45,000, Debt service: $36,000", output: "DSCR: 1.25", explanation: "Income exceeds debt service by 25%." },
    ],
    faqs: [
      faq("What DSCR do lenders require?", "Many DSCR loan programs target 1.0–1.25+ depending on product and market."),
      faq("What if DSCR is below 1?", "NOI does not fully cover debt service — the property requires additional cash to cover payments."),
      faq("Should I use NOI or net cash flow?", "DSCR typically uses NOI before owner draws and income taxes."),
    ],
    commonUseCases: ["Qualify for DSCR investment loans", "Stress-test refinance scenarios", "Compare financing options"],
    assumptions: ["Annual debt service includes principal and interest.", "Estimate only. Not financial advice."],
  }),
];
