import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/layout.tsx";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Checkbox, { id: "badge-1", defaultChecked: true }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FieldLabel, { htmlFor: "badge-1", children: "AI-powered suggestions" }), _jsx(Badge, { className: "h-4.5 rounded-full px-1.5 text-[10px] tracking-wider uppercase", children: "New" })] })] }), _jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Checkbox, { id: "badge-2" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FieldLabel, { htmlFor: "badge-2", children: "Beta feature access" }), _jsx(Badge, { variant: "secondary", className: "h-4.5 rounded-full px-1.5 text-[10px] tracking-wider uppercase", children: "Beta" })] })] })] }));
}
