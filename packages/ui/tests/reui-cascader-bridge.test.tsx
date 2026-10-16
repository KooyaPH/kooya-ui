import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KooyaProvider } from "@kooyaph/ui/foundations";
import {
  Cascader,
  CascaderTrigger,
} from "../../../apps/playground/src/reui/adapters/cascader";
import { CascaderValue } from "../../../apps/playground/src/reui/adapters/cascader";
describe("REUI native cascader", () => {
  it("uses actual Ant Cascader while retaining a custom compound trigger", async () => {
    const { container } = render(
      <KooyaProvider>
        <Cascader items={[{ value: "one", label: "Fictional option" }]}>
          <CascaderTrigger aria-label="Destination">
            <CascaderValue placeholder="Choose destination" />
          </CascaderTrigger>
        </Cascader>
      </KooyaProvider>,
    );
    expect(
      screen.getByRole("combobox", { name: "Destination" }),
    ).toBeInTheDocument();
    const { default: userEvent } = await import("@testing-library/user-event");
    await userEvent.click(
      screen.getByRole("combobox", { name: "Destination" }),
    );
    expect(await screen.findByText("Fictional option")).toBeInTheDocument();
    expect(
      document.querySelector(".ku-overlay-host .ant-cascader-dropdown"),
    ).toBeInTheDocument();
  });
});

it("drills through native options, exposes a translated breadcrumb and submits the selected leaf", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const { useState } = await import("react");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  function Fixture() {
    const [value, setValue] = useState("");
    return (
      <KooyaProvider reducedMotion>
        <form aria-label="Local form">
          <C.Cascader
            items={[
              {
                value: "folder",
                label: "Folder",
                children: [{ value: "file", label: "File" }],
              },
            ]}
            value={value}
            onValueChange={setValue}
            name="destination"
            labels={{ rootLevel: "Root folders", back: "Go back" }}
          >
            <C.CascaderTrigger aria-label="Destination">
              <C.CascaderValue placeholder="Choose destination" />
            </C.CascaderTrigger>
            <C.CascaderContent>
              <C.CascaderPanel>
                <C.CascaderInput />
                <C.CascaderBreadcrumb />
                <C.CascaderEmpty />
                <C.CascaderList>
                  <C.CascaderItems />
                </C.CascaderList>
                <C.CascaderStatus />
              </C.CascaderPanel>
            </C.CascaderContent>
          </C.Cascader>
        </form>
      </KooyaProvider>
    );
  }
  render(<Fixture />);
  const user = userEvent.setup();
  await user.click(screen.getByRole("combobox", { name: "Destination" }));
  await user.click(await screen.findByText("Folder"));
  expect(
    await screen.findByRole("button", { name: "Go back" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Root folders" }),
  ).toBeInTheDocument();
  await user.click(await screen.findByText("File"));
  expect(
    screen.getByRole("combobox", { name: "Destination" }),
  ).toHaveTextContent("Folder / File");
  expect(
    new FormData(
      screen.getByRole("form", { name: "Local form" }) as HTMLFormElement,
    ).get("destination"),
  ).toBe("file");
});

it("retains independent multiple selections, max limits and a headless clear action", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const { useState } = await import("react");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  function Clear() {
    const selection = C.useCascaderSelection();
    return (
      <C.CascaderAction onSelect={selection.clear} disabled={selection.isEmpty}>
        Clear picked
      </C.CascaderAction>
    );
  }
  function Fixture() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <KooyaProvider reducedMotion>
        <C.Cascader
          multiple
          max={1}
          items={[
            { value: "one", label: "One" },
            { value: "two", label: "Two" },
            { value: "blocked", label: "Blocked", disabled: true },
          ]}
          value={value}
          onValueChange={setValue}
        >
          <C.CascaderTrigger aria-label="Selections">
            <C.CascaderValue placeholder="Pick" />
          </C.CascaderTrigger>
          <C.CascaderContent>
            <C.CascaderPanel>
              <C.CascaderList>
                <C.CascaderItems />
              </C.CascaderList>
              <C.CascaderFooter>
                <Clear />
              </C.CascaderFooter>
              <C.CascaderStatus />
            </C.CascaderPanel>
          </C.CascaderContent>
        </C.Cascader>
        <output aria-label="Picks">{value.join(",")}</output>
      </KooyaProvider>
    );
  }
  render(<Fixture />);
  const user = userEvent.setup();
  await user.click(screen.getByRole("combobox", { name: "Selections" }));
  await user.click(await screen.findByText("One"));
  expect(screen.getByLabelText("Picks")).toHaveTextContent("one");
  await user.click(screen.getByText("Two"));
  expect(screen.getByLabelText("Picks")).toHaveTextContent(/^one$/);
  expect(screen.getByText("Selection limit of 1 reached")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Clear picked" }));
  expect(screen.getByLabelText("Picks")).toBeEmptyDOMElement();
});

