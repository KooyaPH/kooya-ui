"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const items = [
    {
        id: "Routes",
        label: "Routes",
        icon: (_jsx(IconPlaceholder, { lucide: "RouteIcon", tabler: "IconRoute", hugeicons: "Route01Icon", phosphor: "PathIcon", remixicon: "RiRouteLine", "aria-hidden": "true", className: "size-3.5 opacity-60" })),
    },
    {
        id: "Paths",
        label: "Paths",
        icon: (_jsx(IconPlaceholder, { lucide: "WaypointsIcon", tabler: "IconEaseInOutControlPoints", hugeicons: "EaseCurveControlPointsIcon", phosphor: "LineSegmentsIcon", remixicon: "RiRouteLine", "aria-hidden": "true", className: "size-3.5 opacity-60" })),
    },
    {
        id: "Bot Name",
        label: "Bot Name",
        icon: (_jsx(IconPlaceholder, { lucide: "BotIcon", tabler: "IconRobotFace", hugeicons: "RoboticIcon", phosphor: "RobotIcon", remixicon: "RiRobot2Line", "aria-hidden": "true", className: "size-3.5 opacity-60" })),
    },
];
export default function Pattern() {
    const [active, setActive] = useState("Paths");
    return (_jsxs(ButtonGroup, { children: [items.map((item) => (_jsxs(Button, { variant: "outline", className: cn(active === item.id ? "bg-muted" : ""), onClick: () => setActive(item.id), children: [item.icon, item.label] }, item.id))), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", children: _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "min-w-40", children: [_jsx(DropdownMenuItem, { children: "Filter by Group" }), _jsx(DropdownMenuItem, { children: "Sort by Name" }), _jsx(DropdownMenuItem, { children: "Export Data" })] })] })] }));
}
