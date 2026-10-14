"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [value, setValue] = useState(50);
    const min = 0;
    const max = 100;
    const percentage = ((value - min) / (max - min)) * 100;
    return (_jsxs("div", { className: "mx-auto grid w-full max-w-sm gap-4", children: [_jsx(Label, { className: "text-sm font-medium", children: "Volume" }), _jsxs("div", { className: "relative pt-7", children: [_jsxs("div", { className: "bg-foreground text-background absolute top-0 rounded px-2 py-0.5 text-xs font-semibold tabular-nums", style: {
                            left: `${percentage}%`,
                            transform: "translateX(-50%)",
                        }, children: [value, "%", _jsx("div", { className: "bg-foreground absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45" })] }), _jsx(Slider, { value: [value], onValueChange: (val) => setValue(Array.isArray(val) ? (val[0] ?? 50) : val), min: min, max: max, step: 1 })] })] }));
}
