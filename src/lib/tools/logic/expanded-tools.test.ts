import { describe, expect, it } from "vitest";
import { assertPublishedToolSeo, getPublishedTools } from "@/lib/tools/access";
import { encodeBase64, decodeBase64 } from "@/lib/tools/logic/encoders";
import { yamlToJson, jsonToYaml, tsvToCsv } from "@/lib/tools/logic/data-converters";
import { removeEmptyLines, toCamelCase, countWords } from "@/lib/tools/logic/text-processing";
import { formatSql } from "@/lib/tools/logic/formatters";
import { generateUuid, generateLoremIpsum } from "@/lib/tools/logic/generators";
import {
  hectaresToAcres,
  metersToFeet,
  celsiusToFahrenheit,
  mbToGb,
  squareMetersToSquareFeet,
  ouncesToGrams,
  celsiusToKelvin,
  kbToMb,
  gbToTb,
} from "@/lib/tools/logic/unit-conversions";
import { calculateConcrete, calculateLumber } from "@/lib/tools/logic/construction-calculators";
import { calculateCashOnCash, calculateLtv } from "@/lib/tools/logic/real-estate-calculators";
import { generateSlug, generateHashtags } from "@/lib/tools/logic/marketing-tools";
import type { LogicResult, NumericResult } from "./unit-conversions";

const successful = (result: LogicResult) => {
  if (!result.ok) throw new Error(result.error);
  return result;
};
const numeric = (result: NumericResult) => {
  if (!result.ok) throw new Error(result.error);
  return result.value;
};

describe("expanded tool logic", () => {
  it("encodes and decodes base64", () => {
    const encoded = encodeBase64("Hello");
    expect(encoded.ok).toBe(true);
    if (encoded.ok) {
      const decoded = decodeBase64(encoded.output);
      expect(decoded.ok).toBe(true);
      if (decoded.ok) {
        expect(decoded.output).toBe("Hello");
      }
    }
  });

  it("converts yaml and json", () => {
    const yaml = "name: Ada\nactive: true";
    const toJson = yamlToJson(yaml);
    expect(toJson.ok).toBe(true);
    if (toJson.ok) {
      const back = jsonToYaml(toJson.output);
      expect(back.ok).toBe(true);
    }
  });

  it("converts tsv to csv", () => {
    const result = tsvToCsv("a\tb\n1\t2");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toBe("a,b\n1,2");
    }
  });

  it("processes text utilities", () => {
    expect(removeEmptyLines("a\n\nb").ok).toBe(true);
    expect(successful(toCamelCase("hello world")).output).toBe("helloWorld");
    expect(successful(countWords("one two three")).meta?.words).toBe(3);
  });

  it("formats sql", () => {
    const result = formatSql("SELECT id FROM users WHERE active = true", "pretty");
    expect(result.ok).toBe(true);
  });

  it("generates uuid and lorem ipsum", () => {
    expect(successful(generateUuid()).output).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(successful(generateLoremIpsum(2)).output.split("\n\n").length).toBe(2);
  });

  it("converts units", () => {
    expect(numeric(hectaresToAcres(1))).toBeCloseTo(2.47105, 3);
    expect(numeric(metersToFeet(1))).toBeCloseTo(3.28084, 3);
    expect(numeric(celsiusToFahrenheit(0))).toBe(32);
    expect(numeric(mbToGb(1024))).toBe(1);
  });

  it("converts expanded unit pairs", () => {
    expect(numeric(squareMetersToSquareFeet(1))).toBeCloseTo(10.7639, 2);
    expect(numeric(ouncesToGrams(1))).toBeCloseTo(28.3495, 2);
    expect(numeric(celsiusToKelvin(0))).toBe(273.15);
    expect(numeric(kbToMb(1024))).toBe(1);
    expect(numeric(gbToTb(1024))).toBe(1);
  });

  it("calculates construction and real estate values", () => {
    expect(calculateConcrete({ length: 10, width: 10, depth: 4 }).ok).toBe(true);
    expect(calculateLumber({ length: 8, width: 6, thickness: 2, quantity: 1 }).ok).toBe(true);
    expect(calculateCashOnCash({ annualCashFlow: 10000, totalCashInvested: 100000 }).ok).toBe(true);
    expect(calculateLtv({ loanAmount: 280000, propertyValue: 350000 }).ok).toBe(true);
  });

  it("generates marketing outputs", () => {
    expect(successful(generateSlug("Hello World Tool")).output).toBe("hello-world-tool");
    expect(successful(generateHashtags("real estate investing")).output).toContain("#Real");
  });
});

describe("published tool seo coverage", () => {
  it("has 40+ published tools", () => {
    expect(getPublishedTools().length).toBeGreaterThanOrEqual(100);
  });

  it("ensures published tools have seo content basics", () => {
    const published = getPublishedTools();
    const failing = published.filter((tool) => !assertPublishedToolSeo(tool));
    expect(failing.map((tool) => tool.id)).toEqual([]);
  });
});
