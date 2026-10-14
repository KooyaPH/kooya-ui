import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
const activities = [
    {
        user: "Sarah Chen",
        avatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        action: "Deployed",
        target: "production",
        badge: "success",
        timestamp: "2 minutes ago",
    },
    {
        user: "Marcus Johnson",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        action: "Merged",
        target: "feat/auth-flow",
        badge: "info",
        timestamp: "15 minutes ago",
    },
    {
        user: "Emily Park",
        avatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        action: "Commented",
        target: "PR #284",
        badge: "outline",
        timestamp: "1 hour ago",
    },
    {
        user: "David Kim",
        avatar: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
        action: "Reverted",
        target: "hotfix/api-crash",
        badge: "destructive",
        timestamp: "3 hours ago",
    },
    {
        user: "Sofia Davis",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        action: "Created",
        target: "issue #512",
        badge: "secondary",
        timestamp: "5 hours ago",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col", children: _jsx(Frame, { spacing: "xs", children: _jsx(FramePanel, { className: "p-0!", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "User" }), _jsx(TableHead, { children: "Action" }), _jsx(TableHead, { children: "Target" }), _jsx(TableHead, { className: "text-right", children: "Time" })] }) }), _jsx(TableBody, { children: activities.map((activity, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: activity.avatar, alt: activity.user }), _jsx(AvatarFallback, { children: activity.user
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("") })] }), _jsx("span", { className: "text-sm font-medium", children: activity.user })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: activity.badge, size: "sm", children: activity.action }) }), _jsx(TableCell, { className: "font-mono text-sm", children: activity.target }), _jsx(TableCell, { className: "text-muted-foreground text-right text-sm", children: activity.timestamp })] }, index))) })] }) }) }) }));
}
