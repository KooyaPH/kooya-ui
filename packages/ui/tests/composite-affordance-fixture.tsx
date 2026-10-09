import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Chip,
  ChoiceSelect,
  SelectField,
  Select,
  TextField,
  Checkbox,
  Tabs,
  Popup,
  DataTable,
  KooyaProvider,
  type ChoiceSelectRef,
  type ThemeName,
} from "@kooyaph/ui";
import "@kooyaph/ui/styles.css";

const options = [
  { value: "alex", label: "Alex" },
  { value: "sam", label: "Sam" },
  { value: "blocked", label: "Blocked", disabled: true },
];
function Fixture() {
  const params = new URLSearchParams(location.search);
  const [values, setValues] = useState<string[]>(
    params.has("selected") ? ["alex"] : [],
  );
  const [query, setQuery] = useState("");
  const [popupValues, setPopupValues] = useState<string[]>(
    params.has("selected") ? ["alex"] : [],
  );
  const [changes, setChanges] = useState(0);
  const [actions, setActions] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<ChoiceSelectRef>(null);
  const choice = (label: string, popup = false) => (
    <ChoiceSelect
      ref={popup ? ref : undefined}
      label={label}
      multiple
      value={popup ? popupValues : values}
      options={options}
      searchValue={query}
      onSearch={setQuery}
      onValueChange={(v) => {
        if (popup) setPopupValues(v);
        else setValues(v);
        setChanges((n) => n + 1);
      }}
    />
  );
  return (
    <KooyaProvider
      theme={(params.get("theme") || "mosaic") as ThemeName}
      mode={params.get("mode") === "dark" ? "dark" : "light"}
      reducedMotion={params.has("reduced")}
      style={{ padding: 16 }}
    >
      <h1>Composite affordances</h1>
      <div style={{ display: "grid", gap: 16, maxWidth: 440 }}>
        {choice("Multiple choices")}
        <Button
          onClick={() => {
            setValues([]);
            setQuery("");
          }}
        >
          Reset choices
        </Button>
        <Popup
          label="Popup choices"
          trigger={<Button>Open choices</Button>}
          open={open}
          onOpenChange={setOpen}
          initialFocusRef={ref}
        >
          {choice("Popup search", true)}
          <Button onClick={() => setOpen(false)}>Done</Button>
        </Popup>
        <ChoiceSelect
          label="Single choice"
          options={options}
          onValueChange={() => {}}
        />
        <SelectField label="Single field" options={options} />
        <Select aria-label="Raw select" showSearch options={options} />
        <TextField label="Standalone text" />
        <input aria-label="Native text" />
        <Checkbox label="Selection control" defaultChecked />
        <Tabs
          label="Sample tabs"
          value="one"
          options={[
            { value: "one", label: "One" },
            { value: "two", label: "Two" },
          ]}
          onValueChange={() => {}}
        >
          First
        </Tabs>
        <ChoiceSelect
          label="Disabled choices"
          disabled
          multiple
          value={[]}
          options={options}
          onValueChange={() => setChanges((n) => n + 1)}
        />
        <ChoiceSelect
          label="Busy choices"
          loading
          multiple
          value={[]}
          options={options}
          onValueChange={() => setChanges((n) => n + 1)}
        />
        <Button onClick={() => setActions((n) => n + 1)}>
          Action <Chip>Enabled count</Chip>
        </Button>
        <Button disabled onClick={() => setActions((n) => n + 1)}>
          Action <Chip>Disabled count</Chip>
        </Button>
        <Button loading onClick={() => setActions((n) => n + 1)}>
          Action <Chip>Busy count</Chip>
        </Button>
        <a
          href="#local"
          onClick={(e) => {
            e.preventDefault();
            setActions((n) => n + 1);
          }}
        >
          <Chip>Link count</Chip>
        </a>
        <Chip>Static status</Chip>
        <DataTable
          label="Row actions"
          minWidth={240}
          rows={[{ id: "one" }]}
          rowKey={(r) => r.id}
          columns={[
            {
              key: "status",
              title: "Status",
              render: () => <Chip>Row status</Chip>,
            },
          ]}
          onRow={() => ({
            tabIndex: 0,
            style: { cursor: "pointer" },
            onClick: () => setActions((n) => n + 1),
          })}
        />
        <output aria-label="Choice changes">
          {changes}:{values.join(",")}
        </output>
        <output aria-label="Action changes">{actions}</output>
      </div>
    </KooyaProvider>
  );
}
createRoot(document.getElementById("root")!).render(<Fixture />);
