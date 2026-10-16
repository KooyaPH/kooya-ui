import { expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthLayout, ApplicationAuthorization, KooyaProvider } from "../src";
import { ExpandableText, BusyBoundary, DataValue } from "../src/molecules";
import { renderToString } from "react-dom/server";

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));
});
afterEach(() => vi.restoreAllMocks());
it("auth composition has one heading, one brand and the application's native form", () => {
  render(
    <AuthLayout
      brand="KooyaHQ"
      title="Sign in"
      description="Continue to Projects."
      footer="Help"
    >
      <form>
        <label>
          Email
          <input name="email" />
        </label>
        <button>Continue</button>
      </form>
    </AuthLayout>,
  );
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(
    screen.getByRole("heading", { name: "Sign in", level: 1 }),
  ).toBeVisible();
  expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
    "name",
    "email",
  );
  expect(screen.getAllByText("KooyaHQ")).toHaveLength(1);
});
it("embedded consent retains material permissions and decisions without another heading", () => {
  render(
    <KooyaProvider>
      <AuthLayout
        brand="KooyaHQ"
        title="Connect Projects"
        headingId="connect-title"
        wide
      >
        <ApplicationAuthorization
          presentation="embedded"
          labelledBy="connect-title"
          application={{ name: "Projects", publisher: "Example company" }}
          account="jamie@example.test"
          permissions={[
            {
              id: "write",
              title: "Edit repositories",
              description: "Selected repositories only",
              access: "Read and write",
              required: true,
            },
          ]}
          onAuthorize={vi.fn()}
          onCancel={vi.fn()}
        />
      </AuthLayout>
    </KooyaProvider>,
  );
  expect(
    screen.queryByRole("heading", { name: "Authorize Projects" }),
  ).toBeNull();
  expect(screen.getByText("Edit repositories")).toBeVisible();
  expect(screen.getByText(/Read and write/)).toBeVisible();
  expect(
    screen.getByRole("button", { name: "Authorize Projects" }),
  ).toBeEnabled();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeEnabled();
});
it("supporting text is expandable by keyboard and retains its full original text", async () => {
  vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(300);
  const text = "Long supporting description. ".repeat(40);
  render(<ExpandableText text={text} />);
  const button = await screen.findByRole("button", { name: "Show more" });
  button.focus();
  await userEvent.keyboard("{Enter}");
  expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  expect(
    document.getElementById(button.getAttribute("aria-controls")!),
  ).toHaveTextContent(text.trim());
  await userEvent.keyboard("{Enter}");
  expect(screen.getByRole("button", { name: "Show more" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});
it("short descriptions do not add a disclosure control", () => {
  render(<ExpandableText text="Short description." />);
  expect(screen.queryByRole("button")).toBeNull();
});
it("auth loading preserves known labels and only replaces the unavailable value", () => {
  const { rerender } = render(
    <AuthLayout brand="KooyaHQ" title="Sign in">
      <BusyBoundary busy>
        <label>Workspace</label>
        <DataValue>Projects</DataValue>
        <button>Cancel</button>
      </BusyBoundary>
    </AuthLayout>,
  );
  expect(screen.getByText("Workspace")).toBeVisible();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeVisible();
  expect(screen.queryByText("Projects")).toBeNull();
  rerender(
    <AuthLayout brand="KooyaHQ" title="Sign in">
      <BusyBoundary busy keepContent>
        <DataValue>Projects</DataValue>
      </BusyBoundary>
    </AuthLayout>,
  );
  expect(screen.getByText("Projects")).toBeVisible();
});
it("auth and prose render on the server without browser APIs", () => {
  expect(
    renderToString(
      <AuthLayout brand="KooyaHQ" title="Sign in">
        <ExpandableText text="Read more about this request." />
      </AuthLayout>,
    ),
  ).toContain("Sign in");
});

it("record fields keep their labels during loading and show actual values when ready", async () => {
  const { RecordFields } = await import("../src");
  const fields = [{ id: "owner", label: "Owner", value: "Jamie" }];
  const { rerender } = render(
    <RecordFields fields={fields} loading label="Loading record" />,
  );
  expect(screen.getByText("Owner")).toBeVisible();
  expect(screen.queryByText("Jamie")).toBeNull();
  expect(document.querySelector('[data-skeleton="value"]')).not.toBeNull();
  rerender(<RecordFields fields={fields} />);
  expect(screen.getByText("Jamie")).toBeVisible();
});

it("cold boards keep status columns and do not announce empty results", async () => {
  const { BoardTemplate } = await import("../src");
  render(
    <KooyaProvider>
      <BoardTemplate
        title="Projects"
        columns={[{ id: "review", title: "In review" }]}
        items={[]}
        onMove={vi.fn()}
        state={{ status: "loading" }}
      />
    </KooyaProvider>,
  );
  expect(screen.getByRole("heading", { name: "Projects" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "In review" })).toBeVisible();
  expect(screen.queryByText("No items in this stage.")).toBeNull();
  expect(
    document.querySelectorAll('[data-skeleton="value"]').length,
  ).toBeGreaterThan(2);
});
it("cold records retain labels and mask unavailable values", async () => {
  const { RecordDetailTemplate } = await import("../src");
  render(
    <KooyaProvider>
      <RecordDetailTemplate
        title="Project"
        fields={[{ id: "owner", label: "Owner", value: "Jamie" }]}
        state={{ status: "loading" }}
      />
    </KooyaProvider>,
  );
  expect(screen.getByText("Owner")).toBeVisible();
  expect(screen.queryByText("Jamie")).toBeNull();
});
it("cold feeds provide data placeholders instead of claiming no posts", async () => {
  const { FeedTemplate } = await import("../src");
  render(
    <KooyaProvider>
      <FeedTemplate
        title="Updates"
        posts={[]}
        onReact={vi.fn()}
        state={{ status: "loading" }}
      />
    </KooyaProvider>,
  );
  expect(screen.queryByText("No posts yet.")).toBeNull();
  expect(
    document.querySelectorAll('[data-skeleton="value"]').length,
  ).toBeGreaterThan(2);
});

it("known table filters remain usable while record values load", async () => {
  const { DataTable } = await import("../src/organisms");
  const { TextField } = await import("../src/molecules");
  render(
    <KooyaProvider>
      <BusyBoundary busy>
        <DataTable
          label="Projects"
          rows={[]}
          rowKey={(r: { id: string }) => r.id}
          columns={[{ key: "id", title: "Project", render: (r) => r.id }]}
          filters={<TextField label="Search projects" defaultValue="review" />}
        />
      </BusyBoundary>
    </KooyaProvider>,
  );
  expect(
    screen.getByRole("textbox", { name: "Search projects" }),
  ).toBeEnabled();
  expect(screen.getByRole("textbox", { name: "Search projects" })).toHaveValue(
    "review",
  );
  expect(screen.getByRole("columnheader", { name: "Project" })).toBeVisible();
});
