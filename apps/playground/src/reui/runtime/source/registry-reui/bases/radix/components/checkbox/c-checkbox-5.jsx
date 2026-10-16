import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldContent, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { orientation: "horizontal", className: "w-auto max-w-xs", children: [_jsx(Checkbox, { id: "terms-2", defaultChecked: true }), _jsxs(FieldContent, { children: [_jsx(FieldLabel, { htmlFor: "terms-2", children: "Accept terms and conditions" }), _jsx(FieldDescription, { children: "This checkbox is used to accept the terms and conditions." })] })] }));
}
