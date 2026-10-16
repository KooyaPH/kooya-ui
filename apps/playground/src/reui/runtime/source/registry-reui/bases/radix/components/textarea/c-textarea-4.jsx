import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsxs(Field, { className: "w-full", children: [_jsx(FieldLabel, { htmlFor: "textarea-with-desc", children: "Feedback" }), _jsx(Textarea, { id: "textarea-with-desc", placeholder: "Type your message here\u2026", rows: 6 }), _jsx(FieldDescription, { children: "Type your message and press enter to send." })] }) }));
}
