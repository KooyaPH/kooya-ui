import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const fonts = [
    { value: "sans", label: "Inter", className: "font-sans" },
    { value: "mono", label: "Mono", className: "font-mono" },
    { value: "serif", label: "Serif", className: "font-serif" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: fonts[0].value, children: [_jsx(SelectTrigger, { className: "w-[200px]", children: _jsx(SelectValue, { placeholder: "Select font" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: fonts.map((font) => (_jsx(SelectItem, { value: font.value, children: _jsx("span", { className: font.className, children: font.label }) }, font.value))) }) })] }) }));
}
