"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { DataGrid, DataGridContainer, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTableDndRowHandle, DataGridTableDndRows, } from "../../reui/data-grid/data-grid-table-dnd-rows.jsx";
import { arrayMove } from "@dnd-kit/sortable";
import { useTable } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
// Let the carried row follow the pointer sideways as well as up and down.
// The default restriction pins it to the column it came from, which puts the
// clone directly on top of the rows you are trying to read; drifting it a
// little to the side lifts it clear of them, so the drop indicator underneath
// stays visible and the seam you are aiming at is much easier to judge. The
// primitive still rails the vertical axis, so the row cannot leave the grid.
const FOLLOW_POINTER = [({ transform }) => transform];
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
];
export default function Pattern() {
    const columns = useMemo(() => [
        {
            id: "drag",
            cell: () => _jsx(DataGridTableDndRowHandle, {}),
            size: 30,
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
            size: 170,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "email",
            id: "email",
            header: "Email",
            cell: (info) => (_jsx("a", { href: `mailto:${info.getValue()}`, className: "hover:text-primary text-truncate hover:underline", children: info.getValue() })),
            size: 150,
            meta: {
                headerClassName: "",
                cellClassName: "",
            },
        },
        {
            accessorKey: "location",
            id: "location",
            header: "Location",
            cell: ({ row }) => {
                return (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("img", { src: `https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`, alt: row.original.flag, className: "size-4 rounded-full object-cover" }), _jsx("div", { className: "text-foreground font-medium", children: row.original.location })] }));
            },
            size: 170,
            meta: {
                headerClassName: "",
                cellClassName: "text-start",
            },
        },
    ], []);
    const [data, setData] = useState(demoData);
    const dataIds = useMemo(() => data?.map(({ id }) => id), [data]);
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id);
                const newIndex = dataIds.indexOf(over.id);
                return arrayMove(data, oldIndex, newIndex);
            });
        }
    };
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
    });
    return (_jsx(DataGrid, { table: table, recordCount: data?.length || 0, tableLayout: { rowsDraggable: true }, children: _jsxs("div", { className: "w-full space-y-2.5", children: [_jsx(DataGridContainer, { children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTableDndRows, { handleDragEnd: handleDragEnd, dataIds: dataIds, modifiers: FOLLOW_POINTER }) }) }), _jsx(DataGridPagination, {})] }) }));
}
