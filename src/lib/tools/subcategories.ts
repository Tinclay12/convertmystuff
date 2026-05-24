export type SubcategoryDefinition = {
  id: string;
  title: string;
  description: string;
};

export type CategorySubcategories = {
  categorySlug: string;
  subcategories: SubcategoryDefinition[];
};

export const categorySubcategories: CategorySubcategories[] = [
  {
    categorySlug: "developer-tools",
    subcategories: [
      { id: "data-converters", title: "Data converters", description: "Convert between JSON, CSV, YAML, XML, and tabular formats." },
      { id: "encoders-decoders", title: "Encoders & decoders", description: "Encode and decode Base64, URLs, HTML, and other encodings." },
      { id: "formatters-validators", title: "Formatters & validators", description: "Pretty-print, validate, and lint structured data and code." },
      { id: "generators", title: "Generators", description: "Generate UUIDs, hashes, sample text, and test data." },
    ],
  },
  {
    categorySlug: "text-tools",
    subcategories: [
      { id: "cleanup-tools", title: "Cleanup tools", description: "Remove duplicates, empty lines, and extra whitespace from text." },
      { id: "case-converters", title: "Case converters", description: "Switch between uppercase, lowercase, title, slug, and developer case styles." },
      { id: "counters", title: "Counters", description: "Count words, characters, lines, and paragraphs instantly." },
      { id: "formatting-tools", title: "Formatting tools", description: "Diff, number, sort, and reshape pasted text." },
    ],
  },
  {
    categorySlug: "image-tools",
    subcategories: [
      { id: "format-converters", title: "Format converters", description: "Convert PNG, JPG, SVG, ICO, and WebP images." },
      { id: "resizers-compressors", title: "Resizers & compressors", description: "Resize dimensions and reduce file size for the web." },
      { id: "icons-favicons", title: "Icons & favicons", description: "Generate favicons and app icons from source images." },
      { id: "print-dpi-tools", title: "Print / DPI tools", description: "Calculate print dimensions, DPI, and pixel density." },
    ],
  },
  {
    categorySlug: "document-tools",
    subcategories: [
      { id: "pdf-tools", title: "PDF tools", description: "Merge, split, and prepare PDF documents." },
      { id: "markup-converters", title: "Markup converters", description: "Convert Markdown, HTML, and plain text formats." },
      { id: "document-utilities", title: "Document utilities", description: "Count, extract, and prepare document content." },
    ],
  },
  {
    categorySlug: "unit-converters",
    subcategories: [
      { id: "area", title: "Area", description: "Convert acres, square feet, hectares, and other area units." },
      { id: "length", title: "Length", description: "Convert meters, feet, miles, kilometers, and more." },
      { id: "weight", title: "Weight", description: "Convert kilograms, pounds, ounces, and grams." },
      { id: "volume", title: "Volume", description: "Convert liters, gallons, cups, and cubic units." },
      { id: "temperature", title: "Temperature", description: "Convert Celsius, Fahrenheit, and Kelvin." },
      { id: "digital-storage", title: "Digital storage", description: "Convert bytes, KB, MB, GB, and TB." },
    ],
  },
  {
    categorySlug: "construction-calculators",
    subcategories: [
      { id: "materials", title: "Materials", description: "Estimate lumber, drywall, and general material quantities." },
      { id: "concrete-cement", title: "Concrete & cement", description: "Calculate concrete volume, bags, and slab requirements." },
      { id: "roofing", title: "Roofing", description: "Estimate shingles, roofing area, and pitch-related quantities." },
      { id: "flooring-walls", title: "Flooring & walls", description: "Calculate tile, flooring, and wall coverage." },
      { id: "landscaping", title: "Landscaping", description: "Estimate mulch, gravel, soil, and outdoor material needs." },
    ],
  },
  {
    categorySlug: "real-estate-calculators",
    subcategories: [
      { id: "investment-metrics", title: "Investment metrics", description: "Cap rate, cash-on-cash, ROI, and rental yield estimates." },
      { id: "lending-metrics", title: "Lending metrics", description: "Mortgage payments, LTV, DTI, and loan comparisons." },
      { id: "property-comparison", title: "Property comparison", description: "Price per square foot and side-by-side property math." },
      { id: "tax-ownership", title: "Tax / ownership estimates", description: "Property tax, HOA, and ownership cost helpers." },
    ],
  },
  {
    categorySlug: "marketing-tools",
    subcategories: [
      { id: "campaign-urls", title: "Campaign URLs", description: "Build and parse UTM tracking links for campaigns." },
      { id: "seo-utilities", title: "SEO utilities", description: "Meta tags, slugs, snippets, and on-page SEO helpers." },
      { id: "social-formatting", title: "Social formatting", description: "Hashtags, post formatting, and social copy utilities." },
      { id: "qr-tools", title: "QR & scan tools", description: "Generate QR codes and scannable campaign assets." },
    ],
  },
  {
    categorySlug: "time-date-tools",
    subcategories: [
      { id: "time-zones", title: "Time zones", description: "Convert times across zones and plan global meetings." },
      { id: "date-calculators", title: "Date calculators", description: "Age, date difference, business days, and durations." },
      { id: "timestamps", title: "Timestamps", description: "Convert Unix timestamps and ISO date strings." },
      { id: "countdowns", title: "Countdowns", description: "Count down to events and deadlines." },
    ],
  },
  {
    categorySlug: "design-tools",
    subcategories: [
      { id: "color-tools", title: "Color tools", description: "Convert HEX, RGB, HSL, and check contrast ratios." },
      { id: "layout-tools", title: "Layout tools", description: "Spacing scales, rem/px conversion, and grid helpers." },
      { id: "generators", title: "Generators", description: "Gradients, palettes, and design tokens." },
    ],
  },
  {
    categorySlug: "kitchen-recipe-tools",
    subcategories: [
      { id: "recipe-scaling", title: "Recipe scaling", description: "Scale servings up or down while keeping ratios." },
      { id: "measurement-conversion", title: "Measurement conversion", description: "Convert cups, grams, tablespoons, and oven temperatures." },
      { id: "portion-planning", title: "Portion planning", description: "Plan servings, portions, and ingredient lists." },
    ],
  },
  {
    categorySlug: "finance-calculators",
    subcategories: [
      { id: "percentages", title: "Percentages", description: "Calculate discounts, markups, margins, and percentage change." },
      { id: "loans-payments", title: "Loans & payments", description: "Loan payments, amortization, and interest estimates." },
      { id: "investment-basics", title: "Investment basics", description: "Compound interest, break-even, and simple ROI math." },
      { id: "everyday-finance", title: "Everyday finance", description: "Tips, splits, and quick personal finance helpers." },
    ],
  },
  {
    categorySlug: "health-fitness-calculators",
    subcategories: [
      { id: "body-metrics", title: "Body metrics", description: "BMI, ideal weight, and body composition estimates." },
      { id: "nutrition", title: "Nutrition", description: "Daily calories, TDEE, and macronutrient targets." },
      { id: "fitness", title: "Fitness", description: "Heart rate zones and protein intake helpers." },
    ],
  },
];

export const getSubcategoriesForCategory = (
  categorySlug: string,
): SubcategoryDefinition[] => {
  return (
    categorySubcategories.find((entry) => entry.categorySlug === categorySlug)
      ?.subcategories ?? []
  );
};

export const getSubcategoryById = (
  categorySlug: string,
  subcategoryId: string,
): SubcategoryDefinition | undefined => {
  return getSubcategoriesForCategory(categorySlug).find(
    (subcategory) => subcategory.id === subcategoryId,
  );
};
