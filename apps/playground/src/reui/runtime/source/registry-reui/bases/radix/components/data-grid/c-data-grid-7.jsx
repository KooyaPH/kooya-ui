"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { DataGrid, DataGridContainer, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable, DataGridTableRowSelect, DataGridTableRowSelectAll, } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { cn } from "cn";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
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
        joined: "Apr, 2021",
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
        joined: "Jul, 2020",
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
        joined: "Mar, 2019",
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
        joined: "Jan, 2022",
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
        joined: "May, 2023",
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
        joined: "Nov, 2018",
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
        joined: "Jun, 2021",
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
        joined: "Oct, 2020",
        location: "Japan",
        balance: 8452.39,
    },
    {
        id: "9",
        name: "Nick Johnson",
        availability: "online",
        avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
        status: "active",
        flag: "fr",
        email: "nick@lvmh.fr",
        company: "LVMH",
        role: "Data Scientist",
        joined: "Sep, 2019",
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
        joined: "Feb, 2023",
        location: "Italy",
        balance: 5214.88,
    },
    {
        id: "11",
        name: "Alex Johnson",
        availability: "busy",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        status: "active",
        flag: "br",
        email: "alex@vale.br",
        company: "Vale",
        role: "Software Engineer",
        joined: "Dec, 2022",
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
        joined: "Mar, 2020",
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
    const [rowSelection, setRowSelection] = useState({});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedIds, setSelectedIds] = useState([]);
    useEffect(() => {
        const selectedRowIds = Object.keys(rowSelection);
        if (selectedRowIds.length > 0) {
            setSelectedIds(selectedRowIds);
        }
        else {
            setSelectedIds([]);
        }
    }, [rowSelection]);
    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: () => _jsx(DataGridTableRowSelectAll, {}),
            cell: ({ row }) => _jsx(DataGridTableRowSelect, { row: row }),
            enableSorting: false,
            size: 20,
            meta: {
                headerClassName: "",
                cellClassName: "",
            },
        },
        {
            accessorKey: "name",
            id: "name",
            header: "Name",
            cell: ({ row }) => {
                const availability = row.original.availability;
                const statusColors = {
                    online: "bg-green-500",
                    away: "bg-yellow-500",
                    busy: "bg-orange-500",
                    offline: "bg-gray-400",
                };
                return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "size-8", children: [_jsx(AvatarImage, { src: row.original.avatar, alt: row.original.name }), _jsx(AvatarFallback, { children: row.original.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("") }), _jsx(AvatarBadge, { className: cn("size-1.5! p-0", statusColors[availability] || statusColors.offline) })] }), _jsxs("div", { className: "space-y-px", children: [_jsx("div", { className: "text-foreground font-medium", children: row.original.name }), _jsx("div", { className: "text-muted-foreground", children: row.original.email })] })] }));
            },
            size: 200,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => {
                return (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("img", { src: `https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`, alt: row.original.flag, className: "size-4 rounded-full object-cover" }), _jsx("div", { className: "text-foreground font-medium", children: row.original.location })] }));
            },
            size: 180,
            meta: {
                headerClassName: "",
                cellClassName: "text-start",
            },
        },
        {
            accessorKey: "joined",
            header: "Joined",
            cell: (info) => info.getValue(),
            size: 120,
            meta: {
                headerClassName: "",
                cellClassName: "font-medium",
            },
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
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
    });
    return (_jsx(DataGrid, { table: table, recordCount: demoData?.length || 0, children: _jsxs("div", { className: "w-full space-y-2.5", children: [_jsx(DataGridContainer, { children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTable, {}) }) }), _jsx(DataGridPagination, {})] }) }));
}
