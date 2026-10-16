"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { ColorPicker, ColorPickerChannelInput, ColorPickerCopy, ColorPickerSlider, getForegroundColor, isColorInSrgb, parseColor, } from "../../reui/color-picker.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
const CHANNELS = [
    { channel: "lightness", short: "L" },
    { channel: "chroma", short: "C" },
    { channel: "hue", short: "H" },
];
export default function Pattern() {
    /* Tailwind's blue-500, a P3 color: its chroma runs past sRGB. */
    const [primary, setPrimary] = useState("oklch(62.3% 0.214 259.815)");
    const color = parseColor(primary);
    const foreground = color ? getForegroundColor(color) : null;
    /* The preview re-points the theme tokens themselves, so the Button and the
       Badge below render exactly as they would with this --primary. */
    const theme = primary && foreground
        ? {
            "--primary": primary,
            "--primary-foreground": foreground,
        }
        : undefined;
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Primary color" }), _jsx(CardDescription, { children: "Tune the --primary token in OKLCH, the format shadcn and Tailwind v4 themes use." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-5", children: [_jsxs(ColorPicker, { value: primary, onValueChange: setPrimary, format: "oklch", "aria-label": "Primary color", children: [_jsx("div", { className: "grid gap-3", children: CHANNELS.map(({ channel, short }) => (_jsxs("div", { className: "grid grid-cols-[1rem_1fr_4.5rem] items-center gap-3", children: [_jsx("span", { "aria-hidden": "true", className: "text-muted-foreground text-xs font-medium", children: short }), _jsx(ColorPickerSlider, { channel: channel, colorSpace: "oklch" }), _jsx(InputGroup, { children: _jsx(ColorPickerChannelInput, { channel: channel, colorSpace: "oklch" }) })] }, channel))) }), _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { readOnly: true, value: `--primary: ${primary ?? "none"};`, "aria-label": "CSS variable" }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(ColorPickerCopy, { size: "icon-xs" }) })] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", style: theme, children: [_jsx(Button, { children: "Save changes" }), _jsx(Badge, { children: "New" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Checkbox, { id: "primary-notify", defaultChecked: true }), _jsx(Label, { htmlFor: "primary-notify", children: "Notify team" })] }), color && !isColorInSrgb(color) && (_jsx(Badge, { variant: "warning-light", className: "ms-auto", children: "Outside sRGB" }))] })] }) })] }));
}
