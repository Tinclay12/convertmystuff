import { getToolById } from "@/lib/tools/access";
import type { ToolDefinition } from "@/lib/tools/types";

/** Site-wide flagship anchors for homepage and hub spotlights */
export const homepageFlagshipIds = [
  "json-to-csv",
  "rental-deal-analyzer",
  "mortgage-calculator-pro",
  "cap-rate-calculator",
  "bmi-calculator",
  "pdf-merge",
] as const;

export const categoryFlagshipIds: Record<string, string[]> = {
  "developer-tools": ["json-to-csv", "csv-to-json", "regex-tester", "jwt-decoder"],
  "real-estate-calculators": ["rental-deal-analyzer", "cap-rate-calculator", "noi-calculator"],
  "finance-calculators": ["mortgage-calculator-pro", "compound-interest-calculator", "loan-payment-calculator"],
  "health-fitness-calculators": ["bmi-calculator", "calorie-calculator", "macro-calculator"],
  "unit-converters": ["acres-to-square-feet", "meters-to-feet", "kg-to-lbs"],
  "document-tools": ["pdf-merge", "pdf-split", "text-to-pdf"],
  "image-tools": ["image-resizer", "image-compressor", "png-to-ico"],
  "construction-calculators": ["concrete-calculator", "lumber-calculator", "roofing-calculator"],
  "text-tools": ["case-converter", "remove-duplicate-lines", "word-counter"],
  "marketing-tools": ["utm-builder", "open-graph-preview", "qr-code-generator"],
  "kitchen-recipe-tools": ["recipe-scaler", "cups-to-grams"],
  "design-tools": ["gradient-generator", "contrast-checker"],
  "time-date-tools": ["unix-timestamp-converter", "timezone-converter"],
};

export const getHomepageFlagships = (): ToolDefinition[] => {
  return homepageFlagshipIds
    .map((id) => getToolById(id))
    .filter((tool): tool is ToolDefinition => Boolean(tool));
};

export const getCategoryFlagships = (categorySlug: string, limit = 3): ToolDefinition[] => {
  const ids = categoryFlagshipIds[categorySlug] ?? [];
  return ids
    .map((id) => getToolById(id))
    .filter((tool): tool is ToolDefinition => Boolean(tool))
    .slice(0, limit);
};
