"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { getSignaturePadBounds, SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadGuide, SignaturePadPlaceholder, SignaturePadSave, } from "../../reui/signature-pad.jsx";
import { buttonVariants } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupText, } from "../../../../../../../adapters/controls.tsx";
const FORMATS = [
    { format: "png", label: "PNG", ext: "png" },
    { format: "jpeg", label: "JPEG", ext: "jpg" },
    { format: "svg", label: "SVG", ext: "svg" },
    { format: "json", label: "JSON", ext: "json" },
];
const PADDING = 16;
export default function Pattern() {
    const [result, setResult] = useState(null);
    const isImage = result !== null && result.format !== "json";
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-lg flex-col gap-4", children: [_jsxs(SignaturePad, { onValueChange: () => setResult(null), children: [_jsxs(SignaturePadArea, { className: "h-44", children: [_jsx(SignaturePadGuide, {}), _jsx(SignaturePadPlaceholder, {})] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsxs(ButtonGroup, { "aria-label": "Export format", children: [_jsx(ButtonGroupText, { children: "Export" }), FORMATS.map((item) => (_jsx(SignaturePadSave, { format: item.format, 
                                        /* Paper-white, so the export reads the same in a dark UI. */
                                        options: { background: "#ffffff", padding: PADDING }, size: "sm", onSave: (value, strokes) => {
                                            const bounds = getSignaturePadBounds(strokes);
                                            setResult({
                                                ...item,
                                                value,
                                                width: Math.ceil((bounds?.width ?? 0) + PADDING * 2),
                                                height: Math.ceil((bounds?.height ?? 0) + PADDING * 2),
                                            });
                                        }, children: item.label }, item.format)))] }), _jsx(SignaturePadClear, { variant: "ghost", size: "sm", className: "ms-auto", children: "Clear" })] })] }), _jsx("p", { role: "status", className: "sr-only", children: result &&
                    `${result.label} ready, ${(new Blob([result.value]).size / 1024).toFixed(1)} KB` }), result && (_jsx(Frame, { spacing: "sm", children: _jsx(FramePanel, { children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "font-medium", children: result.label }), _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsxs("span", { className: "text-muted-foreground", children: [(new Blob([result.value]).size / 1024).toFixed(1), " KB"] }), _jsx("a", { href: isImage
                                            ? result.value
                                            : `data:application/json;charset=utf-8,${encodeURIComponent(result.value)}`, download: `signature.${result.ext}`, className: buttonVariants({
                                            variant: "outline",
                                            size: "xs",
                                            className: "ms-auto",
                                        }), children: "Download" })] }), isImage ? (_jsx("img", { src: result.value, alt: `Signature exported as ${result.label}`, width: result.width, height: result.height, className: "max-h-32 w-auto self-start" })) : (_jsx("p", { className: "text-muted-foreground line-clamp-3 font-mono text-xs break-all", children: result.value }))] }) }) }))] }));
}
