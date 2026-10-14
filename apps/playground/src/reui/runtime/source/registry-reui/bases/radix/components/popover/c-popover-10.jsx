"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [volume, setVolume] = useState([75]);
    return (_jsx("div", { className: "flex min-h-[100px] items-center justify-center", children: _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", children: _jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "SettingsIcon", phosphor: "GearIcon", remixicon: "RiSettings3Line", "aria-hidden": "true" }) }) }), _jsxs(PopoverContent, { className: "w-72 gap-0 p-0", align: "end", children: [_jsxs("div", { className: "border-b p-3", children: [_jsx("h4", { className: "m-0 font-medium", children: "Quick Settings" }), _jsx("p", { className: "text-muted-foreground", children: "Adjust your preferences." })] }), _jsxs("div", { className: "space-y-3 p-3 pb-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { htmlFor: "qs-dark", children: "Dark Mode" }), _jsx(Switch, { id: "qs-dark" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { htmlFor: "qs-notif", children: "Notifications" }), _jsx(Switch, { id: "qs-notif", defaultChecked: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { children: "Volume" }), _jsxs("span", { className: "text-muted-foreground", children: [volume[0], "%"] })] }), _jsx(Slider, { value: volume, onValueChange: (v) => setVolume(v), max: 100, step: 1 })] })] })] })] }) }));
}
