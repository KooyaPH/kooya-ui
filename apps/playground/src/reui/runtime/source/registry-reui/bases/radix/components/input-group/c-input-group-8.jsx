import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { placeholder: "username" }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(InputGroupText, { children: "@gmail.com" }) })] }) }));
}
