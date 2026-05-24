import type { ToolContentEnrichment } from "@/lib/content/types";

export const acresToSquareFeetContent: ToolContentEnrichment = {
  contentTier: "A",
  resourceSlugs: ["unit-converters/how-many-square-feet-are-in-an-acre"],
  contentBlocks: [
    {
      id: "us-survey-acre",
      title: "Why 43,560 square feet?",
      variant: "info",
      paragraphs: [
        "In US customary units, one acre is defined as exactly 43,560 square feet. That factor comes from the historical survey acre: a one-chain by one-furlong rectangle (66 ft × 660 ft).",
        "Real estate listings often quote lot size in acres for rural parcels and in square feet for building footprint or urban lots. Converting between the two helps you compare listings that use different units.",
      ],
    },
    {
      id: "listing-workflow",
      title: "From lot size to price analysis",
      variant: "tip",
      paragraphs: [
        "After converting acreage to square feet, you can estimate price per square foot for land or improvements using our real estate calculator.",
      ],
      linkedToolIds: ["price-per-square-foot"],
    },
  ],
};
