import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const members = [
    {
        name: "Sarah Chen",
        email: "sarah@example.com",
        avatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        role: "Admin",
        roleVariant: "default",
    },
    {
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        role: "Editor",
        roleVariant: "info-light",
    },
    {
        name: "Emily Park",
        email: "emily@example.com",
        avatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        role: "Viewer",
        roleVariant: "outline",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-md flex-col", children: _jsx(ItemGroup, { children: members.map((member, index) => (_jsx("div", { children: _jsxs(Item, { variant: "outline", size: "xs", children: [_jsx(ItemMedia, { children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: member.avatar, alt: member.name }), _jsx(AvatarFallback, { children: member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("") })] }) }), _jsxs(ItemContent, { children: [_jsx(ItemTitle, { children: member.name }), _jsx(ItemDescription, { children: member.email })] }), _jsxs(ItemActions, { children: [_jsx(Badge, { variant: member.roleVariant, size: "sm", children: member.role }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "icon", className: "ml-1 size-7", children: [_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine" }), _jsx("span", { className: "sr-only", children: "Actions" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { children: "Change Role" }), _jsx(DropdownMenuItem, { children: "View Profile" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { variant: "destructive", children: "Remove" })] })] })] })] }) }, member.email))) }) }));
}
