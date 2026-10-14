"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const checkpoints = [
    {
        title: "Goods Loaded",
        time: "10:52AM",
        summary: "22 pallets sealed into trailer 4 at the Antwerp depot.",
    },
    {
        title: "Checkpoint 1",
        time: "11:09AM",
        summary: "E19 weigh station at Brecht, axle load check.",
    },
    {
        title: "Checkpoint 2",
        time: "11:27AM",
        summary: "Hazeldonk border post, customs papers pre-filed.",
    },
    {
        title: "Arrival",
        time: "11:46AM",
        summary: "Dock 7 at the Breda warehouse, signature on delivery.",
    },
];
// pathLength counts the ring as 28 units, so the design's 3:1 dash closes in
// seven even dashes instead of leaving a stub at the seam.
function Pending({ spin = false }) {
    return (_jsx("span", { className: "bg-ring/40 text-background flex size-4 rounded-full", children: _jsx("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: cn("size-4", spin && "motion-safe:animate-spin"), children: _jsx("circle", { cx: "8", cy: "8", r: "4.5", stroke: "currentColor", strokeWidth: "1.6", strokeDasharray: "3 1", pathLength: 28 }) }) }));
}
const indicators = {
    // The design draws the 10px check with a 1.4px line: 3.36 on a 24-unit grid.
    completed: (_jsx("span", { className: "bg-foreground text-background flex size-4 items-center justify-center rounded-full", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", strokeWidth: 3.36, className: "size-2.5", "aria-hidden": "true" }) })),
    inactive: _jsx(Pending, {}),
    loading: _jsx(Pending, { spin: true }),
};
export default function Pattern() {
    const [current, setCurrent] = useState(3);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // One past the last step marks every step complete. No tab is selected
    // then, so the last one keeps the tablist's tab stop.
    const allDone = current > checkpoints.length;
    function goTo(step) {
        setCurrent(step);
        // The pressed button disables itself at either end, so focus moves to
        // its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > checkpoints.length)
            prevRef.current?.focus();
    }
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "@container max-w-200", "aria-label": "Shipment progress", children: [_jsx(StepperNav, { className: "isolate", children: checkpoints.map((checkpoint, index) => {
                    const step = index + 1;
                    const label = step < current
                        ? checkpoint.time
                        : `${step === checkpoints.length ? "ETA" : "Est."} ${checkpoint.time}`;
                    // The primitive shows loading on the active stop only, so every
                    // stop carries the flag: the spinner follows the selection and
                    // stands in for the active indicator.
                    return (_jsxs(StepperItem, { step: step, loading: true, className: "relative min-w-0 flex-1 items-stretch", children: [_jsx(StepperSeparator, { className: cn("from-ring/30 to-ring/30 data-[state=completed]:from-ring/40 pointer-events-none absolute inset-x-0 top-7.75 -z-1 m-0 bg-transparent bg-linear-to-r from-50% to-50% mask-[linear-gradient(to_right,transparent_calc(50%_-_0.0625rem),#000_0_calc(50%_+_0.0625rem),transparent_0),radial-gradient(circle,transparent_var(--cutout),#000_0)] mask-intersect mask-size-[0.34375rem_100%,100%_100%] mask-repeat-space [--cutout:0.6875rem] group-data-[orientation=horizontal]/stepper-nav:h-1.5 data-[state=completed]:[--cutout:0rem] @max-lg:-top-px rtl:bg-linear-to-l", step + 1 < current && "to-ring/40") }), step + 1 === current && !allDone && (_jsx("span", { "aria-hidden": "true", className: "bg-background from-info/40 to-info pointer-events-none absolute start-1/2 -end-1/10 top-7.75 ms-1.75 h-1.5 bg-linear-to-r @max-lg:-top-px rtl:bg-linear-to-l", children: _jsx("svg", { viewBox: "0 0 14 16", className: "fill-info absolute -end-1.75 top-1/2 h-4 w-3.5 -translate-y-1/2 rtl:-scale-x-100", children: _jsx("path", { d: "M12.4 5.07C14.53 6.47 14.53 9.53 12.4 10.93L5.6 15.4C3.21 16.97 0 15.29 0 12.47V3.53C0 .71 3.21-.97 5.6.6Z" }) }) })), _jsxs(StepperTrigger, { tabIndex: allDone && step === checkpoints.length ? 0 : undefined, className: "relative w-full flex-col gap-4", children: [_jsx(StepperDescription, { className: "text-xs whitespace-nowrap @max-lg:sr-only", children: label }), _jsx("span", { className: "flex h-1 items-center", children: _jsx(StepperIndicator, { className: "size-4 bg-transparent data-[state=active]:bg-transparent data-[state=completed]:bg-transparent" }) }), _jsx(StepperTitle, { className: "mx-1 @max-lg:sr-only", children: checkpoint.title }), step < current && _jsx("span", { className: "sr-only", children: ", completed" })] })] }, checkpoint.title));
                }) }), _jsxs(StepperPanel, { className: "mt-6 text-center", children: [checkpoints.map((checkpoint, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsx("p", { className: "text-sm font-medium", children: checkpoint.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: checkpoint.summary })] }, checkpoint.title))), _jsxs(StepperContent, { value: checkpoints.length + 1, children: [_jsx("p", { className: "text-sm font-medium", children: "Arrived" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Signed for at dock 7 of the Breda warehouse." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
