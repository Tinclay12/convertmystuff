import { describe, expect, it } from "vitest";
import { buildRootSitemap } from "./sitemaps";

describe("buildRootSitemap", () => {
  it("includes the converters hub", () => {
    const urls = buildRootSitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/converters/"))).toBe(true);
  });
});
