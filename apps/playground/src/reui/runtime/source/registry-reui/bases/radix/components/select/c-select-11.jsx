import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { children: "Open Dialog" }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Select Example" }), _jsx(DialogDescription, { children: "Use the select below to choose a fruit." })] }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select a fruit" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: items.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value))) }) })] })] })] }) }));
}
