import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const statuses = [
    { value: "1", label: "In Progress", variant: "warning-outline" },
    { value: "2", label: "Completed", variant: "success-outline" },
    { value: "3", label: "Pending", variant: "info-outline" },
    { value: "4", label: "Cancelled", variant: "primary-outline" },
    { value: "5", label: "Rejected", variant: "destructive-outline" },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: statuses[2].value, children: [_jsx(SelectTrigger, { className: "w-[200px]", children: _jsxs("span", { className: "flex items-center gap-2", children: ["Status:", _jsx(SelectValue, { placeholder: "Select status" })] }) }), _jsx(SelectContent, { position: "popper", children: statuses.map((status) => (_jsx(SelectItem, { value: status.value, children: _jsx(Badge, { variant: status.variant, children: status.label }) }, status.value))) })] }) }));
}
