import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ColorPicker, ColorPickerContent, ColorPickerInput, } from "../../reui/color-picker.jsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "canvas-background", children: "Canvas background" }), _jsxs(ColorPicker, { id: "canvas-background", defaultValue: "#f8fafc", children: [_jsx(ColorPickerInput, { "aria-describedby": "canvas-background-description" }), _jsx(ColorPickerContent, {})] }), _jsx(FieldDescription, { id: "canvas-background-description", children: "Type a hex code, rgb(), hsl(), oklch() or a name like tomato." })] }) }));
}
