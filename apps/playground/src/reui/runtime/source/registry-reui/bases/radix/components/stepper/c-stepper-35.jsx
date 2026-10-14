"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Frame } from "../../reui/frame.jsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    { title: "Intake", description: "Collect the brief and key dates" },
    { title: "Structure", description: "Outline clauses and owners" },
    { title: "Draft", description: "Write the first full version" },
    { title: "Internal check", description: "Legal and finance review" },
    { title: "Negotiate", description: "Trade redlines with the counterparty" },
    { title: "Package", description: "Bundle and send the signed files" },
];
// The check and the spinner are drawn at 1.4px, so their strokes are raised
// from lucide's default (1px at 12px, 1.17px at 14px). The dashed circle
// keeps the default.
const indicators = {
    completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", strokeWidth: 2.8, className: "size-3", "aria-hidden": "true" })),
    loading: (_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", strokeWidth: 2.4, className: "size-3.5 motion-safe:animate-spin", "aria-hidden": "true" })),
    inactive: (_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiCheckboxBlankCircleLine", className: "size-3.5", "aria-hidden": "true" })),
};
export default function Pattern() {
    const [current, setCurrent] = useState(4);
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
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "flex w-full flex-col items-center", "aria-label": "Contract plan", children: [_jsx(Frame, { variant: "inverse", className: "border-input/50 w-full rounded-[min(var(--frame-radius),var(--radius-sm))] [--frame-panel-radius:min(var(--frame-radius),var(--radius-sm)_-_2px)] [--frame-px:--spacing(1)] [--frame-py:--spacing(1)]", children: _jsxs("div", { ref: rowRef, className: "@container relative flex gap-0.5 overflow-x-auto rounded-(--frame-panel-radius)", children: [_jsxs("span", { className: "bg-input text-foreground/70 flex shrink-0 items-center rounded-(--frame-panel-radius) px-1.5 text-xs font-medium whitespace-nowrap uppercase", children: ["Plan ", current - 1, "/", steps.length] }), _jsx(StepperNav, { className: "min-w-max flex-1", children: steps.map((item, index) => {
                                const step = index + 1;
                                // The primitive shows loading on the active step only, so every
                                // step carries the flag and the spinner follows the selection.
                                // Pulled back 6px, each 8px notch wraps the previous arrow with
                                // 2px between them. Folded steps hug their icon and the current
                                // one takes the rest; once every label is folded they share the
                                // width again.
                                return (_jsx(StepperItem, { step: step, loading: true, className: "flex-1 not-first:-ms-1.5 @max-3xl:not-data-[state=active]:flex-none @max-sm:not-data-[state=active]:flex-1", children: _jsx(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, className: "bg-input/40 text-muted-foreground data-[state=completed]:bg-input/60 data-[state=completed]:text-foreground/70 h-6 flex-1 rounded-none px-3 [--arrow:--spacing(2)] [--notch:--spacing(2)] [clip-path:polygon(calc(var(--notch)*0.28)_0,calc(100%_-_var(--arrow)*1.268)_0,calc(100%_-_var(--arrow)*1.032)_1.97%,calc(100%_-_var(--arrow)*0.852)_7.42%,calc(100%_-_var(--arrow)*0.185)_40.75%,calc(100%_-_var(--arrow)*0.101)_50%,calc(100%_-_var(--arrow)*0.185)_59.25%,calc(100%_-_var(--arrow)*0.852)_92.58%,calc(100%_-_var(--arrow)*1.032)_98.03%,calc(100%_-_var(--arrow)*1.268)_100%,calc(var(--notch)*0.28)_100%,calc(var(--notch)*0.148)_97.36%,calc(var(--notch)*0.155)_92.23%,calc(var(--notch)*0.815)_59.25%,calc(var(--notch)*0.899)_50%,calc(var(--notch)*0.815)_40.75%,calc(var(--notch)*0.155)_7.77%,calc(var(--notch)*0.148)_2.64%)] group-first/step:rounded-s-(--frame-panel-radius) group-first/step:ps-1 group-first/step:[--notch:0px] group-last/step:rounded-e-(--frame-panel-radius) group-last/step:ps-2.5 group-last/step:pe-1.5 group-last/step:[--arrow:0px] data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-900 rtl:[clip-path:polygon(calc(100%_-_var(--notch)*0.28)_0,calc(var(--arrow)*1.268)_0,calc(var(--arrow)*1.032)_1.97%,calc(var(--arrow)*0.852)_7.42%,calc(var(--arrow)*0.185)_40.75%,calc(var(--arrow)*0.101)_50%,calc(var(--arrow)*0.185)_59.25%,calc(var(--arrow)*0.852)_92.58%,calc(var(--arrow)*1.032)_98.03%,calc(var(--arrow)*1.268)_100%,calc(100%_-_var(--notch)*0.28)_100%,calc(100%_-_var(--notch)*0.148)_97.36%,calc(100%_-_var(--notch)*0.155)_92.23%,calc(100%_-_var(--notch)*0.815)_59.25%,calc(100%_-_var(--notch)*0.899)_50%,calc(100%_-_var(--notch)*0.815)_40.75%,calc(100%_-_var(--notch)*0.155)_7.77%,calc(100%_-_var(--notch)*0.148)_2.64%)] dark:data-[state=active]:text-blue-400", children: _jsxs("span", { className: "ring-ring flex items-center gap-1 rounded-full px-1 py-0.5 group-last/step:gap-1.5 in-focus-visible:ring-2", children: [_jsx(StepperIndicator, { className: "size-3.5 bg-transparent text-current data-[state=active]:bg-transparent data-[state=active]:text-current data-[state=completed]:size-3 data-[state=completed]:bg-transparent data-[state=completed]:text-current" }), _jsx(StepperTitle, { className: "whitespace-nowrap @max-3xl:not-data-[state=active]:sr-only @max-sm:sr-only", children: item.title }), step <= current && (_jsx("span", { className: "sr-only", children: step < current ? ", done" : ", in progress" }))] }) }) }, item.title));
                            }) })] }) }), _jsxs(StepperPanel, { className: "mt-6 text-center", children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Step ", index + 1, " of ", steps.length] }), _jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.description })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", steps.length, " steps done"] }), _jsx("p", { className: "text-sm font-medium", children: "Contract ready" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Every step is done and the contract is ready to sign." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
