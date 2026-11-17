// @vitest-environment jsdom
import { createElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BatchResultsTool } from "./BatchResultsTool";
afterEach(cleanup);
describe("batch workspace", () => {
  it("takes a visitor from sample to matched rows and invalidates exports on edits", () => {
    render(createElement(BatchResultsTool));
    fireEvent.click(screen.getByRole("button", { name: "Try sample files" }));
    fireEvent.click(screen.getByRole("button", { name: "Match results" }));
    expect(screen.getByRole("button", { name: "Download Excel (.xlsx)" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Retry JSONL (2)" })).toBeTruthy();
    expect(screen.getByText("Lighting")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Show rows"), { target: { value: "missing" } });
    expect(screen.queryByText("Lighting")).toBeNull();
    expect(screen.getAllByText("item-004")).toHaveLength(2);
    fireEvent.change(screen.getByLabelText("Result JSONL"), { target: { value: "invalid" } });
    expect(screen.queryByRole("button", { name: "Download Excel (.xlsx)" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Match results" }));
    expect(screen.getByRole("alert").textContent).toContain("line 1");
    fireEvent.click(screen.getByRole("button", { name: "Clear workspace" }));
    expect((screen.getByLabelText("Original CSV") as HTMLTextAreaElement).value).toBe("");
  });
});
