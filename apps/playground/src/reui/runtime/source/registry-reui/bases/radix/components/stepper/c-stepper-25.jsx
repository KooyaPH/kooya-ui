"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const phases = [
    {
        title: "Choose Resolution",
        summary: "Compare a refund, a replacement and store credit for order #4821.",
    },
    {
        title: "Execute Resolution",
        summary: "Issue the $129.00 refund to the original payment method.",
    },
    {
        title: "Verify Outcome",
        summary: "Confirm the bank has settled the refund with the customer.",
    },
    {
        title: "Resolution Summary",
        summary: "Review every action taken, then close the case.",
    },
];
// pathLength counts the ring as 28 units, so the 3:1 dash pattern closes in
// seven even dashes instead of leaving a stub at the seam.
function Pending({ current = false }) {
    return (_jsx("span", { className: cn("flex size-4 rounded-full", current ? "bg-blue-500 text-white" : "bg-ring/20 text-ring"), children: _jsx("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: cn("size-4", current && "motion-safe:animate-spin"), children: _jsx("circle", { cx: "8", cy: "8", r: "4.5", stroke: "currentColor", strokeWidth: "1.6", strokeDasharray: "3 1", pathLength: 28 }) }) }));
}
// The 22px indicator is a disc of the page surface and the 16px dot inside
// it carries the state, so a 3px ring cuts the dot out of the track. The
// design draws the 10px check with a 1.4px line: 3.36 on a 24-unit grid.
const indicators = {
    completed: (_jsx("span", { className: "bg-ring/20 text-ring flex size-4 items-center justify-center rounded-full", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", strokeWidth: 3.36, className: "size-2.5", "aria-hidden": "true" }) })),
    inactive: _jsx(Pending, {}),
    loading: _jsx(Pending, { current: true }),
};
export default function Pattern() {
    const [current, setCurrent] = useState(3);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // One past the last step marks every step complete. No tab is selected
    // then, so the last one keeps the tablist's tab stop.
    const allDone = current > phases.length;
    function goTo(step) {
        setCurrent(step);
        // The pressed button disables itself at either end, so focus moves to its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > phases.length)
            prevRef.current?.focus();
    }
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "@container max-w-200", "aria-label": "Resolution phases", children: [_jsx(StepperNav, { children: phases.map((phase, index) => {
                    const step = index + 1;
                    // The primitive shows loading on the active phase only, so every
                    // phase carries the flag and the spinner follows the selection.
                    return (_jsxs(StepperItem, { step: step, loading: true, className: "relative min-w-0 flex-1 items-stretch", children: [_jsxs(StepperTrigger, { tabIndex: allDone && step === phases.length ? 0 : undefined, className: "w-full flex-col gap-4", children: [_jsxs("span", { className: "flex flex-col items-center gap-1 px-1.75 text-center @max-lg:sr-only", children: [_jsxs("span", { className: "text-muted-foreground text-xs font-medium whitespace-nowrap uppercase", children: ["Phase ", step] }), _jsx(StepperTitle, { className: "data-[state=active]:font-semibold", children: phase.title }), step < current && (_jsx("span", { className: "sr-only", children: ", completed" }))] }), _jsx("span", { className: "bg-ring/20 mt-auto mb-2.25 flex h-1 w-full group-first/step:rounded-s-full group-last/step:rounded-e-full", children: _jsx("span", { className: "flex flex-1 items-center justify-center rounded-full group-data-[state=active]/step:bg-blue-500", children: _jsx(StepperIndicator, { className: "bg-background data-[state=active]:bg-background data-[state=completed]:bg-background size-5.5" }) }) })] }), step < phases.length && (_jsx(StepperSeparator, { className: "bg-ring/20 pointer-events-none absolute end-0 top-0 bottom-7.25 m-0 my-auto w-[1.2px] translate-x-1/2 rotate-45 group-data-[orientation=horizontal]/stepper-nav:h-4.5 @max-lg:hidden rtl:-translate-x-1/2" }))] }, phase.title));
                }) }), _jsxs(StepperPanel, { className: "mt-6 text-center", children: [phases.map((phase, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsx("p", { className: "text-sm font-medium", children: phase.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: phase.summary })] }, phase.title))), _jsxs(StepperContent, { value: phases.length + 1, children: [_jsx("p", { className: "text-sm font-medium", children: "Case closed" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "The refund is settled and every action reviewed." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
