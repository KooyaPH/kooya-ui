"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ColorPicker, ColorPickerContent, ColorPickerInput, ColorPickerSwatch, formatColor, parseColor, } from "../../reui/color-picker.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
/* Tailwind's blue scale in OKLCH: lightness per step, and chroma relative to
   500. The base color becomes 500 and the curve bends around its lightness. */
const LIGHTNESS = [
    97, 93.2, 88.2, 80.9, 70.7, 62.3, 54.6, 48.8, 42.4, 37.9, 28.2,
];
const CHROMA = [0.07, 0.15, 0.28, 0.47, 0.77, 1, 1.14, 1.14, 0.93, 0.68, 0.43];
function buildScale(base) {
    const oklch = parseColor(formatColor(base, "oklch"));
    if (!oklch)
        return [];
    const [lightness, chroma, hue] = oklch.channels;
    return STEPS.map((step, index) => {
        const target = LIGHTNESS[index];
        const l = index < 5
            ? 100 - ((100 - target) * (100 - lightness)) / (100 - 62.3)
            : (target * lightness) / 62.3;
        const color = {
            space: "oklch",
            channels: [l, chroma * CHROMA[index], hue],
            alpha: 1,
        };
        return { step, value: formatColor(color, "hex") };
    });
}
export default function Pattern() {
    const [base, setBase] = useState("#7c3aed");
    const [copied, setCopied] = useState(false);
    const parsed = parseColor(base);
    const scale = parsed ? buildScale(parsed) : [];
    const css = scale
        .map(({ step, value }) => `--brand-${step}: ${value};`)
        .join("\n");
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Brand scale" }), _jsx(CardDescription, { children: "11 shades from one base color." }), _jsx(CardAction, { children: _jsx(Button, { variant: "outline", size: "sm", disabled: !css, onClick: async () => {
                                try {
                                    await navigator.clipboard.writeText(css);
                                    setCopied(true);
                                }
                                catch {
                                    setCopied(false);
                                }
                            }, children: copied ? "Copied" : "Copy CSS" }) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-5", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "brand-base", children: "Base color" }), _jsxs(ColorPicker, { id: "brand-base", value: base, onValueChange: (next) => {
                                        setBase(next);
                                        setCopied(false);
                                    }, children: [_jsx(ColorPickerInput, {}), _jsx(ColorPickerContent, {})] })] }), _jsx("ol", { className: "grid grid-cols-11 gap-1", children: scale.map(({ step, value }) => (_jsxs("li", { className: "flex flex-col items-center gap-1.5", children: [_jsx(ColorPickerSwatch, { color: value, "aria-label": `${step}, ${value}`, className: "h-10 w-full" }), _jsx("span", { className: "text-muted-foreground text-[0.625rem] tabular-nums", children: step })] }, step))) }), _jsx("span", { role: "status", className: "sr-only", children: copied ? "CSS variables copied" : "" })] }) })] }));
}
