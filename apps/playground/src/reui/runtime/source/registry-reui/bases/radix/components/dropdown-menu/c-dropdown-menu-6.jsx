"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-fit", children: "Checkboxes" }) }), _jsx(DropdownMenuContent, { className: "min-w-40", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Appearance" }), _jsxs(DropdownMenuCheckboxItem, { checked: showStatusBar, onCheckedChange: setShowStatusBar, children: [_jsx(IconPlaceholder, { lucide: "LayoutIcon", tabler: "IconLayout", hugeicons: "LayoutIcon", phosphor: "LayoutIcon", remixicon: "RiLayoutLine" }), "Status Bar"] }), _jsxs(DropdownMenuCheckboxItem, { checked: showActivityBar, onCheckedChange: setShowActivityBar, disabled: true, children: [_jsx(IconPlaceholder, { lucide: "ActivityIcon", tabler: "IconActivity", hugeicons: "ActivityIcon", phosphor: "ActivityIcon", remixicon: "RiPulseLine" }), "Activity Bar"] }), _jsxs(DropdownMenuCheckboxItem, { checked: showPanel, onCheckedChange: setShowPanel, children: [_jsx(IconPlaceholder, { lucide: "PanelLeftIcon", tabler: "IconLayoutSidebar", hugeicons: "LayoutLeftIcon", phosphor: "SidebarIcon", remixicon: "RiSideBarLine" }), "Panel"] })] }) })] }) }));
}
