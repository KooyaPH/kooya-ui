import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
const members = [
    {
        name: "Sarah Chen",
        email: "sarah@example.com",
        avatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        role: "Admin",
        roleVariant: "default",
        status: "Active",
        statusVariant: "success-light",
    },
    {
        name: "Marcus Johnson",
        email: "marcus@example.com",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        role: "Developer",
        roleVariant: "info-light",
        status: "Active",
        statusVariant: "success-light",
    },
    {
        name: "Emily Park",
        email: "emily@example.com",
        avatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        role: "Designer",
        roleVariant: "warning-light",
        status: "Away",
        statusVariant: "warning-light",
    },
    {
        name: "David Kim",
        email: "david@example.com",
        avatar: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
        role: "Viewer",
        roleVariant: "outline",
        status: "Offline",
        statusVariant: "outline",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col", children: _jsx(Frame, { spacing: "xs", children: _jsx(FramePanel, { className: "p-0!", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Member" }), _jsx(TableHead, { children: "Role" }), _jsx(TableHead, { children: "Status" })] }) }), _jsx(TableBody, { children: members.map((member) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: member.avatar, alt: member.name }), _jsx(AvatarFallback, { children: member.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("") })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: member.name }), _jsx("span", { className: "text-muted-foreground text-xs", children: member.email })] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: member.roleVariant, size: "sm", children: member.role }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: member.statusVariant, size: "sm", children: member.status }) })] }, member.email))) })] }) }) }) }));
}
