import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "input-demo-date", children: "Date" }), _jsx(Input, { id: "input-demo-date", type: "date" })] }));
}
