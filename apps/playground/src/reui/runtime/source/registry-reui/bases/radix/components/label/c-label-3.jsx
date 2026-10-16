import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(Label, { htmlFor: "label-demo-message", children: "Message" }), _jsx(Textarea, { id: "label-demo-message", placeholder: "Type your message here\u2026" })] }));
}
