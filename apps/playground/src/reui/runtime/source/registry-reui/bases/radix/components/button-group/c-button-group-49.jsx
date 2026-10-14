"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const navItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: (_jsx(IconPlaceholder, { lucide: "LayoutDashboardIcon", tabler: "IconLayoutDashboard", hugeicons: "DashboardSquare01Icon", phosphor: "SquaresFourIcon", remixicon: "RiLayoutGridLine", "aria-hidden": "true" })),
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: (_jsx(IconPlaceholder, { lucide: "BarChart2Icon", tabler: "IconChartBar", hugeicons: "BarChartIcon", phosphor: "ChartBarIcon", remixicon: "RiBarChartLine", "aria-hidden": "true" })),
    },
    {
        id: "settings",
        label: "Settings",
        icon: (_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "Settings01Icon", phosphor: "GearIcon", remixicon: "RiSettings3Line", "aria-hidden": "true" })),
    },
    {
        id: "help",
        label: "Help",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleHelpIcon", tabler: "IconHelp", hugeicons: "HelpCircleIcon", phosphor: "QuestionIcon", remixicon: "RiQuestionLine", "aria-hidden": "true" })),
    },
];
export default function Pattern() {
    const [active, setActive] = useState("dashboard");
    return (_jsx(ButtonGroup, { orientation: "vertical", children: navItems.map((item) => (_jsxs(Button, { variant: "outline", className: cn("justify-start", active === item.id ? "bg-muted" : ""), onClick: () => setActive(item.id), children: [item.icon, item.label] }, item.id))) }));
}
