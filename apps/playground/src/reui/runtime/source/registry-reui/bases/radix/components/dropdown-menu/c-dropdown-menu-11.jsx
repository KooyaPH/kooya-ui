import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const notifications = [
    {
        id: "1",
        user: "Sarah",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        initials: "SC",
        action: "commented on",
        target: "Design System v2",
        time: "2 min ago",
        unread: false,
    },
    {
        id: "2",
        user: "James Wilson",
        avatar: "/reui-assets/images/2bc0a75442d5cf52e4cb.jpg",
        initials: "JW",
        action: "shared",
        target: "Q4 Report",
        time: "1 hour ago",
        unread: true,
    },
    {
        id: "3",
        user: "Emily Davis",
        avatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        initials: "ED",
        action: "invited you to",
        target: "Project Alpha",
        time: "3 hours ago",
        unread: false,
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "icon", className: "relative", children: [_jsx(IconPlaceholder, { lucide: "BellIcon", tabler: "IconBell", hugeicons: "NotificationIcon", phosphor: "BellIcon", remixicon: "RiNotificationLine", "aria-hidden": "true" }), _jsx(Badge, { variant: "destructive", size: "sm", className: "absolute -top-1.5 -right-2 rounded-full px-1", "aria-hidden": "true", children: "8" })] }) }), _jsx(DropdownMenuContent, { className: "w-80", align: "end", sideOffset: 8, children: _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuLabel, { className: "flex items-center justify-between", children: [_jsx("span", { children: "Notifications" }), _jsx("button", { className: "text-foreground text-xs font-normal underline-offset-2 hover:underline", children: "Mark all as read" })] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuGroup, { children: notifications.map((notification) => (_jsxs(DropdownMenuItem, { className: "flex items-start gap-2 py-1", children: [_jsxs(Avatar, { className: "mt-0.5 size-6 shrink-0", children: [_jsx(AvatarImage, { src: notification.avatar, alt: notification.user }), _jsx(AvatarFallback, { children: notification.initials })] }), _jsxs("div", { className: "flex flex-1 flex-col gap-px", children: [_jsxs("p", { className: "leading-snug", children: [_jsx("span", { className: "font-medium", children: notification.user }), " ", _jsx("span", { className: "text-muted-foreground", children: notification.action }), " ", _jsx("span", { className: "font-medium", children: notification.target })] }), _jsx("span", { className: "text-muted-foreground", children: notification.time })] }), notification.unread && (_jsx("span", { className: "bg-primary mt-2 size-1.5 shrink-0 rounded-full" }))] }, notification.id))) }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { className: "justify-center", children: "View all notifications" })] }) })] }) }));
}
