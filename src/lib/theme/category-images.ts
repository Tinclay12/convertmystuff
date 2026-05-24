const categoryHeroImages: Record<string, string> = {
  "developer-tools": "/images/category-developer-tools.webp",
  "unit-converters": "/images/category-unit-converters.webp",
  "finance-calculators": "/images/category-finance-calculators.webp",
  "real-estate-calculators": "/images/category-real-estate-calculators.webp",
};

export const getCategoryHeroImage = (slug: string): string | null => {
  return categoryHeroImages[slug] ?? null;
};

export const hasCategoryHeroImage = (slug: string): boolean => {
  return slug in categoryHeroImages;
};
