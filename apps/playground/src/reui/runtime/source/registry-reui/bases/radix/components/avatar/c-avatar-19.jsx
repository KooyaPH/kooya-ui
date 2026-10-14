import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5", children: [_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: "/reui-assets/images/5e888e99883ac22f0870.jpg", alt: "@nick.bold" }), _jsx(AvatarFallback, { children: "CH" })] }), _jsx("span", { className: "text-xs", children: "@nick.bold" })] }));
}
