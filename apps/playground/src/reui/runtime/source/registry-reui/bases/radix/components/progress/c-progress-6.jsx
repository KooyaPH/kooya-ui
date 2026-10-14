"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Progress } from "../../../../../../../adapters/controls.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [value, setValue] = useState(50);
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-xs flex-col gap-6", children: [_jsx(Progress, { value: value }), _jsx(Slider, { value: [value], onValueChange: (value) => setValue(value), min: 0, max: 100, step: 1 })] }));
}
