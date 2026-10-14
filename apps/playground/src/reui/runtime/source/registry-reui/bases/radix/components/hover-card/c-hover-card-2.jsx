import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../../../../../../../adapters/overlays.tsx";
const sides = ["top", "right", "bottom", "left"];
export default function Pattern() {
    return (_jsx("div", { className: "grid grid-cols-2 gap-2", children: sides.map((side) => (_jsxs(HoverCard, { openDelay: 100, closeDelay: 100, children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "flex-1 capitalize", children: side.replace("-", " ") }) }), _jsx(HoverCardContent, { side: side, children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h4", { className: "font-medium", children: "Hover Card" }), _jsxs("p", { className: "text-muted-foreground", children: ["This hover card appears on the ", side.replace("-", " "), " side of the trigger."] })] }) })] }, side))) }));
}
