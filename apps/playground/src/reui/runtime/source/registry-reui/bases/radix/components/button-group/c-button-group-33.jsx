"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const environments = [
    {
        value: "production",
        label: "Production",
        icon: (_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeSimpleIcon", remixicon: "RiGlobalLine", "aria-hidden": "true", className: "size-3.5 opacity-60" })),
    },
    {
        value: "staging",
        label: "Staging",
        icon: (_jsx(IconPlaceholder, { lucide: "LayersIcon", tabler: "IconStack2", hugeicons: "Layers01Icon", phosphor: "StackIcon", remixicon: "RiStackLine", "aria-hidden": "true", className: "size-3.5 opacity-60" })),
    },
    {
        value: "development",
        label: "Development",
        icon: (_jsx(IconPlaceholder, { lucide: "TerminalIcon", tabler: "IconTerminal", hugeicons: "ComputerTerminal01Icon", phosphor: "TerminalIcon", remixicon: "RiTerminalLine", "aria-hidden": "true", className: "size-3.5 opacity-60" })),
    },
];
const timeRanges = [
    { value: "1h", label: "Last hour", category: "recent" },
    { value: "6h", label: "Last 6 hours", category: "recent" },
    { value: "12h", label: "Last 12 hours", category: "recent" },
    { value: "24h", label: "Last 24 hours", category: "recent" },
    { value: "3d", label: "Last 3 days", category: "plus" },
    { value: "7d", label: "Last 7 days", category: "plus" },
    { value: "14d", label: "Last 14 days", category: "plus" },
    { value: "30d", label: "Last 30 days", category: "plus" },
];
export default function Pattern() {
    const [env, setEnv] = useState("development");
    const [range, setRange] = useState("12h");
    return (_jsxs(ButtonGroup, { children: [_jsxs(Select, { value: env, onValueChange: setEnv, children: [_jsx(SelectTrigger, { className: "w-40", children: _jsx(SelectValue, { placeholder: "Select environment" }) }), _jsx(SelectContent, { position: "popper", align: "start", children: _jsx(SelectGroup, { children: environments.map((item) => (_jsx(SelectItem, { value: item.value, children: _jsxs("div", { className: "flex items-center gap-2", children: [item.icon, _jsx("span", { children: item.label })] }) }, item.value))) }) })] }), _jsxs(Select, { value: range, onValueChange: setRange, children: [_jsx(SelectTrigger, { className: "w-40", children: _jsx(SelectValue, { placeholder: "Select range" }) }), _jsxs(SelectContent, { position: "popper", children: [_jsx(SelectGroup, { children: timeRanges
                                    .filter((r) => r.category === "recent")
                                    .map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value))) }), _jsx(SelectSeparator, {}), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Observability Plus" }), timeRanges
                                        .filter((r) => r.category === "plus")
                                        .map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value)))] })] })] })] }));
}
