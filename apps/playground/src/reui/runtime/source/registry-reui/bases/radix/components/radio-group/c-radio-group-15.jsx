import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(RadioGroup, { defaultValue: "stable", className: "w-fit", children: [_jsxs(Field, { orientation: "horizontal", children: [_jsx(RadioGroupItem, { value: "stable", id: "ch-stable" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FieldLabel, { htmlFor: "ch-stable", children: "Stable" }), _jsx(Badge, { variant: "secondary", className: "h-4.5 rounded-full px-1.5 text-[10px] tracking-wider uppercase", children: "Recommended" })] })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(RadioGroupItem, { value: "beta", id: "ch-beta" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FieldLabel, { htmlFor: "ch-beta", children: "Beta" }), _jsx(Badge, { className: "h-4.5 rounded-full px-1.5 text-[10px] tracking-wider uppercase", children: "New" })] })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(RadioGroupItem, { value: "canary", id: "ch-canary" }), _jsx(FieldLabel, { htmlFor: "ch-canary", children: "Canary" })] })] }));
}
