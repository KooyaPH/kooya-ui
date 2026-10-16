"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadControls, SignaturePadGuide, SignaturePadPlaceholder, } from "../../reui/signature-pad.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    const id = useId();
    const [mode, setMode] = useState("draw");
    const [strokes, setStrokes] = useState([]);
    const [typed, setTyped] = useState("");
    const [adopted, setAdopted] = useState(null);
    /* Typing is the keyboard and screen reader route to the same outcome. */
    const ready = mode === "draw" ? strokes.length > 0 : typed.trim().length > 1;
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-md flex-col gap-4", children: [_jsxs(Tabs, { value: mode, onValueChange: (value) => setMode(value === "type" ? "type" : "draw"), children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "draw", children: "Draw" }), _jsx(TabsTrigger, { value: "type", children: "Type" })] }), _jsx(TabsContent, { value: "draw", children: _jsx(SignaturePad, { value: strokes, onValueChange: (next) => {
                                setStrokes(next);
                                setAdopted(null);
                            }, children: _jsxs(SignaturePadArea, { className: "h-40", children: [_jsx(SignaturePadGuide, {}), _jsx(SignaturePadPlaceholder, {}), _jsx(SignaturePadControls, { position: "top-end", children: _jsx(SignaturePadClear, { variant: "ghost" }) })] }) }) }), _jsx(TabsContent, { value: "type", children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: `${id}-typed`, children: "Full name" }), _jsx(Input, { id: `${id}-typed`, value: typed, onChange: (event) => {
                                                setTyped(event.target.value);
                                                setAdopted(null);
                                            }, autoComplete: "name", placeholder: "Maya Chen" })] }), _jsx("p", { "aria-hidden": "true", className: "flex h-20 items-center justify-center border-b border-dashed px-4", children: typed.trim() ? (_jsx("span", { className: "truncate font-serif text-3xl italic", children: typed.trim() })) : (_jsx("span", { className: "text-muted-foreground text-sm", children: "Your typed signature appears here" })) })] }) })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { disabled: !ready, onClick: () => setAdopted(mode), children: "Adopt and sign" }), _jsx("div", { role: "status", children: adopted && (_jsxs(Badge, { variant: "success-light", children: [adopted === "draw" ? "Drawn" : "Typed", " signature adopted"] })) })] })] }));
}
