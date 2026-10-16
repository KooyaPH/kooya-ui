import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { spacing: "sm", className: "w-full max-w-sm", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Database Overview" }), _jsx(FrameDescription, { children: "Monitoring system health and performance" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Live Connections" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Small spacing provides a balanced layout for sidebar widgets and secondary dashboards." })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "Status: Operational" }) })] }));
}
