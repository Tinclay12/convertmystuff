import { describe, expect, it } from "vitest";
import { formatJson, validateJson } from "@/lib/tools/logic/json-formatter";

describe("json-formatter", () => {
  it("pretty prints valid JSON", () => {
    const result = formatJson('{"name":"Ada"}', "pretty");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain('"name": "Ada"');
    }
  });

  it("minifies valid JSON", () => {
    const result = formatJson('{\n  "name": "Ada"\n}', "minify");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toBe('{"name":"Ada"}');
    }
  });

  it("returns an error for invalid JSON", () => {
    const result = validateJson("{invalid");
    expect(result.ok).toBe(false);
  });
});
