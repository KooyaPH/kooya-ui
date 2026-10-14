"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
export default function Pattern() {
    const anchor = useComboboxAnchor();
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { multiple: true, autoHighlight: true, items: frameworks, defaultValue: [frameworks[0], frameworks[1]], disabled: true, children: [_jsx(ComboboxChips, { ref: anchor, children: _jsx(ComboboxValue, { children: (values) => (_jsxs(Fragment, { children: [values.map((value) => (_jsx(ComboboxChip, { children: value }, value))), _jsx(ComboboxChipsInput, { placeholder: "Select frameworks..." })] })) }) }), _jsxs(ComboboxContent, { anchor: anchor, children: [_jsx(ComboboxEmpty, { children: "No items found." }), _jsx(ComboboxList, { children: (item) => (_jsx(ComboboxItem, { value: item, children: item }, item)) })] })] }) }));
}
