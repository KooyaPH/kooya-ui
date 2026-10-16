import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx(FieldGroup, { className: "max-w-xs", children: _jsx(FieldLabel, { children: _jsxs(Field, { orientation: "horizontal", children: [_jsx(Checkbox, { defaultChecked: true }), _jsxs(FieldContent, { children: [_jsx(FieldTitle, { children: "Enable notifications" }), _jsx(FieldDescription, { children: "You can enable or disable notifications at any time." })] })] }) }) }));
}
