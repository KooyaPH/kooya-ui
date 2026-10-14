import React, { useId, useState } from "react";
import {
  Table as AntTable,
  Pagination as AntPagination,
  Button,
  Select,
  Space,
  InputNumber,
} from "antd";
import { Input as RecipeInput } from "./controls";
import { part, findParts, text, role, type PartProps } from "./parts";
export const TableHeader = part("TableHeader");
export const TableBody = part("TableBody");
export const TableFooter = part("TableFooter");
export const TableCaption = part("TableCaption");
export const TableRow = part("TableRow");
export const TableHead = part("TableHead");
export const TableCell = part("TableCell");
const CaptionContext = React.createContext<React.ReactNode>(null);
const NativeTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(function NativeTable({ children, ...props }, ref) {
  const caption = React.useContext(CaptionContext);
  return (
    <table {...props} ref={ref}>
      {caption && <caption>{caption}</caption>}
      {children}
    </table>
  );
});
export function Table({ children, ...props }: PartProps) {
  const header = findParts(children, ["TableHeader"])[0];
  const heads = findParts(header?.props.children, ["TableHead"]);
  const body = findParts(children, ["TableBody"])[0];
  const rows = findParts(body?.props.children, ["TableRow"]);
  const footer = findParts(children, ["TableFooter"])[0];
  const footRows = findParts(footer?.props.children, ["TableRow"]);
  const caption = findParts(children, ["TableCaption"])[0];
  const data = rows.map((row, index) => ({
    key: String(row.key ?? index),
    cells: findParts(row.props.children, ["TableCell"]),
    row: row.props,
  }));
  const columnCount = Math.max(
    heads.length,
    ...data.map((record) => record.cells.length),
    0,
  );
  const columns = Array.from({ length: columnCount }, (_, index) => {
    const head = heads[index];
    return {
      key: String(index),
      title: head?.props.children,
      className: head?.props.className,
      align: head?.props.className?.includes("text-right")
        ? ("right" as const)
        : head?.props.className?.includes("text-center")
          ? ("center" as const)
          : ("left" as const),
      render: (_: unknown, record: (typeof data)[number]) =>
        record.cells[index]?.props.children,
      onCell: (record: (typeof data)[number]) => {
        const cell = record.cells[index];
        return {
          className: cell?.props.className,
          colSpan: cell?.props.colSpan as number | undefined,
          rowSpan: cell?.props.rowSpan as number | undefined,
        };
      },
    };
  });
  return (
    <CaptionContext.Provider value={caption?.props.children}>
      <AntTable
        {...props}
        components={{ table: NativeTable }}
        columns={columns}
        showHeader={heads.length > 0}
        dataSource={data}
        pagination={false}
        scroll={{ x: "max-content" }}
        onRow={(record) => {
          const { children: ignored, ...attributes } = record.row;
          return attributes;
        }}
        summary={
          footRows.length
            ? () => (
                <AntTable.Summary>
                  {footRows.map((row, i) => (
                    <AntTable.Summary.Row key={i}>
                      {findParts(row.props.children, ["TableCell"]).map(
                        (cell, j) => (
                          <AntTable.Summary.Cell
                            key={j}
                            index={j}
                            colSpan={cell.props.colSpan as number | undefined}
                            className={cell.props.className}
                          >
                            {cell.props.children}
                          </AntTable.Summary.Cell>
                        ),
                      )}
                    </AntTable.Summary.Row>
                  ))}
                </AntTable.Summary>
              )
            : undefined
        }
      />
    </CaptionContext.Provider>
  );
}
export const PaginationContent = part("PaginationContent");
export const PaginationItem = part("PaginationItem");
export const PaginationLink = part("PaginationLink");
export const PaginationPrevious = part("PaginationPrevious");
export const PaginationNext = part("PaginationNext");
export const PaginationEllipsis = part("PaginationEllipsis");
export function Pagination({ children, ...props }: PartProps) {
  const links = findParts(children, ["PaginationLink"]);
  const active = links.find((link) => link.props.isActive);
  const items = findParts(children, ["PaginationItem"]);
  const selectors: React.ReactElement<PartProps>[] = [];
  let jumpInput: React.ReactElement<PartProps> | undefined;
  function collect(nodes: React.ReactNode) {
    React.Children.forEach(nodes, (node) => {
      if (!React.isValidElement<PartProps>(node)) return;
      if (node.type === RecipeInput && node.props.type === "number")
        jumpInput = node;
      if (role(node) === "NativeSelect") selectors.push(node);
      else collect(node.props.children);
    });
  }
  collect(children);
  const pageSelector = selectors.find((selector) =>
    text(selector.props.children).includes("Page"),
  );
  const rowSelector = selectors.find(
    (selector) => !text(selector.props.children).includes("Page"),
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    Number(rowSelector?.props.defaultValue) || 10,
  );
  const summary = text(children).match(/of\s+(\d+)/i);
  const total = Number(summary?.[1]) || 0;
  const count =
    Math.max(
      rowSelector ? Math.ceil(total / rowsPerPage) : total,
      ...React.Children.toArray(pageSelector?.props.children).map((node) =>
        React.isValidElement<PartProps>(node)
          ? Number(node.props.value) || 0
          : 0,
      ),
      Number(jumpInput?.props.max) || 0,
      0,
      ...links.map((link) => Number(text(link.props.children)) || 0),
    ) || 5;
  const [current, setCurrent] = useState(
    Number(active ? text(active.props.children) : 1) || 1,
  );
  function supplement(nodes: React.ReactNode): React.ReactNode {
    return React.Children.map(nodes, (node) => {
      if (!React.isValidElement<PartProps>(node)) return node;
      if (
        [
          "PaginationLink",
          "PaginationPrevious",
          "PaginationNext",
          "PaginationEllipsis",
        ].includes(role(node) ?? "")
      )
        return null;
      if (node.type === RecipeInput && node.props.type === "number")
        return (
          <InputNumber
            aria-label="Go to page"
            className={node.props.className}
            min={1}
            max={count}
            value={current}
            onChange={(value) => {
              if (value !== null)
                setCurrent(Math.min(count, Math.max(1, Number(value))));
            }}
          />
        );
      if (role(node) === "NativeSelect") {
        const isPage = text(node.props.children).includes("Page");
        return (
          <Select
            aria-label={isPage ? "Page" : "Rows per page"}
            className={node.props.className}
            value={String(isPage ? current : rowsPerPage)}
            options={React.Children.toArray(node.props.children).flatMap(
              (child) =>
                React.isValidElement<PartProps>(child)
                  ? [
                      {
                        value: String(child.props.value),
                        label: child.props.children,
                      },
                    ]
                  : [],
            )}
            onChange={(value) => {
              if (isPage) setCurrent(Number(value));
              else {
                setRowsPerPage(Number(value));
                setCurrent(1);
              }
            }}
          />
        );
      }
      const content = text(node.props.children);
      if (content.match(/^Page\s+\d+\s+of\s+\d+$/))
        return (
          <span className={node.props.className}>
            Page {current} of {count}
          </span>
        );
      if (content.match(/^\d+[-–]\d+\s+of\s+\d+$/))
        return (
          <span className={node.props.className}>
            {(current - 1) * rowsPerPage + 1}-
            {Math.min(total, current * rowsPerPage)} of {total}
          </span>
        );
      return node.props.children
        ? React.cloneElement(node, {
            children: supplement(node.props.children),
          })
        : node;
    });
  }
  return (
    <Space {...props} wrap aria-label="Pagination">
      {items.map((item, index) => (
        <span key={index} className={item.props.className}>
          {supplement(item.props.children)}
        </span>
      ))}
      {links.some((link) =>
        String(link.props["aria-label"]).includes("first"),
      ) && (
        <Button
          aria-label="Go to first page"
          disabled={current === 1}
          onClick={() => setCurrent(1)}
        >
          «
        </Button>
      )}
      <AntPagination
        current={current}
        total={count * 10}
        pageSize={10}
        showSizeChanger={false}
        onChange={(page) => setCurrent(page)}
        itemRender={(page, type, node) => {
          const original =
            type === "page"
              ? links.find((link) => Number(text(link.props.children)) === page)
              : findParts(children, [
                  type === "prev" ? "PaginationPrevious" : "PaginationNext",
                ])[0];
          if (
            !original?.props.onClick ||
            !React.isValidElement<{ onClick?: React.MouseEventHandler }>(node)
          )
            return node;
          return React.cloneElement(node, {
            onClick: (event: React.MouseEvent) => {
              (original.props.onClick as React.MouseEventHandler)(event);
              node.props.onClick?.(event);
            },
          });
        }}
      />
      {links.some((link) =>
        String(link.props["aria-label"]).includes("last"),
      ) && (
        <Button
          aria-label="Go to last page"
          disabled={current === count}
          onClick={() => setCurrent(count)}
        >
          »
        </Button>
      )}
    </Space>
  );
}
