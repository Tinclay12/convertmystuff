import { describe, expect, it } from "vitest";
import { buildDiffLines } from "./text-diff-pro";

describe("text-diff-pro", () => {
  it("marks added and removed lines", () => {
    const diff = buildDiffLines("alpha\nbeta", "alpha\ngamma");
    expect(diff.leftLines.some((line) => line.type === "removed")).toBe(true);
    expect(diff.rightLines.some((line) => line.type === "added")).toBe(true);
  });
});
