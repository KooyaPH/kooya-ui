import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import {
  InputGroup,
  InputGroupAddon,
} from "../../../apps/playground/src/reui/adapters/layout";
afterEach(cleanup);
it("retains upstream block addon alignment without an invalid align DOM prop", () => {
  render(
    <InputGroup>
      <InputGroupAddon align="block-start" data-testid="tray">
        Files
      </InputGroupAddon>
    </InputGroup>,
  );
  expect(screen.getByTestId("tray")).toHaveAttribute(
    "data-align",
    "block-start",
  );
  expect(screen.getByTestId("tray")).not.toHaveAttribute("align");
});
it("retains upstream inline addon default", () => {
  render(<InputGroupAddon data-testid="addon">Currency</InputGroupAddon>);
  expect(screen.getByTestId("addon")).toHaveAttribute(
    "data-align",
    "inline-start",
  );
  expect(screen.getByTestId("addon")).toHaveAttribute("role", "group");
});
it("keeps explicit caller data alignment and role precedence", () => {
  render(
    <InputGroupAddon
      align="block-end"
      data-align="inline-end"
      role="presentation"
      data-testid="addon"
    >
      Suffix
    </InputGroupAddon>,
  );
  expect(screen.getByTestId("addon")).toHaveAttribute(
    "data-align",
    "inline-end",
  );
  expect(screen.getByTestId("addon")).toHaveAttribute("role", "presentation");
});
