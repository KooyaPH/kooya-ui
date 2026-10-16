import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
const countries = [
    { code: "af", label: "Afghanistan" },
    { code: "al", label: "Albania" },
    { code: "dz", label: "Algeria" },
    { code: "as", label: "American Samoa" },
    { code: "ad", label: "Andorra" },
    { code: "ao", label: "Angola" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: countries, defaultValue: countries[0], itemToStringValue: (item) => item.label, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { variant: "outline", className: "justify-between font-normal" }), children: _jsx(ComboboxValue, { children: (item) => (_jsxs("span", { className: "flex items-center gap-2", children: [_jsx("img", { src: `https://flagcdn.com/${item.code.toLowerCase()}.svg`, alt: "", width: 16, height: 16, className: "rounded-xs" }), _jsx("span", { children: item.label })] })) }) }), _jsxs(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: [_jsx(ComboboxInput, { showTrigger: false, placeholder: "Search" }), _jsx(ComboboxEmpty, { children: "No items found." }), _jsx(ComboboxList, { children: (item) => (_jsxs(ComboboxItem, { value: item, children: [_jsx("img", { src: `https://flagcdn.com/${item.code.toLowerCase()}.svg`, alt: "", width: 16, height: 12, className: "rounded-xs" }), item.label] }, item.code)) })] })] }) }));
}