it("uses the abort-aware upstream loader and cancels an active request on close", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const { waitFor } = await import("@testing-library/react");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  let signal: AbortSignal | undefined;
  const { rerender } = render(
    <KooyaProvider reducedMotion>
      <C.Cascader
        items={[]}
        open
        getChildren={(_node, context) => {
          signal = context.signal;
          return new Promise(() => {});
        }}
      >
        <C.CascaderTrigger aria-label="Async selection">
          Load choices
        </C.CascaderTrigger>
        <C.CascaderContent>
          <C.CascaderEmpty />
          <C.CascaderList>
            <C.CascaderItems />
          </C.CascaderList>
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  await waitFor(() => expect(signal).toBeDefined());
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  rerender(
    <KooyaProvider reducedMotion>
      <C.Cascader
        items={[]}
        open={false}
        getChildren={(_node, context) => {
          signal = context.signal;
          return new Promise(() => {});
        }}
      >
        <C.CascaderTrigger aria-label="Async selection">
          Load choices
        </C.CascaderTrigger>
        <C.CascaderContent>
          <C.CascaderEmpty />
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  expect(signal?.aborted).toBe(true);
});

it("keeps selections open when requested but still dismisses on outside interaction", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const { waitFor } = await import("@testing-library/react");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  render(
    <KooyaProvider reducedMotion>
      <button>Outside control</button>
      <C.Cascader
        closeOnSelect={false}
        items={[{ value: "one", label: "One choice" }]}
      >
        <C.CascaderTrigger aria-label="Keep open">Choose</C.CascaderTrigger>
        <C.CascaderContent>
          <C.CascaderList>
            <C.CascaderItems />
          </C.CascaderList>
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  const user = userEvent.setup();
  await user.click(screen.getByRole("combobox", { name: "Keep open" }));
  await user.click(await screen.findByText("One choice"));
  await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
  await user.click(screen.getByRole("button", { name: "Outside control" }));
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
});

it("retains submenu close actions without closing the parent controller", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  function ImportAction() {
    const submenu = C.useCascaderSubmenu();
    return (
      <C.CascaderAction onSelect={() => submenu.close()}>
        Import source
      </C.CascaderAction>
    );
  }
  render(
    <KooyaProvider reducedMotion>
      <C.Cascader items={[]} defaultOpen>
        <C.CascaderTrigger aria-label="Destination">Choose</C.CascaderTrigger>
        <C.CascaderContent>
          <C.CascaderFooter>
            <C.CascaderSubmenu>
              <C.CascaderSubmenuTrigger>Imports</C.CascaderSubmenuTrigger>
              <C.CascaderSubmenuContent>
                <ImportAction />
              </C.CascaderSubmenuContent>
            </C.CascaderSubmenu>
          </C.CascaderFooter>
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  const user = userEvent.setup();
  await user.click(await screen.findByRole("button", { name: /Imports/ }));
  await user.click(
    await screen.findByRole("button", { name: "Import source" }),
  );
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("dialog")).toBeVisible();
});

