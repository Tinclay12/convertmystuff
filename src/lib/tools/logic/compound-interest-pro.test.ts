import { describe, expect, it } from "vitest";
import { buildCompoundInterestSchedule, scheduleToCsv } from "./compound-interest-pro";

describe("compound-interest-pro", () => {
  it("builds a year-by-year schedule", () => {
    const rows = buildCompoundInterestSchedule(10000, 5, 2, 12);
    expect(rows).toHaveLength(2);
    expect(rows[0].year).toBe(1);
    expect(rows[1].balance).toBeGreaterThan(rows[0].balance);
  });

  it("exports schedule csv", () => {
    const csv = scheduleToCsv(buildCompoundInterestSchedule(1000, 10, 1, 1));
    expect(csv).toContain("Year,Balance");
    expect(csv.split("\n")).toHaveLength(2);
  });
});
