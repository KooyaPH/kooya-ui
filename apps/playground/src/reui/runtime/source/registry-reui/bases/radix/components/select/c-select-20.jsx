import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const items = [
    { label: "Select an option", value: null },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select an option" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: items.slice(1).map((item) => (_jsx(SelectItem, { value: item.value, className: "pr-2! pl-8 [&>span:first-child]:right-auto! [&>span:first-child]:left-2!", children: item.label }, item.value))) }) })] }) }));
}
