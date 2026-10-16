import { useState, type ReactNode } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Collapse,
  Descriptions,
  Drawer,
  Empty,
  Form,
  Input,
  Menu,
  Modal,
  Progress,
  Radio,
  Rate,
  Result,
  Select,
  Space,
  Steps,
  Switch,
  Tabs,
  Tag,
  Timeline,
  Upload,
} from "@kooyaph/ui/components";
import { MetricGroup } from "@kooyaph/ui/compositions";
import { DemoFrame, optionList } from "./shared";
import { DataWorkbench } from "./data";
export function WorkspaceForm({
  family = "form",
  alternate = false,
}: {
  family?: string;
  alternate?: boolean;
}) {
  const [form] = Form.useForm();
  const [saved, setSaved] = useState("");
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const wizard = family === "wizard" || family === "onboarding";
  const auth = family === "authentication";
  const fields = (
    <>
      {(!auth || alternate) && (
        <Form.Item
          name="name"
          label={auth ? "Name" : "Workspace name"}
          rules={[
            { required: true, whitespace: true, message: "Enter a name." },
          ]}
        >
          <Input placeholder={auth ? "Maya Chen" : "Northstar Studio"} />
        </Form.Item>
      )}
      <Form.Item
        name="email"
        label="Email address"
        rules={[
          {
            required: true,
            type: "email",
            message: "Enter a valid email address.",
          },
        ]}
      >
        <Input
          type="email"
          autoComplete={auth ? "username" : "email"}
          placeholder="maya@example.com"
        />
      </Form.Item>
      {auth ? (
        <>
          <Form.Item
            name="password"
            label="Demo password"
            rules={[
              {
                required: true,
                min: 8,
                message: "Use at least eight characters.",
              },
            ]}
          >
            <Input.Password
              autoComplete={alternate ? "new-password" : "current-password"}
            />
          </Form.Item>
          {alternate && (
            <Form.Item
              name="confirmPassword"
              label="Confirm password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Confirm your password." },
                ({ getFieldValue }) => ({
                  validator: (_, value) =>
                    !value || getFieldValue("password") === value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Passwords must match.")),
                }),
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>
          )}
        </>
      ) : (
        <Form.Item
          name="team"
          label="Team size"
          initialValue={alternate ? "11–25" : "1–10"}
        >
          <Select options={optionList(["1–10", "11–25", "26–50"])} />
        </Form.Item>
      )}
    </>
  );
  return (
    <div className="composition-form composition-stack">
      {saved ? (
        <Result
          status="success"
          title={auth ? "Demo session created" : "Workspace ready"}
          subTitle={`${saved}. This is a local example; no account or data was sent.`}
          extra={
            <Button
              onClick={() => {
                setSaved("");
                setStep(0);
              }}
            >
              Start again
            </Button>
          }
        />
      ) : (
        <>
          {wizard && (
            <Steps
              current={step}
              items={[
                { title: "Details" },
                { title: "Review" },
                { title: "Finish" },
              ]}
            />
          )}
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              if (wizard && step === 0) {
                setDraft(values);
                setStep(1);
              } else
                setSaved(String(values.name ?? values.email ?? draft.name));
            }}
          >
            {!wizard || step === 0 ? (
              fields
            ) : (
              <Descriptions
                title="Review workspace"
                column={1}
                items={[
                  { key: "name", label: "Name", children: draft.name },
                  { key: "email", label: "Email", children: draft.email },
                  { key: "team", label: "Team size", children: draft.team },
                ]}
              />
            )}
            <div className="composition-row">
              {wizard && step > 0 && (
                <Button onClick={() => setStep(0)}>Back</Button>
              )}
              <Button type="primary" htmlType="submit">
                {wizard
                  ? step === 0
                    ? "Continue"
                    : "Create workspace"
                  : auth
                    ? alternate
                      ? "Create demo account"
                      : "Start demo session"
                    : "Save workspace"}
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
export function SettingsDemo({ alternate = false }: { alternate?: boolean }) {
  const [saved, setSaved] = useState(false);
  return (
    <Form
      layout={alternate ? "horizontal" : "vertical"}
      initialValues={{
        name: "Northstar Studio",
        email: "maya@example.com",
        notifications: true,
        visibility: "Team",
      }}
      onValuesChange={() => setSaved(false)}
      onFinish={() => setSaved(true)}
    >
      <Tabs
        items={[
          {
            key: "general",
            label: "General",
            children: (
              <>
                <Form.Item
                  label="Workspace name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Contact email"
                  name="email"
                  rules={[{ type: "email" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Workspace visibility" name="visibility">
                  <Radio.Group options={["Private", "Team", "Public"]} />
                </Form.Item>
              </>
            ),
          },
          {
            key: "notifications",
            label: "Notifications",
            children: (
              <>
                <Form.Item
                  label="Email notifications"
                  name="notifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Checkbox defaultChecked>Weekly digest</Checkbox>
              </>
            ),
          },
        ]}
      />
      <Button htmlType="submit" type="primary">
        Save settings
      </Button>
      {saved && <p role="status">Settings saved in this preview.</p>}
    </Form>
  );
}
export function ProfileDemo({ alternate = false }: { alternate?: boolean }) {
  const [editing, setEditing] = useState(alternate);
  const [bio, setBio] = useState(
    "Helping thoughtful teams bring their next idea to life.",
  );
  const [name, setName] = useState(alternate ? "Jordan Lee" : "Maya Chen");
  return (
    <div className="composition-stack">
      <div className="composition-row">
        <Avatar size={64} style={{ background: "#314300", color: "#f2eee3" }}>
          {name[0]}
        </Avatar>
        <div>
          <h3>{name}</h3>
          <Tag color="success">Workspace owner</Tag>
        </div>
        <Button onClick={() => setEditing((v) => !v)}>
          {editing ? "Done editing" : "Edit profile"}
        </Button>
      </div>
      {editing ? (
        <div className="composition-stack">
          <label>
            Profile name
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            About
            <Input.TextArea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
        </div>
      ) : (
        <p>{bio}</p>
      )}
      <Descriptions
        column={1}
        items={[
          {
            key: "email",
            label: "Email",
            children: alternate ? "jordan@example.com" : "maya@example.com",
          },
          { key: "location", label: "Location", children: "Singapore" },
          { key: "team", label: "Team", children: "Design and product" },
        ]}
      />
      <Timeline
        items={[
          { title: "Today", content: "Reviewed the launch brief." },
          { title: "Yesterday", content: "Joined the Northstar workspace." },
        ]}
      />
    </div>
  );
}
export function InboxDemo({ alternate = false }: { alternate?: boolean }) {
  const [thread, setThread] = useState("Design review");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Record<string, string[]>>({
    "Design review": ["The new brief is ready to review."],
    "Project launch": ["Can we review the timeline together?"],
  });
  return (
    <div className="composition-inbox">
      <Menu
        mode="inline"
        selectedKeys={[thread]}
        onClick={({ key }) => setThread(key)}
        items={Object.keys(messages).map((key) => ({ key, label: key }))}
      />
      <div className="composition-stack">
        <h3>{thread}</h3>
        <div
          className="composition-chat-log"
          role="log"
          aria-label="Thread messages"
        >
          {messages[thread].map((message, index) => (
            <p
              className={`composition-chat-bubble ${index ? "self" : ""}`}
              key={index}
            >
              {message}
            </p>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            setMessages((current) => ({
              ...current,
              [thread]: [...current[thread], text],
            }));
            setText("");
          }}
        >
          <Space.Compact block>
            <Input
              aria-label="Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={alternate ? "Add a note…" : "Write a reply…"}
            />
            <Button type="primary" htmlType="submit" disabled={!text.trim()}>
              Send locally
            </Button>
          </Space.Compact>
        </form>
      </div>
    </div>
  );
}
export function FeedDemo() {
  const [posts, setPosts] = useState([
    { id: "1", text: "The launch brief is ready for review.", likes: 2 },
    {
      id: "2",
      text: "A good week of research. Here are the next steps.",
      likes: 4,
    },
  ]);
  const [text, setText] = useState("");
  return (
    <div className="composition-stack">
      <Space.Compact block>
        <Input
          aria-label="New update"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a local update…"
        />
        <Button
          type="primary"
          disabled={!text.trim()}
          onClick={() => {
            setPosts((current) => [
              { id: crypto.randomUUID(), text, likes: 0 },
              ...current,
            ]);
            setText("");
          }}
        >
          Post update
        </Button>
      </Space.Compact>
      {posts.map((post) => (
        <Card key={post.id} title="Northstar team">
          <p>{post.text}</p>
          <Button
            onClick={() =>
              setPosts((current) =>
                current.map((item) =>
                  item.id === post.id
                    ? { ...item, likes: item.likes + 1 }
                    : item,
                ),
              )
            }
          >
            Like · {post.likes}
          </Button>
        </Card>
      ))}
    </div>
  );
}
export function ApplicationDemo({
  family = "dashboard",
  alternate = false,
}: {
  family?: string;
  alternate?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [panel, setPanel] = useState("Overview");
  const [items, setItems] = useState([
    "Review launch brief",
    "Check typography",
    "Confirm handoff",
  ]);
  const [checked, setChecked] = useState<string[]>(
    alternate && family === "list" ? ["Review launch brief"] : [],
  );
  const [confirmation, setConfirmation] = useState("");
  const [headerQuery, setHeaderQuery] = useState("");
  const [emptyProjects, setEmptyProjects] = useState<string[]>(
    alternate ? ["Northstar launch"] : [],
  );
  const [emptyQuery, setEmptyQuery] = useState(alternate ? "archive" : "");
  const matchingProjects = emptyProjects.filter((project) =>
    project.toLowerCase().includes(emptyQuery.toLowerCase()),
  );
  let content: ReactNode;
  if (["form", "wizard", "onboarding", "authentication"].includes(family))
    content = <WorkspaceForm family={family} alternate={alternate} />;
  else if (family === "settings")
    content = <SettingsDemo alternate={alternate} />;
  else if (family === "profile")
    content = <ProfileDemo alternate={alternate} />;
  else if (family === "list")
    content = (
      <div className="composition-stack">
        {alternate ? (
          <Collapse
            defaultActiveKey={["Pending", "Completed"]}
            items={["Pending", "Completed"].map((group) => ({
              key: group,
              label: group,
              children: (
                <div className="composition-stack">
                  {items
                    .filter(
                      (item) =>
                        checked.includes(item) === (group === "Completed"),
                    )
                    .map((item) => (
                      <Checkbox
                        key={item}
                        checked={checked.includes(item)}
                        onChange={(event) =>
                          setChecked((current) =>
                            event.target.checked
                              ? [...current, item]
                              : current.filter((value) => value !== item),
                          )
                        }
                      >
                        {item}
                      </Checkbox>
                    ))}
                </div>
              ),
            }))}
          />
        ) : (
          <Checkbox.Group
            value={checked}
            onChange={(values) => setChecked(values as string[])}
          >
            {items.map((item) => (
              <div className="composition-file-row" key={item}>
                <Checkbox value={item}>{item}</Checkbox>
                <Button
                  onClick={() =>
                    setItems((current) =>
                      current.filter((value) => value !== item),
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
          </Checkbox.Group>
        )}
        <Button
          onClick={() =>
            setItems((current) => [
              ...current,
              `New task ${current.length + 1}`,
            ])
          }
        >
          Add task
        </Button>
        <p role="status">
          {checked.filter((item) => items.includes(item)).length} of{" "}
          {items.length} tasks complete.
        </p>
      </div>
    );
  else if (family === "empty-state")
    content = (
      <div className="composition-stack">
        {alternate && (
          <Input.Search
            aria-label="Search existing projects"
            value={emptyQuery}
            onChange={(event) => setEmptyQuery(event.target.value)}
            allowClear
          />
        )}
        {matchingProjects.length ? (
          matchingProjects.map((project) => (
            <Card key={project} title={project}>
              <Tag color="success">
                {alternate ? "Existing project" : "Created locally"}
              </Tag>
              <Button
                onClick={() => {
                  setEmptyProjects(alternate ? ["Northstar launch"] : []);
                  setEmptyQuery(alternate ? "archive" : "");
                }}
              >
                Reset example
              </Button>
            </Card>
          ))
        ) : (
          <Empty
            description={
              alternate
                ? `No projects match your search for ${emptyQuery}.`
                : "No projects yet. Create your first local project."
            }
          >
            <Button
              type="primary"
              onClick={() =>
                alternate
                  ? setEmptyQuery("")
                  : setEmptyProjects(["Northstar launch"])
              }
            >
              {alternate ? "Clear search" : "Create project"}
            </Button>
          </Empty>
        )}
      </div>
    );
  else if (family === "dialog" || family === "drawer")
    content = (
      <>
        <Button type="primary" onClick={() => setOpen(true)}>
          Open {family}
        </Button>
        {family === "dialog" ? (
          <Modal
            title={
              alternate
                ? "Archive the launch brief"
                : "Approve the launch brief"
            }
            okText={alternate ? "Archive brief" : "OK"}
            okButtonProps={{
              danger: alternate,
              disabled: alternate && confirmation !== "ARCHIVE",
            }}
            open={open}
            onCancel={() => setOpen(false)}
            onOk={() => {
              setOpen(false);
              setNotice(
                alternate
                  ? "Launch brief archived locally."
                  : "Launch brief approved locally.",
              );
            }}
          >
            {alternate ? (
              <label>
                Type ARCHIVE to confirm
                <Input
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                />
              </label>
            ) : (
              <>
                <p>
                  All checklist items are complete. Approve this fictional brief
                  to continue.
                </p>
                <Checkbox defaultChecked>
                  Notify the local team activity
                </Checkbox>
              </>
            )}
          </Modal>
        ) : (
          <Drawer
            title={alternate ? "Edit project owner" : "Project details"}
            open={open}
            onClose={() => setOpen(false)}
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setNotice("Project details saved.");
                  setOpen(false);
                }}
              >
                Save
              </Button>
            }
          >
            <ProfileDemo alternate={alternate} />
          </Drawer>
        )}
        <p role="status">{notice}</p>
      </>
    );
  else if (family === "timeline")
    content = (
      <>
        <Timeline
          mode={alternate ? "alternate" : "start"}
          items={[
            { title: "09:00", content: "Workspace created" },
            { title: "10:30", content: "Research completed" },
            { title: "14:00", content: "Design ready for review" },
            ...(notice ? [{ title: "Now", content: notice }] : []),
          ]}
        />
        <Button onClick={() => setNotice("Launch approved locally")}>
          Approve launch
        </Button>
      </>
    );
  else if (family === "statistics" || family === "dashboard")
    content = (
      <div className="composition-stack">
        <MetricGroup
          metrics={[
            { key: "projects", label: "Projects", value: alternate ? 24 : 12 },
            { key: "review", label: "In review", value: alternate ? 8 : 4 },
            {
              key: "capacity",
              label: "Capacity",
              value: alternate ? 52 : 76,
              suffix: "%",
            },
          ]}
        />
        {family === "dashboard" ? (
          <DataWorkbench embedded alternate={alternate} />
        ) : (
          <>
            <Progress percent={checked.length ? 88 : alternate ? 52 : 76} />
            {alternate && (
              <Descriptions
                title="Capacity breakdown"
                column={1}
                items={[
                  {
                    key: "design",
                    label: "Design",
                    children: "8 of 12 projects",
                  },
                  {
                    key: "engineering",
                    label: "Engineering",
                    children: "16 of 24 projects",
                  },
                ]}
              />
            )}
            <Button onClick={() => setChecked(["updated"])}>
              Update local forecast
            </Button>
          </>
        )}
      </div>
    );
  else if (family === "card")
    content = (
      <div className="composition-grid">
        {["Design sprint", "Research notes", "Launch checklist"].map(
          (title, index) => (
            <Card
              key={title}
              title={title}
              extra={<Tag>{index ? "In progress" : "Ready"}</Tag>}
            >
              <p>A focused workspace for the next part of your project.</p>
              <Avatar.Group>
                <Avatar>M</Avatar>
                <Avatar>J</Avatar>
              </Avatar.Group>
              <div className="composition-row" style={{ marginTop: 20 }}>
                <Button
                  type="primary"
                  onClick={() => setNotice(`${title} opened.`)}
                >
                  Open project
                </Button>
                <Button
                  onClick={() => setNotice(`${title} saved to favorites.`)}
                >
                  Save
                </Button>
              </div>
            </Card>
          ),
        )}
        <p role="status">{notice}</p>
      </div>
    );
  else if (family === "header")
    content = (
      <div className="composition-stack">
        <header
          className={`${alternate ? "composition-stack" : "composition-row"} composition-panel`}
        >
          <strong>NORTHSTAR</strong>
          {alternate && (
            <Input.Search
              aria-label="Find navigation"
              placeholder="Find a page"
              allowClear
              value={headerQuery}
              onChange={(event) => setHeaderQuery(event.target.value)}
            />
          )}
          <Menu
            style={{ flex: 1, minWidth: 220 }}
            mode={alternate ? "vertical" : "horizontal"}
            selectedKeys={[panel]}
            onClick={({ key }) => setPanel(key)}
            items={["Overview", "Projects", "Settings"]
              .filter((label) =>
                label.toLowerCase().includes(headerQuery.toLowerCase()),
              )
              .map((label) => ({
                key: label,
                label,
              }))}
          />
          <Button onClick={() => setOpen(true)}>Profile</Button>
        </header>
        <Card title={panel}>
          {panel === "Settings" ? (
            <SettingsDemo />
          ) : (
            <p>
              {panel === "Projects"
                ? "Three fictional projects are ready for review."
                : "Welcome to your studio workspace."}
            </p>
          )}
        </Card>
        <Drawer title="Your profile" open={open} onClose={() => setOpen(false)}>
          <ProfileDemo alternate={alternate} />
        </Drawer>
      </div>
    );
  else if (
    family === "header" ||
    family === "sidebar" ||
    family === "app-shell"
  )
    content = (
      <div
        className={`composition-template-shell ${alternate ? "alternate" : ""}`}
      >
        <aside className="composition-template-nav">
          <div className="composition-template-brand">NORTHSTAR</div>
          <Menu
            mode={alternate ? "horizontal" : "inline"}
            selectedKeys={[panel]}
            onClick={({ key }) => setPanel(key)}
            items={["Overview", "Projects", "Settings"].map((label) => ({
              key: label,
              label,
            }))}
          />
        </aside>
        <div className="composition-template-main composition-stack">
          <div className="composition-row">
            <h3>{panel}</h3>
            <Badge count={notice ? 0 : 3}>
              <Button
                onClick={() => setNotice("Three local notifications read.")}
              >
                Notifications
              </Button>
            </Badge>
          </div>
          {panel === "Settings" ? (
            <SettingsDemo />
          ) : panel === "Projects" ? (
            <DataWorkbench embedded />
          ) : (
            <>
              <p>Your work, in one place.</p>
              <MetricGroup
                metrics={[
                  { key: "tasks", label: "Tasks", value: 8 },
                  { key: "done", label: "Complete", value: 3 },
                ]}
              />
            </>
          )}
          <p role="status">{notice}</p>
        </div>
      </div>
    );
  else
    content = (
      <Descriptions
        title="Launch brief"
        bordered
        column={alternate ? 1 : 2}
        items={[
          { key: "owner", label: "Owner", children: "Maya Chen" },
          {
            key: "status",
            label: "Status",
            children: <Tag color="processing">In review</Tag>,
          },
          { key: "due", label: "Due date", children: "18 October 2026" },
          { key: "scope", label: "Scope", children: "Brand, web and content" },
        ]}
      />
    );
  return (
    <DemoFrame
      title={family.replace(/-/g, " ")}
      description="A working composition with fictional local state."
      alternate={alternate}
    >
      {content}
    </DemoFrame>
  );
}
