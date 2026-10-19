import {
  BusyBoundary,
  DataValue,
  DataLoadingContext,
  useDataLoading,
} from "../molecules/experience";
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
  type CSSProperties,
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
  /** Optional body limit. The Ant content owns both axes; wrappers must not scroll. */
  maxBodyHeight?: number | string;
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
  maxBodyHeight,
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
  const inheritedLoading = useDataLoading();
  const busy = loading ?? inheritedLoading;
  const cold = !!busy && rows.length === 0;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const scrollRegionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const region = scrollRegionRef.current;
    if (!region) return;
    const labelScrollableContent = () => {
      for (const content of region.querySelectorAll<HTMLElement>(
        ".ant-table-content, .ant-table-body",
      )) {
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
  useEffect(() => {
    const region = scrollRegionRef.current;
    if (!region || maxBodyHeight === undefined || typeof ResizeObserver === "undefined") return;
    let header: HTMLElement | null = null;
    const resize = new ResizeObserver(() => {
      if (header) region.style.setProperty("--ku-table-header-height", `${header.getBoundingClientRect().height}px`);
    });
    const observeHeader = () => {
      const next = region.querySelector<HTMLElement>(".ant-table-thead");
      if (next === header) return;
      resize.disconnect(); header = next;
      if (header) { resize.observe(header); region.style.setProperty("--ku-table-header-height", `${header.getBoundingClientRect().height}px`); }
    };
    const mutation = new MutationObserver(observeHeader);
    mutation.observe(region, { childList: true, subtree: true }); observeHeader();
    return () => { resize.disconnect(); mutation.disconnect(); };
  }, [maxBodyHeight]);
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
      busy={!!busy}
      keepContent={rows.length > 0}
      label={rows.length ? "Updating records" : "Loading records"}
      skeleton="table"
    >
      <TableLabel.Provider value={label}>
        <div
          ref={scrollRegionRef}
          className={
            "ku-table-scroll " +
            (cards
              ? "ku-table-cards"
              : priorityRows
                ? "ku-table-priority"
                : "") +
            (!cards && maxBodyHeight !== undefined
              ? " ku-table-scroll--bounded"
              : "")
          }
          style={
            !cards && maxBodyHeight !== undefined
              ? ({
                  "--ku-table-max-body-height":
                    typeof maxBodyHeight === "number"
                      ? `${maxBodyHeight}px`
                      : maxBodyHeight,
                } as CSSProperties)
              : undefined
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
              <DataLoadingContext.Provider value={false}>
                {filters}
              </DataLoadingContext.Provider>
            </details>
          )}
          <Table<Row>
            className="ku-table"
            dataSource={
              cold
                ? Array.from(
                    { length: 5 },
                    (_, index) => ({ __kuSkeleton: index }) as unknown as Row,
                  )
                : [...rows]
            }
            rowKey={
              cold
                ? (row) =>
                    `ku-loading-${(row as { __kuSkeleton: number }).__kuSkeleton}`
                : rowKey
            }
            columns={displayedColumns.map(
              ({ mobileLabel, priority, ...column }) => ({
                ...column,
                fixed: cards ? undefined : column.fixed,
                sorter: column.sorter
                  ? (a: Row, b: Row) => (cold ? 0 : column.sorter!(a, b))
                  : undefined,
                onFilter: column.onFilter
                  ? (value: string | number | bigint | boolean, row: Row) =>
                      cold ? true : column.onFilter!(value, row)
                  : undefined,
                filteredValue: cold ? null : column.filteredValue,
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
                    <div className="ku-record-value">
                      <DataValue
                        loading={cold}
                        width={column.key.length % 2 ? "68%" : "84%"}
                      >
                        {!cold && column.render(row)}
                      </DataValue>
                    </div>
                  </>
                ),
              }),
            )}
            locale={{ emptyText: empty }}
            pagination={cold ? false : pagination}
            rowSelection={
              cold && rowSelection
                ? {
                    ...rowSelection,
                    selectedRowKeys: [],
                    getCheckboxProps: () => ({ disabled: true }),
                    onChange: undefined,
                    onSelect: undefined,
                    onSelectAll: undefined,
                  }
                : rowSelection
            }
            onChange={cold ? undefined : onChange}
            onRow={cold ? undefined : onRow}
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
