import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Frame, { children: _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(Alert, { className: "grid-cols-[32px_1fr] gap-x-3 border-0 shadow-none", children: [_jsxs(Avatar, { className: "size-8 border", children: [_jsx(AvatarImage, { src: "/reui-assets/images/e93553df2422635515ee.jpg", alt: "Alex Johnson" }), _jsx(AvatarFallback, { children: "AJ" })] }), _jsxs(AlertTitle, { className: "flex items-center gap-2", children: [_jsx("span", { className: "truncate", children: "Alex Johnson" }), _jsx("span", { className: "text-muted-foreground truncate font-normal", children: "sent you a message" })] }), _jsxs(AlertAction, { children: [_jsx(Button, { size: "xs", variant: "outline", children: "View" }), _jsx(Button, { size: "xs", children: "Reply" })] }), _jsx(AlertDescription, { className: "line-clamp-1", children: "\"Hey! I've finished the draft for the new design system. Let me know what you think when you have a moment.\"" })] }) }) }) }));
}
