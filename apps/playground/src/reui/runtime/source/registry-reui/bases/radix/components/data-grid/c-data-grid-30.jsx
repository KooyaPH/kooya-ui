"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { DataGrid, DataGridContainer, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable, DataGridTableRowExpand, } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Card } from "../../../../../../../adapters/layout.tsx";
const demoData = [
    {
        id: "eng",
        name: "Engineering",
        type: "department",
        status: "active",
        children: [
            {
                id: "eng-platform",
                name: "Platform",
                type: "team",
                status: "active",
                children: [
                    {
                        id: "eng-platform-1",
                        name: "Alex Johnson",
                        type: "member",
                        status: "active",
                        role: "Staff Engineer",
                        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
                        flag: "us",
                        location: "United States",
                    },
                    {
                        id: "eng-platform-2",
                        name: "Sarah Chen",
                        type: "member",
                        status: "active",
                        role: "Senior Engineer",
                        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
                        flag: "gb",
                        location: "United Kingdom",
                    },
                    {
                        id: "eng-platform-3",
                        name: "Michael Rodriguez",
                        type: "member",
                        status: "inactive",
                        role: "Frontend Engineer",
                        avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
                        flag: "ca",
                        location: "Canada",
                    },
                ],
            },
            {
                id: "eng-mobile",
                name: "Mobile",
                type: "team",
                status: "active",
                children: [
                    {
                        id: "eng-mobile-1",
                        name: "Emma Wilson",
                        type: "member",
                        status: "active",
                        role: "iOS Engineer",
                        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
                        flag: "au",
                        location: "Australia",
                    },
                    {
                        id: "eng-mobile-2",
                        name: "David Kim",
                        type: "member",
                        status: "active",
                        role: "Android Engineer",
                        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
                        flag: "de",
                        location: "Germany",
                    },
                ],
            },
        ],
    },
    {
        id: "design",
        name: "Design",
        type: "department",
        status: "active",
        children: [
            {
                id: "design-product",
                name: "Product Design",
                type: "team",
                status: "active",
                children: [
                    {
                        id: "design-product-1",
                        name: "Aron Thompson",
                        type: "member",
                        status: "active",
                        role: "Design Lead",
                        avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
                        flag: "my",
                        location: "Malaysia",
                    },
                    {
                        id: "design-product-2",
                        name: "Maria Garcia",
                        type: "member",
                        status: "active",
                        role: "Product Designer",
                        avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
                        flag: "jp",
                        location: "Japan",
                    },
                    {
                        id: "design-product-3",
                        name: "James Brown",
                        type: "member",
                        status: "inactive",
                        role: "UX Researcher",
                        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
                        flag: "es",
                        location: "Spain",
                    },
                ],
            },
            {
                id: "design-brand",
                name: "Brand",
                type: "team",
                status: "active",
                children: [
                    {
                        id: "design-brand-1",
                        name: "Nick Johnson",
                        type: "member",
                        status: "active",
                        role: "Brand Designer",
                        avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
                        flag: "fr",
                        location: "France",
                    },
                    {
                        id: "design-brand-2",
                        name: "Liam Thompson",
                        type: "member",
                        status: "inactive",
                        role: "Motion Designer",
                        avatar: "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
                        flag: "it",
                        location: "Italy",
                    },
                ],
            },
        ],
    },
    {
        id: "marketing",
        name: "Marketing",
        type: "department",
        status: "active",
        children: [
            {
                id: "marketing-growth",
                name: "Growth",
                type: "team",
                status: "active",
                children: [
                    {
                        id: "marketing-growth-1",
                        name: "Olivia Martin",
                        type: "member",
                        status: "active",
                        role: "Growth Lead",
                        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
                        flag: "us",
                        location: "United States",
                    },
                    {
                        id: "marketing-growth-2",
                        name: "Ethan Clark",
                        type: "member",
                        status: "active",
                        role: "Performance Marketer",
                        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
                        flag: "ca",
                        location: "Canada",
                    },
                ],
            },
            {
                id: "marketing-content",
                name: "Content",
                type: "team",
                status: "active",
                children: [
                    {
                        id: "marketing-content-1",
                        name: "Sofia Rossi",
                        type: "member",
                        status: "active",
                        role: "Content Lead",
                        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
                        flag: "it",
                        location: "Italy",
                    },
                    {
                        id: "marketing-content-2",
                        name: "Lucas Meyer",
                        type: "member",
                        status: "inactive",
                        role: "Copywriter",
                        avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
                        flag: "de",
                        location: "Germany",
                    },
                ],
            },
        ],
    },
    {
        id: "operations",
        name: "Operations",
        type: "department",
        status: "active",
        children: [
            {
                id: "operations-finance",
                name: "Finance",
                type: "team",
                status: "active",
                children: [
                    {
                        id: "operations-finance-1",
                        name: "Grace Lee",
                        type: "member",
                        status: "active",
                        role: "Finance Lead",
                        avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
                        flag: "kr",
                        location: "South Korea",
                    },
                    {
                        id: "operations-finance-2",
                        name: "Daniel Novak",
                        type: "member",
                        status: "active",
                        role: "Accountant",
                        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
                        flag: "cz",
                        location: "Czechia",
                    },
                ],
            },
            {
                id: "operations-people",
                name: "People",
                type: "team",
                status: "active",
                children: [
                    {
                        id: "operations-people-1",
                        name: "Chloe Dubois",
                        type: "member",
                        status: "active",
                        role: "People Lead",
                        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
                        flag: "fr",
                        location: "France",
                    },
                    {
                        id: "operations-people-2",
                        name: "Ryan Walsh",
                        type: "member",
                        status: "active",
                        role: "Recruiter",
                        avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
                        flag: "ie",
                        location: "Ireland",
                    },
                ],
            },
        ],
    },
    {
        id: "sales",
        name: "Sales",
        type: "department",
        status: "active",
        children: [
            {
                id: "sales-accounts",
                name: "Accounts",
                type: "team",
                status: "active",
                children: [
                    {
                        id: "sales-accounts-1",
                        name: "Mia Park",
                        type: "member",
                        status: "active",
                        role: "Account Executive",
                        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
                        flag: "kr",
                        location: "South Korea",
                    },
                    {
                        id: "sales-accounts-2",
                        name: "Noah Fischer",
                        type: "member",
                        status: "inactive",
                        role: "Account Manager",
                        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
                        flag: "at",
                        location: "Austria",
                    },
                ],
            },
        ],
    },
];
// Collapsed rows are unmounted, so their images would load only when a
// branch is first expanded and pop in after the fallback renders. Warming
// them once at mount keeps expansion flicker-free.
function collectImageUrls(rows) {
    return rows.flatMap((row) => [
        ...(row.avatar ? [row.avatar] : []),
        ...(row.flag ? [`https://flagcdn.com/${row.flag.toLowerCase()}.svg`] : []),
        ...(row.children ? collectImageUrls(row.children) : []),
    ]);
}
export default function Pattern() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 4,
    });
    const [sorting, setSorting] = useState([]);
    const [expanded, setExpanded] = useState({
        eng: true,
        "eng-platform": true,
    });
    useEffect(() => {
        for (const src of collectImageUrls(demoData)) {
            const image = new Image();
            image.src = src;
        }
    }, []);
    const columns = useMemo(() => [
        {
            accessorKey: "name",
            id: "name",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Name", column: column })),
            cell: ({ row }) => {
                const item = row.original;
                return (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(DataGridTableRowExpand, { row: row, className: "-ms-1.5 -me-1" }), item.type === "member" ? (_jsxs(_Fragment, { children: [_jsxs(Avatar, { className: "size-6 shrink-0", children: [_jsx(AvatarImage, { src: item.avatar, alt: item.name }), _jsx(AvatarFallback, { children: item.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("") })] }), _jsx("a", { href: "#", className: "text-foreground hover:text-primary font-medium", children: item.name })] })) : (_jsx("span", { className: "text-foreground font-medium", children: item.name }))] }));
            },
            minSize: 260,
            enableSorting: true,
            enableHiding: false,
            meta: {
                autoSize: true,
            },
        },
        {
            accessorKey: "role",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Role", column: column })),
            cell: ({ row }) => {
                const item = row.original;
                return (_jsx("div", { className: "text-muted-foreground", children: item.role ??
                        (item.type === "department" ? "Department" : "Team") }));
            },
            size: 180,
        },
        {
            accessorKey: "location",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Location", column: column })),
            cell: ({ row }) => {
                const item = row.original;
                if (!item.location || !item.flag) {
                    return _jsx("span", { className: "text-muted-foreground", children: "-" });
                }
                return (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("img", { src: `https://flagcdn.com/${item.flag.toLowerCase()}.svg`, alt: item.flag, className: "size-4 rounded-full object-cover" }), _jsx("div", { className: "text-foreground font-medium", children: item.location })] }));
            },
            size: 180,
        },
        {
            accessorKey: "status",
            id: "status",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Status", column: column })),
            cell: ({ row }) => {
                if (row.original.status === "active") {
                    return _jsx(Badge, { variant: "success-outline", children: "Active" });
                }
                return _jsx(Badge, { variant: "warning-outline", children: "Inactive" });
            },
            size: 130,
        },
    ], []);
    const table = useTable({
        features: dataGridFeatures,
        columns,
        data: demoData,
        pageCount: Math.ceil((demoData?.length || 0) / pagination.pageSize),
        getRowId: (row) => row.id,
        getSubRows: (row) => row.children,
        state: {
            pagination,
            sorting,
            expanded,
        },
        // Keep expanded children on the same page as their parent.
        paginateExpandedRows: false,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
    });
    return (_jsx(DataGrid, { table: table, recordCount: demoData?.length || 0, tableLayout: {
            columnsResizable: true,
            columnsMovable: true,
            columnsVisibility: true,
        }, children: _jsxs("div", { className: "w-full space-y-2.5", children: [_jsx(Card, { className: "overflow-hidden p-0", children: _jsx(DataGridContainer, { children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTable, {}) }) }) }), _jsx(DataGridPagination, { sizes: [4, 8, 16] })] }) }));
}
