import { useState } from "react";
import {
  Button,
  Card,
  DashboardTemplate,
  DataTable,
  Dialog,
  FormTemplate,
  InboxTemplate,
  Input,
  SettingsTemplate,
  TextField,
  useDeviceMode,
} from "@kooyaph/ui";
const records = [
  {
    id: "a",
    name: "Alpine design studio with a deliberately long workspace name",
    status: "Ready",
    owner: "Fictional Alex",
    disabled: false,
  },
  {
    id: "b",
    name: "Beacon",
    status: "Restricted",
    owner: "Fictional Morgan",
    disabled: true,
  },
  {
    id: "c",
    name: "Cedar",
    status: "Ready",
    owner: "Fictional Lee",
    disabled: false,
  },
];
export function DeviceExperience() {
  const mode = useDeviceMode();
  const [selected, setSelected] = useState<React.Key[]>([]),
    [detail, setDetail] = useState(""),
    [draft, setDraft] = useState("Keep this draft across resize"),
    [thread, setThread] = useState<string | undefined>(),
    [pane, setPane] = useState<"conversations" | "thread">("conversations"),
    [message, setMessage] = useState("Unsent fictional message"),
    [open, setOpen] = useState(false),
    [saved, setSaved] = useState(false);
  return (
    <div className="ku-template-stack">
      <p role="status">Current composition: {mode}</p>
      <DashboardTemplate
        title="Current work"
        metrics={[
          { id: "ready", label: "Ready", value: "3" },
          { id: "review", label: "In review", value: "2" },
        ]}
        priority={
          <Card title="Review needed">
            <p>The current brief is ready for a decision.</p>
            <Button onClick={() => setOpen(true)}>
              Review and edit the fictional brief
            </Button>
          </Card>
        }
        primary={
          <Card title="Record workspace">
            <DataTable
              label="Fictional records"
              rows={records}
              rowKey={(r) => r.id}
              rowSelection={{
                selectedRowKeys: selected,
                onChange: (keys) => setSelected(keys),
                getCheckboxProps: (r) => ({
                  disabled: r.disabled,
                  "aria-label": `Select ${r.name}`,
                }),
              }}
              pagination={{ pageSize: 2, showSizeChanger: false }}
              filters={
                <TextField
                  label="Filter note"
                  placeholder="App-owned filter controls"
                />
              }
              columns={[
                {
                  key: "name",
                  title: "Name",
                  sorter: (a, b) => a.name.localeCompare(b.name),
                  render: (r) => r.name,
                },
                {
                  key: "status",
                  title: "Status",
                  filters: [{ text: "Ready", value: "Ready" }],
                  onFilter: (v, r) => r.status === v,
                  render: (r) => r.status,
                },
                {
                  key: "owner",
                  title: "Owner and context",
                  priority: "secondary",
                  render: (r) => (
                    <div>
                      <span>{r.owner}</span>
                      <Input
                        aria-label={`Local note ${r.id}`}
                        defaultValue="Unsent record note"
                      />
                    </div>
                  ),
                },
                {
                  key: "actions",
                  title: "Actions",
                  render: (r) => (
                    <Button
                      disabled={r.disabled}
                      onClick={() => setDetail(r.name)}
                    >
                      View {r.name}
                    </Button>
                  ),
                },
              ]}
            />
            <p>
              {selected.length} selected. {detail && `Viewing ${detail}`}
            </p>
          </Card>
        }
        aside={
          <Card title="Context">
            <p>
              Desktop places this alongside current work. Tablet moves it below;
              mobile keeps a labelled disclosure.
            </p>
          </Card>
        }
      />
      <SettingsTemplate
        title="Brief settings"
        sections={[
          {
            id: "identity",
            title: "Identity",
            content: (
              <TextField
                label="Brief title"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            ),
          },
          {
            id: "review",
            title: "Review",
            content: (
              <p>One field owner keeps drafts across device transitions.</p>
            ),
          },
        ]}
        preview={<p>{draft}</p>}
        footer={
          <Button onClick={() => setSaved(true)}>
            Save fictional settings
          </Button>
        }
      />
      {saved && <p role="status">Fictional settings saved in memory.</p>}
      <Card title="Inbox pane controls">
        <p>
          The application owns the selected mobile pane; drafts remain mounted.
        </p>
        <Button onClick={() => setPane("conversations")}>
          Show conversations pane
        </Button>
        <Button onClick={() => setPane("thread")}>
          Show selected thread pane
        </Button>
      </Card>
      <InboxTemplate
        title="Conversations"
        threads={[
          { id: "one", title: "Design review" },
          { id: "two", title: "Operations" },
        ]}
        threadActions={
          <Button onClick={() => setOpen(true)}>
            Review conversation brief
          </Button>
        }
        mobilePane={pane}
        onMobilePaneChange={setPane}
        selectedThreadId={thread}
        onSelectThread={setThread}
        messages={
          thread
            ? [
                {
                  id: "greeting",
                  author: "Fictional Alex",
                  body: "Please review the draft.",
                },
              ]
            : []
        }
        draft={message}
        onDraftChange={setMessage}
        onSend={() => setMessage("")}
      />
      <Dialog
        title="Edit fictional brief"
        trigger={<Button>Open mobile task dialog</Button>}
        open={open}
        onOpenChange={setOpen}
        mobilePresentation="task"
        footer={<Button onClick={() => setOpen(false)}>Finish review</Button>}
      >
        <FormTemplate
          title="Brief form"
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
          preview={<p>{draft}</p>}
        >
          <TextField
            label="Dialog brief title"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i}>
              Review section {i + 1}: fictional content keeps the body
              scrollable while the task footer stays reachable.
            </p>
          ))}
        </FormTemplate>
      </Dialog>
    </div>
  );
}
