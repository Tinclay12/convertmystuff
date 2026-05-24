import { describe, expect, it } from "vitest";
import { nestedJsonToCsv } from "@/lib/tools/logic/nested-json-to-csv";

describe("nested-json-to-csv", () => {
  it("flattens nested objects with dot notation", () => {
    const result = nestedJsonToCsv(
      '[{"name":"Ada","address":{"city":"London","zip":"SW1A"}}]',
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.csv).toContain("address.city,address.zip");
      expect(result.csv).toContain("Ada,London,SW1A");
    }
  });
});
