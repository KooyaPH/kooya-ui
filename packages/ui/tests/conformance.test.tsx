import { useState } from "react";
import { expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as UI from "../src";

it("separates required control border tokens from decorative lines", () => {
  for (const name of ["mosaic", "signature", "canvas", "client"] as const)
    for (const mode of ["light", "dark"] as const) {
      const variables = UI.themeVariables(name, mode);
      const config = UI.antTheme(name, { mode }, variables);
      const border = String(variables["--ku-control-border"]);
      expect(
        UI.contrastRatio(border, String(variables["--ku-surface"])),
      ).toBeGreaterThanOrEqual(3);
      expect(config.token?.colorBorder).toBe(variables["--ku-line"]);
      for (const component of [
        "Input",
        "InputNumber",
        "Select",
        "DatePicker",
        "Checkbox",
        "Radio",
      ] as const)
        expect(config.components?.[component]?.colorBorder).toBe(border);
    }
});

it("lets native Tab reach ChoiceSelect retry and footer actions after the option list closes", async () => {
  const retry = vi.fn(),
    create = vi.fn();
  render(
    <UI.KooyaProvider reducedMotion>
      <UI.ChoiceSelect
        label="Failed search"
        options={[]}
        onValueChange={() => {}}
        error={<UI.Button onClick={retry}>Retry search</UI.Button>}
      />
      <UI.ChoiceSelect
        label="Matching search"
        options={[{ value: "one", label: "One" }]}
        onValueChange={() => {}}
        footer={<UI.Button onClick={create}>Create result</UI.Button>}
      />
    </UI.KooyaProvider>,
  );
  for (const [label, action, callback] of [
    ["Failed search", "Retry search", retry],
    ["Matching search", "Create result", create],
  ] as const) {
    screen.getByRole("combobox", { name: label }).focus();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.tab();
    expect(screen.getByRole("button", { name: action })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(callback).toHaveBeenCalledTimes(1);
  }
});

it("applies a caller's SelectField search predicate without changing selection payload", async () => {
  const change = vi.fn();
  render(
    <UI.KooyaProvider>
      <UI.SelectField
        label="Timezone"
        value="Asia/Singapore"
        options={[
          { value: "America/New_York", label: "New_York" },
          { value: "Asia/Singapore", label: "Singapore" },
        ]}
        filterOption={(query, option) =>
          option.value
            .replaceAll("_", " ")
            .toLowerCase()
            .includes(query.toLowerCase())
        }
        onValueChange={change}
      />
    </UI.KooyaProvider>,
  );
  await userEvent.type(screen.getByRole("combobox"), "new york");
  await userEvent.click(
    await screen.findByRole("option", { name: "New_York" }),
  );
  expect(change).toHaveBeenCalledExactlyOnceWith("America/New_York");
});

it("respects externally controlled Menu open and reports one close after a nested selection", async () => {
  const change = vi.fn(),
    close = vi.fn(),
    select = vi.fn();
  const props = {
    label: "Actions",
    trigger: <UI.Button>Actions</UI.Button>,
    open: true,
    onOpenChange: change,
    onClose: close,
    items: [
      { label: "Mute", children: [{ label: "Always", onSelect: select }] },
      { type: "divider" as const },
    ],
  };
  const { rerender } = render(
    <UI.KooyaProvider>
      <UI.Menu {...props} />
    </UI.KooyaProvider>,
  );
  await userEvent.hover(await screen.findByRole("menuitem", { name: "Mute" }));
  await userEvent.click(
    await screen.findByRole("menuitem", { name: "Always" }),
  );
  expect(select).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledExactlyOnceWith(false);
  expect(close).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("menu", { name: "Actions" })).toBeVisible();
  rerender(
    <UI.KooyaProvider>
      <UI.Menu {...props} open={false} />
    </UI.KooyaProvider>,
  );
  await waitFor(() =>
    expect(
      screen.queryByRole("menu", { name: "Actions" }),
    ).not.toBeInTheDocument(),
  );
});

it("cancels Menu Enter default before action callbacks while retaining event propagation", async () => {
  const selected = vi.fn(),
    bubble = vi.fn();
  render(
    <UI.KooyaProvider>
      <div onKeyDown={bubble}>
        <UI.Menu
          label="Actions"
          trigger={<UI.Button>Open actions</UI.Button>}
          items={[{ label: "Edit", onSelect: selected }]}
        />
      </div>
    </UI.KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Open actions" }));
  const item = await screen.findByRole("menuitem", { name: "Edit" });
  const event = new KeyboardEvent("keydown", {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    bubbles: true,
    cancelable: true,
  });
  fireEvent(item, event);
  expect(event.defaultPrevented).toBe(true);
  expect(selected).toHaveBeenCalledTimes(1);
  expect(bubble).toHaveBeenCalledTimes(1);
});

it("exports owned arbitrary popup and rich searchable choice contracts", () => {
  expect(UI).toHaveProperty("Popup");
  expect(UI).toHaveProperty("ChoiceSelect");
});

it("exposes each tab directly, skips disabled tabs and links the active panel", async () => {
  function Fixture() {
    const [value, setValue] = useState("first");
    return (
      <UI.KooyaProvider>
        <UI.Tabs
          label="Sections"
          value={value}
          onValueChange={setValue}
          options={[
            { value: "first", label: "First" },
            { value: "disabled", label: "Disabled", disabled: true },
            { value: "last", label: "Last" },
          ]}
        >
          <p>{value} content</p>
        </UI.Tabs>
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  const first = screen.getByRole("tab", { name: "First" });
  first.focus();
  await userEvent.keyboard("{End}");
  await waitFor(() =>
    expect(screen.getByRole("tab", { name: "Last" })).toHaveFocus(),
  );
  expect(screen.getByRole("tabpanel")).toHaveAccessibleName("Last");
  await userEvent.keyboard("{ArrowLeft}");
  await waitFor(() => expect(first).toHaveFocus());
});

it("reports repeated controlled close requests without changing authoritative Menu state", async () => {
  const select = vi.fn(),
    close = vi.fn(),
    change = vi.fn();
  render(
    <UI.KooyaProvider reducedMotion>
      <UI.Menu
        label="Persistent actions"
        trigger={<UI.Button>Persistent actions</UI.Button>}
        open
        onOpenChange={change}
        onClose={close}
        items={[{ label: "Keep available", onSelect: select }]}
      />
    </UI.KooyaProvider>,
  );
  await userEvent.click(
    await screen.findByRole("menuitem", { name: "Keep available" }),
  );
  await userEvent.click(
    screen.getByRole("menuitem", { name: "Keep available" }),
  );
  expect(select).toHaveBeenCalledTimes(2);
  expect(close).toHaveBeenCalledTimes(2);
  expect(change).toHaveBeenCalledTimes(2);
  expect(
    screen.getByRole("menu", { name: "Persistent actions" }),
  ).toBeVisible();
});

it("ChoiceSelect filters by plain label while emitting controlled multiple ID payloads", async () => {
  function Fixture() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <UI.KooyaProvider reducedMotion>
        <UI.ChoiceSelect
          label="People"
          multiple
          value={values}
          onValueChange={setValues}
          options={[
            {
              value: "a",
              label: "Alex",
              display: (
                <span>
                  Alex <small>Designer</small>
                </span>
              ),
            },
            { value: "b", label: "Blocked", disabled: true },
          ]}
        />
        <output aria-label="Selected IDs">{values.join(",")}</output>
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  await userEvent.type(
    screen.getByRole("combobox", { name: "People" }),
    "Alex",
  );
  await userEvent.click(await screen.findByRole("option", { name: "Alex" }));
  expect(screen.getByLabelText("Selected IDs")).toHaveTextContent("a");
});

it("Popup requests Escape close once while controlled open remains authoritative", async () => {
  const close = vi.fn(),
    change = vi.fn();
  render(
    <UI.KooyaProvider reducedMotion>
      <UI.Popup
        label="Filters"
        trigger={<UI.Button>Filters</UI.Button>}
        open
        onClose={close}
        onOpenChange={change}
      >
        <UI.TextField label="Query" />
      </UI.Popup>
    </UI.KooyaProvider>,
  );
  const input = await screen.findByRole("textbox", { name: "Query" });
  await waitFor(() =>
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeVisible(),
  );
  input.focus();
  await userEvent.keyboard("{Escape}");
  expect(change).toHaveBeenCalledExactlyOnceWith(false);
  expect(close).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("dialog", { name: "Filters" })).toBeVisible();
});