it("preserves custom grouped rows without nesting interactive buttons", async () => {
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  const { container } = render(
    <KooyaProvider reducedMotion>
      <C.Cascader
        inline
        multiple
        items={[
          {
            value: "folder",
            label: "Folder",
            children: [{ value: "leaf", label: "Leaf" }],
          },
        ]}
      >
        <C.CascaderContent>
          <C.CascaderItems>
            {(node) => <C.CascaderItem node={node} />}
          </C.CascaderItems>
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  expect(screen.getByRole("button", { name: "Folder" })).toBeInTheDocument();
  expect(container.querySelector("button button")).toBeNull();
  expect(container.querySelector("button input")).toBeNull();
});

it("exposes keyboard highlight and skips disabled results before committing a leaf", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  render(
    <KooyaProvider reducedMotion>
      <C.Cascader
        defaultOpen
        items={[
          { value: "disabled", label: "Unavailable", disabled: true },
          { value: "leaf", label: "Available leaf" },
        ]}
      >
        <C.CascaderTrigger aria-label="Keyboard choice">
          <C.CascaderValue placeholder="Choose" />
        </C.CascaderTrigger>
        <C.CascaderContent>
          <C.CascaderInput />
          <C.CascaderList>
            <C.CascaderItems />
          </C.CascaderList>
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  await user.click(input);
  await user.keyboard("{ArrowDown}");
  const id = input.getAttribute("aria-activedescendant");
  expect(id).toBeTruthy();
  expect(document.getElementById(id!)).toHaveTextContent("Available leaf");
  await user.keyboard("{Enter}");
  expect(
    screen.getByRole("combobox", { name: "Keyboard choice" }),
  ).toHaveTextContent("Available leaf");
});

it("holds async drill navigation until children load, then exposes one cursor paging action", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const { act, waitFor } = await import("@testing-library/react");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  let complete:
    | ((result: {
        items: { value: string; label: string }[];
        hasMore: boolean;
        nextCursor?: string;
      }) => void)
    | undefined;
  const requests: (string | undefined)[] = [];
  render(
    <KooyaProvider reducedMotion>
      <C.Cascader
        defaultOpen
        items={[{ value: "folder", label: "Remote folder", hasChildren: true }]}
        getChildren={(_node, context) => {
          requests.push(context.cursor);
          return new Promise((resolve) => {
            complete = resolve;
          });
        }}
      >
        <C.CascaderTrigger aria-label="Paged selection">
          Choose
        </C.CascaderTrigger>
        <C.CascaderContent>
          <C.CascaderInput />
          <C.CascaderBreadcrumb />
          <C.CascaderEmpty />
          <C.CascaderList>
            <C.CascaderItems />
          </C.CascaderList>
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  const user = userEvent.setup();
  await user.click(await screen.findByText("Remote folder"));
  await waitFor(() => expect(complete).toBeDefined());
  expect(
    screen.queryByRole("button", { name: "Back" }),
  ).not.toBeInTheDocument();
  expect(screen.getByText("Remote folder")).toBeInTheDocument();
  await act(async () =>
    complete!({
      items: [{ value: "first", label: "First remote file" }],
      hasMore: true,
      nextCursor: "page-two",
    }),
  );
  expect(await screen.findByText("First remote file")).toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: "Load more" })).toHaveLength(1);
  await user.click(screen.getByRole("button", { name: "Load more" }));
  await waitFor(() => expect(requests).toEqual([undefined, "page-two"]));
  await act(async () =>
    complete!({
      items: [{ value: "second", label: "Second remote file" }],
      hasMore: false,
    }),
  );
  expect(await screen.findByText("Second remote file")).toBeInTheDocument();
  expect(screen.getByText("First remote file")).toBeInTheDocument();
});

it("retains loaded-subtree cascade selection through the actual Ant tree", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const { useState } = await import("react");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  function Fixture() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <KooyaProvider reducedMotion>
        <C.Cascader
          inline
          mode="tree"
          multiple
          cascade
          selectable="any"
          defaultExpanded={["folder"]}
          value={value}
          onValueChange={setValue}
          items={[
            {
              value: "folder",
              label: "Parent",
              children: [
                { value: "one", label: "First" },
                { value: "blocked", label: "Blocked", disabled: true },
              ],
            },
          ]}
        >
          <C.CascaderContent>
            <C.CascaderList>
              <C.CascaderItems />
            </C.CascaderList>
          </C.CascaderContent>
        </C.Cascader>
        <output aria-label="Cascade picks">{value.join(",")}</output>
      </KooyaProvider>
    );
  }
  const { container } = render(<Fixture />);
  const user = userEvent.setup();
  expect(container.querySelector(".ant-tree")).toBeInTheDocument();
  await user.click(
    container.querySelector(".ant-tree-treenode .ant-tree-checkbox")!,
  );
  expect(screen.getByLabelText("Cascade picks")).toHaveTextContent(
    "folder,one",
  );
});

