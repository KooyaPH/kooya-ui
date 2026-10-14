import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Field, { orientation: "horizontal", children: [_jsx(Switch, { id: "sw-tooltip" }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(FieldLabel, { htmlFor: "sw-tooltip", children: "Two-factor authentication" }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { className: "text-muted-foreground", children: _jsx(IconPlaceholder, { lucide: "HelpCircleIcon", tabler: "IconHelpCircle", hugeicons: "HelpCircleIcon", phosphor: "QuestionIcon", remixicon: "RiQuestionLine", "aria-hidden": "true", className: "size-3.5" }) }), _jsx(TooltipContent, { side: "right", children: "Adds an extra layer of security by requiring a verification code on login." })] }) })] })] }) }));
}
