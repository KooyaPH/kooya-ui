import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const accessLevels = [
    {
        value: "full_access",
        label: "Full access",
        description: "Can modify list access",
    },
    {
        value: "read_write",
        label: "Read and write",
        description: "Can edit & publish lists",
    },
    {
        value: "read_only",
        label: "Read only",
        description: "Can only view lists",
    },
    {
        value: "no_access",
        label: "No access",
        description: "Cannot view or edit lists",
    },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: accessLevels[1].value, children: [_jsx(SelectTrigger, { className: "w-[240px] [&_small]:hidden", children: _jsx(SelectValue, { placeholder: "Select access level" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: accessLevels.map((level) => (_jsx(SelectItem, { value: level.value, className: "[&_svg]:text-primary", children: _jsxs("span", { className: "flex flex-col items-start gap-px", children: [_jsx("span", { className: "font-medium", children: level.label }), _jsx("small", { className: "text-muted-foreground text-xs", children: level.description })] }) }, level.value))) }) })] }) }));
}
