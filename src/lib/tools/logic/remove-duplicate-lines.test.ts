import { describe, expect, it } from "vitest";
import { removeDuplicateLines } from "@/lib/tools/logic/remove-duplicate-lines";

describe("remove-duplicate-lines", () => {
  it("removes duplicate lines while preserving order", () => {
    const result = removeDuplicateLines("apple\nbanana\napple\norange");
    expect(result.output).toBe("apple\nbanana\norange");
    expect(result.removedCount).toBe(1);
  });

  it("supports case-insensitive matching", () => {
    const result = removeDuplicateLines("Apple\napple", { caseSensitive: false });
    expect(result.output).toBe("Apple");
    expect(result.removedCount).toBe(1);
  });
});