it("preserves independent column leaves when native Ant would summarize their parent", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const { useState } = await import("react");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  function Fixture() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <KooyaProvider reducedMotion>
        <C.Cascader
          inline
          mode="columns"
          multiple
          value={value}
          onValueChange={setValue}
          items={[
            {
              value: "a",
              label: "Alpha",
              children: [
                { value: "b", label: "Beta" },
                { value: "c", label: "Charlie" },
              ],
            },
          ]}
        >
          <C.CascaderContent>
            <C.CascaderItems />
          </C.CascaderContent>
        </C.Cascader>
        <output aria-label="Independent picks">{value.join(",")}</output>
      </KooyaProvider>
    );
  }
  const { container } = render(<Fixture />);
  const user = userEvent.setup();
  await user.click(screen.getByText("Alpha"));
  await user.click(
    screen
      .getByText("Beta")
      .closest(".ant-cascader-menu-item")!
      .querySelector("input, .ant-cascader-checkbox")!,
  );
  await user.click(
    screen
      .getByText("Charlie")
      .closest(".ant-cascader-menu-item")!
      .querySelector("input, .ant-cascader-checkbox")!,
  );
  expect(screen.getByLabelText("Independent picks")).toHaveTextContent("b,c");
});

it("filters tree rows as well as announcements when searching", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  render(
    <KooyaProvider reducedMotion>
      <C.Cascader
        inline
        mode="tree"
        items={[
          { value: "a", label: "Alpha" },
          { value: "c", label: "Charlie" },
        ]}
      >
        <C.CascaderContent>
          <C.CascaderInput />
          <C.CascaderItems />
          <C.CascaderStatus />
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  await userEvent.type(screen.getByRole("textbox"), "Charlie");
  expect(screen.getByText("Charlie")).toBeInTheDocument();
  expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
});

it("shows a mixed Ant parent indicator when only one descendant is selected", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  const { container } = render(
    <KooyaProvider reducedMotion>
      <C.Cascader
        inline
        mode="tree"
        multiple
        cascade
        selectable="any"
        defaultExpanded={["parent"]}
        items={[
          {
            value: "parent",
            label: "Parent",
            children: [
              { value: "one", label: "First" },
              { value: "two", label: "Second" },
            ],
          },
        ]}
      >
        <C.CascaderContent>
          <C.CascaderItems />
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  const user = userEvent.setup();
  const row = screen.getByText("First").closest(".ant-tree-treenode")!;
  await user.click(row.querySelector(".ant-tree-checkbox")!);
  expect(
    container.querySelector(".ant-tree-checkbox-indeterminate"),
  ).toHaveAttribute("aria-checked", "mixed");
});

it.each(["tree", "columns"] as const)(
  "keeps paged children reachable in %s virtual views",
  async (mode) => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const C = await import(
      "../../../apps/playground/src/reui/adapters/cascader"
    );
    render(
      <KooyaProvider reducedMotion>
        <C.Cascader
          inline
          mode={mode}
          virtualize
          defaultExpanded={["branch"]}
          defaultPath={["branch"]}
          items={[
            { value: "branch", label: "Remote branch", hasChildren: true },
          ]}
          getChildren={(_node, context) =>
            context.cursor
              ? {
                  items: [{ value: "second", label: "Second file" }],
                  hasMore: false,
                }
              : {
                  items: [{ value: "first", label: "First file" }],
                  nextCursor: "next",
                }
          }
        >
          <C.CascaderContent>
            {mode === "tree" ? <C.CascaderItems /> : <C.CascaderColumns />}
          </C.CascaderContent>
        </C.Cascader>
      </KooyaProvider>,
    );
    const user = userEvent.setup();
    expect(await screen.findByText("First file")).toBeInTheDocument();
    await user.click(await screen.findByText("Load more"));
    expect(await screen.findByText("Second file")).toBeInTheDocument();
  },
);

it("finds descendants in collapsed trees and retains their ancestor context", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const C = await import("../../../apps/playground/src/reui/adapters/cascader");
  render(
    <KooyaProvider reducedMotion>
      <C.Cascader
        inline
        mode="tree"
        items={[
          {
            value: "a",
            label: "Alpha",
            children: [{ value: "b", label: "Beta" }],
          },
          { value: "c", label: "Unrelated" },
        ]}
      >
        <C.CascaderContent>
          <C.CascaderInput />
          <C.CascaderItems />
          <C.CascaderStatus />
        </C.CascaderContent>
      </C.Cascader>
    </KooyaProvider>,
  );
  await userEvent.type(screen.getByRole("textbox"), "Beta");
  expect(screen.getByText("Beta")).toBeInTheDocument();
  expect(screen.getByText("Alpha")).toBeInTheDocument();
  expect(screen.queryByText("Unrelated")).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("1 result");
});
