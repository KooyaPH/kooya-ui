"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const orderTypes = [
    {
        id: "market",
        label: "Market",
        tooltip: "Execute immediately at best available price",
        icon: (_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TrendUp01Icon", phosphor: "TrendUpIcon", remixicon: "RiStockLine", "aria-hidden": "true" })),
    },
    {
        id: "limit",
        label: "Limit",
        tooltip: "Execute only at your specified price or better",
        icon: (_jsx(IconPlaceholder, { lucide: "TargetIcon", tabler: "IconTarget", hugeicons: "Target01Icon", phosphor: "TargetIcon", remixicon: "RiFocus3Line", "aria-hidden": "true" })),
    },
    {
        id: "stop",
        label: "Stop",
        tooltip: "Trigger a market order at stop level",
        icon: (_jsx(IconPlaceholder, { lucide: "ShieldAlertIcon", tabler: "IconShieldExclamation", hugeicons: "SecurityPasswordIcon", phosphor: "ShieldWarningIcon", remixicon: "RiShieldLine", "aria-hidden": "true" })),
    },
    {
        id: "stop-limit",
        label: "Stop-Limit",
        tooltip: "Trigger a limit order at stop level",
        icon: (_jsx(IconPlaceholder, { lucide: "ShieldCheckIcon", tabler: "IconShieldCheck", hugeicons: "SecurityCheckIcon", phosphor: "ShieldCheckIcon", remixicon: "RiShieldCheckLine", "aria-hidden": "true" })),
    },
];
export default function Pattern() {
    const [active, setActive] = useState("market");
    return (_jsx(ButtonGroup, { children: _jsx(TooltipProvider, { children: orderTypes.map((type) => (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn(active === type.id ? "bg-muted" : ""), onClick: () => setActive(type.id), children: [type.icon, type.label] }) }), _jsx(TooltipContent, { className: "max-w-52 text-center", children: type.tooltip })] }, type.id))) }) }));
}
