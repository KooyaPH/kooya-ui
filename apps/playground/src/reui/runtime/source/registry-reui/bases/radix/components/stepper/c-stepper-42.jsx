"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
const steps = [
    {
        title: "Resolution Planning",
        detail: "Hotfix chosen over a rollback, with an owner per service.",
    },
    {
        title: "Scope Alignment",
        detail: "Checkout and payments are in scope, search waits a sprint.",
    },
    {
        title: "Implementation",
        detail: "Rolling the patch out to 6 pods behind a feature flag.",
    },
    {
        title: "Outcome Verification",
        detail: "Watching error rate and p95 latency for 30 minutes.",
    },
    {
        title: "Final Summary",
        detail: "Root cause, timeline and follow-ups for the postmortem.",
    },
];
// The step in progress splits its 40px bar into four 8px dashes.
const active = (_jsx("span", { className: "flex h-10 flex-col justify-between", children: [1, 2, 3, 4].map((dash) => (_jsx("span", { className: "h-2 w-0.5 rounded-full bg-blue-500" }, dash))) }));
export default function Pattern() {
    const [current, setCurrent] = useState(2);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // One past the last step marks every step complete. No tab is selected
    // then, so the last one keeps the tablist's tab stop.
    const allDone = current > steps.length;
    function goTo(step) {
        setCurrent(step);
        // The pressed button disables itself at either end, so focus moves to
        // its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > steps.length)
            prevRef.current?.focus();
    }
    // Side by side from 28rem, which leaves 13rem beside the 13rem steps for
    // the text and the Previous and Next row. Below that both stack in the
    // same 13rem column.
    return (_jsx(Stepper, { value: current, onValueChange: setCurrent, orientation: "vertical", indicators: { active }, className: "@container mx-auto max-w-lg", "aria-label": "Incident resolution", children: _jsxs("div", { className: "mx-auto flex max-w-52 flex-col gap-6 @md:max-w-none @md:flex-row @md:items-start", children: [_jsx(StepperNav, { className: "w-full gap-3 @md:w-52 @md:shrink-0", children: steps.map((item, index) => {
                        const step = index + 1;
                        return (_jsx(StepperItem, { step: step, className: "items-stretch", children: _jsxs(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, className: "gap-1.5 focus-visible:ring-0", children: [_jsx(StepperIndicator, { className: "bg-input data-[state=completed]:bg-success h-10 w-0.5 data-[state=active]:bg-transparent" }), _jsxs("div", { className: "ring-ring/50 flex min-w-0 flex-col justify-center self-stretch rounded-full px-2.5 text-start in-focus-visible:ring-3", children: [_jsx(StepperTitle, { className: "data-[state=inactive]:text-muted-foreground truncate leading-5", children: item.title }), _jsxs(StepperDescription, { className: "text-xs whitespace-nowrap", children: ["Step ", step] }), step < current && (_jsx("span", { className: "sr-only", children: ", completed" }))] })] }) }, item.title));
                    }) }), _jsx(Separator, { "aria-hidden": "true", className: "@md:hidden" }), _jsx(Separator, { "aria-hidden": "true", orientation: "vertical", className: "hidden @md:block" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-3 text-start", children: [_jsxs(StepperPanel, { children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Step ", index + 1, " of ", steps.length] }), _jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm text-pretty", children: item.detail })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", steps.length, " steps done"] }), _jsx("p", { className: "text-sm font-medium", children: "Incident resolved" }), _jsx("p", { className: "text-muted-foreground text-sm text-pretty", children: "The final summary is shared and the incident closed." })] })] }), _jsxs("div", { className: "flex justify-start gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }) }));
}
