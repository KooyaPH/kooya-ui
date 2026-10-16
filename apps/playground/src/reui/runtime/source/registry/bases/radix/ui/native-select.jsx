import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
function NativeSelect({ className, size = "default", ...props }) {
    return (_jsxs("div", { className: cn("cn-native-select-wrapper group/native-select relative w-fit has-[select:disabled]:opacity-50", className), "data-slot": "native-select-wrapper", "data-size": size, children: [_jsx("select", { "data-slot": "native-select", "data-size": size, className: "cn-native-select outline-none disabled:pointer-events-none disabled:cursor-not-allowed", ...props }), _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconSelector", hugeicons: "UnfoldMoreIcon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "cn-native-select-icon pointer-events-none absolute select-none", "aria-hidden": "true", "data-slot": "native-select-icon" })] }));
}
function NativeSelectOption({ className, ...props }) {
    return (_jsx("option", { "data-slot": "native-select-option", className: cn("bg-[Canvas] text-[CanvasText]", className), ...props }));
}
function NativeSelectOptGroup({ className, ...props }) {
    return (_jsx("optgroup", { "data-slot": "native-select-optgroup", className: cn("bg-[Canvas] text-[CanvasText]", className), ...props }));
}
export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
Object.assign(NativeSelect, { recipeRole: "NativeSelect" });
