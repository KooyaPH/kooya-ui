import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { orientation: "horizontal", className: "w-auto", "data-invalid": true, children: [_jsx(Checkbox, { id: "invalid", "aria-invalid": true }), _jsx(FieldLabel, { htmlFor: "invalid", children: "Invalid checkbox" })] }));
}
