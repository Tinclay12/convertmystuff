import type { MetadataRoute } from "next";
import { getAllCategories, getPublishedTools, isCategoryVisible } from "@/lib/tools/access";
import { getSubcategoriesForCategory } from "@/lib/tools/subcategories";
import { getAllGuides } from "@/lib/content/guides";
import { getAllResources } from "@/lib/content/resources";
import { toAbsoluteUrl } from "@/lib/seo/site";

const buildStaticEntries = (): MetadataRoute.Sitemap => {
  const now = new Date();
  return [
    {
      url: toAbsoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: toAbsoluteUrl("/tools/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: toAbsoluteUrl("/guides/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: toAbsoluteUrl("/resources/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: toAbsoluteUrl("/privacy/"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: toAbsoluteUrl("/terms/"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
};

const buildGuideEntries = (): MetadataRoute.Sitemap => {
  return getAllGuides().map((guide) => ({
    url: toAbsoluteUrl(`/guides/${guide.slug}/`),
    lastModified: new Date(guide.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
};

const buildResourceEntries = (): MetadataRoute.Sitemap => {
  const categoryPaths = new Set<string>();
  const entries: MetadataRoute.Sitemap = getAllResources().map((resource) => {
    categoryPaths.add(`/resources/${resource.categorySlug}/`);
    return {
      url: toAbsoluteUrl(`/resources/${resource.categorySlug}/${resource.slug}/`),
      lastModified: new Date(resource.lastReviewed),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    };
  });

  categoryPaths.forEach((path) => {
    entries.push({
      url: toAbsoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  });

  return entries;
};

export const buildCategorySitemap = (categorySlug: string): MetadataRoute.Sitemap => {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const category = getAllCategories().find((item) => item.slug === categorySlug);
  if (category && isCategoryVisible(categorySlug)) {
    entries.push({
      url: toAbsoluteUrl(category.path),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    getSubcategoriesForCategory(categorySlug).forEach((subcategory) => {
      entries.push({
        url: toAbsoluteUrl(`/${categorySlug}/${subcategory.id}/`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
      });
    });
  }

  getPublishedTools()
    .filter((tool) => tool.category === categorySlug)
    .forEach((tool) => {
      entries.push({
        url: toAbsoluteUrl(tool.path),
        lastModified: new Date(tool.lastReviewed),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

  return entries;
};

export const getSitemapCategorySlugs = (): string[] => {
  return getAllCategories()
    .filter((category) => isCategoryVisible(category.slug))
    .map((category) => category.slug);
};

export const buildRootSitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();
  const entries = [...buildStaticEntries(), ...buildGuideEntries(), ...buildResourceEntries()];

  getSitemapCategorySlugs().forEach((categorySlug) => {
    entries.push({
      url: toAbsoluteUrl(`/sitemaps/sitemap/${categorySlug}.xml`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return entries;
};
