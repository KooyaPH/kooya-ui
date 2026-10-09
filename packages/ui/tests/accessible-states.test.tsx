import { createRef } from "react";
import { expect, it } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as UI from "../src";
import { ComponentDocs } from "../../../apps/playground/src/ComponentDocs";

it("maps action and navigation state foregrounds to readable semantic roles", () => {
  for (const name of ["mosaic", "signature", "canvas", "client"] as const)
    for (const mode of ["light", "dark"] as const) {
      const config = UI.antTheme(name, { mode });
      const c = config.components!;
      const s = UI.resolveThemeScheme(name, mode);
      for (const [foreground, background] of [
        [config.token?.colorLinkHover, s.surface],
        [config.token?.colorLinkActive, s.surface],
        [c.Button?.defaultHoverColor, c.Button?.defaultHoverBg],
        [c.Button?.defaultActiveColor, c.Button?.defaultActiveBg],
        [c.Button?.colorErrorActive, s.surface],
        [c.Breadcrumb?.itemColor, s.surface],
        [c.Breadcrumb?.linkHoverColor, s.subtle],
        [c.Pagination?.itemActiveColor, c.Pagination?.itemActiveBg],
        [c.Pagination?.itemActiveColorHover, c.Pagination?.itemActiveBg],
      ])
        expect(
          UI.contrastRatio(String(foreground), String(background)),
        ).toBeGreaterThanOrEqual(4.5);
    }
});

for (const multiple of [false, true])
  it(`ChoiceSelect ${multiple ? "multiple" : "single"} exposes public focus and blur`, async () => {
    const ref = createRef<UI.ChoiceSelectRef>();
    const props = multiple
      ? {
          multiple: true as const,
          value: [],
          onValueChange: (_: string[]) => {},
        }
      : { onValueChange: (_: string) => {} };
    render(
      <UI.KooyaProvider>
        <UI.ChoiceSelect
          {...props}
          ref={ref}
          label="Search choices"
          options={[]}
        />
      </UI.KooyaProvider>,
    );
    expect(ref.current).not.toBeNull();
    ref.current!.focus({ preventScroll: true });
    expect(screen.getByRole("combobox")).toHaveFocus();
    ref.current!.blur();
    expect(screen.getByRole("combobox")).not.toHaveFocus();
  });

