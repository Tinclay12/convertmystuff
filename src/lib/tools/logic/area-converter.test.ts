import { describe, expect, it } from "vitest";
import {
  SQUARE_FEET_PER_ACRE,
  acresToSquareFeet,
  squareFeetToAcres,
} from "@/lib/tools/logic/area-converter";

describe("area-converter", () => {
  it("converts acres to square feet", () => {
    const result = acresToSquareFeet(2);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(2 * SQUARE_FEET_PER_ACRE);
    }
  });

  it("converts square feet to acres", () => {
    const result = squareFeetToAcres(SQUARE_FEET_PER_ACRE);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(1);
    }
  });
});
