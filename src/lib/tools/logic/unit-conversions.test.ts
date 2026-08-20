import { describe, expect, it } from "vitest";
import {
  buildConversionTableRows,
  formatPlainNumber,
  squareFeetToAcres,
  squareMetersToSquareFeet,
} from "./unit-conversions";

describe("unit conversion helpers", () => {
  it("formats plain numbers without grouping separators", () => {
    expect(formatPlainNumber(43560)).toBe("43560");
    expect(formatPlainNumber(10.7639104167).startsWith("10.7639")).toBe(true);
  });

  it("builds conversion table rows for square feet to acres", () => {
    const rows = buildConversionTableRows(squareFeetToAcres, [43560, 87120]);
    expect(rows).toHaveLength(2);
    expect(rows[0]?.output).toBe(1);
    expect(rows[1]?.output).toBe(2);
  });

  it("converts 100 square meters to about 1076.39 square feet", () => {
    const result = squareMetersToSquareFeet(100);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBeCloseTo(1076.391, 3);
    }
  });
});
