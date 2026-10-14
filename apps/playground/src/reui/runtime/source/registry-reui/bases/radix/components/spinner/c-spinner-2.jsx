import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [_jsxs(Button, { children: [_jsx(Spinner, { "data-icon": "inline-start" }), " Processing\u2026"] }), _jsxs(Button, { variant: "outline", disabled: true, children: [_jsx(Spinner, { "data-icon": "inline-start" }), " Loading\u2026"] }), _jsx(Button, { variant: "outline", size: "icon", disabled: true, "aria-label": "Loading", children: _jsx(Spinner, {}) })] }));
}
