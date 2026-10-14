import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full max-w-sm", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Default Layout" }), _jsx(FrameDescription, { children: "Standard component curvature" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Standard Settings" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "The default radius matches the overall design system for consistent application feel." })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "System default applied" }) })] }));
}
