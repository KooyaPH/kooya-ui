import { forwardRef, useMemo, useState, type HTMLAttributes, type TableHTMLAttributes, type ThHTMLAttributes, type Key } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Collapse,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Slider,
  Space,
  Switch,
  Table,
  Tag,
  type TableColumnsType,
  type TableProps,
} from "@kooyaph/ui/components";
import { DemoFrame, optionList } from "./shared";
import { filterRows, downloadText } from "./state";

// Keep the native virtual layout/ref contract. The complete column order is
// rendered; these supported parts restore its header/row/cell relationships.
const VirtualHeaderTable = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>((props, ref) => {
  const { "aria-label": label, "aria-labelledby": labelledBy, "aria-describedby": describedBy, "aria-rowcount": rowCount, "aria-colcount": columnCount, ...rest } = props;
  // These belong to the actual virtual owner, not its visual header table.
  return <table {...rest} ref={ref} role="presentation" />;
});
const VirtualHeaderGroup = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((props, ref) => <thead {...props} ref={ref} role="rowgroup" />);
const VirtualHeaderRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>((props, ref) => <tr {...props} ref={ref} role="row" />);
const VirtualHeaderCell = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>((props, ref) => {
  const scrollbar = props.className?.split(" ").includes("ant-table-cell-scrollbar");
  return <th {...props} ref={ref} role={scrollbar ? "presentation" : "columnheader"} aria-hidden={scrollbar || undefined} />;
});
const VirtualBodyGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => <div {...props} ref={ref} role="rowgroup" />);
const VirtualBodyRow = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => <div {...props} ref={ref} role={props.className?.split(" ").includes("ant-table-expanded-row") ? "presentation" : "row"} />);
const VirtualBodyCell = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { colSpan?: number; rowSpan?: number }>((props, ref) => {
  const { colSpan, rowSpan, ...rest } = props;
  const detail = props.className?.split(" ").includes("ant-table-expanded-row-cell");
  return <div {...rest} ref={ref} role={detail ? "presentation" : "cell"} aria-colspan={!detail && colSpan && colSpan > 1 ? colSpan : undefined} aria-rowspan={!detail && rowSpan && rowSpan > 1 ? rowSpan : undefined} />;
});
const virtualTableParts = {
  header: { table: VirtualHeaderTable, wrapper: VirtualHeaderGroup, row: VirtualHeaderRow, cell: VirtualHeaderCell },
  body: { wrapper: VirtualBodyGroup, row: VirtualBodyRow, cell: VirtualBodyCell },
};
export type WorkRecord = {
  id: string;
  name: string;
  category: string;
  status: string;
  value: number;
  note: string;
};
const domains: Record<
  string,
  {
    title: string;
    names: string[];
    category: string[];
    value: string;
    name: string;
  }
