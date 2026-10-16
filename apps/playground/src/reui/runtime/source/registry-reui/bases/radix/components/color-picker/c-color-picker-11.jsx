"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ColorPicker, ColorPickerChannelInput, ColorPickerSlider, ColorPickerSwatch, ColorPickerValue, } from "../../reui/color-picker.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { InputGroup } from "../../../../../../../adapters/layout.tsx";
const CHANNELS = [
    { channel: "red", short: "R" },
    { channel: "green", short: "G" },
    { channel: "blue", short: "B" },
    { channel: "alpha", short: "A" },
];
export default function Pattern() {
    const [value, setValue] = useState("rgb(244 63 94 / 0.85)");
    return (_jsx(Card, { className: "w-full max-w-sm", children: _jsx(CardContent, { children: _jsx("div", { className: "flex flex-col gap-5", children: _jsxs(ColorPicker, { value: value, onValueChange: setValue, alpha: true, format: "rgb", "aria-label": "Mixed color", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(ColorPickerSwatch, { shape: "circle", className: "size-10" }), _jsxs("div", { className: "flex min-w-0 flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: "Channel mixer" }), _jsx("span", { className: "text-muted-foreground font-mono text-xs", children: _jsx(ColorPickerValue, {}) })] })] }), _jsx("div", { className: "grid gap-3", children: CHANNELS.map(({ channel, short }) => (_jsxs("div", { className: "grid grid-cols-[1rem_1fr_4rem] items-center gap-3", children: [_jsx("span", { "aria-hidden": "true", className: "text-muted-foreground text-xs font-medium", children: short }), _jsx(ColorPickerSlider, { channel: channel }), _jsx(InputGroup, { children: _jsx(ColorPickerChannelInput, { channel: channel }) })] }, channel))) })] }) }) }) }));
}
