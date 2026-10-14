"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
export default function Pattern() {
    const [open, setOpen] = useState(false);
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, modal: false, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { className: "w-full max-w-xs", children: "Open Dialog" }) }), _jsxs(DialogContent, { className: "sm:max-w-sm", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Select Framework" }), _jsx(DialogDescription, { children: "Choose your preferred framework from the list below." })] }), _jsxs(Field, { className: "pt-4", children: [_jsx(FieldLabel, { htmlFor: "framework-dialog", className: "sr-only", children: "Framework" }), _jsxs(Combobox, { items: frameworks, children: [_jsx(ComboboxInput, { id: "framework-dialog", placeholder: "Select a framework" }), _jsxs(ComboboxContent, { children: [_jsx(ComboboxEmpty, { children: "No items found." }), _jsx(ComboboxList, { children: (item) => (_jsx(ComboboxItem, { value: item, children: item }, item)) })] })] })] }), _jsxs(DialogFooter, { className: "pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { type: "button", onClick: () => {
                                    toast("Framework selected.");
                                    setOpen(false);
                                }, children: "Confirm" })] })] })] }));
}
