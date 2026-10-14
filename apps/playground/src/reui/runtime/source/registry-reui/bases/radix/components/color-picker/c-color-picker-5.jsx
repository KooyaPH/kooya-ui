"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { ColorPicker, ColorPickerContent, ColorPickerSwatch, ColorPickerSwatches, ColorPickerTrigger, getForegroundColor, } from "../../reui/color-picker.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldGroup, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const LABEL_COLORS = [
    { value: "#ef4444", label: "Red" },
    { value: "#f97316", label: "Orange" },
    { value: "#eab308", label: "Yellow" },
    { value: "#22c55e", label: "Green" },
    { value: "#14b8a6", label: "Teal" },
    { value: "#3b82f6", label: "Blue" },
    { value: "#8b5cf6", label: "Violet" },
    { value: "#ec4899", label: "Pink" },
    { value: "#64748b", label: "Slate" },
];
export default function Pattern() {
    const [name, setName] = useState("Needs design");
    const [color, setColor] = useState("#8b5cf6");
    const custom = !!color && !LABEL_COLORS.some((preset) => preset.value === color);
    const ink = color ? getForegroundColor(color) : null;
    return (_jsxs(Card, { className: "w-full max-w-sm", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Edit label" }), _jsx(CardDescription, { children: "Labels group issues across projects." })] }), _jsx(CardContent, { children: _jsxs(FieldGroup, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "label-name", children: "Name" }), _jsx(Input, { id: "label-name", value: name, onChange: (event) => setName(event.target.value) })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { id: "label-color-label", children: "Color" }), _jsx(ColorPicker, { value: color, onValueChange: setColor, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(ColorPickerSwatches, { colors: LABEL_COLORS, shape: "circle", "aria-labelledby": "label-color-label", className: "flex-1" }), _jsx(ColorPickerTrigger, { size: "icon-sm", "aria-label": "Custom color", children: custom ? (_jsx(ColorPickerSwatch, { shape: "circle" })) : (_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "aria-hidden": "true" })) }), _jsx(ColorPickerContent, { align: "end" })] }) })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-muted-foreground text-sm", children: "Preview" }), _jsx(Badge, { style: {
                                        backgroundColor: color ?? undefined,
                                        color: ink ?? undefined,
                                    }, children: name.trim() || "Untitled" })] })] }) })] }));
}
