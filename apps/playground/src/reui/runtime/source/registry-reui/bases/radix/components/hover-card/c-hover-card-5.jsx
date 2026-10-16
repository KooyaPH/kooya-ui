import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex min-h-[100px] items-center justify-center", children: _jsxs(HoverCard, { openDelay: 100, closeDelay: 100, children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "View Image" }) }), _jsxs(HoverCardContent, { className: "w-[320px] overflow-hidden p-0", children: [_jsx("img", { src: "/reui-assets/images/b7c3c9f06c829166588e.jpg", alt: "Card Image", className: "aspect-video w-full object-cover" }), _jsxs("div", { className: "space-y-1 p-3", children: [_jsx("p", { className: "font-medium", children: "Image Overview" }), _jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Visual overview of generated landing page." })] })] })] }) }));
}
