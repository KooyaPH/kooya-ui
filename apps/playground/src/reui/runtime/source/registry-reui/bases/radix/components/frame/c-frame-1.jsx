import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Section header" }), _jsx(FrameDescription, { children: "Description for the section" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Section title" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Section description" })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "Section footer" }) })] }));
}
