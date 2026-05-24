import { describe, expect, it } from "vitest";
import {
  calculateServings,
  convertIngredientUnits,
  convertOvenTemp,
  cupsToGrams,
  scaleRecipe,
  tbspToMl,
} from "@/lib/tools/logic/kitchen-recipe-tools";

describe("kitchen-recipe-tools", () => {
  it("scales recipe ingredient quantities", () => {
    const result = scaleRecipe({
      ingredients: "2 cups flour\n1 cup sugar",
      originalServings: 4,
      targetServings: 8,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("4 cups flour");
      expect(result.output).toContain("2 cup sugar");
    }
  });

  it("converts cups to grams using ingredient density", () => {
    const result = cupsToGrams({ cups: 2, ingredient: "flour" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.grams).toBe(240);
    }
  });

  it("converts tablespoons to milliliters", () => {
    const result = tbspToMl({ tbsp: 3 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.ml).toBeCloseTo(44.36, 1);
    }
  });

  it("converts fahrenheit to celsius", () => {
    const result = convertOvenTemp({ value: 350, from: "fahrenheit" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("176.7");
    }
  });

  it("calculates serving multiplier", () => {
    const result = calculateServings({ recipeServings: 6, guests: 15 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.multiplier).toBe(2.5);
    }
  });

  it("converts cups to tablespoons", () => {
    const result = convertIngredientUnits({ amount: 1, fromUnit: "cup", toUnit: "tbsp" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("16");
    }
  });
});
