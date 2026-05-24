import type { NextRequest } from "next/server";
import { renderOgImage } from "@/lib/seo/og-image-card";

const OG_CACHE_CONTROL =
  "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800";

export const GET = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "ConvertMyStuff";
  const description = searchParams.get("description") ?? undefined;
  const eyebrow = searchParams.get("eyebrow") ?? undefined;
  const categorySlug = searchParams.get("category") ?? undefined;

  const response = renderOgImage({ title, description, eyebrow, categorySlug });
  response.headers.set("Cache-Control", OG_CACHE_CONTROL);
  return response;
};
