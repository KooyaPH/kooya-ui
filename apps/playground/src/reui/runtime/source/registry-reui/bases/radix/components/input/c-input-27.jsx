import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "bottom-border", children: "Bottom Border Only" }), _jsx(Input, { id: "bottom-border", className: "focus-visible:border-primary rounded-none border-x-0 border-t-0 border-b-2 px-0 shadow-none focus-visible:ring-0", placeholder: "Type here..." })] }));
}
