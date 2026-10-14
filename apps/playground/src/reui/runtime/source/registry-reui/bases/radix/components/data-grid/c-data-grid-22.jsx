"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard.jsx";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { DataGrid, DataGridContainer, dataGridFeatures, } from "../../reui/data-grid/data-grid.jsx";
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.jsx";
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.jsx";
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.jsx";
import { DataGridTable, DataGridTableRowSelect, DataGridTableRowSelectAll, } from "../../reui/data-grid/data-grid-table.jsx";
import { useTable, } from "@tanstack/react-table";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardFooter, CardHeader, } from "../../../../../../../adapters/layout.tsx";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const demoData = [
    {
        id: "1",
        name: "Alex Johnson",
        availability: "online",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        status: "Active",
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
        status: "Inactive",
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
        status: "Blocked",
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
        status: "Inactive",
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
        status: "Active",
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
        status: "Pending",
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
        status: "Inactive",
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
        status: "Blocked",
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
        status: "Pending",
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
        status: "Inactive",
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
        status: "Blocked",
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
        status: "Active",
        flag: "in",
        email: "sarah@tata.in",
        company: "Tata",
        role: "Sales Manager",
        joined: "Oct, 2024",
        location: "India",
        balance: 4521.67,
    },
];
function ActionsCell({ row }) {
    const { copyToClipboard } = useCopyToClipboard();
    const handleCopyId = () => {
        copyToClipboard(row.original.id);
        toast.success("Employee ID successfully copied", {
            description: row.original.id,
        });
    };
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { className: "size-7", size: "icon", variant: "ghost", children: _jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine" }) }) }), _jsxs(DropdownMenuContent, { side: "bottom", align: "start", children: [_jsx(DropdownMenuItem, { onClick: () => { }, children: "Edit" }), _jsx(DropdownMenuItem, { onClick: handleCopyId, children: "Copy ID" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { variant: "destructive", onClick: () => { }, children: "Delete" })] })] }));
}
export default function Pattern() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [sorting, setSorting] = useState([
        { id: "name", desc: true },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const filteredData = useMemo(() => {
        return demoData.filter((item) => {
            // Filter by status
            const matchesStatus = !selectedStatuses?.length || selectedStatuses.includes(item.status);
            // Filter by search query (case-insensitive)
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery ||
                Object.values(item)
                    .join(" ") // Combine all fields into a single string
                    .toLowerCase()
                    .includes(searchLower);
            return matchesStatus && matchesSearch;
        });
    }, [searchQuery, selectedStatuses]);
    const statusCounts = useMemo(() => {
        return demoData.reduce((acc, item) => {
            acc[item.status] = (acc[item.status] || 0) + 1;
            return acc;
        }, {});
    }, []);
    const handleStatusChange = (checked, value) => {
        setSelectedStatuses((prev = [] // Default to an empty array
        ) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
    };
    const columns = useMemo(() => [
        {
            accessorKey: "id",
            id: "id",
            header: () => _jsx(DataGridTableRowSelectAll, {}),
            cell: ({ row }) => _jsx(DataGridTableRowSelect, { row: row }),
            enableSorting: false,
            size: 35,
            meta: {
                headerClassName: "",
                cellClassName: "",
            },
            enableResizing: false,
        },
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
            size: 260,
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
            cell: ({ row }) => {
                return (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("img", { src: `https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`, alt: row.original.flag, className: "size-4 rounded-full object-cover" }), _jsx("div", { className: "text-foreground font-medium", children: row.original.location })] }));
            },
            size: 150,
            meta: {
                headerClassName: "",
                cellClassName: "text-start",
            },
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        },
        {
            accessorKey: "role",
            id: "role",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Role", visibility: true, column: column })),
            cell: ({ row }) => {
                return (_jsx("div", { className: "text-foreground font-medium", children: row.original.role }));
            },
            size: 150,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        },
        {
            accessorKey: "joined",
            id: "joined",
            header: ({ column }) => (_jsx(DataGridColumnHeader, { title: "Joined", visibility: true, column: column })),
            cell: ({ row }) => {
                return (_jsx("div", { className: "text-foreground font-medium", children: row.original.joined }));
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
                if (status == "Active") {
                    return _jsx(Badge, { variant: "success-outline", children: "Approved" });
                }
                else if (status == "Blocked") {
                    return _jsx(Badge, { variant: "destructive-outline", children: "Blocked" });
                }
                else if (status == "Inactive") {
                    return _jsx(Badge, { variant: "info-outline", children: "Inactive" });
                }
                else {
                    return _jsx(Badge, { variant: "warning-outline", children: "Pending" });
                }
            },
            size: 100,
            enableSorting: true,
            enableHiding: true,
            enableResizing: true,
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => _jsx(ActionsCell, { row: row }),
            size: 60,
            enableSorting: false,
            enableHiding: false,
            enableResizing: false,
        },
    ], []);
    const [columnOrder, setColumnOrder] = useState(columns.map((column) => column.id));
    const table = useTable({
        features: dataGridFeatures,
        columns,
        data: filteredData,
        pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
        getRowId: (row) => row.id,
        state: {
            pagination,
            sorting,
            columnOrder,
        },
        onColumnOrderChange: setColumnOrder,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
    });
    return (_jsx(DataGrid, { table: table, recordCount: filteredData?.length || 0, tableLayout: {
            columnsPinnable: true,
            columnsResizable: true,
            columnsMovable: true,
            columnsVisibility: true,
        }, children: _jsxs(Card, { className: "w-full gap-3 py-0", children: [_jsxs(CardHeader, { className: "flex items-center justify-between px-3.5 py-2", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsxs(InputGroup, { className: "w-48", children: [_jsx(InputGroupAddon, { align: "inline-start", children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine" }) }), _jsx(InputGroupInput, { placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }), searchQuery.length > 0 && (_jsx(InputGroupAddon, { align: "inline-end", children: _jsx(InputGroupButton, { "aria-label": "Clear search", title: "Clear search", size: "icon-xs", onClick: () => setSearchQuery(""), children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine" }) }) }))] }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "FunnelIcon", tabler: "IconFilter", hugeicons: "FilterIcon", phosphor: "FunnelIcon", remixicon: "RiFilter2Line" }), "Status", selectedStatuses.length > 0 && (_jsx(Badge, { size: "sm", variant: "info-outline", children: selectedStatuses.length }))] }) }), _jsx(PopoverContent, { className: "w-40", align: "start", children: _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-muted-foreground text-xs font-medium", children: "Filters" }), _jsx("div", { className: "space-y-3", children: Object.keys(statusCounts).map((status) => (_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Checkbox, { id: status, checked: selectedStatuses.includes(status), onCheckedChange: (checked) => handleStatusChange(checked === true, status) }), _jsxs(Label, { htmlFor: status, className: "flex grow items-center justify-between gap-1.5 font-normal", children: [status, _jsx("span", { className: "text-muted-foreground", children: statusCounts[status] })] })] }, status))) })] }) })] })] }), _jsx(CardAction, { children: _jsxs(Button, { children: [_jsx(IconPlaceholder, { lucide: "UserPlusIcon", tabler: "IconUserPlus", hugeicons: "UserAdd01Icon", phosphor: "UserPlusIcon", remixicon: "RiUserAddLine" }), "Add new"] }) })] }), _jsx(CardContent, { className: "p-0", children: _jsx(Card, { className: "p-0", children: _jsx(DataGridContainer, { children: _jsx(DataGridScrollArea, { children: _jsx(DataGridTable, {}) }) }) }) }), _jsx(CardFooter, { className: "border-none bg-transparent! px-3.5 py-2", children: _jsx(DataGridPagination, {}) })] }) }));
}
