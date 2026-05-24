import { describe, expect, it } from "vitest";
import {
  calculateDscr,
  calculateGrm,
  calculateNoi,
} from "@/lib/tools/logic/real-estate-calculators";
import { unitConverterConfigs } from "@/lib/tools/logic/unit-conversions";
import { validateJsonInput } from "@/lib/tools/logic/validators";
import {
  generateRobotsTxt,
  generateTwitterCardTags,
} from "@/lib/tools/logic/marketing-tools";

describe("SEO roadmap tool logic", () => {
  it("calculates NOI", () => {
    const result = calculateNoi({
      grossIncome: 60000,
      vacancyRate: 5,
      operatingExpenses: 12000,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.noi).toBe(45000);
    }
  });

  it("calculates GRM", () => {
    const result = calculateGrm({ propertyValue: 500000, grossAnnualRent: 48000 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.grm).toBeCloseTo(10.416667, 4);
    }
  });

  it("calculates DSCR", () => {
    const result = calculateDscr({ noi: 45000, annualDebtService: 36000 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.dscr).toBeCloseTo(1.25, 2);
    }
  });

  it("converts inches to cm", () => {
    const config = unitConverterConfigs["inches-to-cm"];
    const result = config.convert(12);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBeCloseTo(30.48, 4);
    }
  });

  it("validates JSON input", () => {
    expect(validateJsonInput('{"ok":true}').ok).toBe(true);
    expect(validateJsonInput('{"ok":}').ok).toBe(false);
  });

  it("generates Twitter Card tags", () => {
    const result = generateTwitterCardTags({
      title: "Example",
      description: "Description",
      imageUrl: "https://example.com/card.png",
      cardType: "summary_large_image",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("twitter:card");
      expect(result.output).toContain("twitter:image");
    }
  });

  it("generates robots.txt", () => {
    const result = generateRobotsTxt({
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
      sitemap: "https://example.com/sitemap.xml",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("User-agent: *");
      expect(result.output).toContain("Disallow: /admin/");
      expect(result.output).toContain("Sitemap: https://example.com/sitemap.xml");
    }
  });
});
