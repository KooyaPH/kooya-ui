"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useLayoutEffect, useMemo, useRef } from "react";
import { getColumnHeaderLabel, getDataGridHeaderSpans, useDataGrid, } from "./data-grid.jsx";
import { Subscribe } from "@tanstack/react-table";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Unpinning moves a column into another header list (pinned, windowed center),
// which remounts its header, so the focus request outlives the button: the next
// header rendered for that column takes it. `column` is a stable reference.
const pendingUnpinFocus = new WeakSet();
function DataGridColumnHeaderInner({ column, title, icon, className, filter, visibility = false, }) {
    const { i18n, isLoading, table, props } = useDataGrid();
    const resolvedTitle = title ?? getColumnHeaderLabel(column);
    // The order a move rewrites: the consumer's columnOrder (TanStack defaults it
    // to []), then every leaf it leaves out, in definition order - the same
    // completion TanStack applies when rendering, so a rendered neighbour is
    // always present to re-seat beside, even after columns are added later.
    const columnOrderState = table.state.columnOrder;
    const definitionOrder = table
        .getAllColumns()
        .flatMap((topColumn) => topColumn.getLeafColumns())
        .map((leafColumn) => leafColumn.id);
    const columnOrder = [
        ...columnOrderState,
        ...definitionOrder.filter((id) => !columnOrderState.includes(id)),
    ];
    const columnVisibilityKey = props.tableLayout?.columnsVisibility && visibility
        ? JSON.stringify(table.state.columnVisibility)
        : "";
    const isSorted = column.getIsSorted();
    const isPinned = column.getIsPinned();
    const menuTriggerRef = useRef(null);
    useLayoutEffect(() => {
        if (pendingUnpinFocus.delete(column))
            menuTriggerRef.current?.focus();
    });
    const canSort = column.getCanSort();
    const canPin = column.getCanPin();
    const canResize = column.getCanResize();
    // Move neighbours come from what is RENDERED: the column's own pin bucket,
    // visible columns only. Stepping through the raw columnOrder would trade
    // places with a hidden or pinned column - an enabled click that moves nothing.
    // With grouping in TanStack's default "reorder" mode, grouped columns render
    // first whatever columnOrder says: they neither move nor serve as a target.
    const groupedColumnMode = table.options.groupedColumnMode;
    const isHoistedByGrouping = (target) => groupedColumnMode !== false &&
        typeof target.getIsGrouped === "function" &&
        target.getIsGrouped();
    const renderedLeaves = (isPinned === "start"
        ? table.getStartVisibleLeafColumns()
        : isPinned === "end"
            ? table.getEndVisibleLeafColumns()
            : table.getCenterVisibleLeafColumns())
        .filter((leafColumn) => !isHoistedByGrouping(leafColumn))
        .map((leafColumn) => leafColumn.id);
    const renderedOrder = new Map(renderedLeaves.map((id, index) => [id, index]));
    const byRenderedOrder = (a, b) => renderedOrder.get(a) - renderedOrder.get(b);
    // A peer is a sibling at this column's header level with its rendered
    // leaves, so a group or a meta.headerColSpan span moves as one.
    const headerSpans = getDataGridHeaderSpans(table);
    const coveredIds = new Set([...headerSpans.values()].flat().map((leafColumn) => leafColumn.id));
    // Siblings only: a leaf stepping out of its group would split its header.
    const renderedPeers = (column.parent?.columns ?? table.getAllColumns())
        .filter((sibling) => !coveredIds.has(sibling.id))
        .map((sibling) => [...sibling.getLeafColumns(), ...(headerSpans.get(sibling.id) ?? [])]
        .map((leafColumn) => leafColumn.id)
        .filter((id) => renderedOrder.has(id))
        .sort(byRenderedOrder))
        .filter((leaves) => leaves.length > 0)
        .sort((a, b) => byRenderedOrder(a[0], b[0]));
    const renderedIndex = column.columns.length
        ? -1
        : renderedPeers.findIndex((leaves) => leaves[0] === column.id);
    const leftNeighbour = renderedIndex > 0 ? renderedPeers[renderedIndex - 1] : undefined;
    const rightNeighbour = renderedIndex !== -1 && renderedIndex < renderedPeers.length - 1
        ? renderedPeers[renderedIndex + 1]
        : undefined;
    const canMoveLeft = leftNeighbour !== undefined;
    const canMoveRight = rightNeighbour !== undefined;
    /** Re-seats this column, with the leaves its header spans, beside a rendered
     * neighbour; every other column, hidden or pinned, keeps its place. */
    const moveBeside = (neighbour, side) => {
        const moving = renderedPeers[renderedIndex] ?? [column.id];
        const newOrder = columnOrder.filter((id) => !moving.includes(id));
        const anchor = side === "before" ? neighbour[0] : neighbour[neighbour.length - 1];
        const at = anchor === undefined ? -1 : newOrder.indexOf(anchor);
        if (at === -1)
            return;
        newOrder.splice(side === "before" ? at : at + 1, 0, ...moving);
        table.setColumnOrder(newOrder);
    };
    // column.toggleSorting has no getCanSort() guard of its own, and the
    // direct button also renders for columns that are only resizable.
    const handleSort = () => {
        if (!canSort)
            return;
        if (isSorted === "asc") {
            column.toggleSorting(true);
        }
        else if (isSorted === "desc") {
            column.clearSorting();
        }
        else {
            column.toggleSorting(false);
        }
    };
    const headerLabelClassName = cn("text-secondary-foreground/80 inline-flex h-full items-center gap-1.5 font-normal [&_svg]:opacity-60 text-[0.8125rem] leading-[calc(1.125/0.8125)] [&_svg]:size-3.5", className);
    const headerButtonClassName = cn("text-secondary-foreground/80 hover:bg-secondary data-[state=open]:bg-secondary hover:text-foreground data-[state=open]:text-foreground px-2 font-normal h-6 style-vega:rounded-md style-nova:rounded-lg style-maia:rounded-full style-lyra:rounded-none style-mira:rounded-md style-luma:rounded-full style-sera:rounded-none style-rhea:rounded-full", className);
    const sortIcon = canSort &&
        (isSorted === "desc" ? (_jsx(IconPlaceholder, { lucide: "ArrowDownIcon", tabler: "IconArrowDown", hugeicons: "ArrowDown02Icon", phosphor: "ArrowDownIcon", remixicon: "RiArrowDownLine", className: "size-3.25", "aria-hidden": "true" })) : isSorted === "asc" ? (_jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp02Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine", className: "size-3.25", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "ChevronsUpDownIcon", tabler: "IconSelector", hugeicons: "UnfoldMoreIcon", phosphor: "CaretUpDownIcon", remixicon: "RiExpandUpDownLine", className: "mt-px size-3.25", "aria-hidden": "true" })));
    // A start-pinned column's resize handle covers the last 20px of its cell
    // (the column that renders last already reserves it with pe-8, and a
    // start-pinned one renders last only when nothing follows its group), so
    // the unpin button steps in until it clears the handle in both densities.
    // The step is padding on a wrapper that shrinks first: a column too narrow
    // for label, button and clearance gives the clearance back, never the label.
    const unpinClearsResizeHandle = props.tableLayout?.columnsResizable &&
        canResize &&
        isPinned === "start" &&
        !(column.getIsLastColumn("start") &&
            table.getCenterVisibleLeafColumns().length === 0 &&
            table.getEndVisibleLeafColumns().length === 0);
    const hasControls = props.tableLayout?.columnsMovable ||
        (props.tableLayout?.columnsVisibility && visibility) ||
        (props.tableLayout?.columnsPinnable && canPin) ||
        filter;
    const menuItems = useMemo(() => {
        const items = [];
        let hasPreviousSection = false;
        // Filter section
        if (filter) {
            items.push(_jsx(DropdownMenuGroup, { children: _jsx(DropdownMenuLabel, { children: filter }, "filter") }, "group-filter"));
            hasPreviousSection = true;
        }
        // Sort section
        if (canSort) {
            if (hasPreviousSection) {
                items.push(_jsx(DropdownMenuSeparator, {}, "sep-sort"));
            }
            items.push(_jsxs(DropdownMenuItem, { onClick: () => {
                    if (isSorted === "asc") {
                        column.clearSorting();
                    }
                    else {
                        column.toggleSorting(false);
                    }
                }, disabled: !canSort, children: [_jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp02Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine", className: "size-3.5!" }), _jsx("span", { className: "grow", children: i18n.labels.sortAscending }), isSorted === "asc" && (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "text-primary size-4 opacity-100!" }))] }, "sort-asc"), _jsxs(DropdownMenuItem, { onClick: () => {
                    if (isSorted === "desc") {
                        column.clearSorting();
                    }
                    else {
                        column.toggleSorting(true);
                    }
                }, disabled: !canSort, children: [_jsx(IconPlaceholder, { lucide: "ArrowDownIcon", tabler: "IconArrowDown", hugeicons: "ArrowDown02Icon", phosphor: "ArrowDownIcon", remixicon: "RiArrowDownLine", className: "size-3.5!" }), _jsx("span", { className: "grow", children: i18n.labels.sortDescending }), isSorted === "desc" && (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "text-primary size-4 opacity-100!" }))] }, "sort-desc"));
            hasPreviousSection = true;
        }
        // Pin section
        if (props.tableLayout?.columnsPinnable && canPin) {
            if (hasPreviousSection) {
                items.push(_jsx(DropdownMenuSeparator, {}, "sep-pin"));
            }
            items.push(_jsxs(DropdownMenuItem, { onClick: () => column.pin(isPinned === "start" ? false : "start"), children: [_jsx(IconPlaceholder, { lucide: "ArrowLeftToLineIcon", tabler: "IconArrowBarToLeft", hugeicons: "ArrowLeft03Icon", phosphor: "ArrowLineLeftIcon", remixicon: "RiContractLeftLine", className: "size-3.5!", "aria-hidden": "true" }), _jsx("span", { className: "grow", children: i18n.labels.pinColumnStart }), isPinned === "start" && (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "text-primary size-4 opacity-100!" }))] }, "pin-left"), _jsxs(DropdownMenuItem, { onClick: () => column.pin(isPinned === "end" ? false : "end"), children: [_jsx(IconPlaceholder, { lucide: "ArrowRightToLineIcon", tabler: "IconArrowBarToRight", hugeicons: "ArrowRight03Icon", phosphor: "ArrowLineRightIcon", remixicon: "RiContractRightLine", className: "size-3.5!", "aria-hidden": "true" }), _jsx("span", { className: "grow", children: i18n.labels.pinColumnEnd }), isPinned === "end" && (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "text-primary size-4 opacity-100!" }))] }, "pin-right"));
            hasPreviousSection = true;
        }
        // Move section
        if (props.tableLayout?.columnsMovable) {
            if (hasPreviousSection) {
                items.push(_jsx(DropdownMenuSeparator, {}, "sep-move"));
            }
            items.push(_jsxs(DropdownMenuItem, { onClick: () => {
                    if (leftNeighbour)
                        moveBeside(leftNeighbour, "before");
                }, disabled: !canMoveLeft || isPinned !== false, children: [_jsx(IconPlaceholder, { lucide: "ArrowLeftIcon", tabler: "IconArrowLeft", hugeicons: "ArrowLeft02Icon", phosphor: "ArrowLeftIcon", remixicon: "RiArrowLeftLine", className: "size-3.5!", "aria-hidden": "true" }), _jsx("span", { children: i18n.labels.moveColumnStart })] }, "move-left"), _jsxs(DropdownMenuItem, { onClick: () => {
                    if (rightNeighbour)
                        moveBeside(rightNeighbour, "after");
                }, disabled: !canMoveRight || isPinned !== false, children: [_jsx(IconPlaceholder, { lucide: "ArrowRightIcon", tabler: "IconArrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLine", className: "size-3.5!", "aria-hidden": "true" }), _jsx("span", { children: i18n.labels.moveColumnEnd })] }, "move-right"));
            hasPreviousSection = true;
        }
        // Visibility section
        if (props.tableLayout?.columnsVisibility && visibility) {
            if (hasPreviousSection) {
                items.push(_jsx(DropdownMenuSeparator, {}, "sep-visibility"));
            }
            items.push(_jsxs(DropdownMenuSub, { children: [_jsxs(DropdownMenuSubTrigger, { children: [_jsx(IconPlaceholder, { lucide: "Settings2Icon", tabler: "IconAdjustmentsHorizontal", hugeicons: "SlidersHorizontalIcon", phosphor: "SlidersHorizontalIcon", remixicon: "RiEqualizer2Line", className: "size-3.5!" }), _jsx("span", { children: i18n.labels.columnsMenu })] }), _jsx(DropdownMenuSubContent, { children: table
                            .getAllColumns()
                            .filter((col) => col.getCanHide())
                            .map((col) => (_jsx(DropdownMenuCheckboxItem, { checked: col.getIsVisible(), onSelect: (event) => event.preventDefault(), onCheckedChange: (value) => col.toggleVisibility(!!value), className: getColumnHeaderLabel(col) === col.id
                                ? "capitalize"
                                : undefined, children: getColumnHeaderLabel(col) }, col.id))) })] }, "visibility"));
        }
        return items;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filter,
        canSort,
        isSorted,
        column,
        props.tableLayout?.columnsPinnable,
        props.tableLayout?.columnsMovable,
        props.tableLayout?.columnsVisibility,
        canPin,
        isPinned,
        canMoveLeft,
        canMoveRight,
        visibility,
        table,
        leftNeighbour,
        rightNeighbour,
        columnOrder,
        columnVisibilityKey, // Needed to update checkbox states when visibility changes
    ]);
    if (hasControls) {
        return (_jsxs("div", { className: "-ms-2 flex h-full items-center justify-between gap-1.5", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { ref: menuTriggerRef, asChild: true, children: _jsxs(Button, { variant: "ghost", className: headerButtonClassName, disabled: isLoading, children: [icon && icon, resolvedTitle, sortIcon] }) }), _jsx(DropdownMenuContent, { className: "w-40", align: "start", children: menuItems })] }), props.tableLayout?.columnsPinnable && canPin && isPinned && (_jsx("span", { className: cn("-me-1 flex min-w-7 shrink-[999]", unpinClearsResizeHandle && "pe-4"), children: _jsx(Button, { size: "icon-sm", variant: "ghost", className: "style-vega:rounded-md style-nova:rounded-lg style-maia:rounded-full style-lyra:rounded-none style-mira:rounded-md style-luma:rounded-full style-sera:rounded-none style-rhea:rounded-full size-7", onClick: (event) => {
                            const scrollArea = event.currentTarget.closest('[data-slot="scroll-area-viewport"]');
                            pendingUnpinFocus.add(column);
                            column.pin(false);
                            // A column the virtual window leaves unmounted claims nothing,
                            // so the grid's scroll area takes focus instead of the page.
                            requestAnimationFrame(() => {
                                if (pendingUnpinFocus.delete(column))
                                    scrollArea?.focus();
                            });
                        }, "aria-label": i18n.labels.unpinColumn(resolvedTitle), title: i18n.labels.unpinColumn(resolvedTitle), children: _jsx(IconPlaceholder, { lucide: "PinOffIcon", tabler: "IconPinnedOff", hugeicons: "PinOffIcon", phosphor: "PushPinSlashIcon", remixicon: "RiUnpinLine", className: "size-3.5! opacity-50!", "aria-hidden": "true" }) }) }))] }));
    }
    if (canSort || (props.tableLayout?.columnsResizable && canResize)) {
        return (_jsx("div", { className: "-ms-2 flex h-full items-center", children: _jsxs(Button, { variant: "ghost", className: headerButtonClassName, disabled: isLoading, onClick: handleSort, children: [icon && icon, resolvedTitle, sortIcon] }) }));
    }
    return (_jsxs("div", { className: headerLabelClassName, children: [icon && icon, resolvedTitle] }));
}
const DataGridColumnHeaderMemo = memo(DataGridColumnHeaderInner);
/**
 * Sort and pin state reaches this header through builder calls on `column`
 * (`getIsSorted()`, `getIsPinned()`), and `column` is a stable reference. That
 * combination is the one v9's fresh-table-per-state-change does NOT cover:
 * React Compiler is free to memoize against the stable column and never
 * re-evaluate those reads, which shows up as frozen sort arrows and pin
 * controls. The `Subscribe` below turns the slices this header actually reads
 * into a real reactive dependency, and threading the selection through as a
 * prop is what lets it past the `memo` - which would otherwise see unchanged
 * props and skip the render anyway.
 */
function DataGridColumnHeader(props) {
    const { table } = useDataGrid();
    return (_jsx(Subscribe, { source: table.store, selector: (state) => ({
            sorting: state.sorting,
            columnPinning: state.columnPinning,
            columnOrder: state.columnOrder,
            columnVisibility: state.columnVisibility,
        }), children: (subscribed) => (_jsx(DataGridColumnHeaderMemo, { ...props, subscribedState: subscribed })) }));
}
export { DataGridColumnHeader };
