import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsxs(Field, { className: "w-full", children: [_jsx(FieldLabel, { htmlFor: "textarea-disabled", children: "Message (Disabled)" }), _jsx(Textarea, { id: "textarea-disabled", placeholder: "Type your message here\u2026", disabled: true })] }) }));
}
