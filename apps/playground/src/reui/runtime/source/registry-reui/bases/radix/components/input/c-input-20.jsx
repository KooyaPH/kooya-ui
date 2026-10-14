import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { orientation: "horizontal", className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "horizontal-name", className: "w-24", children: "Name" }), _jsx(Input, { id: "horizontal-name", placeholder: "John Doe" })] }));
}
