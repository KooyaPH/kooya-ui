"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { DataGrid, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTableVirtual } from "../../reui/data-grid/data-grid-table-virtual.jsx";
import { useTable } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardHeader, } from "../../../../../../../adapters/layout.tsx";
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
const statuses = ["Active", "Inactive", "Pending"];
const TOTAL_SERVER_RECORDS = 200;
const PAGE_SIZE = 20;
function simulateRow(index) {
    const name = names[index % names.length];
    return {
        id: String(index + 1),
        name,
        avatar: avatars[index % avatars.length],
        email: `${name.toLowerCase().replace(" ", ".")}${index}@company.com`,
        status: statuses[index % statuses.length],
        balance: Math.round((Math.random() * 9000 + 1000) * 100) / 100,
    };
}
function createInitialData() {
    return Array.from({ length: PAGE_SIZE }, (_, index) => simulateRow(index));
}
export default function Pattern() {
    const [sorting, setSorting] = useState([]);
    const [initialData] = useState(() => createInitialData());
    const [data, setData] = useState(initialData);
    const [isFetching, setIsFetching] = useState(false);
    const [resetVersion, setResetVersion] = useState(0);
    const fetchTimeoutRef = useRef(null);
    const hasMore = data.length < TOTAL_SERVER_RECORDS;
    const clearPendingFetch = useCallback(() => {
        if (fetchTimeoutRef.current !== null) {
            window.clearTimeout(fetchTimeoutRef.current);
            fetchTimeoutRef.current = null;
        }
    }, []);
    useEffect(() => () => clearPendingFetch(), [clearPendingFetch]);
    const handleReset = useCallback(() => {
        clearPendingFetch();
        setSorting([]);
        setData(initialData);
        setIsFetching(false);
        setResetVersion((version) => version + 1);
    }, [clearPendingFetch, initialData]);
    const fetchMore = useCallback(() => {
        if (isFetching || !hasMore)
            return;
        clearPendingFetch();
        setIsFetching(true);
        const timeoutId = window.setTimeout(() => {
            setData((prev) => {
                const next = Array.from({ length: PAGE_SIZE }, (_, index) => simulateRow(prev.length + index));
                return [...prev, ...next];
            });
            setIsFetching(false);
            fetchTimeoutRef.current = null;
        }, 800);
        fetchTimeoutRef.current = timeoutId;
    }, [clearPendingFetch, hasMore, isFetching]);
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
                                    .map((namePart) => namePart[0])
                                    .join("") })] }), _jsxs("div", { children: [_jsx("div", { className: "text-foreground font-medium", children: row.original.name }), _jsx("div", { className: "text-muted-foreground text-xs", children: row.original.email })] })] })),
            minSize: 200,
            meta: {
                autoSize: true,
            },
            enableSorting: true,
        },
        {
            accessorKey: "status",
            id: "status",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Status", column: column })),
            cell: ({ row }) => {
                const status = row.original.status;
                if (status === "Active") {
                    return _jsx(Badge, { variant: "success-outline", children: "Active" });
                }
                if (status === "Inactive") {
                    return _jsx(Badge, { variant: "info-outline", children: "Inactive" });
                }
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
        data,
        getRowId: (row) => row.id,
        state: { sorting },
        onSortingChange: setSorting,
    });
    return (_jsx(DataGrid, { table: table, recordCount: data.length, tableLayout: {
            columnsResizable: true,
            headerSticky: true,
        }, tableClassNames: {
            headerSticky: "sticky top-0 z-10 bg-muted/90 backdrop-blur-xs",
        }, children: _jsxs(Card, { className: "w-full gap-0 p-0", children: [_jsxs(CardHeader, { className: "flex items-center justify-between gap-3 px-4 py-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(IconPlaceholder, { lucide: "CloudDownloadIcon", tabler: "IconCloudDownload", hugeicons: "CloudDownloadIcon", phosphor: "CloudArrowDownIcon", remixicon: "RiCloudLine", className: "text-muted-foreground size-4" }), _jsx("span", { className: "text-foreground text-sm font-medium", children: "Remote Data" }), _jsxs(Badge, { variant: "secondary", size: "sm", children: [data.length, " / ", TOTAL_SERVER_RECORDS] })] }), _jsxs(CardAction, { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: handleReset, children: [_jsx(IconPlaceholder, { lucide: "RefreshCwIcon", tabler: "IconRefresh", hugeicons: "RefreshIcon", phosphor: "ArrowClockwiseIcon", remixicon: "RiRefreshLine", className: "size-4" }), "Start over"] }), _jsx(Button, { variant: "ghost", size: "icon", className: "size-8", "aria-label": "Download snapshot", title: "Download snapshot", children: _jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download04Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownloadLine", className: "size-4" }) })] })] }), _jsx(CardContent, { className: "border-t p-0", children: _jsx(DataGridScrollArea, { className: "h-[480px]", children: _jsx(DataGridTableVirtual, { estimateSize: 57, onFetchMore: fetchMore, isFetchingMore: isFetching, hasMore: hasMore }) }, resetVersion) })] }) }));
}
