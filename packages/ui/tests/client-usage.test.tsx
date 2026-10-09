import { expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KooyaProvider } from "@kooyaph/ui";
import { UsagePage } from "../../../apps/playground/src/ProductPages";

const renderUsage = () =>
  render(
    <KooyaProvider>
      <UsagePage />
    </KooyaProvider>,
  );

it("exposes each plan allowance as named progress with its visible value", () => {
  renderUsage();
  for (const [name, value] of [
    ["Team messages", 42],
    ["Shared storage", 32],
    ["Content views", 21],
  ] as const) {
    const progress = screen.getByRole("progressbar", { name });
    expect(progress).toHaveAttribute("aria-valuenow", String(value));
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
    expect(screen.getByText(`${value}%`)).toBeVisible();
  }
  expect(screen.getAllByRole("progressbar")).toHaveLength(3);
});

it("keeps readable axis captions outside the scaled activity graphic", () => {
  renderUsage();
  expect(
    screen.getByRole("img", { name: "Sample workspace activity for 30 days" }),
  ).toBeVisible();
  for (const caption of ["Start of period", "Today"]) {
    const label = screen.getByText(caption);
    expect(label).toBeVisible();
    expect(label.closest("svg")).toBeNull();
  }
});

it("updates period messages and plotted data without changing plan allowances", async () => {
  renderUsage();
  const initialPoints = screen
    .getByRole("img", {
      name: "Sample workspace activity for 30 days",
    })
    .querySelector("polyline")!
    .getAttribute("points");
  for (const [period, messages] of [
    ["7 days", "3,120"],
    ["90 days", "34,944"],
    ["30 days", "12,480"],
  ]) {
    await userEvent.click(
      screen.getByRole("combobox", { name: "Usage period" }),
    );
    await userEvent.click(screen.getByRole("option", { name: period }));
    const graphic = screen.getByRole("img", {
      name: `Sample workspace activity for ${period}`,
    });
    expect(
      screen.getByText(`${messages} team messages in this period`),
    ).toBeVisible();
    const points = graphic.querySelector("polyline")!.getAttribute("points");
    if (period === "30 days") expect(points).toBe(initialPoints);
    else expect(points).not.toBe(initialPoints);
    expect(
      screen.getByRole("progressbar", { name: "Team messages" }),
    ).toHaveAttribute("aria-valuenow", "42");
  }
});

it("opens local plan details and restores the trigger after Escape", async () => {
  renderUsage();
  const trigger = screen.getByRole("button", { name: "Plan details" });
  await userEvent.click(trigger);
  expect(
    screen.getByRole("dialog", { name: "Your workspace plan" }),
  ).toBeVisible();
  expect(
    screen.getByText("Sample plan details. No subscription changes."),
  ).toBeVisible();
  await userEvent.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  await waitFor(() => expect(trigger).toHaveFocus());
});
