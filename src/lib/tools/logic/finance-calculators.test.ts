import { describe, expect, it } from "vitest";
import {
  calculateBreakEven,
  calculateCompoundInterest,
  calculateDiscount,
  calculateLoanPayment,
  calculateMargin,
  calculateMarkup,
  calculatePercentage,
  calculateTip,
} from "@/lib/tools/logic/finance-calculators";

describe("finance-calculators", () => {
  it("calculates percentage of a value", () => {
    const result = calculatePercentage({ value: 200, percent: 15 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.result).toBe(30);
    }
  });

  it("calculates tip, total, and per-person split", () => {
    const result = calculateTip({ billAmount: 80, tipPercent: 20, people: 4 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.tipAmount).toBe(16);
      expect(result.meta?.total).toBe(96);
      expect(result.meta?.perPerson).toBe(24);
    }
  });

  it("calculates discount and sale price", () => {
    const result = calculateDiscount({ originalPrice: 120, discountPercent: 25 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.finalPrice).toBe(90);
    }
  });

  it("calculates profit margin", () => {
    const result = calculateMargin({ cost: 40, price: 100 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.margin).toBe(60);
    }
  });

  it("calculates markup and selling price", () => {
    const result = calculateMarkup({ cost: 80, markupPercent: 50 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.price).toBe(120);
    }
  });

  it("projects compound interest growth", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      annualRate: 5,
      years: 10,
      compoundsPerYear: 12,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.amount).toBeGreaterThan(16000);
    }
  });

  it("calculates monthly loan payment", () => {
    const result = calculateLoanPayment({ loanAmount: 20000, annualRate: 6, termYears: 5 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.payment).toBeGreaterThan(380);
      expect(result.meta?.payment).toBeLessThan(395);
    }
  });

  it("calculates break-even units", () => {
    const result = calculateBreakEven({
      fixedCosts: 5000,
      pricePerUnit: 50,
      variableCostPerUnit: 20,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.meta?.units).toBeCloseTo(166.67, 1);
    }
  });

  it("rejects break-even when price equals variable cost", () => {
    const result = calculateBreakEven({
      fixedCosts: 5000,
      pricePerUnit: 20,
      variableCostPerUnit: 20,
    });
    expect(result.ok).toBe(false);
  });
});
