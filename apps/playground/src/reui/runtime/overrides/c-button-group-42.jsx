// Owned responsive correction to the actual attributed REUI recipe.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "../../adapters/controls";
import { ButtonGroup } from "../../adapters/controls";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../adapters/overlays";
import { IconPlaceholder } from "../../adapters/icons";
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
    const container = useRef(null);
    const [vertical, setVertical] = useState(false);
    useLayoutEffect(() => {
        const node = container.current;
        if (!node)
            return;
        // The actual original native row needs 396px (100 + 86 + 86 + 124).
        const update = () => setVertical(node.clientWidth < 396);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    return (_jsx("div", { ref: container, role: "group", "aria-label": "Order type", style: { width: "100%", maxWidth: 396, minWidth: 0 }, children: _jsx(TooltipProvider, { children: _jsx(ButtonGroup, { orientation: vertical ? "vertical" : "horizontal", style: { width: vertical ? "100%" : undefined, gap: 0 }, children: orderTypes.map((type) => (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", "aria-pressed": active === type.id, style: {
                                    width: vertical ? "100%" : undefined,
                                    background: active === type.id ? "var(--ku-subtle)" : undefined,
                                    borderColor: active === type.id ? "var(--ku-focus)" : undefined,
                                }, onClick: () => setActive(type.id), children: [type.icon, type.label] }) }), _jsx(TooltipContent, { className: "max-w-52 text-center", children: type.tooltip })] }, type.id))) }) }) }));
}
