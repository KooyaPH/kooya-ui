// Adapted upstream REUI recipe; preserve supporting modules from the Kooya recipes bundle.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState } from "react";
import { ButtonGroup } from "../../adapters/controls";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, } from "../../adapters/selection";
import { IconPlaceholder } from "../../adapters/icons";
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
    const container = useRef(null);
    const [vertical, setVertical] = useState(true);
    useLayoutEffect(() => {
        const node = container.current;
        if (!node)
            return;
        const update = () => setVertical(node.clientWidth < 320);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    return (_jsx("div", { ref: container, role: "group", "aria-label": "Environment and time range", style: { width: "100%", maxWidth: 320, minWidth: 0 }, children: _jsxs(ButtonGroup, { orientation: vertical ? "vertical" : "horizontal", style: { width: "100%", gap: vertical ? 8 : 0 }, children: [_jsxs(Select, { value: env, onValueChange: setEnv, children: [_jsx(SelectTrigger, { "aria-label": "Environment", style: { minWidth: 0, width: vertical ? "100%" : 160 }, children: _jsx(SelectValue, { placeholder: "Select environment" }) }), _jsx(SelectContent, { position: "popper", align: "start", children: _jsx(SelectGroup, { children: environments.map((item) => (_jsx(SelectItem, { value: item.value, children: _jsxs("div", { className: "flex items-center gap-2", children: [item.icon, _jsx("span", { children: item.label })] }) }, item.value))) }) })] }), _jsxs(Select, { value: range, onValueChange: setRange, children: [_jsx(SelectTrigger, { "aria-label": "Time range", style: { minWidth: 0, width: vertical ? "100%" : 160 }, children: _jsx(SelectValue, { placeholder: "Select range" }) }), _jsxs(SelectContent, { position: "popper", children: [_jsx(SelectGroup, { children: timeRanges
                                        .filter((r) => r.category === "recent")
                                        .map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value))) }), _jsx(SelectSeparator, {}), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Observability Plus" }), timeRanges
                                            .filter((r) => r.category === "plus")
                                            .map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value)))] })] })] })] }) }));
}
