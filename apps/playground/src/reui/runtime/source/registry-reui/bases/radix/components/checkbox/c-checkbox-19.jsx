import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-auto", children: [_jsxs(Field, { orientation: "horizontal", children: [_jsx(Checkbox, { id: "checkbox-badge-1" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(FieldLabel, { htmlFor: "checkbox-badge-1", children: "AI-powered suggestions" }), _jsx(Badge, { className: "rounded-full uppercase", size: "sm", children: "New" })] })] }), _jsxs(Field, { orientation: "horizontal", defaultChecked: true, children: [_jsx(Checkbox, { id: "checkbox-badge-2" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(FieldLabel, { htmlFor: "checkbox-badge-2", children: "Beta feature access" }), _jsx(Badge, { variant: "secondary", className: "rounded-full uppercase", size: "sm", children: "Beta" })] })] })] }));
}
