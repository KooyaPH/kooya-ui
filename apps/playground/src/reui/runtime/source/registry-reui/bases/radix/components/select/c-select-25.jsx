import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const countries = [
    { value: "us", label: "United States", flag: "\u{1F1FA}\u{1F1F8}" },
    { value: "gb", label: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}" },
    { value: "de", label: "Germany", flag: "\u{1F1E9}\u{1F1EA}" },
    { value: "fr", label: "France", flag: "\u{1F1EB}\u{1F1F7}" },
    { value: "jp", label: "Japan", flag: "\u{1F1EF}\u{1F1F5}" },
    { value: "au", label: "Australia", flag: "\u{1F1E6}\u{1F1FA}" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: countries[0].value, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select country" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: countries.map((country) => (_jsx(SelectItem, { value: country.value, children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { children: country.flag }), _jsx("span", { children: country.label })] }) }, country.value))) }) })] }) }));
}
