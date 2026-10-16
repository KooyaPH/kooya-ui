import { expect, it, vi } from "vitest";
import {
  filterRows,
  cartTotal,
  moveTask,
} from "../../../apps/playground/src/site/collections/state";
it("filters records by search and state without altering the source", () => {
  const rows = [
    { id: "1", name: "Maya", status: "Active" },
    { id: "2", name: "Jordan", status: "Pending" },
  ];
  expect(filterRows(rows, "maya", "All")).toEqual([rows[0]]);
  expect(filterRows(rows, "", "Pending")).toEqual([rows[1]]);
  expect(rows).toHaveLength(2);
});
it("calculates quantities and applies only a valid demo coupon", () => {
  expect(
    cartTotal(
      [
        { price: 40, quantity: 2 },
        { price: 15, quantity: 1 },
      ],
      "KOOYA10",
    ),
  ).toBe(85.5);
  expect(cartTotal([{ price: 40, quantity: 2 }], "bad")).toBe(80);
});
it("moves one board task while preserving other tasks", () => {
  const tasks = [
    { id: "1", stage: "Todo" },
    { id: "2", stage: "Done" },
  ];
  expect(moveTask(tasks, "1", "Doing")).toEqual([
    { id: "1", stage: "Doing" },
    tasks[1],
  ]);
  expect(tasks[0].stage).toBe("Todo");
});

import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KooyaProvider } from "@kooyaph/ui";
import {
  WorkspaceForm,
  ApplicationDemo,
} from "../../../apps/playground/src/site/collections/applications";
import { DataWorkbench } from "../../../apps/playground/src/site/collections/data";
import { CommerceDemo } from "../../../apps/playground/src/site/collections/commerce";
import {
  BoardDemo,
  FileManager,
  NotificationsDemo,
} from "../../../apps/playground/src/site/collections/workflows";
import { compositionEntries } from "../../../apps/playground/src/registry/compositions";

