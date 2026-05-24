import type { ResourceCategoryDefinition } from "@/lib/content/types";

export const resourceCategories: ResourceCategoryDefinition[] = [
  {
    slug: "developer-tools",
    title: "Developer Tools",
    description:
      "Reference articles on data formats, encoding, and developer workflows supported by our converters and formatters.",
    metaTitle: "Developer Tools Resources | ConvertMyStuff",
    metaDescription:
      "Learn about JSON, CSV, encoding, and data conversion concepts with practical examples and links to free developer tools.",
  },
  {
    slug: "image-tools",
    title: "Image Tools",
    description:
      "Explainers on image formats, favicons, and browser-ready assets for our image converters.",
    metaTitle: "Image Tools Resources | ConvertMyStuff",
    metaDescription:
      "Understand ICO, PNG, favicon sizes, and image conversion basics with links to free browser-based image tools.",
  },
  {
    slug: "document-tools",
    title: "Document Tools",
    description:
      "Guides on PDF workflows, privacy, and document handling for our document utilities.",
    metaTitle: "Document Tools Resources | ConvertMyStuff",
    metaDescription:
      "Learn how PDF merge, split, and browser-based document tools work, with privacy and workflow tips.",
  },
  {
    slug: "unit-converters",
    title: "Unit Converters",
    description:
      "Reference articles on measurement units, conversion factors, and when to use area, length, and other converters.",
    metaTitle: "Unit Converter Resources | ConvertMyStuff",
    metaDescription:
      "Understand acres, square feet, and other unit conversions with formulas, examples, and free converter links.",
  },
  {
    slug: "construction-calculators",
    title: "Construction Calculators",
    description:
      "Practical explainers on estimating materials, volumes, and job-site math for construction calculators.",
    metaTitle: "Construction Calculator Resources | ConvertMyStuff",
    metaDescription:
      "Learn how to estimate concrete, lumber, and other construction quantities with examples and calculator links.",
  },
  {
    slug: "real-estate-calculators",
    title: "Real Estate Calculators",
    description:
      "Investment analysis concepts including cap rate, NOI, GRM, and rental property screening.",
    metaTitle: "Real Estate Calculator Resources | ConvertMyStuff",
    metaDescription:
      "Understand cap rate, NOI, and real estate investment metrics with examples and free calculator links.",
  },
  {
    slug: "marketing-tools",
    title: "Marketing Tools",
    description:
      "Reference articles on UTM tracking, meta tags, Open Graph, QR codes, and campaign URL best practices.",
    metaTitle: "Marketing Tools Resources | ConvertMyStuff",
    metaDescription:
      "Learn UTM parameters, meta descriptions, Open Graph tags, and QR code best practices with links to free marketing utilities.",
  },
  {
    slug: "finance-calculators",
    title: "Finance Calculators",
    description:
      "Explainers on compound interest, loan amortization, APR, and percentage change tied to free finance calculators.",
    metaTitle: "Finance Calculator Resources | ConvertMyStuff",
    metaDescription:
      "Understand compound interest, amortization, APR vs interest rate, and percentage math with examples and calculator links.",
  },
  {
    slug: "health-fitness-calculators",
    title: "Health & Fitness Calculators",
    description:
      "Educational articles on BMI, TDEE, BMR, macronutrients, and protein intake—not medical advice.",
    metaTitle: "Health & Fitness Resources | ConvertMyStuff",
    metaDescription:
      "Learn how TDEE, BMR, and macronutrients work with practical examples and links to free health calculators.",
  },
  {
    slug: "text-tools",
    title: "Text Tools",
    description:
      "Reference articles on text cleanup, word counts, and naming conventions for developer and writer workflows.",
    metaTitle: "Text Tools Resources | ConvertMyStuff",
    metaDescription:
      "Learn when to dedupe lines, how word counts differ from character counts, and case conversion conventions.",
  },
  {
    slug: "kitchen-recipe-tools",
    title: "Kitchen & Recipe Tools",
    description:
      "Practical explainers on recipe scaling, volume-to-weight conversion, and portion sizing.",
    metaTitle: "Kitchen & Recipe Resources | ConvertMyStuff",
    metaDescription:
      "Understand recipe scaling math, cups vs grams, and portion calculations with free kitchen tool links.",
  },
  {
    slug: "time-date-tools",
    title: "Time & Date Tools",
    description:
      "Reference articles on Unix timestamps, time zones, and ISO 8601 date formats.",
    metaTitle: "Time & Date Resources | ConvertMyStuff",
    metaDescription:
      "Learn Unix epoch time, timezone conversion basics, and ISO 8601 formatting with free time tools.",
  },
  {
    slug: "design-tools",
    title: "Design Tools",
    description:
      "Explainers on color formats, WCAG contrast, and aspect ratios for web and UI design.",
    metaTitle: "Design Tools Resources | ConvertMyStuff",
    metaDescription:
      "Understand hex vs RGB, WCAG contrast ratios, and common aspect ratios with free design utilities.",
  },
];

export const getResourceCategoryBySlug = (slug: string) => {
  return resourceCategories.find((category) => category.slug === slug);
};
