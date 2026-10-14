"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDataGrid } from "./data-grid.jsx";
import { DataGridTableAddRow, DataGridTableBase, DataGridTableBody, DataGridTableEmpty, DataGridTableFillBodyCell, DataGridTableFillHeadCell, DataGridTableFoot, DataGridTableHead, DataGridTableHeadRow, DataGridTableHeadRowCell, DataGridTableHeadRowCellResize, DataGridTableRenderedRow, DataGridTableRowSpacer, DataGridTableViewport, getDataGridHeadCellResizeHeader, getDataGridScrollAreaViewport, getDataGridTableMergedHeaderGroups, getDataGridTableRowSections, getPinningStyles, hasDataGridTableRightPinnedColumns, renderDataGridTableHeadCellContent, } from "./data-grid-table.jsx";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "cn";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
function isSameDataGridTableColumnScrollRequest(previous, next) {
    return (previous?.align === next.align &&
        previous.behavior === next.behavior &&
        previous.columnId === next.columnId &&
        previous.columnIndex === next.columnIndex &&
        previous.scrollElement === next.scrollElement);
}
function isSameDataGridTableScrollRequest(previous, next) {
    return (previous?.align === next.align &&
        previous.behavior === next.behavior &&
        previous.containerElement === next.containerElement &&
        previous.headerSticky === next.headerSticky &&
        previous.isVirtualizationEnabled === next.isVirtualizationEnabled &&
        previous.rowId === next.rowId &&
        previous.rowIndex === next.rowIndex &&
        previous.scrollElement === next.scrollElement);
}
function getDataGridTableScrollTarget({ align, clientHeight, rowBottom, rowHeight, rowTop, scrollHeight, scrollTop, viewportTopOffset = 0, }) {
    const visibleHeight = Math.max(0, clientHeight - viewportTopOffset);
    const viewportTop = scrollTop + viewportTopOffset;
    const viewportBottom = scrollTop + clientHeight;
    const targetTop = align === "auto"
        ? rowTop < viewportTop
            ? rowTop - viewportTopOffset
            : rowBottom > viewportBottom
                ? rowBottom - clientHeight
                : null
        : align === "start"
            ? rowTop - viewportTopOffset
            : align === "end"
                ? rowBottom - clientHeight
                : rowTop -
                    viewportTopOffset -
                    Math.max(0, (visibleHeight - rowHeight) / 2);
    if (targetTop === null)
        return null;
    return Math.min(Math.max(0, targetTop), Math.max(0, scrollHeight - clientHeight));
}
function getDataGridTableHeaderOffset({ containerElement, headerSticky, scrollElement, }) {
    if (!headerSticky)
        return 0;
    const headerElement = containerElement.querySelector(':scope > [data-slot="data-grid-table"] > thead');
    if (!headerElement)
        return 0;
    const scrollRect = scrollElement.getBoundingClientRect();
    const headerRect = headerElement.getBoundingClientRect();
    const headerBottomOffset = headerRect.bottom - scrollRect.top;
    const overlapsViewportTop = headerRect.top <= scrollRect.top + 0.5 && headerBottomOffset > 0;
    if (!overlapsViewportTop)
        return 0;
    return Math.min(scrollElement.clientHeight, Math.max(0, headerBottomOffset));
}
function scrollDataGridTableToOffset({ behavior, scrollElement, targetTop, virtualizer, }) {
    if (virtualizer) {
        virtualizer.scrollToOffset(targetTop, { align: "start", behavior });
    }
    else if (typeof scrollElement.scrollTo === "function") {
        scrollElement.scrollTo({ behavior, top: targetTop });
    }
    else {
        scrollElement.scrollTop = targetTop;
    }
}
function scrollDataGridTableRowIntoView({ align, behavior, cancelPendingScroll = false, containerElement, headerSticky, rowIndex, scrollElement, virtualizer, }) {
    if (!containerElement || !scrollElement)
        return false;
    const rowElement = containerElement.querySelector(`:scope > [data-slot="data-grid-table"] > tbody > tr[data-index="${rowIndex}"]`);
    if (!rowElement)
        return false;
    const scrollRect = scrollElement.getBoundingClientRect();
    const rowRect = rowElement.getBoundingClientRect();
    const viewportTopOffset = getDataGridTableHeaderOffset({
        containerElement,
        headerSticky,
        scrollElement,
    });
    const rowTop = scrollElement.scrollTop + rowRect.top - scrollRect.top;
    const rowBottom = scrollElement.scrollTop + rowRect.bottom - scrollRect.top;
    const targetTop = getDataGridTableScrollTarget({
        align,
        clientHeight: scrollElement.clientHeight,
        rowBottom,
        rowHeight: rowRect.height || rowElement.offsetHeight,
        rowTop,
        scrollHeight: scrollElement.scrollHeight,
        scrollTop: scrollElement.scrollTop,
        viewportTopOffset,
    });
    if (targetTop === null ||
        Math.abs(targetTop - scrollElement.scrollTop) < 0.5) {
        if (cancelPendingScroll) {
            scrollDataGridTableToOffset({
                behavior: "auto",
                scrollElement,
                targetTop: scrollElement.scrollTop,
                virtualizer,
            });
        }
        return true;
    }
    scrollDataGridTableToOffset({
        behavior,
        scrollElement,
        targetTop,
        virtualizer,
    });
    return true;
}
function DataGridTableVirtualPinnedPlaceholderCell({ column, }) {
    const { props } = useDataGrid();
    const isPinned = column.getIsPinned();
    const isLastStartPinned = isPinned === "start" && column.getIsLastColumn("start");
    const isFirstEndPinned = isPinned === "end" && column.getIsFirstColumn("end");
    return (_jsx("td", { "aria-hidden": "true", style: {
            ...(props.tableLayout?.columnsPinnable &&
                column.getCanPin() &&
                getPinningStyles(column)),
            ...(props.tableLayout?.columnsResizable && {
                width: `calc(var(--col-${column.id}-size) * 1px)`,
            }),
        }, "data-pinned": isPinned || undefined, "data-last-col": isLastStartPinned ? "start" : isFirstEndPinned ? "end" : undefined, className: cn("p-0", props.tableLayout?.cellBorder && "border-e", props.tableLayout?.columnsPinnable &&
            column.getCanPin() &&
            "data-pinned:isolate data-pinned:bg-[color:var(--data-grid-surface,var(--data-grid-card-surface,var(--background)))] [&[data-pinned=end][data-last-col=end]]:shadow-[inset_calc(1px*var(--data-grid-dir,1))_0_0_0_var(--border)] [&[data-pinned=start][data-last-col=start]]:shadow-[inset_calc(-1px*var(--data-grid-dir,1))_0_0_0_var(--border)]") }));
}
function DataGridTableVirtualUtilityRow({ table, children, centerCellClassName, centerCellStyle, rowClassName, ariaHidden, }) {
    const { props } = useDataGrid();
    const leftVisibleColumns = table.getStartVisibleLeafColumns();
    const centerVisibleColumns = table.getCenterVisibleLeafColumns();
    const rightVisibleColumns = table.getEndVisibleLeafColumns();
    const hasRightPinnedColumns = hasDataGridTableRightPinnedColumns(table);
    return (_jsxs("tr", { "aria-hidden": ariaHidden || undefined, className: rowClassName, children: [leftVisibleColumns.map((column) => (_jsx(DataGridTableVirtualPinnedPlaceholderCell, { column: column }, column.id))), _jsx("td", { colSpan: Math.max(centerVisibleColumns.length, 1), className: centerCellClassName, style: centerCellStyle, children: children }), props.tableLayout?.columnsResizable && hasRightPinnedColumns ? (_jsx(DataGridTableFillBodyCell, {})) : null, rightVisibleColumns.map((column) => (_jsx(DataGridTableVirtualPinnedPlaceholderCell, { column: column }, column.id))), props.tableLayout?.columnsResizable && !hasRightPinnedColumns ? (_jsx(DataGridTableFillBodyCell, {})) : null] }));
}
function DataGridTableVirtualSpacer({ table, height, }) {
    if (height <= 0)
        return null;
    return (_jsx(DataGridTableVirtualUtilityRow, { table: table, ariaHidden: true, centerCellClassName: "p-0", centerCellStyle: { height, padding: 0 }, children: null }));
}
function DataGridTableVirtualStatusRow({ table, children, className, }) {
    return (_jsx(DataGridTableVirtualUtilityRow, { table: table, centerCellClassName: cn("text-muted-foreground py-4 text-center text-sm", className), children: children }));
}
/**
 * A scroll frame only shifts the window, so every surviving row's inputs are
 * identical and its last render is reused; the per-frame cost is the rows
 * entering the window, not all mounted rows. Cell-level state (selection,
 * focus, row checks) repaints through each cell's own Subscribe, and any real
 * data change rebuilds the row wrappers, so identity comparison is safe.
 */
