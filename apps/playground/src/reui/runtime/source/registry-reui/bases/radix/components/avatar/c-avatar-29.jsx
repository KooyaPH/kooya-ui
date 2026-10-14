import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(TooltipProvider, { children: _jsxs("div", { className: "flex gap-2", children: [_jsxs(AvatarGroup, { children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/f51fb1d8b3e4cbbd471d.png", alt: "@leerob" }), _jsx(AvatarFallback, { children: "CN" })] }), _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/96b8bd25ab6ed38fc54f.png", alt: "@maxleiter" }), _jsx(AvatarFallback, { children: "LR" })] }), _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg", alt: "emma@example.com" }), _jsx(AvatarFallback, { children: "EW" })] }), _jsx(AvatarGroupCount, { children: "+5" })] }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx(Button, { variant: "outline", size: "icon", className: "rounded-full", children: _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "aria-hidden": "true" }) }) }), _jsx(TooltipContent, { children: "Add user" })] })] }) }));
}
