import { describe, expect, it } from "vitest";
import { parsePageRangeSpec } from "@/lib/tools/logic/document-tools";

describe("document-tools page ranges", () => {
  it("parses all pages", () => {
    const result = parsePageRangeSpec("all", 5);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it("parses comma and range specs", () => {
    const result = parsePageRangeSpec("1-2, 4", 5);
    expect(result).toEqual([0, 1, 3]);
  });

  it("returns error for invalid range", () => {
    const result = parsePageRangeSpec("9", 5);
    expect(result).toEqual({ error: "Invalid page number: 9" });
  });
});
