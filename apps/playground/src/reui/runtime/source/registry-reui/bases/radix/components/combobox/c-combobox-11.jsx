"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
export default function Pattern() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const framework = formData.get("framework");
        toast(`You selected ${framework} as your framework.`);
    };
    return (_jsxs("form", { id: "form-with-combobox", onSubmit: handleSubmit, className: "w-full max-w-xs space-y-4", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "framework", children: "Framework" }), _jsxs(Combobox, { items: frameworks, children: [_jsx(ComboboxInput, { id: "framework", name: "framework", placeholder: "Select a framework", required: true }), _jsxs(ComboboxContent, { children: [_jsx(ComboboxEmpty, { children: "No items found." }), _jsx(ComboboxList, { children: (item) => (_jsx(ComboboxItem, { value: item, children: item }, item)) })] })] })] }), _jsx(Button, { type: "submit", form: "form-with-combobox", className: "w-full", children: "Submit" })] }));
}
