"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardHeader } from "../../../../../../../adapters/layout.tsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "../../../../../../../adapters/navigation.tsx";
import { Item, ItemActions, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { Tabs, TabsList, TabsTrigger } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const fileTree = [
    {
        name: "components",
        items: [
            {
                name: "ui",
                items: [
                    { name: "button.tsx" },
                    { name: "card.tsx" },
                    { name: "dialog.tsx" },
                ],
            },
            { name: "login-form.tsx" },
        ],
    },
    {
        name: "lib",
        items: [{ name: "utils.ts" }, { name: "api.ts" }],
    },
    {
        name: "hooks",
        items: [{ name: "use-debounce.ts" }, { name: "use-local-storage.ts" }],
    },
    { name: "app.tsx" },
    { name: "package.json" },
];
function TreeItem({ item, level = 0, selectedId, onSelect, }) {
    const isFolder = "items" in item;
    const isSelected = selectedId === item.name;
    if (isFolder) {
        return (_jsxs(Collapsible, { className: "group/collapsible", children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(Item, { size: "xs", className: "hover:bg-accent data-[state=open]:bg-accent cursor-pointer py-1.5", style: { paddingLeft: `${level * 12 + 8}px` }, children: [_jsxs(ItemMedia, { variant: "icon", children: [_jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", "aria-hidden": "true", className: "text-muted-foreground size-3 transition-transform in-data-[state=open]:rotate-90" }), _jsx(IconPlaceholder, { lucide: "FolderIcon", tabler: "IconFolder", hugeicons: "FolderIcon", phosphor: "FolderIcon", remixicon: "RiFolderLine", "aria-hidden": "true", className: "text-muted-foreground group-hover/item:text-foreground size-3.5" })] }), _jsx(ItemTitle, { className: "text-sm", children: item.name })] }) }), _jsx(CollapsibleContent, { className: "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden pt-0.5", children: _jsx("div", { className: "flex flex-col gap-0.5 ps-1.5", children: item.items.map((child) => (_jsx(TreeItem, { item: child, level: level + 1, selectedId: selectedId, onSelect: onSelect }, child.name))) }) })] }));
    }
    return (_jsxs(Item, { className: "group/item hover:bg-accent data-[active=true]:bg-accent cursor-pointer py-1.5", "data-active": isSelected, style: { paddingLeft: `${level * 12 + 9}px` }, onClick: () => onSelect?.(item.name), children: [_jsx(ItemMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "FileIcon", tabler: "IconFile", hugeicons: "FileEmpty02Icon", phosphor: "FileIcon", remixicon: "RiFileLine", "aria-hidden": "true", className: "text-muted-foreground group-hover/item:text-foreground group-data-[active=true]/item:text-foreground size-4" }) }), _jsx(ItemTitle, { className: "text-secondary-foreground group-hover/item:text-foreground group-data-[active=true]/item:text-foreground text-sm", children: item.name }), _jsxs(ItemActions, { className: "-mr-2 ml-auto gap-0 opacity-0 transition-opacity group-hover/item:opacity-100 group-data-[active=true]/item:opacity-100", children: [_jsx(Button, { size: "icon-xs", variant: "ghost", children: _jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownload2Line", "aria-hidden": "true" }) }), _jsx(Button, { variant: "ghost", size: "icon-xs", children: _jsx(IconPlaceholder, { lucide: "TrashIcon", tabler: "IconTrash", hugeicons: "DeleteIcon", phosphor: "TrashIcon", remixicon: "RiDeleteBinLine", "aria-hidden": "true" }) })] })] }));
}
export default function Pattern() {
    const [selectedId, setSelectedId] = useState(null);
    return (_jsx("div", { className: "min-h-64 w-72", children: _jsxs(Card, { size: "sm", className: "gap-1 p-1", children: [_jsx(CardHeader, { className: "p-0", children: _jsx(Tabs, { defaultValue: "explorer", children: _jsxs(TabsList, { className: "bg-accent h-8 w-full p-1", children: [_jsx(TabsTrigger, { value: "explorer", className: "text-xs", children: "Explorer" }), _jsx(TabsTrigger, { value: "outline", className: "text-xs", children: "Outline" })] }) }) }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "flex flex-col gap-0.5", children: fileTree.map((item) => (_jsx(TreeItem, { item: item, selectedId: selectedId, onSelect: setSelectedId }, item.name))) }) })] }) }));
}
