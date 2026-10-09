import { useState } from "react";
import { Plus, Star } from "lucide-react";
import {
  Avatar,
  Button,
  IconButton,
  Chip,
  FilterChip,
  Checkbox,
  RadioGroup,
  Skeleton,
  Progress,
  Tooltip,
  Input,
  TextArea,
  Select,
  TextField,
  SelectField,
  Switch,
  NumberField,
  DateField,
  Menu,
  Tabs,
  Pagination,
  Breadcrumb,
  RowActions,
  DataTable,
  List,
  Dialog,
  Drawer,
  MetricCard,
  useKooyaFeedback,
} from "@kooyaph/ui";

export const componentGroups = [
  {
    label: "Foundations",
    items: [
      [
        "provider",
        "Provider & themes",
        "One theme context for every surface and overlay.",
      ],
      [
        "tokens",
        "Tokens & rhythm",
        "Semantic colors, typography and a shared 4px rhythm.",
      ],
    ],
  },
  {
    label: "Atoms",
    items: [
      [
        "button",
        "Button & icon button",
        "Clear actions, accessible names and explicit busy states.",
      ],
      [
        "status",
        "Chips & avatars",
        "Distinguish a status from a selectable filter.",
      ],
      [
        "selection",
        "Checkbox & radio",
        "Labelled choices with controlled local state.",
      ],
      [
        "inputs",
        "Input primitives",
        "Compose editable text and searchable choices.",
      ],
      [
        "feedback",
        "Progress & feedback",
        "Explain progress, waiting and contextual help.",
      ],
    ],
  },
  {
    label: "Molecules",
    items: [
      [
        "fields",
        "Labelled fields",
        "Labels, hints, errors, dates and number controls.",
      ],
      [
        "navigation",
        "Tabs & breadcrumbs",
        "Organize related views and preserve keyboard navigation.",
      ],
      [
        "menu",
        "Menus & row actions",
        "Small action lists with native keyboard behavior.",
      ],
      [
        "cards",
        "Cards & metrics",
        "Group a real subject and give its summary context.",
      ],
    ],
  },
  {
    label: "Organisms",
    items: [
      [
        "table",
        "Tables & lists",
        "Structured records with contained overflow.",
      ],
      [
        "overlays",
        "Dialogs & drawers",
        "Focused decisions, adjacent details and nested choices.",
      ],
      [
        "workspace",
        "Workspace shell",
        "Bento header, sidebar and body for application examples.",
      ],
    ],
  },
] as const;
export const componentEntries = componentGroups.flatMap((g) =>
  g.items.map(([id, title, description]) => ({
    id,
    title,
    description,
    category: g.label,
  })),
);
const snippets: Record<string, string> = {
  provider: `import { KooyaProvider, Button, useKooyaFeedback } from '@kooyaph/ui';\nimport '@kooyaph/ui/styles.css';\n\nfunction Actions() {\n  const feedback = useKooyaFeedback();\n  return <Button onClick={() => feedback.message.success('Saved locally')}>Save</Button>;\n}\nexport default function App() {\n  return <KooyaProvider theme="mosaic" mode="light" density="comfortable">\n    <Actions />\n  </KooyaProvider>;\n}`,
  tokens: `import { KooyaProvider, Button } from '@kooyaph/ui';\n\nexport default function Example() {\n  return <KooyaProvider theme="mosaic" composition="mosaic" density="comfortable">\n    <Button variant="primary">Continue</Button>\n  </KooyaProvider>;\n}`,
  button: `import { useState } from 'react';\nimport { Button } from '@kooyaph/ui';\n\nexport default function Example() {\n  const [count, setCount] = useState(0);\n  return <Button variant="primary" onClick={() => setCount(count + 1)}>\n    Created {count} samples\n  </Button>;\n}`,
  status: `import { useState } from 'react';\nimport { Chip, FilterChip, Avatar } from '@kooyaph/ui';\n\nexport default function Example() {\n  const [selected, setSelected] = useState(false);\n  return <>\n    <Chip tone="success">Published</Chip>\n    <FilterChip selected={selected} onClick={() => setSelected(!selected)}>Favorites</FilterChip>\n    <Avatar name="Alex Stone" />\n  </>;\n}`,
  selection: `import { useState } from 'react';\nimport { Checkbox, RadioGroup } from '@kooyaph/ui';\n\nexport default function Example() {\n  const [checked, setChecked] = useState(false);\n  const [delivery, setDelivery] = useState('daily');\n  return <>\n    <Checkbox label="Receive updates" checked={checked} onChange={e => setChecked(e.target.checked)} />\n    <RadioGroup label="Delivery" value={delivery} onChange={e => setDelivery(e.target.value)}\n      options={[{value: 'daily', label: 'Daily'}, {value: 'weekly', label: 'Weekly'}]} />\n  </>;\n}`,
  inputs: `import { useState } from 'react';\nimport { Input, Select } from '@kooyaph/ui';\n\nexport default function Example() {\n  const [name, setName] = useState('');\n  const [team, setTeam] = useState<string>();\n  return <>\n    <label htmlFor="name">Name</label>\n    <Input id="name" value={name} onChange={e => setName(e.target.value)} />\n    <label htmlFor="team">Team</label>\n    <Select id="team" placeholder="Choose a team" value={team} onChange={setTeam}\n      options={[{value: 'design', label: 'Design'}]} />\n  </>;\n}`,
  feedback: `import { useState } from 'react';\nimport { Button, Progress, Tooltip } from '@kooyaph/ui';\n\nexport default function Example() {\n  const [progress, setProgress] = useState(40);\n  return <>\n    <Progress aria-label="Local task progress" percent={progress} />\n    <Tooltip title="Add 20 percent to the local task">\n      <Button disabled={progress === 100} onClick={() => setProgress(Math.min(100, progress + 20))}>Advance task</Button>\n    </Tooltip>\n    <Button onClick={() => setProgress(40)}>Reset progress</Button>\n  </>;\n}`,
  fields: `import { useState } from 'react';\nimport { TextField, DateField, NumberField } from '@kooyaph/ui';\n\nexport default function Example() {\n  const [name, setName] = useState('');\n  const [seats, setSeats] = useState<number | null>(3);\n  return <>\n    <TextField label="Workspace name" value={name} onChange={e => setName(e.target.value)} hint="A name your team recognizes." />\n    <DateField label="Start date" />\n    <NumberField label="Seats" value={seats} min={1} onChange={v => setSeats(v === null ? null : Number(v))} />\n  </>;\n}`,
  navigation: `import { useState } from 'react';\nimport { Tabs } from '@kooyaph/ui';\n\nexport default function Example() {\n  const [tab, setTab] = useState('overview');\n  return <Tabs label="Record views" value={tab} onValueChange={setTab}\n    options={[{value: 'overview', label: 'Overview'}, {value: 'details', label: 'Details'}]}>\n    <p>{tab === 'overview' ? 'Overview content' : 'Details content'}</p>\n  </Tabs>;\n}`,
  menu: `import { useState } from 'react';\nimport { Button, Menu } from '@kooyaph/ui';\n\nexport default function Example() {\n  const [result, setResult] = useState('No action yet');\n  return <>\n    <Menu label="Sample actions" trigger={<Button>Open menu</Button>}\n      items={[{label: 'View sample', onSelect: () => setResult('Sample opened')}]} />\n    <p role="status">{result}</p>\n  </>;\n}`,
  cards: `import { Card, MetricCard } from '@kooyaph/ui';\n\nexport default function Example() {\n  return <Card title="Workspace summary" description="Fictional local records">\n    <MetricCard label="Active records" value="24" detail="Across three sample teams" />\n  </Card>;\n}`,
  table: `import { DataTable } from '@kooyaph/ui';\n\nexport default function Example() {\n  return <DataTable label="Teams" rows={[{id: 'design', name: 'Design'}]}\n    rowKey={row => row.id}\n    columns={[{key: 'name', title: 'Name', render: row => row.name}]} />;\n}`,
  overlays: `import { Button, Dialog, TextField } from '@kooyaph/ui';\n\nexport default function Example() {\n  return <Dialog title="Sample dialog" trigger={<Button>Open dialog</Button>}>\n    <TextField label="Dialog note" />\n  </Dialog>;\n}`,
  workspace: `import { useState } from 'react';
import { BentoShell, WorkspaceSidebar, WorkspaceHeader, Dialog, TextField } from '@kooyaph/ui';

export default function Example() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState(false);
  return <>
    <BentoShell collapsed={collapsed}
      sidebar={<WorkspaceSidebar brand="Kooya" name="Demo workspace" groups={[]} selected="home" collapsed={collapsed} />}
      header={<WorkspaceHeader name="Demo workspace" area="Business" title="Home" collapsed={collapsed}
        onNavigation={() => setCollapsed(!collapsed)} onSearch={() => setSearch(true)} />}>
      <h1>Workspace content</h1>
    </BentoShell>
    <Dialog title="Search workspace" open={search} onOpenChange={setSearch}>
      <TextField label="Search" />
    </Dialog>
  </>;
}`,
};
const api: Record<string, string[][]> = {
  provider: [
    ["theme / mode", "mosaic | signature | canvas | client; light | dark"],
    [
      "density / composition",
      "comfortable | compact; mosaic | orbit | canvas | flow",
    ],
    [
      "branding / fontFamily",
      "Application supplied accent and locally served font",
    ],
  ],
  tokens: [
    ["--ku-canvas / --ku-surface", "Page and module backgrounds"],
    ["--ku-ink / --ku-muted", "Readable primary and supporting text"],
    [
      "--ku-control-border / --ku-focus",
      "Required enabled boundaries and focus cues",
    ],
  ],
  button: [
    ["variant", "primary | secondary | ghost | danger"],
    ["size", "sm | md | lg; default md is at least 44px"],
    ["disabled / loading", "Unavailable / busy; both prevent activation"],
    ["leadingIcon / trailingIcon", "React nodes; IconButton requires label"],
  ],
  status: [
    ["Chip.tone", "neutral | accent | success | warning | danger"],
    ["FilterChip.selected", "Controlled boolean, exposed as aria-pressed"],
    ["Avatar.name", "Accessible identity and fallback initials"],
  ],
  selection: [
    ["label", "Visible associated control label"],
    ["checked / value", "Controlled selection"],
    ["onChange", "Receives native-compatible change event"],
  ],
  inputs: [
    ["id / label", "Associate an external label with each primitive"],
    ["value / onChange", "Application-owned text or selection"],
    ["disabled / readOnly", "Distinct unavailable or noneditable states"],
  ],
  feedback: [
    ["Progress.percent", "Number from 0 to 100"],
    [
      "Progress.aria-label / aria-labelledby",
      "Meaningful accessible name for the task",
    ],
    ["Skeleton", "Placeholder while application data loads"],
    ["Tooltip.title", "Supplemental pointer and keyboard help"],
  ],
  fields: [
    ["label / hint / error", "Visible label and associated guidance/error"],
    ["value / onChange", "Application-owned native-compatible value"],
    [
      "SelectField.onValueChange",
      "Selected string; native event bridge also available",
    ],
    ["NumberField.min / max", "Numeric bounds"],
  ],
  navigation: [
    [
      "Tabs.value / onValueChange",
      "Controlled selected panel; arrow-key navigation",
    ],
    ["Tabs.options", "value, label, optional disabled and icon"],
    ["Pagination.current / total", "Current page and record total"],
  ],
  menu: [
    ["trigger / label", "Accessible owned action that opens the menu"],
    ["items", "label, onSelect, optional disabled, danger, icon"],
    ["RowActions", "Compact labelled menu for an individual record"],
  ],
  cards: [
    ["Card.title / description", "Group heading and supporting context"],
    ["MetricCard.label / value / detail", "Summary with its unit and meaning"],
  ],
  table: [
    [
      "label / rows / rowKey",
      "Accessible table name and stable row identities",
    ],
    ["columns", "key, title and render callback"],
    ["minWidth", "Internal horizontal scrolling, not page overflow"],
  ],
  overlays: [
    ["trigger", "Initiator and focus-return target"],
    ["open / onOpenChange", "Optional controlled visibility"],
    ["title / description / footer", "Label, context and decision actions"],
  ],
  workspace: [
    ["sidebar / header / children", "Three supplied presentational slots"],
    ["--ku-chrome-height", "Consumer sticky header offset; default 0px"],
    ["mainId", "Anchor target; default kooya-main"],
    ["collapsed / focus", "Controlled rail width and contextual visibility"],
  ],
};

