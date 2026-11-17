// @vitest-environment jsdom

import { createElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AreaConverterTool } from "./AreaConverterTool";
import { PercentageCalculatorTool } from "./PercentageCalculatorTool";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { CopyButton } from "@/components/ui/CopyButton";
import { ShareLinkButton } from "@/components/tools/ShareLinkButton";

const navigation = vi.hoisted(() => ({ search: "" }));
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(navigation.search),
}));

beforeEach(() => {
  navigation.search = "";
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("calculator interactions", () => {
  it("keeps reverse typing intact and computes from the field being edited", () => {
    render(createElement(AreaConverterTool, { toolId: "square-meters-to-square-feet" }));
    const reverse = screen.getByLabelText("Square feet (ft²)") as HTMLInputElement;
    for (const value of ["", "1", "10", "100", "1000", "1000.", "1000.5"]) {
      fireEvent.change(reverse, { target: { value } });
      expect(reverse.value).toBe(value);
    }
    expect((screen.getByLabelText("Square meters (m²)") as HTMLInputElement).value).toBe(String(1000.5 * 0.09290304));
    fireEvent.click(screen.getByRole("button", { name: "Clear numbers" }));
    expect(reverse.value).toBe("");
  });

  it("copies a room link with dimensions and precision", async () => {
    render(createElement(AreaConverterTool, { toolId: "square-feet-to-square-meters" }));
    fireEvent.click(screen.getByRole("button", { name: /Measure a room/ }));
    fireEvent.change(screen.getByLabelText("Length (ft)"), { target: { value: "20" } });
    fireEvent.change(screen.getByLabelText("Width (ft)"), { target: { value: "15" } });
    fireEvent.change(screen.getByLabelText("Decimal places"), { target: { value: "6" } });
    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalled());
    const shared = new URL(vi.mocked(navigator.clipboard.writeText).mock.calls[0][0]);
    expect(Object.fromEntries(shared.searchParams)).toEqual({ mode: "room", length: "20", width: "15", precision: "6" });
  });

  it("blocks partial CSV downloads and exports the complete corrected list", () => {
    const blob = vi.fn(() => "blob:area-test");
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: blob });
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: vi.fn() });
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    render(createElement(AreaConverterTool, { toolId: "square-feet-to-square-meters" }));
    fireEvent.click(screen.getByRole("button", { name: /Convert a list/ }));
    const list = screen.getByLabelText(/Areas in square feet/);
    fireEvent.change(list, { target: { value: "1000\nbad\n500" } });
    expect(screen.queryByRole("button", { name: "Download" })).toBeNull();
    expect(screen.getByText(/Correct the highlighted values/)).toBeTruthy();
    fireEvent.change(list, { target: { value: "1000\n500" } });
    fireEvent.click(screen.getByRole("button", { name: "Download" }));
    expect(click).toHaveBeenCalledOnce();
    expect(blob).toHaveBeenCalledOnce();
    expect(document.querySelector('a[download="square-feet-to-square-meters.csv"]')).toBeNull();
  });

  it("updates examples, detects incomplete input, and copies the percentage answer", async () => {
    render(createElement(PercentageCalculatorTool, { toolId: "percentage-calculator" }));
    fireEvent.click(screen.getByRole("button", { name: "Score: 42 out of 50" }));
    expect(screen.getByText("42 is 84% of 50.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Copy answer" }));
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining("42 is 84% of 50.")));
    fireEvent.change(screen.getByLabelText("Whole"), { target: { value: "" } });
    expect(screen.getByText(/Fill in both numbers/)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copy answer" }).hasAttribute("disabled")).toBe(true);
  });

  it("shows a usable fallback when clipboard access is denied", async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(new Error("Permission denied"));
    render(createElement(CopyButton, { value: "31.25" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await screen.findByText(/Copy is unavailable/);
    cleanup();
    render(createElement(ShareLinkButton, { shareUrl: "https://convertmystuff.com/tools/?value=1", toolId: "test" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    const link = await screen.findByLabelText("Share link") as HTMLInputElement;
    expect(link.value).toBe("https://convertmystuff.com/tools/?value=1");
  });

  it("restores new query inputs on navigation and preserves edits on an ordinary render", () => {
    navigation.search = "value=250&percent=12.5&mode=of";
    const view = render(createElement(ToolRenderer, { toolId: "percentage-calculator", componentKey: "PercentageCalculatorTool" }));
    expect(screen.getByText("12.5% of 250 is 31.25.")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Number"), { target: { value: "400" } });
    view.rerender(createElement(ToolRenderer, { toolId: "percentage-calculator", componentKey: "PercentageCalculatorTool" }));
    expect(screen.getByText("12.5% of 400 is 50.")).toBeTruthy();
    navigation.search = "value=80&percent=25&mode=decrease";
    view.rerender(createElement(ToolRenderer, { toolId: "percentage-calculator", componentKey: "PercentageCalculatorTool" }));
    expect(screen.getByText("80 minus 25% is 60.")).toBeTruthy();
  });

  it("restores shared text-diff inputs on the first render", () => {
    navigation.search = "left=hello&right=world";
    render(createElement(ToolRenderer, { toolId: "text-diff", componentKey: "GenericTextTool" }));
    const values = screen.getAllByRole("textbox").map((input) => (input as HTMLTextAreaElement).value);
    expect(values).toContain("hello");
    expect(values).toContain("world");
  });
});