const MemoizedRenderedRow = memo(DataGridTableRenderedRow, (prev, next) => prev.row === next.row &&
    prev.rowIndex === next.rowIndex &&
    prev.rowRef === next.rowRef &&
    prev.pinnedBoundary === next.pinnedBoundary &&
    prev.centerWindow?.start === next.centerWindow?.start &&
    prev.centerWindow?.end === next.centerWindow?.end);
function DataGridTableVirtualBody({ table, topRows, centerRows, bottomRows, virtualItems, totalSize, isVirtualizationEnabled, isInfiniteMode, isFetchingMore, hasMore, loadingMoreMessage, allRowsLoadedMessage, measureRowRef, centerColumnWindow, }) {
    const { isLoading } = useDataGrid();
    const totalRows = topRows.length + centerRows.length + bottomRows.length;
    if (!totalRows) {
        // Initial load must not flash the empty state as if the query returned
        // nothing.
        if (isLoading) {
            return (_jsx(DataGridTableVirtualStatusRow, { table: table, children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Spinner, { className: "size-4 opacity-60" }), loadingMoreMessage] }) }));
        }
        return _jsx(DataGridTableEmpty, {});
    }
    const hasCenterRows = centerRows.length > 0;
    const showFetchingRow = isInfiniteMode && isFetchingMore;
    const showCompleteRow = isInfiniteMode && hasMore === false && totalRows > 0;
    const hasMiddleSection = hasCenterRows || showFetchingRow || showCompleteRow;
    const leadingSpacerHeight = isVirtualizationEnabled && hasCenterRows && virtualItems.length > 0
        ? (virtualItems[0]?.start ?? 0)
        : 0;
    const trailingSpacerHeight = isVirtualizationEnabled && hasCenterRows && virtualItems.length > 0
        ? Math.max(0, totalSize - (virtualItems[virtualItems.length - 1]?.end ?? 0))
        : 0;
    const renderedRows = [];
    topRows.forEach((row, index) => {
        renderedRows.push(_jsx(MemoizedRenderedRow, { row: row, centerWindow: centerColumnWindow, pinnedBoundary: index === topRows.length - 1 && hasMiddleSection ? "top" : undefined }, row.id));
    });
    if (isVirtualizationEnabled) {
        if (leadingSpacerHeight > 0) {
            renderedRows.push(_jsx(DataGridTableVirtualSpacer, { table: table, height: leadingSpacerHeight }, "virtual-spacer-start"));
        }
        virtualItems.forEach((virtualRow) => {
            const row = centerRows[virtualRow.index];
            if (!row)
                return;
            renderedRows.push(_jsx(MemoizedRenderedRow, { row: row, rowRef: measureRowRef, rowIndex: virtualRow.index, centerWindow: centerColumnWindow }, row.id));
        });
        if (trailingSpacerHeight > 0) {
            renderedRows.push(_jsx(DataGridTableVirtualSpacer, { table: table, height: trailingSpacerHeight }, "virtual-spacer-end"));
        }
    }
    else {
        centerRows.forEach((row, rowIndex) => {
            renderedRows.push(_jsx(MemoizedRenderedRow, { row: row, rowIndex: rowIndex, centerWindow: centerColumnWindow }, row.id));
        });
    }
    if (showFetchingRow) {
        renderedRows.push(_jsx(DataGridTableVirtualStatusRow, { table: table, children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Spinner, { className: "size-4 opacity-60" }), loadingMoreMessage] }) }, "virtual-status-loading"));
    }
    if (showCompleteRow) {
        renderedRows.push(_jsx(DataGridTableVirtualStatusRow, { table: table, className: "py-3 text-xs", children: allRowsLoadedMessage }, "virtual-status-complete"));
    }
    bottomRows.forEach((row, index) => {
        renderedRows.push(_jsx(MemoizedRenderedRow, { row: row, centerWindow: centerColumnWindow, pinnedBoundary: index === 0 && (topRows.length > 0 || hasMiddleSection)
                ? "bottom"
                : undefined }, row.id));
    });
    return _jsx(_Fragment, { children: renderedRows });
}
/**
 * Memoized virtual body: skip re-renders during active column resize.
 * Column widths update via CSS variables on the <table> element,
 * so the browser handles width changes without React re-renders.
 * A cell-selection drag gets the same treatment: painting goes through each
 * cell's own Subscribe, and the virtualizer re-renders itself from inside the
 * memo boundary, so parent-driven reconciliation during the drag is waste.
 */
