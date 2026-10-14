import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const fruits = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
];
const vegetables = [
    { label: "Carrot", value: "carrot" },
    { label: "Broccoli", value: "broccoli" },
    { label: "Spinach", value: "spinach" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select an option" }) }), _jsxs(SelectContent, { position: "popper", children: [_jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Fruits" }), fruits.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value)))] }), _jsx(SelectSeparator, {}), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Vegetables" }), vegetables.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value)))] })] })] }) }));
}
