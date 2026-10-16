import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Kbd } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Search", children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine" }) }) }), _jsxs(TooltipContent, { className: "flex items-center gap-3", children: ["Search", _jsx(Kbd, { className: "-mr-1", children: "\u2318K" })] })] }) }));
}
