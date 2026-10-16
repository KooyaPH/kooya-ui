import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
];
export default function Pattern() {
    return (_jsxs("div", { className: "flex w-full max-w-xs items-center gap-2", children: [_jsxs(Select, { children: [_jsx(SelectTrigger, { className: "grow", children: _jsx(SelectValue, { placeholder: "Select a fruit" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: items.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value))) }) })] }), _jsx(Button, { children: "Submit" })] }));
}
