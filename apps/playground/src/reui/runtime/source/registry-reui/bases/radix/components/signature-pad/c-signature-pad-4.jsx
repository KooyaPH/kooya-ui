"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadGuide, SignaturePadPlaceholder, SignaturePadRedo, SignaturePadUndo, } from "../../reui/signature-pad.jsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/* `undefined` follows the theme's text color, so it stays legible in dark mode. */
const INKS = [
    { label: "Default", color: undefined, swatch: "bg-foreground" },
    { label: "Blue", color: "#2563eb", swatch: "bg-blue-600" },
    { label: "Green", color: "#059669", swatch: "bg-emerald-600" },
];
const WEIGHTS = [
    { label: "Fine", min: 0.5, max: 1.8, sample: 1 },
    { label: "Medium", min: 0.8, max: 3.2, sample: 1.75 },
    { label: "Bold", min: 1.6, max: 5.5, sample: 2.75 },
];
function Swatch({ className }) {
    return (_jsx("span", { "aria-hidden": "true", className: cn("ring-foreground/15 size-3.5 shrink-0 rounded-full ring-1 ring-inset", className) }));
}
function Stroke({ width }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 24 12", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: width, className: "w-5 shrink-0", children: _jsx("path", { d: "M2 8c3-5 6-5 9-1s7 4 11-3" }) }));
}
function download(href, name) {
    const link = document.createElement("a");
    link.href = href;
    link.download = name;
    link.click();
}
function DownloadMenuIcon({ format }) {
    return format === "png" ? (_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "Image01Icon", phosphor: "ImageIcon", remixicon: "RiImageLine", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "PenToolIcon", tabler: "IconVectorBezier", hugeicons: "PenTool03Icon", phosphor: "PenNibIcon", remixicon: "RiPenNibLine", "aria-hidden": "true" }));
}
const DOWNLOADS = [
    { format: "png", label: "PNG image" },
    { format: "svg", label: "SVG vector" },
];
export default function Pattern() {
    const [ink, setInk] = useState(INKS[0]);
    const [weight, setWeight] = useState(WEIGHTS[1]);
    const [strokes, setStrokes] = useState([]);
    /* While set, the pad shows this partial copy instead of the real value. */
    const [replay, setReplay] = useState(null);
    const [signedAt, setSignedAt] = useState(null);
    const frame = useRef(0);
    const padRef = useRef(null);
    useEffect(() => () => cancelAnimationFrame(frame.current), []);
    const playBack = () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        const total = strokes.reduce((sum, stroke) => sum + stroke.points.length, 0);
        const perFrame = Math.max(2, Math.ceil(total / 80));
        let shown = 0;
        const step = () => {
            shown += perFrame;
            let left = shown;
            const partial = [];
            for (const stroke of strokes) {
                if (left <= 0)
                    break;
                partial.push(left >= stroke.points.length
                    ? stroke
                    : { ...stroke, points: stroke.points.slice(0, left) });
                left -= stroke.points.length;
            }
            if (shown < total) {
                setReplay(partial);
                frame.current = requestAnimationFrame(step);
            }
            else {
                setReplay(null);
            }
        };
        frame.current = requestAnimationFrame(step);
    };
    const locked = signedAt !== null || replay !== null;
    /* Through apiRef, so a menu item outside the pad's parts can export it.
       Paper-white PNG, so the file reads the same on any page. */
    const save = (format) => {
        const value = padRef.current?.serialize(format, format === "png" ? { background: "#ffffff" } : undefined);
        if (value)
            download(value, `signature.${format}`);
    };
    return (_jsxs(Card, { className: "mx-auto w-full max-w-lg", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Statement of work" }), _jsx(CardDescription, { children: _jsxs("span", { className: "flex items-center gap-2", children: ["Harbor & Pine Design", _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), "SOW-2041"] }) }), _jsx(CardAction, { children: _jsxs("div", { className: "flex items-center gap-2", children: [signedAt && (_jsx(Button, { variant: "ghost", size: "xs", onClick: () => {
                                        setSignedAt(null);
                                        requestAnimationFrame(() => padRef.current?.focus());
                                    }, children: "Edit" })), _jsx(Badge, { variant: signedAt ? "success-light" : "secondary", children: signedAt ? "Signed" : "Draft" })] }) })] }), _jsx(CardContent, { children: _jsxs(SignaturePad, { apiRef: padRef, 
                    /* Replay swaps in a partial copy; readOnly keeps a stray stroke
                       from landing in it and being committed as the real value. */
                    value: replay ?? strokes, onValueChange: setStrokes, color: ink.color, minWidth: weight.min, maxWidth: weight.max, readOnly: locked, children: [_jsxs(SignaturePadArea, { "aria-label": "Client signature", className: "h-44", children: [_jsx(SignaturePadGuide, { className: "bottom-11" }), _jsx(SignaturePadPlaceholder, {}), _jsx("p", { "aria-hidden": "true", className: "text-muted-foreground pointer-events-none absolute start-6 bottom-4 text-xs", children: "Daniel Reyes, Client" })] }), _jsxs("div", { className: "flex items-center gap-1 pt-1", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": `Ink color, ${ink.label}`, disabled: locked, children: _jsx(Swatch, { className: ink.swatch }) }) }), _jsx(DropdownMenuContent, { align: "start", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Ink color" }), _jsx(DropdownMenuRadioGroup, { value: ink.label, onValueChange: (value) => {
                                                            const option = INKS.find((item) => item.label === value);
                                                            if (option)
                                                                setInk(option);
                                                        }, children: INKS.map((option) => (_jsxs(DropdownMenuRadioItem, { value: option.label, children: [_jsx(Swatch, { className: option.swatch }), option.label] }, option.label))) })] }) })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": `Line weight, ${weight.label}`, disabled: locked, children: _jsx(Stroke, { width: weight.sample }) }) }), _jsx(DropdownMenuContent, { align: "start", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Line weight" }), _jsx(DropdownMenuRadioGroup, { value: weight.label, onValueChange: (value) => {
                                                            const option = WEIGHTS.find((item) => item.label === value);
                                                            if (option)
                                                                setWeight(option);
                                                        }, children: WEIGHTS.map((option) => (_jsxs(DropdownMenuRadioItem, { value: option.label, children: [_jsx(Stroke, { width: option.sample }), option.label] }, option.label))) })] }) })] }), _jsx(Separator, { orientation: "vertical", className: "mx-1 my-auto h-4" }), _jsx(SignaturePadUndo, { variant: "ghost" }), _jsx(SignaturePadRedo, { variant: "ghost" }), _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Replay signature", disabled: strokes.length === 0 || locked, onClick: playBack, children: _jsx(IconPlaceholder, { lucide: "PlayIcon", tabler: "IconPlayerPlay", hugeicons: "PlayIcon", phosphor: "PlayIcon", remixicon: "RiPlayLine", "aria-hidden": "true" }) }), _jsx(SignaturePadClear, { variant: "ghost" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Download signature", className: "ms-auto", disabled: strokes.length === 0 || replay !== null, children: _jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download04Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownloadLine", "aria-hidden": "true" }) }) }), _jsx(DropdownMenuContent, { align: "end", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Download as" }), DOWNLOADS.map((option) => (_jsxs(DropdownMenuItem, { onClick: () => save(option.format), children: [_jsx(DownloadMenuIcon, { format: option.format }), option.label] }, option.format)))] }) })] })] })] }) }), _jsx(CardFooter, { children: signedAt ? (_jsxs("p", { ref: (node) => node?.focus(), tabIndex: -1, role: "status", className: "text-muted-foreground ms-auto flex items-center gap-1.5 text-sm outline-none", children: [_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", "aria-hidden": "true", className: "text-success size-4" }), "Signed ", signedAt] })) : (_jsx(Button, { className: "ms-auto", disabled: strokes.length === 0 || replay !== null, onClick: () => setSignedAt(new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }).format(new Date())), children: "Sign statement" })) })] }));
}
