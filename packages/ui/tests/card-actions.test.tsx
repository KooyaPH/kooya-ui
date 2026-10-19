import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CardActions, IconButton } from "../src/atoms/controls";
import { KooyaProvider } from "../src/foundations/theme";

describe("card-local actions", () => {
  it("retains a keyboard-addressable pressed action without a text button wrapper", () => {
    function Example() {
      const [pinned, setPinned] = useState(false);
      return <CardActions><IconButton label={pinned ? "Unpin" : "Pin"} aria-pressed={pinned} onClick={() => setPinned(!pinned)}>P</IconButton></CardActions>;
    }
    render(<KooyaProvider><Example /></KooyaProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Pin" }));
    expect(screen.getByRole("button", { name: "Unpin" }).getAttribute("aria-pressed")).toBe("true");
  });
  it("prevents disabled action execution", () => {
    const act = vi.fn();
    render(<KooyaProvider><CardActions><IconButton label="Delete" disabled onClick={act}>D</IconButton></CardActions></KooyaProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(act).not.toHaveBeenCalled();
  });
});
