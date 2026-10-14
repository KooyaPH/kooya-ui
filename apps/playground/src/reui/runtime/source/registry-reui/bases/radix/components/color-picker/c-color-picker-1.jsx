"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { ColorPicker, ColorPickerPanel, } from "../../reui/color-picker.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
const SWATCHES = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
];
export default function Pattern() {
    const [value, setValue] = useState("#6366f1");
    return (_jsx(Card, { className: "w-full max-w-96", children: _jsx(CardContent, { children: _jsx(ColorPicker, { value: value, onValueChange: setValue, alpha: true, swatches: SWATCHES, "aria-label": "Fill color", children: _jsx(ColorPickerPanel, {}) }) }) }));
}
