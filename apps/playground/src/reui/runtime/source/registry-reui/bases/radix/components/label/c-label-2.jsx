import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { orientation: "horizontal", className: "mx-auto w-auto", children: [_jsx(Checkbox, { id: "label-demo-terms" }), _jsx(Label, { htmlFor: "label-demo-terms", children: "Accept terms and conditions" })] }));
}
