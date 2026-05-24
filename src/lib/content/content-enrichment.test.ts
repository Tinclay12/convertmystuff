import { describe, expect, it } from "vitest";
import { getToolContentEnrichment } from "@/lib/content/tools";
import { enrichToolDefinition } from "@/lib/content/merge-tool-content";
import {
  getEnrichedTool,
  getGuidesForCategory,
  getResolvedToolLinkGroups,
  hasContentEnrichment,
} from "@/lib/tools/access";

describe("content enrichment", () => {
  it("enriches BMI calculator with tier C content and guide", () => {
    const tool = getEnrichedTool("bmi-calculator");
    expect(tool?.contentTier).toBe("C");
    expect(tool?.guideSlug).toBe("what-is-bmi");
    expect(tool?.contentBlocks?.length).toBeGreaterThanOrEqual(3);
    expect(tool?.faqs?.length).toBeGreaterThanOrEqual(8);
  });

  it("enriches unit converters with snippets and workflow links", () => {
    const tool = getEnrichedTool("meters-to-feet");
    expect(tool?.contentTier).toBe("A");
    expect(tool?.contentBlocks?.length).toBeGreaterThanOrEqual(1);
    const groups = getResolvedToolLinkGroups(tool!);
    expect(groups.some((group) => group.label === "Reverse conversion")).toBe(true);
  });

  it("merges supplemental FAQs", () => {
    const enriched = enrichToolDefinition(
      getEnrichedTool("remove-empty-lines")!,
    );
    expect(enriched.faqs?.length).toBeGreaterThanOrEqual(4);
  });

  it("applies finance workflow groups", () => {
    const tool = getEnrichedTool("loan-payment-calculator");
    const groups = getResolvedToolLinkGroups(tool!);
    expect(groups.length).toBeGreaterThan(0);
    expect(groups.some((g) => g.tools.some((t) => t.id === "mortgage-calculator-pro"))).toBe(
      true,
    );
  });

  it("maps guides to categories", () => {
    const healthGuides = getGuidesForCategory("health-fitness-calculators");
    expect(healthGuides.length).toBeGreaterThanOrEqual(2);
  });

  it("detects enriched tools", () => {
    expect(hasContentEnrichment(getEnrichedTool("bmi-calculator")!)).toBe(true);
    expect(getToolContentEnrichment("hectares-to-acres")?.contentTier).toBe("A");
  });
});
