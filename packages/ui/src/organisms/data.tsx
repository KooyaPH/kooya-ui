import { BusyBoundary } from "../molecules/experience";
import { useDeviceMode } from "../foundations/device";
import {
  Table,
  Listy as AntList,
  type TableProps,
  type ListyProps,
} from "antd";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

const TableLabel = createContext<string>("");
const AccessibleTable = forwardRef<
  HTMLTableElement,
  ComponentPropsWithoutRef<"table">
>(function AccessibleTable(props, ref) {
  const label = useContext(TableLabel);
  return <table {...props} ref={ref} aria-label={label} />;
});
const tableComponents = { table: AccessibleTable };
export interface Column<Row> {
  key: string;
  title: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  fixed?: "left" | "right";
  render: (row: Row) => ReactNode;
  sorter?: (a: Row, b: Row) => number;
  width?: number | string;
  /** Optional concise card field label when title is decorative. */
  mobileLabel?: string;
  priority?: "primary" | "secondary";
  filters?: import("antd").TableColumnType<Row>["filters"];
  onFilter?: import("antd").TableColumnType<Row>["onFilter"];
  filteredValue?: import("antd").TableColumnType<Row>["filteredValue"];
  sortOrder?: import("antd").TableColumnType<Row>["sortOrder"];
}
export interface DataTableProps<Row extends object> {
  label: string;
  rows: readonly Row[];
  columns: readonly Column<Row>[];
  rowKey: (row: Row) => string;
  minWidth?: number;
  empty?: string;
  loading?: boolean;
  /** Explicit opt-in for comparison tables that require horizontal scanning. */
  presentation?: "adaptive" | "comparison";
  filters?: ReactNode;
  pagination?: TableProps<Row>["pagination"];
  rowSelection?: TableProps<Row>["rowSelection"];
  onChange?: TableProps<Row>["onChange"];
  onRow?: TableProps<Row>["onRow"];
}
export function DataTable<Row extends object>({
  label,
  rows,
  columns,
  rowKey,
  minWidth = 680,
  empty = "No matching records.",
  loading,
  presentation = "adaptive",
  filters,
  pagination = false,
  rowSelection,
  onChange,
  onRow,
}: DataTableProps<Row>) {
  const mode = useDeviceMode();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const scrollRegionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const region = scrollRegionRef.current;
    if (!region) return;
    const labelScrollableContent = () => {
      for (const content of region.querySelectorAll<HTMLElement>(".ant-table-content")) {
        content.tabIndex = 0;
        content.setAttribute("role", "group");
        content.setAttribute("aria-label", `${label} table scroll area`);
      }
    };
    labelScrollableContent();
    const observer = new MutationObserver(labelScrollableContent);
    observer.observe(region, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [label]);
  const cards = mode === "mobile" && presentation !== "comparison";
  const priorityRows =
    mode === "tablet" &&
    presentation !== "comparison" &&
    columns.some((c) => c.priority === "secondary");
  const displayedColumns = priorityRows
    ? [
        ...columns.filter((c) => c.priority !== "secondary"),
        ...columns.filter((c) => c.priority === "secondary"),
      ]
    : columns;
  return (
    <BusyBoundary
      busy={!!loading}
      keepContent={rows.length > 0}
      label={rows.length ? "Updating records" : "Loading records"}
      skeleton="table"
    >
      <TableLabel.Provider value={label}>
        <div
          ref={scrollRegionRef}
          className={
            "ku-table-scroll " +
            (cards ? "ku-table-cards" : priorityRows ? "ku-table-priority" : "")
          }
          data-device={mode}
          role="region"
          aria-label={label + (cards ? " records" : " scroll area")}
          tabIndex={0}
        >
          {filters && (
            <details
              className="ku-record-filters"
              open={mode === "desktop" || filtersOpen}
              onFocusCapture={(event) => {
                if (
                  event.target !== event.currentTarget.querySelector("summary")
                )
                  setFiltersOpen(true);
              }}
              onToggle={(event) => {
                if (mode !== "desktop")
                  setFiltersOpen(event.currentTarget.open);
              }}
            >
              <summary>Filters</summary>
              {filters}
            </details>
          )}
          <Table<Row>
            className="ku-table"
            dataSource={[...rows]}
            rowKey={rowKey}
            columns={displayedColumns.map(
              ({ mobileLabel, priority, ...column }) => ({
                ...column,
                fixed: cards ? undefined : column.fixed,
                className: [
                  column.className,
                  priority === "secondary" ? "ku-column-secondary" : "",
                ]
                  .filter(Boolean)
                  .join(" "),
                render: (_, row) => (
                  <>
                    <span className="ku-record-label">
                      {mobileLabel ??
                        (typeof column.title === "string"
                          ? column.title
                          : column.key)}
                    </span>
                    <div className="ku-record-value">{column.render(row)}</div>
                  </>
                ),
              }),
            )}
            locale={{ emptyText: empty }}
            pagination={pagination}
            rowSelection={rowSelection}
            onChange={onChange}
            onRow={onRow}
            scroll={{ x: minWidth }}
            components={tableComponents}
          />
        </div>
      </TableLabel.Provider>
    </BusyBoundary>
  );
}
export function List<Row>({
  label,
  ...props
}: ListyProps<Row> & { label: string }) {
  return (
    <section role="region" aria-label={label}>
      <AntList {...props} />
    </section>
  );
}
