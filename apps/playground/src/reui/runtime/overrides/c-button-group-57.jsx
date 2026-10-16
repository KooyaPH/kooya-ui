// Owned responsive correction to the actual attributed REUI recipe.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "cn";
import { Button } from "../../adapters/controls";
import { ButtonGroup, ButtonGroupSeparator } from "../../adapters/controls";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../adapters/menus";
import { IconPlaceholder } from "../../adapters/icons";
const modes = [
    {
        id: "assist",
        label: "Assist",
        icon: (_jsx(IconPlaceholder, { lucide: "MessageSquareIcon", tabler: "IconMessageCircle", hugeicons: "Message02Icon", phosphor: "ChatCircleIcon", remixicon: "RiChat3Line", className: "size-3.5 opacity-60", "aria-hidden": "true" })),
    },
    {
        id: "review",
        label: "Review",
        icon: (_jsx(IconPlaceholder, { lucide: "ShieldCheckIcon", tabler: "IconShieldCheck", hugeicons: "ShieldEnergyIcon", phosphor: "ShieldCheckIcon", remixicon: "RiShieldCheckLine", className: "size-3.5 opacity-60", "aria-hidden": "true" })),
    },
    {
        id: "auto",
        label: "Auto",
        icon: (_jsx(IconPlaceholder, { lucide: "ZapIcon", tabler: "IconBolt", hugeicons: "LightningIcon", phosphor: "LightningIcon", remixicon: "RiFlashlightLine", className: "size-3.5 opacity-60", "aria-hidden": "true" })),
    },
];
const limits = ["2k credits", "10k credits", "Unlimited"];
export default function Pattern() {
    const [active, setActive] = useState("review");
    const [limit, setLimit] = useState(limits[1]);
    const container = useRef(null);
    const [vertical, setVertical] = useState(false);
    useLayoutEffect(() => {
        const node = container.current;
        if (!node)
            return;
        const update = () => setVertical(node.clientWidth < 352);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    return (_jsx("div", { ref: container, role: "group", "aria-label": "AI mode and credit cap", style: { width: "100%", maxWidth: 384, minWidth: 0 }, children: _jsxs(ButtonGroup, { orientation: vertical ? "vertical" : "horizontal", style: { maxWidth: "100%", width: vertical ? "100%" : undefined }, children: [modes.map((mode) => (_jsxs(Button, { variant: "outline", size: "sm", "aria-pressed": active === mode.id, style: {
                        backgroundColor: active === mode.id ? "var(--ku-subtle)" : undefined,
                        borderColor: active === mode.id ? "var(--ku-focus)" : undefined,
                    }, className: cn(active === mode.id && "bg-muted"), onClick: () => setActive(mode.id), children: [mode.icon, mode.label] }, mode.id))), _jsx(ButtonGroupSeparator, {}), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5 text-xs", "aria-label": "Select credit cap", children: [limit, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "size-3 opacity-60", "aria-hidden": "true" })] }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-32", children: _jsx(DropdownMenuGroup, { children: limits.map((item) => (_jsx(DropdownMenuItem, { onClick: () => setLimit(item), children: item }, item))) }) })] })] }) }));
}
