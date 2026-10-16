"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createContext, memo, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, } from "react";
import { useDataGrid } from "./data-grid.jsx";
import { DataGridTableBase, DataGridTableBody, DataGridTableBodyRow, DataGridTableBodyRowCell, DataGridTableBodyRowExpandded, DataGridTableBodyRowSkeleton, DataGridTableBodyRowSkeletonCell, DataGridTableEmpty, DataGridTableFillBodyCell, DataGridTableFillHeadCell, DataGridTableFoot, DataGridTableHead, DataGridTableHeadRow, DataGridTableHeadRowCell, DataGridTableHeadRowCellResize, DataGridTableRowSpacer, DataGridTableViewport, getDataGridHeadCellResizeHeader, getDataGridTableMergedHeaderGroups, renderDataGridTableHeadCellContent, } from "./data-grid-table.jsx";
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, sortableKeyboardCoordinates, useSortable, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender } from "@tanstack/react-table";
import { cn } from "cn";
import { createPortal } from "react-dom";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const SortableRowContext = createContext(null);
function DataGridTableDndRowHandle({ className, disabled, disabledLabel, }) {
    const { i18n } = useDataGrid();
    const context = useContext(SortableRowContext);
    const resolvedDisabledLabel = disabledLabel ?? i18n.labels.reorderingUnavailable;
    if (!context || disabled) {
        return (_jsx(Button, { variant: "ghost", size: "icon-sm", className: cn("size-7 cursor-grab opacity-70 hover:bg-transparent hover:opacity-100 active:cursor-grabbing", 
            // The Button's own disabled treatment supplies the muting; only the
            // cursor needs saying, so the grip reads as unavailable rather than
            // merely unresponsive.
            disabled && "cursor-not-allowed", className), "aria-label": disabled ? resolvedDisabledLabel : i18n.labels.dragToReorderRow, title: disabled ? resolvedDisabledLabel : undefined, disabled: true, children: _jsx(IconPlaceholder, { lucide: "GripHorizontalIcon", tabler: "IconGripHorizontal", hugeicons: "DragDropHorizontalIcon", phosphor: "DotsSixIcon", remixicon: "RiDraggable", "aria-hidden": "true" }) }));
    }
    return (_jsx(Button, { variant: "ghost", size: "icon-sm", className: cn("size-7 cursor-grab opacity-70 hover:bg-transparent hover:opacity-100 active:cursor-grabbing", className), "aria-label": i18n.labels.dragToReorderRow, ...context.attributes, ...context.listeners, children: _jsx(IconPlaceholder, { lucide: "GripHorizontalIcon", tabler: "IconGripHorizontal", hugeicons: "DragDropHorizontalIcon", phosphor: "DotsSixIcon", remixicon: "RiDraggable", "aria-hidden": "true" }) }));
}
/**
 * The rows do not move while one is being carried.
 *
 * Sliding the siblings apart opens a gap the carried row could go into, which
 * reads well in a list of identical rows and badly in a table: the gap is the
 * height of the row you are holding, so with rows of unequal height it never
 * matches the slot it claims to be, and the row you picked up slides away from
 * where it started - which is exactly the position you need to remember if you
 * decide not to drop it.
 *
 * Holding everything still keeps the origin legible, and nothing is lost: the
 * DragOverlay clone follows the pointer and the drop indicator names the seam.
 * Pass `verticalListSortingStrategy` as `sortingStrategy` for the old feel.
 */
