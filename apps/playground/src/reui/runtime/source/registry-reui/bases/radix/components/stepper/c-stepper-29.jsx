"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Registration",
        description: "Account created and start date confirmed.",
    },
    {
        title: "Paperwork",
        description: "Tax forms, direct deposit and ID checked.",
    },
    {
        title: "Store Tour",
        description: "Walk the floor and stockroom with your manager.",
    },
    {
        title: "Job Training",
        description: "Register, returns and safety modules, about 2 hours.",
    },
    {
        title: "First Shift",
        description: "Saturday from 9:00 AM, paired with a team buddy.",
    },
];
// The design draws the 10px check with a 1.4px line: 3.36 on a 24-unit grid.
// stroke-[3.36] repeats it as CSS, which beats the svg's own stroke-width
// attribute, so the weight holds where a wrapper does not forward the prop.
const completed = (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", strokeWidth: 3.36, className: "size-2.5 stroke-[3.36]", "aria-hidden": "true" }));
// pathLength counts the circle as 28 units, so the 3:1 dash pattern closes
// in seven even dashes instead of leaving a stub at the seam.
function DashedRing({ spin = false }) {
    return (_jsx("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: cn("size-4", spin && "motion-safe:animate-spin"), children: _jsx("circle", { cx: "8", cy: "8", r: "4.5", stroke: "currentColor", strokeWidth: "1.6", strokeDasharray: "3 1", pathLength: 28 }) }));
}
const indicators = {
    completed,
    inactive: _jsx(DashedRing, {}),
    loading: _jsx(DashedRing, { spin: true }),
};
export default function Pattern() {
    const [current, setCurrent] = useState(3);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // One past the last step marks every step complete. No tab is selected
    // then, so the last one keeps the tablist's tab stop.
    const allDone = current > steps.length;
    // Past the collapsed width (many steps in a small box) the row scrolls, so
    // the current step comes back into view when it changes or the row resizes,
    // and a tab comes into view when focus lands on it (the browser leaves a
    // half-hidden one where it is). Only the row scrolls, never the page.
    const rowRef = useRef(null);
    useEffect(() => {
        const row = rowRef.current;
        if (!row)
            return;
        const reveal = (tab) => {
            if (!tab)
                return;
            const box = row.getBoundingClientRect();
            const { left, right } = tab.getBoundingClientRect();
            if (left < box.left || right > box.right) {
                row.scrollLeft += (left + right - box.left - box.right) / 2;
            }
        };
        const onFocus = (event) => reveal(event.target.closest('[role="tab"]'));
        const observer = new ResizeObserver(() => reveal(row.querySelector('[aria-selected="true"]')));
        observer.observe(row);
        row.addEventListener("focusin", onFocus);
        return () => {
            observer.disconnect();
            row.removeEventListener("focusin", onFocus);
        };
    }, [current]);
    function goTo(step) {
        setCurrent(step);
        // The pressed button disables itself at either end, so focus moves to its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > steps.length)
            prevRef.current?.focus();
    }
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "flex max-w-200 flex-col gap-6", "aria-label": "New hire onboarding", children: [_jsx("div", { ref: rowRef, className: "@container relative -mx-1 -my-2 overflow-x-auto p-2", children: _jsx(StepperNav, { className: "min-w-max gap-1", children: steps.map((item, index) => {
                        const step = index + 1;
                        // The primitive shows loading on the active step only, so every
                        // step carries the flag and the ring spins on the current one.
                        return (_jsxs(StepperItem, { step: step, loading: true, className: "gap-1.5", children: [_jsxs(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, className: "-m-1 gap-1.5 p-1", children: [_jsx(StepperIndicator, { className: "bg-ring/20 text-ring/50 size-4 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=completed]:bg-blue-500 data-[state=completed]:text-white" }), _jsx(StepperTitle, { className: "data-[state=inactive]:text-muted-foreground whitespace-nowrap @max-2xl:not-data-[state=active]:sr-only", children: item.title }), step < current && (_jsx("span", { className: "sr-only", children: ", completed" }))] }), step < steps.length && (_jsx(StepperSeparator, { className: "to-ring/20 data-[state=inactive]:from-ring/20 m-0 min-w-6 bg-transparent bg-linear-to-r from-blue-500 data-[state=completed]:to-blue-500 rtl:bg-linear-to-l" }))] }, item.title));
                    }) }) }), _jsxs(StepperPanel, { className: "text-center", children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Step ", index + 1, " of ", steps.length] }), _jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.description })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", steps.length, " steps done"] }), _jsx("p", { className: "text-sm font-medium", children: "Onboarding complete" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Welcome to the team." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
