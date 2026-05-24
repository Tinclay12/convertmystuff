import { describe, expect, it } from "vitest";
import { csvToJson } from "@/lib/tools/logic/csv-to-json";

describe("csv-to-json", () => {
  it("converts CSV rows to JSON objects", () => {
    const result = csvToJson("id,name\n1,Ada\n2,Grace");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rowCount).toBe(2);
      expect(result.json).toContain('"name": "Ada"');
    }
  });

  it("infers numeric values when enabled", () => {
    const result = csvToJson("id,name\n1,Ada", { inferTypes: true });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.json).toContain('"id": 1');
    }
  });

  it("supports CSV without header row", () => {
    const result = csvToJson("1,Ada\n2,Grace", { hasHeaderRow: false });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.json).toContain('"column_1": "1"');
      expect(result.rowCount).toBe(2);
    }
  });
});