for (const target of [
  "native",
  "public",
  "choice",
  "disabled",
  "null",
] as const)
  it(`Popup initial ${target} focus uses a usable target or dialog fallback`, async () => {
    const native = createRef<HTMLInputElement>();
    const input = createRef<UI.InputRef>();
    const choice = createRef<UI.ChoiceSelectRef>();
    const ref =
      target === "public" ? input : target === "choice" ? choice : native;
    render(
      <UI.KooyaProvider reducedMotion>
        <UI.Popup
          label="Search panel"
          initialFocusRef={ref}
          trigger={<UI.Button>Open search</UI.Button>}
        >
          {target === "public" ? (
            <UI.Input ref={input} aria-label="Query" />
          ) : target === "choice" ? (
            <UI.ChoiceSelect
              ref={choice}
              label="Query"
              options={[]}
              onValueChange={() => {}}
            />
          ) : target === "null" ? (
            <p>No search available</p>
          ) : (
            <input
              ref={native}
              aria-label="Query"
              disabled={target === "disabled"}
            />
          )}
        </UI.Popup>
      </UI.KooyaProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open search" }));
    await waitFor(() =>
      expect(
        target === "null" || target === "disabled"
          ? screen.getByRole("dialog")
          : screen.getByRole(target === "choice" ? "combobox" : "textbox"),
      ).toHaveFocus(),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(screen.getByRole("button", { name: "Open search" })).toHaveFocus();
  });

it("names the interactive feedback Progress and preserves Advance and Reset", async () => {
  render(
    <UI.KooyaProvider>
      <ComponentDocs id="feedback" />
    </UI.KooyaProvider>,
  );
  const progress = screen.getByRole("progressbar");
  expect(progress).toHaveAccessibleName("Local task progress");
  for (let i = 0; i < 3; i++)
    await userEvent.click(screen.getByRole("button", { name: "Advance task" }));
  expect(progress).toHaveAttribute("aria-valuenow", "100");
  expect(screen.getByRole("button", { name: "Advance task" })).toBeDisabled();
  await userEvent.click(screen.getByRole("button", { name: "Reset progress" }));
  expect(progress).toHaveAttribute("aria-valuenow", "40");
  expect(screen.getByRole("button", { name: "Advance task" })).toBeEnabled();
});

it("forwards inline semantic colors into interactive Ant component tokens", () => {
  const c = UI.antTheme(
    "signature",
    {},
    {
      "--ku-ink": "#123456",
      "--ku-focus": "#234567",
      "--ku-danger": "#781234",
      "--ku-subtle": "#eeeeee",
    },
  ).components!;
  expect(c.Button?.defaultHoverColor).toBe("#123456");
  expect(c.Button?.defaultActiveBg).toBe("#eeeeee");
  expect(c.Button?.colorErrorActive).toBe("#781234");
  expect(c.Breadcrumb?.linkColor).toBe("#234567");
  expect(c.Pagination?.itemActiveColor).toBe("#234567");
});

it("preserves a child that already took focus instead of overriding it", async () => {
  const target = createRef<HTMLInputElement>();
  render(
    <UI.KooyaProvider reducedMotion>
      <UI.Popup
        label="Intent"
        initialFocusRef={target}
        trigger={<UI.Button>Open intent</UI.Button>}
      >
        <input ref={target} aria-label="Requested" />
        <input autoFocus aria-label="Existing intent" />
      </UI.Popup>
    </UI.KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Open intent" }));
  await waitFor(() =>
    expect(
      screen.getByRole("textbox", { name: "Existing intent" }),
    ).toHaveFocus(),
  );
});

it("initializes focus on controlled reopen and releases refs on unmount", async () => {
  const target = createRef<UI.ChoiceSelectRef>();
  const view = (open: boolean) => (
    <UI.KooyaProvider reducedMotion>
      <UI.Popup
        label="Controlled search"
        open={open}
        initialFocusRef={target}
        trigger={<UI.Button>Controlled trigger</UI.Button>}
      >
        <UI.ChoiceSelect
          ref={target}
          label="Query"
          options={[]}
          onValueChange={() => {}}
        />
      </UI.Popup>
    </UI.KooyaProvider>
  );
  const { rerender, unmount } = render(view(true));
  await waitFor(() => expect(screen.getByRole("combobox")).toHaveFocus());
  await userEvent.type(screen.getByRole("combobox"), "first");
  expect(screen.getByRole("combobox")).toHaveValue("first");
  await act(async () => rerender(view(false)));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  await act(async () => rerender(view(true)));
  await waitFor(() => expect(screen.getByRole("combobox")).toHaveFocus());
  await act(async () => unmount());
  expect(target.current).toBeNull();
});

it("keeps selected controls and progress visible against their surfaces", () => {
  for (const name of ["mosaic", "signature", "canvas", "client"] as const)
    for (const mode of ["light", "dark"] as const) {
      const s = UI.resolveThemeScheme(name, mode),
        c = UI.antTheme(name, { mode }).components!;
      for (const component of ["Checkbox", "Radio", "Switch"] as const) {
        const config = c[component]!;
        for (const bg of [config.colorPrimary, config.colorPrimaryHover]) {
          expect(
            UI.contrastRatio(String(bg), s.surface),
          ).toBeGreaterThanOrEqual(3);
          const glyph =
            component === "Switch" ? c.Switch?.handleBg : config.colorWhite;
          expect(
            UI.contrastRatio(String(bg), String(glyph)),
          ).toBeGreaterThanOrEqual(3);
        }
      }
      expect(
        UI.contrastRatio(String(c.Progress?.defaultColor), s.surface),
      ).toBeGreaterThanOrEqual(3);
    }
});
