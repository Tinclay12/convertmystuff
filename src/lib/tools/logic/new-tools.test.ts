import { describe, expect, it } from "vitest";
import { calculateBreakEven, calculateTip } from "@/lib/tools/logic/finance-calculators";
import { convertColor, remToPx } from "@/lib/tools/logic/design-tools";
import { calculateAge, convertUnixTimestamp } from "@/lib/tools/logic/time-date-tools";
import { cupsToGrams, scaleRecipe } from "@/lib/tools/logic/kitchen-recipe-tools";
import { markdownToHtml, countDocumentWords } from "@/lib/tools/logic/document-tools";
import { generateOpenGraphPreview } from "@/lib/tools/logic/marketing-tools";

describe("new category tool logic", () => {
  it("calculates finance values", () => {
    expect(calculateTip({ billAmount: 100, tipPercent: 20, people: 2 }).ok).toBe(true);
    expect(calculateBreakEven({ fixedCosts: 1000, pricePerUnit: 50, variableCostPerUnit: 20 }).ok).toBe(
      true,
    );
  });

  it("converts design values", () => {
    expect(convertColor({ hex: "#ff0000" }).ok).toBe(true);
    expect(remToPx({ rem: 2, baseFontSize: 16 }).output).toContain("32");
  });

  it("calculates time and date values", () => {
    expect(calculateAge({ birthDate: "1990-01-01" }).ok).toBe(true);
    expect(convertUnixTimestamp({ mode: "toDate", input: "0" }).ok).toBe(true);
  });

  it("processes kitchen recipe values", () => {
    expect(cupsToGrams({ cups: 1, ingredient: "flour" }).ok).toBe(true);
    expect(
      scaleRecipe({
        ingredients: "2 cups flour",
        originalServings: 4,
        targetServings: 8,
      }).ok,
    ).toBe(true);
  });

  it("processes document text", () => {
    expect(markdownToHtml("# Title").ok).toBe(true);
    expect(countDocumentWords("one two three").meta?.words).toBe(3);
  });

  it("generates open graph preview output", () => {
    const result = generateOpenGraphPreview({
      title: "Example",
      description: "Description",
      url: "https://example.com",
      imageUrl: "",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("og:title");
    }
  });
});
