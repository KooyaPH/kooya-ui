import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useDrawerInputFocus } from "../src/foundations/drawer-input-focus";
import type { FocusEvent } from "react";
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
function Host({ before }: { before?: (e: FocusEvent<HTMLDivElement>) => void }) {
  const handler = useDrawerInputFocus();
  return <div onFocus={e => { before?.(e); handler.focus(e); }} onBlur={handler.blur}>
    <button>Outside</button><div className="ku-drawer-body" data-testid="body">
      <span className="ant-input-affix-wrapper" data-testid="cue"><input className="ant-input" aria-label="Amount" /></span>
    </div></div>;
}
function bounds(height: number) {
  const body = screen.getByTestId("body"), cue = screen.getByTestId("cue");
  vi.spyOn(body, "getBoundingClientRect").mockReturnValue({ top: 50, bottom: 150, height: 100 } as DOMRect);
  Object.defineProperty(body, "clientHeight", { configurable: true, value: 100 });
  vi.spyOn(cue, "getBoundingClientRect").mockReturnValue({ top: 80, bottom: 80 + height, height } as DOMRect);
  const input = screen.getByRole("textbox");
  const matches = input.matches.bind(input);
  vi.spyOn(input, "matches").mockImplementation(selector => selector === ":focus-visible" || matches(selector));
  return { body, cue, input };
}
it("reveals the complete normal cue only through its own scroller", async () => {
  render(<Host />); const { body, cue, input } = bounds(80);
  input.focus();
  await waitFor(() => expect(cue).toHaveAttribute("data-ku-focus-containment", "normal"));
  expect(body.scrollTop).toBe(16);
  expect(document.activeElement).toBe(input);
  input.blur(); expect(cue).not.toHaveAttribute("data-ku-focus-containment");
});
it("uses an inset cue when the field fits but the outset does not", async () => {
  render(<Host />); const { cue, input } = bounds(95); input.focus();
  await waitFor(() => expect(cue).toHaveAttribute("data-ku-focus-containment", "inset"));
});
it("honors caller preventDefault", () => {
  render(<Host before={e => e.preventDefault()} />); const { cue, input } = bounds(95); input.focus();
  expect(cue).not.toHaveAttribute("data-ku-focus-containment");
});
it("does not reclaim focus moved by a caller", () => {
  render(<Host before={e => { if (e.target instanceof HTMLInputElement) screen.getByRole("button").focus(); }} />);
  const { cue, input } = bounds(95); input.focus();
  expect(document.activeElement).toBe(screen.getByRole("button"));
  expect(cue).not.toHaveAttribute("data-ku-focus-containment");
});

it("honors an ancestor caller optout before the deferred reveal", async () => {
  render(<div onFocus={e => e.preventDefault()}><Host /></div>);
  const { cue, body, input } = bounds(95); input.focus();
  await new Promise(resolve => requestAnimationFrame(resolve));
  expect(cue).not.toHaveAttribute("data-ku-focus-containment");
  expect(body.scrollTop).toBe(0);
});