function ComponentDemo({ id }: { id: string }) {
  const [count, setCount] = useState(0),
    [selected, setSelected] = useState(false),
    [text, setText] = useState("");
  const [choice, setChoice] = useState<string>(),
    [checked, setChecked] = useState(false),
    [tab, setTab] = useState("overview"),
    [page, setPage] = useState(1);
  const [number, setNumber] = useState<number | null>(3);
  const feedback = useKooyaFeedback();
  if (id === "provider")
    return (
      <div className="demo-actions">
        <Button
          onClick={() =>
            feedback.message.success("Local message from your provider")
          }
        >
          Show message
        </Button>
        <Button
          onClick={() =>
            feedback.notification.success({
              title: "Local notification",
              description: "Inherits the active appearance.",
            })
          }
        >
          Show notification
        </Button>
        <Button
          onClick={() =>
            feedback.modal.confirm({
              title: "Review local action",
              content: "This confirmation inherits the provider.",
            })
          }
        >
          Open confirmation
        </Button>
      </div>
    );
  if (id === "tokens")
    return (
      <>
        <div className="token-swatches">
          {[
            "canvas",
            "surface",
            "subtle",
            "accent",
            "highlight",
            "secondary",
          ].map((token) => (
            <div key={token}>
              <span style={{ background: `var(--ku-${token})` }} />
              <code>{token}</code>
            </div>
          ))}
        </div>
        <p>4px rhythm · 44px primary targets · 8px action icon gap</p>
      </>
    );
  if (id === "button")
    return (
      <>
        <div className="demo-actions">
          <Button
            variant="primary"
            leadingIcon={<Plus />}
            onClick={() => setCount(count + 1)}
          >
            Create sample
          </Button>
          <Button onClick={() => setCount(0)}>Reset count</Button>
          <Button variant="ghost" onClick={() => setCount(count + 1)}>
            Secondary action
          </Button>
          <IconButton
            label="Favorite sample"
            aria-pressed={selected}
            onClick={() => setSelected(!selected)}
          >
            <Star fill={selected ? "currentColor" : "none"} />
          </IconButton>
        </div>
        <div className="demo-actions">
          <Button disabled>Unavailable</Button>
          <Button loading>Saving sample</Button>
          <Button
            variant="danger"
            disabled={count === 0}
            onClick={() => setCount(count - 1)}
          >
            Remove sample
          </Button>
        </div>
        <p role="status">{count} samples created locally.</p>
      </>
    );
  if (id === "status")
    return (
      <>
        <div className="demo-actions">
          <Chip tone="success">Published</Chip>
          <Chip tone="warning">Needs review</Chip>
          <Chip tone="danger">Failed</Chip>
          <Avatar name="Alex Stone" />
        </div>
        <FilterChip selected={selected} onClick={() => setSelected(!selected)}>
          Favorites
        </FilterChip>
        <p role="status">
          {selected ? "Showing favorite samples." : "Showing all samples."}
        </p>
      </>
    );
  if (id === "selection")
    return (
      <div className="demo-fields">
        <Checkbox
          label="Receive updates"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <Checkbox label="Managed preference" checked disabled />
        <RadioGroup
          label="Delivery"
          value={choice || "daily"}
          onChange={(e) => setChoice(e.target.value)}
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
          ]}
        />
        <p role="status">
          Updates {checked ? "enabled" : "disabled"}; delivery{" "}
          {choice || "daily"}.
        </p>
      </div>
    );
  if (id === "inputs")
    return (
      <div className="demo-fields">
        <label htmlFor="primitive-name">Name</label>
        <Input
          id="primitive-name"
          placeholder="Enter a name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label htmlFor="primitive-notes">Notes</label>
        <TextArea id="primitive-notes" rows={3} />
        <label htmlFor="primitive-team">Team</label>
        <Select
          id="primitive-team"
          showSearch
          placeholder="Choose a team"
          value={choice}
          onChange={setChoice}
          options={[
            { value: "design", label: "Design" },
            { value: "content", label: "Content" },
          ]}
        />
      </div>
    );
  if (id === "feedback")
    return (
      <div className="demo-fields">
        <Progress
          aria-label="Local task progress"
          percent={Math.min(100, 40 + count * 20)}
        />
        <Tooltip title="Add 20 percent to this local task">
          <Button disabled={count >= 3} onClick={() => setCount(count + 1)}>
            Advance task
          </Button>
        </Tooltip>
        <Button onClick={() => setCount(0)}>Reset progress</Button>
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    );
  if (id === "fields")
    return (
      <div className="demo-fields">
        <TextField
          label="Workspace name"
          hint="A name your team recognizes."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField label="Reference" error="Enter a reference." />
        <TextField label="Read-only reference" value="DEMO-01" readOnly />
        <SelectField
          label="Country"
          value={choice || "sg"}
          onValueChange={setChoice}
          options={[
            { value: "sg", label: "Singapore" },
            { value: "ph", label: "Philippines" },
          ]}
        />
        <DateField label="Start date" />
        <NumberField
          label="Seats"
          value={number}
          min={1}
          onChange={(v) => setNumber(v === null ? null : Number(v))}
        />
        <Switch
          label="Summaries"
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>
    );
  if (id === "navigation")
    return (
      <>
        <Breadcrumb items={[{ title: "Library" }, { title: "Record" }]} />
        <Tabs
          label="Record views"
          value={tab}
          onValueChange={setTab}
          options={[
            { value: "overview", label: "Overview" },
            { value: "details", label: "Details" },
            { value: "restricted", label: "Restricted", disabled: true },
          ]}
        >
          <p>{tab === "overview" ? "Overview content" : "Details content"}</p>
        </Tabs>
        <Pagination current={page} onChange={setPage} total={30} />
        <p role="status">Page {page}</p>
      </>
    );
  if (id === "menu")
    return (
      <>
        <div className="demo-actions">
          <Menu
            label="Sample actions"
            trigger={<Button>Open menu</Button>}
            items={[
              {
                label: "View sample",
                onSelect: () => setText("Sample opened"),
              },
              {
                label: "Unavailable action",
                disabled: true,
                onSelect: () => {},
              },
            ]}
          />
          <RowActions
            label="Record actions"
            items={[
              {
                label: "Edit sample",
                onSelect: () => setText("Sample ready to edit"),
              },
            ]}
          />
        </div>
        <p role="status">{text || "Choose an action."}</p>
      </>
    );
  if (id === "cards")
    return (
      <MetricCard
        label="Active records"
        value="24"
        detail="Across three fictional teams"
      />
    );
  if (id === "table")
    return (
      <>
        <DataTable
          label="Example teams"
          rows={[
            { id: "design", name: "Design" },
            { id: "content", name: "Content" },
          ]}
          rowKey={(r) => r.id}
          minWidth={320}
          columns={[
            { key: "name", title: "Name", render: (r) => r.name },
            {
              key: "action",
              title: "Action",
              render: (r) => (
                <Button onClick={() => setText(r.name)}>Open {r.name}</Button>
              ),
            },
          ]}
        />
        <p role="status">
          {text ? `${text} selected.` : "Select a team to inspect it."}
        </p>
        <List
          label="Project disciplines"
          items={["Design", "Content"]}
          rowKey={(x) => x}
          itemRender={(x) => <span>{x}</span>}
        />
      </>
    );
  if (id === "overlays")
    return (
      <div className="demo-actions">
        <Dialog title="Sample dialog" trigger={<Button>Open dialog</Button>}>
          <div className="demo-fields">
            <TextField label="Dialog note" />
            <SelectField
              label="Dialog team"
              options={[
                { value: "design", label: "Design" },
                { value: "content", label: "Content" },
              ]}
            />
            <Menu
              label="Dialog actions"
              trigger={<Button>Nested menu</Button>}
              items={[
                {
                  label: "Mark reviewed",
                  onSelect: () => setText("Dialog reviewed"),
                },
              ]}
            />
            <p role="status">{text}</p>
          </div>
        </Dialog>
        <Drawer title="Sample drawer" trigger={<Button>Open drawer</Button>}>
          <TextField label="Drawer note" />
        </Drawer>
      </div>
    );
  return (
    <>
      <p>
        Explore the complete bento shell with real local workflows. Its header
        stays opaque while the document scrolls.
      </p>
      <div className="demo-actions">
        <a className="library-link" href="#/examples/crm">
          Open Console example →
        </a>
        <a className="library-link" href="#/examples/pages">
          Open Business example →
        </a>
      </div>
    </>
  );
}

