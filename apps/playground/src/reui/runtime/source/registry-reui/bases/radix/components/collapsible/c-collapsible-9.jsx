"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "../../../../../../../adapters/navigation.tsx";
import { Item, ItemMedia, ItemTitle } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const navItems = [
    {
        id: "dashboard",
        name: "Dashboard",
        icon: (_jsx(IconPlaceholder, { lucide: "LayoutDashboardIcon", tabler: "IconLayoutDashboard", hugeicons: "DashboardSquare02Icon", phosphor: "LayoutIcon", remixicon: "RiDashboardLine" })),
        items: [
            {
                id: "analytics",
                name: "Analytics",
                icon: (_jsx(IconPlaceholder, { lucide: "ChartBarIcon", tabler: "IconChartSankey", hugeicons: "BarChartHorizontalIcon", phosphor: "ChartLineIcon", remixicon: "RiLineChartLine" })),
                items: [
                    {
                        id: "real-time",
                        name: "Real-time",
                        icon: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" })),
                    },
                    {
                        id: "historical",
                        name: "Historical",
                        icon: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" })),
                    },
                ],
            },
            {
                id: "reports",
                name: "Reports",
                icon: (_jsx(IconPlaceholder, { lucide: "MessageSquareIcon", tabler: "IconMessageDots", hugeicons: "Message02Icon", phosphor: "ChatIcon", remixicon: "RiChat4Line", "aria-hidden": "true" })),
            },
        ],
    },
    {
        id: "team",
        name: "Team",
        icon: (_jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine", "aria-hidden": "true" })),
        items: [
            {
                id: "members",
                name: "Members",
                icon: (_jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine", "aria-hidden": "true" })),
            },
            {
                id: "permissions",
                name: "Permissions",
                icon: (_jsx(IconPlaceholder, { lucide: "ShieldIcon", tabler: "IconShield", hugeicons: "Shield01Icon", phosphor: "ShieldIcon", remixicon: "RiShieldLine", "aria-hidden": "true" })),
            },
        ],
    },
    {
        id: "billing",
        name: "Billing",
        icon: (_jsx(IconPlaceholder, { lucide: "CreditCardIcon", tabler: "IconCreditCard", hugeicons: "CreditCardIcon", phosphor: "CreditCardIcon", remixicon: "RiBankCardLine", "aria-hidden": "true" })),
    },
    {
        id: "settings",
        name: "Settings",
        icon: (_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "SettingsIcon", phosphor: "GearIcon", remixicon: "RiSettings3Line", "aria-hidden": "true" })),
    },
    {
        id: "notifications",
        name: "Notifications",
        icon: (_jsx(IconPlaceholder, { lucide: "BellIcon", tabler: "IconBell", hugeicons: "NotificationIcon", phosphor: "BellIcon", remixicon: "RiNotificationLine", "aria-hidden": "true" })),
    },
];
function NavMenuItem({ item, level = 0, selectedId, onSelect, }) {
    const isFolder = !!item.items && item.items.length > 0;
    const isSelected = selectedId === item.id;
    if (isFolder) {
        return (_jsxs(Collapsible, { className: "group/collapsible", children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(Item, { size: "xs", className: "hover:bg-accent data-[state=open]:bg-accent group/item cursor-pointer py-1.25", style: { paddingLeft: `${level * 12 + 8}px` }, children: [_jsx(ItemMedia, { variant: "icon", children: _jsx("div", { className: "text-muted-foreground group-hover/item:text-foreground size-3.5", children: item.icon }) }), _jsx(ItemTitle, { className: "text-sm group-data-[state=open]/collapsible:font-semibold", children: item.name }), _jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", "aria-hidden": "true", className: "text-muted-foreground ml-auto size-4 transition-transform in-data-[state=open]:rotate-90" })] }) }), _jsx(CollapsibleContent, { className: "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden pt-0.5", children: _jsx("div", { className: "flex flex-col gap-0.5", children: item.items?.map((child) => (_jsx(NavMenuItem, { item: child, level: level + 1, selectedId: selectedId, onSelect: onSelect }, child.id))) }) })] }));
    }
    return (_jsxs(Item, { size: "xs", className: "hover:bg-accent data-[active=true]:bg-accent data-[active=true]:text-foreground group/item cursor-pointer py-1.25", "data-active": isSelected, style: { paddingLeft: `${level * 12 + 8}px` }, onClick: () => onSelect(item.id), children: [_jsx(ItemMedia, { variant: "icon", children: _jsx("div", { className: "text-muted-foreground group-hover/item:text-foreground group-data-[active=true]/item:text-foreground size-3.5", children: item.icon }) }), _jsx(ItemTitle, { className: "text-sm", children: item.name })] }));
}
export default function Pattern() {
    const [selectedId, setSelectedId] = useState("real-time");
    return (_jsx("div", { className: "min-h-64 w-full max-w-56", children: _jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-1", children: _jsx("div", { className: "flex flex-col gap-0.5", children: navItems.map((item) => (_jsx(NavMenuItem, { item: item, selectedId: selectedId, onSelect: setSelectedId }, item.id))) }) }) }) }));
}
