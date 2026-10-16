"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ColorPicker, ColorPickerArea, ColorPickerContent, ColorPickerEyeDropper, ColorPickerFields, ColorPickerPanel, ColorPickerSlider, ColorPickerSwatches, ColorPickerTrigger, } from "../../reui/color-picker.jsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [color, setColor] = useState("#2563eb");
    const [recent, setRecent] = useState([
        "#0f172a",
        "#e11d48",
        "#f59e0b",
        "#10b981",
    ]);
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsxs(Field, { children: [_jsx(FieldLabel, { id: "brush-color-label", htmlFor: "brush-color", children: "Brush color" }), _jsxs(ColorPicker, { id: "brush-color", value: color, onValueChange: setColor, onValueCommit: (next) => {
                        if (!next)
                            return;
                        setRecent((list) => [next, ...list.filter((item) => item !== next)].slice(0, 8));
                    }, "aria-labelledby": "brush-color-label", "aria-describedby": "brush-color-description", children: [_jsx(ColorPickerTrigger, {}), _jsx(ColorPickerContent, { children: _jsxs(ColorPickerPanel, { children: [_jsx(ColorPickerArea, {}), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(ColorPickerEyeDropper, {}), _jsx(ColorPickerSlider, { channel: "hue" })] }), _jsx(ColorPickerFields, {}), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { id: "brush-recent-label", className: "text-muted-foreground text-xs font-medium", children: "Recent" }), _jsx(ColorPickerSwatches, { colors: recent, "aria-labelledby": "brush-recent-label" })] })] }) })] }), _jsx(FieldDescription, { id: "brush-color-description", children: "Colors you pick are kept under Recent." })] }) }));
}
