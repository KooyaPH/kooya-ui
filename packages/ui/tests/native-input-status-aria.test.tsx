import { cleanup, render, screen } from "@testing-library/react";
import { Input } from "antd";
import { afterEach, expect, it } from "vitest";
afterEach(cleanup);
it("communicates a manual error and removes it when status becomes warning", () => {
  const { rerender } = render(
    <Input aria-label="Status field" status="error" />,
  );
  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  rerender(<Input aria-label="Status field" status="warning" />);
  expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
});
it("preserves explicit caller false instead of replacing it with error status", () => {
  render(<Input status="error" aria-invalid={false} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "false");
});
it("preserves explicit caller grammar semantics", () => {
  render(<Input status="error" aria-invalid="grammar" />);
  expect(screen.getByRole("textbox")).toHaveAttribute(
    "aria-invalid",
    "grammar",
  );
});
it("retains explicit undefined caller suppression", () => {
  render(<Input status="error" aria-invalid={undefined} />);
  expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
});
