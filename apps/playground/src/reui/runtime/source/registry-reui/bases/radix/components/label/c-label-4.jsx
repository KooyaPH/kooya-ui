import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { "data-disabled": true, className: "w-full max-w-xs", children: [_jsx(Label, { htmlFor: "label-demo-disabled", children: "Disabled Field" }), _jsx(Input, { id: "label-demo-disabled", placeholder: "Disabled input\u2026", disabled: true })] }));
}
