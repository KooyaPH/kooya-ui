import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "single", defaultValue: "monthly", variant: "outline", size: "lg", children: [_jsx(ToggleGroupItem, { value: "monthly", children: "Monthly" }), _jsxs(ToggleGroupItem, { value: "yearly", className: "gap-2", children: ["Yearly", _jsx("span", { className: "bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium", children: "Save 20%" })] })] }) }));
}
