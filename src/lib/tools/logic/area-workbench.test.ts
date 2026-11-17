import { describe, expect, it } from "vitest";
import {
  areaCsv,
  calculateRoomArea,
  convertArea,
  convertAreaList,
  parseAreaNumber,
} from "./area-workbench";

describe("area workbench", () => {
  it("uses the exact international-foot area factor", () => {
    expect(convertArea("1000", "sqft")).toEqual({
      ok: true,
      sqm: 92.90304,
      sqft: 1000,
    });
    const result = convertArea("100", "sqm");
    if (!result.ok) throw new Error(result.error);
    expect(result.sqft).toBeCloseTo(1076.391041670972, 9);
    const roundTrip = convertArea(String(result.sqft), "sqft");
    expect(roundTrip).toMatchObject({ ok: true });
    if (roundTrip.ok) expect(roundTrip.sqm).toBeCloseTo(100, 12);
  });
  it("accepts grouped numbers and small decimals without accepting malformed numbers", () => {
    expect(parseAreaNumber("1,000.5")).toBe(1000.5);
    expect(parseAreaNumber(".5")).toBe(0.5);
    expect(parseAreaNumber("1e-7")).toBe(0.0000001);
    for (const input of [
      "",
      "1,5",
      "-20",
      "Infinity",
      ".5.6",
      "1,000,20",
      "0x10",
      "1e999",
    ])
      expect(parseAreaNumber(input)).toBeNull();
    expect(convertArea("1e308", "sqm").ok).toBe(false);
  });
  it("calculates rectangular rooms and rejects invalid dimensions", () => {
    expect(calculateRoomArea("20", "15", "sqft")).toEqual({
      ok: true,
      sqft: 300,
      sqm: 27.870912,
    });
    expect(calculateRoomArea("-2", "-5", "sqm").ok).toBe(false);
    expect(calculateRoomArea("1e200", "1e200", "sqm").ok).toBe(false);
    expect(calculateRoomArea("", "5", "sqm").ok).toBe(false);
  });
  it("keeps source line numbers and prevents partial exports of invalid lists", () => {
    const text = "100\n\nnot an area\n1,000";
    const result = convertAreaList(text, "sqft");
    expect(result.rows.map((row) => row.line)).toEqual([1, 3, 4]);
    expect(result.rows[1].result.ok).toBe(false);
    expect(areaCsv(text, "sqft")).toBeNull();
    expect(areaCsv("1,000\r\n500", "sqft")).toBe(
      "Square meters,Square feet\r\n92.90304,1000\r\n46.45152,500",
    );
    expect(areaCsv("=SUM(1+1)", "sqft")).toBeNull();
  });
  it("accepts zero and enforces the list limit", () => {
    expect(convertArea("0", "sqm")).toEqual({ ok: true, sqm: 0, sqft: 0 });
    expect(
      convertAreaList(Array(201).fill("1").join("\n"), "sqm").error,
    ).toBeTruthy();
    expect(areaCsv("", "sqm")).toBeNull();
  });
});
