"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ColorPicker, ColorPickerArea, ColorPickerCopy, ColorPickerSlider, formatColor, useColorPicker, } from "../../reui/color-picker.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
const FORMATS = [
    { format: "hex", label: "HEX" },
    { format: "rgb", label: "RGB" },
    { format: "hsl", label: "HSL" },
    { format: "hsb", label: "HSB" },
    { format: "oklch", label: "OKLCH" },
];
/* Reads the picker through its hook, so it needs no value of its own. */
function FormatList() {
    const { color } = useColorPicker();
    return (_jsx("ul", { className: "divide-y", children: FORMATS.map(({ format, label }) => (_jsxs("li", { className: "flex items-center gap-3 py-2 first:pt-0 last:pb-0", children: [_jsx("span", { className: "text-muted-foreground w-12 shrink-0 text-xs font-medium", children: label }), _jsx("code", { className: "min-w-0 flex-1 truncate font-mono text-sm", children: color ? formatColor(color, format) : "None" }), _jsx(ColorPickerCopy, { format: format, size: "icon-xs", "aria-label": `Copy ${label}` })] }, format))) }));
}
export default function Pattern() {
    const [value, setValue] = useState("#14b8a6");
    return (_jsx(Card, { className: "w-full", children: _jsx(CardContent, { children: _jsx(ColorPicker, { value: value, onValueChange: setValue, alpha: true, "aria-label": "Color to convert", children: _jsx("div", { className: "@container", children: _jsxs("div", { className: "grid grid-cols-1 gap-6 @xl:grid-cols-[13rem_minmax(0,1fr)] @xl:items-center", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(ColorPickerArea, { className: "h-36" }), _jsx(ColorPickerSlider, { channel: "hue" }), _jsx(ColorPickerSlider, { channel: "alpha" })] }), _jsx(FormatList, {})] }) }) }) }) }));
}
