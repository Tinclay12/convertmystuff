import { describe, expect, it } from "vitest";
import {
  getAllTools,
  getPublishedTools,
  getRegistryStats,
  getRelatedTools,
  getToolByPath,
  getToolsByCategory,
  isCategoryVisible,
} from "@/lib/tools/access";

describe("tool access layer", () => {
  it("returns published tools only", () => {
    expect(getPublishedTools().length).toBeGreaterThanOrEqual(40);
  });

  it("has 100+ tools in registry", () => {
    expect(getAllTools().length).toBeGreaterThanOrEqual(100);
  });

  it("reports registry stats", () => {
    const stats = getRegistryStats();
    expect(stats.live).toBeGreaterThanOrEqual(100);
    expect(stats.planned).toBe(0);
    expect(stats.total).toBeGreaterThanOrEqual(117);
  });

  it("finds tools by path", () => {
    const tool = getToolByPath("/developer-tools/json-formatter/");
    expect(tool?.id).toBe("json-formatter");
  });

  it("returns related published tools", () => {
    const related = getRelatedTools("json-to-csv");
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((tool) => tool.status === "published")).toBe(true);
  });

  it("groups tools by category", () => {
    const developerTools = getToolsByCategory("developer-tools");
    expect(developerTools.length).toBeGreaterThanOrEqual(14);
  });

  it("shows categories with planned tools", () => {
    expect(isCategoryVisible("finance-calculators")).toBe(true);
    expect(isCategoryVisible("image-tools")).toBe(true);
    expect(isCategoryVisible("health-fitness-calculators")).toBe(true);
  });
});
