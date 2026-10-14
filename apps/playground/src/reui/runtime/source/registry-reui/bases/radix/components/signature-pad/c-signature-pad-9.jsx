"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadControls, SignaturePadGuide, SignaturePadPlaceholder, } from "../../reui/signature-pad.jsx";
import { Field, FieldContent, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
const INPUT_LABEL = {
    pen: "Stylus, width from pressure",
    touch: "Finger, width from speed",
    mouse: "Mouse, width from speed",
};
export default function Pattern() {
    const id = useId();
    const [penOnly, setPenOnly] = useState(false);
    const [lastInput, setLastInput] = useState(null);
    return (_jsxs(SignaturePad
    /* A stylus reports pressure; accepting only it ignores a resting palm. */
    , { 
        /* A stylus reports pressure; accepting only it ignores a resting palm. */
        pointerTypes: penOnly ? ["pen"] : undefined, onStrokeStart: ({ pointerType }) => setLastInput(pointerType), className: "mx-auto max-w-lg", children: [_jsxs(Field, { orientation: "horizontal", children: [_jsxs(FieldContent, { children: [_jsx(FieldLabel, { htmlFor: `${id}-pen`, children: "Pen only" }), _jsx(FieldDescription, { children: "Ignore touch and mouse, so a hand resting on the screen leaves no marks." })] }), _jsx(Switch, { id: `${id}-pen`, checked: penOnly, onCheckedChange: (checked) => setPenOnly(checked) })] }), _jsxs(SignaturePadArea, { className: "h-48", children: [_jsx(SignaturePadGuide, {}), _jsx(SignaturePadPlaceholder, { children: penOnly
                            ? "Sign with a stylus"
                            : "Sign with a stylus, finger or mouse" }), _jsx(SignaturePadControls, { position: "top-end", children: _jsx(SignaturePadClear, { variant: "ghost" }) })] }), _jsxs("div", { className: "text-muted-foreground flex items-center gap-2 text-xs", children: ["Last stroke", _jsx(Badge, { variant: "outline", children: lastInput ? INPUT_LABEL[lastInput] : "None yet" })] })] }));
}
