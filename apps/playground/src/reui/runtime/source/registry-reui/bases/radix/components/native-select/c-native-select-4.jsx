import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
import { NativeSelect, NativeSelectOption, } from "../../../../../registry/bases/radix/ui/native-select.jsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "native-select-country", children: "Country" }), _jsxs(NativeSelect, { id: "native-select-country", children: [_jsx(NativeSelectOption, { value: "", children: "Select a country" }), _jsx(NativeSelectOption, { value: "us", children: "United States" }), _jsx(NativeSelectOption, { value: "uk", children: "United Kingdom" }), _jsx(NativeSelectOption, { value: "ca", children: "Canada" })] }), _jsx(FieldDescription, { children: "Select your country of residence." })] }));
}
