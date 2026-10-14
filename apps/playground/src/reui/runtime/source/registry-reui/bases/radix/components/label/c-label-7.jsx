import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs(Label, { htmlFor: "label-tooltip", className: "gap-1", children: ["API Key", _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { className: "inline-flex items-center", children: _jsx("span", { className: "text-muted-foreground inline-flex cursor-help", children: _jsx(IconPlaceholder, { lucide: "InfoIcon", tabler: "IconInfoCircle", hugeicons: "InformationCircleIcon", phosphor: "InfoIcon", remixicon: "RiInformationLine", className: "size-3.5" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Your API key can be found in the developer settings." }) })] }) })] }), _jsx(Input, { id: "label-tooltip", placeholder: "sk_live_...", className: "font-mono" })] }));
}
