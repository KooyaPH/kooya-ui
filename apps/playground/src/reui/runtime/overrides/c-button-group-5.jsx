import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, } from "../../adapters/layout";
import { Button } from "../../adapters/controls";
import { ButtonGroup, ButtonGroupText } from "../../adapters/controls";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../adapters/menus";
import { IconPlaceholder } from "../../adapters/icons";
const team = [
    {
        name: "Shadcn",
        src: "/reui-assets/images/0a10b9bc070f3bdf606f.jpg",
        fallback: "CN",
    },
    {
        name: "Max",
        src: "/reui-assets/images/96b8bd25ab6ed38fc54f.png",
        fallback: "ML",
    },
    {
        name: "Evil Rabbit",
        src: "/reui-assets/images/eb59b55e1933bc432a9c.png",
        fallback: "ER",
    },
];
export default function Pattern() {
    return (_jsxs("div", { role: "group", "aria-label": "Team collaboration", style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: [_jsxs(ButtonGroup, { children: [_jsxs(Button, { variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserMultiple02Icon", phosphor: "UsersIcon", remixicon: "RiGroupLine", "aria-hidden": "true" }), _jsx("span", { children: "Team" })] }), _jsxs(ButtonGroupText, { className: "flex items-center gap-0 bg-transparent", children: [_jsx(AvatarGroup, { size: 20, children: team.map((member) => (_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: member.src, alt: member.name }), _jsx(AvatarFallback, { children: member.fallback })] }, member.name))) }), _jsxs("div", { className: "ml-2 flex items-center gap-1", children: [_jsx("span", { className: "size-1.5 rounded-full bg-green-500" }), _jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "3 Live" })] })] })] }), _jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "outline", size: "icon", "aria-label": "Invite member", children: _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "aria-hidden": "true" }) }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "View activity", children: _jsx(IconPlaceholder, { lucide: "ClockIcon", tabler: "IconClock", hugeicons: "ClockIcon", phosphor: "ClockIcon", remixicon: "RiTimeLine", "aria-hidden": "true" }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Team options", children: _jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine", "aria-hidden": "true" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [_jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Team Settings" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine", "aria-hidden": "true" }), _jsx("span", { children: "Manage members" })] }), _jsxs(DropdownMenuItem, { children: [_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "SettingsIcon", phosphor: "GearIcon", remixicon: "RiSettings3Line", "aria-hidden": "true" }), _jsx("span", { children: "Team preferences" })] })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(IconPlaceholder, { lucide: "ExternalLinkIcon", tabler: "IconExternalLink", hugeicons: "LinkSquare01Icon", phosphor: "ArrowSquareOutIcon", remixicon: "RiExternalLinkLine", "aria-hidden": "true" }), _jsx("span", { children: "Open dashboard" })] })] })] })] })] }));
}
