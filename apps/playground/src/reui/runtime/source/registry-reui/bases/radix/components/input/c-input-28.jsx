import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "color-picker", children: "Theme Color" }), _jsx(Input, { id: "color-picker", type: "color", className: "h-10 w-20 cursor-pointer p-1", defaultValue: "#3b82f6" })] }));
}
