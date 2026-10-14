import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs(Badge, { children: [_jsx(Spinner, { "data-icon": "inline-start" }), "Updating"] }), _jsxs(Badge, { variant: "secondary", children: [_jsx(Spinner, { "data-icon": "inline-start" }), "Syncing"] }), _jsxs(Badge, { variant: "outline", children: [_jsx(Spinner, { "data-icon": "inline-start" }), "Loading"] }), _jsxs(Badge, { variant: "destructive-light", children: [_jsx(Spinner, { "data-icon": "inline-start" }), "Updating"] }), _jsxs(Badge, { variant: "success-light", children: [_jsx(Spinner, { "data-icon": "inline-start" }), "Syncing"] }), _jsxs(Badge, { variant: "info-light", children: [_jsx(Spinner, { "data-icon": "inline-start" }), "Loading"] })] }));
}
