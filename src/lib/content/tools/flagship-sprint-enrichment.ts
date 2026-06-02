import type { ToolContentEnrichment } from "@/lib/content/types";

export const compoundInterestCalculatorContent: ToolContentEnrichment = {
  contentTier: "B",
  guideSlug: "compound-interest-formula-explained",
  resourceSlugs: [
    "finance-calculators/what-is-compound-interest",
    "finance-calculators/simple-vs-compound-interest",
  ],
  contentBlocks: [
    {
      id: "compound-formula",
      title: "How compound growth is calculated",
      variant: "info",
      paragraphs: [
        "Future value uses A = P(1 + r/n)^(nt): principal P, annual rate r, compounding periods per year n, and years t.",
        "More frequent compounding (monthly vs annual) increases ending balance for the same nominal rate.",
      ],
    },
    {
      id: "compound-workflow",
      title: "Related finance tools",
      variant: "tip",
      paragraphs: [
        "Compare loan payments with the loan payment calculator, or model mortgage PITI with mortgage calculator pro.",
      ],
      linkedToolIds: ["loan-payment-calculator", "mortgage-calculator-pro", "percentage-calculator"],
    },
  ],
};

export const imageResizerContent: ToolContentEnrichment = {
  contentTier: "B",
  resourceSlugs: ["design-tools/aspect-ratio-reference"],
  contentBlocks: [
    {
      id: "resize-local",
      title: "Resize without uploading",
      variant: "info",
      paragraphs: [
        "Images are resized in your browser. Use lock aspect ratio to scale proportionally, or enter exact width and height for platform specs.",
      ],
    },
    {
      id: "resize-workflow",
      title: "After resizing",
      variant: "tip",
      paragraphs: [
        "Need a smaller file? Compress to JPEG. Converting formats? Try PNG to JPG or JPG to PNG before resizing.",
      ],
      linkedToolIds: ["image-compressor", "png-to-jpg", "jpg-to-png"],
    },
  ],
};

export const imageCompressorContent: ToolContentEnrichment = {
  contentTier: "B",
  contentBlocks: [
    {
      id: "compress-quality",
      title: "Choosing JPEG quality",
      variant: "info",
      paragraphs: [
        "Quality 0.7–0.85 is a common web range. Lower values shrink file size faster but show more compression artifacts.",
        "iPhone HEIC photos are converted locally before compression.",
      ],
    },
    {
      id: "compress-workflow",
      title: "Pair with resize",
      variant: "tip",
      paragraphs: [
        "Resize to target dimensions first, then compress for email or upload limits.",
      ],
      linkedToolIds: ["image-resizer", "png-to-jpg"],
    },
  ],
};

export const concreteCalculatorEnrichment: ToolContentEnrichment = {
  contentTier: "B",
  resourceSlugs: ["construction-calculators/how-to-estimate-concrete-cubic-yards"],
  contentBlocks: [
    {
      id: "concrete-formula",
      title: "Slab volume formula",
      variant: "info",
      paragraphs: [
        "Rectangular pours: length × width × depth (feet) ÷ 27 = cubic yards. Depth is entered in inches and converted to feet.",
        "Order 5–10% extra concrete for waste, uneven subgrade, and pump line loss.",
      ],
    },
    {
      id: "concrete-workflow",
      title: "Next steps in your pour plan",
      variant: "tip",
      paragraphs: [
        "Convert cubic yards to bag counts with the cement calculator, or estimate gravel and mulch for adjacent site work.",
      ],
      linkedToolIds: ["cement-calculator", "gravel-calculator", "mulch-calculator"],
    },
  ],
};
