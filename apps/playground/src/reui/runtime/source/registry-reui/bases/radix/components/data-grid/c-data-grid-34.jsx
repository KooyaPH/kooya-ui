"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { DataGrid, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
import { Skeleton } from "../../../../../../../adapters/controls.tsx";
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
const companies = [
    "Apple",
    "OpenAI",
    "Meta",
    "Tesla",
    "SAP",
    "Keenthemes",
    "BBVA",
    "Sony",
    "LVMH",
    "ENI",
];
const statuses = ["Active", "Inactive", "Pending"];
// Deterministic, so sorting and paging are reproducible across fetches. A
// non-round total makes the "1 - 5 of 487" info text read like a real API.
const TOTAL_SERVER_RECORDS = 487;
const serverRecords = Array.from({ length: TOTAL_SERVER_RECORDS }, (_, index) => {
    const name = names[index % names.length];
    return {
        id: String(index + 1),
        name,
        avatar: avatars[index % avatars.length],
        email: `${name.toLowerCase().replace(" ", ".")}${index + 1}@company.com`,
        company: companies[(index * 3) % companies.length],
        status: statuses[index % statuses.length],
        balance: Math.round((1000 + ((index * 137.17) % 9000)) * 100) / 100,
    };
});
/**
 * The simulated server. Everything inside this function is what a real
 * backend does with the query string of a paged endpoint: filter, sort, count,
 * slice. Replace the whole body with a fetch to your own API and keep the
 * return shape - one page of rows plus the total AFTER filtering.
 */
