import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "subtle-bg", children: "Subtle Background" }), _jsx(Input, { id: "subtle-bg", className: "bg-muted focus-visible:bg-muted hover:bg-muted transition-colors duration-300", placeholder: "Enter text..." })] }));
}
