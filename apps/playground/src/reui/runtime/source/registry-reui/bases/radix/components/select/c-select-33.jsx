import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const sizes = [
    { label: "Select a size", value: null },
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
    { label: "Extra Large", value: "xl" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { children: [_jsx(SelectTrigger, { size: "sm", children: _jsx(SelectValue, { placeholder: "Select a size" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: sizes.map((size) => (_jsx(SelectItem, { value: size.value, children: size.label }, size.value))) }) })] }) }));
}
