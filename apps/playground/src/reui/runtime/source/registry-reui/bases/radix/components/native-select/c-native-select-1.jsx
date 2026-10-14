import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NativeSelect, NativeSelectOption, } from "../../../../../registry/bases/radix/ui/native-select.jsx";
export default function Pattern() {
    return (_jsxs(NativeSelect, { className: "w-full max-w-xs", children: [_jsx(NativeSelectOption, { value: "", children: "Select a fruit" }), _jsx(NativeSelectOption, { value: "apple", children: "Apple" }), _jsx(NativeSelectOption, { value: "banana", children: "Banana" }), _jsx(NativeSelectOption, { value: "blueberry", children: "Blueberry" }), _jsx(NativeSelectOption, { value: "grapes", disabled: true, children: "Grapes" }), _jsx(NativeSelectOption, { value: "pineapple", children: "Pineapple" })] }));
}
