import { describe, expect, it } from "vitest";
import { getAllGuides } from "@/lib/content/guides";
import { getAllResources } from "@/lib/content/resources";
import { getPublishedTools } from "@/lib/tools/access";
import retired from "./retired-guide-redirects.json";

describe("retired guide redirects", () => {
  const livePaths = new Set<string>([
    ...getAllGuides().map((guide) => `/guides/${guide.slug}/`),
    ...getAllResources().map((r) => `/resources/${r.categorySlug}/${r.slug}/`),
    ...getPublishedTools().map((tool) => tool.path),
  ]);

  it("every retired guide is actually gone from the registry", () => {
    const liveGuides = new Set(getAllGuides().map((guide) => `/guides/${guide.slug}/`));
    for (const { source } of retired) {
      expect(liveGuides.has(source), `${source} still renders — remove it or drop the redirect`).toBe(
        false,
      );
    }
  });

  it("every destination is a live page", () => {
    for (const { source, destination } of retired) {
      expect(livePaths.has(destination), `${source} -> ${destination} is not a live page`).toBe(true);
    }
  });

  it("has no loops, chains, or duplicate sources", () => {
    const sources = retired.map((entry) => entry.source);
    expect(new Set(sources).size).toBe(sources.length);

    const sourceSet = new Set(sources);
    for (const { source, destination } of retired) {
      expect(destination).not.toBe(source);
      expect(sourceSet.has(destination), `${destination} is also a redirect source`).toBe(false);
    }
  });

  it("leaves no tool or article pointing at a retired guide", () => {
    const retiredSlugs = new Set(
      retired.map((entry) => entry.source.replace(/^\/guides\//, "").replace(/\/$/, "")),
    );

    for (const tool of getPublishedTools()) {
      if (tool.guideSlug) {
        expect(retiredSlugs.has(tool.guideSlug), `${tool.id} links a retired guide`).toBe(false);
      }
    }

    for (const guide of getAllGuides()) {
      for (const slug of guide.relatedGuideSlugs ?? []) {
        expect(retiredSlugs.has(slug), `guide ${guide.slug} links a retired guide`).toBe(false);
      }
    }

    for (const resource of getAllResources()) {
      for (const slug of resource.relatedGuideSlugs ?? []) {
        expect(retiredSlugs.has(slug), `resource ${resource.slug} links a retired guide`).toBe(false);
      }
    }
  });
});
