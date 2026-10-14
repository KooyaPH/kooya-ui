import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full max-w-sm", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "User Profile" }), _jsx(FrameDescription, { children: "Manage your personal account details" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Account Security" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Default spacing is the standard for primary application content and main dialogs." })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "Last login: Today at 4:30 PM" }) })] }));
}
