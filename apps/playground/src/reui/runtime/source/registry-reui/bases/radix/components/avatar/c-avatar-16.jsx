import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/e93553df2422635515ee.jpg", alt: "Alex Johnson" }), _jsx(AvatarFallback, { children: "AJ" })] }), _jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "text-sm font-semibold", children: "Alex Johnson" }), _jsx(Badge, { variant: "default", size: "xs", children: "Pro" })] }), _jsx("span", { className: "text-muted-foreground text-xs", children: "Founder & CEO" })] })] }));
}
