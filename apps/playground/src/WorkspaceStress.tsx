import "./workspace-v1.css";
import { useState } from "react";
import {
  KooyaProvider,
  AppearancePicker,
  defaultAppearance,
  type AppearancePreferences,
} from "@kooyaph/ui";
import {
  Button,
  Card,
  DatePicker,
  Drawer,
  Dropdown,
  Input,
  Modal,
  Popover,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
const longName = "An exceptionally long organization and document name ".repeat(
  5,
);
const longToken = "0123456789abcdef".repeat(40);
function ClipFixture({
  mode,
  palette,
  customAccent,
  density,
}: AppearancePreferences & { mode: "light" | "dark" }) {
  const [modal, setModal] = useState(false),
    [drawer, setDrawer] = useState(false);
  const options = Array.from({ length: 100 }, (_, i) => ({
    value: String(i),
    label: i === 0 ? longName : `Option ${i + 1}`,
  }));
  return (
    <section
      aria-label="Clipped container"
      style={{
        overflow: "hidden",
        transform: "translateZ(0)",
        height: 220,
        border: "1px solid var(--ku-line)",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <KooyaProvider
        mode={mode}
        palette={palette}
        customAccent={customAccent}
        density={density}
      >
        <h2>Overlays inside a clipped container</h2>
        <p>Menus and editors should remain visible beyond this container.</p>
        <Space wrap>
          <Select
            aria-label="Clipped selector"
            style={{ width: 240 }}
            options={options}
            placeholder="Choose a long option"
          />
          <DatePicker aria-label="Clipped date picker" />
          <Button onClick={() => setModal(true)}>Open nested editor</Button>
          <Button onClick={() => setDrawer(true)}>Open detail drawer</Button>
          <Popover
            trigger="click"
            title="Record details"
            content={
              <p style={{ maxWidth: 300, overflowWrap: "anywhere" }}>
                {longToken}
              </p>
            }
          >
            <Button>Show overflowing popover</Button>
          </Popover>
        </Space>
        <Modal
          title="Nested editor"
          open={modal}
          onCancel={() => setModal(false)}
          onOk={() => setModal(false)}
        >
          <label>
            Record title
            <Input defaultValue={longName} />
          </label>
          <Select
            aria-label="Editor selector"
            style={{ width: "100%", marginBlock: 16 }}
            options={options}
            placeholder="Choose an option"
          />
          <DatePicker aria-label="Editor date picker" />
        </Modal>
        <Drawer
          title="Detail drawer"
          open={drawer}
          onClose={() => setDrawer(false)}
        >
          <label>
            Record title
            <Input defaultValue={longName} />
          </label>
          <Select
            aria-label="Drawer selector"
            style={{ width: "100%", marginBlock: 16 }}
            options={options}
            placeholder="Choose an option"
          />
          <DatePicker aria-label="Drawer date picker" />
        </Drawer>
      </KooyaProvider>
    </section>
  );
}
export default function WorkspaceStress() {
  const [appearance, setAppearance] =
    useState<AppearancePreferences>(defaultAppearance);
  const [text, setText] = useState("Readable long-form content. ".repeat(370));
  const mode = appearance.mode === "dark" ? "dark" : "light";
  const rows = Array.from({ length: 120 }, (_, i) => ({
    key: i,
    name: i % 3 === 0 ? longName : `Record ${i + 1}`,
    identifier: longToken,
    status: i % 2 ? "In review" : "Published",
  }));
  return (
    <KooyaProvider
      palette={appearance.palette}
      customAccent={appearance.customAccent}
      mode={mode}
      density={appearance.density}
    >
      <main
        className="v1-stress"
        style={{ maxWidth: 1440, margin: "auto", padding: 24, minWidth: 0 }}
      >
        <nav>
          <a href="#/overview">Workspace</a> ·{" "}
          <a href="#/components">Components</a>
        </nav>
        <h1>Content and interaction checks</h1>
        <p>
          Working examples for long text, compact layouts, nested overlays and
          keyboard focus.
        </p>
        <Card title="Appearance">
          <AppearancePicker value={appearance} onChange={setAppearance} />
        </Card>
        <ClipFixture {...appearance} mode={mode} />
        <Card title="Long text">
          <label htmlFor="stress-name">{longName}</label>
          <Input id="stress-name" defaultValue={longName} />
          <label htmlFor="stress-text">
            Long description ({text.length.toLocaleString()} characters)
          </label>
          <Input.TextArea
            id="stress-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
          <p style={{ overflowWrap: "anywhere" }}>Identifier: {longToken}</p>
        </Card>
        <Card title="Dense records">
          <Table
            aria-label="Long record table"
            rowSelection={{}}
            dataSource={rows}
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: 1100 }}
            columns={[
              {
                title: "Record title",
                dataIndex: "name",
                width: 340,
                render: (value) => (
                  <Tooltip title={value}>
                    <span
                      tabIndex={0}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {value}
                    </span>
                  </Tooltip>
                ),
              },
              {
                title: "Identifier",
                dataIndex: "identifier",
                width: 360,
                render: (value) => (
                  <Input
                    aria-label="Copyable identifier"
                    readOnly
                    value={value}
                  />
                ),
              },
              {
                title: "Status",
                dataIndex: "status",
                width: 140,
                render: (value) => <Tag>{value}</Tag>,
              },
              {
                title: "Actions",
                width: 150,
                render: () => (
                  <Dropdown
                    menu={{
                      items: [
                        { key: "inspect", label: "Inspect record" },
                        { key: "long", label: longName },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Button>Record actions</Button>
                  </Dropdown>
                ),
              },
            ]}
          />
        </Card>
      </main>
    </KooyaProvider>
  );
}
