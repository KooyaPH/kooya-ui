// Browser regressions and strict consumer types use the built public package.
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Dialog,
  DataTable,
  KooyaProvider,
  TextField,
  type Column,
  type DialogProps,
} from "@kooyaph/ui";
import "@kooyaph/ui/styles.css";
function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount(count + 1)}>
      {label} {count}
    </Button>
  );
}
const columns: Column<{ id: string }>[] = [
  {
    key: "state",
    title: <Counter label="Header" />,
    render: () => <Counter label="Cell" />,
    align: "right",
    className: "fixture-column",
    fixed: "left",
    width: 200,
  },
];
function Overlay({ kind }: { kind: DialogProps["kind"] }) {
  const [labelMode, setLabelMode] = useState("first");
  const [dismissible, setDismissible] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(true);
  const [width, setWidth] = useState<number | string>(700);
  const [open, setOpen] = useState(false);
  return (
    <section>
      <h2 id={`${kind}-first`}>First {kind}</h2>
      <h2 id={`${kind}-second`}>Second {kind}</h2>
      <p id={`${kind}-first-description`}>First {kind} instructions</p>
      <p id={`${kind}-second-description`}>Second {kind} instructions</p>
      <Dialog
        kind={kind}
        title={
          labelMode === "titleless" ? undefined : <span>Generated {kind}</span>
        }
        description={`Generated ${kind} instructions`}
        labelledBy={
          labelMode === "generated"
            ? undefined
            : `${kind}-${labelMode === "titleless" ? "first" : labelMode}`
        }
        describedBy={
          labelMode === "generated"
            ? undefined
            : `${kind}-${labelMode === "titleless" ? "first" : labelMode}-description`
        }
        dismissible={dismissible}
        showCloseButton={showCloseButton}
        closeLabel={`Close ${kind} editor`}
        width={width}
        className={`fixture-${kind}`}
        bodyClassName="fixture-body"
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Open {kind}</Button>}
      >
        <TextField label={`${kind} note`} />
        <Button onClick={() => setLabelMode("second")}>Second labels</Button>
        <Button onClick={() => setLabelMode("generated")}>
          Generated labels
        </Button>
        <Button onClick={() => setLabelMode("titleless")}>
          Titleless labels
        </Button>
        <Button onClick={() => setDismissible(!dismissible)}>
          Toggle dismissible
        </Button>
        <Button onClick={() => setShowCloseButton(!showCloseButton)}>
          Toggle close icon
        </Button>
        <Button onClick={() => setWidth(width === 700 ? "80vw" : 700)}>
          Toggle width
        </Button>
        <Button onClick={() => setOpen(false)}>Finish editor</Button>
      </Dialog>
    </section>
  );
}
function Fixture() {
  const [revision, setRevision] = useState(0);
  const [activated, setActivated] = useState("");
  return (
    <KooyaProvider reducedMotion fontFamily="Arial">
      <Button onClick={() => setTimeout(() => setRevision(revision + 1), 200)}>
        Update parent
      </Button>
      <output aria-label="Activated">{activated}</output>
      <output aria-label="Revision">{revision}</output>
      <DataTable
        label={`Accounts ${revision}`}
        rows={[{ id: "a" }]}
        rowKey={(row) => row.id}
        columns={columns}
        onRow={(row) => ({
          tabIndex: 0,
          "aria-label": `Account ${row.id}`,
          onClick: (event) => {
            if (
              event.target instanceof Element &&
              !event.target.closest("button")
            )
              setActivated(`click ${row.id}`);
          },
          onKeyDown: (event) => {
            if (event.target === event.currentTarget && event.key === "Enter")
              setActivated(`keyboard ${row.id}`);
          },
        })}
      />
      {(["modal", "drawer", "navigation"] as const).map((kind) => (
        <Overlay key={kind} kind={kind} />
      ))}
    </KooyaProvider>
  );
}
createRoot(document.getElementById("root")!).render(<Fixture />);