async function fetchServerPage(params) {
    // Latency, so the built-in skeleton state is actually visible in the demo.
    await new Promise((resolve) => setTimeout(resolve, 500));
    const search = params.search.toLowerCase();
    let rows = serverRecords;
    if (params.status !== "all") {
        rows = rows.filter((record) => record.status === params.status);
    }
    if (search) {
        rows = rows.filter((record) => [record.name, record.email, record.company].some((value) => value.toLowerCase().includes(search)));
    }
    const sort = params.sorting[0];
    if (sort) {
        const direction = sort.desc ? -1 : 1;
        rows = [...rows].sort((a, b) => {
            const left = a[sort.id];
            const right = b[sort.id];
            if (typeof left === "number" && typeof right === "number") {
                return (left - right) * direction;
            }
            return String(left).localeCompare(String(right)) * direction;
        });
    }
    const start = params.pageIndex * params.pageSize;
    return {
        rows: rows.slice(start, start + params.pageSize),
        total: rows.length,
    };
}
export default function Pattern() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [sorting, setSorting] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const hasActiveFilters = searchInput.trim() !== "" || status !== "all";
    const resetToFirstPage = () => setPagination((current) => current.pageIndex === 0 ? current : { ...current, pageIndex: 0 });
    // Debounce typing into one server query, and return to the first page: the
    // old page index is meaningless against a different filtered set.
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setSearch(searchInput.trim());
            setPagination((current) => current.pageIndex === 0 ? current : { ...current, pageIndex: 0 });
        }, 350);
        return () => window.clearTimeout(timeoutId);
    }, [searchInput]);
    // One fetch per settled query state. The request id guards against a slow
    // response landing after a newer one and overwriting fresher rows.
    const requestIdRef = useRef(0);
    useEffect(() => {
        const requestId = ++requestIdRef.current;
        setIsLoading(true);
        fetchServerPage({
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
            sorting,
            search,
            status,
        }).then((response) => {
            if (requestId !== requestIdRef.current)
                return;
            setData(response.rows);
            setTotal(response.total);
            setIsLoading(false);
        });
    }, [pagination.pageIndex, pagination.pageSize, sorting, search, status]);
    const columns = useMemo(() => [
        {
            accessorKey: "name",
            id: "name",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "User", column: column })),
            cell: ({ row }) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "size-7", children: [_jsx(AvatarImage, { src: row.original.avatar, alt: row.original.name }), _jsx(AvatarFallback, { children: row.original.name
                                    .split(" ")
                                    .map((namePart) => namePart[0])
                                    .join("") })] }), _jsxs("div", { children: [_jsx("div", { className: "text-foreground font-medium", children: row.original.name }), _jsx("div", { className: "text-muted-foreground text-xs", children: row.original.email })] })] })),
            minSize: 220,
            meta: {
                autoSize: true,
                skeleton: (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Skeleton, { className: "size-7 rounded-full" }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Skeleton, { className: "h-3.5 w-24" }), _jsx(Skeleton, { className: "h-3 w-36" })] })] })),
            },
            enableSorting: true,
        },
        {
            accessorKey: "company",
            id: "company",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Company", column: column })),
            cell: ({ row }) => (_jsx("span", { className: "text-foreground", children: row.original.company })),
            size: 130,
            meta: {
                skeleton: _jsx(Skeleton, { className: "h-4 w-20" }),
            },
            enableSorting: true,
        },
        {
            accessorKey: "status",
            id: "status",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Status", column: column })),
            cell: ({ row }) => {
                const rowStatus = row.original.status;
                if (rowStatus === "Active") {
                    return _jsx(Badge, { variant: "success-outline", children: "Active" });
                }
                if (rowStatus === "Inactive") {
                    return _jsx(Badge, { variant: "info-outline", children: "Inactive" });
                }
                return _jsx(Badge, { variant: "warning-outline", children: "Pending" });
            },
            size: 120,
            meta: {
                skeleton: _jsx(Skeleton, { className: "h-5 w-16" }),
            },
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
            meta: {
                skeleton: _jsx(Skeleton, { className: "h-4 w-24" }),
            },
            enableSorting: true,
        },
    ], []);
    const table = useTable({
        features: dataGridFeatures,
        columns,
        data,
        // Server-side mode: `data` is exactly one page, so paging and sorting are
        // the server's job instead of the row models'.
        manualPagination: true,
        manualSorting: true,
        // The server-side total. REQUIRED alongside recordCount below: without it
        // getPageCount() is derived from the one loaded page and the pagination
        // buttons collapse to a single page, while the info text still claims the
        // full count. recordCount only drives the "1 - 5 of N" text.
        rowCount: total,
        getRowId: (row) => row.id,
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
    });
    return (_jsx(DataGrid, { table: table, recordCount: total, isLoading: isLoading, tableLayout: { columnsResizable: true }, children: _jsxs(Card, { className: "w-full gap-3 py-3.5", children: [_jsxs(CardHeader, { className: "items-center px-3.5", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: ["Users", _jsx(Badge, { variant: "secondary", size: "sm", className: "tabular-nums", children: total })] }), _jsxs(CardAction, { className: "flex flex-wrap items-center justify-end gap-2", children: [_jsx(Input, { value: searchInput, onChange: (event) => setSearchInput(event.target.value), "aria-label": "Search users", placeholder: "Search name, email, company...", className: "w-56" }), _jsxs(Select, { value: status, 
                                    /* The primitive types the callback value as nullable; a null
                                       (nothing selected) means the unfiltered view. */
                                    onValueChange: (next) => {
                                        setStatus((next ?? "all"));
                                        resetToFirstPage();
                                    }, children: [_jsx(SelectTrigger, { className: "w-32", "aria-label": "Filter by status", children: _jsx(SelectValue, { placeholder: "Status", children: status === "all" ? "All statuses" : status }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All statuses" }), _jsx(SelectItem, { value: "Active", children: "Active" }), _jsx(SelectItem, { value: "Inactive", children: "Inactive" }), _jsx(SelectItem, { value: "Pending", children: "Pending" })] })] }), hasActiveFilters && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
                                        setSearchInput("");
                                        setSearch("");
                                        setStatus("all");
                                        resetToFirstPage();
                                    }, children: [_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-4" }), "Clear"] }))] })] }), _jsx(CardContent, { className: "border-t p-0", children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTable, {}) }) }), _jsx(CardFooter, { className: "border-none bg-transparent! px-3.5 py-0", children: _jsx(DataGridPagination, {}) })] }) }));
}
