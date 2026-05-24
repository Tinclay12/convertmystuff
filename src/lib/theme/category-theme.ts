export type CategoryAccent = {
  slug: string;
  accent: string;
  bg: string;
  border: string;
  text: string;
};

const categoryAccents: Record<string, CategoryAccent> = {
  "developer-tools": {
    slug: "developer-tools",
    accent: "var(--category-developer-tools-accent)",
    bg: "var(--category-developer-tools-bg)",
    border: "var(--category-developer-tools-border)",
    text: "var(--category-developer-tools-text)",
  },
  "text-tools": {
    slug: "text-tools",
    accent: "var(--category-text-tools-accent)",
    bg: "var(--category-text-tools-bg)",
    border: "var(--category-text-tools-border)",
    text: "var(--category-text-tools-text)",
  },
  "image-tools": {
    slug: "image-tools",
    accent: "var(--category-image-tools-accent)",
    bg: "var(--category-image-tools-bg)",
    border: "var(--category-image-tools-border)",
    text: "var(--category-image-tools-text)",
  },
  "document-tools": {
    slug: "document-tools",
    accent: "var(--category-document-tools-accent)",
    bg: "var(--category-document-tools-bg)",
    border: "var(--category-document-tools-border)",
    text: "var(--category-document-tools-text)",
  },
  "unit-converters": {
    slug: "unit-converters",
    accent: "var(--category-unit-converters-accent)",
    bg: "var(--category-unit-converters-bg)",
    border: "var(--category-unit-converters-border)",
    text: "var(--category-unit-converters-text)",
  },
  "construction-calculators": {
    slug: "construction-calculators",
    accent: "var(--category-construction-calculators-accent)",
    bg: "var(--category-construction-calculators-bg)",
    border: "var(--category-construction-calculators-border)",
    text: "var(--category-construction-calculators-text)",
  },
  "real-estate-calculators": {
    slug: "real-estate-calculators",
    accent: "var(--category-real-estate-calculators-accent)",
    bg: "var(--category-real-estate-calculators-bg)",
    border: "var(--category-real-estate-calculators-border)",
    text: "var(--category-real-estate-calculators-text)",
  },
  "marketing-tools": {
    slug: "marketing-tools",
    accent: "var(--category-marketing-tools-accent)",
    bg: "var(--category-marketing-tools-bg)",
    border: "var(--category-marketing-tools-border)",
    text: "var(--category-marketing-tools-text)",
  },
  "time-date-tools": {
    slug: "time-date-tools",
    accent: "var(--category-time-date-tools-accent)",
    bg: "var(--category-time-date-tools-bg)",
    border: "var(--category-time-date-tools-border)",
    text: "var(--category-time-date-tools-text)",
  },
  "design-tools": {
    slug: "design-tools",
    accent: "var(--category-design-tools-accent)",
    bg: "var(--category-design-tools-bg)",
    border: "var(--category-design-tools-border)",
    text: "var(--category-design-tools-text)",
  },
  "kitchen-recipe-tools": {
    slug: "kitchen-recipe-tools",
    accent: "var(--category-kitchen-recipe-tools-accent)",
    bg: "var(--category-kitchen-recipe-tools-bg)",
    border: "var(--category-kitchen-recipe-tools-border)",
    text: "var(--category-kitchen-recipe-tools-text)",
  },
  "finance-calculators": {
    slug: "finance-calculators",
    accent: "var(--category-finance-calculators-accent)",
    bg: "var(--category-finance-calculators-bg)",
    border: "var(--category-finance-calculators-border)",
    text: "var(--category-finance-calculators-text)",
  },
  "health-fitness-calculators": {
    slug: "health-fitness-calculators",
    accent: "var(--category-health-fitness-calculators-accent)",
    bg: "var(--category-health-fitness-calculators-bg)",
    border: "var(--category-health-fitness-calculators-border)",
    text: "var(--category-health-fitness-calculators-text)",
  },
};

const defaultAccent = categoryAccents["developer-tools"];

export const getCategoryAccent = (slug: string): CategoryAccent => {
  return categoryAccents[slug] ?? defaultAccent;
};

export const getCategoryAccentStyles = (
  slug: string,
): Record<"--category-accent" | "--category-bg" | "--category-border" | "--category-text", string> => {
  const accent = getCategoryAccent(slug);
  return {
    "--category-accent": accent.accent,
    "--category-bg": accent.bg,
    "--category-border": accent.border,
    "--category-text": accent.text,
  };
};

export const getCategoryAccentClassName = (slug: string): string => {
  return `category-accent-${slug.replace(/[^a-z0-9-]/g, "-")}`;
};
