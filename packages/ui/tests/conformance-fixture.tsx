import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  IconButton,
  Avatar,
  Chip,
  Card,
  FilterChip,
  Menu,
  Dialog,
  Popup,
  ChoiceSelect,
  SelectField,
  Tabs,
  TextField,
  Input,
  TextArea,
  Checkbox,
  RadioGroup,
  DateField,
  NumberField,
  KooyaProvider,
  type ThemeName,
  type MenuItem,
  type ChoiceOption,
} from "@kooyaph/ui";
import "@kooyaph/ui/styles.css";

const zones = [
  { value: "America/New_York", label: "America/New_York" },
  { value: "Asia/Singapore", label: "Asia/Singapore UTC +8" },
  { value: "Europe/London", label: "London", disabled: true },
];
const people: ChoiceOption[] = [
  {
    value: "alex",
    label: "Alex Example",
    display: (
      <span>
        <Avatar name="Alex Example" /> Alex Example <small>Design</small>
      </span>
    ),
  },
  {
    value: "sam",
    label: "Sam Example",
    display: (
      <span>
        Sam Example <small>Engineering</small>
      </span>
    ),
  },
  { value: "blocked", label: "Unavailable", disabled: true },
];
function MenuEditor({
  kind,
  conditional,
}: {
  kind: "modal" | "drawer";
  conditional: boolean;
}) {
  const [open, setOpen] = useState(false),
    [selected, setSelected] = useState(0),
    [clicks, setClicks] = useState<string[]>([]);
  const id = `${kind}-${conditional ? "conditional" : "persistent"}`;
  const editor = (
    <Dialog kind={kind} title={id} open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(false)}>Finish {id}</Button>
      <Button
        onClick={() => {
          setOpen(false);
          requestAnimationFrame(() =>
            document.getElementById("explicit-destination")?.focus(),
          );
        }}
      >
        Finish elsewhere {id}
      </Button>
    </Dialog>
  );
  return (
    <section
      onClick={(e) =>
        setClicks((v) => [
          ...v,
          (e.target as HTMLElement).closest("button")?.textContent ?? "item",
        ])
      }
    >
      <Menu
        label={`${id} actions`}
        trigger={<Button>Open {id} actions</Button>}
        items={[
          {
            label: "Edit record",
            onSelect: () => {
              setSelected((n) => n + 1);
              setOpen(true);
            },
          },
        ]}
      />
      <output aria-label={`${id} selections`}>{selected}</output>
      <output aria-label={`${id} clicks`}>{JSON.stringify(clicks)}</output>
      {(!conditional || open) && editor}
    </section>
  );
}
function KeyboardChoices() {
  const [retried, setRetried] = useState(false);
  const [created, setCreated] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <section aria-label="Keyboard choice actions">
      <ChoiceSelect
        label="Keyboard retry"
        options={retried ? [{ value: "ready-id", label: "Ready result" }] : []}
        value={value}
        onValueChange={setValue}
        error={
          !retried && (
            <span>
              Keyboard request failed{" "}
              <Button onClick={() => setRetried(true)}>
                Retry keyboard choices
              </Button>
            </span>
          )
        }
      />
      <ChoiceSelect
        label="Keyboard empty"
        options={[]}
        value={value}
        onValueChange={setValue}
        emptyContent="No matching projects"
        footer={
          <Button onClick={() => setCreated("empty-created")}>
            Create empty project
          </Button>
        }
      />
      <ChoiceSelect
        label="Keyboard results"
        options={[{ value: "existing-id", label: "Existing project" }]}
        value={value}
        onValueChange={setValue}
        open={open}
        onOpenChange={setOpen}
        footer={
          <Button onClick={() => setCreated("result-created")}>
            Create another project
          </Button>
        }
      />
      <output aria-label="Keyboard created">{created}</output>
      <output aria-label="Keyboard selected">{value}</output>
      <output aria-label="Keyboard retried">{String(retried)}</output>
      <output aria-label="Keyboard open">{String(open)}</output>
    </section>
  );
}
function Fixture() {
  const params = new URLSearchParams(location.search);
  const [nested, setNested] = useState(false),
    [menuCount, setMenuCount] = useState(0),
    [closeCount, setCloseCount] = useState(0),
    [choice, setChoice] = useState("sam"),
    [search, setSearch] = useState(""),
    [many, setMany] = useState<string[]>([]),
    [tab, setTab] = useState("one"),
    [popup, setPopup] = useState(false),
    [selected, setSelected] = useState("Asia/Singapore"),
    [dynamic, setDynamic] = useState(false),
    [state, setState] = useState("ready"),
    [shown, setShown] = useState(true),
    [events, setEvents] = useState<boolean[]>([]);
  const items: MenuItem[] = [
    { label: "Disabled", disabled: true, onSelect: () => setMenuCount(-999) },
    { label: "Archive", onSelect: () => setMenuCount((n) => n + 1) },
    {
      label: "Mute",
      children: [
        { label: "For 8 hours", onSelect: () => setMenuCount((n) => n + 1) },
        {
          label: "Not allowed",
          disabled: true,
          onSelect: () => setMenuCount(-999),
        },
        { type: "divider" },
        { label: "For 1 week", onSelect: () => setMenuCount((n) => n + 1) },
        { label: "Always", onSelect: () => setMenuCount((n) => n + 1) },
      ],
    },
    { type: "divider" },
    {
      label: "Delete",
      danger: true,
      onSelect: () => setMenuCount((n) => n + 1),
    },
  ];
  return (
    <KooyaProvider
      reducedMotion
      theme={(params.get("theme") ?? "mosaic") as ThemeName}
      mode={params.get("mode") === "dark" ? "dark" : "light"}
      density={params.get("density") === "compact" ? "compact" : "comfortable"}
      fontFamily="Arial"
      style={{ padding: 16 }}
    >
      <h1>Public conformance fixture</h1>
      <Card title="Required control cues">
        <div
          aria-label="Required control cues"
          style={{ display: "grid", gap: 16 }}
        >
          <Input aria-label="Cue input" />
          <Input
            aria-label="Cue affix input"
            prefix={<span aria-hidden>@</span>}
          />
          <TextField label="Cue text field" />
          <TextArea aria-label="Cue textarea" />
          <SelectField
            label="Cue select"
            options={[{ value: "one", label: "One" }]}
            value=""
          />
          <ChoiceSelect
            label="Cue choice"
            options={[]}
            onValueChange={() => {}}
          />
          <DateField label="Cue date" />
          <NumberField label="Cue number" />
          <Checkbox label="Cue checkbox" />
          <RadioGroup
            label="Cue radio group"
            options={[{ value: "one", label: "Cue radio" }]}
          />
          <Input aria-label="Cue disabled input" disabled />
          <Checkbox label="Cue disabled checkbox" disabled />
        </div>
      </Card>
      <KeyboardChoices />
      <Button id="explicit-destination">Explicit destination</Button>
      <Card title="Chip geometry">
        <div
          aria-label="Chip gallery"
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          {(["neutral", "success", "warning", "danger", "accent"] as const).map(
            (tone) => (
              <React.Fragment key={tone}>
                <Chip tone={tone}>{tone}</Chip>
                <Chip
                  tone={tone}
                  icon={
                    <svg viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="5" fill="currentColor" />
                    </svg>
                  }
                >
                  {tone} with icon
                </Chip>
              </React.Fragment>
            ),
          )}
          <Chip icon={<span>✓</span>}>
            A deliberately long status label that can wrap across a narrow
            container without overflowing its card
          </Chip>
        </div>
        <div className="chip-override">
          <Chip>Consumer override</Chip>
        </div>
      </Card>
      <style>{`.ku-root .chip-override .ku-chip { padding-inline:12px; gap:8px; } section{margin-block:16px} .controls{display:flex;gap:8px;flex-wrap:wrap} body{margin:0}`}</style>
      <div className="controls">
        <Button>Enabled</Button>
        <Button disabled>Disabled action</Button>
        <Button loading>Working</Button>
        <IconButton label="Workspace actions">
          <Avatar name="Alex Sample" />
        </IconButton>
        <FilterChip>Filter</FilterChip>
      </div>
      <section>
        <Button onClick={() => setNested((v) => !v)}>
          Toggle external menu
        </Button>
        <Menu
          label="Conversation actions"
          open={nested}
          onOpenChange={(v) => {
            setNested(v);
            setEvents((e) => [...e, v]);
          }}
          onClose={() => setCloseCount((n) => n + 1)}
          trigger={<Button>Conversation actions</Button>}
          items={items}
        />
        <output aria-label="Menu selections">{menuCount}</output>
        <output aria-label="Menu close requests">{closeCount}</output>
        <output aria-label="Menu changes">{JSON.stringify(events)}</output>
      </section>
      <section>
        <Button onClick={() => setShown((v) => !v)}>
          Toggle conditional menu
        </Button>
        {shown && (
          <Menu
            label="Conditional actions"
            trigger={<Button>Conditional actions</Button>}
            items={[{ label: "Unmount menu", onSelect: () => setShown(false) }]}
          />
        )}
      </section>
      {(["modal", "drawer"] as const).flatMap((kind) =>
        [false, true].map((conditional) => (
          <MenuEditor
            key={`${kind}-${conditional}`}
            kind={kind}
            conditional={conditional}
          />
        )),
      )}
      <section>
        <SelectField
          label="Timezone"
          name="timezone"
          value={selected}
          options={
            dynamic
              ? [...zones, { value: "Asia/Tokyo", label: "Tokyo" }]
              : zones
          }
          onValueChange={setSelected}
          filterOption={(query, option) =>
            option.value
              .toLowerCase()
              .replaceAll("_", " ")
              .includes(query.toLowerCase()) ||
            (option.value === "Asia/Singapore" && query === "+08:00")
          }
        />
        <output aria-label="Timezone value">{selected}</output>
        <Button onClick={() => setDynamic(true)}>Add Tokyo</Button>
        <SelectField label="Default search" options={zones} />
      </section>
      <section>
        <ChoiceSelect
          label="Assignee"
          options={people}
          value={choice}
          onValueChange={setChoice}
        />
        <output aria-label="Assignee value">{choice}</output>
        <ChoiceSelect
          label="Projects"
          multiple
          options={people}
          value={many}
          onValueChange={setMany}
        />
        <output aria-label="Projects value">{many.join(",")}</output>
        <ChoiceSelect
          label="Remote tickets"
          options={
            state === "empty"
              ? []
              : people.filter((p) =>
                  p.label.toLowerCase().includes(search.toLowerCase()),
                )
          }
          filterOption={false}
          searchValue={search}
          onSearch={setSearch}
          value={choice}
          onValueChange={setChoice}
          loading={state === "pending"}
          error={
            state === "error" ? (
              <span>
                Search failed{" "}
                <Button onClick={() => setState("ready")}>Retry choices</Button>
              </span>
            ) : undefined
          }
          emptyContent="No matching tickets"
        />
        <Button onClick={() => setState("pending")}>Pending choices</Button>
        <Button onClick={() => setState("error")}>Failed choices</Button>
        <Button onClick={() => setState("empty")}>Empty choices</Button>
        <Button onClick={() => setState("ready")}>Ready choices</Button>
      </section>
      <section>
        <Popup
          label="Board filters"
          open={popup}
          onOpenChange={setPopup}
          trigger={<Button>Board filters</Button>}
        >
          <TextField label="Filter name" />
          <ChoiceSelect
            label="Filter choices"
            multiple
            options={people}
            value={many}
            onValueChange={setMany}
          />
          <Button onClick={() => setPopup(false)}>Apply filters</Button>
        </Popup>
      </section>
      <Dialog
        title="Parent editor"
        trigger={<Button>Open parent editor</Button>}
      >
        <Popup label="Nested editor" trigger={<Button>Nested editor</Button>}>
          <TextField label="Nested note" />
          <ChoiceSelect
            label="Nested assignee"
            options={people}
            value={choice}
            onValueChange={setChoice}
            footer={
              <Button onClick={() => setChoice("nested-created")}>
                Create nested assignee
              </Button>
            }
          />
          <Menu
            label="Nested actions"
            trigger={<Button>Nested actions</Button>}
            items={items}
          />
        </Popup>
      </Dialog>
      <Tabs
        label="Every section"
        value={tab}
        onValueChange={setTab}
        options={[
          { value: "one", label: "First section" },
          { value: "disabled", label: "Unavailable section", disabled: true },
          { value: "two", label: "Second long section" },
          { value: "three", label: "Third long section" },
          { value: "four", label: "Fourth long section" },
          { value: "five", label: "Final long section" },
        ]}
      >
        <p>{tab} panel content</p>
      </Tabs>
    </KooyaProvider>
  );
}
createRoot(document.getElementById("root")!).render(<Fixture />);
