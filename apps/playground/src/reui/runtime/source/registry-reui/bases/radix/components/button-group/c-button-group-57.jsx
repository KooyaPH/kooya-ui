"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupSeparator, } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
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
    return (_jsxs(ButtonGroup, { children: [modes.map((mode) => (_jsxs(Button, { variant: "outline", size: "sm", className: cn(active === mode.id && "bg-muted"), onClick: () => setActive(mode.id), children: [mode.icon, mode.label] }, mode.id))), _jsx(ButtonGroupSeparator, {}), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5 text-xs", "aria-label": "Select credit cap", children: [limit, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "size-3 opacity-60", "aria-hidden": "true" })] }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-32", children: _jsx(DropdownMenuGroup, { children: limits.map((item) => (_jsx(DropdownMenuItem, { onClick: () => setLimit(item), children: item }, item))) }) })] })] }));
}
