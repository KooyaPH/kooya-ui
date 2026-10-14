import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const showToast = () => {
        toast.custom(() => (_jsxs("div", { className: "bg-invert text-invert-foreground rounded-md flex w-[356px] items-start gap-3 border border-transparent p-4 shadow-lg", children: [_jsxs(Avatar, { className: "border-border/10 size-9 shrink-0 border", children: [_jsx(AvatarImage, { src: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg", alt: "Sarah Chen" }), _jsx(AvatarFallback, { children: "SC" })] }), _jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-sm font-semibold", children: "Sarah Chen" }), _jsx("span", { className: "text-invert-foreground/40 text-xs", children: "Just now" })] }), _jsx("p", { className: "text-invert-foreground/70 text-sm", children: "Invited you to collaborate on \"Design System v2\"" }), _jsxs("div", { className: "mt-2 flex gap-2", children: [_jsx(Button, { size: "xs", variant: "outline", className: "bg-background/10 border-border/10 text-invert-foreground", onClick: () => toast.dismiss(), children: "Decline" }), _jsx(Button, { size: "xs", className: "border-blue-800 bg-blue-500 text-white hover:border-blue-900 hover:bg-blue-600", onClick: () => toast.dismiss(), children: "Accept" })] })] })] })));
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: showToast, variant: "outline", className: "w-fit", children: "Invert Invite Toast" }) }));
}
