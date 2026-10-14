import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const priorities = [
    { value: "none", label: "No Priority", variant: "outline" },
    { value: "urgent", label: "Urgent", variant: "destructive" },
    { value: "high", label: "High", variant: "warning" },
    { value: "medium", label: "Medium", variant: "warning-light" },
    { value: "low", label: "Low", variant: "info" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: priorities[0].value, children: [_jsx(SelectTrigger, { className: "w-[200px]", children: _jsx(SelectValue, { placeholder: "Select priority" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: priorities.map((priority) => (_jsx(SelectItem, { value: priority.value, children: _jsx("span", { className: "flex items-center gap-2", children: _jsx(Badge, { variant: priority.variant, size: "sm", children: priority.label }) }) }, priority.value))) }) })] }) }));
}
