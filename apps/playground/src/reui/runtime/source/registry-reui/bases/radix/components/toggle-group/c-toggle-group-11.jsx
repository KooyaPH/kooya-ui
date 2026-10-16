import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "single", defaultValue: "m", size: "sm", variant: "outline", children: [_jsx(ToggleGroupItem, { value: "s", children: "S" }), _jsx(ToggleGroupItem, { value: "m", children: "M" }), _jsx(ToggleGroupItem, { value: "l", children: "L" }), _jsx(ToggleGroupItem, { value: "xl", children: "XL" })] }) }));
}
