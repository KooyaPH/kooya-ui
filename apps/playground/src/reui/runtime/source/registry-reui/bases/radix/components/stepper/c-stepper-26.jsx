"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const checkpoints = [
    {
        title: "Goods Loaded",
        time: "10:52AM",
        summary: "18 pallets scanned and sealed at the Rotterdam depot.",
    },
    {
        title: "Checkpoint 1",
        time: "11:09AM",
        summary: "Cleared the A15 weigh station, running on schedule.",
    },
    {
        title: "Checkpoint 2",
        time: "1:06PM",
        summary: "Crossed into Germany at Venlo, about an hour out.",
    },
    {
        title: "Delivery",
        time: "2:15PM",
        summary: "Dock 4 at the Duisburg warehouse, signature required.",
    },
];
// The design draws the 10px check with a 1.4px line: 3.36 on a 24-unit grid.
const completed = (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", strokeWidth: 3.36, className: "size-2.5", "aria-hidden": "true" }));
// pathLength counts the ring as 28 units, so the 3:1 dash pattern closes in
// seven even dashes instead of leaving a stub at the seam.
function DashedRing({ spin = false }) {
    return (_jsx("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: cn("size-4", spin && "motion-safe:animate-spin"), children: _jsx("circle", { cx: "8", cy: "8", r: "4.45", stroke: "currentColor", strokeWidth: "1.6", strokeDasharray: "3 1", pathLength: 28 }) }));
}
const indicators = {
    completed,
    inactive: _jsx(DashedRing, {}),
    loading: _jsx(DashedRing, { spin: true }),
};
export default function Pattern() {
    const [current, setCurrent] = useState(2);
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
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "@container max-w-200", "aria-label": "Shipment tracking", children: [_jsx(StepperNav, { children: checkpoints.map((checkpoint, index) => {
                    const step = index + 1;
                    // The primitive shows loading on the active checkpoint only, so
                    // every checkpoint carries the flag and the spinner follows the
                    // selection.
                    return (_jsx(StepperItem, { step: step, loading: true, className: "min-w-0 flex-1 items-stretch", children: _jsxs(StepperTrigger, { tabIndex: allDone && step === checkpoints.length ? 0 : undefined, className: "w-full flex-col gap-4", children: [_jsx(StepperDescription, { className: "text-xs whitespace-nowrap @max-lg:sr-only", children: step <= current ? (checkpoint.time) : (_jsx("span", { "aria-hidden": "true", children: "--" })) }), _jsxs("span", { className: "flex h-1 w-full items-center gap-0.75", children: [_jsx("span", { className: "bg-ring/20 flex h-full flex-1 group-first/step:rounded-s-full", children: _jsx("span", { className: "group-data-[state=active]/step:bg-foreground flex-1 rounded-s-full" }) }), _jsx(StepperIndicator, { className: "bg-ring/20 text-ring data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=completed]:bg-ring/20 data-[state=completed]:text-ring size-4" }), _jsx("span", { className: "bg-ring/20 flex h-full flex-1 group-last/step:rounded-e-full", children: _jsx("span", { className: "group-data-[state=active]/step:bg-foreground flex-1 rounded-e-full" }) })] }), _jsx(StepperTitle, { className: "mx-1 data-[state=active]:font-semibold @max-lg:sr-only", children: checkpoint.title }), step < current && _jsx("span", { className: "sr-only", children: ", completed" }), step === current && (_jsx("span", { className: "sr-only", children: ", in progress" }))] }) }, checkpoint.title));
                }) }), _jsxs("div", { className: "mt-6 flex flex-col gap-3 text-center", children: [_jsxs(StepperPanel, { children: [checkpoints.map((checkpoint, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsx("p", { className: "text-sm font-medium", children: checkpoint.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: checkpoint.summary })] }, checkpoint.title))), _jsxs(StepperContent, { value: checkpoints.length + 1, children: [_jsx("p", { className: "text-sm font-medium", children: "Delivered" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Signed for at dock 4 of the Duisburg warehouse." })] })] }), _jsxs("div", { className: "flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
