import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full max-w-sm [--frame-radius:var(--radius-lg)]", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Team Collaboration" }), _jsx(FrameDescription, { children: "Invite and manage workspace members" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Active Members" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Large radius offers a modern, friendly appearance for social and collaborative interfaces." })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "3 members online" }) })] }));
}
