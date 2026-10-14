"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Frame } from "../../reui/frame.jsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    { title: "Intake", description: "Log the brief, scope and deadline." },
    { title: "Structure", description: "Outline the sections and name owners." },
    { title: "Kick-off", description: "Brief writers on tone and timeline." },
    { title: "Draft", description: "Write a first pass of every section." },
    { title: "Consolidate", description: "Merge sections into one voice." },
    { title: "Internal check", description: "Legal and finance review terms." },
    { title: "Negotiate", description: "Settle open terms with procurement." },
    { title: "Package", description: "Export, sign and send the proposal." },
];
// The step in progress adds a center dot and spins the dashed ring around it.
function Ring({ active = false }) {
    return (_jsxs("span", { className: "relative flex items-center justify-center", children: [_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiCheckboxBlankCircleLine", className: cn("size-3.5", active && "motion-safe:animate-spin"), "aria-hidden": "true" }), active && _jsx("span", { className: "absolute size-1/6 rounded-full bg-current" })] }));
}
const indicators = {
    completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5", "aria-hidden": "true" })),
    inactive: _jsx(Ring, {}),
    loading: _jsx(Ring, { active: true }),
};
// A chevron cut from its box: --notch bites into the start edge and --arrow
// points out of the end edge, and --stretch scales both (as --n and --a) for a
// taller copy whose edges stay parallel. Every corner is rounded, so the clip
// traces each with three points, both ends of the curve and its middle; an end
// with no depth collapses them onto a straight edge. The shape mirrors whole in
// RTL, which is why its outer corners round the physical left and right.
function Chevron({ className }) {
    return (_jsx("span", { "aria-hidden": "true", className: cn("absolute -z-10 [--a:calc(var(--arrow)*var(--stretch,1))] [--n:calc(var(--notch)*var(--stretch,1))] [clip-path:polygon(calc(var(--n)*0.26)_0,calc(100%_-_var(--a)*1.29)_0,calc(100%_-_var(--a)*1.04)_calc(var(--a)*0.07),calc(100%_-_var(--a)*0.86)_calc(var(--a)*0.25),calc(100%_-_var(--a)*0.14)_calc(50%_-_var(--a)*0.25),calc(100%_-_var(--a)*0.08)_50%,calc(100%_-_var(--a)*0.14)_calc(50%_+_var(--a)*0.25),calc(100%_-_var(--a)*0.86)_calc(100%_-_var(--a)*0.25),calc(100%_-_var(--a)*1.04)_calc(100%_-_var(--a)*0.07),calc(100%_-_var(--a)*1.29)_100%,calc(var(--n)*0.26)_100%,calc(var(--n)*0.13)_calc(100%_-_var(--n)*0.07),calc(var(--n)*0.13)_calc(100%_-_var(--n)*0.22),calc(var(--n)*0.86)_calc(50%_+_var(--n)*0.25),calc(var(--n)*0.92)_50%,calc(var(--n)*0.86)_calc(50%_-_var(--n)*0.25),calc(var(--n)*0.13)_calc(var(--n)*0.22),calc(var(--n)*0.13)_calc(var(--n)*0.07))] rtl:-scale-x-100", className) }));
}
export default function Pattern() {
    const [current, setCurrent] = useState(6);
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
        // The pressed button disables itself at either end, so focus moves to
        // its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > steps.length)
            prevRef.current?.focus();
    }
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "@container flex flex-col items-center gap-6", "aria-label": "Proposal workflow", children: [_jsx(Frame, { ref: rowRef, variant: "inverse", className: "border-input/50 relative max-w-full overflow-x-auto rounded-[min(var(--frame-radius),var(--radius-sm))] [--frame-panel-radius:min(var(--frame-radius),var(--radius-sm)_-_2px)] [--frame-px:--spacing(1)] [--frame-py:--spacing(1)]", children: _jsx(StepperNav, { className: "min-w-max gap-1", children: steps.map((item, index) => {
                        const step = index + 1;
                        // The primitive shows loading on the active step only, so every
                        // step carries the flag and the spinner follows the selection.
                        // Steps hug their labels rather than share out the row.
                        return (_jsx(StepperItem, { step: step, loading: true, className: "not-last:flex-none", children: _jsxs(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, className: "data-[state=completed]:text-success-foreground dark:data-[state=completed]:text-success relative isolate h-7 gap-1.5 ps-1.5 pe-4 [--arrow:--spacing(2)] [--notch:--spacing(2)] group-first/step:ps-2 group-first/step:[--notch:0px] group-last/step:pe-2.5 group-last/step:[--arrow:0px] focus-visible:ring-0 data-[state=active]:text-white", children: [_jsx(Chevron, { className: "bg-ring/50 -inset-y-0.5 -start-[calc(var(--notch)*var(--stretch)+--spacing(0.5))] -end-0.5 hidden [--stretch:8/7] group-first/step:rounded-l-[calc(var(--frame-panel-radius)+--spacing(0.5))] group-last/step:rounded-r-[calc(var(--frame-panel-radius)+--spacing(0.5))] in-focus-visible:block" }), _jsx(Chevron, { className: "bg-background after:bg-input/40 group-data-[state=completed]/step:after:bg-success/20 inset-y-0 -start-(--notch) end-0 overflow-hidden group-first/step:rounded-l-(--frame-panel-radius) group-last/step:rounded-r-(--frame-panel-radius) after:absolute after:inset-0 group-data-[state=active]/step:after:bg-blue-500" }), _jsx(StepperIndicator, { className: "size-3.5 bg-transparent text-current data-[state=active]:bg-transparent data-[state=active]:text-current data-[state=completed]:bg-transparent data-[state=completed]:text-current" }), _jsx(StepperTitle, { className: "whitespace-nowrap @max-4xl:not-data-[state=active]:sr-only @max-sm:sr-only", children: item.title }), step < current && (_jsx("span", { className: "sr-only", children: ", completed" }))] }) }, item.title));
                    }) }) }), _jsxs(StepperPanel, { className: "text-center", children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Step ", index + 1, " of ", steps.length] }), _jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.description })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", steps.length, " steps done"] }), _jsx("p", { className: "text-sm font-medium", children: "Proposal sent" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "The packaged proposal is out with the client." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
