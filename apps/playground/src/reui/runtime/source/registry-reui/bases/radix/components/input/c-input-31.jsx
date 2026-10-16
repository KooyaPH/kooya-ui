import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "minimal-input", children: "Invisible Input" }), _jsx(Input, { id: "minimal-input", placeholder: "Type here...", className: "border-none bg-transparent p-0 shadow-none focus-visible:ring-0" })] }));
}
