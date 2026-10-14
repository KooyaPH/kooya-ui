import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "single", defaultValue: "24h", variant: "outline", size: "sm", children: [_jsx(ToggleGroupItem, { value: "1h", children: "1H" }), _jsx(ToggleGroupItem, { value: "6h", children: "6H" }), _jsx(ToggleGroupItem, { value: "24h", children: "24H" }), _jsx(ToggleGroupItem, { value: "7d", children: "7D" }), _jsx(ToggleGroupItem, { value: "30d", children: "30D" }), _jsx(ToggleGroupItem, { value: "all", children: "All" })] }) }));
}
