import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KooyaProvider, ApplicationAuthorization } from "../src";
import { BusyBoundary, DataValue, MetricCard } from "../src/molecules";
import { DataTable } from "../src/organisms";
const base = {
  application: { name: "Kooya Projects", publisher: "Kooya", verified: true },
  account: "Jamie",
  permissions: [
    {
      id: "required",
      title: "Read repositories",
      description: "Selected repositories only",
      access: "Read only",
      required: true,
    },
    {
      id: "optional",
      title: "Notifications",
      description: "Activity updates",
      access: "Send",
    },
  ],
  onAuthorize: vi.fn(),
  onCancel: vi.fn(),
};
it("consent only calls the controlled authorization action after a deliberate click", async () => {
  const approve = vi.fn();
  render(
    <KooyaProvider>
      <ApplicationAuthorization {...base} onAuthorize={approve} />
    </KooyaProvider>,
  );
  expect(
    screen.getByRole("heading", { name: "Authorize Kooya Projects" }),
  ).toBeVisible();
  expect(approve).not.toHaveBeenCalled();
  await userEvent.click(
    screen.getByRole("button", { name: "Authorize Kooya Projects" }),
  );
  expect(approve).toHaveBeenCalledTimes(1);
});
it("optional permission changes are explicit and required permissions cannot be unchecked", async () => {
  const change = vi.fn();
  render(
    <KooyaProvider>
      <ApplicationAuthorization {...base} onPermissionsChange={change} />
    </KooyaProvider>,
  );
  expect(screen.getAllByRole("checkbox")).toHaveLength(1);
  await userEvent.click(
    screen.getByRole("checkbox", { name: "Notifications" }),
  );
  expect(change).toHaveBeenCalledWith(["optional"]);
});
it("requires selected repositories and disables repeated approval while connecting", () => {
  const { rerender } = render(
    <KooyaProvider>
      <ApplicationAuthorization {...base} repositories={[]} />
    </KooyaProvider>,
  );
  expect(
    screen.getByRole("button", { name: "Authorize Kooya Projects" }),
  ).toBeDisabled();
  rerender(
    <KooyaProvider>
      <ApplicationAuthorization {...base} state="authorizing" />
    </KooyaProvider>,
  );
  expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
  expect(screen.getByRole("button", { name: /Connecting/ })).toHaveClass(
    "ant-btn-loading",
  );
});
it("renders terminal approval and safe error recovery states", () => {
  const { rerender } = render(
    <KooyaProvider>
      <ApplicationAuthorization {...base} state="approved" />
    </KooyaProvider>,
  );
  expect(screen.getByText("Access approved")).toBeVisible();
  expect(screen.queryByText("Review access")).toBeNull();
  rerender(
    <KooyaProvider>
      <ApplicationAuthorization {...base} state="error" />
    </KooyaProvider>,
  );
  expect(screen.getByText("Connection could not be completed")).toBeVisible();
  expect(screen.getByRole("button", { name: "Try again" })).toBeVisible();
});
it("keeps static labels, containers and filters mounted on a cold load", () => {
  render(
    <KooyaProvider>
      <BusyBoundary busy>
        <h2>Activity</h2>
        <MetricCard label="Published" value="24" detail="This week" />
        <DataTable
          label="Projects"
          rows={[]}
          rowKey={(r: { id: string }) => r.id}
          columns={[{ key: "id", title: "Project ID", render: (r) => r.id }]}
          filters={
            <label>
              Search
              <input />
            </label>
          }
        />
      </BusyBoundary>
    </KooyaProvider>,
  );
  expect(screen.getByRole("heading", { name: "Activity" })).toBeVisible();
  expect(screen.getByText("Published")).toBeVisible();
  expect(screen.queryByText("24")).toBeNull();
  expect(
    screen.getByRole("columnheader", { name: "Project ID" }),
  ).toBeVisible();
  expect(screen.getByText("Search")).toBeInTheDocument();
  expect(screen.getByRole("table")).toBeVisible();
  expect(
    document.querySelectorAll('[data-skeleton="value"]').length,
  ).toBeGreaterThan(4);
});
it("retains cached values during background refresh", () => {
  render(
    <KooyaProvider>
      <BusyBoundary busy keepContent>
        <h2>Projects</h2>
        <DataValue>Already loaded</DataValue>
      </BusyBoundary>
    </KooyaProvider>,
  );
  expect(screen.getByText("Already loaded")).toBeVisible();
  expect(document.querySelector('[data-skeleton="value"]')).toBeNull();
});
