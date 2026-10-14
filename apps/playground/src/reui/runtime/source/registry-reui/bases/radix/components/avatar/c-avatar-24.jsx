import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
const avatars = [
    {
        src: "/reui-assets/images/973d47055c51440af7dc.jpg",
        fallback: "DK",
        name: "David Kim",
    },
    {
        src: "/reui-assets/images/96b8bd25ab6ed38fc54f.png",
        fallback: "ML",
        name: "Max Leiter",
    },
    {
        src: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
        fallback: "ER",
        name: "James Brown",
    },
    {
        src: "/reui-assets/images/fc5e87c5ff3500323dd1.png",
        fallback: "JW",
        name: "Jenny Wilson",
    },
];
export default function Pattern() {
    return (_jsx(TooltipProvider, { children: _jsx("div", { className: "group/avatars flex items-center px-2 py-4", children: avatars.map((avatar, index) => (_jsx("div", { style: {
                    "--index": index,
                    zIndex: avatars.length - index,
                }, className: "group/avatar-item translate-x-[calc(var(--index)*-8px)] transition-all duration-300 ease-in-out will-change-transform group-hover/avatars:translate-x-[calc(var(--index)*6px)]", children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Avatar, { className: cn("ring-background origin-center ring-2 transition-transform duration-300 ease-in-out", "group-hover/avatar-item:scale-110"), children: [_jsx(AvatarImage, { src: avatar.src, alt: avatar.name }), _jsx(AvatarFallback, { className: "text-xs", children: avatar.fallback })] }) }), _jsx(TooltipContent, { sideOffset: 10, children: avatar.name })] }) }, index))) }) }));
}
