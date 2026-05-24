import type { CategoryDefinition } from "./types";
import { mergeCategoryEditorial } from "@/lib/seo/category-content";

const baseCategories: CategoryDefinition[] = [
  {
    id: "developer-tools",
    title: "Developer Tools",
    slug: "developer-tools",
    path: "/developer-tools/",
    description: "Convert, format, validate, and clean developer data formats.",
    metaTitle: "Developer Tools - Format, Convert, and Validate Data",
    metaDescription:
      "Free developer tools for JSON, CSV, formatting, validation, and data conversion.",
    priority: 1,
  },
  {
    id: "unit-converters",
    title: "Unit Converters",
    slug: "unit-converters",
    path: "/unit-converters/",
    description: "Convert area, length, weight, and other measurement units.",
    metaTitle: "Unit Converters - Free Online Measurement Converters",
    metaDescription:
      "Free unit converters for area, length, weight, and practical measurement conversions.",
    priority: 2,
  },
  {
    id: "text-tools",
    title: "Text Tools",
    slug: "text-tools",
    path: "/text-tools/",
    description: "Clean, transform, and format text quickly in your browser.",
    metaTitle: "Text Tools - Clean and Transform Text Online",
    metaDescription:
      "Free text utilities for removing duplicates, changing case, and cleaning pasted text.",
    priority: 3,
  },
  {
    id: "real-estate-calculators",
    title: "Real Estate Calculators",
    slug: "real-estate-calculators",
    path: "/real-estate-calculators/",
    description: "Estimate cap rate, NOI, and other real estate metrics.",
    metaTitle: "Real Estate Calculators - Cap Rate and Investment Tools",
    metaDescription:
      "Free real estate calculators for cap rate, NOI, and property investment estimates.",
    priority: 4,
  },
  {
    id: "finance-calculators",
    title: "Finance / Percentage Calculators",
    slug: "finance-calculators",
    path: "/finance-calculators/",
    description: "Calculate percentages, discounts, tips, and financial ratios.",
    metaTitle: "Finance Calculators - Percentage and Financial Tools",
    metaDescription:
      "Free finance and percentage calculators for discounts, margins, tips, and ratios.",
    priority: 5,
  },
  {
    id: "construction-calculators",
    title: "Construction Calculators",
    slug: "construction-calculators",
    path: "/construction-calculators/",
    description: "Estimate materials, dimensions, and construction quantities.",
    metaTitle: "Construction Calculators - Material and Measurement Tools",
    metaDescription:
      "Free construction calculators for concrete, lumber, area, and project estimates.",
    priority: 6,
  },
  {
    id: "marketing-tools",
    title: "Marketing Tools",
    slug: "marketing-tools",
    path: "/marketing-tools/",
    description: "Build campaign URLs and marketing utilities.",
    metaTitle: "Marketing Tools - UTM Builder and Campaign Utilities",
    metaDescription:
      "Free marketing tools for UTM links, campaign tracking, and SEO utilities.",
    priority: 7,
  },
  {
    id: "document-tools",
    title: "Document Tools",
    slug: "document-tools",
    path: "/document-tools/",
    description: "Convert, merge, and prepare documents for sharing.",
    metaTitle: "Document Tools - Convert and Prepare Documents Online",
    metaDescription:
      "Free document utilities for PDF conversion, merging, and quick exports.",
    priority: 8,
  },
  {
    id: "image-tools",
    title: "Image Tools",
    slug: "image-tools",
    path: "/image-tools/",
    description: "Convert and prepare images for web and app use.",
    metaTitle: "Image Tools - Convert and Prepare Images Online",
    metaDescription:
      "Free image utilities for favicon conversion, format changes, and quick exports.",
    priority: 9,
  },
  {
    id: "time-date-tools",
    title: "Time & Date Tools",
    slug: "time-date-tools",
    path: "/time-date-tools/",
    description: "Convert time zones, calculate durations, and format dates.",
    metaTitle: "Time & Date Tools - Time Zone and Duration Calculators",
    metaDescription:
      "Free time and date tools for time zones, durations, and calendar calculations.",
    priority: 10,
  },
  {
    id: "design-tools",
    title: "Design Tools",
    slug: "design-tools",
    path: "/design-tools/",
    description: "Generate colors, spacing scales, and design utilities.",
    metaTitle: "Design Tools - Color and Layout Utilities",
    metaDescription:
      "Free design utilities for color palettes, contrast checks, and layout helpers.",
    priority: 11,
  },
  {
    id: "kitchen-recipe-tools",
    title: "Kitchen / Recipe Tools",
    slug: "kitchen-recipe-tools",
    path: "/kitchen-recipe-tools/",
    description: "Scale recipes, convert measurements, and plan portions.",
    metaTitle: "Kitchen & Recipe Tools - Scale and Convert Recipes",
    metaDescription:
      "Free kitchen tools for recipe scaling, unit conversion, and portion planning.",
    priority: 12,
  },
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
  },
];

export const categories: CategoryDefinition[] = baseCategories.map(mergeCategoryEditorial);
