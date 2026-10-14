"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupText, } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const environments = [
    {
        id: "development",
        label: "Dev",
        tooltip: "Local development environment",
        icon: (_jsx(IconPlaceholder, { lucide: "Code2Icon", tabler: "IconCode", hugeicons: "Code01Icon", phosphor: "CodeIcon", remixicon: "RiCodeLine", "aria-hidden": "true" })),
    },
    {
        id: "staging",
        label: "Staging",
        tooltip: "Pre-production mirror",
        icon: (_jsx(IconPlaceholder, { lucide: "TestTube2Icon", tabler: "IconTestPipe", hugeicons: "TestTube01Icon", phosphor: "TestTubeIcon", remixicon: "RiTestTubeLine", "aria-hidden": "true" })),
    },
    {
        id: "production",
        label: "Production",
        tooltip: "Live environment — affects real users",
        icon: (_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeIcon", remixicon: "RiGlobalLine", "aria-hidden": "true" })),
    },
];
export default function Pattern() {
    const [active, setActive] = useState("development");
    return (_jsx(ButtonGroup, { children: _jsxs(TooltipProvider, { children: [environments.map((env) => (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn(active === env.id ? "bg-muted" : ""), onClick: () => setActive(env.id), children: [env.icon, env.label] }) }), _jsx(TooltipContent, { children: env.tooltip })] }, env.id))), active === "production" ? (_jsxs(ButtonGroupText, { className: "bg-transparent", children: [_jsx("div", { className: "bg-success size-1.5 rounded-full" }), _jsx("span", { children: "Live" })] })) : null] }) }));
}
