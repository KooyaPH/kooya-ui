"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { ColorPicker, ColorPickerContent, ColorPickerInput, } from "../../reui/color-picker.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const id = useId();
    const [invalid, setInvalid] = useState(false);
    const [saved, setSaved] = useState(null);
    return (
    /* `noValidate`: the Field draws the error, not the browser bubble. */
    _jsx("form", { noValidate: true, className: "mx-auto w-full max-w-sm", onSubmit: (event) => {
            event.preventDefault();
            /* The picker submits its value under `name`, or "" while empty. */
            const color = String(new FormData(event.currentTarget).get("brandColor") ?? "");
            setInvalid(!color);
            setSaved(color || null);
        }, onReset: () => {
            /* The picker returns to its default (empty) on the same reset. */
            setInvalid(false);
            setSaved(null);
        }, children: _jsxs(FieldGroup, { children: [_jsxs(Field, { "data-invalid": invalid || undefined, children: [_jsx(FieldLabel, { htmlFor: id, children: "Brand color" }), _jsxs(ColorPicker, { id: id, name: "brandColor", required: true, invalid: invalid, "aria-describedby": `${id}-hint`, onValueChange: (next) => {
                                if (next)
                                    setInvalid(false);
                            }, children: [_jsx(ColorPickerInput, { placeholder: "Type or pick a color" }), _jsx(ColorPickerContent, {})] }), invalid ? (_jsx(FieldError, { id: `${id}-hint`, children: "Choose a brand color to continue." })) : (_jsx(FieldDescription, { id: `${id}-hint`, children: "Used on the login page, emails and invoices." }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { type: "submit", children: "Save" }), _jsx(Button, { type: "reset", variant: "outline", children: "Reset" }), _jsx("p", { role: "status", className: "text-muted-foreground ms-auto min-w-0 truncate text-sm", children: saved && `Saved ${saved.toUpperCase()}` })] })] }) }));
}
