"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Sortable, SortableItem, SortableItemHandle, } from "../../reui/sortable.jsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const defaultChannels = [
    {
        id: "1",
        name: "Email",
        description: "Send notifications via email",
        enabled: true,
    },
    {
        id: "2",
        name: "Push Notifications",
        description: "Browser and mobile push",
        enabled: true,
    },
    { id: "3", name: "SMS", description: "Text message alerts", enabled: false },
    {
        id: "4",
        name: "Slack",
        description: "Post to Slack channels",
        enabled: true,
    },
    {
        id: "5",
        name: "Webhook",
        description: "Send to custom endpoint",
        enabled: false,
    },
];
export default function Pattern() {
    const [channels, setChannels] = useState(defaultChannels);
    const toggleChannel = (id) => {
        setChannels((prev) => prev.map((ch) => (ch.id === id ? { ...ch, enabled: !ch.enabled } : ch)));
    };
    return (_jsx("div", { className: "mx-auto w-full max-w-md", children: _jsxs(Frame, { spacing: "sm", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Notification Priority" }), _jsx(FrameDescription, { children: "Drag to reorder by priority. Top channels are tried first." })] }), _jsx(Sortable, { value: channels, onValueChange: setChannels, getItemValue: (item) => item.id, strategy: "vertical", className: "space-y-1", children: channels.map((channel) => (_jsx(SortableItem, { value: channel.id, children: _jsx(FramePanel, { className: "p-0!", children: _jsxs("div", { className: "flex items-center gap-3 px-3 py-2.5", children: [_jsx(SortableItemHandle, { className: "text-muted-foreground hover:text-foreground", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "size-4" }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium", children: channel.name }), _jsx("p", { className: "text-muted-foreground text-xs", children: channel.description })] }), _jsx(Switch, { checked: channel.enabled, onCheckedChange: () => toggleChannel(channel.id) })] }) }) }, channel.id))) })] }) }));
}
