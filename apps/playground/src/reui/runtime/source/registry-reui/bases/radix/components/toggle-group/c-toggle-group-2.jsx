import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "single", variant: "outline", defaultValue: "all", children: [_jsx(ToggleGroupItem, { value: "all", "aria-label": "Toggle all", children: "All" }), _jsx(ToggleGroupItem, { value: "missed", "aria-label": "Toggle missed", children: "Missed" })] }) }));
}
