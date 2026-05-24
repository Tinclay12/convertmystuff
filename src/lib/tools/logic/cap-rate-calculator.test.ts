import { describe, expect, it } from "vitest";
import { calculateCapRate } from "@/lib/tools/logic/cap-rate-calculator";

describe("cap-rate-calculator", () => {
  it("calculates NOI and cap rate", () => {
    const result = calculateCapRate({
      propertyValue: 500_000,
      grossIncome: 60_000,
      vacancyRate: 5,
      operatingExpenses: 12_000,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.noi).toBe(45_000);
      expect(result.capRatePercent).toBe("9.00%");
    }
  });

  it("rejects invalid property values", () => {
    const result = calculateCapRate({
      propertyValue: 0,
      grossIncome: 60_000,
      vacancyRate: 5,
      operatingExpenses: 12_000,
    });

    expect(result.ok).toBe(false);
  });
});
