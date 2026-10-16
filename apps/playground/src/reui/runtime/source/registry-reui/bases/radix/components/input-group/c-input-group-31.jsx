import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { className: "pr-0 pl-3", children: _jsx(InputGroupText, { className: "text-muted-foreground", children: "\u20AC" }) }), _jsx(InputGroupInput, { placeholder: "0.00", className: "border-border border-r" }), _jsx(InputGroupAddon, { align: "inline-end", className: "pl-2", children: _jsx(InputGroupText, { children: "EUR" }) })] }) }));
}
