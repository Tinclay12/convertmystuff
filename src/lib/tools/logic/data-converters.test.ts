import { describe, expect, it } from "vitest";
import { csvToYaml, jsonToToml, jsonToXml } from "@/lib/tools/logic/data-converters";

describe("data-converters", () => {
  it("converts JSON to XML with escaped text", () => {
    const result = jsonToXml('{"user":{"name":"Ada & Grace","role":"Engineer"}}');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(result.output).toContain("<name>Ada &amp; Grace</name>");
      expect(result.output).toContain("<role>Engineer</role>");
    }
  });

  it("rejects invalid JSON for xml conversion", () => {
    const result = jsonToXml("{invalid");
    expect(result.ok).toBe(false);
  });

  it("converts CSV to YAML", () => {
    const result = csvToYaml("id,name\n1,Ada");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("id:");
      expect(result.output).toContain("name:");
      expect(result.output).toContain("Ada");
    }
  });

  it("returns csv errors from csv-to-yaml pipeline", () => {
    const result = csvToYaml("");
    expect(result.ok).toBe(false);
  });

  it("converts json to toml", () => {
    const result = jsonToToml('{"name":"Ada"}');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain('name = "Ada"');
    }
  });
});
