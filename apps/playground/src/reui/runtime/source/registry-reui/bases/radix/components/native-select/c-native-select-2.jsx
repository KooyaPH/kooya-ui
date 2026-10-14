import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption, } from "../../../../../registry/bases/radix/ui/native-select.jsx";
export default function Pattern() {
    return (_jsxs(NativeSelect, { className: "w-full max-w-xs", children: [_jsx(NativeSelectOption, { value: "", children: "Select a food" }), _jsxs(NativeSelectOptGroup, { label: "Fruits", children: [_jsx(NativeSelectOption, { value: "apple", children: "Apple" }), _jsx(NativeSelectOption, { value: "banana", children: "Banana" }), _jsx(NativeSelectOption, { value: "blueberry", children: "Blueberry" })] }), _jsxs(NativeSelectOptGroup, { label: "Vegetables", children: [_jsx(NativeSelectOption, { value: "carrot", children: "Carrot" }), _jsx(NativeSelectOption, { value: "broccoli", children: "Broccoli" }), _jsx(NativeSelectOption, { value: "spinach", children: "Spinach" })] })] }));
}
