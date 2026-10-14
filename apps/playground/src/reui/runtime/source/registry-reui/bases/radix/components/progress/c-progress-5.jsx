"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { Progress } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const files = [
    { id: "1", name: "document.pdf", progress: 45, status: "2m 30s" },
    { id: "2", name: "presentation.pptx", progress: 78, status: "45s" },
    { id: "3", name: "spreadsheet.xlsx", progress: 12, status: "5m 12s" },
    { id: "4", name: "image.jpg", progress: 100, status: "Complete" },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-xs flex-col", children: _jsx(ItemGroup, { children: files.map((file) => (_jsxs(Item, { size: "xs", className: "px-0", children: [_jsx(ItemMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "FileIcon", tabler: "IconFile", hugeicons: "FileEmpty02Icon", phosphor: "FileIcon", remixicon: "RiFileLine", className: "text-muted-foreground size-4" }) }), _jsx(ItemContent, { className: "flex-1 truncate", children: _jsx(ItemTitle, { className: "cursor-pointer truncate hover:underline", children: file.name }) }), _jsx(ItemContent, { className: "w-32", children: _jsx(Progress, { value: file.progress, className: "h-1" }) }), _jsx(ItemActions, { className: "w-20 justify-end", children: _jsx("span", { className: "text-foreground", children: file.status }) })] }, file.id))) }) }));
}
