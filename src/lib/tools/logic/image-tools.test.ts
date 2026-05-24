import { describe, expect, it } from "vitest";
import { buildIcoFromPngEntries } from "@/lib/tools/logic/ico-encoder";

const createPngBytes = (): Uint8Array =>
  new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
  ]);

describe("ico-encoder", () => {
  it("builds an ICO blob from PNG entries", () => {
    const blob = buildIcoFromPngEntries([
      { width: 16, height: 16, pngData: createPngBytes() },
      { width: 32, height: 32, pngData: createPngBytes() },
    ]);

    expect(blob.type).toBe("image/x-icon");
    expect(blob.size).toBeGreaterThan(0);
  });

  it("throws when no entries are provided", () => {
    expect(() => buildIcoFromPngEntries([])).toThrow("At least one image entry is required.");
  });
});

describe("image-tools config", () => {
  it("registers png-to-ico and favicon-generator tools", async () => {
    const { imageToolConfigs } = await import("@/lib/tools/logic/image-tools");
    expect(imageToolConfigs["png-to-ico"]).toBeDefined();
    expect(imageToolConfigs["favicon-generator"]).toBeDefined();
  });
});
