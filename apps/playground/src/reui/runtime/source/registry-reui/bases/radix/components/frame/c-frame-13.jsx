import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full max-w-sm [--frame-radius:var(--radius-sm)]", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Network Diagnostics" }), _jsx(FrameDescription, { children: "Analyzing real-time socket connections" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Port Status" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Small radius gives a sharp, precise look, perfect for technical dashboards and data grids." })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "Scan completed" }) })] }));
}
