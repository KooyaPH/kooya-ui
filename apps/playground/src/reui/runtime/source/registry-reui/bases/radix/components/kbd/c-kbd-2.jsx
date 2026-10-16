import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Kbd, KbdGroup } from "../../../../../registry/bases/radix/ui/kbd.jsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(KbdGroup, { children: [_jsx(Kbd, { children: "Ctrl" }), _jsx(Kbd, { children: "Shift" }), _jsx(Kbd, { children: "P" })] }) }));
}
