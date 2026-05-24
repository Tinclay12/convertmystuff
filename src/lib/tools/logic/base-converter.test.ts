import { describe, expect, it } from "vitest";
import { convertNumberBase } from "@/lib/tools/logic/base-converter";

describe("base-converter", () => {
  it("converts decimal to hex", () => {
    const result = convertNumberBase("255", 10, 16);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toBe("0xFF");
    }
  });

  it("converts binary to decimal", () => {
    const result = convertNumberBase("1010", 2, 10);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toBe("10");
    }
  });
});
