import { describe, expect, it } from "vitest";
import { DEFAULT_TOOL_LIMITS } from "@/lib/limits";
import { testRegex } from "@/lib/tools/logic/regex-tester";

describe("regex tester", () => {
  it("rejects test strings over the length limit", () => {
    const longString = "a".repeat(DEFAULT_TOOL_LIMITS.maxRegexTestStringLength + 1);
    const result = testRegex("a", longString, { g: true, i: false, m: false, s: false, u: false });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("exceeds");
    }
  });

  it("rejects patterns that produce too many matches", () => {
    const testString = "a".repeat(DEFAULT_TOOL_LIMITS.maxRegexMatches + 1);
    const result = testRegex("a", testString, { g: true, i: false, m: false, s: false, u: false });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Too many matches");
    }
  });
});
