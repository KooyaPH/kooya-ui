"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ColorPicker } from "../../reui/color-picker.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [overlay, setOverlay] = useState("rgb(15 23 42 / 0.55)");
    return (_jsxs(Card, { className: "w-full max-w-sm overflow-hidden pt-0", children: [_jsxs("div", { className: "relative flex h-40 items-end bg-[linear-gradient(135deg,#f97316,#ec4899_45%,#6366f1)] p-5", children: [_jsx("div", { "aria-hidden": "true", className: "absolute inset-0", style: { background: overlay ?? "transparent" } }), _jsxs("div", { className: "relative", children: [_jsx("p", { className: "text-xs font-medium tracking-wide text-white/80 uppercase", children: "New season" }), _jsx("p", { className: "text-lg font-semibold text-white", children: "Spring collection" })] })] }), _jsx(CardContent, { children: _jsxs(Field, { children: [_jsx(FieldLabel, { id: "banner-overlay-label", htmlFor: "banner-overlay", children: "Banner overlay" }), _jsx(ColorPicker, { id: "banner-overlay", value: overlay, onValueChange: setOverlay, alpha: true, format: "rgb", "aria-labelledby": "banner-overlay-label", "aria-describedby": "banner-overlay-description" }), _jsx(FieldDescription, { id: "banner-overlay-description", children: "Darken the artwork so the headline stays readable." })] }) })] }));
}
