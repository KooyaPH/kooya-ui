import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
const timezones = [
    {
        value: "Americas",
        items: [
            "(GMT-5) New York",
            "(GMT-8) Los Angeles",
            "(GMT-6) Chicago",
            "(GMT-5) Toronto",
            "(GMT-8) Vancouver",
            "(GMT-3) São Paulo",
        ],
    },
    {
        value: "Europe",
        items: [
            "(GMT+0) London",
            "(GMT+1) Paris",
            "(GMT+1) Berlin",
            "(GMT+1) Rome",
            "(GMT+1) Madrid",
            "(GMT+1) Amsterdam",
        ],
    },
    {
        value: "Asia/Pacific",
        items: [
            "(GMT+9) Tokyo",
            "(GMT+8) Shanghai",
            "(GMT+8) Singapore",
            "(GMT+4) Dubai",
            "(GMT+11) Sydney",
            "(GMT+9) Seoul",
        ],
    },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: timezones, children: [_jsx(ComboboxInput, { placeholder: "Select a timezone" }), _jsxs(ComboboxContent, { children: [_jsx(ComboboxEmpty, { children: "No timezones found." }), _jsx(ComboboxList, { children: (group) => (_jsxs(ComboboxGroup, { items: group.items, children: [_jsx(ComboboxLabel, { children: group.value }), _jsx(ComboboxCollection, { children: (item) => (_jsx(ComboboxItem, { value: item, children: item }, item)) }), _jsx(ComboboxSeparator, { className: "group-last/combobox-group:hidden" })] }, group.value)) })] })] }) }));
}
