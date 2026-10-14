import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
// Runtime wrapper must point to the same source correction as copied usage.
import Pattern from "../../../apps/playground/src/reui/runtime/examples/button-group/c-button-group-5.jsx";
afterEach(cleanup);
it("names every icon-only team action while retaining real native buttons", () => {
  render(<Pattern />);
  for (const name of ["Invite member", "View activity", "Team options"])
    expect(screen.getByRole("button", { name })).toBeEnabled();
});
