import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldError } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", "data-invalid": "true", children: [_jsx(Label, { htmlFor: "label-error", children: "Email" }), _jsx(Input, { id: "label-error", type: "email", defaultValue: "invalid-email", "aria-invalid": "true" }), _jsx(FieldError, { children: "Please enter a valid email address" })] }));
}
