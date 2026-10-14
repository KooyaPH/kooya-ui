"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { DataGrid, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTableVirtual } from "../../reui/data-grid/data-grid-table-virtual.jsx";
import { useTable } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const avatars = [
    "/reui-assets/images/e93553df2422635515ee.jpg",
    "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    "/reui-assets/images/973d47055c51440af7dc.jpg",
    "/reui-assets/images/df73db9a2c25069a422d.jpg",
];
const names = [
    "Alex Johnson",
    "Sarah Chen",
    "Michael Rodriguez",
    "Emma Wilson",
    "David Kim",
    "Aron Thompson",
    "James Brown",
    "Maria Garcia",
    "Nick Johnson",
    "Liam Thompson",
];
const departments = [
    "Engineering",
    "Marketing",
    "Design",
    "Sales",
    "Finance",
    "Operations",
    "Legal",
    "Support",
];
const statuses = ["Active", "Inactive", "Pending"];
function generateData(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: String(i + 1),
        name: names[i % names.length],
        avatar: avatars[i % avatars.length],
        department: departments[i % departments.length],
        status: statuses[i % statuses.length],
        balance: Math.round((Math.random() * 9000 + 1000) * 100) / 100,
    }));
}
const allData = generateData(200);
export default function Pattern() {
    const [sorting, setSorting] = useState([]);
    const columns = useMemo(() => [
        {
            accessorKey: "id",
            id: "id",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "#", column: column })),
            cell: ({ row }) => (_jsx("span", { className: "text-muted-foreground tabular-nums", children: row.original.id })),
            size: 70,
            enableSorting: false,
        },
        {
            accessorKey: "name",
            id: "name",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "User", column: column })),
            cell: ({ row }) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "size-7", children: [_jsx(AvatarImage, { src: row.original.avatar, alt: row.original.name }), _jsx(AvatarFallback, { children: row.original.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("") })] }), _jsx("span", { className: "text-foreground font-medium", children: row.original.name })] })),
            minSize: 150,
            meta: {
                autoSize: true,
            },
            enableSorting: true,
        },
        {
            accessorKey: "department",
            id: "department",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Department", column: column })),
            cell: ({ row }) => row.original.department,
            size: 150,
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
            cell: ({ row }) => (_jsxs("span", { className: "tabular-nums", children: ["$", row.original.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })] })),
            size: 140,
            enableSorting: true,
            enableResizing: true,
        },
    ], []);
    const table = useTable({
        features: dataGridFeatures,
        // No pagination row model on v8, so every row rendered. The shared
        // bundle registers one, and manualPagination is v9's way to say the
        // data is already the page - it keeps the pagination APIs while
        // leaving the rows unsliced.
        manualPagination: true,
        columns,
        data: allData,
        getRowId: (row) => row.id,
        state: { sorting },
        onSortingChange: setSorting,
    });
    return (_jsx(DataGrid, { table: table, recordCount: allData.length, tableLayout: {
            columnsResizable: true,
            headerSticky: true,
        }, tableClassNames: {
            headerSticky: "sticky top-0 z-10 bg-muted/90 backdrop-blur-xs",
        }, children: _jsxs(Card, { className: "w-full gap-0 p-0", children: [_jsxs(CardHeader, { className: "flex items-center justify-between gap-3 px-4 py-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Virtualized Directory" }), _jsx(CardAction, { children: _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "RefreshCwIcon", tabler: "IconRefresh", hugeicons: "RefreshIcon", phosphor: "ArrowClockwiseIcon", remixicon: "RiRefreshLine" }), "Refresh"] }) })] }), _jsx(CardContent, { className: "border-t p-0", children: _jsx(DataGridScrollArea, { className: "h-[480px]", children: _jsx(DataGridTableVirtual, { estimateSize: 49 }) }) })] }) }));
}
