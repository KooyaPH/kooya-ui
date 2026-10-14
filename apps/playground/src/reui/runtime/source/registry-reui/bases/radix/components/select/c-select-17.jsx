import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "cn";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const statuses = [
    { value: "1", label: "In Progress", color: "bg-violet-500" },
    { value: "2", label: "Completed", color: "bg-green-500" },
    { value: "3", label: "Pending", color: "bg-primary" },
    { value: "4", label: "Cancelled", color: "bg-yellow-500" },
    { value: "5", label: "Rejected", color: "bg-destructive" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: statuses[1].value, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: statuses.map((status) => (_jsx(SelectItem, { value: status.value, children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { className: cn("size-1.5 rounded-full", status.color) }), _jsx("span", { children: status.label })] }) }, status.value))) }) })] }) }));
}
