import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
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
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "select-fruit", children: "Favorite Fruit" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "select-fruit", children: _jsx(SelectValue, { placeholder: "Select a fruit" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: items.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value))) }) })] }), _jsx(FieldDescription, { children: "Choose your favorite fruit from the list." })] }));
}
