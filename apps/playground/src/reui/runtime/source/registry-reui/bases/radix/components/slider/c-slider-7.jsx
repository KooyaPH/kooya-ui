"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [value, setValue] = useState(50);
    return (_jsxs("div", { className: "mx-auto grid w-full max-w-sm gap-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "slider-input", className: "text-sm font-medium", children: "Opacity" }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Input, { id: "slider-input", type: "number", value: value, onChange: (e) => {
                                    const v = Number(e.target.value);
                                    if (v >= 0 && v <= 100)
                                        setValue(v);
                                }, min: 0, max: 100, className: "h-8 w-16 text-center text-sm tabular-nums" }), _jsx("span", { className: "text-muted-foreground text-xs", children: "%" })] })] }), _jsx(Slider, { value: [value], onValueChange: (val) => setValue(Array.isArray(val) ? (val[0] ?? 50) : val), max: 100, step: 1 })] }));
}
