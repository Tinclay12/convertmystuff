import type { ToolContentEnrichment } from "@/lib/content/types";

/** Resource and guide links for Wave 2–4 content clusters */
export const wave2ToolEnrichment: Record<string, ToolContentEnrichment> = {
  "compound-interest-calculator": {
    guideSlug: "compound-interest-formula-explained",
    resourceSlugs: [
      "finance-calculators/what-is-compound-interest",
      "finance-calculators/simple-vs-compound-interest",
    ],
  },
  "pdf-merge": {
    guideSlug: "how-to-merge-pdf-files",
  },
  "pdf-split": {
    guideSlug: "how-to-split-pdf-pages",
  },
  "sql-formatter": {
    guideSlug: "sql-formatting-best-practices",
  },
  "concrete-calculator": {
    guideSlug: "concrete-yardage-calculation",
  },
  "text-diff": {
    guideSlug: "how-to-compare-text-diffs",
  },
  "loan-payment-calculator": {
    resourceSlugs: ["finance-calculators/apr-vs-interest-rate"],
  },
  "percentage-calculator": {
    resourceSlugs: ["finance-calculators/how-to-calculate-percentage-change"],
  },
  "dscr-calculator": {
    resourceSlugs: ["real-estate-calculators/what-is-dscr"],
  },
  "cash-on-cash-calculator": {
    resourceSlugs: ["real-estate-calculators/cash-on-cash-return-explained"],
  },
  "grm-calculator": {
    resourceSlugs: ["real-estate-calculators/what-is-grm"],
  },
  "rental-deal-analyzer": {
    resourceSlugs: [
      "real-estate-calculators/cash-on-cash-return-explained",
      "real-estate-calculators/what-is-dscr",
    ],
  },
  "macro-calculator": {
    resourceSlugs: [
      "health-fitness-calculators/what-are-macronutrients",
      "health-fitness-calculators/protein-intake-guidelines",
    ],
  },
  "calorie-calculator": {
    resourceSlugs: [
      "health-fitness-calculators/how-tdee-is-calculated",
      "health-fitness-calculators/bmr-vs-tdee",
    ],
  },
  "hectares-to-acres": {
    resourceSlugs: ["unit-converters/hectares-vs-acres"],
  },
  "square-meters-to-square-feet": {
    resourceSlugs: ["unit-converters/square-meters-vs-square-feet"],
  },
  "meters-to-feet": {
    resourceSlugs: ["unit-converters/feet-vs-meters-reference"],
  },
  "miles-to-km": {
    resourceSlugs: ["unit-converters/miles-vs-kilometers"],
  },
  "kg-to-lbs": {
    resourceSlugs: ["unit-converters/pounds-vs-kilograms"],
  },
  "ounces-to-grams": {
    resourceSlugs: ["unit-converters/ounces-vs-grams"],
  },
  "liters-to-gallons": {
    resourceSlugs: ["unit-converters/gallons-vs-liters"],
  },
  "cubic-yards-to-cubic-feet": {
    resourceSlugs: ["unit-converters/cubic-yards-explained"],
  },
  "celsius-to-fahrenheit": {
    resourceSlugs: ["unit-converters/celsius-vs-fahrenheit-reference"],
  },
  "yaml-to-json": {
    resourceSlugs: ["developer-tools/yaml-vs-json"],
  },
  "base64-encode": {
    resourceSlugs: ["developer-tools/what-is-base64"],
  },
  "base64-decode": {
    resourceSlugs: ["developer-tools/what-is-base64"],
  },
  "csv-to-json": {
    resourceSlugs: [
      "developer-tools/csv-encoding-and-excel",
      "developer-tools/what-is-json",
    ],
  },
  "xml-to-json": {
    resourceSlugs: ["developer-tools/xml-vs-json-for-data-exchange"],
  },
  "url-encode": {
    resourceSlugs: ["developer-tools/url-encoding-explained"],
  },
  "url-decode": {
    resourceSlugs: ["developer-tools/url-encoding-explained"],
  },
  "roofing-calculator": {
    resourceSlugs: ["construction-calculators/how-to-estimate-roofing-squares"],
  },
  "lumber-calculator": {
    resourceSlugs: ["construction-calculators/board-feet-explained"],
  },
  "gravel-cubic-yards-to-tons": {
    resourceSlugs: ["construction-calculators/cubic-yards-to-tons-aggregate"],
  },
  "mulch-calculator": {
    resourceSlugs: ["construction-calculators/mulch-coverage-guide"],
  },
  "remove-duplicate-lines": {
    resourceSlugs: ["text-tools/when-to-remove-duplicate-lines"],
  },
  "word-counter": {
    guideSlug: "word-count-for-seo-and-social",
    resourceSlugs: ["text-tools/word-count-vs-character-count"],
  },
  "camel-case-converter": {
    resourceSlugs: ["text-tools/case-conversion-conventions"],
  },
  "open-graph-preview": {
    guideSlug: "serp-snippet-preview-tips",
    resourceSlugs: ["marketing-tools/open-graph-tags-explained"],
  },
  "meta-tag-generator": {
    resourceSlugs: ["marketing-tools/meta-description-best-practices"],
  },
  "qr-code-generator": {
    resourceSlugs: ["marketing-tools/qr-code-url-best-practices"],
  },
  "recipe-scaler": {
    resourceSlugs: ["kitchen-recipe-tools/recipe-scaling-math"],
  },
  "cups-to-grams": {
    resourceSlugs: ["kitchen-recipe-tools/cups-vs-grams"],
  },
  "serving-calculator": {
    resourceSlugs: ["kitchen-recipe-tools/portion-size-calculations"],
  },
  "unix-timestamp": {
    resourceSlugs: ["time-date-tools/unix-timestamp-explained"],
  },
  "timezone-converter": {
    resourceSlugs: ["time-date-tools/timezone-conversion-basics"],
  },
  "date-difference": {
    resourceSlugs: ["time-date-tools/iso-8601-date-format"],
  },
  "color-converter": {
    resourceSlugs: ["design-tools/hex-vs-rgb-color"],
  },
  "contrast-checker": {
    resourceSlugs: ["design-tools/wcag-contrast-basics"],
  },
  "image-resizer": {
    guideSlug: "resize-images-for-web",
    resourceSlugs: ["design-tools/aspect-ratio-reference"],
  },
};
