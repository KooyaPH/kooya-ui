import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const filterItems = [
    { label: "Filter", value: null },
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
];
export default function Pattern() {
    return (_jsxs("div", { className: "flex w-full max-w-xs items-center gap-2", children: [_jsx(Input, { placeholder: "Search...", className: "flex-1" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[140px]", children: _jsx(SelectValue, { placeholder: "Filter" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: filterItems.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value))) }) })] })] }));
}
