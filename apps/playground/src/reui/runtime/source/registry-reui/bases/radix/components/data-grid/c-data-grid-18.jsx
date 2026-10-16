"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { DataGrid, DataGridContainer, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Card } from "../../../../../../../adapters/layout.tsx";
const demoData = [
    {
        id: "1",
        name: "Alex Johnson",
        availability: "online",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        status: "active",
        flag: "us",
        email: "alex@apple.com",
        company: "Apple",
        role: "CEO",
        joined: "Jan, 2024",
        location: "United States",
        balance: 5143.03,
    },
    {
        id: "2",
        name: "Sarah Chen",
        availability: "away",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        status: "inactive",
        flag: "gb",
        email: "sarah@openai.com",
        company: "OpenAI",
        role: "CTO",
        joined: "Mar, 2023",
        location: "United Kingdom",
        balance: 4321.87,
    },
    {
        id: "3",
        name: "Michael Rodriguez",
        availability: "busy",
        avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
        status: "active",
        flag: "ca",
        email: "michael@meta.com",
        company: "Meta",
        role: "Designer",
        joined: "Jun, 2022",
        location: "Canada",
        balance: 7654.98,
    },
    {
        id: "4",
        name: "Emma Wilson",
        availability: "offline",
        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        status: "inactive",
        flag: "au",
        email: "emma@tesla.com",
        company: "Tesla",
        role: "Developer",
        joined: "Sep, 2024",
        location: "Australia",
        balance: 3456.45,
    },
    {
        id: "5",
        name: "David Kim",
        availability: "online",
        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
        status: "active",
        flag: "de",
        email: "david@sap.com",
        company: "SAP",
        role: "Lawyer",
        joined: "Nov, 2023",
        location: "Germany",
        balance: 9876.54,
    },
    {
        id: "6",
        name: "Aron Thompson",
        availability: "away",
        avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
        status: "active",
        flag: "my",
        email: "aron@keenthemes.com",
        company: "Keenthemes",
        role: "Director",
        joined: "Feb, 2022",
        location: "Malaysia",
        balance: 6214.22,
    },
    {
        id: "7",
        name: "James Brown",
        availability: "busy",
        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
        status: "inactive",
        flag: "es",
        email: "james@bbva.es",
        company: "BBVA",
        role: "Product Manager",
        joined: "Aug, 2024",
        location: "Spain",
        balance: 5321.77,
    },
    {
        id: "8",
        name: "Maria Garcia",
        availability: "offline",
        avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
        status: "active",
        flag: "jp",
        email: "maria@sony.jp",
        company: "Sony",
        role: "Marketing Lead",
        joined: "Dec, 2023",
        location: "Japan",
        balance: 8452.39,
    },
    {
        id: "9",
        name: "Nick Johnson",
        availability: "online",
        avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
        status: "inactive",
        flag: "fr",
        email: "nick@lvmh.fr",
        company: "LVMH",
        role: "Data Scientist",
        joined: "Apr, 2022",
        location: "France",
        balance: 7345.1,
    },
    {
        id: "10",
        name: "Liam Thompson",
        availability: "away",
        avatar: "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
        status: "inactive",
        flag: "it",
        email: "liam@eni.it",
        company: "ENI",
        role: "Engineer",
        joined: "Jul, 2024",
        location: "Italy",
        balance: 5214.88,
    },
    {
        id: "11",
        name: "Alex Johnson",
        availability: "busy",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        status: "inactive",
        flag: "br",
        email: "alex@vale.br",
        company: "Vale",
        role: "Software Engineer",
        joined: "May, 2023",
        location: "Brazil",
        balance: 9421.5,
    },
    {
        id: "12",
        name: "Sarah Chen",
        availability: "offline",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        status: "active",
        flag: "in",
        email: "sarah@tata.in",
        company: "Tata",
        role: "Sales Manager",
        joined: "Oct, 2024",
        location: "India",
        balance: 4521.67,
    },
];
export default function Pattern() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [sorting, setSorting] = useState([
        { id: "name", desc: true },
    ]);
    const columns = useMemo(() => [
        {
            accessorKey: "name",
            id: "name",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "User", visibility: true, column: column })),
            cell: ({ row }) => {
                return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "size-8", children: [_jsx(AvatarImage, { src: row.original.avatar, alt: row.original.name }), _jsx(AvatarFallback, { children: row.original.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("") })] }), _jsxs("div", { className: "space-y-px", children: [_jsx("div", { className: "text-foreground font-medium", children: row.original.name }), _jsx("div", { className: "text-muted-foreground", children: row.original.email })] })] }));
            },
            minSize: 200,
            meta: {
                autoSize: true,
            },
            enableSorting: true,
            enableHiding: false,
            enableResizing: true,
        },
        {
            accessorKey: "email",
            id: "email",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Email", visibility: true, column: column })),
            cell: (info) => (_jsx("a", { href: `mailto:${info.getValue()}`, className: "hover:text-primary hover:underline", children: info.getValue() })),
            size: 150,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        },
        {
            accessorKey: "location",
            id: "location",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Location", visibility: true, column: column })),
            cell: ({ row }) => {
                return (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("img", { src: `https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`, alt: row.original.flag, className: "size-4 rounded-full object-cover" }), _jsx("div", { className: "text-foreground font-medium", children: row.original.location })] }));
            },
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
                const status = row.original.status;
                if (status == "active") {
                    return _jsx(Badge, { variant: "success-outline", children: "Approved" });
                }
                else {
                    return _jsx(Badge, { variant: "warning-outline", children: "Pending" });
                }
            },
            size: 150,
            enableSorting: true,
            enableHiding: true,
            enableResizing: false,
        },
    ], []);
    const [columnOrder, setColumnOrder] = useState(columns.map((column) => column.id));
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
            columnsPinnable: true,
            columnsResizable: true,
            columnsMovable: true,
            columnsVisibility: true,
        }, children: _jsxs("div", { className: "w-full space-y-2.5", children: [_jsx(Card, { className: "p-0", children: _jsx(DataGridContainer, { children: _jsx(DataGridScrollArea, { className: "w-full overflow-hidden", children: _jsx(DataGridTable, {}) }) }) }), _jsx(DataGridPagination, {})] }) }));
}
