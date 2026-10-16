import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "input-demo-username", children: "Username" }), _jsx(Input, { id: "input-demo-username", type: "text", placeholder: "Enter your username" }), _jsx(FieldDescription, { children: "Choose a unique username for your account." })] }));
}
