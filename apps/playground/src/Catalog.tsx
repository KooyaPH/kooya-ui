import { TemplateCatalog } from "./TemplateCatalog";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Download,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Star,
  Trash2,
} from "lucide-react";
import { Table as AntTable, Button as AntButton } from "antd";

import {
  Avatar,
  Button,
  Card,
  Chip,
  DataTable,
  Dialog,
  FilterChip,
  IconButton,
  Menu,
  PageHeading,
  Switch,
  Tabs,
  TextField,
  themes,
  type ThemeName,
} from "@kooyaph/ui";
import { templates, type Account, type Route } from "./data";

interface Props {
  category: string;
  theme: ThemeName;
  accounts: Account[];
  onNotice: (message: string) => void;
  onNavigate: (
    page: Route,
    composition?: (typeof templates)[number]["composition"],
  ) => void;
}
export function Catalog({
  category,
  theme,
  accounts,
  onNotice,
  onNavigate,
}: Props) {
  const [favorite, setFavorite] = useState(false);
  const [filter, setFilter] = useState("All");
  const [saving, setSaving] = useState(false);
  const [exampleTab, setExampleTab] = useState("overview");
  const [query, setQuery] = useState("");
  const title =
    category === "components"
      ? "Components"
      : category[0].toUpperCase() + category.slice(1);
  const save = () => {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      onNotice("Sample saved in this local session.");
    }, 900);
  };
  if (category === "templates")
    return <TemplateCatalog onNavigate={onNavigate} />;

  return (
    <>
      <PageHeading
        eyebrow="KOOYA UI / COMPONENT CATALOG"
        title={title}
        description="Owned components, real interactions, and room for every product theme."
        actions={<Chip tone="accent">{themes[theme].name}</Chip>}
      />
      {(category === "foundations" || category === "components") && (
        <div className="catalog-grid">
          <Card
            title="Buttons & icon spacing"
            description="44px controls. 8px icon gaps. Every action has a purpose."
          >
            <div className="example-row">
              <Button
                variant="primary"
                leadingIcon={<Plus />}
                onClick={() => onNotice("Primary action selected.")}
              >
                Create something
              </Button>
              <Button
                leadingIcon={<Download />}
                onClick={() => {
                  const blob = new Blob(["Kooya UI sample export"], {
                    type: "text/plain",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "kooya-ui-sample.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                  onNotice("Dummy text export downloaded.");
                }}
              >
                Export
              </Button>
              <Button
                variant="ghost"
                trailingIcon={<ArrowUpRight />}
                onClick={() => onNavigate("templates")}
              >
                Templates
              </Button>
            </div>
            <div className="example-row">
              <Button disabled>Unavailable</Button>
              <Button loading={saving} onClick={save} leadingIcon={<Check />}>
                Save sample
              </Button>
              <IconButton
                label={favorite ? "Remove favorite" : "Add favorite"}
                aria-pressed={favorite}
                className={favorite ? "is-favorite" : ""}
                onClick={() => setFavorite(!favorite)}
              >
                <Star />
              </IconButton>
              <Button
                variant="danger"
                leadingIcon={<Trash2 />}
                onClick={() =>
                  onNotice(
                    "This is the destructive button sample; no records were removed.",
                  )
                }
              >
                Remove sample
              </Button>
            </div>
            <div className="example-row">
              <Button
                trailingIcon={<ArrowUpRight />}
                onClick={() =>
                  onNotice("Sample publishing permissions selected.")
                }
              >
                Review workspace publishing permissions
              </Button>
            </div>
            <div className="size-guides">
              <span>Horizontal padding · 16px</span>
              <span>Icon · 18px</span>
              <span>Icon to label · 8px</span>
            </div>
          </Card>
          <Card
            title="Chips & small details"
            description="Status is read-only. Filters are clickable."
          >
            <div className="example-row">
              <Chip icon={<Check />} tone="success">
                Published
              </Chip>
              <Chip tone="warning">In review</Chip>
              <Chip>Draft</Chip>
              <Chip tone="accent" icon={<Star />}>
                Featured
              </Chip>
            </div>
            <div className="example-row">
              {["All", "Published", "Draft"].map((item) => (
                <FilterChip
                  selected={filter === item}
                  key={item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </FilterChip>
              ))}
            </div>
            <p className="sample-caption" role="status">
              Showing the {filter.toLowerCase()} sample selection.
            </p>
            <div className="size-guides">
              <span>Status chip · 28px</span>
              <span>Chip icon gap · 6px</span>
              <span>Filter · 40px / 44px touch</span>
            </div>
          </Card>
          <Card
            title="Semantic theme tokens"
            description="Change the theme above. Geometry and behavior stay coherent."
          >
            <div className="swatch-grid">
              {(
                [
                  "canvas",
                  "surface",
                  "accent",
                  "highlight",
                  "secondary",
                  "tertiary",
                ] as const
              ).map((key) => (
                <div key={key}>
                  <i style={{ background: themes[theme][key] }} />
                  <strong>{key}</strong>
                  <small>{themes[theme][key]}</small>
                </div>
              ))}
            </div>
          </Card>
          <Card
            title="A shared rhythm"
            description="Small controls and big modules use the same spacing scale."
          >
            <div className="spacing-scale">
              {[4, 8, 12, 16, 20, 24, 32].map((space) => (
                <div key={space}>
                  <i style={{ width: space * 3 }} />
                  <span>{space}px</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      {category === "navigation" && (
        <div className="catalog-grid">
          <Card
            title="Area tiles & section tabs"
            description="Arrow keys switch tabs; selected panels remain linked."
          >
            <Tabs
              label="Example workspace areas"
              value={exampleTab}
              onValueChange={setExampleTab}
              options={[
                {
                  value: "overview",
                  label: "Overview",
                  icon: <FileText size={16} />,
                },
                {
                  value: "settings",
                  label: "Settings",
                  icon: <Settings2 size={16} />,
                },
              ]}
            >
              <div className="navigation-example">
                <Chip tone="accent">
                  {exampleTab === "overview"
                    ? "Overview panel"
                    : "Settings panel"}
                </Chip>
                <p>
                  This is the active panel. The rest of the gallery stays
                  available.
                </p>
              </div>
            </Tabs>
          </Card>
          <Card
            title="Menus & action targets"
            description="A 44px trigger, 40px menu rows, arrow navigation, and Escape."
          >
            <div className="example-row">
              <Menu
                label="Example actions"
                trigger={
                  <Button trailingIcon={<MoreHorizontal />}>
                    Workspace actions
                  </Button>
                }
                items={[
                  {
                    label: "Open templates",
                    icon: <FileText />,
                    onSelect: () => onNavigate("templates"),
                  },
                  {
                    label: "Sample settings",
                    icon: <Settings2 />,
                    onSelect: () => onNavigate("settings"),
                  },
                  {
                    label: "Unavailable action",
                    disabled: true,
                    onSelect: () => {},
                  },
                ]}
              />
              <Menu
                label="Compact actions"
                trigger={
                  <IconButton label="Compact actions">
                    <MoreHorizontal />
                  </IconButton>
                }
                items={[
                  {
                    label: "Copy sample label",
                    onSelect: () => {
                      void navigator.clipboard
                        .writeText("Kooya UI")
                        .then(() => onNotice("Sample label copied."))
                        .catch(() =>
                          onNotice("Clipboard is unavailable in this browser."),
                        );
                    },
                  },
                  {
                    label: "View details",
                    onSelect: () =>
                      onNotice("This action menu belongs to Kooya UI."),
                  },
                ]}
              />
            </div>
          </Card>
          <Card
            title="Navigation modules"
            description="The surrounding sidebar and header are library components."
          >
            <p className="sample-caption">
              WorkspaceSidebar uses workspace, navigation, focus, and profile
              cards. WorkspaceHeader uses context, search, focus, notification,
              and account blocks.
            </p>
            <Button
              onClick={() => onNavigate("crm")}
              trailingIcon={<ArrowUpRight />}
            >
              See the complete workspace
            </Button>
          </Card>
        </div>
      )}
      {category === "data" && (
        <div className="data-gallery">
          <Card
            title="Kooya data table"
            description="Ant table semantics, local filtering, and contained scrolling."
            flush
          >
            <div className="table-toolbar">
              <TextField
                label="Filter sample accounts"
                type="search"
                icon={<Search />}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find an organization…"
              />
            </div>
            <DataTable
              label="Component sample accounts"
              rows={accounts.filter((row) =>
                row.name.toLowerCase().includes(query.toLowerCase()),
              )}
              rowKey={(row) => row.id}
              columns={[
                {
                  key: "name",
                  title: "Organization",
                  render: (row) => (
                    <div className="table-person">
                      <Avatar name={row.name} />
                      <strong>{row.name}</strong>
                    </div>
                  ),
                },
                {
                  key: "status",
                  title: "Stage",
                  render: (row) => (
                    <Chip
                      tone={row.status === "Active" ? "success" : "warning"}
                    >
                      {row.status}
                    </Chip>
                  ),
                },
                { key: "owner", title: "Owner", render: (row) => row.owner },
                { key: "value", title: "Value", render: (row) => row.value },
              ]}
            />
          </Card>
          <>
            <Card
              title="Shared Ant Design context"
              description="Additional Ant controls inherit the same KooyaProvider."
              flush
            >
              <div className="ant-sample-table">
                <AntTable
                  pagination={false}
                  size="middle"
                  scroll={{ x: 640 }}
                  rowKey="id"
                  dataSource={accounts.slice(0, 3)}
                  columns={[
                    { title: "Organization", dataIndex: "name" },
                    {
                      title: "Stage",
                      dataIndex: "status",
                      render: (status: string) => (
                        <Chip
                          tone={status === "Active" ? "success" : "warning"}
                        >
                          {status}
                        </Chip>
                      ),
                    },
                    { title: "Owner", dataIndex: "owner" },
                    {
                      title: "Details",
                      render: () => (
                        <AntButton
                          onClick={() =>
                            onNotice(
                              "Ant Design action inside the Kooya theme bridge.",
                            )
                          }
                        >
                          View sample
                        </AntButton>
                      ),
                    },
                  ]}
                />
              </div>
            </Card>
          </>
        </div>
      )}
      {category === "forms" && (
        <div className="catalog-grid">
          <Card
            title="Fields & validation"
            description="Visible labels, readable hints, and clear invalid states."
          >
            <SampleForm onNotice={onNotice} />
          </Card>
          <Card
            title="Switches & disabled states"
            description="The complete label toggles the control."
          >
            <SampleSwitches />
          </Card>
        </div>
      )}
      {category === "overlays" && (
        <div className="catalog-grid">
          <Card
            title="Modal"
            description="Focus stays inside; Escape closes and returns focus."
          >
            <Dialog
              title="A little more detail"
              description="A Kooya modal with the active project theme."
              trigger={
                <Button variant="primary" leadingIcon={<Plus />}>
                  Open modal
                </Button>
              }
            >
              <TextField
                label="Sample note"
                placeholder="Write something useful…"
              />
              <p className="sample-caption">
                The close control and Escape key return you to the trigger.
              </p>
            </Dialog>
          </Card>
          <Card
            title="Drawer"
            description="Use a drawer for details that belong to the current page."
          >
            <Dialog
              kind="drawer"
              title="Sample account details"
              description="All records in this library are fictitious."
              trigger={
                <Button trailingIcon={<ArrowUpRight />}>Open drawer</Button>
              }
            >
              <div className="account-hero">
                <Avatar name="Northstar Health" />
                <h3>Northstar Health</h3>
                <Chip tone="success">Active</Chip>
              </div>
              <dl className="detail-list">
                <div>
                  <dt>Owner</dt>
                  <dd>Maya Chen</dd>
                </div>
                <div>
                  <dt>Value</dt>
                  <dd>$48,200</dd>
                </div>
              </dl>
              <TextField
                label="Relationship note"
                defaultValue="Interested in a clearer customer experience."
              />
            </Dialog>
          </Card>
          <Card
            title="An action menu"
            description="Disabled items have no action; menu rows have clear hover and focus."
          >
            <Menu
              label="Overlay actions"
              trigger={
                <Button trailingIcon={<MoreHorizontal />}>Open menu</Button>
              }
              items={[
                {
                  label: "View sample",
                  icon: <FileText />,
                  onSelect: () => onNotice("Sample action selected."),
                },
                {
                  label: "Unavailable sample",
                  disabled: true,
                  onSelect: () => {},
                },
                {
                  label: "Remove sample",
                  danger: true,
                  icon: <Trash2 />,
                  onSelect: () =>
                    onNotice("Destructive style sample. No data was removed."),
                },
              ]}
            />
          </Card>
        </div>
      )}
    </>
  );
}
function SampleForm({ onNotice }: { onNotice: (message: string) => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  return (
    <form
      className="form-stack"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim()) {
          setError(true);
          return;
        }
        setError(false);
        onNotice("Sample form saved for " + name.trim() + ".");
      }}
    >
      <TextField
        label="Workspace name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setError(false);
        }}
        placeholder="Your next idea"
        hint="A name your team recognizes."
        error={error ? "Enter a workspace name." : undefined}
        required
      />
      <TextField label="Read-only reference" value="KOOYA-DEMO-001" readOnly />
      <TextField
        label="Unavailable field"
        value="Managed by your organization"
        disabled
      />
      <Button type="submit" variant="primary" leadingIcon={<Check />}>
        Save example
      </Button>
    </form>
  );
}
function SampleSwitches() {
  const [checked, setChecked] = useState(true);
  return (
    <>
      <Switch
        label="Publishing updates"
        description="Show sample publishing activity."
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Switch
        label="Managed setting"
        description="This sample is unavailable."
        checked={false}
        onCheckedChange={() => {}}
        disabled
      />
      <p className="sample-caption" role="status">
        Publishing updates are {checked ? "enabled" : "disabled"} in this
        sample.
      </p>
    </>
  );
}
