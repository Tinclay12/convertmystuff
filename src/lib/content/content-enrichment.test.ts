import { describe, expect, it } from "vitest";
import { getToolContentEnrichment } from "@/lib/content/tools";
import { enrichToolDefinition } from "@/lib/content/merge-tool-content";
import { getResourceBySlug } from "@/lib/content/resources";
import {
  getEnrichedTool,
  getGuideBySlug,
  getGuidesForCategory,
  getResolvedToolLinkGroups,
  hasContentEnrichment,
} from "@/lib/tools/access";
import { getCategoryFlagships } from "@/lib/tools/featured-tools";

describe("content enrichment", () => {
  it("enriches BMI calculator with tier C content and guide", () => {
    const tool = getEnrichedTool("bmi-calculator");
    expect(tool?.contentTier).toBe("C");
    expect(tool?.guideSlug).toBe("what-is-bmi");
    expect(tool?.contentBlocks?.length).toBeGreaterThanOrEqual(3);
    expect(tool?.faqs?.length).toBeGreaterThanOrEqual(8);
  });

  it("enriches square meters to square feet for the high-impression converter", () => {
    const tool = getEnrichedTool("square-meters-to-square-feet");
    expect(tool?.metaTitle.toLowerCase()).toContain("square meters to square feet");
    expect(tool?.faqs?.some((faq) => faq.question.toLowerCase().includes("1 square meter"))).toBe(
      true,
    );
    expect(tool?.contentBlocks?.some((block) => block.id === "why-107639")).toBe(true);
    expect(tool?.contentBlocks?.length).toBeGreaterThanOrEqual(3);
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

  it("retargets the BMI categories guide at WHO cutoff queries", () => {
    const guide = getGuideBySlug("bmi-categories-and-limitations");
    expect(guide?.metaTitle.toLowerCase()).toContain("bmi cutoffs");
    expect(guide?.referenceTable?.rows.length).toBeGreaterThanOrEqual(6);
    expect(guide?.faqs?.some((faq) => faq.question.toLowerCase().includes("cut off"))).toBe(true);
  });

  it("detects enriched tools", () => {
    expect(hasContentEnrichment(getEnrichedTool("bmi-calculator")!)).toBe(true);
    expect(getToolContentEnrichment("hectares-to-acres")?.contentTier).toBe("A");
  });

  it("enriches flagship sprint tools with workflow links", () => {
    const concrete = getEnrichedTool("concrete-calculator");
    const groups = getResolvedToolLinkGroups(concrete!);
    expect(groups.some((g) => g.tools.some((t) => t.id === "cement-calculator"))).toBe(true);

    const resizer = getEnrichedTool("image-resizer");
    const imageGroups = getResolvedToolLinkGroups(resizer!);
    expect(imageGroups.some((g) => g.tools.some((t) => t.id === "image-compressor"))).toBe(true);

    const favicon = getEnrichedTool("favicon-generator");
    const faviconGroups = getResolvedToolLinkGroups(favicon!);
    expect(faviconGroups.some((g) => g.tools.some((t) => t.id === "png-to-ico"))).toBe(true);
    expect(getEnrichedTool("ico-to-png")?.id).toBe("ico-to-png");
    expect(getEnrichedTool("favicon-generator")?.metaTitle.toLowerCase()).toContain("manifest");
    expect(getEnrichedTool("ico-to-png")?.metaTitle.toLowerCase()).toContain("ico to png");
  });

  it("retargets the ICO article at icon-file queries and the favicon generator", () => {
    const resource = getResourceBySlug("image-tools", "what-is-an-ico-file");
    expect(resource?.primaryToolId).toBe("favicon-generator");
    expect(resource?.metaTitle.toLowerCase()).toContain("ico file format");
    expect(resource?.keywords).toEqual(expect.arrayContaining(["ico file", "icon file", "ico files"]));
    expect(resource?.sections.some((section) => section.heading.toLowerCase().includes("ico file format"))).toBe(
      true,
    );
    expect(resource?.faqs?.some((faq) => faq.question.toLowerCase() === "what is an ico file?")).toBe(true);
  });

  it("keeps near-page-one resources pointed at their tools", () => {
    expect(getResourceBySlug("design-tools", "wcag-contrast-basics")?.primaryToolId).toBe("contrast-checker");
    expect(getResourceBySlug("design-tools", "wcag-contrast-basics")?.metaTitle.toLowerCase()).toContain("4.5:1");
    expect(getResourceBySlug("marketing-tools", "qr-code-url-best-practices")?.primaryToolId).toBe(
      "qr-code-generator",
    );
    expect(
      getResourceBySlug("finance-calculators", "how-to-calculate-percentage-change")?.examples?.length,
    ).toBeGreaterThanOrEqual(5);
    expect(getEnrichedTool("square-feet-to-acres")?.metaTitle.toLowerCase()).toContain("43,560");
  });

  it("spotlights the favicon cluster on the image tools hub", () => {
    const flagships = getCategoryFlagships("image-tools");
    expect(flagships.map((tool) => tool.id)).toEqual(["favicon-generator", "png-to-ico", "ico-to-png"]);
  });

  it("enriches compound interest with resources after the stub guide was retired", () => {
    const tool = getEnrichedTool("compound-interest-calculator");
    expect(tool?.guideSlug).toBeUndefined();
    expect(tool?.resourceSlugs?.length).toBeGreaterThanOrEqual(2);
  });
});
