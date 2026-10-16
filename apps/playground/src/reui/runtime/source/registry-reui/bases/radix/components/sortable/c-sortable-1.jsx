"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Sortable, SortableItem, SortableItemHandle, } from "../../reui/sortable.jsx";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const defaultItems = [
    {
        id: "1",
        title: "Product Demo",
        description: "Main product image",
        type: "image",
        size: "2.4 MB",
    },
    {
        id: "2",
        title: "Product Specification",
        description: "Technical details document",
        type: "document",
        size: "1.2 MB",
    },
    {
        id: "3",
        title: "Product Demo Video",
        description: "How to use the product",
        type: "video",
        size: "15.7 MB",
    },
    {
        id: "4",
        title: "Product Audio Guide",
        description: "Audio instructions",
        type: "audio",
        size: "8.3 MB",
    },
    {
        id: "5",
        title: "Product Specification",
        description: "Additional product view",
        type: "image",
        size: "3.1 MB",
    },
];
const getTypeIcon = (type) => {
    switch (type) {
        case "image":
            return (_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "h-4 w-4" }));
        case "document":
            return (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "h-4 w-4" }));
        case "audio":
            return (_jsx(IconPlaceholder, { lucide: "MusicIcon", tabler: "IconMusic", hugeicons: "MusicNote03Icon", phosphor: "MusicNotesIcon", remixicon: "RiMusic2Line", className: "h-4 w-4" }));
        case "video":
            return (_jsx(IconPlaceholder, { lucide: "VideoIcon", tabler: "IconVideo", hugeicons: "Video02Icon", phosphor: "VideoCameraIcon", remixicon: "RiVideoOnLine", className: "h-4 w-4" }));
    }
};
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
    }
};
export default function Pattern() {
    const [items, setItems] = useState(defaultItems);
    const handleValueChange = (newItems) => {
        setItems(newItems);
        // Show toast with new order
        toast.success("Items reordered successfully!", {
            description: newItems
                .map((item, index) => `${index + 1}. ${item.title}`)
                .join(", "),
        });
    };
    const getItemValue = (item) => item.id;
    return (_jsx("div", { className: "mx-auto w-full max-w-xl space-y-8 p-6", children: _jsx(Sortable, { value: items, onValueChange: handleValueChange, getItemValue: getItemValue, strategy: "vertical", className: "space-y-2", children: items.map((item) => (_jsx(SortableItem, { value: item.id, children: _jsxs("div", { className: "bg-background border-border hover:bg-accent/50 rounded-md flex cursor-pointer items-center gap-3 border p-3 transition-colors", onClick: () => { }, children: [_jsx(SortableItemHandle, { className: "text-muted-foreground hover:text-foreground", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "h-4 w-4" }) }), _jsx("div", { className: "text-muted-foreground flex items-center gap-2", children: getTypeIcon(item.type) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h4", { className: "truncate text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground truncate text-xs", children: item.description })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: getTypeColor(item.type), children: item.type }), _jsx("span", { className: "text-muted-foreground text-xs", children: item.size })] })] }) }, item.id))) }) }));
}
