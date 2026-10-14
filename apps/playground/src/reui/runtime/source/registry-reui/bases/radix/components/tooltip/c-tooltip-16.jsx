import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Notifications", children: _jsxs("div", { className: "relative", children: [_jsx(IconPlaceholder, { lucide: "BellIcon", tabler: "IconBell", hugeicons: "NotificationIcon", phosphor: "BellIcon", remixicon: "RiNotificationLine" }), _jsx("span", { className: "bg-destructive absolute -top-1 -right-1 block size-2 rounded-full" })] }) }) }), _jsx(TooltipContent, { children: _jsxs("div", { className: "flex flex-col gap-1.5", children: [_jsx("p", { className: "text-sm font-medium", children: "3 new notifications" }), _jsx("a", { href: "#", className: "text-xs font-medium underline underline-offset-2", children: "View all \u2192" })] }) })] }) }) }));
}
