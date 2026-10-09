import { useState } from "react";
import { expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as UI from "../src";

it("replaces raw legacy failure prose with public recovery and an honest missing response", () => {
  render(
    <UI.KooyaProvider>
      <UI.TemplateFrame
        title="Records"
        state={{
          status: "error",
          message: "PRIVATE_SENTINEL https://internal.invalid trace",
        }}
      />
    </UI.KooyaProvider>,
  );
  expect(screen.getByRole("alert")).not.toHaveTextContent("PRIVATE_SENTINEL");
  expect(screen.getByRole("alert")).toHaveTextContent("UI_REQUEST_FAILED");
  expect(screen.getByRole("alert")).toHaveTextContent(
    "HTTP status unavailable",
  );
});
it("cold templates expose one busy boundary containing structural placeholders", () => {
  render(
    <UI.KooyaProvider>
      <UI.TemplateFrame title="Records" state={{ status: "loading" }} />
    </UI.KooyaProvider>,
  );
  expect(screen.getByRole("status")).toHaveTextContent("Loading");
  expect(
    document.querySelector('[aria-busy="true"] [data-skeleton="page"]'),
  ).not.toBeNull();
});
it("cold tables do not show a spinner over an empty data table", () => {
  render(
    <UI.KooyaProvider>
      <UI.DataTable
        label="Records"
        rows={[]}
        rowKey={(r: { id: string }) => r.id}
        columns={[]}
        loading
      />
    </UI.KooyaProvider>,
  );
  expect(document.querySelector('[data-skeleton="table"]')).not.toBeNull();
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
});
it("manual vertical tabs move focus without selecting until Enter", async () => {
  const changed = vi.fn();
  render(
    <UI.KooyaProvider>
      <UI.Tabs
        label="Sections"
        value="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
        onValueChange={changed}
        orientation="vertical"
        activation="manual"
      >
        First panel
      </UI.Tabs>
    </UI.KooyaProvider>,
  );
  screen.getByRole("tab", { name: "A" }).focus();
  await userEvent.keyboard("{ArrowDown}");
  await waitFor(() =>
    expect(screen.getByRole("tab", { name: "B" })).toHaveFocus(),
  );
  expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute(
    "tabindex",
    "0",
  );
  expect(changed).not.toHaveBeenCalled();
  await userEvent.keyboard("{Enter}");
  expect(changed).toHaveBeenCalledWith("b");
});
it("safe failures validate status and reference without forwarding unknown fields", () => {
  render(
    <UI.KooyaProvider>
      <UI.ErrorState
        failure={{
          publicCode: "https://PRIVATE.invalid",
          httpStatus: 0,
          supportReference: "secret?token=PRIVATE",
          recovery: "retry",
        }}
      />
    </UI.KooyaProvider>,
  );
  expect(screen.getByRole("alert")).not.toHaveTextContent("PRIVATE");
  expect(screen.getByRole("alert")).toHaveTextContent("UI_REQUEST_FAILED");
  expect(screen.getByRole("alert")).not.toHaveTextContent("HTTP 0");
});
it("refresh keeps the focused editable node and draft mounted", () => {
  const fixture = (refreshing: boolean) => (
    <UI.KooyaProvider>
      <UI.TemplateFrame title="Edit" state={{ status: "ready", refreshing }}>
        <UI.Input aria-label="Draft" defaultValue="Keep me" />
      </UI.TemplateFrame>
    </UI.KooyaProvider>
  );
  const { rerender } = render(fixture(false));
  const input = screen.getByRole("textbox");
  input.focus();
  rerender(fixture(true));
  expect(screen.getByRole("textbox")).toBe(input);
  expect(input).toHaveFocus();
  expect(input).toHaveValue("Keep me");
  expect(screen.getByRole("status")).toHaveTextContent("Updating");
});
it("editable shortcut guards cover nested contenteditable and combobox inputs", () => {
  render(
    <div>
      <div contentEditable suppressContentEditableWarning>
        <span data-testid="editable">draft</span>
      </div>
      <button>Action</button>
    </div>,
  );
  expect(UI.isEditableTarget(screen.getByTestId("editable"))).toBe(true);
  expect(UI.isEditableTarget(screen.getByRole("button"))).toBe(false);
});
it("mobile table keeps selection permissions and visible detail actions", async () => {
  const previous = window.matchMedia;
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query.includes("640") || query.includes("1100"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));
  const selected = vi.fn(),
    detail = vi.fn();
  const view = render(
    <UI.KooyaProvider>
      <UI.DataTable
        label="Records"
        rows={[
          { id: "a", disabled: false },
          { id: "b", disabled: true },
        ]}
        rowKey={(r) => r.id}
        columns={[
          { key: "id", title: "Record", render: (r) => r.id },
          {
            key: "action",
            title: "Actions",
            render: (r) => (
              <UI.Button disabled={r.disabled} onClick={() => detail(r.id)}>
                View {r.id}
              </UI.Button>
            ),
          },
        ]}
        rowSelection={{
          onChange: selected,
          getCheckboxProps: (r) => ({
            disabled: r.disabled,
            "aria-label": `Select ${r.id}`,
          }),
        }}
      />
    </UI.KooyaProvider>,
  );
  expect(
    screen.getByRole("region", { name: "Records records" }),
  ).toHaveAttribute("data-device", "mobile");
  await userEvent.click(screen.getByRole("checkbox", { name: "Select a" }));
  expect(selected.mock.calls[0][0]).toEqual(["a"]);
  expect(screen.getByRole("checkbox", { name: "Select b" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "View b" })).toBeDisabled();
  await userEvent.click(screen.getByRole("button", { name: "View a" }));
  expect(detail).toHaveBeenCalledWith("a");
  view.unmount();
  window.matchMedia = previous;
});
it("mobile inbox has one active pane and retains the controlled draft on Back", async () => {
  const previous = window.matchMedia;
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query.includes("640") || query.includes("1100"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));
  function Fixture() {
    const [thread, setThread] = useState<string>();
    const [draft, setDraft] = useState("Saved draft");
    return (
      <UI.KooyaProvider>
        <UI.InboxTemplate
          title="Inbox"
          threads={[{ id: "a", title: "Design" }]}
          selectedThreadId={thread}
          onSelectThread={setThread}
          messages={[]}
          draft={draft}
          onDraftChange={setDraft}
          onSend={() => {}}
        />
      </UI.KooyaProvider>
    );
  }
  const view = render(<Fixture />);
  expect(
    screen.queryByRole("textbox", { name: "Message" }),
  ).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Design" }));
  expect(screen.getByRole("textbox", { name: "Message" })).toHaveValue(
    "Saved draft",
  );
  expect(
    screen.queryByRole("navigation", { name: "Conversations" }),
  ).not.toBeInTheDocument();
  await userEvent.click(
    screen.getByRole("button", { name: "Back to conversations" }),
  );
  await userEvent.click(screen.getByRole("button", { name: "Design" }));
  expect(screen.getByRole("textbox", { name: "Message" })).toHaveValue(
    "Saved draft",
  );
  view.unmount();
  window.matchMedia = previous;
});

