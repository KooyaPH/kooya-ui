"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Sortable, SortableItem, SortableItemHandle, } from "../../reui/sortable.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const defaultImages = [
    { id: "1", name: "hero-banner.jpg", dimensions: "1920×1080", size: "2.4 MB" },
    { id: "2", name: "product-shot.png", dimensions: "800×600", size: "1.8 MB" },
    { id: "3", name: "team-photo.jpg", dimensions: "1200×800", size: "3.2 MB" },
    { id: "4", name: "logo-dark.svg", dimensions: "240×60", size: "12 KB" },
    { id: "5", name: "og-image.png", dimensions: "1200×630", size: "890 KB" },
    { id: "6", name: "favicon.ico", dimensions: "32×32", size: "4 KB" },
];
export default function Pattern() {
    const [images, setImages] = useState(defaultImages);
    return (_jsx("div", { className: "mx-auto w-full max-w-md", children: _jsxs(Frame, { spacing: "xs", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Media Library" }), _jsx(FrameDescription, { children: "Drag to reorder display priority" })] }), _jsx(FramePanel, { className: "p-2!", children: _jsx(Sortable, { value: images, onValueChange: setImages, getItemValue: (item) => item.id, strategy: "grid", className: "grid grid-cols-3 gap-2", children: images.map((image) => (_jsx(SortableItem, { value: image.id, children: _jsxs("div", { className: "bg-muted group rounded-lg relative flex flex-col items-center justify-center gap-2 border p-4", children: [_jsx(SortableItemHandle, { className: "text-muted-foreground hover:text-foreground absolute top-1.5 right-1.5 opacity-0 transition-opacity group-hover:opacity-100", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "size-3.5" }) }), _jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "text-muted-foreground size-5" }), _jsxs("div", { className: "w-full text-center", children: [_jsx("p", { className: "truncate text-xs font-medium", children: image.name }), _jsxs("p", { className: "text-muted-foreground text-[10px]", children: [image.dimensions, " \u00B7 ", image.size] })] })] }) }, image.id))) }) })] }) }));
}
