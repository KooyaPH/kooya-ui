import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "cn";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const max = 12;
    const skipInterval = 2;
    const ticks = Array.from({ length: max + 1 }, (_, i) => i);
    return (_jsxs("div", { className: "mx-auto grid w-full max-w-sm gap-4", children: [_jsx(Label, { className: "text-sm font-medium", children: "Duration (months)" }), _jsx(Slider, { defaultValue: [5], max: max }), _jsx("span", { "aria-hidden": "true", className: "text-muted-foreground flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium", children: ticks.map((tick) => (_jsxs("span", { className: "flex w-0 flex-col items-center justify-center gap-2", children: [_jsx("span", { className: cn("bg-muted-foreground/70 h-1 w-px", tick % skipInterval !== 0 && "h-0.5") }), _jsx("span", { className: cn(tick % skipInterval !== 0 && "opacity-0"), children: tick })] }, tick))) })] }));
}
