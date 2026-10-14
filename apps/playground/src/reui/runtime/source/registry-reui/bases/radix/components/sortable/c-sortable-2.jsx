"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Sortable, SortableItem, SortableItemHandle, } from "../../reui/sortable.jsx";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { cn } from "cn";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const defaultGridItems = [
    {
        id: "1",
        title: "Hero Image",
        description: "Main banner image",
        type: "image",
        size: "2.4 MB",
        priority: "high",
    },
    {
        id: "2",
        title: "Product Specs",
        description: "Technical documentation",
        type: "document",
        size: "1.2 MB",
        priority: "medium",
    },
    {
        id: "3",
        title: "Demo Video",
        description: "Product demonstration",
        type: "video",
        size: "15.7 MB",
        priority: "high",
    },
    {
        id: "4",
        title: "Audio Guide",
        description: "Voice instructions",
        type: "audio",
        size: "8.3 MB",
        priority: "low",
    },
    {
        id: "5",
        title: "Gallery Photo 1",
        description: "Product view 1",
        type: "image",
        size: "3.1 MB",
        priority: "medium",
    },
    {
        id: "6",
        title: "Gallery Photo 2",
        description: "Product view 2",
        type: "image",
        size: "2.8 MB",
        priority: "medium",
    },
    {
        id: "7",
        title: "User Manual",
        description: "Installation guide",
        type: "document",
        size: "4.2 MB",
        priority: "high",
    },
    {
        id: "8",
        title: "Background Music",
        description: "Ambient soundtrack",
        type: "audio",
        size: "12.1 MB",
        priority: "low",
    },
    {
        id: "9",
        title: "Feature Highlight",
        description: "Key product features",
        type: "featured",
        size: "N/A",
        priority: "high",
    },
];
const getTypeColor = (type) => {
    switch (type) {
        case "image":
            return "primary-light";
        case "document":
            return "success-light";
        case "audio":
            return "destructive-light";
        case "video":
            return "info-light";
        case "featured":
            return "warning-light";
    }
};
const getItemSize = (type) => {
    switch (type) {
        case "featured":
            return "col-span-2 row-span-2";
        case "image":
        case "video":
            return "col-span-1 row-span-1";
        case "document":
        case "audio":
            return "col-span-1 row-span-1";
        default:
            return "col-span-1 row-span-1";
    }
};
export default function Pattern() {
    const [items, setItems] = useState(defaultGridItems);
    const handleValueChange = (newItems) => {
        setItems(newItems);
        // Show toast with new order
        toast.success("Grid items reordered successfully!", {
            description: `New order: ${newItems.map((item, index) => `${index + 1}. ${item.title}`).join(", ")}`,
        });
    };
    const getItemValue = (item) => item.id;
    return (_jsx("div", { className: "mx-auto w-full max-w-2xl space-y-6 p-4", children: _jsx(Sortable, { value: items, onValueChange: handleValueChange, getItemValue: getItemValue, strategy: "grid", className: "grid auto-rows-fr grid-cols-3 gap-3", children: items.map((item) => (_jsx(SortableItem, { value: item.id, children: _jsxs("div", { className: cn("group bg-background border-border hover:bg-accent/50 rounded-md relative cursor-pointer border p-3 transition-colors", getItemSize(item.type), "flex min-h-[100px] flex-col"), onClick: () => { }, children: [_jsx(SortableItemHandle, { className: "text-muted-foreground hover:text-foreground absolute end-1.5 top-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "h-3.5 w-3.5" }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h4", { className: "truncate text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground mt-0.5 truncate text-xs", children: item.description })] }), _jsxs("div", { className: "mt-2 flex items-center justify-between", children: [_jsx(Badge, { variant: getTypeColor(item.type), size: "sm", children: item.type }), item.type !== "featured" && (_jsx("span", { className: "text-muted-foreground text-xs", children: item.size }))] })] }) }, item.id))) }) }));
}
