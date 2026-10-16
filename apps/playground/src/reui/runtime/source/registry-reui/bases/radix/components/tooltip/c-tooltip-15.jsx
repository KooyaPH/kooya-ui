import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { className: "text-muted-foreground hover:text-foreground cursor-pointer transition-colors", children: _jsxs("div", { className: "flex items-center gap-1.5 text-sm", children: [_jsx(IconPlaceholder, { lucide: "TagIcon", tabler: "IconTag", hugeicons: "Tag01Icon", phosphor: "TagIcon", remixicon: "RiPriceTag3Line", className: "size-3.5", "aria-hidden": "true" }), "3 labels"] }) }), _jsx(TooltipContent, { className: "p-3", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "font-medium", children: "Labels" }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Badge, { variant: "destructive", size: "xs", children: "Bug" }), _jsx(Badge, { variant: "info", size: "xs", children: "Frontend" }), _jsx(Badge, { variant: "warning", size: "xs", children: "High Priority" })] })] }) })] }) }) }));
}
