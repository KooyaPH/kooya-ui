import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", "aria-label": "More information", children: _jsx(IconPlaceholder, { lucide: "InfoIcon", tabler: "IconInfoCircle", hugeicons: "InformationCircleIcon", phosphor: "InfoIcon", remixicon: "RiInformationLine" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { className: "text-center text-sm", children: "Additional information and help context." }) })] }) }) }));
}
