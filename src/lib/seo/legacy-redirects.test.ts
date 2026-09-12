import { describe, expect, it } from "vitest";
import { buildLegacyRedirects } from "../../../scripts/generate-legacy-redirects";
import { getAllCategories, getPublishedTools } from "@/lib/tools/access";
import { getSubcategoriesForCategory } from "@/lib/tools/subcategories";
import committed from "./legacy-redirects.json";

describe("legacy tool redirects", () => {
  const generated = buildLegacyRedirects();

  it("committed json matches the registry", () => {
    expect(committed).toEqual(generated);
  });

  it("never shadows a live URL", () => {
    const live = new Set<string>();
    for (const category of getAllCategories()) {
      live.add(category.path);
      for (const subcategory of getSubcategoriesForCategory(category.slug)) {
        live.add(`/${category.slug}/${subcategory.id}/`);
      }
    }
    for (const tool of getPublishedTools()) {
      live.add(tool.path);
    }

    for (const { source } of generated) {
      expect(live.has(source), `${source} shadows a live page`).toBe(false);
    }
  });

  it("points every redirect at a published tool", () => {
    const toolPaths = new Set(getPublishedTools().map((tool) => tool.path));
    for (const { source, destination } of generated) {
      expect(toolPaths.has(destination), `${source} -> ${destination} is not a tool`).toBe(true);
    }
  });

  it("has no loops, chains, or duplicate sources", () => {
    const sources = generated.map((entry) => entry.source);
    expect(new Set(sources).size).toBe(sources.length);

    const sourceSet = new Set(sources);
    for (const { source, destination } of generated) {
      expect(destination).not.toBe(source);
      expect(sourceSet.has(destination), `${destination} is also a redirect source`).toBe(false);
    }
  });

  it("recovers the flagship URLs submitted to Search Console", () => {
    const expected: Record<string, string> = {
      "/document-tools/pdf-merge/": "/document-tools/pdf-tools/pdf-merge/",
      "/document-tools/pdf-split/": "/document-tools/pdf-tools/pdf-split/",
      "/health-fitness-calculators/bmi-calculator/":
        "/health-fitness-calculators/body-metrics/bmi-calculator/",
      "/image-tools/image-resizer/": "/image-tools/resizers-compressors/image-resizer/",
      "/image-tools/image-compressor/": "/image-tools/resizers-compressors/image-compressor/",
      "/construction-calculators/concrete-calculator/":
        "/construction-calculators/concrete-cement/concrete-calculator/",
      "/real-estate-calculators/rental-deal-analyzer/":
        "/real-estate-calculators/investment-metrics/rental-deal-analyzer/",
      "/finance-calculators/compound-interest-calculator/":
        "/finance-calculators/investment-basics/compound-interest-calculator/",
      "/finance-calculators/mortgage-calculator-pro/":
        "/finance-calculators/loans-payments/mortgage-calculator-pro/",
    };

    for (const [source, destination] of Object.entries(expected)) {
      expect(generated).toContainEqual({ source, destination });
    }
  });
});
