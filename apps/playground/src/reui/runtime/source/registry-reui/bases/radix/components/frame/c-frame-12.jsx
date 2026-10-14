import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { spacing: "lg", className: "w-full max-w-sm", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "System Analytics" }), _jsx(FrameDescription, { children: "Global traffic and usage patterns" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Performance Metrics" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Large spacing creates a focused, airy feel suitable for marketing pages or empty states." })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "View full report" }) })] }));
}
