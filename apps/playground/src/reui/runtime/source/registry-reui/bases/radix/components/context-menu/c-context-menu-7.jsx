"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
export default function Pattern() {
    const [user, setUser] = useState("pedro");
    const [theme, setTheme] = useState("light");
    return (_jsx("div", { className: "flex w-full items-center justify-center p-12", children: _jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { className: "text-muted-foreground rounded-lg flex aspect-[2/0.5] w-full max-w-[300px] items-center justify-center border border-dashed text-sm", children: "Right click here" }), _jsxs(ContextMenuContent, { children: [_jsxs(ContextMenuGroup, { children: [_jsx(ContextMenuLabel, { children: "People" }), _jsxs(ContextMenuRadioGroup, { value: user, onValueChange: setUser, children: [_jsx(ContextMenuRadioItem, { value: "pedro", children: "Pedro Duarte" }), _jsx(ContextMenuRadioItem, { value: "colm", children: "Colm Tuite" })] })] }), _jsx(ContextMenuSeparator, {}), _jsxs(ContextMenuGroup, { children: [_jsx(ContextMenuLabel, { children: "Theme" }), _jsxs(ContextMenuRadioGroup, { value: theme, onValueChange: setTheme, children: [_jsx(ContextMenuRadioItem, { value: "light", children: "Light" }), _jsx(ContextMenuRadioItem, { value: "dark", children: "Dark" }), _jsx(ContextMenuRadioItem, { value: "system", children: "System" })] })] })] })] }) }));
}
