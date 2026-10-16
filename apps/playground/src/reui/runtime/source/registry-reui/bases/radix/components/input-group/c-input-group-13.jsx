import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Kbd } from "../../../../../registry/bases/radix/ui/kbd.jsx";
export default function Pattern() {
    return (_jsx(Field, { className: "w-full max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { placeholder: "Search documentation..." }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(Kbd, { children: "\u2318K" }) })] }) }));
}
