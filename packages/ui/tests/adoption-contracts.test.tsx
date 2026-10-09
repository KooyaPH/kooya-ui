import { useState } from "react";
import { it, expect } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as UI from "../src";

it("table exposes row click and keyboard attributes without remounting header or cell state", async () => {
  function Counter({ label }: { label: string }) {
    const [count, setCount] = useState(0);
    return (
      <UI.Button onClick={() => setCount(count + 1)}>
        {label} {count}
      </UI.Button>
    );
  }
  function Fixture() {
    const [version, setVersion] = useState(0);
    const [activated, setActivated] = useState("");
    return (
      <UI.KooyaProvider>
        <UI.Button onClick={() => setVersion(version + 1)}>
          Update parent
        </UI.Button>
        <output aria-label="Activated">{activated}</output>
        <UI.DataTable
          label={`Records ${version}`}
          rows={[{ id: "a" }]}
          rowKey={(r) => r.id}
          onRow={(row) => ({
            "aria-label": `Record ${row.id}`,
            tabIndex: 0,
            onClick: (event) => {
              if (event.target === event.currentTarget)
                setActivated(`click ${row.id}`);
            },
            onKeyDown: (event) => {
              if (event.key === "Enter") setActivated(`keyboard ${row.id}`);
            },
          })}
          columns={[
            {
              key: "record",
              title: <Counter label="Header" />,
              align: "right",
              className: "adoption-column",
              fixed: "left",
              width: 200,
              render: () => <Counter label="Cell" />,
            },
          ]}
        />
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  const row = screen.getByRole("row", { name: "Record a" });
  expect(row).toHaveAttribute("tabindex", "0");
  fireEvent.click(row);
  expect(screen.getByLabelText("Activated")).toHaveTextContent("click a");
  fireEvent.keyDown(row, { key: "Enter" });
  expect(screen.getByLabelText("Activated")).toHaveTextContent("keyboard a");
  await userEvent.click(screen.getByRole("button", { name: "Header 0" }));
  await userEvent.click(screen.getByRole("button", { name: "Cell 0" }));
  await userEvent.click(screen.getByRole("button", { name: "Update parent" }));
  expect(screen.getByRole("button", { name: "Header 1" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Cell 1" })).toBeInTheDocument();
  expect(screen.getByRole("columnheader")).toHaveClass("adoption-column");
  expect(screen.getByRole("columnheader")).toHaveStyle({ textAlign: "right" });
  expect(screen.getByRole("cell")).toHaveClass("adoption-column");
});

for (const kind of ["modal", "drawer", "navigation"] as const) {
  it(`${kind} blocks user dismissal when nondismissible and permits controlled closing`, async () => {
    function Fixture() {
      const [open, setOpen] = useState(false);
      return (
        <UI.KooyaProvider reducedMotion>
          <UI.Dialog
            kind={kind}
            title="Required decision"
            dismissible={false}
            open={open}
            onOpenChange={setOpen}
            trigger={<UI.Button>Open required</UI.Button>}
          >
            <UI.Button onClick={() => setOpen(false)}>
              Finish decision
            </UI.Button>
          </UI.Dialog>
        </UI.KooyaProvider>
      );
    }
    render(<Fixture />);
    await userEvent.click(
      screen.getByRole("button", { name: "Open required" }),
    );
    const dialog = await screen.findByRole("dialog", {
      name: "Required decision",
    });
    expect(within(dialog).queryByRole("button", { name: /Close/ })).toBeNull();
    fireEvent.keyDown(dialog, { key: "Escape", keyCode: 27 });
    expect(dialog).toBeInTheDocument();
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Finish decision" }),
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
  it(`${kind} hides only its close icon and retains Escape dismissal`, async () => {
    render(
      <UI.KooyaProvider reducedMotion>
        <UI.Dialog
          kind={kind}
          title="Hidden icon"
          showCloseButton={false}
          trigger={<UI.Button>Open hidden</UI.Button>}
        >
          <p>Contents</p>
        </UI.Dialog>
      </UI.KooyaProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open hidden" }));
    const dialog = await screen.findByRole("dialog", { name: "Hidden icon" });
    expect(within(dialog).queryByRole("button", { name: /Close/ })).toBeNull();
    fireEvent.keyDown(dialog, { key: "Escape", keyCode: 27 });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
  it(`${kind} uses changing external labels/descriptions and additive classes`, async () => {
    function Fixture() {
      const [second, setSecond] = useState(false);
      return (
        <UI.KooyaProvider reducedMotion>
          <h2 id="first-title">First heading</h2>
          <h2 id="second-title">Second heading</h2>
          <p id="first-description">First instructions</p>
          <p id="second-description">Second instructions</p>
          <UI.Dialog
            kind={kind}
            title={<span>Internal title</span>}
            labelledBy={second ? "second-title" : "first-title"}
            describedBy={second ? "second-description" : "first-description"}
            description="Internal description"
            closeLabel="Close editor"
            width={700}
            className="adoption-dialog"
            bodyClassName="adoption-body"
            trigger={<UI.Button>Open labelled</UI.Button>}
          >
            <UI.Button onClick={() => setSecond(!second)}>
              Switch labels
            </UI.Button>
          </UI.Dialog>
        </UI.KooyaProvider>
      );
    }
    render(<Fixture />);
    await userEvent.click(
      screen.getByRole("button", { name: "Open labelled" }),
    );
    const dialog = await screen.findByRole("dialog", { name: "First heading" });
    expect(dialog).toHaveAccessibleDescription("First instructions");
    expect(dialog.closest(".adoption-dialog")).not.toBeNull();
    expect(
      dialog.querySelector(".ku-overlay-body.adoption-body"),
    ).not.toBeNull();
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Switch labels" }),
    );
    expect(
      screen.getByRole("dialog", { name: "Second heading" }),
    ).toHaveAccessibleDescription("Second instructions");
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Close editor" }),
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
}

for (const kind of ["modal", "drawer", "navigation"] as const) {
  it(`${kind} reconciles external ARIA removal and reopening`, async () => {
    const view = (external: boolean, title?: React.ReactNode) => (
      <UI.KooyaProvider reducedMotion>
        <h2 id="external-title">External heading</h2>
        <p id="external-description">External instructions</p>
        <UI.Dialog
          kind={kind}
          title={title}
          labelledBy={external ? "external-title" : undefined}
          describedBy={external ? "external-description" : undefined}
          description="Generated instructions"
          trigger={<UI.Button>Open lifecycle</UI.Button>}
        >
          <UI.TextField label="Note" />
        </UI.Dialog>
      </UI.KooyaProvider>
    );
    const { rerender } = render(view(true));
    await userEvent.click(
      screen.getByRole("button", { name: "Open lifecycle" }),
    );
    expect(
      await screen.findByRole("dialog", { name: "External heading" }),
    ).toHaveAccessibleDescription("External instructions");
    rerender(view(false, <span>Generated heading</span>));
    expect(
      screen.getByRole("dialog", { name: "Generated heading" }),
    ).toHaveAccessibleDescription("Generated instructions");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await userEvent.click(
      screen.getByRole("button", { name: "Open lifecycle" }),
    );
    expect(
      await screen.findByRole("dialog", { name: "Generated heading" }),
    ).toHaveAccessibleDescription("Generated instructions");
  });
}

it("retains the existing default close action accessible name", async () => {
  render(
    <UI.KooyaProvider>
      <UI.Dialog
        title="Default controls"
        trigger={<UI.Button>Open defaults</UI.Button>}
      >
        <p>Contents</p>
      </UI.Dialog>
    </UI.KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Open defaults" }));
  expect(
    within(await screen.findByRole("dialog")).getByRole("button", {
      name: "Close",
      exact: true,
    }),
  ).toBeInTheDocument();
});
