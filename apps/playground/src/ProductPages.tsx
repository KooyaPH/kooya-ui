import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  Columns3,
  FileText,
  Globe,
  HardDrive,
  List,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import {
  Avatar,
  Button,
  Card,
  Chip,
  DataTable,
  Dialog,
  IconButton,
  Menu,
  MetricCard,
  PageHeading,
  Progress,
  SelectField,
  Switch,
  TextField,
  type Composition,
} from "@kooyaph/ui";
import type { Account, ContentPage } from "./data";
const options = (items: string[]) =>
  items.map((value) => ({ value, label: value }));
const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export function CrmPage({
  accounts,
  onChange,
  composition,
  onNotice,
}: {
  accounts: Account[];
  onChange: (rows: Account[]) => void;
  composition: Composition;
  onNotice: (message: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("All stages");
  const [view, setView] = useState("list");
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("Maya Chen");
  const [detailId, setDetailId] = useState<string | null>(null);
  useEffect(
    () => setView(composition === "flow" ? "board" : "list"),
    [composition],
  );
  const visible = accounts.filter(
    (row) =>
      (row.name + " " + row.owner)
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (stage === "All stages" || row.status === stage),
  );
  const total = accounts.reduce(
    (sum, row) => sum + Number(row.value.replace(/[^0-9.]/g, "")),
    0,
  );
  const detail = accounts.find((row) => row.id === detailId);
  const create = () => {
    if (!name.trim()) return;
    onChange([
      ...accounts,
      {
        id: "sample-" + Date.now(),
        name: name.trim(),
        owner,
        status: "Qualified",
        value: "$0",
        type: "Prospect",
      },
    ]);
    setAdding(false);
    setName("");
    setStage("All stages");
    setQuery("");
    onNotice("Organization added to the dummy CRM.");
  };
  return (
    <>
      <PageHeading
        eyebrow="CONSOLE / RELATIONSHIPS"
        title="CRM & accounts"
        description="Good relationships deserve a clear view. Keep yours moving forward."
        actions={
          <Dialog
            title="Add organization"
            description="Create a fictitious record for this local session."
            open={adding}
            onOpenChange={setAdding}
            trigger={
              <Button variant="primary" leadingIcon={<Plus />}>
                Add organization
              </Button>
            }
            footer={
              <>
                <Button onClick={() => setAdding(false)}>Cancel</Button>
                <Button
                  variant="primary"
                  disabled={!name.trim()}
                  onClick={create}
                >
                  Create organization
                </Button>
              </>
            }
          >
            <div className="form-stack">
              <TextField
                label="Organization name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Summit Analytics"
              />
              <SelectField
                label="Account owner"
                value={owner}
                onChange={(event) => setOwner(event.target.value)}
                options={options(["Maya Chen", "Jordan Lee", "Ari Morgan"])}
              />
              <p className="sample-caption">
                New records start in the Qualified stage.
              </p>
            </div>
          </Dialog>
        }
      />
      <div className="metric-grid">
        <MetricCard
          label="Organizations"
          value={String(accounts.length).padStart(2, "0")}
          detail="People you’re building with"
          icon={<UsersRound />}
        />
        <MetricCard
          label="Pipeline value"
          value={money(total)}
          detail="Across your relationships"
          icon={<CircleDollarSign />}
        />
        <MetricCard
          label="Qualified accounts"
          value={String(
            accounts.filter((row) => row.status === "Qualified").length,
          ).padStart(2, "0")}
          detail="Ready for the next conversation"
          icon={<BriefcaseBusiness />}
        />
      </div>
      <div
        className={
          "ku-page-layout " +
          (view === "board" || composition === "orbit" ? "wide-canvas" : "")
        }
      >
        <Card
          title="Your organizations"
          description="All your relationships, with the details that matter."
          flush
        >
          <div className="table-toolbar">
            <TextField
              label="Search CRM records"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search organizations…"
              icon={<Search />}
            />
            <SelectField
              label="CRM stage"
              options={options([
                "All stages",
                "Active",
                "Qualified",
                "Onboarding",
              ])}
              value={stage}
              onChange={(event) => setStage(event.target.value)}
            />
            <div className="view-controls">
              <IconButton
                label="List view"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                <List />
              </IconButton>
              <IconButton
                label="Board view"
                aria-pressed={view === "board"}
                onClick={() => setView("board")}
              >
                <Columns3 />
              </IconButton>
            </div>
            <Menu
              label="Account actions"
              trigger={
                <IconButton label="Account actions">
                  <MoreHorizontal />
                </IconButton>
              }
              items={[
                {
                  label: "Show qualified accounts",
                  onSelect: () => setStage("Qualified"),
                },
                {
                  label: "Clear filters",
                  onSelect: () => {
                    setStage("All stages");
                    setQuery("");
                  },
                },
              ]}
            />
          </div>
          {view === "list" ? (
            <DataTable
              label="CRM organizations"
              rows={visible}
              rowKey={(row) => row.id}
              minWidth={720}
              columns={[
                {
                  key: "name",
                  title: "Organization",
                  render: (row) => (
                    <div className="table-person">
                      <Avatar name={row.name} />
                      <span>
                        <strong>{row.name}</strong>
                        <small>{row.type}</small>
                      </span>
                    </div>
                  ),
                },
                {
                  key: "owner",
                  priority: "secondary",
                  title: "Owner",
                  render: (row) => (
                    <div className="owner-person">
                      <Avatar name={row.owner} />
                      {row.owner}
                    </div>
                  ),
                },
                {
                  key: "status",
                  title: "Stage",
                  render: (row) => (
                    <Chip
                      tone={
                        row.status === "Active"
                          ? "success"
                          : row.status === "Qualified"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {row.status}
                    </Chip>
                  ),
                },
                {
                  key: "value",
                  priority: "secondary",
                  title: "Value",
                  render: (row) => <strong>{row.value}</strong>,
                },
                {
                  key: "details",
                  title: "Details",
                  render: (row) => (
                    <Button
                      size="sm"
                      variant="ghost"
                      trailingIcon={<ArrowUpRight />}
                      onClick={() => setDetailId(row.id)}
                    >
                      View
                    </Button>
                  ),
                },
              ]}
            />
          ) : (
            <div className="pipeline-board">
              {["Qualified", "Onboarding", "Active"].map((status) => (
                <div key={status}>
                  <div className="pipeline-stage">
                    <strong>{status}</strong>
                    <Chip>
                      {visible.filter((row) => row.status === status).length}
                    </Chip>
                  </div>
                  {visible
                    .filter((row) => row.status === status)
                    .map((row) => (
                      <Card key={row.id} className="deal-card">
                        <div className="deal-top">
                          <Avatar name={row.name} />
                          <small>{row.type}</small>
                        </div>
                        <button
                          type="button"
                          className="deal-title"
                          onClick={() => setDetailId(row.id)}
                        >
                          {row.name}
                        </button>
                        <strong className="deal-value">{row.value}</strong>
                        <div className="deal-footer">
                          <Avatar name={row.owner} />
                          <span>{row.owner}</span>
                          <IconButton
                            label={"Open " + row.name}
                            onClick={() => setDetailId(row.id)}
                          >
                            <ArrowUpRight />
                          </IconButton>
                        </div>
                      </Card>
                    ))}
                </div>
              ))}
            </div>
          )}
          <div className="table-footer">
            <span>
              {visible.length} of {accounts.length} organizations
            </span>
            <span>Relationship workspace</span>
          </div>
        </Card>
        <aside className="ku-context-column">
          <Card
            title="Pipeline health"
            description="A little context for your next move."
          >
            <strong className="pipeline-total">{money(total)}</strong>
            <p className="sample-caption">Total opportunity value</p>
            <div className="stacked-meter" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="stage-summary">
              {["Active", "Qualified", "Onboarding"].map((status) => (
                <div key={status}>
                  <span>
                    <i />
                    {status}
                  </span>
                  <strong>
                    {accounts.filter((row) => row.status === status).length}{" "}
                    accounts
                  </strong>
                </div>
              ))}
            </div>
          </Card>
          <Card title="A good next step" className="tinted-card">
            <BriefcaseBusiness size={25} />
            <h3>Make the next conversation count.</h3>
            <p className="sample-caption">
              Your qualified accounts are ready for a follow-up. Start with a
              clear view of the relationship.
            </p>
            <Button
              onClick={() => setStage("Qualified")}
              trailingIcon={<ArrowUpRight />}
            >
              View qualified
            </Button>
          </Card>
        </aside>
      </div>
      <Dialog
        title="Organization details"
        description="A dummy account; edits stay in this session."
        kind="drawer"
        open={Boolean(detail)}
        onOpenChange={(open) => {
          if (!open) setDetailId(null);
        }}
        footer={<Button onClick={() => setDetailId(null)}>Done</Button>}
      >
        {detail && (
          <>
            <div className="account-hero">
              <Avatar name={detail.name} />
              <h3>{detail.name}</h3>
              <Chip tone="accent">{detail.type}</Chip>
            </div>
            <dl className="detail-list">
              <div>
                <dt>Account owner</dt>
                <dd>{detail.owner}</dd>
              </div>
              <div>
                <dt>Opportunity value</dt>
                <dd>{detail.value}</dd>
              </div>
              <div>
                <dt>Last conversation</dt>
                <dd>Yesterday, 2:30 PM</dd>
              </div>
            </dl>
            <SelectField
              label="Relationship stage"
              value={detail.status}
              options={options(["Qualified", "Onboarding", "Active"])}
              onChange={(event) => {
                onChange(
                  accounts.map((row) =>
                    row.id === detail.id
                      ? { ...row, status: event.target.value }
                      : row,
                  ),
                );
                onNotice("Sample relationship stage updated.");
              }}
            />
            <p className="sample-caption">
              Interested in a more thoughtful customer experience. Next step: a
              short proposal and a clear milestone.
            </p>
          </>
        )}
      </Dialog>
    </>
  );
}

export function PagesPage({
  pages,
  onChange,
  composition,
  onNotice,
  onTemplates,
}: {
  pages: ContentPage[];
  onChange: (pages: ContentPage[]) => void;
  composition: Composition;
  onNotice: (message: string) => void;
  onTemplates: () => void;
}) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<ContentPage | null>(null);
  const [title, setTitle] = useState("");
  const [publicOpen, setPublicOpen] = useState(false);
  const visible = pages.filter((page) =>
    page.title.toLowerCase().includes(query.toLowerCase()),
  );
  const edit = (page: ContentPage) => {
    setEditing(page);
    setTitle(page.title);
  };
  const publish = (page: ContentPage) => {
    onChange(
      pages.map((item) =>
        item.id === page.id
          ? {
              ...item,
              status: item.status === "Published" ? "Draft" : "Published",
            }
          : item,
      ),
    );
    onNotice("Publishing state changed in the sample.");
  };
  const contentCards = composition === "canvas";
  const publicView = (
    <div className="public-preview">
      <div className="public-brand">
        <strong>acme</strong>
        <span>About · Services · Contact</span>
      </div>
      <div className="public-art" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="public-copy">
        <p className="ku-eyebrow">A new chapter</p>
        <h3>{pages[0].title}</h3>
        <p>
          Thoughtful ideas. Better conversations. A simpler way to move your
          business forward.
        </p>
        <Button
          variant="primary"
          trailingIcon={<ArrowUpRight />}
          onClick={() => onNotice("Sample public page action selected.")}
        >
          Explore Acme
        </Button>
      </div>
      <div className="public-foot">
        Independent by design. <span>© Acme Studio</span>
      </div>
    </div>
  );
  return (
    <>
      <PageHeading
        eyebrow="BUSINESS / CONTENT STUDIO"
        title="Pages"
        description="Every page, clear and easy to find."
        actions={
          <>
            <Button onClick={onTemplates}>Browse templates</Button>
            <Button
              variant="primary"
              leadingIcon={<Plus />}
              onClick={() => {
                setEditing({
                  id: "page-" + Date.now(),
                  title: "",
                  status: "Draft",
                  type: "Business page",
                  updated: "Just now",
                });
                setTitle("");
              }}
            >
              New page
            </Button>
          </>
        }
      />
      <div className="metric-grid">
        <MetricCard
          label="Total pages"
          value={String(pages.length).padStart(2, "0")}
          detail="Across your workspace"
          icon={<FileText />}
        />
        <MetricCard
          label="Published"
          value={String(
            pages.filter((page) => page.status === "Published").length,
          ).padStart(2, "0")}
          detail="Ready for your audience"
          icon={<Globe />}
        />
        <MetricCard
          label="In review"
          value={String(
            pages.filter((page) => page.status === "In review").length,
          ).padStart(2, "0")}
          detail="A little finishing touch"
          icon={<Check />}
        />
      </div>
      <div className="ku-page-layout">
        <Card
          title="Your content"
          description="Pages, drafts, and the next good idea."
          flush
        >
          <div className="table-toolbar">
            <TextField
              label="Search pages"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              icon={<Search />}
              placeholder="Search pages…"
            />
          </div>
          {contentCards ? (
            <div className="content-grid">
              {visible.map((page) => (
                <Card key={page.id}>
                  <div className="content-top">
                    <FileText size={21} />
                    <Chip
                      tone={
                        page.status === "Published"
                          ? "success"
                          : page.status === "In review"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {page.status}
                    </Chip>
                  </div>
                  <h3>{page.title}</h3>
                  <p className="sample-caption">
                    {page.type} · {page.updated}
                  </p>
                  <div className="example-row">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => edit(page)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => publish(page)}
                    >
                      {page.status === "Published" ? "Unpublish" : "Publish"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <DataTable
              label="CMS pages"
              rows={visible}
              rowKey={(page) => page.id}
              columns={[
                {
                  key: "title",
                  title: "Page",
                  render: (page) => (
                    <div className="table-person">
                      <span className="document-icon">
                        <FileText size={18} />
                      </span>
                      <span>
                        <strong>{page.title}</strong>
                        <small>{page.type}</small>
                      </span>
                    </div>
                  ),
                },
                {
                  key: "status",
                  title: "Status",
                  render: (page) => (
                    <Chip
                      tone={
                        page.status === "Published"
                          ? "success"
                          : page.status === "In review"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {page.status}
                    </Chip>
                  ),
                },
                {
                  key: "updated",
                  priority: "secondary",
                  title: "Updated",
                  render: (page) => page.updated,
                },
                {
                  key: "actions",
                  title: "Actions",
                  render: (page) => (
                    <div className="example-row">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => edit(page)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => publish(page)}
                      >
                        {page.status === "Published" ? "Unpublish" : "Publish"}
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          )}
          <div className="table-footer">
            Showing {visible.length} of {pages.length} pages
          </div>
        </Card>
        <aside className="ku-context-column">
          <Card
            title="The public view"
            actions={
              <Button
                variant="ghost"
                size="sm"
                trailingIcon={<ArrowUpRight />}
                onClick={() => setPublicOpen(true)}
              >
                Open
              </Button>
            }
            flush
          >
            {publicView}
          </Card>
          <Card title="Recently in your workspace" className="tinted-card">
            <div className="activity-list">
              {[
                "Website brief approved",
                "Customer story ready for review",
                "New opportunity assigned",
              ].map((item, i) => (
                <div key={item}>
                  <i />
                  <span>
                    <strong>{item}</strong>
                    <small>Content studio · 09:{42 - i * 7}</small>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
      <Dialog
        title="Edit page"
        description="Change the sample title and keep it in this session."
        open={Boolean(editing)}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
        footer={
          <>
            <Button onClick={() => setEditing(null)}>Cancel</Button>
            <Button
              variant="primary"
              disabled={!title.trim()}
              onClick={() => {
                if (!editing || !title.trim()) return;
                const next = {
                  ...editing,
                  title: title.trim(),
                  updated: "Just now",
                };
                onChange(
                  pages.some((page) => page.id === editing.id)
                    ? pages.map((page) =>
                        page.id === editing.id ? next : page,
                      )
                    : [...pages, next],
                );
                setEditing(null);
                onNotice("Page saved in the dummy content library.");
              }}
            >
              Save changes
            </Button>
          </>
        }
      >
        <TextField
          label="Page title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Give your idea a title"
        />
      </Dialog>
      <Dialog
        title="Public page preview"
        description="A fictitious business page, rendered locally."
        open={publicOpen}
        onOpenChange={setPublicOpen}
      >
        {publicView}
      </Dialog>
    </>
  );
}

export function SettingsPage({
  settings,
  onChange,
  onNotice,
}: {
  settings: import("./data").WorkspaceSettings;
  onChange: (settings: import("./data").WorkspaceSettings) => void;
  onNotice: (message: string) => void;
}) {
  const { name, language, publishing, notifications, publicWebsite } = settings;
  return (
    <>
      <PageHeading
        eyebrow="CONSOLE / MAKE IT YOURS"
        title="Settings"
        description="Good defaults, a little personality, and clear control."
        actions={
          <Button
            variant="primary"
            leadingIcon={<Check />}
            onClick={() => onNotice("Settings saved in this local UI session.")}
          >
            Save settings
          </Button>
        }
      />
      <div className="settings-grid">
        <Card
          title="Workspace & brand"
          description="The shared theme belongs to the product; settings belong to the workspace."
        >
          <div className="brand-row">
            <span className="brand-square">{name.slice(0, 1)}</span>
            <div>
              <strong>{name}</strong>
              <p className="sample-caption">Dummy workspace · Team plan</p>
            </div>
          </div>
          <div className="form-stack">
            <TextField
              label="Workspace name"
              value={name}
              onChange={(event) =>
                onChange({ ...settings, name: event.target.value })
              }
            />
            <SelectField
              label="Default language"
              value={language}
              onChange={(event) =>
                onChange({ ...settings, language: event.target.value })
              }
              options={options(["English", "French", "Filipino"])}
            />
            <TextField
              label="Public website"
              value={publicWebsite}
              onChange={(event) =>
                onChange({ ...settings, publicWebsite: event.target.value })
              }
              hint="This example domain is not contacted."
            />
          </div>
        </Card>
        <div className="form-stack">
          <Card
            title="Publishing"
            description="Shape the sample client experience."
          >
            <Switch
              label="Allow client self-service publishing"
              description="Let clients publish their own sample pages."
              checked={publishing}
              onCheckedChange={(publishing) =>
                onChange({ ...settings, publishing })
              }
            />
            <Switch
              label="Publishing notifications"
              description="Show updates for sample content changes."
              checked={notifications}
              onCheckedChange={(notifications) =>
                onChange({ ...settings, notifications })
              }
            />
          </Card>
          <Card title="A shared component system" className="tinted-card">
            <h3>Your product, your theme.</h3>
            <p className="sample-caption">
              Choose the theme in the toolbar. Components keep their spacing,
              interaction, and accessibility contracts across every project.
            </p>
            <Chip tone="accent">Kooya UI</Chip>
          </Card>
        </div>
      </div>
    </>
  );
}

export function UsagePage() {
  const [period, setPeriod] = useState("30 days");
  const multiplier =
    period === "7 days" ? 0.25 : period === "90 days" ? 2.8 : 1;
  const messages = Math.round(12480 * multiplier);
  const points =
    period === "7 days"
      ? "40,160 130,140 210,152 300,90 390,110 480,45 560,70 650,25"
      : period === "90 days"
        ? "40,170 130,135 210,145 300,95 390,90 480,50 560,55 650,30"
        : "40,160 130,120 210,142 300,100 390,80 480,55 560,35 650,45";
  return (
    <>
      <PageHeading
        eyebrow="CLIENT / YOUR WORKSPACE"
        title="Usage overview"
        description="A clear picture of what your team is using, and what’s ahead."
        actions={
          <SelectField
            label="Usage period"
            options={options(["7 days", "30 days", "90 days"])}
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          />
        }
      />
      <div className="metric-grid">
        <MetricCard
          label="Team messages"
          value={messages.toLocaleString("en-US")}
          detail="Every team conversation, in view"
          icon={<MessageSquare />}
        />
        <MetricCard
          label="Storage (MB)"
          value={Math.round(3180 * multiplier).toLocaleString("en-US")}
          detail="Room for the things you create"
          icon={<HardDrive />}
        />
        <MetricCard
          label="Content views"
          value={Math.round(1060 * multiplier).toLocaleString("en-US")}
          detail="A little attention to your ideas"
          icon={<FileText />}
        />
      </div>
      <div className="ku-page-layout">
        <Card
          title="Workspace activity"
          description={"Sample activity during the last " + period + "."}
        >
          <div className="usage-chart">
            <svg
              viewBox="0 0 690 220"
              role="img"
              aria-label={"Sample workspace activity for " + period}
            >
              <g>
                {[30, 80, 130, 180].map((y) => (
                  <line key={y} x1="40" x2="650" y1={y} y2={y} />
                ))}
              </g>
              <polygon points={"40,180 " + points + " 650,180"} />
              <polyline points={points} />
            </svg>
            <div className="chart-labels">
              <span>Start of period</span>
              <span>Today</span>
            </div>
          </div>
          <div className="activity-summary">
            <span className="legend-dot" />
            {messages.toLocaleString("en-US")} team messages in this period
          </div>
        </Card>
        <aside className="ku-context-column">
          <Card title="Your plan" actions={<Chip tone="accent">TEAM</Chip>}>
            <div className="plan-price">
              <strong>
                $299<small> / month</small>
              </strong>
              <p>A little room for big ideas.</p>
            </div>
            {(
              [
                ["Team messages", 42],
                ["Shared storage", 32],
                ["Content views", 21],
              ] as const
            ).map(([label, value]) => (
              <div className="allowance" key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{value}%</strong>
                </div>
                <Progress
                  className="allowance-progress"
                  aria-label={label}
                  percent={value}
                  showInfo={false}
                />
              </div>
            ))}
            <Dialog
              title="Your workspace plan"
              description="Sample plan details. No subscription changes."
              kind="drawer"
              trigger={
                <Button trailingIcon={<ArrowUpRight />}>Plan details</Button>
              }
            >
              <div className="plan-price">
                <strong>
                  $299<small> / month</small>
                </strong>
                <p>
                  Everything your team needs to build thoughtful experiences.
                </p>
              </div>
              <ul className="plan-features">
                {[
                  "30,000 team messages each month",
                  "10 GB of shared storage",
                  "5,000 content views",
                  "Workspace publishing and client access",
                ].map((feature) => (
                  <li key={feature}>
                    <Check size={17} />
                    {feature}
                  </li>
                ))}
              </ul>
            </Dialog>
          </Card>
          <Card title="Space to grow" className="tinted-card">
            <h3>You’re comfortably within your plan.</h3>
            <p className="sample-caption">
              Your team has room for more conversations and the next thing
              you’re building.
            </p>
          </Card>
        </aside>
      </div>
    </>
  );
}
