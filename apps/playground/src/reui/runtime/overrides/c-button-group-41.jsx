// Adapted upstream REUI recipe; preserve supporting modules from the Kooya recipes bundle.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState } from "react";
import { Badge } from "../../adapters/structured";
import { Button } from "../../adapters/controls";
import { ButtonGroup } from "../../adapters/controls";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../adapters/overlays";
import { IconPlaceholder } from "../../adapters/icons";
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
    const container = useRef(null);
    const [vertical, setVertical] = useState(false);
    useLayoutEffect(() => {
        const node = container.current;
        if (!node)
            return;
        // The actual original row needs 448px (148 + 140 + 160 native controls).
        // Measuring wrapped children under constraint would underestimate that width.
        const update = () => setVertical(node.clientWidth < 448);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    return (_jsx("div", { ref: container, role: "group", "aria-label": "AI model", style: { width: "100%", maxWidth: 448, minWidth: 0 }, children: _jsx(TooltipProvider, { children: _jsx(ButtonGroup, { orientation: vertical ? "vertical" : "horizontal", style: { width: vertical ? "100%" : undefined, gap: 0 }, children: models.map((model) => (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { "aria-pressed": active === model.id, variant: "outline", style: {
                                    width: vertical ? "100%" : undefined,
                                    borderColor: active === model.id ? "var(--ku-focus)" : undefined,
                                    background: active === model.id ? "var(--ku-subtle)" : undefined,
                                }, onClick: () => setActive(model.id), children: [model.icon, model.label, _jsx(Badge, { variant: model.badgeVariant, size: "xs", children: model.badge })] }) }), _jsx(TooltipContent, { children: model.tooltip })] }, model.id))) }) }) }));
}
