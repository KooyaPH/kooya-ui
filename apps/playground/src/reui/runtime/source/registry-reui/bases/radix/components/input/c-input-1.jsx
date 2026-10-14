import { jsx as _jsx } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsx(Input, { id: "basic-input", type: "text", placeholder: "Basic Input" }) }));
}
