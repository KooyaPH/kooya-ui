import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { orientation: "horizontal", "data-disabled": true, className: "w-auto", children: [_jsx(Checkbox, { id: "disabled-2", disabled: true, defaultChecked: true }), _jsx(FieldLabel, { htmlFor: "disabled-2", children: "Disabled checkbox" })] }));
}
