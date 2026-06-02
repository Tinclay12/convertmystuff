import { describe, expect, it } from "vitest";
import {
  applyExampleToFields,
  buildToolShareSearch,
  getExamplePrefillQuery,
  getExamplePrefillValue,
  parseToolSearchParams,
} from "@/lib/tools/tool-prefill";
import type { ToolExample } from "@/lib/tools/types";

describe("tool-prefill", () => {
  it("derives prefill from example input when prefillValue is absent", () => {
    const example: ToolExample = {
      title: "10 hectares",
      input: "10",
      output: "24.71",
    };
    expect(getExamplePrefillValue(example)).toBe("10");
  });

  it("builds query strings for chips and share links", () => {
    const example: ToolExample = {
      title: "BMI sample",
      input: "70 kg, 170 cm",
      output: "24.2",
      prefillQuery: "weightKg=70&heightCm=170",
    };
    expect(getExamplePrefillQuery(example)).toBe("weightKg=70&heightCm=170");
    expect(buildToolShareSearch({ weightKg: "70", heightCm: "170" })).toBe(
      "weightKg=70&heightCm=170",
    );
  });

  it("parses URL search params for value and fields", () => {
    const params = new URLSearchParams("value=2.5&loanAmount=250000&annualRate=7");
    expect(parseToolSearchParams(params)).toEqual({
      value: "2.5",
      fields: { loanAmount: "250000", annualRate: "7" },
    });
  });

  it("maps comma-separated example input to calculator fields", () => {
    const example: ToolExample = {
      title: "Tip split",
      input: "85, 18, 2",
      output: "sample",
    };
    expect(
      applyExampleToFields(example, ["billAmount", "tipPercent", "people"]),
    ).toEqual({
      billAmount: "85",
      tipPercent: "18",
      people: "2",
    });
  });
});
