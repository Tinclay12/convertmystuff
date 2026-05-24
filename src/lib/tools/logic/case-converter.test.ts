import { describe, expect, it } from "vitest";
import { convertCase } from "@/lib/tools/logic/case-converter";

describe("case-converter", () => {
  it("converts to title case", () => {
    expect(convertCase("convert my stuff", "title")).toBe("Convert My Stuff");
  });

  it("converts to slug case", () => {
    expect(convertCase("Convert My Stuff!", "slug")).toBe("convert-my-stuff");
  });
});
