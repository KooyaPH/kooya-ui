import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs(Field, { orientation: "horizontal", children: [_jsx(Switch, { id: "sw-badge-1", defaultChecked: true }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FieldLabel, { htmlFor: "sw-badge-1", children: "AI Copilot" }), _jsx(Badge, { className: "h-4.5 rounded-full px-1.5 text-[10px] tracking-wider uppercase", children: "New" })] })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Switch, { id: "sw-badge-2" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FieldLabel, { htmlFor: "sw-badge-2", children: "Smart suggestions" }), _jsx(Badge, { variant: "secondary", className: "h-4.5 rounded-full px-1.5 text-[10px] tracking-wider uppercase", children: "Beta" })] })] })] }));
}
