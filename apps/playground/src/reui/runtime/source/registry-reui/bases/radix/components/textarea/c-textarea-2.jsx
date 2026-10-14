import { jsx as _jsx } from "react/jsx-runtime";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsx(Textarea, { placeholder: "Type your message here\u2026", "aria-invalid": "true", className: "w-full" }) }));
}
