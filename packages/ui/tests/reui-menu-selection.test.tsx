import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "../../../apps/playground/src/reui/adapters/menus";
afterEach(cleanup);
it("returns focus to the trigger when Escape destroys the recipe popup", async () => {
  render(
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button>Escape recipe menu</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Escape action</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
  const trigger = screen.getByRole("button", { name: "Escape recipe menu" });
  await userEvent.click(trigger);
  const item = await screen.findByRole("menuitem", { name: "Escape action" });
  item.focus();
  fireEvent.keyDown(item, {
    key: "Escape",
    code: "Escape",
    keyCode: 27,
    which: 27,
  });
  await waitFor(() =>
    expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
  );
  expect(trigger).toHaveFocus();
});
for (const cancel of [false, true])
  it(`preserves caller selection cancellation=${cancel} before restoring trigger focus`, async () => {
    const select = vi.fn((event: React.SyntheticEvent) => {
      if (cancel) event.preventDefault();
    });
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Open recipe menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={select}>
            Choose recipe action
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Open recipe menu" }),
    );
    const item = await screen.findByRole("menuitem", {
      name: "Choose recipe action",
    });
    item.focus();
    const accepted = fireEvent.keyDown(item, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13,
    });
    expect(select).toHaveBeenCalledOnce();
    expect(accepted).toBe(false);
    if (cancel)
      await waitFor(() => expect(screen.getByRole("menu")).toBeVisible());
    else
      await waitFor(() =>
        expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
      );
    expect(
      cancel ? item : screen.getByRole("button", { name: "Open recipe menu" }),
    ).toHaveFocus();
  });

it("preserves focus deliberately moved by a recipe selection callback", async () => {
  render(
    <>
      <button>Next recipe action</button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Open recipe menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() =>
              screen.getByRole("button", { name: "Next recipe action" }).focus()
            }
          >
            Choose recipe action
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>,
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Open recipe menu" }),
  );
  const item = await screen.findByRole("menuitem", {
    name: "Choose recipe action",
  });
  item.focus();
  fireEvent.keyDown(item, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    which: 13,
  });
  await waitFor(() =>
    expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
  );
  expect(
    screen.getByRole("button", { name: "Next recipe action" }),
  ).toHaveFocus();
});

it("closes every portaled submenu after accepting a nested action", async () => {
  const selected = vi.fn();
  render(
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button>Open nested recipe menu</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Advanced recipe actions
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onSelect={selected}>
              Nested recipe action
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Open nested recipe menu" }),
  );
  await userEvent.hover(
    screen.getByRole("menuitem", { name: "Advanced recipe actions" }),
  );
  const nested = await screen.findByRole("menuitem", {
    name: "Nested recipe action",
  });
  nested.focus();
  fireEvent.keyDown(nested, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    which: 13,
  });
  expect(selected).toHaveBeenCalledOnce();
  await waitFor(() => expect(screen.queryAllByRole("menu")).toHaveLength(0));
  expect(
    screen.getByRole("button", { name: "Open nested recipe menu" }),
  ).toHaveFocus();
});

it("keeps a retained closed popup inert so late native navigation cannot focus its items", async () => {
  const fixture = (open: boolean) => (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger><button>Retained menu</button></DropdownMenuTrigger>
      <DropdownMenuContent forceMount>
        <DropdownMenuItem>Retained action</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  const { rerender } = render(fixture(true));
  const menu = await screen.findByRole("menu");
  expect(menu).not.toHaveAttribute("inert");
  menu.focus();
  fireEvent.keyDown(menu, { key: "ArrowDown", code: "ArrowDown", keyCode: 40 });
  rerender(fixture(false));
  await waitFor(() => expect(menu).toHaveAttribute("inert"));
});
