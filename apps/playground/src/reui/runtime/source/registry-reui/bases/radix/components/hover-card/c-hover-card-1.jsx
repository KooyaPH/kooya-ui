import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex min-h-[100px] items-center justify-center", children: _jsxs(HoverCard, { openDelay: 100, closeDelay: 100, children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Hover Me" }) }), _jsx(HoverCardContent, { children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h4", { className: "leading-none font-medium", children: "Hover Card" }), _jsx("p", { className: "text-muted-foreground", children: "A basic hover card that appears when you hover over the trigger." })] }) })] }) }));
}
