import type { MetadataRoute } from "next";
import { buildRootSitemap } from "@/lib/seo/sitemaps";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildRootSitemap();
}

export const dynamic = "force-static";
