"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [isFocused, setIsFocused] = useState(false);
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "pulsed-input", children: "Pulsed Background" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: `bg-primary/20 pointer-events-none absolute inset-0 rounded-md transition-opacity duration-300 ${isFocused ? "opacity-0" : "animate-pulse"}` }), _jsx(Input, { id: "pulsed-input", placeholder: "Animation stops on focus...", onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), className: "focus-visible:bg-background relative bg-transparent shadow-none transition-colors duration-300" })] })] }));
}
