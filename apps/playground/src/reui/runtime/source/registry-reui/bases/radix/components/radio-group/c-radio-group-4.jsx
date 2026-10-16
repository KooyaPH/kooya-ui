import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(RadioGroup, { defaultValue: "email", className: "w-fit", children: [_jsxs(Field, { orientation: "horizontal", "data-invalid": true, children: [_jsx(RadioGroupItem, { value: "email", id: "invalid-r1", "aria-invalid": true }), _jsx(FieldLabel, { htmlFor: "invalid-r1", children: "Email only" })] }), _jsxs(Field, { orientation: "horizontal", "data-invalid": true, children: [_jsx(RadioGroupItem, { value: "sms", id: "invalid-r2", "aria-invalid": true }), _jsx(FieldLabel, { htmlFor: "invalid-r2", children: "SMS only" })] })] }));
}
