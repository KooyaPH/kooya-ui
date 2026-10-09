import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as UI from "../src";
import { theme as ant } from "antd";

function Tokens() {
  const { token } = ant.useToken();
  return (
    <output aria-label="Ant tokens">
      {JSON.stringify({
        primary: token.colorPrimary,
        height: token.controlHeight,
        font: token.fontFamily,
        motion: token.motion,
      })}
    </output>
  );
}
it("one provider synchronizes branding, dark scheme, density, font and Ant tokens on updates", () => {
  const { rerender } = render(
    <UI.KooyaProvider
      branding={{ accent: "#223344" }}
      mode="dark"
      density="compact"
      fontFamily="Test Font"
      reducedMotion
    >
      <Tokens />
    </UI.KooyaProvider>,
  );
  expect(screen.getByLabelText("Ant tokens")).toHaveTextContent(
    '"primary":"#223344"',
  );
  expect(screen.getByLabelText("Ant tokens")).toHaveTextContent('"height":36');
  expect(screen.getByLabelText("Ant tokens")).toHaveTextContent(
    '"motion":false',
  );
  rerender(
    <UI.KooyaProvider theme="client">
      <Tokens />
    </UI.KooyaProvider>,
  );
  expect(screen.getByLabelText("Ant tokens")).toHaveTextContent(
    '"primary":"#315b9d"',
  );
});
it("exposes the requested owned atomic coverage", () => {
  for (const name of [
    "Checkbox",
    "RadioGroup",
    "NumberField",
    "DateField",
    "Skeleton",
    "Progress",
    "Pagination",
    "Breadcrumb",
    "List",
    "Tooltip",
    "RowActions",
    "Drawer",
    "useKooyaFeedback",
  ])
    expect(UI).toHaveProperty(name);
});
it("controlled fields preserve entered values and associated errors", async () => {
  function Form() {
    const [value, setValue] = useState("");
    const [choice, setChoice] = useState("a");
    const [checked, setChecked] = useState(false);
    return (
      <UI.KooyaProvider>
        <UI.TextField
          label="Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={!value ? "Required" : undefined}
        />
        <UI.SelectField
          label="Country"
          options={[
            { value: "a", label: "Alpine" },
            { value: "b", label: "Brook" },
          ]}
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
        />
        <UI.Switch
          label="Updates"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <output>{choice}</output>
      </UI.KooyaProvider>
    );
  }
  render(<Form />);
  const user = userEvent.setup();
  expect(screen.getByLabelText("Name")).toHaveAccessibleDescription("Required");
  await user.type(screen.getByLabelText("Name"), "Maya");
  expect(screen.getByLabelText("Name")).toHaveValue("Maya");
  expect(screen.getByLabelText("Name")).not.toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await user.click(screen.getByRole("switch", { name: "Updates" }));
  expect(screen.getByRole("switch")).toBeChecked();
  await user.click(screen.getByRole("combobox", { name: "Country" }));
  await user.click(screen.getByRole("option", { name: "Brook" }));
  expect(screen.getByRole("status")).toHaveTextContent("b");
});
it("blocks disabled and busy actions while retaining long labels", async () => {
  const action = vi.fn();
  render(
    <UI.KooyaProvider>
      <UI.Button disabled onClick={action}>
        Disabled
      </UI.Button>
      <UI.Button loading onClick={action}>
        Busy
      </UI.Button>
      <UI.Button>Review workspace publishing permissions</UI.Button>
      <UI.Chip>Static</UI.Chip>
    </UI.KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Disabled" }));
  await userEvent.click(screen.getByRole("button", { name: "Busy" }));
  expect(action).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "Busy" })).toHaveAttribute(
    "aria-busy",
    "true",
  );
  expect(
    screen.getByRole("button", {
      name: "Review workspace publishing permissions",
    }),
  ).toBeVisible();
});
it("tabs use arrows to change the selected linked panel", async () => {
  function Tabs() {
    const [v, s] = useState("a");
    return (
      <UI.KooyaProvider>
        <UI.Tabs
          label="Areas"
          value={v}
          onValueChange={s}
          options={[
            { value: "a", label: "Alpha" },
            { value: "b", label: "Beta" },
          ]}
        >
          {v === "a" ? "First panel" : "Second panel"}
        </UI.Tabs>
      </UI.KooyaProvider>
    );
  }
  render(<Tabs />);
  screen.getByRole("tab", { name: "Alpha" }).focus();
  await userEvent.keyboard("{ArrowRight}");
  await waitFor(() =>
    expect(screen.getByRole("tab", { name: /Beta/ })).toHaveAttribute(
      "aria-selected",
      "true",
    ),
  );
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Second panel");
});
it("dialog opens from its trigger and Escape restores focus", async () => {
  render(
    <UI.KooyaProvider>
      <UI.Dialog
        title="Edit"
        description="Local details"
        trigger={<UI.Button>Open</UI.Button>}
      >
        <UI.TextField label="Note" />
      </UI.Dialog>
    </UI.KooyaProvider>,
  );
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Open" }));
  expect(
    await screen.findByRole("dialog", { name: "Edit" }),
  ).toHaveAccessibleDescription("Local details");
  await user.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
  expect(screen.getByRole("button", { name: "Open" })).toHaveFocus();
});
it("menu keyboard skips disabled items and selects the active action", async () => {
  const action = vi.fn();
  render(
    <UI.KooyaProvider>
      <UI.Menu
        label="Actions"
        trigger={<UI.Button>More</UI.Button>}
        items={[
          { label: "Disabled", disabled: true, onSelect: action },
          { label: "Edit row", onSelect: action },
        ]}
      />
    </UI.KooyaProvider>,
  );
  const user = userEvent.setup();
  screen.getByRole("button", { name: "More" }).focus();
  await user.keyboard("{ArrowDown}");
  await screen.findByRole("menu");
  await waitFor(() =>
    expect(screen.getByRole("menuitem", { name: "Edit row" })).toHaveFocus(),
  );
  await user.keyboard("{End}");
  await waitFor(() =>
    expect(screen.getByRole("menuitem", { name: "Edit row" })).toHaveFocus(),
  );
  fireEvent.keyDown(screen.getByRole("menuitem", { name: "Edit row" }), {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    which: 13,
  });
  expect(action).toHaveBeenCalledOnce();
});
it("table retains labels, row actions, empty state and opt-in sorting", async () => {
  const action = vi.fn();
  const columns = [
    {
      key: "name",
      title: "Name",
      render: (r: { id: string; name: string }) => r.name,
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
    },
    {
      key: "action",
      title: "Action",
      render: () => <UI.Button onClick={action}>Edit row</UI.Button>,
    },
  ];
  const { rerender } = render(
    <UI.KooyaProvider>
      <UI.DataTable
        label="Accounts"
        rows={[
          { id: "1", name: "Zed" },
          { id: "2", name: "Alpine" },
        ]}
        rowKey={(r) => r.id}
        columns={columns}
      />
    </UI.KooyaProvider>,
  );
  expect(screen.getByRole("table", { name: "Accounts" })).toBeInTheDocument();
  expect(
    screen.getByRole("group", { name: "Accounts table scroll area" }),
  ).toHaveAttribute("tabindex", "0");
  await userEvent.click(screen.getAllByRole("button", { name: "Edit row" })[0]);
  expect(action).toHaveBeenCalledOnce();
  await userEvent.click(screen.getByRole("columnheader", { name: /Name/ }));
  expect(screen.getAllByRole("row")[1]).toHaveTextContent("Alpine");
  rerender(
    <UI.KooyaProvider>
      <UI.DataTable
        label="Accounts"
        rows={[]}
        rowKey={(r) => r.id}
        columns={columns}
      />
    </UI.KooyaProvider>,
  );
  expect(screen.getByText("No matching records.")).toBeVisible();
});
it("select default values participate in forms and change events remain usable", async () => {
  const change = vi.fn();
  render(
    <UI.KooyaProvider>
      <form aria-label="Settings">
        <UI.SelectField
          label="Region"
          name="region"
          defaultValue="a"
          options={[
            { value: "a", label: "Alpine" },
            { value: "b", label: "Brook" },
          ]}
          onChange={(event) => {
            event.preventDefault();
            change(event.target.value);
          }}
        />
      </form>
    </UI.KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("combobox", { name: "Region" }));
  await userEvent.click(screen.getByRole("option", { name: "Brook" }));
  expect(change).toHaveBeenCalledWith("b");
  expect(
    new FormData(screen.getByRole("form") as HTMLFormElement).get("region"),
  ).toBe("b");
});
it("semantic brand tokens preserve contrast in light and dark schemes", () => {
  for (const mode of ["light", "dark"] as const) {
    for (const theme of Object.keys(UI.themes) as UI.ThemeName[]) {
      const scheme = UI.resolveThemeScheme(theme, mode, { accent: "#ffffaa" });
      expect(
        UI.contrastRatio(scheme.accent, scheme.accentInk),
      ).toBeGreaterThanOrEqual(4.5);
      for (const key of ["focus", "success", "warning", "danger"] as const)
        expect(
          UI.contrastRatio(scheme[key], scheme.surface),
        ).toBeGreaterThanOrEqual(4.5);
    }
  }
});
it("controlled additional fields, checkbox, radio and pagination emit meaningful updates", async () => {
  const user = userEvent.setup();
  function Form() {
    const [checked, s] = useState(false);
    const [radio, r] = useState("a");
    const [number, n] = useState<number | null>(1);
    const [page, p] = useState(1);
    return (
      <UI.KooyaProvider>
        <UI.Checkbox
          label="Accept"
          checked={checked}
          onChange={(e) => s(e.target.checked)}
        />
        <UI.RadioGroup
          label="Mode"
          value={radio}
          onChange={(e) => r(e.target.value)}
          options={[
            { value: "a", label: "Alpha" },
            { value: "b", label: "Beta" },
          ]}
        />
        <UI.NumberField label="Quantity" value={number} onChange={n} />
        <UI.DateField label="Start date" />
        <UI.Pagination current={page} onChange={p} total={30} />
        <output aria-label="Page">{page}</output>
      </UI.KooyaProvider>
    );
  }
  render(<Form />);
  await user.click(screen.getByRole("checkbox", { name: "Accept" }));
  expect(screen.getByRole("checkbox")).toBeChecked();
  await user.click(screen.getByRole("radio", { name: "Beta" }));
  expect(screen.getByRole("radio", { name: "Beta" })).toBeChecked();
  await user.clear(screen.getByRole("spinbutton", { name: "Quantity" }));
  await user.type(screen.getByRole("spinbutton", { name: "Quantity" }), "5");
  expect(screen.getByRole("spinbutton", { name: "Quantity" })).toHaveValue("5");
  expect(screen.getByLabelText("Start date")).toBeInTheDocument();
  await user.click(screen.getByTitle("2"));
  expect(screen.getByLabelText("Page")).toHaveTextContent("2");
});
it("feedback inherits provider context and the removed-trigger dialog restores provider focus", async () => {
  function Fixture() {
    const [open, setOpen] = useState(false);
    const feedback = UI.useKooyaFeedback();
    return (
      <>
        {!open && (
          <UI.Button onClick={() => setOpen(true)}>
            Edit disappearing row
          </UI.Button>
        )}
        <UI.Button
          onClick={() =>
            feedback.notification.success({
              title: "Saved locally",
              description: "Fictional record",
            })
          }
        >
          Notify
        </UI.Button>
        <UI.Dialog title="Removed row" open={open} onOpenChange={setOpen}>
          <p>Details</p>
        </UI.Dialog>
      </>
    );
  }
  const { container } = render(
    <UI.KooyaProvider theme="signature">
      <Fixture />
    </UI.KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Notify" }));
  expect(await screen.findByText("Saved locally")).toBeVisible();
  expect(container.querySelector(".ku-root")).toContainElement(
    screen.getByText("Saved locally"),
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Edit disappearing row" }),
  );
  await screen.findByRole("dialog");
  await userEvent.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
  expect(container.querySelector(".ku-root")).toHaveFocus();
});
it("nested tabs only move their own selection", async () => {
  const outer = vi.fn();
  function Nested() {
    const [value, setValue] = useState("a");
    return (
      <UI.KooyaProvider>
        <UI.Tabs
          label="Outer"
          value="one"
          onValueChange={outer}
          options={[
            { value: "one", label: "One" },
            { value: "two", label: "Two" },
          ]}
        >
          <UI.Tabs
            label="Inner"
            value={value}
            onValueChange={setValue}
            options={[
              { value: "a", label: "Alpha" },
              { value: "b", label: "Beta" },
            ]}
          >
            Content
          </UI.Tabs>
        </UI.Tabs>
      </UI.KooyaProvider>
    );
  }
  render(<Nested />);
  screen.getByRole("tab", { name: "Alpha" }).focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(outer).not.toHaveBeenCalled();
  expect(screen.getByRole("tab", { name: /Beta/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
it("provider composition supplies the shell default and an explicit shell override wins", () => {
  const { container, rerender } = render(
    <UI.KooyaProvider composition="orbit">
      <UI.BentoShell
        sidebar={<span>Navigation</span>}
        header={<span>Header</span>}
      >
        Body
      </UI.BentoShell>
    </UI.KooyaProvider>,
  );
  expect(container.querySelector("[data-composition]")).toHaveAttribute(
    "data-composition",
    "orbit",
  );
  rerender(
    <UI.KooyaProvider composition="orbit">
      <UI.BentoShell composition="flow" sidebar={null} header={null}>
        Body
      </UI.BentoShell>
    </UI.KooyaProvider>,
  );
  expect(container.querySelector("[data-composition]")).toHaveAttribute(
    "data-composition",
    "flow",
  );
});
it("contextual confirmation dialogs stay inside their provider", async () => {
  function Confirm() {
    const feedback = UI.useKooyaFeedback();
    return (
      <UI.Button
        onClick={() =>
          feedback.modal.confirm({
            title: "Confirm local change",
            content: <UI.Button>Inner action</UI.Button>,
          })
        }
      >
        Confirm
      </UI.Button>
    );
  }
  const { container } = render(
    <UI.KooyaProvider fontFamily="Test Font">
      <Confirm />
    </UI.KooyaProvider>,
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Confirm", exact: true }),
  );
  expect(container.querySelector(".ku-root")).toContainElement(
    await screen.findByRole("dialog"),
  );
  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
});
it("list renders labelled items with the current Ant list engine", () => {
  render(
    <UI.KooyaProvider>
      <UI.List
        label="Team"
        items={[
          { id: "a", name: "Maya" },
          { id: "b", name: "Jordan" },
        ]}
        rowKey="id"
        itemRender={(row) => <span>{row.name}</span>}
      />
    </UI.KooyaProvider>,
  );
  expect(screen.getByRole("region", { name: "Team" })).toHaveTextContent(
    "Maya",
  );
  expect(screen.getByRole("region", { name: "Team" })).toHaveTextContent(
    "Jordan",
  );
});
it("ArrowUp opens a menu at its last enabled item", async () => {
  render(
    <UI.KooyaProvider>
      <UI.Menu
        label="Choices"
        trigger={<UI.Button>Choose</UI.Button>}
        items={[
          { label: "First", onSelect: () => {} },
          { label: "Last", onSelect: () => {} },
          { label: "Unavailable", disabled: true, onSelect: () => {} },
        ]}
      />
    </UI.KooyaProvider>,
  );
  screen.getByRole("button", { name: "Choose" }).focus();
  await userEvent.keyboard("{ArrowUp}");
  await waitFor(() =>
    expect(screen.getByRole("menuitem", { name: "Last" })).toHaveFocus(),
  );
});
it("drawer Escape returns focus after its contents unmount", async () => {
  render(
    <UI.KooyaProvider>
      <UI.Drawer title="Details" trigger={<UI.Button>Open details</UI.Button>}>
        <UI.TextField label="Note" />
      </UI.Drawer>
    </UI.KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Open details" }));
  await screen.findByRole("dialog");
  await userEvent.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Open details" })).toHaveFocus(),
  );
});

it("table retains cell DOM, focus and local state on parent rerender", async () => {
  function Cell() {
    const [count, setCount] = useState(0);
    return (
      <UI.Button onClick={() => setCount(count + 1)}>
        Edit row {count}
      </UI.Button>
    );
  }
  const rows = [{ id: "a" }];
  const columns = [{ key: "edit", title: "Actions", render: () => <Cell /> }];
  const fixture = (label: string) => (
    <UI.KooyaProvider>
      <UI.DataTable
        label={label}
        rows={rows}
        columns={columns}
        rowKey={(row) => row.id}
      />
    </UI.KooyaProvider>
  );
  const { rerender } = render(fixture("Accounts"));
  const button = screen.getByRole("button", { name: "Edit row 0" });
  await userEvent.click(button);
  expect(button).toHaveFocus();
  rerender(fixture("Accounts"));
  expect(screen.getByRole("button", { name: "Edit row 1" })).toBe(button);
  expect(button).toHaveFocus();
  rerender(fixture("Renamed accounts"));
  expect(
    screen.getByRole("table", { name: "Renamed accounts" }),
  ).toContainElement(button);
  expect(button).toHaveFocus();
});

it.each([
  { controlled: true, canceled: false },
  { controlled: false, canceled: false },
  { controlled: true, canceled: true },
  { controlled: false, canceled: true },
])(
  "select reset synchronizes visible and submitted values: $controlled controlled, $canceled canceled",
  async ({ controlled, canceled }) => {
    const changed = vi.fn();
    render(
      <UI.KooyaProvider>
        <div
          onReset={(event) => {
            if (canceled) event.preventDefault();
          }}
        >
          <form aria-label="Reset fixture">
            <UI.SelectField
              label="Reset region"
              name="region"
              {...(controlled ? { value: "b" } : { defaultValue: "b" })}
              options={[
                { value: "a", label: "Alpine" },
                { value: "b", label: "Brook" },
              ]}
              onValueChange={changed}
            />
            <button type="reset">Reset region form</button>
          </form>
        </div>
      </UI.KooyaProvider>,
    );
    const form = screen.getByRole("form", {
      name: "Reset fixture",
    }) as HTMLFormElement;
    // Reset the initial non-first selection too: there may be no React state change.
    await userEvent.click(
      screen.getByRole("button", { name: "Reset region form" }),
    );
    await waitFor(() => expect(new FormData(form).get("region")).toBe("b"));
    if (!controlled) {
      await userEvent.click(
        screen.getByRole("combobox", { name: "Reset region" }),
      );
      await userEvent.click(screen.getByRole("option", { name: "Alpine" }));
    }
    changed.mockClear();
    await userEvent.click(
      screen.getByRole("button", { name: "Reset region form" }),
    );
    const expected = !controlled && canceled ? "a" : "b";
    await waitFor(() =>
      expect(new FormData(form).get("region")).toBe(expected),
    );
    const selectedLabel = screen
      .getByRole("combobox", { name: "Reset region" })
      .closest(".ku-select")!;
    expect(selectedLabel).toHaveTextContent(
      expected === "a" ? "Alpine" : "Brook",
    );
    expect(changed).not.toHaveBeenCalled();
  },
);

it("semantic fallbacks contrast with resolved custom surfaces in either mode", () => {
  for (const mode of ["light", "dark"] as const) {
    for (const surface of ["#25382a", "#f1f5ef", "#777777", "#000", "#fff"]) {
      const scheme = UI.resolveThemeScheme("mosaic", mode, {
        scheme: {
          surface,
          focus: surface,
          success: surface,
          warning: surface,
          danger: surface,
        },
      });
      for (const role of ["focus", "success", "warning", "danger"] as const)
        expect(
          UI.contrastRatio(scheme[role], surface),
          `${mode} ${surface} ${role}`,
        ).toBeGreaterThanOrEqual(4.5);
    }
  }
});