function responsiveViewport(initial: number) {
  const previous = window.matchMedia;
  let width = initial;
  const listeners = new Map<(event: { matches: boolean }) => void, string>();
  const matches = (query: string) =>
    query.startsWith("(min-width")
      ? width >= Number(query.match(/(\d+)px/)?.[1])
      : width <= Number(query.match(/(\d+)px/)?.[1]);
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return matches(query);
    },
    media: query,
    addEventListener(
      _type: string,
      listener: (event: { matches: boolean }) => void,
    ) {
      listeners.set(listener, query);
    },
    removeEventListener(
      _type: string,
      listener: (event: { matches: boolean }) => void,
    ) {
      listeners.delete(listener);
    },
    addListener() {},
    removeListener() {},
  }));
  return {
    resize(next: number) {
      act(() => {
        width = next;
        listeners.forEach((query, listener) =>
          listener({ matches: matches(query) }),
        );
      });
    },
    restore() {
      window.matchMedia = previous;
    },
  };
}

it("inbox resize and controlled pane changes keep focus visible without stealing external focus", async () => {
  const viewport = responsiveViewport(1440);
  const fixture = (pane?: "conversations" | "thread") => (
    <UI.KooyaProvider>
      <button>External overlay action</button>
      <UI.InboxTemplate
        title="Inbox"
        threads={[{ id: "a", title: "Design" }]}
        selectedThreadId="a"
        onSelectThread={() => {}}
        messages={[]}
        draft="Retained draft"
        onDraftChange={() => {}}
        onSend={() => {}}
        mobilePane={pane}
      />
    </UI.KooyaProvider>
  );
  const view = render(fixture());
  const composer = screen.getByRole("textbox", { name: "Message" });
  screen.getByRole("button", { name: "Design" }).focus();
  viewport.resize(640);
  expect(
    screen.getByRole("button", { name: "Back to conversations" }),
  ).toHaveFocus();
  await userEvent.click(
    screen.getByRole("button", { name: "Back to conversations" }),
  );
  viewport.resize(768);
  composer.focus();
  viewport.resize(640);
  expect(screen.getByRole("button", { name: "Design" })).toHaveFocus();
  view.rerender(fixture("thread"));
  expect(
    screen.getByRole("button", { name: "Back to conversations" }),
  ).toHaveFocus();
  screen.getByRole("button", { name: "Back to conversations" }).focus();
  viewport.resize(768);
  expect(composer).toHaveFocus();
  viewport.resize(640);
  composer.focus();
  view.rerender(fixture("conversations"));
  expect(screen.getByRole("button", { name: "Design" })).toHaveFocus();
  const outside = screen.getByRole("button", {
    name: "External overlay action",
  });
  outside.focus();
  view.rerender(fixture("thread"));
  expect(outside).toHaveFocus();
  viewport.resize(1440);
  viewport.resize(320);
  expect(outside).toHaveFocus();
  expect(screen.getByRole("textbox", { name: "Message" })).toBe(composer);
  expect(composer).toHaveValue("Retained draft");
  expect(document.querySelectorAll("textarea")).toHaveLength(1);
  view.unmount();
  viewport.restore();
});

