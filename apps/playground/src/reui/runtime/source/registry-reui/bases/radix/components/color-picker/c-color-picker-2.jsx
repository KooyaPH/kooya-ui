import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ColorPicker } from "../../reui/color-picker.jsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsxs(Field, { children: [_jsx(FieldLabel, { id: "accent-color-label", htmlFor: "accent-color", children: "Accent color" }), _jsx(ColorPicker, { id: "accent-color", defaultValue: "#0ea5e9", "aria-labelledby": "accent-color-label", "aria-describedby": "accent-color-description" }), _jsx(FieldDescription, { id: "accent-color-description", children: "Used for links, focus rings and primary buttons." })] }) }));
}
