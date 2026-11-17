import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PercentageCalculatorTool } from "./PercentageCalculatorTool";
import { AreaConverterTool } from "./AreaConverterTool";

describe("priority calculator initial state", () => {
  it("restores a shared percentage value and percentage instead of losing value", () => {
    const html = renderToStaticMarkup(
      createElement(PercentageCalculatorTool, {
        toolId: "percentage-calculator",
        initialPrefill: "250",
        initialFields: { mode: "of", percent: "12.5" },
      }),
    );
    expect(html).toContain("12.5% of 250 is 31.25.");
    expect(html).toContain('value="250"');
  });
  it("keeps a shared zero distinct from an empty field", () => {
    const html = renderToStaticMarkup(
      createElement(PercentageCalculatorTool, {
        toolId: "percentage-calculator",
        initialPrefill: "0",
        initialFields: { mode: "of", percent: "15" },
      }),
    );
    expect(html).toContain("15% of 0 is 0.");
  });
  it("does not produce an answer from a half-complete shared calculation", () => {
    const html = renderToStaticMarkup(
      createElement(PercentageCalculatorTool, {
        toolId: "percentage-calculator",
        initialPrefill: "200",
      }),
    );
    expect(html).toContain("Fill in both numbers");
    expect(html).not.toContain("of 200 is 0");
  });
  it("restores the original-price mode", () => {
    const html = renderToStaticMarkup(
      createElement(PercentageCalculatorTool, {
        toolId: "percentage-calculator",
        initialFields: { mode: "reverse", finalValue: "85", percent: "15" },
      }),
    );
    expect(html).toContain("100 with 15% off gives 85.");
  });
  it("restores a room link in the correct units and precision", () => {
    const html = renderToStaticMarkup(
      createElement(AreaConverterTool, {
        toolId: "square-feet-to-square-meters",
        initialFields: {
          mode: "room",
          length: "20",
          width: "15",
          precision: "6",
        },
      }),
    );
    expect(html).toContain("27.870912");
    expect(html).toContain('value="20"');
    expect(html).toContain('value="15"');
    expect(html).toContain("27.870912 m² = 300 ft²");
  });
  it("keeps invalid area input visible and disables result actions", () => {
    const html = renderToStaticMarkup(
      createElement(AreaConverterTool, {
        toolId: "square-meters-to-square-feet",
        initialPrefill: "-10",
      }),
    );
    expect(html).toContain('value="-10"');
    expect(html).toContain("Enter a non-negative number");
    expect(html).toContain('disabled=""');
  });
});
