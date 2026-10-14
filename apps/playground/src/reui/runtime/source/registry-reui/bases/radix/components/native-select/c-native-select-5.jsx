import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NativeSelect, NativeSelectOption, } from "../../../../../registry/bases/radix/ui/native-select.jsx";
export default function Pattern() {
    return (_jsxs(NativeSelect, { disabled: true, className: "w-full max-w-xs", children: [_jsx(NativeSelectOption, { value: "", children: "Disabled Select" }), _jsx(NativeSelectOption, { value: "1", children: "Option 1" })] }));
}
