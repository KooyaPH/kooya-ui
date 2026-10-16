import { expect, it } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { KooyaProvider } from "../src/foundations/theme";
import SwimlaneDemo from "../../../apps/playground/src/site/collections/swimlane";

it("moves the selected example issue without moving another lane's issue", () => {
  render(
    <KooyaProvider palette="olive">
      <SwimlaneDemo />
    </KooyaProvider>,
  );
  const governance = screen.getByRole("region", {
    name: "Governance status columns",
  });
  const editorial = screen.getByRole("region", {
    name: "Editorial status columns",
  });
  fireEvent.click(
    within(governance).getByRole("button", { name: "Approve review" }),
  );
  const moved = within(governance)
    .getByText("Policy review · KOOYA-124")
    .closest(".ku-swimlane-column") as HTMLElement;
  const unchanged = within(editorial)
    .getByText("Policy review · KOOYA-125")
    .closest(".ku-swimlane-column") as HTMLElement;
  expect(
    within(moved).getByRole("heading", { name: "Approved" }),
  ).toBeVisible();
  expect(
    within(unchanged).getByRole("heading", { name: "Review" }),
  ).toBeVisible();
});
