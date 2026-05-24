import type { CategoryDefinition } from "@/lib/tools/types";

type CategoryEditorial = Pick<CategoryDefinition, "intro" | "useCases">;

const categoryEditorial: Record<string, CategoryEditorial> = {
  "developer-tools": {
    intro:
      "Free online converters and developer tools to convert JSON, CSV, YAML, and XML; format and validate structured data; encode Base64 and URLs; and generate test data — all in your browser with no upload required.",
    useCases: [
      "Convert API responses from JSON to CSV for Excel",
      "Validate and pretty-print JSON configs",
      "Transform YAML DevOps files to JSON",
      "Encode strings for URLs and HTML entities",
    ],
  },
  "unit-converters": {
    intro:
      "Free unit converters to convert area, length, weight, volume, temperature, and digital storage. Convert acres to square feet, square meters to square feet, meters to feet, kilograms to pounds, Celsius to Fahrenheit, and more using standard conversion factors.",
    useCases: [
      "Convert land area for real estate listings",
      "Switch between metric and US customary units",
      "Convert recipe and construction measurements",
      "Calculate digital storage sizes (MB to GB)",
    ],
  },
  "real-estate-calculators": {
    intro:
      "Free real estate calculators for cap rate, NOI, cash-on-cash return, mortgage payments, loan-to-value, and property comparison metrics. Estimate investment returns before underwriting a deal.",
    useCases: [
      "Screen rental properties by cap rate and NOI",
      "Compare cash-on-cash vs unlevered returns",
      "Estimate monthly mortgage payments",
      "Calculate price per square foot for comps",
    ],
  },
  "finance-calculators": {
    intro:
      "Free finance and percentage calculators for discounts, margins, markups, tips, loan payments, compound interest, and break-even analysis. Get instant estimates for everyday and business math.",
    useCases: [
      "Calculate sale prices after discounts",
      "Set product pricing with margin targets",
      "Split restaurant bills and tips",
      "Project savings growth with compound interest",
    ],
  },
  "marketing-tools": {
    intro:
      "Free marketing tools to build UTM campaign links, generate SEO meta tags, create URL slugs, preview Open Graph cards, and produce QR codes for campaigns — no account required.",
    useCases: [
      "Track email and social campaigns with UTM links",
      "Draft SEO title and description tags",
      "Preview social share cards before publishing",
      "Generate QR codes for events and print materials",
    ],
  },
  "text-tools": {
    intro:
      "Free text tools to remove duplicate lines, convert case styles, count words and characters, trim whitespace, diff text, and clean pasted content — all processed locally in your browser.",
    useCases: [
      "Clean log files and CSV exports",
      "Convert titles to slug or camelCase",
      "Count words for essays and meta descriptions",
      "Compare two versions of document text",
    ],
  },
  "image-tools": {
    intro:
      "Free image tools to convert PNG, JPG, and SVG formats; resize and compress images; and generate favicon bundles with ICO files — processed entirely in your browser.",
    useCases: [
      "Convert PNG to JPG for smaller file sizes",
      "Generate favicon.ico and PNG size bundles",
      "Resize images for web and social media",
      "Compress photos before upload",
    ],
  },
  "construction-calculators": {
    intro:
      "Free construction calculators for concrete, lumber, drywall, roofing, flooring, tile, mulch, and gravel quantities. Estimate material needs for DIY and contractor projects.",
    useCases: [
      "Estimate concrete bags for a slab pour",
      "Calculate board feet for framing lumber",
      "Determine tile and flooring coverage",
      "Plan landscaping mulch and gravel volumes",
    ],
  },
  "health-fitness-calculators": {
    intro:
      "Free health and fitness calculators for BMI, daily calorie needs, TDEE, and macronutrient targets. All calculations run locally in your browser — not medical advice.",
    useCases: [
      "Check BMI and healthy weight range for your height",
      "Estimate daily calories for weight loss or gain",
      "Calculate protein, carbs, and fat macro targets",
      "Plan nutrition alongside recipe and kitchen tools",
    ],
  },
  "document-tools": {
    intro:
      "Free document tools to merge and split PDFs, convert Markdown and HTML, count words, and generate PDFs from text — with client-side processing so sensitive files stay on your device.",
    useCases: [
      "Combine PDF reports without cloud upload",
      "Extract pages from a large PDF",
      "Convert Markdown drafts to HTML",
      "Generate a PDF from plain text notes",
    ],
  },
  "time-date-tools": {
    intro:
      "Free time and date utilities to convert time zones, parse Unix timestamps, calculate age and date differences, and count business days.",
    useCases: [
      "Schedule meetings across time zones",
      "Debug API timestamps in epoch seconds",
      "Calculate days between contract dates",
      "Plan deadlines excluding weekends",
    ],
  },
  "design-tools": {
    intro:
      "Free design utilities for color conversion, WCAG contrast checks, CSS spacing scales, rem/px math, and gradient generation.",
    useCases: [
      "Convert hex colors to RGB for CSS",
      "Verify text contrast for accessibility",
      "Build consistent spacing tokens",
      "Convert rem values to pixels",
    ],
  },
  "kitchen-recipe-tools": {
    intro:
      "Free kitchen calculators to scale recipes, convert cups to grams, adjust oven temperatures, and calculate servings and portions.",
    useCases: [
      "Double or halve a recipe for a crowd",
      "Convert volume measures to weight for baking",
      "Adjust Fahrenheit and Celsius oven settings",
      "Resize portions for meal prep",
    ],
  },
};

export const mergeCategoryEditorial = (category: CategoryDefinition): CategoryDefinition => {
  const editorial = categoryEditorial[category.slug];
  if (!editorial) {
    return category;
  }

  return { ...category, ...editorial };
};
