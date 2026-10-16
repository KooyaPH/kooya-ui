import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "pill-input", children: "Search" }), _jsx(Input, { id: "pill-input", className: "rounded-full px-4", placeholder: "Search everything..." })] }));
}
