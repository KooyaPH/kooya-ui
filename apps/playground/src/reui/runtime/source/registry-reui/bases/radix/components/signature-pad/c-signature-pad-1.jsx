"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadControls, SignaturePadPlaceholder, SignaturePadPreview, SignaturePadSave, } from "../../reui/signature-pad.jsx";
export default function Pattern() {
    const [saved, setSaved] = useState([]);
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-lg flex-col gap-3", children: [_jsx(SignaturePad, { children: _jsxs(SignaturePadArea, { variant: "muted", className: "h-60", children: [_jsx(SignaturePadPlaceholder, {}), _jsxs(SignaturePadControls, { position: "bottom-end", children: [_jsx(SignaturePadClear, {}), _jsx(SignaturePadSave, { format: "json", onSave: (_, strokes) => setSaved(strokes) })] })] }) }), _jsx("div", { role: "status", children: saved.length > 0 && (_jsxs("div", { className: "text-muted-foreground flex items-center gap-3 text-sm", children: ["Saved", _jsx(SignaturePadPreview, { strokes: saved, className: "h-8 w-auto" })] })) })] }));
}
