import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs(Label, { htmlFor: "label-required", children: ["Email address", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "label-required", type: "email", placeholder: "you@example.com", required: true })] }));
}
