import { describe, expect, it } from "vitest";
import { buildIcoFromPngEntries, extractPngFramesFromIco } from "./ico-encoder";

const PNG_SIGNATURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

describe("ico-encoder", () => {
  it("round-trips PNG frames inside an ICO container", async () => {
    const png16 = new Uint8Array(20);
    png16.set(PNG_SIGNATURE);
    png16.set([1, 2, 3, 4], 8);
    const png32 = new Uint8Array(24);
    png32.set(PNG_SIGNATURE);
    png32.set([9, 8, 7, 6], 8);

    const ico = buildIcoFromPngEntries([
      { width: 16, height: 16, pngData: png16 },
      { width: 32, height: 32, pngData: png32 },
    ]);
    const bytes = new Uint8Array(await ico.arrayBuffer());
    const frames = extractPngFramesFromIco(bytes);

    expect(frames).toHaveLength(2);
    expect(frames[0]?.width).toBe(16);
    expect(frames[1]?.width).toBe(32);
    expect(new Uint8Array(await frames[0]!.blob.arrayBuffer())[8]).toBe(1);
  });

  it("rejects truncated files", () => {
    expect(() => extractPngFramesFromIco(new Uint8Array([0, 0, 1]))).toThrow(/too small/i);
  });
});
