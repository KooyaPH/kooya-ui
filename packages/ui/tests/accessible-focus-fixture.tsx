import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Breadcrumb,
  type ThemeName,
  ChoiceSelect,
  Popup,
  Input,
  Menu,
  Dialog,
  KooyaProvider,
  type ChoiceSelectRef,
  type InputRef,
} from "@kooyaph/ui";
import {
  ChoiceSelect as MoleculeChoice,
  type ChoiceSelectRef as MoleculeRef,
} from "@kooyaph/ui/molecules";
import "@kooyaph/ui/styles.css";

function SearchPanel({ kind, at }: { kind: string; at: string }) {
  const choice = useRef<ChoiceSelectRef>(null),
    input = useRef<InputRef>(null),
    native = useRef<HTMLInputElement>(null),
    unfocusable = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false),
    [value, setValue] = useState<string>(),
    [values, setValues] = useState<string[]>([]),
    [query, setQuery] = useState(""),
    [count, setCount] = useState(0),
    [dialog, setDialog] = useState(false),
    [editorCount, setEditorCount] = useState(0);
  const target =
    kind === "nonfocusable"
      ? unfocusable
      : kind === "public"
        ? input
        : kind === "native" || kind === "disabled" || kind === "null"
          ? native
          : choice;
  const options = [
    { value: "alex", label: "Alex" },
    { value: "sam", label: "Sam" },
  ];
  return (
    <section aria-label={`${kind} ${at}`} style={{ marginBottom: 24 }}>
      <Popup
        label={`${kind} ${at}`}
        open={open}
        onOpenChange={setOpen}
        initialFocusRef={target}
        trigger={
          <Button>
            {kind} {at}
          </Button>
        }
      >
        {kind === "nonfocusable" ? (
          <div ref={unfocusable}>Static instructions</div>
        ) : kind === "public" ? (
          <Input
            ref={input}
            aria-label="Search text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : kind === "native" || kind === "disabled" ? (
          <input
            ref={native}
            aria-label="Search text"
            disabled={kind === "disabled"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : kind === "null" ? (
          <p>No search available</p>
        ) : kind === "multiple" ? (
          <ChoiceSelect
            ref={choice}
            label="Search choices"
            multiple
            value={values}
            options={options}
            searchValue={query}
            onSearch={setQuery}
            onValueChange={(v) => {
              setValues(v);
              setCount((c) => c + 1);
            }}
          />
        ) : (
          <ChoiceSelect
            ref={choice}
            disabled={kind === "disabled-choice"}
            label="Search choices"
            value={value}
            options={options}
            searchValue={query}
            onSearch={setQuery}
            onValueChange={(v) => {
              setValue(v);
              setCount((c) => c + 1);
            }}
          />
        )}
        <Button onClick={() => setQuery("")}>Reset query</Button>
        <Menu
          label="Search actions"
          trigger={<Button>Search actions</Button>}
          items={[
            {
              label: "Open editor",
              onSelect: () => {
                setOpen(false);
                setDialog(true);
                setEditorCount((c) => c + 1);
              },
            },
          ]}
        />
        <Button onClick={() => setOpen(false)}>Done</Button>
      </Popup>
      <output aria-label={`${kind} ${at} selections`}>
        {count}:{value ?? values.join(",")}
      </output>
      <output aria-label={`${kind} ${at} editor selections`}>
        {editorCount}
      </output>
      <Dialog title="Search editor" open={dialog} onOpenChange={setDialog}>
        <Input aria-label="Editor text" />
      </Dialog>
    </section>
  );
}
function Fixture() {
  const params = new URLSearchParams(location.search),
    standalone = useRef<MoleculeRef>(null);
  const [mounted, setMounted] = useState(true);
  return (
    <KooyaProvider
      theme={(params.get("theme") || "mosaic") as ThemeName}
      mode={params.get("mode") === "dark" ? "dark" : "light"}
      reducedMotion={params.has("reduced") ? true : undefined}
      style={{ padding: 16 }}
    >
      <h1>Accessible focus fixture</h1>
      <Button onClick={() => setMounted(!mounted)}>Toggle panels</Button>
      {["top", "middle", "end"].map((at, i) => (
        <div key={at} style={{ paddingTop: i ? 1100 : 450 }}>
          {mounted &&
            [
              "single",
              "multiple",
              "native",
              "public",
              "disabled",
              "disabled-choice",
              "nonfocusable",
              "null",
            ].map((kind) => <SearchPanel key={kind} kind={kind} at={at} />)}
        </div>
      ))}
      <section aria-label="Linked navigation">
        <Breadcrumb
          items={[
            { title: "Browse", href: "#browse" },
            { title: "Context" },
            { title: "Current" },
          ]}
        />
      </section>
      <h2>Standalone focus compatibility</h2>
      <MoleculeChoice
        ref={standalone}
        label="Standalone"
        autoFocus={params.has("standalone")}
        options={[]}
        onValueChange={() => {}}
      />
      <Button
        onClick={() => standalone.current?.focus({ preventScroll: true })}
      >
        Focus standalone
      </Button>
      <Button onClick={() => standalone.current?.blur()}>
        Blur standalone
      </Button>
    </KooyaProvider>
  );
}
createRoot(document.getElementById("root")!).render(<Fixture />);
