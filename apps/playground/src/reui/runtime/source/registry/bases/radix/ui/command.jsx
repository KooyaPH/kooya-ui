"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "cn";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "../../../../../../adapters/overlays.tsx";
import { InputGroup, InputGroupAddon, } from "../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
function Command({ className, ...props }) {
    return (_jsx(CommandPrimitive, { "data-slot": "command", className: cn("cn-command flex size-full flex-col overflow-hidden", className), ...props }));
}
function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, className, showCloseButton = false, ...props }) {
    return (_jsxs(Dialog, { ...props, children: [_jsxs(DialogHeader, { className: "sr-only", children: [_jsx(DialogTitle, { children: title }), _jsx(DialogDescription, { children: description })] }), _jsx(DialogContent, { className: cn("cn-command-dialog top-1/3 translate-y-0 overflow-hidden p-0", className), showCloseButton: showCloseButton, children: children })] }));
}
function CommandInput({ className, ...props }) {
    return (_jsx("div", { "data-slot": "command-input-wrapper", className: "cn-command-input-wrapper", children: _jsxs(InputGroup, { className: "cn-command-input-group", children: [_jsx(CommandPrimitive.Input, { "data-slot": "command-input", className: cn("cn-command-input outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className), ...props }), _jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "SearchIcon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", className: "cn-command-input-icon" }) })] }) }));
}
function CommandList({ className, ...props }) {
    return (_jsx(CommandPrimitive.List, { "data-slot": "command-list", className: cn("cn-command-list overflow-x-hidden overflow-y-auto", className), ...props }));
}
function CommandEmpty({ className, ...props }) {
    return (_jsx(CommandPrimitive.Empty, { "data-slot": "command-empty", className: cn("cn-command-empty", className), ...props }));
}
function CommandGroup({ className, ...props }) {
    return (_jsx(CommandPrimitive.Group, { "data-slot": "command-group", className: cn("cn-command-group", className), ...props }));
}
function CommandSeparator({ className, ...props }) {
    return (_jsx(CommandPrimitive.Separator, { "data-slot": "command-separator", className: cn("cn-command-separator", className), ...props }));
}
function CommandItem({ className, children, ...props }) {
    return (_jsxs(CommandPrimitive.Item, { "data-slot": "command-item", className: cn("cn-command-item group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props, children: [children, _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "cn-command-item-indicator ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" })] }));
}
function CommandShortcut({ className, ...props }) {
    return (_jsx("span", { "data-slot": "command-shortcut", className: cn("cn-command-shortcut", className), ...props }));
}
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
