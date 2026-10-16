import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full max-w-sm [--frame-radius:var(--radius-2xl)]", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Creative Portfolio" }), _jsx(FrameDescription, { children: "Showcasing visual art and design" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Gallery View" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "2XL radius provides a very soft, organic look suitable for creative portfolios and landing pages." })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "Browse 12 projects" }) })] }));
}