> = {
  projects: {
    title: "Project workspace",
    names: [
      "Brand refresh",
      "Launch website",
      "Research sprint",
      "Customer guide",
      "Design system",
      "Release review",
    ],
    category: ["Design", "Product", "Operations"],
    value: "Hours",
    name: "Project",
  },
  crm: {
    title: "Relationships",
    names: [
      "Northstar Studio",
      "Fieldwork Co.",
      "Harbor Labs",
      "Paperworks",
      "Brightside Team",
      "Goodwood",
    ],
    category: ["Prospect", "Partner", "Client"],
    value: "Pipeline value",
    name: "Account",
  },
  users: {
    title: "Team directory",
    names: [
      "Maya Chen",
      "Jordan Lee",
      "Alex Stone",
      "Sam Rivera",
      "Taylor James",
      "Robin Park",
    ],
    category: ["Admin", "Editor", "Viewer"],
    value: "Projects",
    name: "Member",
  },
  inventory: {
    title: "Inventory",
    names: [
      "Paper notebook",
      "Desk lamp",
      "Canvas tote",
      "Studio mug",
      "Pen set",
      "Weekly planner",
    ],
    category: ["Stationery", "Workspace", "Accessories"],
    value: "Stock",
    name: "Item",
  },
  billing: {
    title: "Invoices",
    names: [
      "INV-001 · Northstar",
      "INV-002 · Harbor",
      "INV-003 · Fieldwork",
      "INV-004 · Brightside",
      "INV-005 · Paperworks",
      "INV-006 · Studio",
    ],
    category: ["Consulting", "Subscription", "Services"],
    value: "Amount (USD)",
    name: "Invoice",
  },
  bookings: {
    title: "Bookings",
    names: [
      "Design review · 09:00",
      "Team planning · 10:30",
      "Discovery call · 13:00",
      "Project sync · 14:00",
      "Studio tour · 15:00",
      "Workshop · 16:30",
    ],
    category: ["Meeting", "Workshop", "Consultation"],
    value: "Guests",
    name: "Booking",
  },
  devops: {
    title: "Deployments",
    names: [
      "Web frontend v2.4",
      "API service v1.8",
      "Worker pool v3.1",
      "Docs site v1.2",
      "Asset pipeline v2.0",
      "Search service v1.6",
    ],
    category: ["Staging", "Production", "Development"],
    value: "Duration (s)",
    name: "Service",
  },
  "ai-operations": {
    title: "Agent operations",
    names: [
      "Brief assistant",
      "Support triage",
      "Document review",
      "Release notes",
      "Research helper",
      "Quality review",
    ],
    category: ["Writing", "Support", "Research"],
    value: "Tokens",
    name: "Agent",
  },
  audit: {
    title: "Activity audit",
    names: [
      "Workspace created",
      "Settings updated",
      "Member invited",
      "Document approved",
      "File uploaded",
      "Invoice exported",
    ],
    category: ["Maya", "Jordan", "Alex"],
    value: "Event ID",
    name: "Event",
  },
};
export function seedRecords(
  domain = "projects",
  alternate = false,
): WorkRecord[] {
  const config = domains[domain] ?? domains.projects;
  return Array.from({ length: alternate ? 24 : 12 }, (_, i) => ({
    id: `row-${i + 1}`,
    name: `${config.names[i % config.names.length]}${i >= 6 ? ` ${Math.floor(i / 6) + 1}` : ""}`,
    category: config.category[i % 3],
    status: ["Active", "Pending", "Archived"][i % 3],
    value:
      domain === "users" || domain === "bookings" ? (i % 8) + 1 : (i + 1) * 24,
    note: "Fictional local record. Edit and export within this preview.",
  }));
}
export function DataWorkbench({
  domain = "projects",
  alternate = false,
  embedded = false,
}: {
  domain?: string;
  alternate?: boolean;
  embedded?: boolean;
}) {
  const config = domains[domain] ?? domains.projects;
  const [rows, setRows] = useState(() => seedRecords(domain, alternate));
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [sort, setSort] = useState<{
    key: "name" | "value";
    order: "ascend" | "descend";
  } | null>(null);
  const [selected, setSelected] = useState<Key[]>([]);
  const [expanded, setExpanded] = useState<readonly Key[]>([]);
  const [hidden, setHidden] = useState<string[]>([]);
  const [fixed, setFixed] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [grouped, setGrouped] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [width, setWidth] = useState(230);
  const [resetGeneration, setResetGeneration] = useState(0);
  const [editing, setEditing] = useState<WorkRecord | null>(null);
  const [details, setDetails] = useState<WorkRecord | null>(null);
  const [notice, setNotice] = useState("");
  const [form] = Form.useForm();
  const visible = useMemo(() => {
    const filtered = filterRows(rows, query, status).filter(
      (row) => !categories.length || categories.includes(row.category),
    );
    return filtered.sort((a, b) => {
      if (grouped) {
        const categoryOrder =
          config.category.indexOf(a.category) -
          config.category.indexOf(b.category);
        if (categoryOrder) return categoryOrder;
      }
      if (!sort) return 0;
      const comparison =
        sort.key === "name" ? a.name.localeCompare(b.name) : a.value - b.value;
      return sort.order === "ascend" ? comparison : -comparison;
    });
  }, [rows, query, status, categories, sort, grouped, config.category]);
  const onTableChange: TableProps<WorkRecord>["onChange"] = (
    _,
    filters,
    sorter,
  ) => {
    if (Object.prototype.hasOwnProperty.call(filters, "category"))
      setCategories((filters.category ?? []).map(String));
    const next = Array.isArray(sorter) ? sorter[0] : sorter;
    setSort(
      next?.order && (next.columnKey === "name" || next.columnKey === "value")
        ? { key: next.columnKey, order: next.order }
        : null,
    );
  };
  const columns: TableColumnsType<WorkRecord> = [
    {
      title: config.name,
      key: "name",
      dataIndex: "name",
      width,
      fixed: fixed ? "left" : undefined,
      sorter: true,
      sortOrder: sort?.key === "name" ? sort.order : null,
      render: (name: string, row) => (
        <Button type="link" className="workbench-record-name" onClick={() => setDetails(row)}>
          {name}
        </Button>
      ),
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      width: 160,
      filters: config.category.map((text) => ({ text, value: text })),
      filteredValue: categories,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 130,
      render: (value) => (
        <Tag
          color={
            value === "Active"
              ? "success"
              : value === "Pending"
                ? "processing"
                : "default"
          }
        >
          {value}
        </Tag>
      ),
    },
    {
      title: config.value,
      key: "value",
      dataIndex: "value",
      width: 150,
      sorter: true,
      sortOrder: sort?.key === "value" ? sort.order : null,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, row) => (
        <Button
          onClick={() => {
            setEditing(row);
            form.setFieldsValue(row);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];
  let shown = columns.filter((column) => !hidden.includes(String(column.key)));
  if (reverse) shown = [...shown].reverse();
  const exportRows = () => {
    const csv = [
      ["Name", "Category", "Status", config.value],
      ...visible
        .filter((row) => !selected.length || selected.includes(row.id))
        .map((row) => [row.name, row.category, row.status, row.value]),
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    downloadText(`${domain}.csv`, csv, "text/csv");
    setNotice(
      "Matching records across all pages exported in current sort order" +
        (selected.length ? " (selected records only)." : "."),
    );
  };
  const renderTable = (dataRows: WorkRecord[], category?: string) => {
    const realVirtual = virtual && dataRows.length > 0;
    const rowIndex = (row: WorkRecord) => {
      const index = dataRows.indexOf(row);
      return 2 + index + dataRows.slice(0, index).filter(record => expanded.includes(record.id)).length;
    };
    return (
    <Table<WorkRecord>
      key={resetGeneration}
      rowKey="id"
      columns={shown}
      dataSource={dataRows}
      onChange={onTableChange}
      aria-label={`${config.title}${category ? ` — ${category}` : ""} records`}
      role={realVirtual ? "table" : undefined}
      aria-rowcount={realVirtual ? 1 + dataRows.length + dataRows.filter(row => expanded.includes(row.id)).length : undefined}
      aria-colcount={realVirtual ? shown.length + 2 : undefined}
      components={realVirtual ? virtualTableParts : undefined}
      onHeaderRow={realVirtual ? (_, index) => ({ "aria-rowindex": (index ?? 0) + 1 }) : undefined}
      onRow={realVirtual ? row => ({ "aria-rowindex": rowIndex(row) }) : undefined}
      rowSelection={{ columnWidth: 48, selectedRowKeys: selected, onChange: setSelected, preserveSelectedRowKeys: true }}
      expandable={{
        columnWidth: 48,
        columnTitle: <span className="sr-only">Expand details</span>,
        expandedRowKeys: expanded,
        onExpandedRowsChange: setExpanded,
        expandedRowRender: row => realVirtual ? (
          <div role="row" aria-rowindex={rowIndex(row) + 1}>
            <div role="cell" aria-colspan={shown.length + 2}><p className="workbench-record-note">{row.note}</p></div>
          </div>
        ) : <p className="workbench-record-note">{row.note}</p>,
      }}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: { classNames: { popup: { root: "workbench-page-size-popup" } } },
        pageSizeOptions: [5, 10, 20],
      }}
      virtual={realVirtual}
      scroll={{ x: 900, y: realVirtual ? 340 : undefined }}
    />
    );
  };
  const body = (
    <div className="composition-stack composition-data-workbench">
      <div className="composition-toolbar">
        <Input.Search
          aria-label={`Search ${config.title}`}
          placeholder={`Search ${config.name.toLowerCase()}…`}
          allowClear={{
            clearIcon: <CloseCircleOutlined aria-label={`Clear ${config.title} search`} />,
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          aria-label="Filter status"
          value={status}
          onChange={setStatus}
          options={optionList(["All", "Active", "Pending", "Archived"])}
        />
        <Button
          type="primary"
          onClick={() => {
            const row = {
              id: crypto.randomUUID(),
              name: "",
              category: config.category[0],
              status: "Pending",
              value: 0,
              note: "Local record",
            };
            setEditing(row);
            form.setFieldsValue(row);
          }}
        >
          Add record
        </Button>
        <Button onClick={exportRows}>Export CSV</Button>
      </div>
      <details>
        <summary>Table controls</summary>
        <div className="composition-stack" style={{ paddingTop: 16 }}>
          <Checkbox.Group
            aria-label="Hidden columns"
            options={[
              { label: "Hide category", value: "category" },
              { label: "Hide status", value: "status" },
              { label: "Hide value", value: "value" },
            ]}
            value={hidden}
            onChange={(values) => setHidden(values as string[])}
          />
          <div className="composition-row">
            <Checkbox
              checked={fixed}
              onChange={(e) => setFixed(e.target.checked)}
            >
              Fix name column
            </Checkbox>
            <Checkbox
              checked={reverse}
              onChange={(e) => setReverse(e.target.checked)}
            >
              Reverse column order
            </Checkbox>
            <Checkbox
              checked={grouped}
              onChange={(e) => setGrouped(e.target.checked)}
            >
              Group by category
            </Checkbox>
            <Checkbox
              checked={virtual}
              onChange={(e) => setVirtual(e.target.checked)}
            >
              Virtual scrolling
            </Checkbox>
          </div>
          <label>
            Name column width
            <Slider
              ariaLabelForHandle="Name column width"
              className="workbench-name-width-slider"
              tooltip={{ placement: "bottom" }}
              min={140}
              max={420}
              value={width}
              onChange={setWidth}
            />
          </label>
        </div>
      </details>
      <div className="composition-row">
        <Tag>{visible.length} records</Tag>
        <Tag>{selected.length} selected</Tag>
        {selected.length > 0 && (
          <Button
            onClick={() => {
              setRows((current) =>
                current.map((row) =>
                  selected.includes(row.id)
                    ? { ...row, status: "Archived" }
                    : row,
                ),
              );
              setSelected([]);
              setNotice("Selected records archived locally.");
            }}
          >
            Archive selected
          </Button>
        )}
        <Button
          onClick={() => {
            setQuery("");
            setStatus("All");
            setCategories([]);
            setSort(null);
            setWidth(230);
            setSelected([]);
            setExpanded([]);
            setHidden([]);
            setGrouped(false);
            setReverse(false);
            setFixed(false);
            setVirtual(false);
            setResetGeneration((current) => current + 1);
          }}
        >
          Reset view
        </Button>
      </div>
      {grouped && (
        <div className="composition-row" role="group" aria-label="Category totals">
          {config.category.map((category) => (
            <Tag key={category}>
              {category}:{" "}
              {visible.filter((row) => row.category === category).length}
            </Tag>
          ))}
        </div>
      )}
      {grouped ? (
        <Collapse
          defaultActiveKey={config.category}
          items={config.category.map((category) => ({
            key: category,
            label: `${category} records`,
            children: renderTable(
              visible.filter((row) => row.category === category),
              category,
            ),
          }))}
        />
      ) : (
        renderTable(visible)
      )}
      <p role="status">{notice}</p>
      <Modal
        rootClassName="workbench-record-modal"
        transitionName="ant-fade"
        title={
          editing && rows.some((row) => row.id === editing.id)
            ? "Edit record"
            : "Add record"
        }
        open={!!editing}
        onCancel={() => setEditing(null)}
        onOk={() => form.submit()}
        okText="Save record"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (!editing) return;
            const updated = { ...editing, ...values };
            setRows((current) =>
              current.some((row) => row.id === editing.id)
                ? current.map((row) => (row.id === editing.id ? updated : row))
                : [updated, ...current],
            );
            setEditing(null);
            setNotice(`Saved ${values.name} locally.`);
          }}
        >
          <Form.Item
            label={config.name}
            name="name"
            rules={[
              { required: true, whitespace: true, message: "Enter a name." },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select options={optionList(config.category)} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select options={optionList(["Active", "Pending", "Archived"])} />
          </Form.Item>
          <Form.Item
            label={config.value}
            name="value"
            rules={[
              { required: true, type: "number", min: 0, message: `Enter ${config.value.toLowerCase()} of zero or greater.` },
              { validator: (_, value) => value == null || Number.isFinite(value) ? Promise.resolve() : Promise.reject(new Error("Enter a valid number.")) },
            ]}
          >
            <InputNumber aria-label={config.value} min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Notes" name="note">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        rootClassName="workbench-record-drawer"
        title={<span className="workbench-record-title">{details?.name}</span>}
        open={!!details}
        onClose={() => setDetails(null)}
      >
        <div className="workbench-record-details" role="region" aria-label="Record details" tabIndex={0}>
          <h2 className="workbench-record-full-title">{details?.name}</h2>
          <p className="workbench-record-note">{details?.note}</p>
          <p>
            {details?.category} · {details?.status}
          </p>
          <strong>
            {config.value}: {details?.value}
          </strong>
        </div>
      </Drawer>
    </div>
  );
  return embedded ? (
    body
  ) : (
    <DemoFrame
      title={config.title}
      description="Sort, filter, select, resize, reorder, expand, edit and export fictional records."
      alternate={alternate}
    >
      {body}
    </DemoFrame>
  );
}
