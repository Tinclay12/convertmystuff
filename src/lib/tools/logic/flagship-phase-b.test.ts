import { describe, expect, it } from "vitest";
import { calculateBmi, calculateCalories, calculateMacros } from "./health-calculators";
import { generatePassphrase, generatePassword } from "./password-generator";
import { testRegex } from "./regex-tester";
import { decodeJwt } from "./jwt-decoder";
import { csvToHtmlTable } from "./csv-to-html-table";
import {
  buildCronExpression,
  describeCron,
  presetToCron,
  validateCron,
} from "./cron-builder";

describe("health calculators", () => {
  it("calculates BMI for metric input", () => {
    const result = calculateBmi({ unitSystem: "metric", heightCm: 170, weightKg: 70 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.bmi).toBeCloseTo(24.22, 1);
      expect(result.category).toBe("Normal");
    }
  });

  it("calculates calories with Mifflin-St Jeor", () => {
    const result = calculateCalories({
      age: 30,
      sex: "male",
      heightCm: 178,
      weightKg: 81.6,
      activityLevel: "moderate",
      goal: "maintain",
      weeklyChangeLbs: 1,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.tdee).toBeGreaterThan(result.bmr);
      expect(result.targetCalories).toBeCloseTo(result.tdee, 0);
    }
  });

  it("calculates balanced macros", () => {
    const result = calculateMacros({
      dailyCalories: 2000,
      preset: "balanced",
      mealsPerDay: 3,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.proteinGrams).toBeCloseTo(150, 0);
      expect(result.carbsGrams).toBeCloseTo(200, 0);
      expect(result.fatGrams).toBeCloseTo(66.7, 0);
    }
  });
});

describe("password generator", () => {
  it("generates password with selected length", () => {
    const result = generatePassword({
      length: 12,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.password).toHaveLength(12);
      expect(result.entropy).toBeGreaterThan(0);
    }
  });

  it("generates passphrase with words", () => {
    const result = generatePassphrase({
      wordCount: 4,
      separator: "-",
      capitalize: false,
      includeNumber: false,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.passphrase.split("-")).toHaveLength(4);
    }
  });
});

describe("regex tester", () => {
  it("finds global matches", () => {
    const result = testRegex("\\d+", "a1 b22 c333", { g: true, i: false, m: false, s: false, u: false });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matches).toHaveLength(3);
    }
  });
});

describe("jwt decoder", () => {
  it("decodes header and payload", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const result = decodeJwt(token);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.decoded.header.alg).toBe("HS256");
      expect(result.decoded.payload.sub).toBe("1234567890");
    }
  });
});

describe("csv to html table", () => {
  it("converts csv to html table markup", () => {
    const result = csvToHtmlTable("name,email\nAda,ada@example.com", {
      striped: true,
      bordered: true,
      tableClass: "",
      tableId: "",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.html).toContain("<table");
      expect(result.html).toContain("Ada");
      expect(result.rowCount).toBe(1);
      expect(result.columnCount).toBe(2);
    }
  });
});

describe("cron builder", () => {
  it("builds daily midnight preset", () => {
    const fields = presetToCron("daily-midnight");
    expect(buildCronExpression(fields)).toBe("0 0 * * *");
    expect(describeCron(fields)).toContain("Daily");
    expect(validateCron(fields)).toBeNull();
  });
});
