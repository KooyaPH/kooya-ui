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
  Card,
  TextField,
  SelectField,
  Switch,
  NumberField,
  DateField,
  PageHeading,
  MetricCard,
  Menu,
  Tabs,
  Pagination,
  Breadcrumb,
  RowActions,
  DataTable,
  List,
  Dialog,
  Drawer,
  useKooyaFeedback,
} from "@kooyaph/ui";
export function AtomicCatalog() {
  const [tab, setTab] = useState("atoms");
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState("a");
  const [number, setNumber] = useState<number | null>(3);
  const [page, setPage] = useState(1);
  const [subtab, setSubtab] = useState("first");
  const [text, setText] = useState("");
  const [selected, setSelected] = useState("a");
  const [filter, setFilter] = useState(false);
  const feedback = useKooyaFeedback();
  const notice = (content: string) => {
    void feedback.message.success(content);
  };
  return (
    <div className="ku-template-stack">
      <PageHeading
        title="Atomic component catalog"
        description="Public package exports, meaningful interactions and visible control states."
      />
      <Tabs
        label="Atomic categories"
        value={tab}
        onValueChange={setTab}
        options={[
          { value: "foundations", label: "Foundations" },
          { value: "atoms", label: "Atoms" },
          { value: "molecules", label: "Molecules" },
          { value: "organisms", label: "Organisms" },
        ]}
      >
        {tab === "foundations" ? (
          <div className="catalog-grid">
            <Card title="Unified provider">
              <p>
                Use theme, composition, density, mode, fontFamily and branding
                on one KooyaProvider. The preview appearance dialog controls
                these values.
              </p>
              <Button
                onClick={() =>
                  notice("Contextual message inherits the active provider.")
                }
              >
                Contextual message
              </Button>
              <Button
                onClick={() =>
                  feedback.notification.success({
                    title: "Local notification",
                    description: "Theme and overlay context are inherited.",
                  })
                }
              >
                Contextual notification
              </Button>
              <Button
                onClick={() =>
                  feedback.modal.confirm({
                    title: "Review local action",
                    content:
                      "This confirmation is inside the unified provider.",
                  })
                }
              >
                Contextual confirmation
              </Button>
            </Card>
            <Card title="Semantic tokens & themes">
              <p>Mosaic · Signature · Canvas · Client</p>
              <p>
                Light and dark mode share semantic tokens. Fonts are bundled
                locally by the application.
              </p>
              <p>4px rhythm · 44px primary targets · 8px icon gap</p>
            </Card>
          </div>
        ) : tab === "atoms" ? (
          <div className="catalog-grid">
            <Card title="Actions and status">
              <div className="ku-template-toolbar">
                <Button
                  variant="primary"
                  leadingIcon={<Plus />}
                  onClick={() => notice("Created a local sample.")}
                >
                  Create sample
                </Button>
                <Button disabled>Disabled</Button>
                <Button loading>Busy</Button>
                <Button
                  variant="danger"
                  onClick={() => notice("Destructive style sample selected.")}
                >
                  Remove sample
                </Button>
                <IconButton
                  label="Favorite sample"
                  aria-pressed={filter}
                  onClick={() => setFilter(!filter)}
                >
                  <Star />
                </IconButton>
                <FilterChip
                  selected={filter}
                  onClick={() => setFilter(!filter)}
                >
                  Favorites
                </FilterChip>
                <Chip tone="success">Published</Chip>
                <Chip tone="danger">Needs attention</Chip>
                <Avatar name="Alex Stone" />
              </div>
            </Card>
            <Card title="Selection and feedback">
              <div className="ku-template-form">
                <Checkbox
                  label="Receive updates"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <Checkbox label="Managed preference" disabled checked />
                <RadioGroup
                  label="Delivery"
                  value={radio}
                  onChange={(e) => setRadio(e.target.value)}
                  options={[
                    { value: "a", label: "Daily" },
                    { value: "b", label: "Weekly" },
                  ]}
                />
                <Progress
                  aria-label="Local task progress"
                  percent={checked ? 75 : 40}
                />
                <Skeleton active paragraph={{ rows: 2 }} />
                <Tooltip title="Keyboard and pointer help">
                  <Button onClick={() => notice("Help action selected.")}>
                    Tooltip trigger
                  </Button>
                </Tooltip>
              </div>
            </Card>
            <Card title="Inputs for composition">
              <div className="ku-template-form">
                <label htmlFor="catalog-input">External input label</label>
                <Input
                  id="catalog-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <label htmlFor="catalog-textarea">
                  External text area label
                </label>
                <TextArea id="catalog-textarea" rows={3} />
                <label htmlFor="catalog-select">External select label</label>
                <Select
                  id="catalog-select"
                  aria-label="External select label"
                  showSearch
                  value={selected}
                  onChange={setSelected}
                  options={[
                    { value: "a", label: "Alpine" },
                    { value: "b", label: "Brook" },
                  ]}
                />
              </div>
            </Card>
          </div>
        ) : tab === "molecules" ? (
          <div className="catalog-grid">
            <Card title="Labelled fields">
              <div className="ku-template-form">
                <TextField
                  label="Workspace name"
                  hint="A recognized team name."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <TextField label="Error example" error="Enter a reference." />
                <TextField
                  label="Read-only reference"
                  readOnly
                  value="DEMO-01"
                />
                <SelectField
                  label="Searchable country"
                  value={selected}
                  onValueChange={setSelected}
                  options={[
                    { value: "a", label: "Singapore" },
                    { value: "b", label: "Philippines" },
                  ]}
                />
                <NumberField
                  label="Seats"
                  value={number}
                  min={1}
                  onChange={(v) => setNumber(v === null ? null : Number(v))}
                />
                <DateField label="Start date" />
                <Switch
                  label="Summaries"
                  checked={checked}
                  onCheckedChange={setChecked}
                />
              </div>
            </Card>
            <Card title="Navigation and row actions">
              <Breadcrumb
                items={[{ title: "Library" }, { title: "Molecules" }]}
              />
              <Tabs
                label="Molecule tabs"
                value={subtab}
                onValueChange={setSubtab}
                options={[
                  { value: "first", label: "Overview" },
                  { value: "second", label: "Details" },
                ]}
              >
                <p>
                  {subtab === "first" ? "Overview content" : "Details content"}
                </p>
              </Tabs>
              <div className="ku-template-toolbar">
                <Menu
                  label="Sample actions"
                  trigger={<Button>Open menu</Button>}
                  items={[
                    {
                      label: "View sample",
                      onSelect: () => notice("Viewed sample."),
                    },
                    { label: "Disabled", disabled: true, onSelect: () => {} },
                  ]}
                />
                <RowActions
                  label="Record actions"
                  items={[
                    {
                      label: "Edit sample",
                      onSelect: () => notice("Edited sample."),
                    },
                  ]}
                />
              </div>
              <Pagination current={page} onChange={setPage} total={30} />
              <p role="status">Page {page}</p>
            </Card>
            <MetricCard
              label="Summary molecule"
              value="24"
              detail="Locally displayed records"
            />
          </div>
        ) : (
          <div className="catalog-grid">
            <Card title="Tables and lists">
              <DataTable<{ id: string; name: string }>
                label="Atomic records"
                rows={[
                  { id: "a", name: "Alpine Studio" },
                  { id: "b", name: "Brook Lab" },
                ]}
                rowKey={(r) => r.id}
                minWidth={320}
                columns={[
                  { key: "name", title: "Name", render: (r) => r.name },
                  {
                    key: "action",
                    title: "Action",
                    render: (r) => (
                      <Button onClick={() => notice("Opened " + r.name)}>
                        Open {r.name}
                      </Button>
                    ),
                  },
                ]}
              />
              <List
                label="Atomic list"
                items={["Design", "Content"]}
                rowKey={(item) => item}
                itemRender={(item) => <span>{item}</span>}
              />
            </Card>
            <Card title="Overlays and workspace organisms">
              <div className="ku-template-toolbar">
                <Dialog
                  title="Sample dialog"
                  trigger={<Button>Open dialog</Button>}
                >
                  <TextField label="Dialog note" />
                </Dialog>
                <Drawer
                  title="Sample drawer"
                  trigger={<Button>Open drawer</Button>}
                >
                  <TextField label="Drawer note" />
                </Drawer>
              </div>
              <p>
                BentoShell, WorkspaceSidebar and WorkspaceHeader form the live
                surrounding workspace. Use its navigation, collapse and focus
                actions to inspect their behavior.
              </p>
            </Card>
          </div>
        )}
      </Tabs>
    </div>
  );
}
