import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Warning", children: _jsx(IconPlaceholder, { lucide: "AlertTriangleIcon", tabler: "IconAlertTriangle", hugeicons: "Alert01Icon", phosphor: "WarningIcon", remixicon: "RiAlertLine" }) }) }), _jsx(TooltipContent, { children: _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(IconPlaceholder, { lucide: "AlertTriangleIcon", tabler: "IconAlertTriangle", hugeicons: "Alert02Icon", phosphor: "WarningIcon", remixicon: "RiAlertLine", className: "size-4 shrink-0" }), "This action cannot be undone"] }) })] }) }) }));
}