it("validates the workspace form and completes a real local creation", async () => {
  render(
    <KooyaProvider>
      <WorkspaceForm />
    </KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Save workspace" }));
  expect(await screen.findByText("Enter a name.")).toBeInTheDocument();
  await userEvent.type(screen.getByLabelText("Workspace name"), "Test studio");
  await userEvent.type(
    screen.getByLabelText("Email address"),
    "test@example.com",
  );
  await userEvent.click(screen.getByRole("button", { name: "Save workspace" }));
  expect(await screen.findByText("Workspace ready")).toBeInTheDocument();
  expect(
    screen.getByText(/Test studio\. This is a local example/),
  ).toBeInTheDocument();
});
it("edits a record through the actual table modal and updates the table", async () => {
  render(
    <KooyaProvider>
      <DataWorkbench embedded />
    </KooyaProvider>,
  );
  await userEvent.click(
    screen.getAllByRole("button", { name: "Edit", exact: true })[0],
  );
  const dialog = screen.getByRole("dialog");
  const field = within(dialog).getByLabelText("Project");
  fireEvent.change(field, { target: { value: "Edited launch" } });
  await userEvent.click(
    within(dialog).getByRole("button", { name: "Save record" }),
  );
  expect(
    await screen.findByRole("button", { name: "Edited launch" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent(
    "Saved Edited launch locally.",
  );
}, 15000);
it("recalculates the cart after quantity changes and a valid coupon", async () => {
  render(
    <KooyaProvider>
      <CommerceDemo family="cart" embedded />
    </KooyaProvider>,
  );
  expect(screen.getByText("Total: $64.00")).toBeInTheDocument();
  const quantity = screen.getByRole("spinbutton", {
    name: "Everyday notebook quantity",
  });
  await userEvent.clear(quantity);
  await userEvent.type(quantity, "2");
  await userEvent.tab();
  expect(screen.getByText("Total: $88.00")).toBeInTheDocument();
  await userEvent.type(screen.getByLabelText("Coupon code"), "KOOYA10");
  await userEvent.click(screen.getByRole("button", { name: "Apply coupon" }));
  expect(screen.getByText("Total: $79.20")).toBeInTheDocument();
});
it("moves a board task with the native select and supports adding tasks", async () => {
  render(
    <KooyaProvider>
      <BoardDemo />
    </KooyaProvider>,
  );
  await userEvent.click(
    screen.getByRole("combobox", { name: "Move Launch brief" }),
  );
  await userEvent.click(
    screen.getByText("Done", { selector: ".ant-select-item-option-content" }),
  );
  const done = screen
    .getByRole("heading", { name: /Done/ })
    .closest("section")!;
  expect(within(done).getByText("Launch brief")).toBeInTheDocument();
  await userEvent.type(screen.getByLabelText("New task name"), "Review API");
  await userEvent.click(screen.getByRole("button", { name: "Add task" }));
  expect(screen.getByText("Review API")).toBeInTheDocument();
});
it("adds local files without an upload endpoint and marks notifications read", async () => {
  const { container, unmount } = render(
    <KooyaProvider>
      <FileManager uploadOnly />
    </KooyaProvider>,
  );
  await userEvent.upload(
    container.querySelector("input[type=file]")!,
    new File(["hello"], "brief.txt", { type: "text/plain" }),
  );
  expect(await screen.findByText("brief.txt")).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent(
    "No upload request was made",
  );
  unmount();
  render(
    <KooyaProvider>
      <NotificationsDemo />
    </KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("checkbox", { name: "Unread only" }));
  await userEvent.click(screen.getByRole("button", { name: "Mark all read" }));
  expect(screen.getByText("You're all caught up")).toBeInTheDocument();
});
it("registers every original template, all collections and unique deep-link variants", async () => {
  const originals = [
    "dashboard",
    "collection",
    "detail",
    "form",
    "wizard",
    "settings",
    "board",
    "inbox",
    "feed",
    "content",
    "media",
    "analytics",
    "audit",
    "profile",
    "business",
    "portal",
    "tool",
  ];
  for (const id of originals)
    expect(
      compositionEntries.find(
        (entry) => entry.kind === "templates" && entry.id === id,
      ),
    ).toBeTruthy();
  for (const kind of ["groups", "blocks", "sections", "templates"])
    expect(compositionEntries.some((entry) => entry.kind === kind)).toBe(true);
  const ids = compositionEntries.flatMap((entry) =>
    entry.variants.map((variant) => variant.id),
  );
  expect(new Set(ids).size).toBe(ids.length);
  const formEntry = compositionEntries.find(
    (entry) => entry.id === "application-form",
  )!;
  const code = await formEntry.variants[0].loadCode();
  expect(code).toContain('family={"form"}');
  expect(code).not.toContain('family="application-form"');
  const dataCode = await compositionEntries
    .find((entry) => entry.id === "data-workbench")!
    .variants[0].loadCode();
  expect(dataCode).toContain(
    '<DataWorkbench domain={"projects"} alternate={false} />',
  );
});

import * as collectionState from "../../../apps/playground/src/site/collections/state";
import { GroupDemo } from "../../../apps/playground/src/site/collections/groups";
it("exports native filtered records in displayed sort order across pages", async () => {
  const download = vi
    .spyOn(collectionState, "downloadText")
    .mockImplementation(() => {});
  try {
    const { container } = render(
      <KooyaProvider reducedMotion>
        <DataWorkbench embedded />
      </KooyaProvider>,
    );
    // Retain actual user interactions while resolving stable toolbar buttons
    // once; repeated global accessibility walks through Ant tables are costly
    // in JSDOM and do not add coverage to these unchanged controls.
    const exportButton = screen.getByRole("button", { name: "Export CSV" });
    const resetButton = screen.getByRole("button", { name: "Reset view" });
    await userEvent.click(
      container.querySelector(".ant-table-filter-trigger")!,
    );
    await userEvent.click(
      within(
        document.querySelector('.ku-overlay-host [role="menu"]') as HTMLElement,
      ).getByText("Design"),
    );
    await userEvent.click(
      within(
        document.querySelector(".ku-overlay-host") as HTMLElement,
      ).getByRole("button", { name: "OK", exact: true }),
    );
    const hours = screen.getByRole("columnheader", { name: /Hours/ });
    await userEvent.click(hours);
    await userEvent.click(hours);
    await userEvent.click(exportButton);
    const csv = String(download.mock.calls.at(-1)?.[1]);
    expect(csv.split("\n")).toHaveLength(5);
    expect(csv).not.toMatch(/Product|Operations/);
    expect(csv.indexOf('"240"')).toBeLessThan(csv.indexOf('"24"'));
    await userEvent.click(
      screen.getByRole("checkbox", { name: "Select row 1" }),
    );
    await userEvent.click(exportButton);
    expect(String(download.mock.calls.at(-1)?.[1]).split("\n")).toHaveLength(2);
    expect(download.mock.calls.at(-1)?.[1]).toContain('"240"');
    await userEvent.click(resetButton);
    await userEvent.click(exportButton);
    expect(String(download.mock.calls.at(-1)?.[1]).split("\n")).toHaveLength(
      13,
    );
  } finally {
    download.mockRestore();
  }
}, 20000);
it("alternate account creation requires matching confirmation", async () => {
  render(
    <KooyaProvider>
      <WorkspaceForm family="authentication" alternate />
    </KooyaProvider>,
  );
  expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Maya" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "maya@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Demo password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Confirm password"), {
    target: { value: "different" },
  });
  await userEvent.click(
    screen.getByRole("button", { name: "Create demo account" }),
  );
  expect(await screen.findByText("Passwords must match.")).toBeInTheDocument();
});
it("alternate row actions start archived and can restore the record", async () => {
  render(
    <KooyaProvider>
      <GroupDemo family="row-actions" alternate />
    </KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Restore file" }));
  expect(
    screen.getByRole("button", { name: "Open", exact: true }),
  ).toBeInTheDocument();
});
it("alternate wishlist supports an empty-to-saved scenario", async () => {
  render(
    <KooyaProvider>
      <CommerceDemo family="wishlist" alternate embedded />
    </KooyaProvider>,
  );
  expect(screen.getByText("Your wishlist is empty")).toBeInTheDocument();
  await userEvent.click(
    screen.getByRole("button", { name: "Save a suggested product" }),
  );
  expect(
    screen.getByRole("heading", { name: "Weekly planner" }),
  ).toBeInTheDocument();
});

it("alternate no-results state clears and reapplies an actual project search", async () => {
  render(
    <KooyaProvider>
      <ApplicationDemo family="empty-state" alternate />
    </KooyaProvider>,
  );
  const search = screen.getByRole("searchbox", {
    name: "Search existing projects",
  });
  expect(search).toHaveValue("archive");
  await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
  expect(search).toHaveValue("");
  expect(screen.getByText("Northstar launch")).toBeInTheDocument();
  fireEvent.change(search, { target: { value: "missing" } });
  expect(screen.queryByText("Northstar launch")).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Clear search" }),
  ).toBeInTheDocument();
});
