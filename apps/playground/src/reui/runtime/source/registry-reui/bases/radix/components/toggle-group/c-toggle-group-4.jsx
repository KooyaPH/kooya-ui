import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "single", variant: "outline", spacing: 2, defaultValue: "week", children: [_jsx(ToggleGroupItem, { value: "day", children: "Day" }), _jsx(ToggleGroupItem, { value: "week", children: "Week" }), _jsx(ToggleGroupItem, { value: "month", children: "Month" })] }) }));
}
