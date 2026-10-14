import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const issues = [
    {
        id: "ISS-421",
        title: "Login page returns 500 on mobile",
        priority: "Critical",
        priorityVariant: "destructive",
        priorityIcon: (_jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp02Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine", className: "size-3", "aria-hidden": "true" })),
        label: "Bug",
        labelVariant: "destructive-light",
        assignee: "Sarah Chen",
        assigneeAvatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        status: "Open",
        statusVariant: "info-light",
    },
    {
        id: "ISS-420",
        title: "Add dark mode support",
        priority: "High",
        priorityVariant: "warning",
        priorityIcon: (_jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp02Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine", className: "size-3", "aria-hidden": "true" })),
        label: "Feature",
        labelVariant: "info-light",
        assignee: "Marcus Johnson",
        assigneeAvatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        status: "In Progress",
        statusVariant: "warning-light",
    },
    {
        id: "ISS-419",
        title: "Update user onboarding flow",
        priority: "Medium",
        priorityVariant: "info",
        priorityIcon: (_jsx(IconPlaceholder, { lucide: "ArrowRightIcon", tabler: "IconArrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLine", className: "size-3", "aria-hidden": "true" })),
        label: "Improvement",
        labelVariant: "success-light",
        assignee: "Emily Park",
        assigneeAvatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        status: "In Review",
        statusVariant: "info-light",
    },
    {
        id: "ISS-418",
        title: "Refactor API rate limiter module",
        priority: "Low",
        priorityVariant: "secondary",
        priorityIcon: (_jsx(IconPlaceholder, { lucide: "ArrowDownIcon", tabler: "IconArrowDown", hugeicons: "ArrowDown02Icon", phosphor: "ArrowDownIcon", remixicon: "RiArrowDownLine", className: "size-3", "aria-hidden": "true" })),
        label: "Tech Debt",
        labelVariant: "outline",
        assignee: "David Kim",
        assigneeAvatar: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
        status: "Closed",
        statusVariant: "success-light",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col", children: _jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "overflow-x-auto p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-20", children: "ID" }), _jsx(TableHead, { children: "Issue" }), _jsx(TableHead, { children: "Assignee" }), _jsx(TableHead, { children: "Status" })] }) }), _jsx(TableBody, { children: issues.map((issue) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "text-muted-foreground font-mono text-xs", children: issue.id }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "truncate text-sm font-medium", children: issue.title }), _jsx(Badge, { variant: "outline", size: "xs", children: issue.label })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: issue.assigneeAvatar, alt: issue.assignee }), _jsx(AvatarFallback, { children: issue.assignee
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("") })] }), _jsx("span", { className: "text-sm", children: issue.assignee })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: issue.statusVariant, size: "sm", children: issue.status }) })] }, issue.id))) })] }) }) }) }));
}