const holdRowsInPlaceStrategy = () => null;
function DataGridTableDndRow({ row, renderRowDecoration, dropIndicator = true, }) {
    const rowData = {
        type: "data-grid-row",
        depth: row.depth,
        index: row.index,
        parentId: row.getParentRow()?.id ?? null,
    };
    const { transform, setNodeRef, isDragging, isOver, attributes, listeners, index, activeIndex, overIndex, } = useSortable({
        id: row.id,
        data: rowData,
    });
    // Which edge of THIS row the carried row would land on, or null when it is
    // not the drop target. Nothing slides apart any more, so the bar is the only
    // thing that says where the drop goes: it marks the row at the destination
    // index, on the side the carried row comes to rest.
    //
    // Dragging down it lands after the target, dragging up before it, so the
    // edge follows the direction of travel.
    const dropEdge = dropIndicator && activeIndex !== -1 && index === overIndex && !isDragging
        ? activeIndex < overIndex
            ? "bottom"
            : "top"
        : null;
    const style = {
        transform: CSS.Transform.toString(transform),
        // dnd-kit's transition is deliberately dropped. A transition on a transform
        // property of a `tr` does not merely fail to animate in Chrome, it stops the
        // transform applying at all: the element sits at the start value forever.
        // The drag source escapes it because dnd-kit disables its own transition
        // while it is being dragged, which is why the carried row used to be the
        // ONLY one that moved and every other row silently refused to open a gap.
        // Displacement therefore lands in one step, which is what a table wants.
        zIndex: isDragging ? 1 : 0,
        position: "relative",
        cursor: isDragging ? "grabbing" : undefined,
        // The row you are holding is drawn by the DragOverlay, so the one left
        // behind is not a second copy of it - it is the slot you came from, and it
        // stays exactly where it was. Fading alone read as "this row is busy";
        // the outline says "this is the space you are moving out of", which is the
        // thing you need if you change your mind mid-drag.
        ...(isDragging && {
            opacity: 0.4,
            // Inset so the dashes sit inside the row box and cannot be clipped by
            // the neighbouring row's border.
            outline: "1px dashed var(--border)",
            outlineOffset: "-1px",
        }),
    };
    const decoration = renderRowDecoration?.({ row, isDragging, isOver });
    const cells = row.getVisibleCells();
    const lastCell = cells[cells.length - 1];
    const renderCell = (cell) => (_jsxs(DataGridTableBodyRowCell, { cell: cell, children: [flexRender(cell.column.columnDef.cell, cell.getContext()), decoration && cell === lastCell ? (
            // Rides inside the last cell rather than in a `td` of its own.
            // An absolutely positioned `td` is still a cell as far as table
            // layout is concerned, so it added a NINTH column with no width
            // of its own, and under `table-layout: fixed` that new column
            // swallowed the whole surplus the real columns had been sharing,
            // so every column snapped back to its declared size and the row's
            // content visibly narrowed the moment a drag began. A plain
            // element adds no column. It anchors to the ROW, the nearest
            // positioned ancestor, and spans the full width, unless the last
            // cell is a sticky end-pinned one: that cell is positioned itself
            // and confines the decoration to its own width.
            _jsx("div", { "aria-hidden": "true", "data-slot": "data-grid-table-row-decoration", className: "pointer-events-none absolute inset-0", children: decoration })) : null, dropEdge && cell === lastCell ? (
            // Same anchoring trick as the decoration above: a plain
            // element inside the last cell, so it adds no column and
            // cannot disturb `table-layout: fixed`. It spans the row, with
            // the same sticky end-pinned exception.
            _jsx("div", { "aria-hidden": "true", "data-slot": "data-grid-table-row-drop-indicator", "data-edge": dropEdge, className: "pointer-events-none absolute inset-0 z-20", children: _jsx("span", { className: "bg-primary absolute inset-y-0 start-0 w-0.5" }) })) : null] }, cell.id));
    return (_jsxs(SortableRowContext.Provider, { value: { attributes, listeners }, children: [_jsx(DataGridTableBodyRow, { row: row, dndRef: setNodeRef, dndStyle: style, dndDragging: isDragging, children: [
                    ...cells
                        .filter((cell) => cell.column.getIsPinned() !== "end")
                        .map(renderCell),
                    _jsx(DataGridTableFillBodyCell, {}, "__data-grid-fill"),
                    ...cells
                        .filter((cell) => cell.column.getIsPinned() === "end")
                        .map(renderCell),
                ] }), row.getIsExpanded() && _jsx(DataGridTableBodyRowExpandded, { row: row })] }));
}
function DataGridTableDndRowsBody({ table, dataIds, renderRowDecoration, dropIndicator, sortingStrategy, }) {
    const { isLoading, props } = useDataGrid();
    const pagination = table.state.pagination;
    if (props.loadingMode === "skeleton" && isLoading && pagination?.pageSize) {
        return (_jsx(_Fragment, { children: Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (_jsx(DataGridTableBodyRowSkeleton, { children: [
                    ...[
                        ...table.getStartVisibleLeafColumns(),
                        ...table.getCenterVisibleLeafColumns(),
                    ].map((column) => (_jsx(DataGridTableBodyRowSkeletonCell, { column: column, children: column.columnDef.meta?.skeleton }, column.id))),
                    _jsx(DataGridTableFillBodyCell, {}, "__data-grid-fill"),
                    ...table.getEndVisibleLeafColumns().map((column) => (_jsx(DataGridTableBodyRowSkeletonCell, { column: column, children: column.columnDef.meta?.skeleton }, column.id))),
                ] }, rowIndex))) }));
    }
    if (!table.getRowModel().rows.length)
        return _jsx(DataGridTableEmpty, {});
    return (_jsx(SortableContext, { items: dataIds, strategy: sortingStrategy, children: table.getRowModel().rows.map((row) => {
            return (_jsx(DataGridTableDndRow, { row: row, renderRowDecoration: renderRowDecoration, dropIndicator: dropIndicator }, row.id));
        }) }));
}
/**
 * Memoized body rows: skip re-renders during active column resize.
 * Column widths update via CSS variables on the <table> element,
 * so the browser handles width changes without React re-renders.
 */
