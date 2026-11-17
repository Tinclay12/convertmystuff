import { describe, expect, it } from "vitest";
import { solvePercentage, type PercentageMode } from "./percentage-workbench";
import { parseToolSearchParams, buildToolShareSearch } from "../tool-prefill";

describe("percentage workbench", () => {
  it.each<[PercentageMode, Record<string, string>, number]>([
    ["of", { value: "200", percent: "15" }, 30],
    ["ratio", { part: "42", total: "50" }, 84],
    ["ratio", { part: "300", total: "200" }, 150],
    ["increase", { value: "80", percent: "25" }, 100],
    ["decrease", { value: "80", percent: "25" }, 60],
    ["decrease", { value: "80", percent: "100" }, 0],
    ["change", { oldValue: "40", newValue: "50" }, 25],
    ["change", { oldValue: "50", newValue: "40" }, -20],
    ["change", { oldValue: "50", newValue: "0" }, -100],
    ["reverse", { finalValue: "85", percent: "15" }, 100],
  ])("solves %s without rounding the calculation", (mode, values, expected) => {
    const result = solvePercentage(mode, values);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error(result.error);
    expect(result.answer.value).toBeCloseTo(expected, 10);
  });

  it("does not silently turn missing inputs into zero", () => {
    expect(solvePercentage("of", { value: "200", percent: "" })).toMatchObject({
      ok: false,
      incomplete: true,
    });
    expect(solvePercentage("of", { value: "0", percent: "15" })).toMatchObject({
      ok: true,
      answer: { value: 0 },
    });
  });

  it.each<[PercentageMode, Record<string, string>]>([
    ["ratio", { part: "10", total: "0" }],
    ["change", { oldValue: "0", newValue: "50" }],
    ["reverse", { finalValue: "85", percent: "100" }],
    ["decrease", { value: "85", percent: "101" }],
    ["of", { value: "Infinity", percent: "10" }],
    ["of", { value: "-1", percent: "10" }],
    ["of", { value: "1e308", percent: "1e308" }],
  ])("handles invalid %s inputs", (mode, values) => {
    expect(solvePercentage(mode, values)).toMatchObject({
      ok: false,
      incomplete: false,
    });
  });

  it("restores a percent-of share link using both renderer prop channels", () => {
    const parsed = parseToolSearchParams(
      new URLSearchParams(
        buildToolShareSearch({ mode: "of", value: "250", percent: "12.5" }),
      ),
    );
    const result = solvePercentage("of", {
      ...parsed.fields,
      value: parsed.value!,
    });
    expect(result).toMatchObject({ ok: true, answer: { value: 31.25 } });
  });
});
