"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const statuses = [
    { value: "ready", label: "Ready", color: "bg-emerald-400" },
    { value: "error", label: "Error", color: "bg-red-500" },
    { value: "building", label: "Building", color: "bg-amber-500" },
    { value: "queued", label: "Queued", color: "bg-blue-500" },
    { value: "initializing", label: "Initializing", color: "bg-primary" },
    { value: "canceled", label: "Canceled", color: "bg-fuchsia-500" },
];
export default function Pattern() {
    const [selected, setSelected] = useState(statuses[0].value);
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { value: selected, onValueChange: (val) => setSelected(val), children: [_jsx(SelectTrigger, { className: "w-full justify-between", children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsx(SelectContent, { position: "popper", className: "min-w-48", children: _jsx(SelectGroup, { children: statuses.map((status) => (_jsx(SelectItem, { value: status.value, children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: cn("size-2 rounded-full", status.color) }), _jsx("span", { children: status.label })] }) }, status.value))) }) })] }) }));
}
