import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
const largeListItems = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: largeListItems, children: [_jsx(ComboboxInput, { placeholder: "Search from 100 items" }), _jsxs(ComboboxContent, { children: [_jsx(ComboboxEmpty, { children: "No items found." }), _jsx(ComboboxList, { children: (item) => (_jsx(ComboboxItem, { value: item, children: item }, item)) })] })] }) }));
}
