import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const projects = [
    {
        name: "Website Redesign",
        description: "Landing page and marketing site",
        status: "In Progress",
        statusVariant: "info-light",
        team: [
            {
                src: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
                fallback: "SC",
            },
            {
                src: "/reui-assets/images/e93553df2422635515ee.jpg",
                fallback: "MJ",
            },
            {
                src: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
                fallback: "EP",
            },
        ],
        extra: 2,
        dueDate: "Mar 15",
    },
    {
        name: "Mobile App v2",
        description: "iOS and Android release",
        status: "Review",
        statusVariant: "warning-light",
        team: [
            {
                src: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
                fallback: "DK",
            },
            {
                src: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
                fallback: "SD",
            },
        ],
        extra: 0,
        dueDate: "Apr 1",
    },
    {
        name: "API Integration",
        description: "Third-party payment gateway",
        status: "Completed",
        statusVariant: "success-light",
        team: [
            {
                src: "/reui-assets/images/e93553df2422635515ee.jpg",
                fallback: "MJ",
            },
        ],
        extra: 0,
        dueDate: "Feb 28",
    },
    {
        name: "Analytics Dashboard",
        description: "Real-time metrics and reporting",
        status: "Planning",
        statusVariant: "outline",
        team: [
            {
                src: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
                fallback: "SC",
            },
            {
                src: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
                fallback: "DK",
            },
            {
                src: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
                fallback: "EP",
            },
        ],
        extra: 4,
        dueDate: "May 10",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Project" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Team" }), _jsx(TableHead, { className: "text-right", children: "Due" })] }) }), _jsx(TableBody, { children: projects.map((project) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-muted rounded-sm flex size-8 shrink-0 items-center justify-center", children: _jsx(IconPlaceholder, { lucide: "FolderIcon", tabler: "IconFolder", hugeicons: "FolderIcon", phosphor: "FolderIcon", remixicon: "RiFolderLine", className: "text-muted-foreground size-4", "aria-hidden": "true" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: project.name }), _jsx("span", { className: "text-muted-foreground text-xs", children: project.description })] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: project.statusVariant, size: "sm", children: project.status }) }), _jsx(TableCell, { children: _jsxs(AvatarGroup, { children: [project.team.map((member) => (_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: member.src, alt: member.fallback }), _jsx(AvatarFallback, { children: member.fallback })] }, member.fallback))), project.extra > 0 && (_jsx(AvatarGroupCount, { children: _jsxs("span", { className: "text-muted-foreground text-[0.625rem]", children: ["+", project.extra] }) }))] }) }), _jsx(TableCell, { className: "text-muted-foreground text-right text-sm", children: project.dueDate })] }, project.name))) })] }) }));
}
