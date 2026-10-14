"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { ColorPicker, getContrastRatio, } from "../../reui/color-picker.jsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/* WCAG 2.2 thresholds: 4.5 and 7 for body text, 3 for large text. */
const CHECKS = [
    { level: "AA", text: "Body", min: 4.5 },
    { level: "AAA", text: "Body", min: 7 },
    { level: "AA", text: "Large", min: 3 },
];
export default function Pattern() {
    const [text, setText] = useState("#1e3a8a");
    const [background, setBackground] = useState("#dbeafe");
    const ratio = text && background ? getContrastRatio(text, background) : null;
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Contrast checker" }), _jsx(CardDescription, { children: "WCAG ratios for a text and background pair." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-5", children: [_jsx(Frame, { children: _jsx(FramePanel, { style: {
                                    "--frame-panel-bg": background ?? undefined,
                                    color: text ?? undefined,
                                }, children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("p", { className: "text-lg font-semibold", children: "Quarterly report is ready" }), _jsx("p", { className: "text-sm", children: "Revenue grew 18% on the quarter, led by self-serve plans." })] }) }) }), _jsxs("div", { className: "flex items-end gap-2", children: [_jsxs(Field, { className: "min-w-0 flex-1", children: [_jsx(FieldLabel, { id: "contrast-text-label", htmlFor: "contrast-text", children: "Text" }), _jsx(ColorPicker, { id: "contrast-text", value: text, onValueChange: setText, "aria-labelledby": "contrast-text-label" })] }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Swap text and background", onClick: () => {
                                        setText(background);
                                        setBackground(text);
                                    }, children: _jsx(IconPlaceholder, { lucide: "ArrowLeftRightIcon", tabler: "IconArrowsExchange", hugeicons: "ArrowDataTransferHorizontalIcon", phosphor: "ArrowsLeftRightIcon", remixicon: "RiArrowLeftRightLine", "aria-hidden": "true" }) }), _jsxs(Field, { className: "min-w-0 flex-1", children: [_jsx(FieldLabel, { id: "contrast-background-label", htmlFor: "contrast-background", children: "Background" }), _jsx(ColorPicker, { id: "contrast-background", value: background, onValueChange: setBackground, "aria-labelledby": "contrast-background-label" })] })] }), _jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { role: "status", children: [_jsx("p", { className: "text-3xl font-semibold tabular-nums", children: ratio ? `${ratio.toFixed(2)}:1` : "None" }), _jsx("p", { className: "text-muted-foreground text-xs", children: "Contrast ratio" })] }), _jsx("ul", { className: "flex flex-col items-end gap-1.5", children: CHECKS.map((check) => {
                                        const pass = ratio !== null && ratio >= check.min;
                                        return (_jsxs("li", { className: "flex items-center gap-2 text-xs", children: [_jsxs("span", { className: "text-muted-foreground", children: [check.text, " ", check.level] }), _jsx(Badge, { variant: pass ? "success-light" : "destructive-light", children: pass ? "Pass" : "Fail" })] }, `${check.level}-${check.text}`));
                                    }) })] })] }) })] }));
}
