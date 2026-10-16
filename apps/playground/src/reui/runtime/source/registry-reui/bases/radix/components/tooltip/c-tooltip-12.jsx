import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("span", { className: "cursor-not-allowed", children: _jsx(Button, { variant: "outline", disabled: true, children: "Delete Project" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { className: "text-sm", children: "You need admin access to delete projects" }) })] }) }) }));
}
