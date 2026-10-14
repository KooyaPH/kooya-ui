"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Frame, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Sortable, SortableItem, SortableItemHandle, } from "../../reui/sortable.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const defaultItems = [
    {
        id: "1",
        label: "Dashboard",
        icon: (_jsx(IconPlaceholder, { lucide: "LayoutDashboardIcon", tabler: "IconLayoutDashboard", hugeicons: "DashboardSquare02Icon", phosphor: "LayoutIcon", remixicon: "RiDashboardLine", className: "text-muted-foreground size-4" })),
    },
    {
        id: "2",
        label: "Inbox",
        icon: (_jsx(IconPlaceholder, { lucide: "InboxIcon", tabler: "IconInbox", hugeicons: "InboxIcon", phosphor: "TrayIcon", remixicon: "RiInboxLine", className: "text-muted-foreground size-4" })),
        count: 5,
    },
    {
        id: "3",
        label: "Projects",
        icon: (_jsx(IconPlaceholder, { lucide: "FolderIcon", tabler: "IconFolder", hugeicons: "FolderIcon", phosphor: "FolderIcon", remixicon: "RiFolderLine", className: "text-muted-foreground size-4" })),
        count: 12,
    },
    {
        id: "4",
        label: "Calendar",
        icon: (_jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", className: "text-muted-foreground size-4" })),
    },
    {
        id: "5",
        label: "Analytics",
        icon: (_jsx(IconPlaceholder, { lucide: "BarChart3Icon", tabler: "IconChartBar", hugeicons: "ChartBarLineIcon", phosphor: "ChartBarIcon", remixicon: "RiBarChartBoxLine", className: "text-muted-foreground size-4" })),
    },
    {
        id: "6",
        label: "Settings",
        icon: (_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "SettingsIcon", phosphor: "GearIcon", remixicon: "RiSettings3Line", className: "text-muted-foreground size-4" })),
    },
];
export default function Pattern() {
    const [items, setItems] = useState(defaultItems);
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsxs(Frame, { spacing: "xs", children: [_jsx(FrameHeader, { children: _jsx(FrameTitle, { children: "Navigation" }) }), _jsx(FramePanel, { className: "p-2!", children: _jsx(Sortable, { value: items, onValueChange: setItems, getItemValue: (item) => item.id, strategy: "vertical", className: "space-y-0.5", children: items.map((item) => (_jsx(SortableItem, { value: item.id, children: _jsxs("div", { className: "hover:bg-accent flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors", children: [_jsx(SortableItemHandle, { className: "text-muted-foreground hover:text-foreground opacity-0 transition-opacity group-hover:opacity-100 [div:hover>&]:opacity-100", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "size-3.5" }) }), item.icon, _jsx("span", { className: "flex-1 text-sm", children: item.label }), item.count && (_jsx(Badge, { variant: "outline", size: "sm", className: "rounded-full", children: item.count }))] }) }, item.id))) }) })] }) }));
}
