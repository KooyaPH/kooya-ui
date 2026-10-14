"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    { title: "Account", description: "Create your login" },
    { title: "Workspace", description: "Name your workspace" },
    { title: "Team", description: "Invite your teammates" },
    { title: "Billing", description: "Choose a plan" },
    { title: "Review", description: "Confirm and launch" },
];
function Pending() {
    return (_jsx("span", { className: "bg-ring/80 flex size-3 items-center justify-center rounded-full text-white", children: _jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiCheckboxBlankCircleLine", className: "size-2", "aria-hidden": "true" }) }));
}
// The current step trades its solid ring for a dashed track with a 2px green
// arc spinning over it, inset so the arc stays inside the box and 1px clear
// of the dot. pathLength={44} counts the ring as 44 units, so the track closes
// in eleven 3+1 dashes at any size; only the arc moves.
function Current() {
    return (_jsxs("span", { className: "relative flex size-4 items-center justify-center", children: [_jsxs("svg", { viewBox: "0 0 16 16", fill: "none", strokeWidth: "1", "aria-hidden": "true", className: "absolute inset-0 size-full", children: [_jsx("circle", { cx: "8", cy: "8", r: "7", pathLength: 44, strokeDasharray: "3 1", className: "stroke-ring/50" }), _jsx("circle", { cx: "8", cy: "8", r: "7", pathLength: 44, strokeWidth: "2", strokeLinecap: "round", strokeDasharray: "15 29", className: "stroke-success origin-center motion-safe:animate-spin" })] }), _jsx("span", { className: "bg-ring/80 size-2.5 rounded-full" })] }));
}
// The 16px ring keeps a transparent fill and the 12px dot inside it carries
// the state color, so the 1px gap between them shows whatever surface is behind.
const indicators = {
    completed: (_jsx("span", { className: "bg-success flex size-3 items-center justify-center rounded-full text-white", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-2.5", "aria-hidden": "true" }) })),
    inactive: _jsx(Pending, {}),
    loading: _jsx(Current, {}),
};
export default function Pattern() {
    const [current, setCurrent] = useState(4);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // One past the last step marks every step complete. No tab is selected
    // then, so the last one keeps the tablist's tab stop.
    const allDone = current > steps.length;
    function goTo(step) {
        setCurrent(step);
        // The pressed button disables itself at either end, so focus moves to its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > steps.length)
            prevRef.current?.focus();
    }
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "max-w-60 space-y-6", "aria-label": "Workspace setup", children: [_jsx(StepperNav, { children: steps.map((item, index) => {
                    const step = index + 1;
                    // The primitive shows loading on the active step only, so every
                    // step carries the flag, the spinner follows the selection and
                    // `indicators` needs no `active` entry.
                    return (_jsxs(StepperItem, { step: step, loading: true, children: [_jsx(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, "aria-label": `Step ${step}: ${item.title}`, className: "relative after:absolute after:-inset-1", children: _jsx(StepperIndicator, { className: "border-ring/80 data-[state=completed]:border-success size-4 border bg-transparent data-[state=active]:border-0 data-[state=active]:bg-transparent data-[state=completed]:bg-transparent" }) }), step < steps.length && (_jsx(StepperSeparator, { className: cn("from-ring/80 to-ring/80 data-[state=completed]:from-success bg-transparent bg-linear-to-r to-70% mask-[radial-gradient(circle_closest-side,#000_90%,transparent)] mask-size-[0.375rem_0.1875rem] mask-repeat-space group-data-[orientation=horizontal]/stepper-nav:h-0.75 rtl:bg-linear-to-l", step + 1 < current
                                    ? "to-success"
                                    : "data-[state=completed]:to-ring") }))] }, item.title));
                }) }), _jsxs(StepperPanel, { className: "text-center", children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Step ", index + 1, " of ", steps.length] }), _jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.description })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", steps.length, " steps done"] }), _jsx("p", { className: "text-sm font-medium", children: "Workspace ready" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Setup is complete and your team can sign in." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
