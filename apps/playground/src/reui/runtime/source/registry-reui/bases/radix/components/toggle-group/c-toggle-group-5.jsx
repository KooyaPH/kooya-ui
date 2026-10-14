import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "single", defaultValue: "active", variant: "outline", size: "sm", children: [_jsx(ToggleGroupItem, { value: "all", children: "All" }), _jsx(ToggleGroupItem, { value: "active", children: "Active" }), _jsx(ToggleGroupItem, { value: "completed", children: "Completed" }), _jsx(ToggleGroupItem, { value: "archived", children: "Archived" })] }) }));
}
