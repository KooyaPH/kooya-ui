"use client";
// This file keeps "use no memo": its own cell/header templates read state
// through builder calls on a stable row/column, which React Compiler cannot
// see. The primitive wraps its own such reads in TanStack's Subscribe; a
// consumer template has to opt out or subscribe itself.
"use no memo";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { DataGrid, DataGridContainer, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
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
        details: "Alex is a visionary leader at Apple, focusing on innovation and team growth.",
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
        details: "Sarah is a technology pioneer specializing in artificial intelligence and machine learning.",
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
        details: "Michael is a creative designer passionate about building user-centric experiences.",
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
        details: "Emma is a talented developer focused on innovative solutions in automotive technology.",
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
        details: "David is a corporate lawyer specializing in technology and software agreements.",
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
        details: "Aron oversees product development and team leadership at Keenthemes.",
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
        details: "James manages product development and strategy for BBVA's digital platforms.",
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
        details: "Maria leads innovative marketing campaigns for Sony's flagship products.",
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
        details: "Nick is a data scientist optimizing sales and marketing analytics at LVMH.",
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
        details: "Liam is a lead engineer developing sustainable energy solutions at ENI.",
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
        details: "Alex develops cutting-edge software to optimize mining operations at Vale.",
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
        details: "Sarah manages international sales for Tata's industrial and automotive products.",
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
            id: "id",
            header: () => null,
            cell: ({ row }) => {
                return row.getCanExpand() ? (_jsx(Button, { className: "size-6 text-muted-foreground hover:bg-transparent",
                    onClick: row.getToggleExpandedHandler(),
                    mode: "icon",
                    variant: "ghost", children: row.getIsExpanded() ? (_jsx(IconPlaceholder, { lucide: "ChevronUpIcon", tabler: "IconChevronUp", hugeicons: "ArrowUp01Icon", phosphor: "CaretUpIcon", remixicon: "RiArrowUpSLine", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" })) })) : null;
            },
            size: 25,
            meta: {
                expandedContent: (row) => (_jsx("div", { className: "text-muted-foreground ms-12 py-3 text-sm", children: row.details })),
            },
        },
        {
            accessorKey: "name",
            id: "name",
            header: "Name",
            cell: ({ row }) => {
                return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { className: "size-6", children: [_jsx(AvatarImage, { src: row.original.avatar, alt: row.original.name }), _jsx(AvatarFallback, { children: row.original.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("") })] }), _jsx("a", { href: "#", className: "text-foreground hover:text-primary font-medium", children: row.original.name })] }));
            },
            size: 150,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => (_jsx("a", { href: `mailto:${info.getValue()}`, className: "hover:text-primary hover:underline", children: info.getValue() })),
            size: 150,
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("img", { src: `https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`, alt: row.original.flag, className: "size-4 rounded-full object-cover" }), _jsx("div", { className: "text-foreground font-medium", children: row.original.location })] })),
            size: 175,
            meta: {
                headerClassName: "",
                cellClassName: "text-start",
            },
        },
        {
            accessorKey: "status",
            id: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                if (status == "active") {
                    return _jsx(Badge, { variant: "success-outline", children: "Approved" });
                }
                else {
                    return _jsx(Badge, { variant: "warning-outline", children: "Pending" });
                }
            },
            size: 100,
        },
    ], []);
    const table = useTable({
        features: dataGridFeatures,
        columns,
        data: demoData,
        pageCount: Math.ceil((demoData?.length || 0) / pagination.pageSize),
        getRowId: (row) => row.id,
        getRowCanExpand: (row) => Boolean(row.original.details),
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
    });
    return (_jsx(DataGrid, { table: table, recordCount: demoData?.length || 0, tableLayout: { headerBackground: false }, children: _jsxs("div", { className: "w-full space-y-2.5", children: [_jsx(DataGridContainer, { children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTable, {}) }) }), _jsx(DataGridPagination, {})] }) }));
}
