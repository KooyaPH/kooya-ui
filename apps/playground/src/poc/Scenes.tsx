import { useState } from "react";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Divider,
  Drawer,
  Empty,
  Form,
  Input,
  Modal,
  Progress,
  Radio,
  Select,
  Skeleton,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  App,
} from "antd";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Plus,
  Search,
  MoreHorizontal,
  Check,
  FileText,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";
import { useDemo, type ContentRecord, type Person } from "./state";
import type { LayoutId, SceneId } from "./model";
export function Status({ value }: { value: string }) {
  const color = ["Published", "Done", "Active"].includes(value)
    ? "success"
    : ["In review", "In progress", "Pending"].includes(value)
      ? "processing"
      : value === "High"
        ? "warning"
        : "default";
  return <Tag color={color}>{value}</Tag>;
}
export function Heading({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="poc-page-heading">
      <div>
        <div className="poc-eyebrow">{eyebrow}</div>
        <h1 tabIndex={-1}>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="poc-heading-actions">{actions}</div>
    </div>
  );
}
export function Panel({
  title,
  children,
  extra,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={"poc-panel " + className}>
      {title && (
        <div className="poc-panel-heading">
          <h2>{title}</h2>
          {extra}
        </div>
      )}
      {children}
    </section>
  );
}
function Export({ rows, name }: { rows: unknown[]; name: string }) {
  const { message } = App.useApp();
  return (
    <Button
      icon={<ArrowDownToLine size={15} />}
      onClick={() => {
        const blob = new Blob([JSON.stringify(rows, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name + ".json";
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        message.success("Sample export downloaded");
      }}
    >
      Export
    </Button>
  );
}
export function Dashboard() {
  const data = useDemo();
  const [period, setPeriod] = useState("Last 30 days");
  const [activity, setActivity] = useState(false);
  const multiplier =
    period === "Last 7 days" ? 0.36 : period === "Last 90 days" ? 2.4 : 1;
  const bars = [
    38, 54, 46, 72, 59, 82, 68, 91, 78, 102, 88, 117, 96, 129, 112, 136, 119,
    145, 128, 156, 141, 169, 148, 177,
  ];
  return (
    <>
      <Heading
        eyebrow="WORKSPACE / OVERVIEW"
        title="A little perspective."
        description="Your team’s progress, in one considered view."
        actions={
          <>
            <Select
              aria-label="Dashboard period"
              value={period}
              onChange={setPeriod}
              options={["Last 7 days", "Last 30 days", "Last 90 days"].map(
                (value) => ({ value, label: value }),
              )}
            />
            <Export rows={data.content} name="workspace-overview" />
          </>
        }
      />
      <div className="poc-metrics">
        {[
          {
            label: "Total views",
            value: Math.round(24860 * multiplier).toLocaleString(),
            change: "+12.8%",
            note: "vs. previous period",
          },
          {
            label: "Published pages",
            value: String(
              data.content.filter((x) => x.status === "Published").length,
            ).padStart(2, "0"),
            change: "+2",
            note: "ready for your audience",
          },
          {
            label: "Work in progress",
            value: String(
              data.tasks.filter((x) => x.status !== "Done").length,
            ).padStart(2, "0"),
            change: "On track",
            note: "across the workspace",
          },
          {
            label: "Team members",
            value: String(data.people.length).padStart(2, "0"),
            change: "Connected",
            note: "working together",
          },
        ].map((m) => (
          <Panel key={m.label}>
            <span className="poc-metric-label">{m.label}</span>
            <div className="poc-metric-value">
              {m.value}
              <ArrowUpRight size={19} />
            </div>
            <span className="poc-metric-change">{m.change}</span>
            <small> {m.note}</small>
          </Panel>
        ))}
      </div>
      <div className="poc-dashboard-grid">
        <Panel
          title="Audience, over time"
          extra={<span className="poc-muted">{period}</span>}
        >
          <div className="poc-chart-summary">
            <strong>{Math.round(24860 * multiplier).toLocaleString()}</strong>
            <span>Total page views</span>
            <Tag color="success">↗ 12.8%</Tag>
          </div>
          <div
            className="poc-chart"
            role="img"
            aria-label={`Page views increasing across ${period.toLowerCase()}`}
          >
            <div className="poc-chart-axis">
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>
            <div className="poc-chart-bars">
              {bars.map((height, i) => (
                <Tooltip
                  key={i}
                  title={`${Math.round(height * multiplier * 10)} views`}
                >
                  <div
                    style={{
                      height:
                        height * (period === "Last 7 days" ? 0.8 : 1) + "px",
                      opacity: i > 17 ? 1 : 0.38,
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="poc-chart-labels">
            <span>Sep 15</span>
            <span>Sep 22</span>
            <span>Sep 29</span>
            <span>Oct 6</span>
            <span>Oct 15</span>
          </div>
        </Panel>
        <Panel title="A productive week" extra={<Tag>THIS WEEK</Tag>}>
          <div className="poc-ring">
            <Progress
              type="circle"
              percent={Math.round(
                (data.tasks.filter((x) => x.status === "Done").length /
                  data.tasks.length) *
                  100,
              )}
              size={132}
              strokeColor="var(--ku-accent)"
            />
            <div>
              <h3>Good things take shape.</h3>
              <p>
                {data.tasks.filter((x) => x.status === "Done").length} of{" "}
                {data.tasks.length} tasks complete.
                <br />
                Keep a little momentum going.
              </p>
            </div>
          </div>
          <Divider />
          <Button
            block
            onClick={() => {
              location.hash = location.hash.replace("/dashboard", "/work");
            }}
          >
            See the work queue <ArrowRight size={14} />
          </Button>
        </Panel>
      </div>
      <Panel
        title="Recent activity"
        extra={
          <Button type="text" onClick={() => setActivity(true)}>
            View timeline <ArrowRight size={14} />
          </Button>
        }
      >
        <div className="poc-activity-list">
          {data.content.slice(0, 3).map((row, i) => (
            <div key={row.key}>
              <Avatar
                style={{
                  background: "var(--ku-subtle)",
                  color: "var(--ku-accent)",
                }}
              >
                {row.owner
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </Avatar>
              <div>
                <strong>{row.owner}</strong>
                <p>
                  {i === 0 ? "Published" : "Updated"} <span>{row.title}</span>
                </p>
              </div>
              <span className="poc-muted">{i + 1}h ago</span>
            </div>
          ))}
        </div>
      </Panel>
      <Drawer
        title="Workspace timeline"
        open={activity}
        onClose={() => setActivity(false)}
      >
        {data.content.map((x) => (
          <div className="poc-timeline-item" key={x.key}>
            <Status value={x.status} />
            <h3>{x.title}</h3>
            <p>
              {x.owner} · {x.updated}
            </p>
          </div>
        ))}
      </Drawer>
    </>
  );
}
export function CMS() {
  const {
    content,
    setContent,
    contentFilter: status,
    setContentFilter: setStatus,
  } = useDemo();
  const { message } = App.useApp();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<ContentRecord | null>(null);
  const [preview, setPreview] = useState<ContentRecord | null>(null);
  const [selected, setSelected] = useState<React.Key[]>([]);
  const [busy, setBusy] = useState(false);
  const [form] = Form.useForm();
  const rows = content.filter(
    (x) =>
      (status === "All content" || x.status === status) &&
      `${x.title} ${x.owner}`.toLowerCase().includes(query.toLowerCase()),
  );
  function edit(row?: ContentRecord) {
    const target = row ?? {
      key: "new",
      title: "",
      body: "",
      type: "Article",
      status: "Draft",
      owner: "Alex Morgan",
      updated: "Today",
    };
    setEditing(target);
    form.setFieldsValue(target);
  }
  async function save() {
    const values = await form.validateFields();
    setBusy(true);
    setTimeout(() => {
      setContent((old) =>
        editing?.key === "new"
          ? [
              {
                ...values,
                key: crypto.randomUUID(),
                updated: "Today",
                owner: "Alex Morgan",
              },
              ...old,
            ]
          : old.map((x) =>
              x.key === editing?.key
                ? { ...x, ...values, updated: "Today" }
                : x,
            ),
      );
      setBusy(false);
      setEditing(null);
      message.success("Content saved in this demo");
    }, 400);
  }
  return (
    <>
      <Heading
        eyebrow="WORKSPACE / CONTENT"
        title="Content, with purpose."
        description="A home for the stories, pages, and ideas you share."
        actions={
          <>
            <Export rows={rows} name="content" />
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => edit()}
            >
              Create page
            </Button>
          </>
        }
      />
      <Panel>
        <div className="poc-data-toolbar">
          <Tabs
            aria-label="Content status"
            activeKey={status.replace(/\s+/g, "-")}
            onChange={(key) => setStatus(key.replace(/-/g, " "))}
            items={["All content", "Published", "Draft", "In review"].map(
              (key) => ({
                key: key.replace(/\s+/g, "-"),
                label: (
                  <span>
                    {key}{" "}
                    <small>
                      {key === "All content"
                        ? content.length
                        : content.filter((x) => x.status === key).length}
                    </small>
                  </span>
                ),
              }),
            )}
          />
          <Input
            aria-label="Search content"
            prefix={<Search size={15} />}
            placeholder="Search content…"
            allowClear
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {selected.length > 0 && (
          <div className="poc-bulk">
            <span>{selected.length} selected</span>
            <Button
              size="small"
              onClick={() => {
                setContent((old) =>
                  old.map((x) =>
                    selected.includes(x.key)
                      ? { ...x, status: "Published" }
                      : x,
                  ),
                );
                setSelected([]);
                message.success("Selected sample pages published");
              }}
            >
              Publish selected
            </Button>
            <Button size="small" onClick={() => setSelected([])}>
              Clear selection
            </Button>
          </div>
        )}
        <div
          className="poc-table-scroll"
          role="region"
          aria-label="Content records"
          tabIndex={0}
        >
          <Table
            rowSelection={{ selectedRowKeys: selected, onChange: setSelected }}
            dataSource={rows}
            pagination={{ pageSize: 5, showSizeChanger: false }}
            locale={{
              emptyText: <Empty description="No pages match your search" />,
            }}
            columns={[
              {
                title: "Page title",
                dataIndex: "title",
                sorter: (a: ContentRecord, b: ContentRecord) =>
                  a.title.localeCompare(b.title),
                render: (value: string, row: ContentRecord) => (
                  <div className="poc-record-title">
                    <span className="poc-file-icon">
                      <FileText size={17} />
                    </span>
                    <button
                      className="poc-text-action"
                      onClick={() => edit(row)}
                    >
                      {value}
                    </button>
                  </div>
                ),
              },
              {
                title: "Status",
                dataIndex: "status",
                render: (value: string) => <Status value={value} />,
              },
              { title: "Type", dataIndex: "type", responsive: ["lg"] },
              { title: "Author", dataIndex: "owner", responsive: ["md"] },
              { title: "Updated", dataIndex: "updated", responsive: ["lg"] },
              {
                title: <span className="sr-only">Actions</span>,
                key: "actions",
                render: (_: unknown, row: ContentRecord) => (
                  <Tooltip title="Preview page">
                    <Button
                      type="text"
                      aria-label={`Preview ${row.title}`}
                      icon={<ArrowUpRight size={17} />}
                      onClick={() => setPreview(row)}
                    />
                  </Tooltip>
                ),
              },
            ]}
          />
        </div>
        <div className="poc-panel-footnote">
          A thoughtful process. From first draft to published page.
        </div>
      </Panel>
      <Drawer
        title={editing?.key === "new" ? "Create a page" : "Edit page"}
        open={!!editing}
        onClose={() => !busy && setEditing(null)}
        size={560}
        extra={
          <Button
            type="primary"
            loading={busy}
            onClick={() => void save().catch(() => {})}
          >
            Save page
          </Button>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Page title"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Enter a page title",
              },
            ]}
          >
            <Input placeholder="Give your idea a title" />
          </Form.Item>
          <Form.Item name="type" label="Content type">
            <Select
              options={[
                "Article",
                "Landing page",
                "Case study",
                "Guide",
                "Company page",
              ].map((value) => ({ value, label: value }))}
            />
          </Form.Item>
          <Form.Item name="status" label="Publishing status">
            <Select
              options={["Draft", "In review", "Published"].map((value) => ({
                value,
                label: value,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="body"
            label="Content"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Add some content before saving",
              },
            ]}
          >
            <Input.TextArea rows={12} />
          </Form.Item>
          <Alert
            type="info"
            title="Your sample workspace"
            description="Changes stay in this demo session."
          />
        </Form>
      </Drawer>
      <Modal
        title="Page preview"
        open={!!preview}
        onCancel={() => setPreview(null)}
        footer={<Button onClick={() => setPreview(null)}>Close preview</Button>}
      >
        <article className="poc-article">
          <div className="poc-eyebrow">{preview?.type}</div>
          <h2>{preview?.title}</h2>
          <p>{preview?.body}</p>
          <small>
            {preview?.owner} · {preview?.updated}
          </small>
        </article>
      </Modal>
    </>
  );
}
export function Work({ layout }: { layout: LayoutId }) {
  const { tasks, setTasks, people } = useDemo();
  const { message } = App.useApp();
  const [view, setView] = useState(layout === "delivery" ? "board" : "list");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const rows = tasks.filter((x) =>
    x.title.toLowerCase().includes(query.toLowerCase()),
  );
  const statuses = ["To do", "In progress", "Done"];
  const change = (key: string, field: string, value: string) =>
    setTasks((old) =>
      old.map((x) => (x.key === key ? { ...x, [field]: value } : x)),
    );
  return (
    <>
      <Heading
        eyebrow="WORKSPACE / PROJECTS"
        title="Make room for progress."
        description="Clear priorities. Shared ownership. A little momentum."
        actions={
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={() => {
              form.resetFields();
              setOpen(true);
            }}
          >
            Create task
          </Button>
        }
      />
      <Panel>
        <div className="poc-toolbar">
          <Radio.Group
            aria-label="Task view"
            value={view}
            onChange={(e) => setView(e.target.value)}
            optionType="button"
            options={[
              { value: "list", label: "List view" },
              { value: "board", label: "Board view" },
            ]}
          />
          <Input
            aria-label="Search tasks"
            prefix={<Search size={15} />}
            placeholder="Search tasks…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {view === "list" ? (
          <div
            className="poc-table-scroll"
            role="region"
            aria-label="Task records"
            tabIndex={0}
          >
            <Table
              dataSource={rows}
              pagination={false}
              columns={[
                {
                  title: "Task",
                  dataIndex: "title",
                  render: (value: string, row: any) => (
                    <div>
                      <small className="poc-muted">{row.key}</small>
                      <div className="poc-task-title">{value}</div>
                    </div>
                  ),
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  render: (value: string, row: any) => (
                    <Select
                      aria-label={`Status for ${row.title}`}
                      value={value}
                      onChange={(value) => change(row.key, "status", value)}
                      options={statuses.map((value) => ({
                        value,
                        label: value,
                      }))}
                    />
                  ),
                },
                {
                  title: "Priority",
                  dataIndex: "priority",
                  responsive: ["md"],
                  render: (value: string) => <Status value={value} />,
                },
                {
                  title: "Assignee",
                  dataIndex: "owner",
                  responsive: ["lg"],
                  render: (value: string, row: any) => (
                    <Select
                      aria-label={`Assignee for ${row.title}`}
                      showSearch
                      value={value}
                      onChange={(value) => change(row.key, "owner", value)}
                      options={people.map((x) => ({
                        value: x.name,
                        label: x.name,
                      }))}
                    />
                  ),
                },
              ]}
            />
          </div>
        ) : (
          <div className="poc-board">
            {statuses.map((status) => (
              <section key={status}>
                <h3>
                  <i
                    className={"poc-status-dot " + status.replaceAll(" ", "-")}
                  />
                  {status}
                  <span>{rows.filter((x) => x.status === status).length}</span>
                </h3>
                {rows
                  .filter((x) => x.status === status)
                  .map((task) => (
                    <article className="poc-task-card" key={task.key}>
                      <div>
                        <small>{task.key}</small>
                        <Status value={task.priority} />
                      </div>
                      <h4>{task.title}</h4>
                      <div>
                        <Avatar size="small">
                          {task.owner
                            .split(" ")
                            .map((x) => x[0])
                            .join("")}
                        </Avatar>
                        <span>{task.owner}</span>
                      </div>
                      <Select
                        aria-label={`Move ${task.title}`}
                        value={task.status}
                        onChange={(value) => change(task.key, "status", value)}
                        options={statuses.map((value) => ({
                          value,
                          label: value,
                        }))}
                      />
                    </article>
                  ))}
              </section>
            ))}
          </div>
        )}
      </Panel>
      <Modal
        title="Create a task"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          void form
            .validateFields()
            .then((values) => {
              setTasks((old) => [
                {
                  key: "KOO-" + (147 + old.length),
                  status: "To do",
                  owner: "Alex Morgan",
                  ...values,
                },
                ...old,
              ]);
              setOpen(false);
              message.success("Task added to the sample queue");
            })
            .catch(() => {});
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ priority: "Medium" }}
        >
          <Form.Item
            label="Task title"
            name="title"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Enter a task title",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select
              options={["High", "Medium", "Low"].map((value) => ({
                value,
                label: value,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export function People() {
  const { people, setPeople } = useDemo();
  const { message } = App.useApp();
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState<Person | null>(null);
  const [invite, setInvite] = useState(false);
  const [form] = Form.useForm();
  return (
    <>
      <Heading
        eyebrow="WORKSPACE / TEAM"
        title="Good people. Shared purpose."
        description="The people bringing your workspace to life."
        actions={
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={() => {
              form.resetFields();
              setInvite(true);
            }}
          >
            Invite a person
          </Button>
        }
      />
      <Panel>
        <div className="poc-toolbar">
          <span>{people.length} people in your workspace</span>
          <Input
            aria-label="Search people"
            prefix={<Search size={15} />}
            placeholder="Find a person…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="poc-people-grid">
          {people
            .filter((x) =>
              `${x.name} ${x.team} ${x.email}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((person) => (
              <article key={person.key}>
                <div className="poc-person-top">
                  <Avatar
                    size={48}
                    style={{
                      background: "var(--ku-highlight)",
                      color: "var(--ku-ink)",
                    }}
                  >
                    {person.name
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </Avatar>
                  <Status value={person.status} />
                </div>
                <h2>{person.name}</h2>
                <p>{person.email}</p>
                <div className="poc-person-meta">
                  <span>{person.team}</span>
                  <Tag>{person.role}</Tag>
                </div>
                <Button block onClick={() => setProfile(person)}>
                  View profile <ArrowUpRight size={14} />
                </Button>
              </article>
            ))}
        </div>
        {people.filter((x) =>
          `${x.name} ${x.team} ${x.email}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        ).length === 0 && <Empty description="No people match your search" />}
      </Panel>
      <Drawer
        title="Team profile"
        open={!!profile}
        onClose={() => setProfile(null)}
      >
        <Avatar size={64}>
          {profile?.name
            .split(" ")
            .map((x) => x[0])
            .join("")}
        </Avatar>
        <h2>{profile?.name}</h2>
        <p>{profile?.email}</p>
        <Divider />
        <dl className="poc-details">
          <dt>Team</dt>
          <dd>{profile?.team}</dd>
          <dt>Role</dt>
          <dd>{profile?.role}</dd>
          <dt>Status</dt>
          <dd>{profile?.status}</dd>
        </dl>
      </Drawer>
      <Modal
        title="Invite a person"
        open={invite}
        okText="Add sample invitation"
        onCancel={() => setInvite(false)}
        onOk={() => {
          void form
            .validateFields()
            .then((values) => {
              if (
                people.some(
                  (x) => x.email.toLowerCase() === values.email.toLowerCase(),
                )
              ) {
                form.setFields([
                  {
                    name: "email",
                    errors: ["This person is already in the workspace"],
                  },
                ]);
                return;
              }
              setPeople((old) => [
                ...old,
                {
                  ...values,
                  key: crypto.randomUUID(),
                  status: "Pending",
                  team: "Workspace",
                },
              ]);
              setInvite(false);
              message.success("Sample invitation added; no email was sent");
            })
            .catch(() => {});
        }}
      >
        <p className="poc-muted">
          Add a fictional member to explore the invitation experience.
        </p>
        <Form form={form} layout="vertical" initialValues={{ role: "Member" }}>
          <Form.Item
            name="name"
            label="Full name"
            rules={[
              { required: true, whitespace: true, message: "Enter a name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              { required: true, message: "Enter an email address" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item name="role" label="Workspace role">
            <Select
              options={["Member", "Editor", "Administrator"].map((value) => ({
                value,
                label: value,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export function Settings() {
  const { settings, setSettings } = useDemo();
  const { message } = App.useApp();
  const [tab, setTab] = useState("General");
  const [form] = Form.useForm();
  return (
    <>
      <Heading
        eyebrow="WORKSPACE / ADMINISTRATION"
        title="Make it your workspace."
        description="A few thoughtful defaults make everyone’s day easier."
      />
      <Panel>
        <Tabs
          activeKey={tab}
          onChange={setTab}
          items={["General", "Notifications", "Access"].map((key) => ({
            key,
            label: key,
          }))}
        />
        {tab === "Access" ? (
          <div className="poc-settings-body">
            <h2>Workspace roles</h2>
            <p>Keep responsibilities clear across the team.</p>
            {["Administrator", "Editor", "Member"].map((role, i) => (
              <div className="poc-setting-row" key={role}>
                <div>
                  <strong>{role}</strong>
                  <p>
                    {
                      [
                        "Manage people, workspace settings, and all content.",
                        "Create, review, and publish workspace content.",
                        "View content and contribute to assigned work.",
                      ][i]
                    }
                  </p>
                </div>
                <Tag>
                  {["Full access", "Content access", "Standard access"][i]}
                </Tag>
              </div>
            ))}
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            initialValues={settings}
            onFinish={(values) => {
              setSettings((old) => ({ ...old, ...values }));
              message.success("Workspace preferences saved in this demo");
            }}
            className="poc-settings-body"
          >
            {tab === "General" ? (
              <>
                <h2>Workspace details</h2>
                <p>The essentials your team sees every day.</p>
                <Form.Item
                  name="name"
                  label="Workspace name"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Enter a workspace name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="website"
                  label="Public website"
                  rules={[
                    { required: true, message: "Enter a website address" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <div className="poc-setting-row">
                  <div>
                    <strong>Workspace identity</strong>
                    <p>
                      The selected Kooya theme applies throughout the preview.
                    </p>
                  </div>
                  <Avatar shape="square">N</Avatar>
                </div>
              </>
            ) : (
              <>
                <h2>Stay in the loop</h2>
                <p>Choose the updates that help you work well.</p>
                <div className="poc-setting-row">
                  <div>
                    <strong>Activity notifications</strong>
                    <p>Changes to content and work you follow.</p>
                  </div>
                  <Form.Item
                    name="notifications"
                    valuePropName="checked"
                    noStyle
                  >
                    <Switch aria-label="Activity notifications" />
                  </Form.Item>
                </div>
                <div className="poc-setting-row">
                  <div>
                    <strong>Weekly workspace digest</strong>
                    <p>A considered summary of the week.</p>
                  </div>
                  <Form.Item name="weekly" valuePropName="checked" noStyle>
                    <Switch aria-label="Weekly workspace digest" />
                  </Form.Item>
                </div>
              </>
            )}
            <div className="poc-settings-footer">
              <Button
                onClick={() => {
                  form.setFieldsValue(settings);
                  message.info("Unsaved changes discarded");
                }}
              >
                Discard changes
              </Button>
              <Button type="primary" htmlType="submit">
                Save changes
              </Button>
            </div>
          </Form>
        )}
      </Panel>
    </>
  );
}
export function Components() {
  const { message, modal: feedbackModal } = App.useApp();
  const [busy, setBusy] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState("Design");
  return (
    <>
      <Heading
        eyebrow="KOOYA UI / FOUNDATIONS"
        title="The details make the difference."
        description="Real controls. Coherent states. One shared visual language."
      />
      <div className="poc-component-grid">
        <Panel title="Actions & feedback">
          <Space wrap>
            <Button
              type="primary"
              onClick={() => {
                setBusy(true);
                setTimeout(() => {
                  setBusy(false);
                  message.success("Sample saved");
                }, 700);
              }}
              loading={busy}
              icon={<Check size={15} />}
            >
              Save sample
            </Button>
            <Button onClick={() => message.info("Secondary action selected")}>
              Secondary
            </Button>
            <Button
              type="text"
              onClick={() => message.info("Quiet action selected")}
            >
              Quiet action
            </Button>
            <Button disabled>Unavailable</Button>
            <Button
              danger
              onClick={() =>
                feedbackModal.confirm({
                  title: "Remove the sample?",
                  content:
                    "This demonstrates a confirmation. Your demo records are kept.",
                  onOk: () => message.success("Confirmation completed"),
                })
              }
            >
              Remove sample
            </Button>
          </Space>
          <Divider />
          <Space wrap>
            <Status value="Published" />
            <Status value="Draft" />
            <Status value="In review" />
            <Status value="High" />
          </Space>
        </Panel>
        <Panel title="Fields & selection">
          <Form layout="vertical">
            <Form.Item label="Project name">
              <Input placeholder="A useful name" />
            </Form.Item>
            <Form.Item label="Team">
              <Select
                aria-label="Select a team"
                showSearch
                value={value}
                onChange={setValue}
                options={["Design", "Operations", "Marketing", "Content"].map(
                  (value) => ({ value, label: value }),
                )}
              />
            </Form.Item>
            <Space>
              <Switch
                checked={checked}
                onChange={setChecked}
                aria-label="Enable updates"
              />
              <span>Keep me updated</span>
            </Space>
          </Form>
        </Panel>
        <Panel title="Overlays & context">
          <p>Dialogs support a decision. Drawers keep details nearby.</p>
          <Space wrap>
            <Button onClick={() => setModal(true)}>Open dialog</Button>
            <Button onClick={() => setDrawer(true)}>Open drawer</Button>
            <Tooltip title="A little useful context">
              <Button>Hover or focus for help</Button>
            </Tooltip>
          </Space>
          <Divider />
          <Alert
            type="info"
            showIcon
            title="A clear path forward"
            description="Helpful feedback stays close to the work."
          />
        </Panel>
        <Panel title="Loading & empty states">
          <Skeleton active paragraph={{ rows: 2 }} />
          <Divider />
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="A fresh start. Your content will appear here."
          />
        </Panel>
      </div>
      <Drawer
        title="Details, without losing your place"
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <p>Drawers inherit the current palette, density, and color mode.</p>
        <Form layout="vertical">
          <Form.Item label="A sample field">
            <Input />
          </Form.Item>
          <Button
            type="primary"
            onClick={() => {
              setDrawer(false);
              message.success("Sample drawer saved");
            }}
          >
            Save sample
          </Button>
        </Form>
      </Drawer>
      <Modal
        title="A considered decision"
        open={modal}
        onCancel={() => setModal(false)}
        onOk={() => {
          setModal(false);
          message.success("Sample confirmed");
        }}
      >
        <p>
          Focus stays with this conversation, then returns to the control that
          opened it.
        </p>
        <Input
          aria-label="Dialog sample input"
          placeholder="Try keyboard navigation"
        />
      </Modal>
    </>
  );
}
export function Scene({ scene, layout }: { scene: SceneId; layout: LayoutId }) {
  return scene === "dashboard" ? (
    <Dashboard />
  ) : scene === "cms" ? (
    <CMS />
  ) : scene === "work" ? (
    <Work key={layout} layout={layout} />
  ) : scene === "people" ? (
    <People />
  ) : scene === "settings" ? (
    <Settings />
  ) : (
    <Components />
  );
}