const MemoizedVirtualBody = memo(DataGridTableVirtualBody, (_prev, next) => !!next.table.state.columnResizing.isResizingColumn ||
    next.table._isSelectingCells === true);
function DataGridTableVirtual({ height, estimateSize = 48, overscan = 10, scrollBehavior = "auto", scrollToRowAlign = "auto", scrollToRowIndex, columnVirtualizerOptions, scrollToColumnAlign = "auto", scrollToColumnIndex, footerContent, renderHeader = true, onFetchMore, isFetchingMore = false, hasMore, fetchMoreOffset = 0, virtualizerOptions, }) {
    const { i18n, table, props } = useDataGrid();
    const mergedHeaderGroups = getDataGridTableMergedHeaderGroups(table);
    const hasRightPinnedColumns = hasDataGridTableRightPinnedColumns(table);
    const centerVisibleColumns = table.getCenterVisibleLeafColumns();
    // Column windows only where the geometry is provable: a fixed table
    // layout (undefined defaults to fixed; the colgroup then owns every
    // width, so colSpan spacers cannot drift) and a single ungrouped header
    // row (a colSpan group or meta.headerColSpan cell cannot be windowed).
    // Anything else falls back to full-column rendering silently, the same
    // posture as row virtualization toward unsupported shapes.
    const columnVirtualizationActive = columnVirtualizerOptions?.enabled === true &&
        props.tableLayout?.width !== "auto" &&
        mergedHeaderGroups.length === 1 &&
        (mergedHeaderGroups[0]?.headers.every((header) => header.colSpan <= 1) ??
            false) &&
        !mergedHeaderGroups[0]?.coveredHeaders.size;
    const { topRows, centerRows, bottomRows } = getDataGridTableRowSections(table, props.tableLayout?.rowsPinnable);
    const isInfiniteMode = typeof onFetchMore === "function";
    const [viewportElements, setViewportElements] = useState({
        containerElement: null,
        scrollElement: null,
    });
    const { estimateSize: customEstimateSize, getItemKey: customGetItemKey, getScrollElement: customGetScrollElement, measureElement: customMeasureElement, overscan: customOverscan, ...virtualizerOptionsRest } = virtualizerOptions ?? {};
    const isVirtualizationEnabled = virtualizerOptions?.enabled !== false;
    const loadingMoreMessage = props.fetchingMoreMessage || props.loadingMessage || i18n.labels.loading;
    const allRowsLoadedMessage = props.allRowsLoadedMessage || i18n.labels.allRowsLoaded;
    const handleViewportRef = useCallback((node) => {
        setViewportElements({
            containerElement: node,
            scrollElement: node
                ? (getDataGridScrollAreaViewport(node) ?? node)
                : null,
        });
    }, []);
    const usesExternalScrollArea = viewportElements.scrollElement !== null &&
        viewportElements.scrollElement !== viewportElements.containerElement;
    const resolveScrollElement = useCallback(() => {
        if (customGetScrollElement) {
            return customGetScrollElement(viewportElements);
        }
        return viewportElements.scrollElement;
    }, [customGetScrollElement, viewportElements]);
    const resolveItemKey = useCallback((index) => {
        const row = centerRows[index];
        if (!row)
            return index;
        return customGetItemKey?.(index, row) ?? row.id ?? index;
    }, [centerRows, customGetItemKey]);
    const resolveEstimateSize = useCallback((index) => {
        const row = centerRows[index];
        return row
            ? (customEstimateSize?.(index, row) ?? estimateSize)
            : estimateSize;
    }, [centerRows, customEstimateSize, estimateSize]);
    const virtualizer = useVirtualizer({
        count: centerRows.length,
        getScrollElement: resolveScrollElement,
        getItemKey: resolveItemKey,
        estimateSize: resolveEstimateSize,
        overscan: customOverscan ?? overscan,
        measureElement: customMeasureElement,
        ...virtualizerOptionsRest,
    });
    // Horizontal offsets invert in RTL; the virtualizer must be told.
    const isRtl = useMemo(() => viewportElements.containerElement
        ? getComputedStyle(viewportElements.containerElement).direction ===
            "rtl"
        : false, [viewportElements.containerElement]);
    const resolveColumnKey = useCallback((index) => centerVisibleColumns[index]?.id ?? index, [centerVisibleColumns]);
    const resolveColumnEstimateSize = useCallback((index) => centerVisibleColumns[index]?.getSize() ?? 0, [centerVisibleColumns]);
    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        isRtl,
        count: columnVirtualizationActive ? centerVisibleColumns.length : 0,
        getScrollElement: resolveScrollElement,
        getItemKey: resolveColumnKey,
        estimateSize: resolveColumnEstimateSize,
        overscan: columnVirtualizerOptions?.overscan ?? 3,
    });
    // Column sizes are exact reads of getSize(), never DOM-measured, so a
    // resize commit or a visibility/order/pinning change must resync the
    // virtualizer's cached sizes by hand.
    useEffect(() => {
        if (columnVirtualizationActive)
            columnVirtualizer.measure();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        columnVirtualizationActive,
        columnVirtualizer,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        table.state.columnSizing,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        table.state.columnVisibility,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        table.state.columnOrder,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        table.state.columnPinning,
    ]);
    const virtualColumns = columnVirtualizationActive
        ? columnVirtualizer.getVirtualItems()
        : [];
    // The window is a contiguous inclusive [start, end] over the center
    // columns; before the scroll element resolves the item list is empty and
    // the grid renders full-width for that first frame.
    const centerColumnWindow = columnVirtualizationActive && virtualColumns.length > 0
        ? {
            start: virtualColumns[0].index,
            end: virtualColumns[virtualColumns.length - 1].index,
        }
        : undefined;
    const virtualItems = isVirtualizationEnabled
        ? virtualizer.getVirtualItems()
        : [];
    const totalSize = isVirtualizationEnabled ? virtualizer.getTotalSize() : 0;
    const measureRowRef = isVirtualizationEnabled && customMeasureElement
        ? virtualizer.measureElement
        : undefined;
    const resolvedFetchMoreOffset = Math.max(0, fetchMoreOffset);
    const scrollToRowId = scrollToRowIndex !== undefined
        ? centerRows[scrollToRowIndex]?.id
        : undefined;
    const scrollToRowVirtualItem = isVirtualizationEnabled && scrollToRowIndex !== undefined
        ? virtualItems.find((item) => item.index === scrollToRowIndex)
        : undefined;
    const pendingScrollToRowIndexRef = useRef(null);
    const lastScrollRequestRef = useRef(null);
    // Latch onFetchMore per row count: virtualItems gets a new identity every
    // scroll frame, so without it the effect fires duplicate page requests
    // before the consumer flips isFetchingMore, and loops at end-of-data when
    // hasMore is never set.
    const fetchMoreFiredAtCountRef = useRef(null);
    const lastColumnScrollRequestRef = useRef(null);
    // Controlled column reveal: same dedupe posture as the row request - the
    // signature keeps ordinary renders from re-scrolling, and exact column
    // sizes mean no post-measure follow-up pass is needed.
    useEffect(() => {
        if (!columnVirtualizationActive ||
            scrollToColumnIndex === undefined ||
            scrollToColumnIndex < 0 ||
            scrollToColumnIndex >= centerVisibleColumns.length ||
            !viewportElements.scrollElement) {
            return;
        }
        const request = {
            align: scrollToColumnAlign,
            behavior: scrollBehavior,
            columnId: centerVisibleColumns[scrollToColumnIndex]?.id,
            columnIndex: scrollToColumnIndex,
            scrollElement: viewportElements.scrollElement,
        };
        if (isSameDataGridTableColumnScrollRequest(lastColumnScrollRequestRef.current, request)) {
            return;
        }
        lastColumnScrollRequestRef.current = request;
        columnVirtualizer.scrollToIndex(scrollToColumnIndex, {
            align: scrollToColumnAlign,
            behavior: scrollBehavior === "smooth" ? "smooth" : "auto",
        });
    }, [
        columnVirtualizationActive,
        columnVirtualizer,
        centerVisibleColumns,
        scrollToColumnAlign,
        scrollToColumnIndex,
        scrollBehavior,
        viewportElements.scrollElement,
    ]);
    // Resolve after every commit so a stable getter can expose a replaced ref;
    // the request signature prevents duplicate scrolling on ordinary renders.
    useEffect(() => {
        const previousRequest = lastScrollRequestRef.current;
        if (scrollToRowIndex === undefined ||
            scrollToRowIndex < 0 ||
            scrollToRowIndex >= centerRows.length) {
            pendingScrollToRowIndexRef.current = null;
            lastScrollRequestRef.current = null;
            if (previousRequest) {
                const scrollElement = resolveScrollElement();
                if (scrollElement) {
                    scrollDataGridTableToOffset({
                        behavior: "auto",
                        scrollElement,
                        targetTop: scrollElement.scrollTop,
                        virtualizer: isVirtualizationEnabled ? virtualizer : undefined,
                    });
                }
            }
            return;
        }
        const scrollElement = resolveScrollElement();
        const containerElement = viewportElements.containerElement;
        if (!containerElement || !scrollElement)
            return;
        const headerSticky = renderHeader && !!props.tableLayout?.headerSticky;
        const nextRequest = {
            align: scrollToRowAlign,
            behavior: scrollBehavior,
            containerElement,
            headerSticky,
            isVirtualizationEnabled,
            rowId: scrollToRowId,
            rowIndex: scrollToRowIndex,
            scrollElement,
        };
        if (isSameDataGridTableScrollRequest(previousRequest, nextRequest))
            return;
        pendingScrollToRowIndexRef.current = null;
        const rowWasHandled = scrollDataGridTableRowIntoView({
            align: scrollToRowAlign,
            behavior: scrollBehavior,
            cancelPendingScroll: previousRequest !== null,
            containerElement,
            headerSticky,
            rowIndex: scrollToRowIndex,
            scrollElement,
            virtualizer: isVirtualizationEnabled ? virtualizer : undefined,
        });
        if (rowWasHandled) {
            lastScrollRequestRef.current = nextRequest;
            return;
        }
        if (!isVirtualizationEnabled)
            return;
        pendingScrollToRowIndexRef.current = scrollToRowIndex;
        lastScrollRequestRef.current = nextRequest;
        virtualizer.scrollToIndex(scrollToRowIndex, {
            align: scrollToRowAlign,
            behavior: scrollBehavior,
        });
    });
    useEffect(() => {
        if (!isVirtualizationEnabled ||
            scrollToRowIndex === undefined ||
            pendingScrollToRowIndexRef.current !== scrollToRowIndex ||
            !scrollToRowVirtualItem) {
            return;
        }
        const rowWasHandled = scrollDataGridTableRowIntoView({
            align: scrollToRowAlign,
            behavior: "auto",
            cancelPendingScroll: true,
            containerElement: viewportElements.containerElement,
            headerSticky: renderHeader && !!props.tableLayout?.headerSticky,
            rowIndex: scrollToRowIndex,
            scrollElement: resolveScrollElement(),
            virtualizer,
        });
        if (rowWasHandled) {
            pendingScrollToRowIndexRef.current = null;
        }
    }, [
        isVirtualizationEnabled,
        props.tableLayout?.headerSticky,
        renderHeader,
        resolveScrollElement,
        scrollToRowAlign,
        scrollToRowIndex,
        scrollToRowVirtualItem,
        virtualizer,
        viewportElements.containerElement,
    ]);
    useEffect(() => {
        if (!isVirtualizationEnabled ||
            !isInfiniteMode ||
            hasMore === false ||
            isFetchingMore) {
            return;
        }
        const lastItem = virtualItems[virtualItems.length - 1];
        if (!lastItem)
            return;
        if (fetchMoreFiredAtCountRef.current === centerRows.length)
            return;
        if (lastItem.index >= centerRows.length - 1 - resolvedFetchMoreOffset) {
            fetchMoreFiredAtCountRef.current = centerRows.length;
            onFetchMore?.();
        }
    }, [
        centerRows.length,
        hasMore,
        isFetchingMore,
        isInfiniteMode,
        isVirtualizationEnabled,
        onFetchMore,
        resolvedFetchMoreOffset,
        virtualItems,
    ]);
    // The header re-renders only when its real inputs move: the table
    // wrapper (any table state change recreates it), the layout props, and
    // the column window. A scroll frame changes none of them, so the whole
    // sortable-header subtree is reused instead of rebuilt per frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const headerNode = useMemo(() => renderHeader && (_jsx(DataGridTableHead, { children: mergedHeaderGroups.map((headerGroup, rowIndex) => {
            // The fill strip is one cell spanning every head row, so only
            // the first row renders it.
            const fillHeadCell = props.tableLayout?.columnsResizable && rowIndex === 0 ? (_jsx(DataGridTableFillHeadCell, { rowSpan: mergedHeaderGroups.length })) : null;
            const renderHeadCell = (header) => {
                const coveredHeaders = headerGroup.coveredHeaders.get(header.id);
                const resizeHeader = getDataGridHeadCellResizeHeader(header, coveredHeaders);
                return (_jsxs(DataGridTableHeadRowCell, { header: header, coveredHeaders: coveredHeaders, children: [renderDataGridTableHeadCellContent(header), props.tableLayout?.columnsResizable &&
                            resizeHeader.column.getCanResize() && (_jsx(DataGridTableHeadRowCellResize, { header: resizeHeader }))] }, header.id));
            };
            return (_jsxs(DataGridTableHeadRow, { rowId: headerGroup.id, children: [centerColumnWindow
                        ? headerGroup.startHeaders.map(renderHeadCell)
                        : null, centerColumnWindow && centerColumnWindow.start > 0 ? (_jsx("th", { "aria-hidden": "true", "data-col-spacer": "start", colSpan: centerColumnWindow.start, className: "p-0" })) : null, centerColumnWindow
                        ? headerGroup.centerHeaders
                            .slice(centerColumnWindow.start, centerColumnWindow.end + 1)
                            .map(renderHeadCell)
                        : null, centerColumnWindow &&
                        centerVisibleColumns.length - 1 - centerColumnWindow.end > 0 ? (_jsx("th", { "aria-hidden": "true", "data-col-spacer": "end", colSpan: centerVisibleColumns.length - 1 - centerColumnWindow.end, className: "p-0" })) : null, !centerColumnWindow &&
                        [
                            ...headerGroup.startHeaders,
                            ...headerGroup.centerHeaders,
                        ].map(renderHeadCell), hasRightPinnedColumns ? fillHeadCell : null, headerGroup.endHeaders.map(renderHeadCell), !hasRightPinnedColumns ? fillHeadCell : null] }, headerGroup.id));
        }) })), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        renderHeader,
        table,
        props.tableLayout,
        centerColumnWindow,
        hasRightPinnedColumns,
    ]);
    return (_jsx(DataGridTableViewport, { viewportRef: handleViewportRef, className: !usesExternalScrollArea ? "block" : undefined, style: usesExternalScrollArea
            ? undefined
            : {
                height,
                overflow: "auto",
                position: "relative",
                // Standalone mode: this node IS the scroll container, so it
                // must stay at its parent's width (not the resizable table
                // width) or horizontal scrolling becomes impossible.
                width: "auto",
            }, children: _jsxs(DataGridTableBase, { children: [headerNode, renderHeader &&
                    (props.tableLayout?.stripped || !props.tableLayout?.rowBorder) && (_jsx(DataGridTableRowSpacer, {})), _jsxs(DataGridTableBody, { children: [_jsx(MemoizedVirtualBody, { table: table, topRows: topRows, centerRows: centerRows, bottomRows: bottomRows, virtualItems: virtualItems, totalSize: totalSize, isVirtualizationEnabled: isVirtualizationEnabled, isInfiniteMode: isInfiniteMode, isFetchingMore: isFetchingMore, hasMore: hasMore, loadingMoreMessage: loadingMoreMessage, allRowsLoadedMessage: allRowsLoadedMessage, measureRowRef: measureRowRef, centerColumnWindow: centerColumnWindow }), props.appendRow, _jsx(DataGridTableAddRow, {})] }), footerContent && (_jsx(DataGridTableFoot, { children: footerContent }))] }) }));
}
export { DataGridTableVirtual };
