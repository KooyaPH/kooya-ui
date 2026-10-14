import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const showUserToast = () => {
        toast.custom(() => (_jsxs("div", { className: "bg-popover text-popover-foreground border-border rounded-md flex w-[356px] items-start gap-3 border p-4 shadow-lg", children: [_jsxs(Avatar, { className: "size-9 shrink-0", children: [_jsx(AvatarImage, { src: "/reui-assets/images/e93553df2422635515ee.jpg", alt: "Alex Johnson" }), _jsx(AvatarFallback, { children: "AJ" })] }), _jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-sm font-semibold", children: "Alex Johnson" }), _jsx("span", { className: "text-muted-foreground text-xs", children: "2m ago" })] }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Hey! I've finished the design review. Let me know when you're free to discuss." }), _jsxs("div", { className: "mt-2 flex gap-2", children: [_jsx(Button, { size: "xs", variant: "outline", onClick: () => toast.dismiss(), children: "Dismiss" }), _jsx(Button, { size: "xs", onClick: () => toast.dismiss(), children: "Reply" })] })] })] })));
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: showUserToast, variant: "outline", className: "w-fit", children: "User Message Toast" }) }));
}
