"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ColorPicker, ColorPickerArea, ColorPickerFields, ColorPickerWheel, } from "../../reui/color-picker.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [value, setValue] = useState("#f43f5e");
    return (_jsx(Card, { className: "w-fit", children: _jsx(CardContent, { children: _jsx("div", { className: "flex flex-col items-center gap-5", children: _jsxs(ColorPicker, { value: value, onValueChange: setValue, "aria-label": "Brush", children: [_jsx(ColorPickerWheel, { className: "size-56", children: _jsx(ColorPickerArea, { className: "size-full" }) }), _jsx(ColorPickerFields, { formats: ["hex", "rgb", "hsl"], className: "w-56" })] }) }) }) }));
}