const MemoizedDataGridTableDndRowsBody = memo(DataGridTableDndRowsBody, (_prev, next) => !!next.table.state.columnResizing.isResizingColumn);
function DataGridTableDndRows({ handleDragEnd, dataIds, footerContent, collisionDetection = closestCenter, modifiers, sortingStrategy = holdRowsInPlaceStrategy, renderRowDecoration, dropIndicator = true, onDragStart, onDragMove, onDragOver, onDragCancel, accessibility, }) {
    const { table, props } = useDataGrid();
    const mergedHeaderGroups = getDataGridTableMergedHeaderGroups(table);
    const tableContainerRef = useRef(null);
    const [isDraggingRow, setIsDraggingRow] = useState(false);
    // The overlay is portalled to the document body. dnd-kit renders DragOverlay
    // in place, and it positions with `position: fixed` against viewport
    // coordinates - so any ancestor that establishes a containing block for fixed
    // descendants silently re-anchors it. `content-visibility`, `contain`,
    // `transform`, `filter` and `will-change` all do that, and the first two are
    // exactly what a card grid uses to defer off-screen work. The clone then
    // lands offset by that ancestor's own top/left, and the container clamp
    // below mis-clamps too, because its rects are measured in viewport space.
    //
    // Resolved in an effect rather than read at render so the server and the
    // first client render agree. A drag cannot start before hydration, so the
    // overlay being absent for one frame costs nothing.
    const [portalTarget, setPortalTarget] = useState(null);
    useEffect(() => {
        setPortalTarget(document.body);
    }, []);
    // The row being carried, plus the column widths measured off the header the
    // moment the drag starts. The clone lives outside the table, so it has no
    // columns of its own and has to be told what they are.
    const [carried, setCarried] = useState(null);
    const pickUpRow = useCallback((id) => {
        const container = tableContainerRef.current;
        const head = container?.querySelector("thead tr");
        if (!container || !head) {
            setCarried(null);
            return;
        }
        // The clone has to be exactly as tall as the row it was lifted from.
        // A fixed height reads as the grid growing under the pointer the moment
        // you pick a row up, and it is wrong in both directions: rows whose
        // content wraps are taller than any constant, and dense rows are shorter.
        const source = Array.from(container.querySelectorAll("tbody tr[data-row-id]")).find((candidate) => candidate.dataset.rowId === String(id));
        const height = source?.getBoundingClientRect().height ?? 0;
        // The fill cell is a spacer that soaks up the surplus a column resize
        // leaves behind, and the clone renders data cells only. Measuring it in
        // would make the clone's table wider than the cells it actually holds,
        // and `table-fixed` hands that orphaned width back out across every column
        // -- the carried row comes out visibly wider than the row it was lifted
        // from. So the width is the sum of what we render, never the header's own.
        // Read off the source row, one cell per column: a head cell can span
        // several (a group, a merged or a meta.headerColSpan cell).
        const columns = Array.from(source?.children ?? head.children)
            .filter((cell) => cell.getAttribute("data-slot") !== "data-grid-table-fill-body-cell" &&
            cell.getAttribute("data-slot") !== "data-grid-table-fill-head-cell")
            .map((cell) => cell.getBoundingClientRect().width);
        // Inline padding is read off the source cells for the same reason. A fixed
        // px-3 ignored edgeCell and cellClassName, so a 44px grip column holding a
        // 28px handle overflowed by 8px and truncate painted an ellipsis beside it.
        const padding = Array.from(source?.children ?? [])
            .filter((cell) => cell.getAttribute("data-slot") !== "data-grid-table-fill-body-cell")
            .map((cell) => {
            const style = getComputedStyle(cell);
            return { start: style.paddingInlineStart, end: style.paddingInlineEnd };
        });
        setCarried({
            id,
            width: columns.reduce((total, width) => total + width, 0),
            height,
            columns,
            padding,
        });
    }, []);
    const carriedRow = carried
        ? table
            .getRowModel()
            .rows.find((row) => row.id === carried.id)
        : undefined;
    const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), 
    // Keyboard reordering moves one sortable position per keypress instead
    // of the sensor's raw 25px default.
    useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }));
    useEffect(() => {
        if (!isDraggingRow)
            return;
        const { body, documentElement } = document;
        const previousBodyCursor = body.style.cursor;
        const previousDocumentCursor = documentElement.style.cursor;
        body.style.cursor = "grabbing";
        documentElement.style.cursor = "grabbing";
        return () => {
            body.style.cursor = previousBodyCursor;
            documentElement.style.cursor = previousDocumentCursor;
        };
    }, [isDraggingRow]);
    const resolvedModifiers = useMemo(() => {
        const restrictToTableContainer = ({ transform, draggingNodeRect, }) => {
            if (!tableContainerRef.current || !draggingNodeRect) {
                return transform;
            }
            const containerRect = tableContainerRef.current.getBoundingClientRect();
            const { x, y } = transform;
            const minX = containerRect.left - draggingNodeRect.left;
            const maxX = containerRect.right - draggingNodeRect.right;
            const minY = containerRect.top - draggingNodeRect.top;
            const maxY = containerRect.bottom - draggingNodeRect.bottom;
            return {
                ...transform,
                // The horizontal rail only engages while the default axis restriction
                // is in force. A row is exactly as wide as the viewport, so minX and
                // maxX both collapse to 0 and clamping x erases it entirely: harmless
                // under restrictToVerticalAxis, which zeroes x anyway, but fatal for a
                // caller that replaced the restriction precisely to READ x, as a tree
                // does to resolve drop depth. Vertical is railed either way, which is
                // what actually keeps a dragged row inside the grid.
                x: modifiers ? x : Math.max(minX, Math.min(maxX, x)),
                y: Math.max(minY, Math.min(maxY, y)),
            };
        };
        // The container clamp is a safety rail rather than a policy, so it stays
        // applied even when the caller replaces the axis restriction.
        return [
            ...(modifiers ?? [restrictToVerticalAxis]),
            restrictToTableContainer,
        ];
    }, [modifiers]);
    return (_jsxs(DndContext, { id: useId(), accessibility: accessibility, collisionDetection: collisionDetection, modifiers: resolvedModifiers, onDragCancel: (event) => {
            setIsDraggingRow(false);
            setCarried(null);
            onDragCancel?.(event);
        }, onDragEnd: (event) => {
            setIsDraggingRow(false);
            setCarried(null);
            handleDragEnd(event);
        }, onDragMove: onDragMove, onDragOver: onDragOver, onDragStart: (event) => {
            setIsDraggingRow(true);
            pickUpRow(event.active.id);
            onDragStart?.(event);
        }, sensors: sensors, children: [_jsx(DataGridTableViewport, { viewportRef: tableContainerRef, className: isDraggingRow
                    ? "relative cursor-grabbing [&_*]:cursor-grabbing!"
                    : "relative", children: _jsxs(DataGridTableBase, { children: [_jsx(DataGridTableHead, { children: mergedHeaderGroups.map((headerGroup, index) => {
                                const renderHeader = (header) => {
                                    const coveredHeaders = headerGroup.coveredHeaders.get(header.id);
                                    const resizeHeader = getDataGridHeadCellResizeHeader(header, coveredHeaders);
                                    return (_jsxs(DataGridTableHeadRowCell, { header: header, coveredHeaders: coveredHeaders, children: [renderDataGridTableHeadCellContent(header), props.tableLayout?.columnsResizable &&
                                                resizeHeader.column.getCanResize() && (_jsx(DataGridTableHeadRowCellResize, { header: resizeHeader }))] }, header.id));
                                };
                                return (_jsx(DataGridTableHeadRow, { rowId: headerGroup.id, children: [
                                        ...[
                                            ...headerGroup.startHeaders,
                                            ...headerGroup.centerHeaders,
                                        ].map(renderHeader),
                                        ...(index === 0
                                            ? [
                                                _jsx(DataGridTableFillHeadCell, { rowSpan: mergedHeaderGroups.length }, "__data-grid-fill"),
                                            ]
                                            : []),
                                        ...headerGroup.endHeaders.map(renderHeader),
                                    ] }, index));
                            }) }), (props.tableLayout?.stripped || !props.tableLayout?.rowBorder) && (_jsx(DataGridTableRowSpacer, {})), _jsx(DataGridTableBody, { children: _jsx(MemoizedDataGridTableDndRowsBody, { table: table, dataIds: dataIds, renderRowDecoration: renderRowDecoration, dropIndicator: dropIndicator, sortingStrategy: sortingStrategy }) }), footerContent && (_jsx(DataGridTableFoot, { children: footerContent }))] }) }), portalTarget
                ? createPortal(_jsx(DragOverlay, { dropAnimation: null, children: carried && carriedRow ? (_jsx("table", { "aria-hidden": "true", style: { width: carried.width, tableLayout: "fixed" }, className: "bg-background border-border pointer-events-none cursor-grabbing rounded-md border shadow-lg", children: _jsx("tbody", { children: _jsx("tr", { style: { height: carried.height || undefined }, className: "[&>td]:p-0 [&>td]:align-middle", children: carriedRow
                                    .getVisibleCells()
                                    .map((cell, index) => (_jsx("td", { 
                                    // Falls back to the column's own size so an unforeseen
                                    // header/cell count mismatch degrades to a real width
                                    // rather than to `auto`.
                                    style: {
                                        width: carried.columns[index] ??
                                            cell.column.getSize(),
                                    }, children: _jsx("div", { className: cn("truncate", !carried.padding[index] && "px-3"), style: {
                                            paddingInlineStart: carried.padding[index]?.start,
                                            paddingInlineEnd: carried.padding[index]?.end,
                                        }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }) }, cell.id))) }) }) })) : null }), portalTarget)
                : null] }));
}
export { DataGridTableDndRowHandle, DataGridTableDndRows };
