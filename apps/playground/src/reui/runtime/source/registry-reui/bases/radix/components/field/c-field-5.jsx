"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [cpuLimit, setCpuLimit] = useState([75]);
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsxs(FieldGroup, { children: [_jsxs(Field, { orientation: "horizontal", children: [_jsxs(FieldContent, { children: [_jsx(FieldTitle, { children: "High Performance Mode" }), _jsx(FieldDescription, { children: "Prioritize speed over battery life for intensive tasks." })] }), _jsx(Switch, { id: "high-performance", defaultChecked: true })] }), _jsxs(Field, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(FieldLabel, { htmlFor: "cpu-allocation", children: "CPU Allocation" }), _jsxs("span", { className: "text-muted-foreground text-xs font-medium", children: [cpuLimit[0], "%"] })] }), _jsx(Slider, { id: "cpu-allocation", value: cpuLimit, onValueChange: (value) => setCpuLimit(value), max: 100, step: 5 }), _jsx(FieldDescription, { children: "Limit the maximum CPU resources used by the application." })] })] }) }));
}
