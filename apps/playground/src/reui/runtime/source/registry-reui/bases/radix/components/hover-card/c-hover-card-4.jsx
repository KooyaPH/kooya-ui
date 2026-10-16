import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex min-h-[100px] items-center justify-center", children: _jsxs(HoverCard, { openDelay: 100, closeDelay: 100, children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Instant Deployment" }) }), _jsx(HoverCardContent, { className: "w-80 p-3", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(IconPlaceholder, { lucide: "ZapIcon", tabler: "IconBolt", hugeicons: "ZapIcon", phosphor: "LightningIcon", remixicon: "RiFlashlightLine", "aria-hidden": "true", className: "mt-0.5 size-4 shrink-0 text-amber-500" }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "font-medium", children: "Zero Latency Edge" }), _jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Deploy your applications across our global edge network in seconds." })] })] }) })] }) }));
}
