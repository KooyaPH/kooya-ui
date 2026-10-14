import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field, FieldError, FieldLabel } from "../../../../../../../adapters/layout.tsx";
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", "data-invalid": true, children: [_jsx(FieldLabel, { htmlFor: "combobox-framework-invalid", children: "Framework" }), _jsxs(Combobox, { items: frameworks, children: [_jsx(ComboboxInput, { id: "combobox-framework-invalid", placeholder: "Select a framework", "aria-invalid": true }), _jsxs(ComboboxContent, { children: [_jsx(ComboboxEmpty, { children: "No items found." }), _jsx(ComboboxList, { children: (item) => (_jsx(ComboboxItem, { value: item, children: item }, item)) })] })] }), _jsx(FieldError, { errors: [{ message: "This field is required." }] })] }));
}
