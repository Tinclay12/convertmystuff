import { describe, expect, it } from "vitest";
import {
  CONCRETE_TONS_PER_CUBIC_YARD,
  GRAVEL_TONS_PER_CUBIC_YARD,
  MULCH_TONS_PER_CUBIC_YARD,
  concreteCubicYardsToTons,
  gravelCubicYardsToTons,
  mulchCubicYardsToTons,
} from "@/lib/tools/logic/unit-conversions";

describe("material converters", () => {
  it("converts gravel cubic yards to tons", () => {
    const result = gravelCubicYardsToTons(3.7);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBeCloseTo(3.7 * GRAVEL_TONS_PER_CUBIC_YARD, 4);
    }
  });

  it("converts mulch cubic yards to tons", () => {
    const result = mulchCubicYardsToTons(5);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBeCloseTo(5 * MULCH_TONS_PER_CUBIC_YARD, 4);
    }
  });

  it("converts concrete cubic yards to tons", () => {
    const result = concreteCubicYardsToTons(2);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(2 * CONCRETE_TONS_PER_CUBIC_YARD);
    }
  });
});
