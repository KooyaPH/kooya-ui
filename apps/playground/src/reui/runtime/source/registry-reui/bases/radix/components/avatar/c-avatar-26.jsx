import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Button, { variant: "outline", size: "sm", className: "rounded-full gap-1 pl-0.5", children: [_jsxs(Avatar, { className: "border-background size-6 border-2", children: [_jsx(AvatarImage, { src: "/reui-assets/images/0a10b9bc070f3bdf606f.jpg", alt: "@shadcn" }), _jsx(AvatarFallback, { children: "CH" })] }), _jsx("span", { className: "text-xs", children: "@shadcn" })] }));
}
