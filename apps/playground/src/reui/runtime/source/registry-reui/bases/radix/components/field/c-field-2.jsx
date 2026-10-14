import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldDescription, FieldGroup, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsxs(FieldGroup, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "ticket-subject", children: "Subject" }), _jsx(Input, { id: "ticket-subject", placeholder: "Briefly describe the issue" }), _jsx(FieldDescription, { children: "Use a clear and descriptive subject line." })] }), _jsxs(Field, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(FieldLabel, { htmlFor: "ticket-message", children: "Message" }), _jsx("span", { className: "text-muted-foreground text-xs", children: "0/500" })] }), _jsx(Textarea, { id: "ticket-message", placeholder: "Tell us more about your problem\u2026", className: "min-h-[120px]" }), _jsx(FieldDescription, { children: "Include any relevant details to help us resolve your issue." })] })] }) }));
}
