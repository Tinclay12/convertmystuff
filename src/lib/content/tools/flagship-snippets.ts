import type { ToolContentEnrichment } from "@/lib/content/types";

export const macroCalculatorContent: ToolContentEnrichment = {
  contentTier: "B",
  contentBlocks: [
    {
      id: "macro-basics",
      title: "Splitting calories into macros",
      variant: "info",
      paragraphs: [
        "Protein and carbohydrates provide about 4 calories per gram; fat provides about 9 calories per gram. Percentages should total 100% for custom splits.",
        "High-protein presets support muscle retention during deficits. Keto-style presets emphasize fat while keeping carbs low.",
      ],
    },
    {
      id: "macro-workflow",
      title: "Start from your calorie target",
      variant: "tip",
      paragraphs: [
        "If you have not calculated daily calories yet, use the calorie calculator first. You can pass your TDEE result directly into this tool.",
      ],
      linkedToolIds: ["calorie-calculator", "bmi-calculator"],
      linkedToolPrefills: {
        "calorie-calculator": "goal=maintain",
      },
    },
  ],
};

export const rentalDealAnalyzerContent: ToolContentEnrichment = {
  contentTier: "C",
  guideSlug: "rental-deal-analysis-basics",
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
  ],
};

export const mortgageCalculatorProContent: ToolContentEnrichment = {
  contentTier: "C",
  guideSlug: "mortgage-amortization-explained",
  resourceSlugs: ["finance-calculators/how-loan-amortization-works"],
  contentBlocks: [
    {
      id: "amortization-value",
      title: "Why amortization schedules matter",
      variant: "info",
      paragraphs: [
        "Early payments are mostly interest; principal paydown accelerates over time. An amortization table shows how much equity you build each year.",
        "Compare 15-year vs 30-year terms to see total interest paid—not just monthly payment differences.",
      ],
    },
    {
      id: "re-finance-context",
      title: "Pair with investment analysis",
      variant: "tip",
      paragraphs: [
        "For rental properties, combine mortgage payments with the rental deal analyzer to see leveraged cash flow and DSCR.",
      ],
      linkedToolIds: ["rental-deal-analyzer", "loan-payment-calculator", "loan-to-value-calculator"],
    },
  ],
};

export const pdfMergeContent: ToolContentEnrichment = {
  contentTier: "B",
  guideSlug: "client-side-pdf-processing",
  resourceSlugs: ["document-tools/why-client-side-pdf-tools-keep-files-private"],
  contentBlocks: [
    {
      id: "privacy",
      title: "Why client-side PDF processing",
      variant: "info",
      paragraphs: [
        "Your PDF files are merged in the browser—they are not uploaded to a server. This suits sensitive contracts, medical forms, and personal documents.",
      ],
    },
    {
      id: "pdf-workflow",
      title: "Split, merge, and export",
      variant: "tip",
      paragraphs: [
        "Need to extract pages first? Split a PDF, then merge selected outputs. For text-only exports, try text to PDF.",
      ],
      linkedToolIds: ["pdf-split", "text-to-pdf"],
    },
  ],
};

export const pdfSplitContent: ToolContentEnrichment = {
  contentTier: "B",
  guideSlug: "client-side-pdf-processing",
  contentBlocks: [
    {
      id: "privacy-split",
      title: "Private page extraction",
      variant: "info",
      paragraphs: [
        "Page extraction runs locally. Original files never leave your device—useful for confidential reports and signed documents.",
      ],
    },
    {
      id: "split-merge",
      title: "Combine extracted pages",
      variant: "tip",
      paragraphs: [
        "After splitting, use PDF merge to combine selected pages into a new document or reorder sections.",
      ],
      linkedToolIds: ["pdf-merge"],
    },
  ],
};

export const csvToJsonContent: ToolContentEnrichment = {
  contentTier: "B",
  contentBlocks: [
    {
      id: "round-trip",
      title: "CSV to JSON round trips",
      variant: "tip",
      paragraphs: [
        "After editing CSV in Excel, convert back to JSON for APIs and config files. Preview column types before importing large datasets.",
      ],
      linkedToolIds: ["json-to-csv", "json-formatter", "csv-to-html-table"],
    },
  ],
  guideSlug: "json-to-csv-for-excel",
};

export const nestedJsonToCsvContent: ToolContentEnrichment = {
  contentTier: "B",
  resourceSlugs: ["developer-tools/flattening-nested-json-for-csv"],
  contentBlocks: [
    {
      id: "nested-flatten",
      title: "Flattening nested API responses",
      variant: "info",
      paragraphs: [
        "Nested objects become dotted column names. Arrays of objects typically produce one row per element—wide CSV files may need column filtering before Excel import.",
      ],
      linkedToolIds: ["json-to-csv", "csv-to-html-table"],
    },
  ],
};

export const csvToHtmlTableContent: ToolContentEnrichment = {
  contentTier: "B",
  contentBlocks: [
    {
      id: "preview-before-excel",
      title: "Preview CSV before Excel",
      variant: "tip",
      paragraphs: [
        "Render CSV as an HTML table to verify columns and delimiters before opening in a spreadsheet. Faster than fixing import settings after the fact.",
      ],
      linkedToolIds: ["json-to-csv", "csv-to-json"],
    },
  ],
};
