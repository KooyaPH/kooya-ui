"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [temperature, setTemperature] = useState(4500);
    const getLabel = (temp) => {
        if (temp <= 3000)
            return "Warm";
        if (temp <= 4500)
            return "Neutral";
        if (temp <= 5500)
            return "Daylight";
        return "Cool";
    };
    return (_jsxs("div", { className: "mx-auto grid w-full max-w-sm gap-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { className: "text-sm font-medium", children: "Color Temperature" }), _jsxs("span", { className: "text-muted-foreground text-xs font-medium tabular-nums", children: [temperature, "K \u00B7 ", getLabel(temperature)] })] }), _jsx("div", { className: "h-2 rounded-full", style: {
                    background: "linear-gradient(to right, #ff8a2b, #ffd4a3, #fff5e6, #e8f0ff, #a3c9ff)",
                } }), _jsx(Slider, { value: [temperature], onValueChange: (val) => setTemperature(Array.isArray(val) ? (val[0] ?? 4500) : val), min: 2700, max: 6500, step: 100 })] }));
}
