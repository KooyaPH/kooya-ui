import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: frameworks, defaultValue: frameworks[0], children: [_jsx(ComboboxInput, { placeholder: "Select a framework", showClear: true }), _jsxs(ComboboxContent, { children: [_jsx(ComboboxEmpty, { children: "No items found." }), _jsx(ComboboxList, { children: (item) => (_jsx(ComboboxItem, { value: item, children: item }, item)) })] })] }) }));
}
