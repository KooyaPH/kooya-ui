import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Kbd } from "../../../../../registry/bases/radix/ui/kbd.jsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(InputGroup, { className: "max-w-xs", children: [_jsx(InputGroupInput, { placeholder: "Search\u2026" }), _jsx(InputGroupAddon, { children: _jsx(Kbd, { children: "Space" }) })] }) }));
}
