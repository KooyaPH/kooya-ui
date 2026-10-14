"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { IconTile } from "../../reui/icon-tile.jsx";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Choose Resolution",
        detail: "Pick a fix: roll back, scale out or patch forward.",
        icon: (_jsx(IconPlaceholder, { lucide: "ListChecksIcon", tabler: "IconListCheck", hugeicons: "CheckListIcon", phosphor: "ListChecksIcon", remixicon: "RiListCheck" })),
    },
    {
        title: "Execute Resolution",
        detail: "Rolling back api-gateway to v2.14.1 across 6 pods.",
        icon: (_jsx(IconPlaceholder, { lucide: "WorkflowIcon", tabler: "IconSitemap", hugeicons: "WorkflowCircle01Icon", phosphor: "TreeStructureIcon", remixicon: "RiFlowChart" })),
    },
    {
        title: "Verify Outcome",
        detail: "Watching error rate and p95 latency for 10 minutes.",
        icon: (_jsx(IconPlaceholder, { lucide: "ClipboardCheckIcon", tabler: "IconClipboardCheck", hugeicons: "TaskDone02Icon", phosphor: "ClipboardTextIcon", remixicon: "RiClipboardLine" })),
    },
    {
        title: "Resolution Summary",
        detail: "Timeline, root cause and follow-ups for the postmortem.",
        icon: (_jsx(IconPlaceholder, { lucide: "ScrollTextIcon", tabler: "IconScript", hugeicons: "ScrollIcon", phosphor: "ScrollIcon", remixicon: "RiFileListLine" })),
    },
];
export default function Pattern() {
    const [current, setCurrent] = useState(2);
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
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, className: "flex max-w-4xl flex-col gap-6", "aria-label": "Incident resolution", children: [_jsx("div", { ref: rowRef, className: "@container relative -m-1 overflow-x-auto p-1", children: _jsx(StepperNav, { className: "flex min-w-max justify-center gap-4", children: steps.map((item, index) => {
                        const step = index + 1;
                        // Steps hug their content with 16px either side of each chevron,
                        // as drawn, instead of the primitive's flex-1 spread.
                        return (_jsxs(StepperItem, { step: step, className: "gap-4 not-last:flex-none", children: [_jsxs(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, className: "gap-2 focus-visible:ring-0", children: [_jsx(StepperIndicator, { className: "size-8.5 overflow-visible bg-transparent data-[state=active]:bg-transparent data-[state=completed]:bg-transparent", children: _jsx(IconTile, { variant: "frame", size: "sm", className: "bg-input/40 text-ring/80 after:bg-background after:border-ring/30 in-focus-visible:ring-ring/50 group-data-[state=active]/step:bg-input/60 group-data-[state=active]/step:text-foreground group-data-[state=completed]/step:bg-success/20 group-data-[state=completed]/step:after:bg-success border-transparent [--icon-tile-icon-size:--spacing(3.5)] [--icon-tile-size:--spacing(8.5)] group-data-[state=completed]/step:text-white after:shadow-sm group-data-[state=completed]/step:after:border-white/8 in-focus-visible:ring-3", "aria-hidden": "true", children: item.icon }) }), _jsxs("div", { className: "flex flex-col gap-1 text-start whitespace-nowrap @max-4xl:sr-only", children: [_jsx(StepperTitle, { className: "data-[state=inactive]:text-muted-foreground", children: item.title }), _jsxs(StepperDescription, { className: "text-xs", children: ["Step ", step] }), step < current && (_jsx("span", { className: "sr-only", children: ", completed" }))] })] }), step < steps.length && (_jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", className: "text-ring/80 size-3.5 shrink-0 rtl:rotate-180", "aria-hidden": "true" }))] }, item.title));
                    }) }) }), _jsxs(StepperPanel, { className: "text-center", children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.detail })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsx("p", { className: "text-sm font-medium", children: "Incident resolved" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "The postmortem is filed and the incident closed." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
