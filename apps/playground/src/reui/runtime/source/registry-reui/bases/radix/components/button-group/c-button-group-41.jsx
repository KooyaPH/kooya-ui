"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const models = [
    {
        id: "gpt4o",
        label: "GPT-4o",
        badge: "Fast",
        badgeVariant: "success-light",
        tooltip: "128k context, fastest response",
        icon: (_jsx(IconPlaceholder, { lucide: "ZapIcon", tabler: "IconBolt", hugeicons: "LightningIcon", phosphor: "LightningIcon", remixicon: "RiFlashlightLine", "aria-hidden": "true" })),
    },
    {
        id: "claude",
        label: "Claude",
        badge: "Pro",
        badgeVariant: "info-light",
        tooltip: "200k context, best for analysis",
        icon: (_jsx(IconPlaceholder, { lucide: "BrainIcon", tabler: "IconBrain", hugeicons: "AiBrain01Icon", phosphor: "BrainIcon", remixicon: "RiBrainLine", "aria-hidden": "true" })),
    },
    {
        id: "gemini",
        label: "Gemini",
        badge: "Preview",
        badgeVariant: "warning-light",
        tooltip: "1M context, experimental",
        icon: (_jsx(IconPlaceholder, { lucide: "FlaskConicalIcon", tabler: "IconFlask", hugeicons: "ExperimentIcon", phosphor: "FlaskIcon", remixicon: "RiFlaskLine", "aria-hidden": "true" })),
    },
];
export default function Pattern() {
    const [active, setActive] = useState("claude");
    return (_jsx(ButtonGroup, { children: _jsx(TooltipProvider, { children: models.map((model) => (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn(active === model.id ? "bg-muted" : ""), onClick: () => setActive(model.id), children: [model.icon, model.label, _jsx(Badge, { variant: model.badgeVariant, size: "xs", children: model.badge })] }) }), _jsx(TooltipContent, { children: model.tooltip })] }, model.id))) }) }));
}
