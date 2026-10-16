import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(Label, { htmlFor: "label-demo-username", children: "Username" }), _jsx(Input, { id: "label-demo-username", placeholder: "Enter your username\u2026" })] }));
}