it("table breakpoint changes retain original actions, interactive cell draft and focus", async () => {
  const viewport = responsiveViewport(1440);
  const selected = vi.fn(),
    detail = vi.fn(),
    changed = vi.fn();
  const view = render(
    <UI.KooyaProvider>
      <UI.DataTable
        label="Stable records"
        rows={[
          { id: "a", disabled: false },
          { id: "b", disabled: true },
        ]}
        rowKey={(row) => row.id}
        columns={[
          {
            key: "id",
            title: "Record",
            sorter: (a, b) => a.id.localeCompare(b.id),
            render: (row) => row.id,
          },
          {
            key: "draft",
            title: "Draft",
            priority: "secondary",
            render: (row) => (
              <UI.Input aria-label={`Draft ${row.id}`} defaultValue="Initial" />
            ),
          },
          {
            key: "action",
            title: "Actions",
            render: (row) => (
              <UI.Button onClick={() => detail(row.id)} disabled={row.disabled}>
                View {row.id}
              </UI.Button>
            ),
          },
        ]}
        rowSelection={{
          onChange: selected,
          getCheckboxProps: (row) => ({
            disabled: row.disabled,
            "aria-label": `Select ${row.id}`,
          }),
        }}
        onChange={changed}
        pagination={{ pageSize: 1, showSizeChanger: false }}
      />
    </UI.KooyaProvider>,
  );
  const input = screen.getByRole("textbox", { name: "Draft a" });
  const action = screen.getByRole("button", { name: "View a" });
  await userEvent.clear(input);
  await userEvent.type(input, "Internal draft");
  for (const width of [1100, 768, 641, 640, 320, 768, 1440]) {
    viewport.resize(width);
    expect(screen.getByRole("textbox", { name: "Draft a" })).toBe(input);
    expect(input).toHaveFocus();
    expect(input).toHaveValue("Internal draft");
    expect(screen.getByRole("button", { name: "View a" })).toBe(action);
  }
  viewport.resize(640);
  await userEvent.click(screen.getByRole("checkbox", { name: "Select a" }));
  expect(selected.mock.calls[0][0]).toEqual(["a"]);
  await userEvent.click(action);
  expect(detail).toHaveBeenCalledWith("a");
  await userEvent.click(screen.getByTitle("2"));
  expect(changed).toHaveBeenCalled();
  expect(screen.getByRole("checkbox", { name: "Select b" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "View b" })).toBeDisabled();
  viewport.resize(768);
  await userEvent.click(screen.getByRole("columnheader", { name: "Record" }));
  expect(changed.mock.calls.at(-1)?.[2].order).toBe("ascend");
  view.unmount();
  viewport.restore();
});

it.each([undefined, 0, 99, 600, NaN, 200, 503])(
  "reports only known HTTP status metadata (%s)",
  (httpStatus) => {
    render(
      <UI.KooyaProvider>
        <UI.ErrorState
          failure={{
            publicCode: "PUBLIC_FAILURE",
            recovery: "retry",
            httpStatus,
          }}
        />
      </UI.KooyaProvider>,
    );
    const valid = httpStatus === 200 || httpStatus === 503;
    expect(screen.getByRole("alert")).toHaveTextContent(
      valid ? `HTTP ${httpStatus}` : "HTTP status unavailable",
    );
    expect(screen.getByRole("alert")).not.toHaveTextContent("No HTTP response");
  },
);

