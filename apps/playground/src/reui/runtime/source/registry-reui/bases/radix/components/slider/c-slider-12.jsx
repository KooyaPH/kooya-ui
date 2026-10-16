"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
const emojis = ["😡", "🙁", "😐", "🙂", "😍"];
const labels = ["Awful", "Poor", "Okay", "Good", "Amazing"];
export default function Pattern() {
    const [value, setValue] = useState(3);
    return (_jsxs("div", { className: "mx-auto grid w-full max-w-sm gap-3", children: [_jsx(Label, { className: "text-sm font-medium", children: "Rate your experience" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Slider, { value: [value], onValueChange: (val) => setValue(Array.isArray(val) ? (val[0] ?? 3) : val), min: 1, max: 5, step: 1 }), _jsx("span", { className: "text-2xl", "aria-hidden": "true", children: emojis[value - 1] })] }), _jsx("span", { className: "text-muted-foreground text-center text-xs font-medium", children: labels[value - 1] })] }));
}
