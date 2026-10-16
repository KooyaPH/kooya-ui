import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Calendar,
  Card,
  Checkbox,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Select,
  Table,
  Tag,
  Timeline,
  Upload,
} from "@kooyaph/ui/components";
import { DemoFrame, optionList } from "./shared";
import { downloadText, moveTask } from "./state";
export function BoardDemo({ alternate = false }: { alternate?: boolean }) {
  const [tasks, setTasks] = useState([
    { id: "brief", name: "Launch brief", stage: "Todo", owner: "Maya" },
    {
      id: "design",
      name: "Design review",
      stage: alternate ? "Done" : "Doing",
      owner: "Jordan",
    },
    { id: "qa", name: "Quality checks", stage: "Todo", owner: "Alex" },
  ]);
  const [name, setName] = useState("");
  return (
    <div className="composition-stack">
      <div className="composition-toolbar">
        <Input
          aria-label="New task name"
          placeholder="New task"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="primary"
          disabled={!name.trim()}
          onClick={() => {
            setTasks((current) => [
              ...current,
              { id: crypto.randomUUID(), name, stage: "Todo", owner: "Maya" },
            ]);
            setName("");
          }}
        >
          Add task
        </Button>
      </div>
      <div className="composition-board">
        {["Todo", "Doing", "Done"].map((stage) => (
          <section className="composition-lane" key={stage}>
            <h3>
              {stage}{" "}
              <Tag>{tasks.filter((task) => task.stage === stage).length}</Tag>
            </h3>
            {tasks
              .filter((task) => task.stage === stage)
              .map((task) => (
                <article className="composition-task" key={task.id}>
                  <strong>{task.name}</strong>
                  <p>{task.owner}</p>
                  <Select
                    aria-label={`Move ${task.name}`}
                    value={stage}
                    options={optionList(["Todo", "Doing", "Done"])}
                    onChange={(value) =>
                      setTasks((current) => moveTask(current, task.id, value))
                    }
                  />
                  <Button
                    size="small"
                    onClick={() =>
                      setTasks((current) =>
                        current.filter((item) => item.id !== task.id),
                      )
                    }
                  >
                    Delete task
                  </Button>
                </article>
              ))}
          </section>
        ))}
      </div>
    </div>
  );
}
export function ScheduleDemo({
  family = "event-calendar",
  alternate = false,
}: {
  family?: string;
  alternate?: boolean;
}) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [events, setEvents] = useState([
    { id: "1", date, time: "09:00", title: "Design review" },
    { id: "2", date, time: "14:00", title: "Project planning" },
    ...(alternate && family === "schedule"
      ? [
          {
            id: "3",
            date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
            time: "11:00",
            title: "Client workshop",
          },
          {
            id: "4",
            date: new Date(Date.now() + 2 * 86400000)
              .toISOString()
              .slice(0, 10),
            time: "15:00",
            title: "Launch retrospective",
          },
        ]
      : []),
  ]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const agenda = alternate && family === "schedule";
  const today = events
    .filter((event) =>
      agenda
        ? event.date >= date &&
          event.date <
            new Date(new Date(date).getTime() + 7 * 86400000)
              .toISOString()
              .slice(0, 10)
        : event.date === date,
    )
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  return (
    <div className="composition-stack">
      {family === "event-calendar" && (
        <Calendar
          fullscreen={!alternate}
          onSelect={(value) => setDate(value.format("YYYY-MM-DD"))}
          cellRender={(value, info) =>
            info.type === "date" ? (
              <div>
                {events
                  .filter((event) => event.date === value.format("YYYY-MM-DD"))
                  .map((event) => (
                    <Badge key={event.id} status="success" text={event.title} />
                  ))}
              </div>
            ) : (
              info.originNode
            )
          }
        />
      )}
      <div className="composition-toolbar">
        <h3>{agenda ? `Week beginning ${date}` : date}</h3>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            setOpen(true);
          }}
        >
          Add event
        </Button>
        {family === "schedule" && (
          <DatePicker
            aria-label="Schedule date"
            onChange={(value) => {
              if (value) setDate(value.format("YYYY-MM-DD"));
            }}
          />
        )}
      </div>
      {today.length ? (
        today.map((event) => (
          <div className="composition-schedule-row" key={event.id}>
            <strong>
              {agenda && (
                <span>
                  {event.date}
                  <br />
                </span>
              )}
              {event.time}
            </strong>
            <span>{event.title}</span>
            <Button
              onClick={() =>
                setEvents((current) =>
                  current.filter((item) => item.id !== event.id),
                )
              }
            >
              Cancel event
            </Button>
          </div>
        ))
      ) : (
        <Empty description="No events for this date" />
      )}
      <Modal
        title={`Add event on ${date}`}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ time: "10:00" }}
          onFinish={(values) => {
            setEvents((current) => [
              ...current,
              { id: crypto.randomUUID(), date, ...values },
            ]);
            setOpen(false);
          }}
        >
          <Form.Item
            name="title"
            label="Event title"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[
              {
                required: true,
                pattern: /^([01]\d|2[0-3]):[0-5]\d$/,
                message: "Use HH:MM.",
              },
            ]}
          >
            <Input type="time" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export function GanttDemo({ alternate = false }: { alternate?: boolean }) {
  const [tasks, setTasks] = useState([
    { id: "brief", name: "Discovery", start: 1, duration: 3 },
    { id: "design", name: "Design", start: 4, duration: alternate ? 6 : 4 },
    { id: "build", name: "Build", start: 8, duration: 5 },
  ]);
  return (
    <div className="composition-stack">
      <p>
        Two-week plan. Change a start day or duration to move and resize the
        schedule. Values stay local.
      </p>
      <div className="composition-scroll">
        <div className="composition-gantt">
          <strong>Task / day</strong>
          <div className="composition-gantt-track">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} style={{ textAlign: "center" }}>
                {i + 1}
              </span>
            ))}
          </div>
          {tasks.map((task) => (
            <div key={task.id} style={{ display: "contents" }}>
              <strong>{task.name}</strong>
              <div className="composition-gantt-track">
                <span
                  className="composition-gantt-bar"
                  style={{
                    gridColumn: `${task.start} / span ${task.duration}`,
                  }}
                >
                  {task.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Table
        pagination={false}
        rowKey="id"
        dataSource={tasks}
        scroll={{ x: "max-content" }}
        columns={[
          { title: "Task", dataIndex: "name" },
          {
            title: "Start day",
            render: (_, task) => (
              <InputNumber
                aria-label={`${task.name} start day`}
                min={1}
                max={14 - task.duration + 1}
                value={task.start}
                onChange={(value) =>
                  setTasks((current) =>
                    current.map((item) =>
                      item.id === task.id
                        ? { ...item, start: value ?? 1 }
                        : item,
                    ),
                  )
                }
              />
            ),
          },
          {
            title: "Duration",
            render: (_, task) => (
              <InputNumber
                aria-label={`${task.name} duration`}
                min={1}
                max={15 - task.start}
                value={task.duration}
                onChange={(value) =>
                  setTasks((current) =>
                    current.map((item) =>
                      item.id === task.id
                        ? { ...item, duration: value ?? 1 }
                        : item,
                    ),
                  )
                }
              />
            ),
          },
        ]}
      />
    </div>
  );
}
export function FileManager({
  alternate = false,
  uploadOnly = false,
}: {
  alternate?: boolean;
  uploadOnly?: boolean;
}) {
  const [files, setFiles] = useState<
    { id: string; name: string; size: number; content?: File }[]
  >(
    uploadOnly
      ? []
      : [
          { id: "brief", name: "Launch brief.txt", size: 2048 },
          { id: "notes", name: "Research notes.md", size: 4096 },
        ],
  );
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="composition-stack">
      <Upload.Dragger
        multiple
        beforeUpload={(file) => {
          if (file.size > 10 * 1024 * 1024) {
            setNotice("Choose a file smaller than 10 MB.");
            return Upload.LIST_IGNORE;
          }
          setFiles((current) => [
            ...current,
            {
              id: crypto.randomUUID(),
              name: file.name,
              size: file.size,
              content: file,
            },
          ]);
          setNotice(`${file.name} added locally. No upload request was made.`);
          return false;
        }}
        showUploadList={false}
      >
        <p style={{ fontSize: 28 }}>↥</p>
        <strong>Choose files or drop them here</strong>
        <p>Local files only · up to 10 MB each</p>
      </Upload.Dragger>
      {!uploadOnly && (
        <div className="composition-toolbar">
          <Input.Search
            aria-label="Search files"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files"
          />
          <Button
            disabled={!selected.length}
            onClick={() => {
              setFiles((current) =>
                current.filter((file) => !selected.includes(file.id)),
              );
              setSelected([]);
            }}
          >
            Delete selected
          </Button>
        </div>
      )}
      <div className={alternate ? "composition-grid" : "composition-stack"}>
        {files
          .filter((file) =>
            file.name.toLowerCase().includes(query.toLowerCase()),
          )
          .map((file) => (
            <div
              key={file.id}
              className={
                alternate ? "composition-panel" : "composition-file-row"
              }
            >
              <Checkbox
                aria-label={`Select ${file.name}`}
                checked={selected.includes(file.id)}
                onChange={(e) =>
                  setSelected((current) =>
                    e.target.checked
                      ? [...current, file.id]
                      : current.filter((id) => id !== file.id),
                  )
                }
              />
              <div>
                <strong>{file.name}</strong>
                <p className="composition-muted">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <div className="composition-row">
                <Button
                  onClick={async () => {
                    downloadText(
                      file.name,
                      file.content
                        ? file.content
                        : "Fictional local example document.",
                    );
                    setNotice(`${file.name} downloaded.`);
                  }}
                >
                  Download
                </Button>
                <Button
                  onClick={() =>
                    setFiles((current) =>
                      current.filter((item) => item.id !== file.id),
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
      </div>
      {!files.length && <Empty description="No local files selected" />}
      <p role="status">{notice}</p>
    </div>
  );
}
export function NotificationsDemo({
  alternate = false,
}: {
  alternate?: boolean;
}) {
  const [items, setItems] = useState([
    { id: "1", title: "Launch brief approved", read: false },
    { id: "2", title: "Maya added a research note", read: alternate },
    { id: "3", title: "Weekly digest is ready", read: true },
  ]);
  const [unread, setUnread] = useState(false);
  return (
    <div className="composition-stack">
      <div className="composition-row">
        <Checkbox
          checked={unread}
          onChange={(e) => setUnread(e.target.checked)}
        >
          Unread only
        </Checkbox>
        <Button
          onClick={() =>
            setItems((current) =>
              current.map((item) => ({ ...item, read: true })),
            )
          }
        >
          Mark all read
        </Button>
        <Badge count={items.filter((item) => !item.read).length} />
      </div>
      {items
        .filter((item) => !unread || !item.read)
        .map((item) => (
          <div className="composition-file-row" key={item.id}>
            <Badge
              status={item.read ? "default" : "processing"}
              text={item.title}
            />
            <Button
              onClick={() =>
                setItems((current) =>
                  current.map((value) =>
                    value.id === item.id
                      ? { ...value, read: !value.read }
                      : value,
                  ),
                )
              }
            >
              {item.read ? "Mark unread" : "Mark read"}
            </Button>
          </div>
        ))}
      {!items.some((item) => !unread || !item.read) && (
        <Empty description="You're all caught up" />
      )}
    </div>
  );
}
export function WorkflowDemo({
  family = "kanban",
  alternate = false,
}: {
  family?: string;
  alternate?: boolean;
}) {
  return (
    <DemoFrame title={family.replace(/-/g, " ")} alternate={alternate}>
      {family === "kanban" ? (
        <BoardDemo alternate={alternate} />
      ) : family === "gantt" ? (
        <GanttDemo alternate={alternate} />
      ) : family === "file-management" || family === "upload" ? (
        <FileManager alternate={alternate} uploadOnly={family === "upload"} />
      ) : family === "notifications" ? (
        <NotificationsDemo alternate={alternate} />
      ) : (
        <ScheduleDemo family={family} alternate={alternate} />
      )}
    </DemoFrame>
  );
}
