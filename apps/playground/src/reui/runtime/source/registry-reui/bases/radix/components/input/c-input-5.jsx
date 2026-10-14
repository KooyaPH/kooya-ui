import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldError, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "input-demo-error", children: "Email" }), _jsx(Input, { id: "input-demo-error", type: "email", placeholder: "name@example.com", "aria-invalid": "true" }), _jsx(FieldError, { children: "Please enter a valid email address." })] }));
}
