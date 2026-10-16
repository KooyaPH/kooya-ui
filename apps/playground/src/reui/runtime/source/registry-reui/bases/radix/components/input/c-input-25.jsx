import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "custom-focus", children: "Custom Focus" }), _jsx(Input, { id: "custom-focus", className: "focus-visible:border-emerald-500 focus-visible:ring-emerald-500/50", placeholder: "Green focus ring" })] }));
}
