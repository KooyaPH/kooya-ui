"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const items = [
    {
        label: "Select an option",
        value: null,
        icon: (_jsx(IconPlaceholder, { lucide: "ScanIcon", tabler: "IconLineScan", hugeicons: "ScanIcon", phosphor: "ScanIcon", remixicon: "RiQrScan2Line", className: "text-muted-foreground size-4" })),
    },
    {
        label: "Dashboard",
        value: "dashboard",
        icon: (_jsx(IconPlaceholder, { lucide: "LayoutDashboardIcon", tabler: "IconLayoutDashboard", hugeicons: "DashboardSquare02Icon", phosphor: "LayoutIcon", remixicon: "RiDashboardLine", className: "text-muted-foreground size-4" })),
    },
    {
        label: "Activity",
        value: "activity",
        icon: (_jsx(IconPlaceholder, { lucide: "ActivityIcon", tabler: "IconActivity", hugeicons: "ActivityIcon", phosphor: "ActivityIcon", remixicon: "RiPulseLine", className: "text-muted-foreground size-4" })),
    },
    {
        label: "Security",
        value: "security",
        icon: (_jsx(IconPlaceholder, { lucide: "ShieldIcon", tabler: "IconShield", hugeicons: "Shield01Icon", phosphor: "ShieldIcon", remixicon: "RiShieldLine", className: "text-muted-foreground size-4" })),
    },
    {
        label: "Settings",
        value: "settings",
        icon: (_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "SettingsIcon", phosphor: "GearIcon", remixicon: "RiSettings3Line", className: "text-muted-foreground size-4" })),
    },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[200px]", children: _jsx(SelectValue, { placeholder: "Select an option" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: items.slice(1).map((item) => (_jsxs(SelectItem, { value: item.value, children: [item.icon, item.label] }, item.value))) }) })] }) }));
}
