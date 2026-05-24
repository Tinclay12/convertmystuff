import type { MetadataRoute } from "next";
import { buildCategorySitemap, getSitemapCategorySlugs } from "@/lib/seo/sitemaps";

export async function generateSitemaps() {
  return getSitemapCategorySlugs().map((category) => ({ id: category }));
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const category = await props.id;
  return buildCategorySitemap(category);
}

export const dynamic = "force-static";
