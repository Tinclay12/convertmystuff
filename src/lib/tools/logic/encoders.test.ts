import { describe, expect, it } from "vitest";
import {
  decodeBase64,
  decodeUrl,
  encodeBase64,
  encodeHtmlEntities,
  encodeUrl,
} from "@/lib/tools/logic/encoders";

describe("encoder round-trips", () => {
  it("round-trips base64 encode and decode", () => {
    const original = "Hello, ConvertMyStuff!";
    const encoded = encodeBase64(original);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;

    const decoded = decodeBase64(encoded.output);
    expect(decoded.ok).toBe(true);
    if (decoded.ok) {
      expect(decoded.output).toBe(original);
    }
  });

  it("round-trips URL encode and decode", () => {
    const original = "hello world & more";
    const encoded = encodeUrl(original);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;

    const decoded = decodeUrl(encoded.output);
    expect(decoded.ok).toBe(true);
    if (decoded.ok) {
      expect(decoded.output).toBe(original);
    }
  });

  it("escapes HTML entities", () => {
    const result = encodeHtmlEntities('<div>Tom & Jerry</div>');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("&lt;div&gt;");
      expect(result.output).toContain("&amp;");
    }
  });
});
