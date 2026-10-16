import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center p-3", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg", alt: "Emma Wilson" }), _jsx(AvatarFallback, { children: "SC" })] }) }), _jsxs(TooltipContent, { className: "flex items-center gap-2 p-2", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg", alt: "Emma Wilson" }), _jsx(AvatarFallback, { children: "SC" })] }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "font-semibold", children: "Emma Wilson" }), _jsx(Badge, { variant: "info", size: "xs", children: "Admin" })] }), _jsx("p", { className: "opacity-80", children: "emma@example.com" })] })] })] }) }) }));
}
