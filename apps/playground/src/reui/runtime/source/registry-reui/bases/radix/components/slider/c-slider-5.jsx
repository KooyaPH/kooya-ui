"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [value, setValue] = useState([0.3, 0.7]);
    return (_jsxs("div", { className: "mx-auto grid w-full max-w-sm gap-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx(Label, { htmlFor: "slider-controlled", className: "text-sm font-medium", children: "Controlled Range" }), _jsxs("span", { className: "text-secondary-foreground text-xs font-semibold", children: [value[0]?.toFixed(1), " \u2013 ", value[1]?.toFixed(1)] })] }), _jsx(Slider, { id: "slider-controlled", value: value, onValueChange: (val) => setValue(val), min: 0, max: 1, step: 0.1 })] }));
}
