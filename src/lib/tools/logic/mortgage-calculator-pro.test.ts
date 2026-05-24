import { describe, expect, it } from "vitest";
import {
  buildAmortizationSchedule,
  calculateAffordability,
  calculateMonthlyPi,
  calculateMortgagePayment,
} from "./mortgage-calculator-pro";

describe("mortgage-calculator-pro", () => {
  it("calculates standard monthly P&I", () => {
    const payment = calculateMonthlyPi(280_000, 6.5, 30);
    expect(payment).toBeCloseTo(1769.79, 1);
  });

  it("returns PITI breakdown and schedule", () => {
    const result = calculateMortgagePayment({
      homePrice: 350_000,
      downPayment: 70_000,
      interestRate: 6.5,
      termYears: 30,
      propertyTaxAnnual: 4200,
      insuranceAnnual: 1800,
      pmiMonthly: 0,
      hoaMonthly: 0,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.loanAmount).toBe(280_000);
    expect(result.principalAndInterest).toBeCloseTo(1769.79, 0);
    expect(result.totalMonthly).toBeGreaterThan(result.principalAndInterest);
    expect(result.schedule.length).toBe(360);
    expect(result.schedule[0]?.balance).toBeLessThan(280_000);
  });

  it("shortens schedule with extra payments", () => {
    const base = buildAmortizationSchedule(200_000, 6, 30);
    const extra = buildAmortizationSchedule(200_000, 6, 30, 200);
    expect(extra.length).toBeLessThan(base.length);
  });

  it("calculates affordability reverse solve", () => {
    const result = calculateAffordability({
      annualIncome: 120_000,
      monthlyDebts: 500,
      targetDti: 36,
      downPaymentAvailable: 60_000,
      interestRate: 6.5,
      termYears: 30,
      estimatedEscrow: 400,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.maxHomePrice).toBeGreaterThan(200_000);
    expect(result.maxLoanAmount).toBeGreaterThan(0);
  });
});
