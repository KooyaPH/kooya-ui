import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(TooltipProvider, { children: _jsxs("p", { className: "text-sm", children: ["Verified domain", " ", _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { className: "text-muted-foreground align-middle", children: _jsx(IconPlaceholder, { lucide: "BadgeCheckIcon", tabler: "IconRosetteDiscountCheck", hugeicons: "CheckmarkBadge01Icon", phosphor: "SealCheckIcon", remixicon: "RiVerifiedBadgeLine", className: "size-4 text-emerald-600", "aria-hidden": "true" }) }), _jsx(TooltipContent, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "success", size: "sm", children: "Verified" }), _jsx("p", { children: "Domain ownership has been confirmed." })] }) })] })] }) }) }));
}
