"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [value, setValue] = useState(50);
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(FieldLabel, { htmlFor: "range-slider", children: "Volume" }), _jsx("span", { className: "text-muted-foreground text-xs font-medium", children: value })] }), _jsx(Input, { id: "range-slider", type: "range", min: "0", max: "100", value: value, onChange: (e) => setValue(parseInt(e.target.value)), className: "bg-muted accent-primary h-2 cursor-pointer appearance-none" })] }));
}
