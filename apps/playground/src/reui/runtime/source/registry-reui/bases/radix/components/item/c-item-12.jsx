import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
const activities = [
    {
        name: "Sarah Chen",
        avatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        action: "deployed",
        target: "v2.4.1 to production",
        badge: "success-light",
        time: "5 min ago",
    },
    {
        name: "Marcus Johnson",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        action: "merged",
        target: "feat/dark-mode into main",
        badge: "info-light",
        time: "32 min ago",
    },
    {
        name: "Emily Park",
        avatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        action: "opened",
        target: "issue #284: Fix mobile nav",
        badge: "warning-light",
        time: "1 hour ago",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-md flex-col", children: _jsx(ItemGroup, { children: activities.map((activity, index) => (_jsx("div", { children: _jsxs(Item, { variant: "outline", size: "xs", children: [_jsx(ItemMedia, { children: _jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: activity.avatar, alt: activity.name }), _jsx(AvatarFallback, { children: activity.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("") })] }) }), _jsxs(ItemContent, { children: [_jsx(ItemTitle, { children: activity.name }), _jsxs(ItemDescription, { children: [_jsx(Badge, { variant: activity.badge, size: "xs", className: "mr-1 align-text-top", children: activity.action }), activity.target] })] }), _jsx(ItemActions, { children: _jsx("span", { className: "text-muted-foreground text-xs whitespace-nowrap", children: activity.time }) })] }) }, index))) }) }));
}
