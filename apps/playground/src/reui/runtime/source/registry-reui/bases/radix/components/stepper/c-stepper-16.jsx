"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const stops = [
    { address: "Damrak 12", time: "09:12" },
    { address: "Rokin 75", time: "09:31" },
    { address: "Nieuwezijds 112", time: "09:48" },
    { address: "Spuistraat 210", time: "10:05" },
    { address: "Haarlemmerstraat 44", time: "10:20" },
];
// The 14px ring stays transparent and the 10px dot inside it carries the
// state color, so the 1px gap between them shows whatever surface is behind.
const completed = (_jsx("span", { className: "bg-success flex size-2.5 items-center justify-center rounded-full text-white", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-2", "aria-hidden": "true" }) }));
function Pending() {
    return (_jsx("span", { className: "bg-ring/80 flex size-2.5 items-center justify-center rounded-full text-white", children: _jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiCheckboxBlankCircleLine", className: "size-2", "aria-hidden": "true" }) }));
}
// The current step trades its solid ring for a dashed track with a 2px green
// arc spinning over it, inset so the arc stays inside the box and 1px clear
// of the dot. pathLength={44} counts the ring as 44 units, so the track closes
// in eleven 3+1 dashes at any size; only the arc moves.
function Current() {
    return (_jsxs("span", { className: "relative flex size-3.5 items-center justify-center", children: [_jsxs("svg", { viewBox: "0 0 14 14", fill: "none", strokeWidth: "1", "aria-hidden": "true", className: "absolute inset-0 size-full", children: [_jsx("circle", { cx: "7", cy: "7", r: "6", pathLength: 44, strokeDasharray: "3 1", className: "stroke-ring/50" }), _jsx("circle", { cx: "7", cy: "7", r: "6", pathLength: 44, strokeWidth: "2", strokeLinecap: "round", strokeDasharray: "15 29", className: "stroke-success origin-center motion-safe:animate-spin" })] }), _jsx("span", { className: "bg-ring/80 size-2 rounded-full" })] }));
}
const indicators = {
    completed,
    inactive: _jsx(Pending, {}),
    loading: _jsx(Current, {}),
};
export default function Pattern() {
    const [current, setCurrent] = useState(3);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // One past the last step marks every step complete. No tab is selected
    // then, so the last one keeps the tablist's tab stop.
    const allDone = current > stops.length;
    function goTo(step) {
        setCurrent(step);
        // The pressed button disables itself at either end, so focus moves to
        // its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > stops.length)
            prevRef.current?.focus();
    }
    return (_jsx(TooltipProvider, { children: _jsx("div", { className: "@container mx-auto w-full max-w-lg", children: _jsxs(Stepper, { value: current, onValueChange: setCurrent, orientation: "vertical", indicators: indicators, className: "flex flex-col gap-6 @md:flex-row @md:items-start", "aria-label": "Delivery route", children: [_jsx(StepperNav, { className: "w-full max-w-60 shrink-0 gap-2.5", children: stops.map((stop, index) => {
                            const step = index + 1;
                            const status = step < current
                                ? `Arrived at ${stop.time}`
                                : step === current
                                    ? "On time"
                                    : `Expected at ${stop.time}`;
                            // The primitive shows loading on the active stop only, so every
                            // stop carries the flag and the spinner stands in for an active
                            // indicator. Each row is 20px (the badge's height) with or without
                            // the badge, so the separators sit at one fixed offset.
                            return (_jsxs(StepperItem, { step: step, loading: true, className: "relative min-h-5 justify-start gap-1.5 group-data-[orientation=vertical]/stepper-nav:flex-row", children: [_jsxs(StepperTrigger, { tabIndex: allDone && step === stops.length ? 0 : undefined, className: "relative gap-1.5 after:absolute after:inset-x-0 after:-inset-y-1.25", children: [_jsx(StepperIndicator, { className: "border-ring/80 data-[state=completed]:border-success size-3.5 border bg-transparent data-[state=active]:border-0 data-[state=active]:bg-transparent data-[state=completed]:bg-transparent" }), _jsx(StepperTitle, { children: stop.address }), _jsxs("span", { className: "sr-only", children: [", ", status] })] }), step === current ? (_jsx(Badge, { variant: "success-light", radius: "full", "aria-hidden": "true", children: status })) : (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { tabIndex: -1, "aria-hidden": "true", className: "flex", children: _jsx(IconPlaceholder, { lucide: "InfoIcon", tabler: "IconInfoCircle", hugeicons: "InformationCircleIcon", phosphor: "InfoIcon", remixicon: "RiInformationLine", className: "text-muted-foreground hover:text-foreground size-3.5", "aria-hidden": "true" }) }), _jsx(TooltipContent, { children: status })] })), step < stops.length && (_jsx(StepperSeparator, { className: cn("from-ring/80 to-ring/80 data-[state=completed]:from-success pointer-events-none absolute start-1.75 top-4.5 m-0 -translate-x-1/2 bg-transparent bg-linear-to-b to-70% mask-[radial-gradient(circle_closest-side,#000_90%,transparent)] mask-size-[0.1875rem_0.3125rem] mask-center group-data-[orientation=vertical]/stepper-nav:h-3.5 group-data-[orientation=vertical]/stepper-nav:w-0.75 rtl:translate-x-1/2", step + 1 < current
                                            ? "to-success"
                                            : "data-[state=completed]:to-ring") }))] }, stop.address));
                        }) }), _jsx(Separator, { "aria-hidden": "true", className: "@md:hidden" }), _jsx(Separator, { "aria-hidden": "true", orientation: "vertical", className: "hidden @md:block" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-3 text-start", children: [_jsxs(StepperPanel, { children: [stops.map((stop, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsx("p", { className: "text-sm font-medium", children: stop.address }), _jsxs("p", { className: "text-muted-foreground text-sm", children: ["Stop ", index + 1, " of ", stops.length, ", due at ", stop.time] })] }, stop.address))), _jsxs(StepperContent, { value: stops.length + 1, children: [_jsx("p", { className: "text-sm font-medium", children: "Route complete" }), _jsxs("p", { className: "text-muted-foreground text-sm", children: ["All ", stops.length, " stops delivered"] })] })] }), _jsxs("div", { className: "flex justify-start gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }) }) }));
}
