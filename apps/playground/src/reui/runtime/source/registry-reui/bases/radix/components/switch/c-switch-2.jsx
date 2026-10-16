import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(FieldLabel, { htmlFor: "switch-with-desc", className: "w-full max-w-xs", children: _jsxs(Field, { orientation: "horizontal", children: [_jsxs(FieldContent, { children: [_jsx(FieldTitle, { children: "Share across devices" }), _jsx(FieldDescription, { children: "Focus is shared across devices, and turns off when you leave the app." })] }), _jsx(Switch, { id: "switch-with-desc" })] }) }) }));
}
