export type SiteWorkflowPath = {
  id: string;
  title: string;
  description: string;
  toolIds: string[];
};

export const siteWorkflowPaths: SiteWorkflowPath[] = [
  {
    id: "real-estate",
    title: "Real estate investing",
    description: "Screen deals from cap rate through full rental analysis.",
    toolIds: [
      "cap-rate-calculator",
      "noi-calculator",
      "dscr-calculator",
      "cash-on-cash-calculator",
      "rental-deal-analyzer",
    ],
  },
  {
    id: "health",
    title: "Health & fitness",
    description: "BMI, calories, and macros in one workflow.",
    toolIds: ["bmi-calculator", "calorie-calculator", "macro-calculator"],
  },
  {
    id: "developer-data",
    title: "Developer data tools",
    description: "JSON, CSV, validation, and encoding utilities.",
    toolIds: ["json-to-csv", "csv-to-json", "json-formatter", "regex-tester", "jwt-decoder"],
  },
  {
    id: "finance",
    title: "Finance & loans",
    description: "Mortgage amortization, interest, and payment estimates.",
    toolIds: [
      "mortgage-calculator-pro",
      "compound-interest-calculator",
      "loan-payment-calculator",
      "percentage-calculator",
    ],
  },
  {
    id: "documents",
    title: "PDF & documents",
    description: "Merge, split, and convert documents locally.",
    toolIds: ["pdf-merge", "pdf-split", "text-to-pdf"],
  },
  {
    id: "convert-units",
    title: "Unit conversion",
    description: "Area, length, weight, and volume converters.",
    toolIds: ["acres-to-square-feet", "meters-to-feet", "kg-to-lbs", "liters-to-gallons"],
  },
];

export type StartHereIntent = {
  id: string;
  label: string;
  description: string;
  href: string;
};

export const startHereIntents: StartHereIntent[] = [
  {
    id: "convert",
    label: "Convert data",
    description: "JSON, CSV, units, and file formats",
    href: "/developer-tools/",
  },
  {
    id: "calculate",
    label: "Calculate",
    description: "Real estate, finance, and construction",
    href: "/real-estate-calculators/",
  },
  {
    id: "files",
    label: "Work with files",
    description: "PDF, images, and documents",
    href: "/document-tools/",
  },
  {
    id: "text",
    label: "Clean up text",
    description: "Case, dedupe, count, and diff",
    href: "/text-tools/",
  },
];
