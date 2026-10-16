import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full max-w-sm [--frame-radius:var(--radius-md)]", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Media Library" }), _jsx(FrameDescription, { children: "Manage your assets and downloads" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Storage Capacity" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Medium radius is a versatile middle ground between sharp and rounded aesthetics." })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "75% of 100GB used" }) })] }));
}
