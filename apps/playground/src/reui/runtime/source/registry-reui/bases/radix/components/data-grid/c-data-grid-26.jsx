"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const demoData = [
    {
        id: "1",
        name: "Alex Johnson",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        status: "Active",
        balance: 5143.03,
        transactions: 48,
    },
    {
        id: "2",
        name: "Sarah Chen",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        status: "Inactive",
        balance: 4321.87,
        transactions: 31,
    },
    {
        id: "3",
        name: "Michael Rodriguez",
        avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
        status: "Blocked",
        balance: 7654.98,
        transactions: 67,
    },
    {
        id: "4",
        name: "Emma Wilson",
        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        status: "Inactive",
        balance: 3456.45,
        transactions: 22,
    },
    {
        id: "5",
        name: "David Kim",
        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
        status: "Active",
        balance: 9876.54,
        transactions: 93,
    },
    {
        id: "6",
        name: "Aron Thompson",
        avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
        status: "Pending",
        balance: 6214.22,
        transactions: 55,
    },
    {
        id: "7",
        name: "James Brown",
        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
        status: "Inactive",
        balance: 5321.77,
        transactions: 40,
    },
    {
        id: "8",
        name: "Maria Garcia",
        avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
        status: "Blocked",
        balance: 8452.39,
        transactions: 74,
    },
    {
        id: "9",
        name: "Nick Johnson",
        avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
        status: "Pending",
        balance: 7345.1,
        transactions: 61,
    },
    {
        id: "10",
        name: "Liam Thompson",
        avatar: "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
        status: "Inactive",
        balance: 5214.88,
        transactions: 37,
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
    const aggregates = useMemo(() => {
        const n = demoData.length;
        const balances = demoData.map((r) => r.balance);
        const txns = demoData.map((r) => r.transactions);
        return {
            avgBalance: balances.reduce((a, b) => a + b, 0) / n,
            minBalance: Math.min(...balances),
            maxBalance: Math.max(...balances),
            avgTxns: Math.round(txns.reduce((a, b) => a + b, 0) / n),
            minTxns: Math.min(...txns),
            maxTxns: Math.max(...txns),
        };
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
            minSize: 200,
            meta: {
                autoSize: true,
            },
            enableSorting: true,
            enableHiding: false,
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
            size: 150,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        },
        {
            accessorKey: "balance",
            id: "balance",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Balance", visibility: true, column: column })),
            cell: ({ row }) => (_jsx("div", { className: "text-foreground font-medium tabular-nums", children: fmt(row.original.balance) })),
            size: 150,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        },
        {
            accessorKey: "transactions",
            id: "transactions",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Transactions", visibility: true, column: column })),
            cell: ({ row }) => (_jsx("div", { className: "text-foreground font-medium tabular-nums", children: row.original.transactions })),
            size: 150,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
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
    const footer = (_jsxs(DataGridTableFootRow, { children: [_jsx(DataGridTableFootRowCell, { colSpan: 2, children: _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-muted-foreground", children: "Summary" }), _jsx("span", { className: "text-foreground font-medium", children: "Across all members" }), _jsxs("span", { className: "text-muted-foreground tabular-nums", children: [demoData.length, " members"] })] }) }), _jsx(DataGridTableFootRowCell, { children: _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-muted-foreground", children: "Avg" }), _jsx("span", { className: "tabular-nums", children: fmt(aggregates.avgBalance) }), _jsxs("span", { className: "text-muted-foreground tabular-nums", children: [fmt(aggregates.minBalance), " - ", fmt(aggregates.maxBalance)] })] }) }), _jsx(DataGridTableFootRowCell, { children: _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-muted-foreground", children: "Avg" }), _jsx("span", { className: "tabular-nums", children: aggregates.avgTxns }), _jsxs("span", { className: "text-muted-foreground tabular-nums", children: [aggregates.minTxns, " - ", aggregates.maxTxns] })] }) })] }));
    return (_jsx(DataGrid, { table: table, recordCount: demoData.length, tableLayout: {
            columnsPinnable: true,
            columnsResizable: true,
            columnsVisibility: true,
        }, children: _jsxs(Card, { className: "w-full gap-0 p-0", children: [_jsxs(CardHeader, { className: "flex items-center justify-between gap-3 px-4 py-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Column Aggregates" }), _jsx(CardAction, { children: _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownloadLine" }), "Export"] }) })] }), _jsx(CardContent, { className: "border-y px-0", children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTable, { footerContent: footer }) }) }), _jsx(CardFooter, { className: "border-none bg-transparent! px-3.5 py-2", children: _jsx(DataGridPagination, {}) })] }) }));
}
