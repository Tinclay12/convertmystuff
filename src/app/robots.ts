import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const host = siteUrl.replace(/^https?:\/\//, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/account/", "/draft/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host,
  };
}
