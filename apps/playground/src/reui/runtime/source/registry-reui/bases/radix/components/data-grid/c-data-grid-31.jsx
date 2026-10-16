"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { DataGrid, DataGridContainer, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridCellSelection, buildDataGridClearDetails, getDataGridActiveRegionGrid, serializeDataGridClipboardText, } from "../../reui/data-grid/data-grid-cell-selection.jsx";
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { format } from "date-fns";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "../../../../../../../adapters/overlays.tsx";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Card, CardAction, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const MEMBERS = [
    { id: "1", name: "Alex Johnson", email: "alex@example.com", avatar: "/reui-assets/images/e93553df2422635515ee.jpg", initials: "AJ" },
    { id: "2", name: "Sarah Chen", email: "sarah@example.com", avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg", initials: "SC" },
    { id: "3", name: "Michael Rodriguez", email: "michael@example.com", avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg", initials: "MR" },
    { id: "4", name: "Emma Wilson", email: "emma@example.com", avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg", initials: "EW" },
    { id: "5", name: "David Kim", email: "david@example.com", avatar: "/reui-assets/images/973d47055c51440af7dc.jpg", initials: "DK" },
    { id: "6", name: "Aron Thompson", email: "lisa@example.com", avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg", initials: "LT" },
    { id: "7", name: "James Brown", email: "james@example.com", avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg", initials: "JB" },
    { id: "8", name: "Maria Garcia", email: "maria@example.com", avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg", initials: "MG" },
    { id: "9", name: "Nick Johnson", email: "nick@example.com", avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg", initials: "NJ" },
    { id: "10", name: "Liam Thompson", email: "liam@example.com", avatar: "/reui-assets/images/a3afee2f77d259ce6a59.jpg", initials: "LT" },
];
const memberById = new Map(MEMBERS.map((member) => [member.id, member]));
const STATUS_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "archived", label: "Archived" },
];
const demoData = [
    { id: "1", sku: "AU-1042", name: "Studio Headphones", team: ["1", "2"], restock: "2026-09-04", stock: 42, price: 189.0, status: "active" },
    { id: "2", sku: "AU-1077", name: "Desktop Speakers", team: ["3"], restock: "2026-09-12", stock: 18, price: 129.5, status: "active" },
    { id: "3", sku: "DS-2011", name: "27in 4K Monitor", team: ["2", "4", "5"], restock: "2026-10-01", stock: 7, price: 449.99, status: "active" },
    { id: "4", sku: "DS-2048", name: "Portable Display", team: [], restock: "", stock: 25, price: 219.0, status: "archived" },
    { id: "5", sku: "PE-3003", name: "Mechanical Keyboard", team: ["6"], restock: "2026-09-18", stock: 64, price: 139.0, status: "active" },
    { id: "6", sku: "PE-3017", name: "Wireless Mouse", team: ["7", "8"], restock: "2026-09-25", stock: 120, price: 59.0, status: "active" },
    { id: "7", sku: "PE-3050", name: "USB Microphone", team: [], restock: "", stock: 33, price: 99.0, status: "archived" },
];
function StatusBadge({ status }) {
    return (_jsx(Badge, { variant: status === "active" ? "success-light" : "primary-light", children: status === "active" ? "Active" : "Archived" }));
}
/**
 * Multi-member assignment on the shadcn combobox, the Notion person-property
 * idiom: an inline chips input renders the value as avatar chips that fit
 * and grow the cell, and typing in it filters the member popup.
 */
function TeamCell({ team, onChange, }) {
    const anchor = useComboboxAnchor();
    const value = team
        .map((id) => memberById.get(id))
        .filter((member) => !!member);
    return (_jsxs(Combobox, { multiple: true, items: MEMBERS, itemToStringValue: (member) => member.name, value: value, onValueChange: (next) => onChange(next.map((member) => member.id)), children: [_jsx(ComboboxChips, { ref: anchor, "data-cell-control": "", className: "min-h-6! w-full rounded-none! border-0! bg-transparent! p-0! shadow-none! ring-0! outline-hidden!", children: _jsx(ComboboxValue, { children: (selected) => (_jsxs(Fragment, { children: [selected.map((member) => (_jsx(ComboboxChip, { showRemove: false, className: "rounded-none! border-0! bg-transparent! p-0!", children: _jsxs(Badge, { variant: "outline", children: [_jsxs(Avatar, { className: "size-3.5", children: [_jsx(AvatarImage, { src: member.avatar, alt: member.name }), _jsx(AvatarFallback, { className: "text-[8px]", children: member.initials })] }), member.name.split(" ")[0], _jsx(Button, { variant: "ghost", size: "icon", className: "size-3 hover:bg-transparent", "aria-label": `Remove ${member.name}`, 
                                            /* Removal through the controlled value, and the press
                                               must not bubble: the chip strip opens the popup. */
                                            onClick: (event) => {
                                                event.stopPropagation();
                                                onChange(team.filter((id) => id !== member.id));
                                            }, children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine" }) })] }) }, member.id))), _jsx(ComboboxChipsInput, { placeholder: selected.length ? "" : "No assignment", className: selected.length
                                    ? "h-6 w-0 min-w-0 flex-none border-0! bg-transparent! p-0! shadow-none! outline-hidden! focus:min-w-16 focus:flex-1"
                                    : "h-6 min-w-16 border-0! bg-transparent! p-0! shadow-none! outline-hidden!" })] })) }) }), _jsxs(ComboboxContent, { anchor: anchor, align: "start", sideOffset: 8, className: "w-56", children: [_jsx(ComboboxInput, { placeholder: "Search members", showTrigger: false, className: "m-1" }), _jsx(ComboboxEmpty, { children: "No members found." }), _jsx(ComboboxList, { children: (member) => (_jsxs(ComboboxItem, { value: member, children: [_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: member.avatar, alt: member.name }), _jsx(AvatarFallback, { className: "text-[9px]", children: member.initials })] }), member.name] }, member.id)) })] })] }));
}
/**
 * A date property on the shadcn date picker: the cell is a free-fit trigger
 * showing the formatted value, and editing opens a calendar in a popover.
 * The open state lives in the cell itself, so picking a date closes the
 * popover without ever rebuilding the columns.
 */
function DateCell({ value, onChange, }) {
    const [open, setOpen] = useState(false);
    // Measured at open: the popup must sit exactly on the CELL's bottom-start
    // corner, and the trigger sits inside the cell's padding, so the offsets
    // carry the trigger-to-cell delta.
    const [offsets, setOffsets] = useState({ side: 9, align: -12 });
    const triggerRef = useRef(null);
    const date = value ? new Date(`${value}T00:00:00`) : undefined;
    return (_jsxs(Popover, { open: open, onOpenChange: (next) => {
            if (next) {
                const trigger = triggerRef.current;
                const cell = trigger?.closest("td");
                if (trigger && cell) {
                    const triggerRect = trigger.getBoundingClientRect();
                    const cellRect = cell.getBoundingClientRect();
                    setOffsets({
                        side: Math.round(cellRect.bottom - triggerRect.bottom),
                        align: Math.round(cellRect.left - triggerRect.left),
                    });
                }
            }
            setOpen(next);
        }, children: [_jsx(PopoverTrigger, { ref: triggerRef, className: "flex min-h-6 w-full cursor-pointer items-center text-start", children: date ? (format(date, "MMM d, yyyy")) : (_jsx("span", { className: "text-muted-foreground text-xs", children: "Pick date" })) }), _jsx(PopoverContent, { align: "start", side: "bottom", sideOffset: offsets.side, alignOffset: offsets.align, className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", selected: date, defaultMonth: date, onSelect: (next) => {
                        onChange(next ? format(next, "yyyy-MM-dd") : "");
                        setOpen(false);
                    } }) })] }));
}
/**
 * Selection feedback at the consumer layer: one updating toast (stable id)
 * summarizes the captured region, so a drag reads as live feedback instead
 * of a stack of stale messages.
 */
function SelectionToast({ count, bound, }) {
    useEffect(() => {
        if (count < 2 || !bound)
            return;
        const rows = bound.maxRowIndex - bound.minRowIndex + 1;
        const columns = bound.maxColumnIndex - bound.minColumnIndex + 1;
        toast(`Selected ${rows} x ${columns} (${count} cells)`, {
            position: "top-center",
            id: "data-grid-selection",
            duration: 1500,
        });
    }, [count, bound]);
    return null;
}
export default function Pattern() {
    // Scopes DOM lookups to THIS grid: data-cell-focused persists on a blurred
    // grid, so a document-wide query could hit another instance on the page.
    const cardRef = useRef(null);
    // The controller's imperative API; focusCell lands cell focus, DOM focus
    // and aria-activedescendant together on rows that are still mounting.
    const gridApiRef = useRef(null);
    const nextIdRef = useRef(demoData.length + 1);
    const [data, setData] = useState(demoData);
    // Optional CRUD indications: which rows are new or edited, and which
    // cells were touched. Purely presentational bookkeeping the grid renders
    // through getRowStatus/getCellStatus; drop it for a grid without them.
    const [rowMeta, setRowMeta] = useState({});
    const [dirtyCells, setDirtyCells] = useState(new Set());
    // The resolved selection, straight from the grid: count, bounds and the
    // focused cell, with no reach into TanStack internals.
    const [cellSelection, setCellSelection] = useState(null);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [columnPinning, setColumnPinning] = useState({
        start: [],
        end: [],
    });
    // The single write path: built-in editors, paste, fill, cut, Delete and
    // the status select all land here, so state stays the only owner of the
    // rows.
    const updateRows = (changes) => {
        if (!changes.length)
            return;
        const byRow = new Map();
        for (const change of changes) {
            const rowChanges = byRow.get(change.rowId) ?? [];
            rowChanges.push(change);
            byRow.set(change.rowId, rowChanges);
        }
        setData((previous) => previous.map((row) => {
            const rowChanges = byRow.get(row.id);
            if (!rowChanges)
                return row;
            const next = { ...row };
            for (const change of rowChanges)
                next[change.columnId] = change.value;
            return next;
        }));
        setRowMeta((previous) => {
            const next = { ...previous };
            for (const change of changes) {
                if (next[change.rowId] !== "new")
                    next[change.rowId] = "dirty";
            }
            return next;
        });
        setDirtyCells((previous) => {
            const next = new Set(previous);
            for (const change of changes) {
                next.add(`${change.rowId}:${change.columnId}`);
            }
            return next;
        });
    };
    const handleCellsChange = (details) => {
        updateRows(details.changes);
        // A paste, fill or edit the parsers refused must not die silently.
        if (details.rejected.length) {
            toast.error(`${details.rejected.length} ${details.rejected.length === 1 ? "value" : "values"} could not be applied`, { position: "top-center", id: "data-grid-rejected" });
        }
    };
    // Consumer-level editing: text columns use the grid's built-in editor via
    // `cellEdit.control`, so only the status column's select arrives here.
    // One gesture for every custom-control column: Enter focuses the focused
    // cell's own control and clicks it - the select and date triggers open,
    // and the team combobox input opens its list - the exact toggle a mouse
    // click performs, so keyboard and mouse stay interchangeable.
    const handleCellEditRequest = (request) => {
        // Deliberate activation only (Enter, F2, double-click). Type-to-edit
        // also lands here, and a stray keystroke must not click a control it
        // cannot type into.
        if (request.initialText !== undefined)
            return;
        // Ordered lookup: the cell's PRIMARY control, never an incidental
        // button inside it (a combobox chip's remove button precedes the
        // input in DOM order and must not win).
        const cellSelector = "td[data-cell-focused]";
        const control = [
            '[data-slot="select-trigger"]',
            '[data-slot="popover-trigger"]',
            "input",
            "button",
        ]
            .map((candidate) => cardRef.current?.querySelector(`${cellSelector} ${candidate}`))
            .find(Boolean);
        if (!control)
            return;
        control.focus();
        control.click();
        // The combobox input opens its list from the keyboard, not from a
        // synthetic click; ArrowDown is its native open gesture.
        if (control instanceof HTMLInputElement) {
            control.dispatchEvent(new KeyboardEvent("keydown", {
                key: "ArrowDown",
                bubbles: true,
                cancelable: true,
            }));
        }
    };
    // Quick create: one plain empty row appended to the data, landing where
    // pagination puts it. The grid jumps to that page, and focusCell retries
    // until the row mounts there, so the user can type immediately.
    const handleRowCreate = () => {
        const id = `p${nextIdRef.current}`;
        nextIdRef.current += 1;
        setData((previous) => [
            ...previous,
            {
                id,
                sku: `PR-${id.slice(1).padStart(4, "0")}`,
                name: "",
                team: [],
                restock: "",
                stock: 0,
                price: 0,
                status: "active",
            },
        ]);
        setRowMeta((previous) => ({ ...previous, [id]: "new" }));
        setPagination((previous) => ({
            ...previous,
            pageIndex: Math.ceil((data.length + 1) / previous.pageSize) - 1,
        }));
        gridApiRef.current?.focusCell(id, "name");
    };
    // Cell and row actions behind one context menu, scoped by where the
    // press landed. The rows render inside the primitive, so one trigger
    // wraps the whole grid and a capture handler records the cell.
    const [contextCell, setContextCell] = useState(null);
    const contextTriggerRef = useRef(null);
    const contextRowId = contextCell?.rowId ?? null;
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const confirmDeleteRow = data.find((row) => row.id === confirmDeleteId);
    const duplicateRow = (rowId) => {
        const source = data.find((row) => row.id === rowId);
        if (!source)
            return;
        const id = `p${nextIdRef.current}`;
        nextIdRef.current += 1;
        const index = data.findIndex((row) => row.id === rowId);
        setData((previous) => [
            ...previous.slice(0, index + 1),
            { ...source, id, name: `${source.name} copy` },
            ...previous.slice(index + 1),
        ]);
        setRowMeta((previous) => ({ ...previous, [id]: "new" }));
        gridApiRef.current?.focusCell(id, "name");
    };
    const gridViewport = () => cardRef.current?.querySelector('[data-slot="data-grid-table-viewport"]') ?? null;
    // Copies whatever the grid would copy: the active region, which the
    // right-click just focused unless it landed inside a selection.
    const copySelection = () => {
        const grid = getDataGridActiveRegionGrid(table, gridViewport());
        if (!grid)
            return;
        void navigator.clipboard?.writeText?.(serializeDataGridClipboardText(grid));
        const count = grid.reduce((total, line) => total + line.length, 0);
        toast.info(`Copied ${count} ${count === 1 ? "cell" : "cells"} to clipboard`, { position: "top-center", id: "data-grid-copy" });
    };
    const clearSelection = () => {
        const details = buildDataGridClearDetails(table, "clear", false, gridViewport());
        if (details)
            handleCellsChange(details);
    };
    const copyRow = (rowId) => {
        const row = data.find((candidate) => candidate.id === rowId);
        if (!row)
            return;
        const line = [
            row.name,
            row.team
                .map((memberId) => memberById.get(memberId)?.name ?? "")
                .filter(Boolean)
                .join(", "),
            row.restock,
            String(row.stock),
            row.price.toFixed(2),
            row.status,
        ].join("\t");
        void navigator.clipboard?.writeText?.(line);
        toast.info("Row copied to clipboard", { position: "top-center", id: "data-grid-copy" });
    };
    const deleteRow = (rowId) => {
        const remaining = data.filter((row) => row.id !== rowId);
        setData(remaining);
        // The removed row may have been the last page's only row; clamp back.
        setPagination((previous) => ({
            ...previous,
            pageIndex: Math.min(previous.pageIndex, Math.max(0, Math.ceil(remaining.length / previous.pageSize) - 1)),
        }));
    };
    const columns = useMemo(() => [
        {
            accessorKey: "sku",
            header: "SKU",
            cell: (info) => info.getValue(),
            enableSorting: false,
            size: 90,
            // No cellEdit: copyable but read-only, so a paste over it lands in
            // the batch's rejected list instead of changing data.
            meta: { cellClassName: "text-muted-foreground font-mono text-xs" },
        },
        {
            accessorKey: "name",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Product", column: column })),
            cell: (info) => info.getValue(),
            size: 180,
            meta: {
                headerTitle: "Product",
                cellClassName: "font-medium",
                // The grid's built-in flush editor: Enter, F2, typing, or
                // double-click opens it right over the cell. The textarea control
                // grows downward as long text wraps, the Sheets look.
                cellEdit: { control: "textarea" },
            },
        },
        {
            accessorKey: "team",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Team", column: column })),
            enableSorting: false,
            cell: ({ row }) => (_jsx(TeamCell, { team: row.original.team, onChange: (next) => updateRows([{ rowId: row.id, columnId: "team", value: next }]) })),
            size: 230,
            minSize: 200,
            meta: {
                headerTitle: "Team",
                autoSize: true,
                cellEdit: {
                    // Clipboard carries names; parse maps them (or emails) back.
                    parse: (raw) => raw
                        .split(",")
                        .map((value) => value.trim().toLowerCase())
                        .map((needle) => MEMBERS.find((member) => member.name.toLowerCase() === needle ||
                        member.email.toLowerCase() === needle)?.id)
                        .filter((id) => !!id),
                    format: (value) => Array.isArray(value)
                        ? value
                            .map((id) => memberById.get(String(id))?.name ?? "")
                            .filter(Boolean)
                            .join(", ")
                        : String(value ?? ""),
                    clearValue: [],
                },
            },
        },
        {
            accessorKey: "restock",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Restock", column: column })),
            cell: ({ row }) => (_jsx(DateCell, { value: row.original.restock, onChange: (next) => updateRows([{ rowId: row.id, columnId: "restock", value: next }]) })),
            size: 140,
            meta: {
                headerTitle: "Restock",
                cellEdit: {
                    // Clipboard carries the readable date; parse accepts anything
                    // Date can read and stores the ISO day.
                    parse: (raw) => {
                        const trimmed = raw.trim();
                        if (!trimmed)
                            return "";
                        const parsed = new Date(trimmed);
                        return Number.isNaN(parsed.getTime())
                            ? undefined
                            : format(parsed, "yyyy-MM-dd");
                    },
                    format: (value) => value
                        ? format(new Date(`${String(value)}T00:00:00`), "MMM d, yyyy")
                        : "",
                    clearValue: "",
                },
            },
        },
        {
            accessorKey: "stock",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Stock", column: column })),
            cell: (info) => String(info.getValue()),
            size: 70,
            meta: {
                headerTitle: "Stock",
                cellClassName: "text-end tabular-nums",
                headerClassName: "justify-end",
                cellEdit: {
                    control: "text",
                    parse: (raw) => {
                        const parsed = Number.parseInt(raw.replace(/[^0-9-]/g, ""), 10);
                        return Number.isNaN(parsed) ? undefined : Math.max(0, parsed);
                    },
                    clearValue: 0,
                },
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Price", column: column })),
            cell: ({ row }) => row.original.price.toFixed(2),
            size: 80,
            meta: {
                headerTitle: "Price",
                cellClassName: "text-end tabular-nums",
                headerClassName: "justify-end",
                cellEdit: {
                    control: "text",
                    parse: (raw) => {
                        const parsed = Number.parseFloat(raw.replace(/[^0-9.-]/g, ""));
                        return Number.isNaN(parsed) ? undefined : parsed;
                    },
                    format: (value) => typeof value === "number" ? value.toFixed(2) : String(value ?? ""),
                    clearValue: 0,
                },
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Status", column: column })),
            // A consumer-level editor: an always-on select with badge-rendered
            // value and items, opened by click or by Enter through
            // onCellEditRequest. The trigger is a button, so clicking it never
            // starts a cell range.
            cell: ({ row }) => (_jsxs(Select, { value: row.original.status, onValueChange: (status) => updateRows([{ rowId: row.id, columnId: "status", value: status }]), children: [_jsx(SelectTrigger, { size: "sm", className: "h-6 w-full border-0 bg-transparent px-1 shadow-none [&_svg]:opacity-0 [&_svg]:transition-opacity in-data-[cell-focused]:[&_svg]:opacity-100", "aria-label": "Status", children: _jsx(SelectValue, { children: _jsx(StatusBadge, { status: row.original.status }) }) }), _jsx(SelectContent, { position: "popper", align: "start", sideOffset: 8, children: STATUS_OPTIONS.map((option) => (_jsx(SelectItem, { value: option.value, children: _jsx(StatusBadge, { status: option.value }) }, option.value))) })] })),
            size: 130,
            meta: {
                headerTitle: "Status",
                cellEdit: {
                    // Clipboard carries the label; parse maps it back to the value.
                    parse: (raw) => STATUS_OPTIONS.find((option) => option.label.toLowerCase() === raw.trim().toLowerCase() ||
                        option.value === raw.trim().toLowerCase())?.value,
                    format: (value) => STATUS_OPTIONS.find((option) => option.value === value)?.label ??
                        String(value ?? ""),
                },
            },
        },
    ], 
    // Stable: every cell reads state through the grid's own change pipeline.
    []);
    const table = useTable({
        features: dataGridFeatures,
        columns,
        data,
        pageCount: Math.ceil(data.length / pagination.pageSize),
        getRowId: (row) => row.id,
        state: {
            pagination,
            sorting,
            columnPinning,
        },
        // Every commit replaces `data`; without this, editing on page 2 would
        // snap the grid back to page 1 on each write.
        autoResetPageIndex: false,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnPinningChange: setColumnPinning,
    });
    return (_jsxs(DataGrid, { table: table, recordCount: data.length, onCellsChange: handleCellsChange, onCellEditRequest: handleCellEditRequest, onCellSelectionChange: setCellSelection, onCellsCopy: ({ grid, cut }) => {
            const count = grid.reduce((total, line) => total + line.length, 0);
            toast.info(`${cut ? "Cut" : "Copied"} ${count} ${count === 1 ? "cell" : "cells"} to clipboard`, { position: "top-center", id: "data-grid-copy" });
        }, getRowStatus: (row) => rowMeta[row.id], getCellStatus: (row, columnId) => dirtyCells.has(`${row.id}:${columnId}`) ? "dirty" : undefined, tableLayout: {
            dense: true,
            cellSelection: true,
            cellFillHandle: true,
            // The Excel-style solid square inside the selection corner.
            cellFillHandleVariant: "square",
            cellBorder: true,
            columnsResizable: true,
            columnsPinnable: true,
        }, tableClassNames: {
            // Breathing room against the container edges now that a data
            // column leads the row.
            edgeCell: "first:ps-4 last:pe-4 [&:has(+[data-slot=data-grid-table-fill-body-cell]:last-child)]:pe-4 [&:has(+[data-slot=data-grid-table-fill-head-cell]:last-child)]:pe-4",
            // The row the open context menu references, checkbox state untouched.
            bodyRow: "data-[context-open]:bg-muted/50 data-[context-open]:[&>td[data-pinned]]:bg-[color-mix(in_oklab,var(--muted)_50%,var(--data-grid-surface,var(--card)))]",
        }, children: [_jsxs(Card, { ref: cardRef, className: "w-full gap-3 py-3.5", children: [_jsxs(CardHeader, { className: "items-center px-3.5", children: [_jsx(CardTitle, { children: "Products" }), _jsx(CardAction, { children: _jsx(Button, { size: "sm", variant: "outline", onClick: handleRowCreate, children: "Add row" }) })] }), _jsxs(ContextMenu, { onOpenChange: (open) => {
                            if (open)
                                return;
                            cardRef.current
                                ?.querySelectorAll("[data-context-open]")
                                .forEach((rowEl) => rowEl.removeAttribute("data-context-open"));
                            setContextCell(null);
                        }, children: [_jsx(ContextMenuTrigger, { ref: contextTriggerRef, 
                                // Suppressing the capture stops the trigger from opening over
                                // headers, the add-row affordance and the empty space.
                                onContextMenuCapture: (event) => {
                                    const native = event.nativeEvent;
                                    if (native.__retargeted)
                                        return;
                                    const target = event.target;
                                    const cell = target.closest("td[data-col-id]");
                                    const rowId = target
                                        .closest("tr[data-row-id]")
                                        ?.getAttribute("data-row-id");
                                    if (!rowId) {
                                        event.stopPropagation();
                                        return;
                                    }
                                    const columnId = cell?.getAttribute("data-col-id") ?? null;
                                    setContextCell({ rowId, columnId });
                                    // Anchor the menu visually to its row WITHOUT touching the
                                    // checkbox row selection; the attribute styles via bodyRow.
                                    target
                                        .closest("tr[data-row-id]")
                                        ?.setAttribute("data-context-open", "");
                                    // The spreadsheet standard: right-click focuses the cell it
                                    // landed on (keeping an existing selection it sits inside).
                                    // Visual focus only - DOM focus stays with the menu, so its
                                    // own Escape and typeahead never fight the grid's keys.
                                    if (columnId && !cell?.hasAttribute("data-cell-selected")) {
                                        table.setFocusedCell(rowId, columnId);
                                    }
                                    // A custom control can swallow the contextmenu before the
                                    // trigger sees it; prevent the control's defaults and
                                    // retarget the press at the trigger, so the menu owns the
                                    // gesture on every cell.
                                    const control = target.closest('button, a, input, select, textarea, [contenteditable], [role="combobox"], [role="checkbox"]');
                                    if (control) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        const retarget = new MouseEvent("contextmenu", {
                                            bubbles: true,
                                            cancelable: true,
                                            clientX: native.clientX,
                                            clientY: native.clientY,
                                        });
                                        retarget.__retargeted = true;
                                        contextTriggerRef.current?.dispatchEvent(retarget);
                                    }
                                }, children: _jsxs(DataGridContainer, { className: "border-y", children: [_jsx(DataGridScrollArea, { children: _jsx(DataGridTable, {}) }), _jsx(DataGridCellSelection, { apiRef: gridApiRef })] }) }), _jsxs(ContextMenuContent, { className: "w-44", children: [_jsxs(ContextMenuGroup, { children: [_jsx(ContextMenuLabel, { children: "Cell" }), _jsx(ContextMenuItem, { onClick: () => contextCell?.columnId &&
                                                    gridApiRef.current?.focusCell(contextCell.rowId, contextCell.columnId, { edit: true }), children: "Edit cell" }), _jsx(ContextMenuItem, { onClick: copySelection, children: "Copy" }), _jsx(ContextMenuItem, { onClick: clearSelection, children: "Clear" })] }), _jsx(ContextMenuSeparator, {}), _jsxs(ContextMenuGroup, { children: [_jsx(ContextMenuLabel, { children: "Row" }), _jsx(ContextMenuItem, { onClick: () => contextRowId && duplicateRow(contextRowId), children: "Duplicate" }), _jsx(ContextMenuItem, { onClick: () => contextRowId && copyRow(contextRowId), children: "Copy row" }), _jsx(ContextMenuItem, { className: "text-destructive", onClick: () => contextRowId && setConfirmDeleteId(contextRowId), children: "Delete row" })] })] })] }), _jsx(CardFooter, { className: "border-none bg-transparent! px-3.5 py-0", children: _jsx(DataGridPagination, {}) })] }), _jsx(SelectionToast, { count: cellSelection?.visibleCellCount ?? 0, bound: cellSelection?.activeBound ?? null }), _jsx(AlertDialog, { open: !!confirmDeleteId, onOpenChange: (open) => {
                    if (!open)
                        setConfirmDeleteId(null);
                }, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Delete this row?" }), _jsxs(AlertDialogDescription, { children: [confirmDeleteRow?.name
                                            ? `"${confirmDeleteRow.name}" is removed from the grid.`
                                            : "The row is removed from the grid.", " ", "This cannot be undone."] })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { variant: "destructive", onClick: () => {
                                        if (confirmDeleteId)
                                            deleteRow(confirmDeleteId);
                                        setConfirmDeleteId(null);
                                    }, children: "Delete" })] })] }) })] }));
}
