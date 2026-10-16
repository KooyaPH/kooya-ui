import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Checkbox, { id: "tooltip-checkbox" }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(FieldLabel, { htmlFor: "tooltip-checkbox", children: "Enable advanced analytics" }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { className: "text-muted-foreground", children: _jsx(IconPlaceholder, { lucide: "HelpCircleIcon", tabler: "IconHelpCircle", hugeicons: "HelpCircleIcon", phosphor: "QuestionIcon", remixicon: "RiQuestionLine", "aria-hidden": "true", className: "size-3.5" }) }), _jsx(TooltipContent, { side: "right", children: "Advanced analytics provides deeper insights into user behavior and system performance." })] }) })] })] }));
}
