"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
export default function Pattern() {
    const [showBookmarksBar, setShowBookmarksBar] = useState(true);
    const [showFullUrls, setShowFullUrls] = useState(false);
    const [showDeveloperTools, setShowDeveloperTools] = useState(true);
    return (_jsx("div", { className: "flex w-full items-center justify-center p-12", children: _jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { className: "text-muted-foreground rounded-lg flex aspect-[2/0.5] w-full max-w-[300px] items-center justify-center border border-dashed text-sm", children: "Right click here" }), _jsx(ContextMenuContent, { children: _jsxs(ContextMenuGroup, { children: [_jsx(ContextMenuCheckboxItem, { checked: showBookmarksBar, onCheckedChange: setShowBookmarksBar, children: "Show Bookmarks Bar" }), _jsx(ContextMenuCheckboxItem, { checked: showFullUrls, onCheckedChange: setShowFullUrls, children: "Show Full URLs" }), _jsx(ContextMenuCheckboxItem, { checked: showDeveloperTools, onCheckedChange: setShowDeveloperTools, children: "Show Developer Tools" })] }) })] }) }));
}
