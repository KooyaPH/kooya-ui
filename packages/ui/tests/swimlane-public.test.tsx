import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  SwimlaneBoard,
  Swimlane,
  SwimlaneRail,
  SwimlaneColumn,
  SwimlaneCard,
} from "../src/compositions/swimlane";
import { EditorialIntro, AuthPanel } from "../src/compositions/public";
describe("public and swimlane compositions", () => {
  it("retains known headings while busy and delegates lane toggles", () => {
    const toggle = vi.fn();
    render(
      <SwimlaneBoard label="Work" busy>
        <Swimlane label="Governance" onToggle={toggle} count={2}>
          <SwimlaneRail>
            <SwimlaneColumn title="Review" count={2}>
              <SwimlaneCard title="Known issue">Owner</SwimlaneCard>
            </SwimlaneColumn>
          </SwimlaneRail>
        </Swimlane>
      </SwimlaneBoard>,
    );
    expect(screen.getByRole("heading", { name: "Review" })).toBeVisible();
    expect(screen.getByLabelText("Work")).toHaveAttribute("aria-busy", "true");
    fireEvent.click(screen.getByRole("button", { name: /Governance/ }));
    expect(toggle).toHaveBeenCalledOnce();
  });
  it("keeps the collapse target mounted and hidden without losing its identity", () => {
    render(
      <Swimlane label="Editorial" collapsed onToggle={() => {}}>
        <p>Private lane content</p>
      </Swimlane>,
    );
    const button = screen.getByRole("button", { name: /Editorial/ });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(
      document.getElementById(button.getAttribute("aria-controls")!),
    ).not.toBeVisible();
  });
  it("renders semantic public headings and labelled auth panels", () => {
    render(
      <>
        <EditorialIntro title="A calmer workday" description="Built by Kooya" />
        <AuthPanel aria-label="Sign in">Continue</AuthPanel>
      </>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "A calmer workday",
    );
    expect(screen.getByRole("region", { name: "Sign in" })).toBeVisible();
  });
});
