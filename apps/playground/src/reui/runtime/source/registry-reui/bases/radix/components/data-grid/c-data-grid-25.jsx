"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { DataGrid, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable, DataGridTableFootRow, DataGridTableFootRowCell, } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardFooter, CardHeader, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const demoData = [
    {
        id: "1",
        name: "Alex Johnson",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        location: "United States",
        flag: "us",
        status: "Active",
        balance: 5143.03,
    },
    {
        id: "2",
        name: "Sarah Chen",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        location: "United Kingdom",
        flag: "gb",
        status: "Inactive",
        balance: 4321.87,
    },
    {
        id: "3",
        name: "Michael Rodriguez",
        avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
        location: "Canada",
        flag: "ca",
        status: "Blocked",
        balance: 7654.98,
    },
    {
        id: "4",
        name: "Emma Wilson",
        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        location: "Australia",
        flag: "au",
        status: "Inactive",
        balance: 3456.45,
    },
    {
        id: "5",
        name: "David Kim",
        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
        location: "Germany",
        flag: "de",
        status: "Active",
        balance: 9876.54,
    },
    {
        id: "6",
        name: "Aron Thompson",
        avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
        location: "Malaysia",
        flag: "my",
        status: "Pending",
        balance: 6214.22,
    },
    {
        id: "7",
        name: "James Brown",
        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
        location: "Spain",
        flag: "es",
        status: "Inactive",
        balance: 5321.77,
    },
    {
        id: "8",
        name: "Maria Garcia",
        avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
        location: "Japan",
        flag: "jp",
        status: "Blocked",
        balance: 8452.39,
    },
    {
        id: "9",
        name: "Nick Johnson",
        avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
        location: "France",
        flag: "fr",
        status: "Pending",
        balance: 7345.1,
    },
    {
        id: "10",
        name: "Liam Thompson",
        avatar: "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
        location: "Italy",
        flag: "it",
        status: "Inactive",
        balance: 5214.88,
    },
];
export default function Pattern() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [sorting, setSorting] = useState([
        { id: "name", desc: false },
    ]);
    const stats = useMemo(() => {
        const count = demoData.length;
        const activeCount = demoData.filter((r) => r.status === "Active").length;
        const balances = demoData.map((r) => r.balance);
        const minBalance = Math.min(...balances);
        const maxBalance = Math.max(...balances);
        const avgBalance = balances.reduce((a, b) => a + b, 0) / count;
        return { count, activeCount, minBalance, maxBalance, avgBalance };
    }, []);
    const fmt = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });
    const columns = useMemo(() => [
        {
            accessorKey: "name",
            id: "name",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "User", visibility: true, column: column })),
            cell: ({ row }) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "size-8", children: [_jsx(AvatarImage, { src: row.original.avatar, alt: row.original.name }), _jsx(AvatarFallback, { children: row.original.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("") })] }), _jsx("div", { className: "text-foreground font-medium", children: row.original.name })] })),
            size: 220,
            meta: {
                autoSize: true,
            },
            enableSorting: true,
            enableHiding: false,
            enableResizing: true,
        },
        {
            accessorKey: "location",
            id: "location",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Location", visibility: true, column: column })),
            cell: ({ row }) => (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("img", { src: `https://flagcdn.com/${row.original.flag}.svg`, alt: row.original.flag, className: "size-4 rounded-full object-cover" }), _jsx("div", { className: "text-foreground font-medium", children: row.original.location })] })),
            size: 150,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        },
        {
            accessorKey: "status",
            id: "status",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Status", visibility: true, column: column })),
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
            size: 110,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        },
        {
            accessorKey: "balance",
            id: "balance",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Balance", visibility: true, column: column })),
            cell: ({ row }) => (_jsx("div", { className: "text-foreground font-medium tabular-nums", children: fmt(row.original.balance) })),
            size: 130,
            enableSorting: true,
            enableHiding: true,
            enableResizing: false,
        },
    ], []);
    const [columnOrder, setColumnOrder] = useState(columns.map((c) => c.id));
    const table = useTable({
        features: dataGridFeatures,
        columns,
        data: demoData,
        pageCount: Math.ceil(demoData.length / pagination.pageSize),
        getRowId: (row) => row.id,
        state: { pagination, sorting, columnOrder },
        onColumnOrderChange: setColumnOrder,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
    });
    const visibleCount = table.getVisibleLeafColumns().length;
    const footer = (_jsxs(_Fragment, { children: [_jsxs(DataGridTableFootRow, { children: [_jsx(DataGridTableFootRowCell, { colSpan: visibleCount - 2 }), _jsx(DataGridTableFootRowCell, { children: _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-muted-foreground text-xs", children: "Min" }), _jsx("span", { className: "tabular-nums", children: fmt(stats.minBalance) })] }) }), _jsx(DataGridTableFootRowCell, { children: _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-muted-foreground text-xs", children: "Max" }), _jsx("span", { className: "tabular-nums", children: fmt(stats.maxBalance) })] }) })] }), _jsxs(DataGridTableFootRow, { children: [_jsx(DataGridTableFootRowCell, { colSpan: visibleCount - 2, children: _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "text-muted-foreground", children: "Avg balance" }), _jsx("span", { className: "tabular-nums", children: fmt(stats.avgBalance) })] }) }), _jsx(DataGridTableFootRowCell, { colSpan: 2, children: _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "text-muted-foreground", children: "Active" }), _jsx(Badge, { variant: "success", size: "sm", children: stats.activeCount })] }) })] })] }));
    return (_jsx(DataGrid, { table: table, recordCount: demoData.length, tableLayout: {
            columnsPinnable: true,
            columnsResizable: true,
            columnsVisibility: true,
        }, children: _jsxs(Card, { className: "w-full gap-0 p-0", children: [_jsxs(CardHeader, { className: "flex items-center justify-between px-3.5 py-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(IconPlaceholder, { lucide: "BarChartIcon", tabler: "IconChartBar", hugeicons: "BarChart01Icon", phosphor: "ChartBarIcon", remixicon: "RiBarChartLine", className: "text-muted-foreground size-4" }), _jsx("span", { className: "text-foreground text-sm font-medium", children: "Team Summary" })] }), _jsx(CardAction, { children: _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "RefreshCwIcon", tabler: "IconRefresh", hugeicons: "RefreshIcon", phosphor: "ArrowClockwiseIcon", remixicon: "RiRefreshLine" }), "Refresh"] }) })] }), _jsx(CardContent, { className: "border-y px-0", children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTable, { footerContent: footer }) }) }), _jsx(CardFooter, { className: "border-none bg-transparent! px-2.5 py-2", children: _jsx(DataGridPagination, {}) })] }) }));
}
