import { describe, expect, it } from "vitest";
import { buildUtmUrl } from "@/lib/tools/logic/utm-builder";

describe("utm-builder", () => {
  it("builds a URL with required UTM parameters", () => {
    const result = buildUtmUrl({
      websiteUrl: "https://example.com",
      source: "newsletter",
      medium: "email",
      campaign: "spring-sale",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.url).toBe(
        "https://example.com/?utm_source=newsletter&utm_medium=email&utm_campaign=spring-sale",
      );
    }
  });

  it("requires core UTM fields", () => {
    const result = buildUtmUrl({
      websiteUrl: "https://example.com",
      source: "",
      medium: "email",
      campaign: "spring-sale",
    });

    expect(result.ok).toBe(false);
  });
});
