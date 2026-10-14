"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarTrigger, } from "../../../../../../../adapters/menus.tsx";
export default function Pattern() {
    const [theme, setTheme] = useState("system");
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Menubar, { children: [_jsxs(MenubarMenu, { children: [_jsx(MenubarTrigger, { children: "View" }), _jsxs(MenubarContent, { className: "w-64", children: [_jsx(MenubarCheckboxItem, { children: "Always Show Bookmarks Bar" }), _jsx(MenubarCheckboxItem, { checked: true, children: "Always Show Full URLs" })] })] }), _jsxs(MenubarMenu, { children: [_jsx(MenubarTrigger, { children: "Theme" }), _jsx(MenubarContent, { children: _jsxs(MenubarRadioGroup, { value: theme, onValueChange: setTheme, children: [_jsx(MenubarRadioItem, { value: "light", children: "Light" }), _jsx(MenubarRadioItem, { value: "dark", children: "Dark" }), _jsx(MenubarRadioItem, { value: "system", children: "System" })] }) })] })] }) }));
}
