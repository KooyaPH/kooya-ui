import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "input-demo-time", children: "Time" }), _jsx(Input, { id: "input-demo-time", type: "time" })] }));
}
