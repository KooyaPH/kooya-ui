"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [length, setLength] = useState(0);
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs(Label, { htmlFor: "label-counter", className: "justify-between", children: ["Bio", _jsxs("span", { className: "text-muted-foreground", children: [length, "/200"] })] }), _jsx(Textarea, { id: "label-counter", placeholder: "Tell us about yourself\u2026", maxLength: 200, onChange: (e) => setLength(e.target.value.length) })] }));
}
