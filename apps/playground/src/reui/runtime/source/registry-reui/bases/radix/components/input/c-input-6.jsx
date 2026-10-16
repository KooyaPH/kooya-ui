"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [value, setValue] = useState("");
    const maxLength = 50;
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(FieldLabel, { htmlFor: "bio", children: "Description" }), _jsxs("span", { className: "text-muted-foreground text-xs", children: [value.length, "/", maxLength] })] }), _jsx(Input, { id: "bio", maxLength: maxLength, value: value, onChange: (e) => setValue(e.target.value), placeholder: "Description of your project" })] }));
}
