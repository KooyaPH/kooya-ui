import { createRef } from "react";
import { cleanup, render } from "@testing-library/react";
import { Input, type InputRef } from "antd";
import { afterEach, expect, it } from "vitest";
afterEach(cleanup);
it("focuses an email input without attempting unsupported cursor selection", () => {
  const ref = createRef<InputRef>();
  render(<Input ref={ref} type="email" defaultValue="test@kooya.com.ph" />);
  expect(() =>
    ref.current!.focus({ cursor: "all", preventScroll: true }),
  ).not.toThrow();
  expect(ref.current!.input).toHaveFocus();
  expect(ref.current!.input!.selectionStart).toBeNull();
});
it("retains supported text cursor start, end and all selection", () => {
  const ref = createRef<InputRef>();
  render(<Input ref={ref} defaultValue="Kooya" />);
  ref.current!.focus({ cursor: "start" });
  expect(ref.current!.input!.selectionStart).toBe(0);
  expect(ref.current!.input!.selectionEnd).toBe(0);
  ref.current!.focus({ cursor: "end" });
  expect(ref.current!.input!.selectionStart).toBe(5);
  expect(ref.current!.input!.selectionEnd).toBe(5);
  ref.current!.focus({ cursor: "all" });
  expect(ref.current!.input!.selectionStart).toBe(0);
  expect(ref.current!.input!.selectionEnd).toBe(5);
});
