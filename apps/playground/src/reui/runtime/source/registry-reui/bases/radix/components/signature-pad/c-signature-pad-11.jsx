"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadControls, SignaturePadGuide, SignaturePadPlaceholder, SignaturePadUndo, } from "../../reui/signature-pad.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const id = useId();
    const [recipient, setRecipient] = useState("");
    const [strokes, setStrokes] = useState([]);
    const [confirmed, setConfirmed] = useState(false);
    return (_jsxs(Card, { className: "mx-auto w-full max-w-sm", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Proof of delivery" }), _jsx(CardDescription, { children: _jsxs("span", { className: "flex items-center gap-2", children: ["Order #48213", _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), "3 parcels"] }) }), confirmed && (_jsx(CardAction, { children: _jsx(Badge, { variant: "success-light", children: "Delivered" }) }))] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: `${id}-recipient`, children: "Received by" }), _jsx(Input, { id: `${id}-recipient`, value: recipient, disabled: confirmed, onChange: (event) => setRecipient(event.target.value), placeholder: "Recipient name", autoComplete: "off" })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { id: `${id}-signature`, children: "Recipient signature" }), _jsx(SignaturePad, { value: strokes, onValueChange: setStrokes, readOnly: confirmed, children: _jsxs(SignaturePadArea, { "aria-labelledby": `${id}-signature`, className: "h-44", children: [_jsx(SignaturePadGuide, {}), _jsx(SignaturePadPlaceholder, { children: "Hand the device to the recipient" }), !confirmed && (_jsxs(SignaturePadControls, { position: "top-end", children: [_jsx(SignaturePadUndo, { variant: "ghost" }), _jsx(SignaturePadClear, { variant: "ghost" })] }))] }) })] })] }) }), _jsx(CardFooter, { children: confirmed ? (_jsxs("p", { ref: (node) => node?.focus(), tabIndex: -1, role: "status", className: "w-full text-center text-sm font-medium outline-none", children: ["Delivered to ", recipient.trim()] })) : (_jsx(Button, { size: "lg", className: "w-full", disabled: !recipient.trim() || strokes.length === 0, onClick: () => setConfirmed(true), children: "Confirm delivery" })) })] }));
}
