"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ColorPicker, ColorPickerClear, ColorPickerContent, ColorPickerSwatches, ColorPickerTrigger, } from "../../reui/color-picker.jsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const TEXT_COLORS = [
    { value: "#6b7280", label: "Gray" },
    { value: "#dc2626", label: "Red" },
    { value: "#ea580c", label: "Orange" },
    { value: "#ca8a04", label: "Yellow" },
    { value: "#16a34a", label: "Green" },
    { value: "#0d9488", label: "Teal" },
    { value: "#2563eb", label: "Blue" },
    { value: "#7c3aed", label: "Violet" },
    { value: "#db2777", label: "Pink" },
    { value: "#92400e", label: "Brown" },
];
const HIGHLIGHTS = [
    { value: "#fef08a", label: "Yellow" },
    { value: "#bbf7d0", label: "Green" },
    { value: "#bfdbfe", label: "Blue" },
    { value: "#fbcfe8", label: "Pink" },
    { value: "#fed7aa", label: "Orange" },
    { value: "#ddd6fe", label: "Violet" },
    { value: "#99f6e4", label: "Teal" },
    { value: "#fecaca", label: "Red" },
    { value: "#d9f99d", label: "Lime" },
    { value: "#e5e7eb", label: "Gray" },
];
const SWATCH_GRID = "grid-cols-[repeat(5,var(--color-picker-swatch-size))]";
/* A palette menu: presets, then a way back to no color at all. */
function ColorMenu({ title, colors, reset, }) {
    return (_jsxs(ColorPickerContent, { className: "w-auto", children: [_jsx("span", { className: "text-muted-foreground text-xs font-medium", children: title }), _jsx(ColorPickerSwatches, { colors: colors, "aria-label": title, className: SWATCH_GRID }), _jsx(Separator, {}), _jsx(ColorPickerClear, { className: "justify-start", children: reset })] }));
}
export default function Pattern() {
    const [bold, setBold] = useState(false);
    /* `null` is the editor's default ink and no highlight at all. */
    const [ink, setInk] = useState(null);
    const [highlight, setHighlight] = useState("#fef08a");
    /* Each palette closes on a pick, like an editor menu, and hands focus back
       to its toolbar button. */
    const [menu, setMenu] = useState(null);
    return (
    /* Two panels: the toolbar, then the text it formats. */
    _jsxs(Frame, { spacing: "sm", className: "w-full max-w-md", children: [_jsx(FramePanel, { children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Toggle, { size: "sm", "aria-label": "Bold", pressed: bold, onPressedChange: setBold, children: _jsx(IconPlaceholder, { lucide: "BoldIcon", tabler: "IconBold", hugeicons: "TextBoldIcon", phosphor: "TextBIcon", remixicon: "RiBold", "aria-hidden": "true" }) }), _jsx(Separator, { orientation: "vertical", className: "my-auto h-4" }), _jsxs(ColorPicker, { value: ink, onValueChange: setInk, onValueCommit: () => setMenu(null), open: menu === "ink", onOpenChange: (open) => setMenu(open ? "ink" : null), "aria-label": "Text color", children: [_jsx(ColorPickerTrigger, { variant: "ghost", size: "icon-sm", children: _jsxs("span", { className: "relative flex", children: [_jsx(IconPlaceholder, { lucide: "TypeIcon", tabler: "IconTypography", hugeicons: "TextIcon", phosphor: "TextTIcon", remixicon: "RiFontColor", "aria-hidden": "true" }), _jsx("span", { "aria-hidden": "true", className: "absolute inset-x-0 -bottom-1 h-0.5 rounded-full", style: { background: ink ?? "currentColor" } })] }) }), _jsx(ColorMenu, { title: "Text color", colors: TEXT_COLORS, reset: "Default color" })] }), _jsxs(ColorPicker, { value: highlight, onValueChange: setHighlight, onValueCommit: () => setMenu(null), open: menu === "highlight", onOpenChange: (open) => setMenu(open ? "highlight" : null), "aria-label": "Highlight color", children: [_jsx(ColorPickerTrigger, { variant: "ghost", size: "icon-sm", children: _jsxs("span", { className: "relative flex", children: [_jsx(IconPlaceholder, { lucide: "HighlighterIcon", tabler: "IconHighlight", hugeicons: "HighlighterIcon", phosphor: "HighlighterIcon", remixicon: "RiMarkPenLine", "aria-hidden": "true" }), _jsx("span", { "aria-hidden": "true", className: "absolute inset-x-0 -bottom-1 h-0.5 rounded-full", style: { background: highlight ?? "transparent" } })] }) }), _jsx(ColorMenu, { title: "Highlight", colors: HIGHLIGHTS, reset: "No highlight" })] })] }) }), _jsx(FramePanel, { children: _jsxs("p", { className: "text-sm leading-relaxed data-bold:font-semibold", "data-bold": bold || undefined, style: { color: ink ?? undefined }, children: ["The launch review moves to Thursday.", " ", _jsx("mark", { className: "rounded-sm px-0.5 text-inherit", style: { backgroundColor: highlight ?? "transparent" }, children: "Bring the final pricing and the onboarding copy" }), " ", "so we can sign off before the press embargo lifts."] }) })] }));
}
