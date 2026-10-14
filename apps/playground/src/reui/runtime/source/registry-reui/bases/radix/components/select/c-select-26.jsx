import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const statuses = [
    { value: "all", label: "All Status", color: "" },
    { value: "active", label: "Active", color: "bg-green-500" },
    { value: "inactive", label: "Inactive", color: "bg-red-500" },
    { value: "pending", label: "Pending", color: "bg-yellow-500" },
    { value: "archived", label: "Archived", color: "bg-gray-400" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: statuses[0].value, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: statuses.map((status) => (_jsx(SelectItem, { value: status.value, children: _jsxs("span", { className: "flex items-center gap-2", children: [status.color && (_jsx("span", { className: `size-2 shrink-0 rounded-full ${status.color}` })), _jsx("span", { children: status.label })] }) }, status.value))) }) })] }) }));
}
