import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
const reviewers = [
    {
        name: "Alex Johnson",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        initials: "AJ",
    },
    {
        name: "Sarah Chen",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        initials: "SC",
    },
    {
        name: "David Kim",
        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
        initials: "DK",
    },
];
export default function Pattern() {
    const showToast = () => {
        toast.custom(() => (_jsxs("div", { className: "bg-invert text-invert-foreground rounded-md flex w-[356px] flex-col gap-3 border border-transparent p-4 shadow-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-sm font-semibold", children: "Pull Request #284" }), _jsx("span", { className: "text-invert-foreground/40 text-xs", children: "2m ago" })] }), _jsxs("p", { className: "text-invert-foreground/70 text-sm", children: ["All reviewers approved. Ready to merge into", " ", _jsx("code", { className: "bg-background/10 rounded px-1 py-0.5 font-mono text-xs", children: "main" })] }), _jsx(Separator, { className: "bg-border/10" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex -space-x-2", children: reviewers.map((reviewer) => (_jsxs(Avatar, { className: "border-invert size-6 border-2", children: [_jsx(AvatarImage, { src: reviewer.avatar, alt: reviewer.name }), _jsx(AvatarFallback, { className: "text-[10px]", children: reviewer.initials })] }, reviewer.name))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "xs", variant: "outline", className: "bg-background/10 border-border/10 text-invert-foreground", onClick: () => toast.dismiss(), children: "View" }), _jsx(Button, { size: "xs", className: "border-green-800 bg-green-500 text-white hover:border-green-900 hover:bg-green-600", onClick: () => {
                                        toast.dismiss();
                                        toast.success("Merged successfully");
                                    }, children: "Merge" })] })] })] })));
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: showToast, variant: "outline", className: "w-fit", children: "PR Merge Toast" }) }));
}
