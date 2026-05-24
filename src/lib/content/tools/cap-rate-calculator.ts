import type { ToolContentEnrichment } from "@/lib/content/types";

export const capRateCalculatorContent: ToolContentEnrichment = {
  contentTier: "B",
  guideSlug: "understanding-cap-rate",
  resourceSlugs: [
    "real-estate-calculators/what-is-cap-rate",
    "real-estate-calculators/what-is-noi",
  ],
  contentBlocks: [
    {
      id: "noi-vs-cap-rate",
      title: "NOI vs cap rate",
      variant: "info",
      paragraphs: [
        "Net operating income (NOI) is the property's income after vacancy and operating expenses, before debt service and income taxes. Cap rate expresses that NOI as a percentage of property value: cap rate = NOI ÷ value.",
        "Use NOI to understand cash flow from operations. Use cap rate to compare properties of different sizes on a relative yield basis.",
      ],
      linkedToolIds: ["noi-calculator"],
    },
    {
      id: "cap-rate-context",
      title: "What makes a cap rate good?",
      variant: "tip",
      paragraphs: [
        "There is no universal good cap rate. Higher cap rates often reflect higher perceived risk, lower growth markets, or properties needing work. Lower cap rates may indicate stable income in strong locations.",
        "Compare cap rates within the same market and asset class. For a full leveraged analysis including cash flow and DSCR, use the rental deal analyzer.",
      ],
      linkedToolIds: ["rental-deal-analyzer", "dscr-calculator"],
    },
  ],
};
