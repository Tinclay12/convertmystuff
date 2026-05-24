import { describe, expect, it } from "vitest";
import { analyzeRentalDeal } from "./rental-deal-analyzer";

describe("analyzeRentalDeal", () => {
  it("calculates core metrics for a leveraged rental deal", () => {
    const result = analyzeRentalDeal({
      purchasePrice: 350_000,
      closingCosts: 10_000,
      rehabCosts: 5_000,
      squareFeet: 1800,
      grossMonthlyRent: 2800,
      otherMonthlyIncome: 0,
      vacancyRate: 5,
      propertyTax: 350,
      insurance: 150,
      hoa: 0,
      maintenance: 200,
      management: 280,
      utilities: 0,
      otherExpenses: 0,
      downPayment: 70_000,
      interestRate: 6.5,
      termYears: 30,
      interestOnly: false,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.grossAnnualIncome).toBe(33_600);
    expect(result.noi).toBeCloseTo(20_160, 0);
    expect(result.capRate).toBeCloseTo(5.76, 1);
    expect(result.loanAmount).toBe(280_000);
    expect(result.monthlyCashFlow).toBeLessThan(500);
    expect(result.dscr).not.toBeNull();
    expect(result.pricePerSqFt).toBeCloseTo(194.44, 1);
  });

  it("rejects invalid purchase price", () => {
    const result = analyzeRentalDeal({
      purchasePrice: 0,
      closingCosts: 0,
      rehabCosts: 0,
      grossMonthlyRent: 2000,
      otherMonthlyIncome: 0,
      vacancyRate: 5,
      propertyTax: 0,
      insurance: 0,
      hoa: 0,
      maintenance: 0,
      management: 0,
      utilities: 0,
      otherExpenses: 0,
      downPayment: 0,
      interestRate: 6,
      termYears: 30,
      interestOnly: false,
    });

    expect(result.ok).toBe(false);
  });
});
