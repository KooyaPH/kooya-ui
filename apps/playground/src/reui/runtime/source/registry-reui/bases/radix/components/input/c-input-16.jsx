import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FieldLabel, { htmlFor: "username", children: "Username" }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { className: "inline-flex items-center", children: _jsx(IconPlaceholder, { lucide: "HelpCircleIcon", tabler: "IconHelpCircle", hugeicons: "HelpCircleIcon", phosphor: "QuestionIcon", remixicon: "RiQuestionLine", className: "text-muted-foreground size-3.5" }) }), _jsx(TooltipContent, { children: "Your unique identifier on the platform." })] }) })] }), _jsx(Input, { id: "username", placeholder: "johndoe" }), _jsx(FieldDescription, { children: "Your unique identifier on the platform." })] }));
}