it("keeps the engaged table filter open with its draft from desktop to tablet and mobile", () => {
  const viewport = responsiveViewport(1440);
  const view = render(
    <UI.KooyaProvider>
      <UI.DataTable
        label="Filter records"
        rows={[{ id: "a" }]}
        rowKey={(row) => row.id}
        columns={[{ key: "id", title: "Record", render: (row) => row.id }]}
        filters={
          <UI.Input aria-label="Filter draft" defaultValue="Retained filter" />
        }
      />
    </UI.KooyaProvider>,
  );
  const filter = screen.getByRole("textbox", { name: "Filter draft" });
  act(() => filter.focus());
  for (const width of [768, 640, 1440]) {
    viewport.resize(width);
    expect(filter.closest("details")).toHaveAttribute("open");
    expect(filter).toHaveFocus();
    expect(filter).toHaveValue("Retained filter");
  }
  view.unmount();
  viewport.restore();
});

it("moves hidden sidebar focus to navigation trigger on mobile without stealing overlay focus", () => {
  const viewport = responsiveViewport(1440);
  const view = render(
    <UI.KooyaProvider>
      <button>External dialog control</button>
      <UI.BentoShell
        sidebar={<a href="#records">Records navigation</a>}
        header={
          <UI.WorkspaceHeader
            name="Workspace"
            area="Records"
            title="Records"
            collapsed={false}
            navigationLabel="Open navigation"
            onNavigation={() => {}}
            onSearch={() => {}}
          />
        }
      >
        <p>Records content</p>
      </UI.BentoShell>
    </UI.KooyaProvider>,
  );
  const link = screen.getByRole("link", { name: "Records navigation" });
  link.focus();
  viewport.resize(768);
  expect(link).toHaveFocus();
  viewport.resize(640);
  expect(screen.getByRole("button", { name: "Open navigation" })).toHaveFocus();
  viewport.resize(1440);
  link.focus();
  const external = screen.getByRole("button", {
    name: "External dialog control",
  });
  external.focus();
  viewport.resize(640);
  expect(external).toHaveFocus();
  view.unmount();
  viewport.restore();
});

it("Back widening without a selected thread focuses a named thread fallback and keeps the composer disabled", () => {
  const viewport = responsiveViewport(640);
  const view = render(
    <UI.KooyaProvider>
      <UI.InboxTemplate
        title="Inbox"
        threads={[]}
        onSelectThread={() => {}}
        messages={[]}
        draft="Unsent"
        onDraftChange={() => {}}
        onSend={() => {}}
        mobilePane="thread"
      />
    </UI.KooyaProvider>,
  );
  const composer = screen.getByRole("textbox", { name: "Message" });
  screen.getByRole("button", { name: "Back to conversations" }).focus();
  viewport.resize(768);
  expect(
    screen.getByRole("region", { name: "Conversation thread" }),
  ).toHaveFocus();
  expect(composer).toBeDisabled();
  viewport.resize(640);
  screen.getByRole("button", { name: "Back to conversations" }).focus();
  viewport.resize(1440);
  expect(
    screen.getByRole("region", { name: "Conversation thread" }),
  ).toHaveFocus();
  expect(screen.getByRole("textbox", { name: "Message" })).toBe(composer);
  view.unmount();
  viewport.restore();
});

it("Back widening prefers the original enabled composer before earlier thread actions", () => {
  const viewport = responsiveViewport(640);
  const view = render(
    <UI.KooyaProvider>
      <button>External dialog</button>
      <UI.InboxTemplate
        title="Inbox"
        threads={[{ id: "a", title: "Design" }]}
        selectedThreadId="a"
        onSelectThread={() => {}}
        messages={[]}
        draft="Unsent"
        onDraftChange={() => {}}
        onSend={() => {}}
        mobilePane="thread"
        threadActions={<UI.Button>Unrelated thread action</UI.Button>}
      />
    </UI.KooyaProvider>,
  );
  const composer = screen.getByRole("textbox", { name: "Message" });
  screen.getByRole("button", { name: "Back to conversations" }).focus();
  viewport.resize(1440);
  expect(composer).toHaveFocus();
  expect(
    screen.getByRole("button", { name: "Unrelated thread action" }),
  ).not.toHaveFocus();
  viewport.resize(640);
  screen.getByRole("button", { name: "Back to conversations" }).focus();
  const external = screen.getByRole("button", { name: "External dialog" });
  external.focus();
  viewport.resize(768);
  expect(external).toHaveFocus();
  expect(screen.getByRole("textbox", { name: "Message" })).toBe(composer);
  view.unmount();
  viewport.restore();
});
