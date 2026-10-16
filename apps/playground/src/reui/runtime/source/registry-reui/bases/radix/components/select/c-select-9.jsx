import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldError, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
];
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", "data-invalid": true, children: [_jsx(FieldLabel, { htmlFor: "select-fruit-invalid", children: "Favorite Fruit" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "select-fruit-invalid", "aria-invalid": true, children: _jsx(SelectValue, { placeholder: "Select a fruit" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: items.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value))) }) })] }), _jsx(FieldError, { errors: [{ message: "Please select a valid fruit." }] })] }));
}
