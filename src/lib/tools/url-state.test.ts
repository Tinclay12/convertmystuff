import { describe, expect, it } from "vitest";
import {
  buildShareUrl,
  buildUrlStateSearch,
  parseUrlState,
  pickUrlState,
} from "./url-state";

describe("url-state", () => {
  it("parses allowed numeric and boolean params", () => {
    const params = new URLSearchParams("purchasePrice=350000&interestOnly=1&mode=payment");
    const state = parseUrlState(params, ["purchasePrice", "interestOnly", "mode", "ignored"]);

    expect(state).toEqual({
      purchasePrice: 350000,
      interestOnly: true,
      mode: "payment",
    });
  });

  it("builds a query string from state", () => {
    expect(
      buildUrlStateSearch({
        homePrice: 450000,
        downPayment: 90000,
        interestRate: 6.5,
        includePmi: false,
      }),
    ).toBe("?homePrice=450000&downPayment=90000&interestRate=6.5&includePmi=0");
  });

  it("picks a subset of keys", () => {
    const picked = pickUrlState(
      { a: 1, b: 2, c: 3 },
      ["a", "c"],
    );
    expect(picked).toEqual({ a: 1, c: 3 });
  });

  it("builds share URLs with pathname and query", () => {
    const url = buildShareUrl("/finance-calculators/loans-payments/mortgage-calculator-pro/", {
      homePrice: 400000,
    });
    expect(url).toContain("/finance-calculators/loans-payments/mortgage-calculator-pro/");
    expect(url).toContain("homePrice=400000");
  });
});
