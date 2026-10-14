import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Checkbox, { id: "indeterminate", checked: "indeterminate" }), _jsx(FieldLabel, { htmlFor: "indeterminate", children: "Indeterminate state" })] }));
}
