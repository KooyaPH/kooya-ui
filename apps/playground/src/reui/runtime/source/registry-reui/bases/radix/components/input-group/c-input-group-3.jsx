import { jsx as _jsx } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", "data-invalid": "true", children: _jsx(InputGroup, { children: _jsx(InputGroupInput, { placeholder: "Invalid field", "aria-invalid": "true" }) }) }));
}
