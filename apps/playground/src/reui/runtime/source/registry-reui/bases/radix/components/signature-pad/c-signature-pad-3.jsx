"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { SignaturePad, SignaturePadArea, SignaturePadGuide, } from "../../reui/signature-pad.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const id = useId();
    const [invalid, setInvalid] = useState(false);
    const [submitted, setSubmitted] = useState(null);
    return (_jsx("form", { noValidate: true, className: "mx-auto w-full max-w-md", onSubmit: (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            /* The pad writes an SVG data URL into the form under its `name`. */
            const signature = String(data.get("signature") ?? "");
            setInvalid(!signature);
            setSubmitted(signature
                ? {
                    name: String(data.get("name") ?? "").trim() || "Unnamed signer",
                    size: new Blob([signature]).size,
                }
                : null);
        }, onReset: () => {
            setInvalid(false);
            setSubmitted(null);
        }, children: _jsxs(FieldGroup, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: `${id}-name`, children: "Full name" }), _jsx(Input, { id: `${id}-name`, name: "name", autoComplete: "name", placeholder: "Maya Chen" })] }), _jsxs(Field, { "data-invalid": invalid || undefined, children: [_jsx(FieldLabel, { id: `${id}-label`, children: "Signature" }), _jsx(SignaturePad, { name: "signature", format: "svg", required: true, onStrokeStart: () => setInvalid(false), children: _jsx(SignaturePadArea, { "aria-labelledby": `${id}-label`, "aria-describedby": `${id}-hint`, "aria-invalid": invalid || undefined, children: _jsx(SignaturePadGuide, {}) }) }), invalid ? (_jsx(FieldError, { id: `${id}-hint`, children: "Sign above to continue." })) : (_jsx(FieldDescription, { id: `${id}-hint`, children: "Use a mouse, a finger or a stylus." }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { type: "submit", children: "Submit" }), _jsx(Button, { type: "reset", variant: "outline", children: "Reset" }), _jsx("p", { role: "status", className: "text-muted-foreground ms-auto min-w-0 truncate text-sm", children: submitted &&
                                `Signed by ${submitted.name}, ${(submitted.size / 1024).toFixed(1)} KB SVG` })] })] }) }));
}
