import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center gap-4", children: [_jsxs(ToggleGroup, { type: "single", size: "sm", defaultValue: "top", variant: "outline", children: [_jsx(ToggleGroupItem, { value: "top", children: "Top" }), _jsx(ToggleGroupItem, { value: "bottom", children: "Bottom" })] }), _jsxs(ToggleGroup, { type: "single", defaultValue: "top", variant: "outline", children: [_jsx(ToggleGroupItem, { value: "top", children: "Top" }), _jsx(ToggleGroupItem, { value: "bottom", children: "Bottom" })] })] }));
}