export function ComponentDocs({ id }: { id: string }) {
  const item = componentEntries.find((x) => x.id === id);
  const [view, setView] = useState("preview");
  if (!item)
    return (
      <>
        <h1>Component not found</h1>
        <a href="#/components">Browse components</a>
      </>
    );
  return (
    <article className="component-document">
      <header className="document-heading">
        <p className="ku-eyebrow">{item.category}</p>
        <h1 tabIndex={-1} data-route-heading>
          {item.title}
        </h1>
        <p>{item.description}</p>
        <code>@kooyaph/ui</code>
      </header>
      <section id="preview" className="docs-section">
        <h2>Interactive example</h2>
        <div className="component-example">
          <Tabs
            label="Example display"
            value={view}
            onValueChange={setView}
            options={[
              { value: "preview", label: "Preview" },
              { value: "code", label: "Code" },
            ]}
          >
            {view === "preview" ? (
              <div className="component-demo">
                <ComponentDemo id={id} />
              </div>
            ) : (
              <pre className="usage-code">
                <code>{snippets[id]}</code>
              </pre>
            )}
          </Tabs>
        </div>
      </section>
      <section id="usage" className="docs-section">
        <h2>Usage</h2>
        <p>
          Render inside one <code>KooyaProvider</code> and import{" "}
          <code>@kooyaph/ui/styles.css</code> once in your application. State
          and persistence belong to your application. These examples only change
          local state.
        </p>
        <pre className="usage-code">
          <code>{snippets[id]}</code>
        </pre>
      </section>
      <section id="api" className="docs-section">
        <h2>Key props</h2>
        <div className="docs-table-wrap">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {api[id]?.map(([name, description]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="docs-section">
        <h2>Interaction guidance</h2>
        <p>
          Use visible labels and meaningful accessible names. Keep unavailable
          actions disabled, announce local results and retain focus when opening
          or closing overlays. Test long labels, keyboard navigation and your
          application's error states.
        </p>
        <a className="library-link" href="#/templates">
          Explore composed templates →
        </a>
      </section>
    </article>
  );
}
