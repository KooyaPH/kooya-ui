import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Toggle, { variant: "outline", "aria-label": "Pin to sidebar", children: _jsx(IconPlaceholder, { lucide: "PinIcon", tabler: "IconPin", hugeicons: "Pin02Icon", phosphor: "PushPinIcon", remixicon: "RiPushpinLine" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { className: "text-sm", children: "Pin to sidebar" }) })] }) }) }));
}
