"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { DataGrid, DataGridContainer, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Card } from "../../../../../../../adapters/layout.tsx";
const users = [
    {
        id: "1",
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        initials: "AJ",
    },
    {
        id: "2",
        name: "Sarah Chen",
        email: "sarah@example.com",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        initials: "SC",
    },
    {
        id: "3",
        name: "Michael Rodriguez",
        email: "michael@example.com",
        avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
        initials: "MR",
    },
    {
        id: "4",
        name: "Emma Wilson",
        email: "emma@example.com",
        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        initials: "EW",
    },
    {
        id: "5",
        name: "David Kim",
        email: "david@example.com",
        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
        initials: "DK",
    },
    {
        id: "6",
        name: "Aron Thompson",
        email: "lisa@example.com",
        avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
        initials: "LT",
    },
    {
        id: "7",
        name: "James Brown",
        email: "james@example.com",
        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
        initials: "JB",
    },
    {
        id: "8",
        name: "Maria Garcia",
        email: "maria@example.com",
        avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
        initials: "MG",
    },
    {
        id: "9",
        name: "Nick Johnson",
        email: "nick@example.com",
        avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
        initials: "NJ",
    },
    {
        id: "10",
        name: "Liam Thompson",
        email: "liam@example.com",
        avatar: "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
        initials: "LT",
    },
];
const demoData = users.map((user, index) => ({
    ...user,
    availability: ["online", "away", "busy", "offline"][index % 4],
    status: (index % 2 === 0 ? "active" : "inactive"),
    flag: ["us", "gb", "ca", "au", "de", "my", "es", "jp", "fr", "it"][index % 10],
    company: [
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
    ][index % 10],
    role: [
        "CEO",
        "CTO",
        "Designer",
        "Developer",
        "Lawyer",
        "Director",
        "Product Manager",
        "Marketing Lead",
        "Data Scientist",
        "Engineer",
    ][index % 10],
    joined: "Jan, 2024",
    location: [
        "United States",
        "United Kingdom",
        "Canada",
        "Australia",
        "Germany",
        "Malaysia",
        "Spain",
        "Japan",
        "France",
        "Italy",
    ][index % 10],
    balance: 5143.03 + index * 100,
}));
export default function Pattern() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [sorting, setSorting] = useState([
        { id: "name", desc: true },
    ]);
    const [columnOrder, setColumnOrder] = useState([]);
    const columns = useMemo(() => [
        {
            accessorKey: "name",
            id: "name",
            header: "Name",
            cell: ({ row }) => {
                return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "size-8", children: [_jsx(AvatarImage, { src: row.original.avatar, alt: row.original.name }), _jsx(AvatarFallback, { children: row.original.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("") })] }), _jsxs("div", { className: "space-y-px", children: [_jsx("div", { className: "text-foreground font-medium", children: row.original.name }), _jsx("div", { className: "text-muted-foreground", children: row.original.email })] })] }));
            },
            size: 250,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "company",
            header: "Company",
            cell: (info) => _jsx("span", { children: info.getValue() }),
            size: 100,
            meta: {
                headerClassName: "",
            },
        },
        {
            accessorKey: "role",
            header: "Occupation",
            cell: (info) => _jsx("span", { children: info.getValue() }),
            size: 100,
            meta: {
                headerClassName: "",
            },
        },
        {
            accessorKey: "balance",
            header: "Salary",
            cell: (info) => (_jsxs("span", { className: "font-semibold", children: ["$", info.getValue().toFixed(2)] })),
            size: 100,
        },
    ], []);
    const table = useTable({
        features: dataGridFeatures,
        columns,
        data: demoData,
        pageCount: Math.ceil((demoData?.length || 0) / pagination.pageSize),
        getRowId: (row) => row.id,
        state: {
            pagination,
            sorting,
            columnOrder,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnOrderChange: setColumnOrder,
    });
    return (_jsx(DataGrid, { table: table, recordCount: demoData?.length || 0, tableLayout: {
            cellBorder: true,
        }, children: _jsxs("div", { className: "w-full space-y-2.5", children: [_jsx(Card, { className: "p-0", children: _jsx(DataGridContainer, { children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTable, {}) }) }) }), _jsx(DataGridPagination, {})] }) }));
}
