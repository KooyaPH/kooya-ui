"use client";
// This file keeps "use no memo": its own cell/header templates read state
// through builder calls on a stable row/column, which React Compiler cannot
// see. The primitive wraps its own such reads in TanStack's Subscribe; a
// consumer template has to opt out or subscribe itself.
"use no memo";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard.jsx";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { DataGrid, DataGridContainer, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable, DataGridTableRowPin, } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardFooter, CardHeader, } from "../../../../../../../adapters/layout.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const demoData = [
    {
        id: "1",
        name: "Alex Johnson",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        role: "CEO",
        status: "Active",
        balance: 5143.03,
    },
    {
        id: "2",
        name: "Sarah Chen",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        role: "CTO",
        status: "Active",
        balance: 4321.87,
    },
    {
        id: "3",
        name: "Michael Rodriguez",
        avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
        role: "Designer",
        status: "Blocked",
        balance: 7654.98,
    },
    {
        id: "4",
        name: "Emma Wilson",
        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        role: "Developer",
        status: "Inactive",
        balance: 3456.45,
    },
    {
        id: "5",
        name: "David Kim",
        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
        role: "Lawyer",
        status: "Active",
        balance: 9876.54,
    },
    {
        id: "6",
        name: "Aron Thompson",
        avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
        role: "Director",
        status: "Pending",
        balance: 6214.22,
    },
    {
        id: "7",
        name: "James Brown",
        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
        role: "Product Manager",
        status: "Inactive",
        balance: 5321.77,
    },
    {
        id: "8",
        name: "Maria Garcia",
        avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
        role: "Marketing Lead",
        status: "Active",
        balance: 8452.39,
    },
    {
        id: "9",
        name: "Nick Johnson",
        avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
        role: "Data Scientist",
        status: "Pending",
        balance: 7345.1,
    },
    {
        id: "10",
        name: "Liam Thompson",
        avatar: "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
        role: "Engineer",
        status: "Inactive",
        balance: 5214.88,
    },
    {
        id: "11",
        name: "Olivia Martinez",
        avatar: "/reui-assets/images/240c6b87e9fc32d07637.jpg",
        role: "VP of Sales",
        status: "Active",
        balance: 11234.56,
    },
    {
        id: "12",
        name: "Ethan Park",
        avatar: "/reui-assets/images/c6064767ae24420606fc.jpg",
        role: "DevOps Lead",
        status: "Active",
        balance: 8910.33,
    },
    {
        id: "13",
        name: "Sophie Taylor",
        avatar: "/reui-assets/images/7da2efac125ddc6e0086.jpg",
        role: "UX Researcher",
        status: "Pending",
        balance: 6543.21,
    },
    {
        id: "14",
        name: "Ryan Mitchell",
        avatar: "/reui-assets/images/833451dbb99bcf927d1b.jpg",
        role: "Architect",
        status: "Inactive",
        balance: 7821.44,
    },
    {
        id: "15",
        name: "Isabella Wong",
        avatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        role: "QA Manager",
        status: "Active",
        balance: 5678.9,
    },
];
function ActionsCell({ row }) {
    const { copyToClipboard } = useCopyToClipboard();
    const isPinned = row.getIsPinned();
    const handleCopyId = () => {
        copyToClipboard(row.original.id);
        toast.success("Employee ID copied", { description: row.original.id });
    };
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { className: "size-7", size: "icon", variant: "ghost", children: _jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine" }) }) }), _jsxs(DropdownMenuContent, { side: "bottom", align: "start", children: [_jsx(DropdownMenuItem, { onClick: () => row.pin(isPinned ? false : "top"), children: isPinned ? "Unpin row" : "Pin to top" }), _jsx(DropdownMenuItem, { onClick: () => { }, children: "Edit" }), _jsx(DropdownMenuItem, { onClick: handleCopyId, children: "Copy ID" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { variant: "destructive", onClick: () => { }, children: "Delete" })] })] }));
}
export default function Pattern() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([
        { id: "name", desc: false },
    ]);
    const [rowPinning, setRowPinning] = useState({
        top: [],
        bottom: [],
    });
    const columns = useMemo(() => [
        {
            id: "pin",
            header: "",
            cell: ({ row }) => _jsx(DataGridTableRowPin, { row: row }),
            size: 40,
            enableSorting: false,
            enableHiding: false,
            enableResizing: false,
        },
        {
            accessorKey: "name",
            id: "name",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "User", column: column })),
            cell: ({ row }) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "size-8", children: [_jsx(AvatarImage, { src: row.original.avatar, alt: row.original.name }), _jsx(AvatarFallback, { children: row.original.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("") })] }), _jsx("div", { className: "text-foreground min-w-0 truncate font-medium", children: row.original.name })] })),
            minSize: 150,
            meta: {
                autoSize: true,
            },
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "role",
            id: "role",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Role", column: column })),
            cell: ({ row }) => (_jsx("span", { className: "text-foreground", children: row.original.role })),
            size: 160,
            enableSorting: true,
        },
        {
            accessorKey: "status",
            id: "status",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Status", column: column })),
            cell: ({ row }) => {
                const s = row.original.status;
                if (s === "Active")
                    return _jsx(Badge, { variant: "success-outline", children: "Active" });
                if (s === "Blocked")
                    return _jsx(Badge, { variant: "destructive-outline", children: "Blocked" });
                if (s === "Inactive")
                    return _jsx(Badge, { variant: "info-outline", children: "Inactive" });
                return _jsx(Badge, { variant: "warning-outline", children: "Pending" });
            },
            size: 120,
            enableSorting: true,
        },
        {
            accessorKey: "balance",
            id: "balance",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Balance", column: column })),
            cell: ({ row }) => (_jsxs("span", { className: "text-foreground tabular-nums", children: ["$", row.original.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })] })),
            size: 140,
            enableSorting: true,
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => _jsx(ActionsCell, { row: row }),
            size: 60,
            enableSorting: false,
            enableHiding: false,
            enableResizing: false,
        },
    ], []);
    const table = useTable({
        features: dataGridFeatures,
        columns,
        data: demoData,
        pageCount: Math.ceil(demoData.length / pagination.pageSize),
        getRowId: (row) => row.id,
        enableRowPinning: true,
        keepPinnedRows: true,
        state: { pagination, sorting, rowPinning },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onRowPinningChange: setRowPinning,
    });
    return (_jsx(DataGrid, { table: table, recordCount: demoData.length, tableLayout: {
            rowsPinnable: true,
            columnsResizable: true,
        }, children: _jsxs(Card, { className: "w-full gap-0 p-0", children: [_jsxs(CardHeader, { className: "flex items-center justify-between px-3 py-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-foreground text-sm font-medium", children: "Team Members" }), (rowPinning.top?.length ?? 0) > 0 && (_jsxs(Badge, { variant: "primary-outline", size: "sm", children: [rowPinning.top?.length, " pinned"] }))] }), _jsxs("div", { className: "flex items-center gap-1", children: [(rowPinning.top?.length ?? 0) > 0 && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setRowPinning({ top: [], bottom: [] }), children: "Unpin all" })), _jsx(Button, { variant: "ghost", size: "icon", className: "size-8", children: _jsx(IconPlaceholder, { lucide: "RefreshCwIcon", tabler: "IconRefresh", hugeicons: "RefreshIcon", phosphor: "ArrowClockwiseIcon", remixicon: "RiRefreshLine", className: "size-4" }) })] })] }), _jsx(CardContent, { className: "p-0", children: _jsx(Card, { className: "p-0", children: _jsx(DataGridContainer, { children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTable, {}) }) }) }) }), _jsx(CardFooter, { className: "border-none bg-transparent! px-3 py-2", children: _jsx(DataGridPagination, {}) })] }) }));
}
