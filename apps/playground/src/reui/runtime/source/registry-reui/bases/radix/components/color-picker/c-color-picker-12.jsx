"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ColorPicker, ColorPickerArea, ColorPickerContent, ColorPickerFields, ColorPickerPanel, ColorPickerSlider, ColorPickerSwatch, ColorPickerTrigger, formatColor, useColorPicker, } from "../../reui/color-picker.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
const PROPERTIES = [
    { id: "inspector-fill", label: "Fill", value: "#6366f1" },
    { id: "inspector-stroke", label: "Stroke", value: "#0f172a" },
    { id: "inspector-shadow", label: "Shadow", value: "#0f172a40" },
];
/* Hex and opacity apart, the way design tools print a color. */
function InspectorValue() {
    const { color } = useColorPicker();
    if (!color)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx(ColorPickerSwatch, {}), _jsx("span", { className: "font-mono text-xs", children: formatColor({ ...color, alpha: 1 }, "hex")
                    .slice(1)
                    .toUpperCase() }), _jsxs("span", { className: "text-muted-foreground ms-auto text-xs tabular-nums", children: [Math.round(color.alpha * 100), "%"] })] }));
}
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Rectangle" }), _jsx(CardDescription, { children: "Hero card, 320 by 180" })] }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-col gap-2.5", children: PROPERTIES.map(({ id, label, value }) => (_jsxs("div", { className: "grid grid-cols-[3.5rem_1fr] items-center gap-3", children: [_jsx("span", { id: id, className: "text-muted-foreground text-sm", children: label }), _jsxs(ColorPicker, { defaultValue: value, alpha: true, "aria-labelledby": id, children: [_jsx(ColorPickerTrigger, { size: "sm", className: "w-full", children: _jsx(InspectorValue, {}) }), _jsx(ColorPickerContent, { align: "end", children: _jsxs(ColorPickerPanel, { children: [_jsxs("div", { className: "flex gap-3", children: [_jsx(ColorPickerArea, { className: "h-44 w-auto min-w-0 flex-1" }), _jsx(ColorPickerSlider, { channel: "hue", orientation: "vertical", className: "h-44" }), _jsx(ColorPickerSlider, { channel: "alpha", orientation: "vertical", className: "h-44" })] }), _jsx(ColorPickerFields, {})] }) })] })] }, id))) }) })] }));
}
