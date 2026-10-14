"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadControls, SignaturePadGuide, SignaturePadPlaceholder, } from "../../reui/signature-pad.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const id = useId();
    const [strokes, setStrokes] = useState([]);
    const [agreed, setAgreed] = useState(false);
    const [signedAt, setSignedAt] = useState(null);
    const padRef = useRef(null);
    return (_jsxs(Card, { className: "mx-auto w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Service agreement" }), _jsx(CardDescription, { children: "Northwind Studio, 12-month retainer" }), _jsx(CardAction, { children: _jsxs("div", { className: "flex items-center gap-2", children: [signedAt && (_jsx(Button, { variant: "ghost", size: "xs", onClick: () => {
                                        setSignedAt(null);
                                        setStrokes([]);
                                        setAgreed(false);
                                        requestAnimationFrame(() => padRef.current?.focus());
                                    }, children: "Start over" })), _jsx(Badge, { variant: signedAt ? "success-light" : "warning-light", children: signedAt ? "Signed" : "Awaiting signature" })] }) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("p", { className: "text-muted-foreground text-sm", children: "By signing you accept the scope, the payment schedule and the 30-day notice period in sections 2 to 5." }), _jsxs(SignaturePad, { apiRef: padRef, value: strokes, onValueChange: setStrokes, readOnly: signedAt !== null, children: [_jsxs(SignaturePadArea, { "aria-label": "Client signature", className: "h-36", children: [_jsx(SignaturePadGuide, {}), _jsx(SignaturePadPlaceholder, {}), signedAt === null && (_jsx(SignaturePadControls, { position: "top-end", children: _jsx(SignaturePadClear, { variant: "ghost" }) }))] }), _jsxs("div", { className: "text-muted-foreground flex justify-between text-xs", children: [_jsx("span", { children: "Maya Chen, Client" }), _jsx("span", { children: signedAt ?? "Dated on signing" })] })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Checkbox, { id: `${id}-agree`, checked: agreed, disabled: signedAt !== null, onCheckedChange: (checked) => setAgreed(checked === true) }), _jsx(FieldLabel, { htmlFor: `${id}-agree`, children: "I have read and agree to the agreement" })] })] }) }), _jsx(CardFooter, { children: signedAt ? (_jsx("p", { ref: (node) => node?.focus(), tabIndex: -1, role: "status", className: "w-full text-center text-sm font-medium outline-none", children: "Agreement signed" })) : (_jsx(Button, { className: "w-full", disabled: !agreed || strokes.length === 0, onClick: () => setSignedAt(new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                    }).format(new Date())), children: "Sign agreement" })) })] }));
}
