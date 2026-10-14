"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../../../../registry/bases/radix/ui/command.jsx";
import { Kbd } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const files = [
    { name: "page.tsx", path: "src/app/page.tsx", type: "tsx" },
    { name: "layout.tsx", path: "src/app/layout.tsx", type: "tsx" },
    { name: "globals.css", path: "src/styles/globals.css", type: "css" },
    { name: "utils.ts", path: "src/lib/utils.ts", type: "ts" },
    { name: "api.ts", path: "src/lib/api.ts", type: "ts" },
    { name: "button.tsx", path: "src/components/ui/button.tsx", type: "tsx" },
    { name: "package.json", path: "package.json", type: "json" },
    { name: "README.md", path: "README.md", type: "md" },
];
export default function Pattern() {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsxs(Button, { onClick: () => setOpen(true), variant: "outline", className: "w-52", children: [_jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", className: "size-4" }), "Search files...", _jsx(Kbd, { className: "ml-auto", children: "\u2318K" })] }), _jsx(CommandDialog, { open: open, onOpenChange: setOpen, children: _jsxs(Command, { className: "**:data-[selected=true]:bg-muted **:data-selected:bg-transparent", children: [_jsx(CommandInput, { placeholder: "Search files by name..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No files found." }), _jsx(CommandGroup, { heading: "Files", children: files.map((file) => (_jsxs(CommandItem, { className: "gap-2.5", children: [_jsx(IconPlaceholder, { lucide: "FileIcon", tabler: "IconFile", hugeicons: "FileEmpty02Icon", phosphor: "FileIcon", remixicon: "RiFileLine", className: "size-4 shrink-0" }), _jsxs("div", { className: "flex flex-1 items-center gap-2", children: [_jsx("span", { className: "font-medium", children: file.name }), _jsx("span", { className: "text-muted-foreground truncate text-xs", children: file.path })] }), _jsx("div", { className: "ml-auto", "data-slot": "command-shortcut", children: _jsx(Badge, { variant: "outline", size: "sm", children: file.type }) })] }, file.path))) })] })] }) })] }));
}
