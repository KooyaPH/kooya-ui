import { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Empty,
  Modal,
  Form,
  Input,
  InputNumber,
  Menu,
  Progress,
  Radio,
  Segmented,
  Select,
  Space,
  Switch,
  Tag,
} from "@kooyaph/ui/components";
import {
  ActionBar,
  FieldGroup,
  MetricGroup,
  StatusGroup,
} from "@kooyaph/ui/compositions";
import { DemoFrame, optionList } from "./shared";
export function GroupDemo({
  family = "actions",
  alternate = false,
}: {
  family?: string;
  alternate?: boolean;
}) {
  const [notice, setNotice] = useState("");
  const [value, setValue] = useState(
    family === "row-actions"
      ? "Launch brief.pdf"
      : alternate && family === "filters"
        ? "launch"
        : "",
  );
  const [opened, setOpened] = useState(false);
  const [copies, setCopies] = useState<string[]>([]);
  const [choice, setChoice] = useState(
    alternate && family === "filters" ? "Engineering" : "Design",
  );
  const [selected, setSelected] = useState(["Email"]);
  const [count, setCount] = useState(4);
  const [enabled, setEnabled] = useState(
    !(alternate && ["row-actions", "status"].includes(family)),
  );
  let content;
  switch (family) {
    case "actions":
      content = (
        <ActionBar
          align={alternate ? "end" : "between"}
          primary={
            <Button
              type="primary"
              onClick={() => setNotice("Draft saved in this preview.")}
            >
              Save draft
            </Button>
          }
        >
          <Button onClick={() => setNotice("Preview is ready below.")}>
            Preview
          </Button>
          <Dropdown
            menu={{
              items: [
                { key: "copy", label: "Duplicate draft" },
                { key: "archive", label: "Archive draft" },
              ],
              onClick: ({ key }) =>
                setNotice(
                  key === "copy"
                    ? "A local copy was created."
                    : "Draft archived locally.",
                ),
            }}
          >
            <Button>More actions</Button>
          </Dropdown>
        </ActionBar>
      );
      break;
    case "input":
      content = (
        <Space.Compact
          block
          orientation={alternate ? "vertical" : "horizontal"}
        >
          <Select
            aria-label="Protocol"
            defaultValue="https://"
            options={optionList(["https://", "http://"])}
          />
          <Input
            aria-label="Project address"
            placeholder="project.example"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            type="primary"
            onClick={() =>
              setNotice(
                value.trim()
                  ? `Address prepared: ${value}`
                  : "Enter a project address.",
              )
            }
          >
            Check address
          </Button>
        </Space.Compact>
      );
      break;
    case "field":
      content = (
        <Form
          layout={alternate ? "horizontal" : "vertical"}
          onFinish={(values) => setNotice(`Saved ${values.name}.`)}
        >
          <Form.Item
            name="name"
            label="Workspace name"
            rules={[{ required: true, message: "Enter a workspace name." }]}
          >
            <Input placeholder="Northstar Studio" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Contact email"
            rules={[{ type: "email", message: "Enter a valid email address." }]}
          >
            <Input type="email" placeholder="maya@example.com" />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Save fields
          </Button>
        </Form>
      );
      break;
    case "choices":
      content = (
        <div className="composition-stack">
          <Checkbox.Group
            options={["Email", "In-app", "Weekly digest"]}
            value={selected}
            onChange={(values) => setSelected(values as string[])}
          />
          <Radio.Group
            aria-label="Digest frequency"
            options={["Daily", "Weekly", "Monthly"]}
            defaultValue={alternate ? "Monthly" : "Weekly"}
            optionType={alternate ? "button" : "default"}
          />
          <p role="status">Channels: {selected.join(", ") || "None"}</p>
        </div>
      );
      break;
    case "avatars":
      content = (
        <div className="composition-stack">
          <Avatar.Group max={{ count: alternate ? 2 : 4 }}>
            {["Maya", "Jordan", "Alex", "Sam", "Taylor"].map((name) => (
              <Avatar
                key={name}
                style={{ background: "#314300", color: "#f2eee3" }}
              >
                {name[0]}
              </Avatar>
            ))}
          </Avatar.Group>
          <Select
            aria-label="Invite teammate"
            value={choice}
            onChange={setChoice}
            options={optionList(["Design", "Engineering", "Operations"])}
          />
          <Button
            onClick={() =>
              setNotice(`${choice} invitation added to this local preview.`)
            }
          >
            Invite team
          </Button>
        </div>
      );
      break;
    case "filters":
      content = (
        <div className="composition-stack">
          <div
            className={alternate ? "composition-stack" : "composition-toolbar"}
          >
            <Input.Search
              aria-label="Search projects"
              placeholder="Search projects"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Select
              aria-label="Project department"
              value={choice}
              onChange={setChoice}
              options={optionList(["Design", "Engineering", "Operations"])}
            />
            <Button
              onClick={() => {
                setValue("");
                setChoice("Design");
              }}
            >
              Reset
            </Button>
          </div>
          <p role="status">
            Showing {choice.toLowerCase()} projects
            {value && ` matching “${value}”`}.
          </p>
        </div>
      );
      break;
    case "row-actions":
      content = (
        <div className="composition-stack">
          {enabled ? (
            <div className="composition-row">
              <strong>{value}</strong>
              <Button onClick={() => setOpened(true)}>Open</Button>
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    { key: "rename", label: "Rename to final brief" },
                    { key: "duplicate", label: "Duplicate file" },
                    { key: "archive", label: "Archive file", danger: true },
                  ],
                  onClick: ({ key }) => {
                    if (key === "rename") setValue("Final brief.pdf");
                    if (key === "duplicate")
                      setCopies((current) => [
                        ...current,
                        `${value} copy ${current.length + 1}`,
                      ]);
                    if (key === "archive") setEnabled(false);
                  },
                }}
              >
                <Button aria-label="File row actions">More</Button>
              </Dropdown>
            </div>
          ) : (
            <Empty description="File archived locally">
              <Button onClick={() => setEnabled(true)}>Restore file</Button>
            </Empty>
          )}
          {copies.map((copy) => (
            <Tag key={copy}>{copy}</Tag>
          ))}
          <Modal
            title={value}
            open={opened}
            onCancel={() => setOpened(false)}
            footer={
              <Button onClick={() => setOpened(false)}>Close file</Button>
            }
          >
            <p>
              Launch brief: review the scope, confirm the owner, and prepare the
              handoff.
            </p>
          </Modal>
        </div>
      );
      break;
    case "navigation":
      content = (
        <div className="composition-stack">
          <Menu
            mode={alternate ? "vertical" : "horizontal"}
            selectedKeys={[choice]}
            onClick={({ key }) => setChoice(key)}
            items={["Design", "Engineering", "Operations"].map((label) => ({
              key: label,
              label,
            }))}
          />
          <Card title={`${choice} workspace`}>
            The selected navigation item controls this local panel.
          </Card>
        </div>
      );
      break;
    case "metrics":
      content = (
        <div className="composition-stack">
          <MetricGroup
            metrics={[
              { key: "tasks", label: "Open tasks", value: count },
              { key: "review", label: "In review", value: 2 },
              {
                key: "capacity",
                label: "Capacity",
                value: alternate ? 82 : 68,
                suffix: "%",
              },
            ]}
          />
          <Button onClick={() => setCount((c) => c + 1)}>Add local task</Button>
        </div>
      );
      break;
    case "status":
      content = (
        <div
          className={
            alternate
              ? "composition-stack composition-panel"
              : "composition-stack"
          }
        >
          {alternate && (
            <p>
              {enabled
                ? "Changes are syncing in this local demonstration."
                : "Sync is paused. Your draft remains available locally; turn sync on to resume the example."}
            </p>
          )}
          <StatusGroup
            items={[
              {
                key: "sync",
                label: enabled ? "Sync enabled" : "Sync paused",
                color: enabled ? "success" : "warning",
              },
              { key: "review", label: "Review required", color: "processing" },
              { key: "local", label: "Local demo" },
            ]}
          />
          <div className="composition-row">
            <Switch
              aria-label="Enable sync"
              checked={enabled}
              onChange={setEnabled}
            />
            <span>Enable sync</span>
          </div>
        </div>
      );
      break;
    case "cards":
      content = (
        <div className="composition-grid">
          {["Launch", "Research", "Operations"].map((name, index) => (
            <Card
              key={name}
              title={name}
              extra={
                <Badge
                  status={index ? "processing" : "success"}
                  text={index ? "In progress" : "Ready"}
                />
              }
            >
              <p>{index + 2} tasks in this fictional project.</p>
              <Progress
                percent={alternate ? 75 - index * 15 : 30 + index * 20}
              />
              <Button onClick={() => setNotice(`${name} project selected.`)}>
                Open {name}
              </Button>
            </Card>
          ))}
        </div>
      );
      break;
    default:
      content = (
        <FieldGroup htmlFor="group-quantity" label="Quantity">
          <InputNumber
            id="group-quantity"
            min={1}
            value={count}
            onChange={(n) => setCount(n ?? 1)}
          />
        </FieldGroup>
      );
  }
  return (
    <DemoFrame
      title={`${family.replace(/-/g, " ")} group`}
      alternate={alternate}
    >
      {content}
      <p className="composition-feedback" role="status">
        {notice}
      </p>
    </DemoFrame>
  );
}
