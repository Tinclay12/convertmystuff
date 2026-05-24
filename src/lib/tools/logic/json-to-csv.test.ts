import { describe, expect, it } from "vitest";
import { jsonToCsv } from "@/lib/tools/logic/json-to-csv";

describe("json-to-csv", () => {
  it("converts an array of objects to CSV", () => {
    const result = jsonToCsv('[{"name":"Ada","role":"Engineer"}]');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.csv).toBe("name,role\nAda,Engineer");
      expect(result.columns).toEqual(["name", "role"]);
    }
  });

  it("rejects non-array JSON", () => {
    const result = jsonToCsv('{"name":"Ada"}');
    expect(result.ok).toBe(false);
  });

  it("converts NDJSON lines to CSV", () => {
    const input = '{"name":"Ada","role":"Engineer"}\n{"name":"Grace","role":"Scientist"}';
    const result = jsonToCsv(input, ",", { ndjson: true });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.csv).toBe("name,role\nAda,Engineer\nGrace,Scientist");
    }
  });

  it("respects custom column order", () => {
    const result = jsonToCsv('[{"a":1,"b":2}]', ",", {
      columnOrder: ["b", "a"],
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.csv).toBe("b,a\n2,1");
    }
  });
});
