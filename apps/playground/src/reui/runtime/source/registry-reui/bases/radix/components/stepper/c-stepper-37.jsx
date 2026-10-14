"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { IconTile } from "../../reui/icon-tile.jsx";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Resolution",
        detail: "Choose a fix: roll back, scale out or patch forward.",
        icon: (_jsx(IconPlaceholder, { lucide: "ListChecksIcon", tabler: "IconListCheck", hugeicons: "CheckListIcon", phosphor: "ListChecksIcon", remixicon: "RiListCheck" })),
    },
    {
        title: "Execute",
        detail: "Roll api-gateway back to v2.14.1 across 6 pods.",
        icon: (_jsx(IconPlaceholder, { lucide: "WorkflowIcon", tabler: "IconSitemap", hugeicons: "WorkflowCircle01Icon", phosphor: "TreeStructureIcon", remixicon: "RiFlowChart" })),
    },
    {
        title: "Verify",
        detail: "Watch error rate and p95 latency for 10 minutes.",
        icon: (_jsx(IconPlaceholder, { lucide: "ClipboardCheckIcon", tabler: "IconClipboardCheck", hugeicons: "TaskDone02Icon", phosphor: "ClipboardTextIcon", remixicon: "RiClipboardLine" })),
    },
    {
        title: "Summary",
        detail: "Record the timeline, root cause and follow-ups.",
        icon: (_jsx(IconPlaceholder, { lucide: "ScrollTextIcon", tabler: "IconScript", hugeicons: "ScrollIcon", phosphor: "ScrollIcon", remixicon: "RiFileListLine" })),
    },
];
const completed = (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-2.5", "aria-hidden": "true" }));
export default function Pattern() {
    const [current, setCurrent] = useState(2);
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
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, indicators: { completed }, className: "@container flex max-w-150 flex-col gap-6 pt-2", "aria-label": "Incident resolution", children: [_jsx(Frame, { spacing: "xs", className: "border-0 bg-transparent p-0", children: _jsx(StepperNav, { className: "grid grid-cols-2 gap-2 @xl:grid-cols-4", children: steps.map((item, index) => {
                        const step = index + 1;
                        const done = step < current;
                        return (_jsx(StepperItem, { step: step, className: "isolate", children: _jsx(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, asChild: true, className: "hover:border-ring/60 data-[state=active]:border-ring/50 data-[state=active]:bg-input/20 data-[state=completed]:border-success data-[state=completed]:from-success/5 data-[state=completed]:to-success/5 min-w-0 gap-2 overflow-visible rounded-(--frame-panel-radius) px-2.5 shadow-none data-[state=completed]:bg-linear-to-b", children: _jsxs(FramePanel, { children: [_jsx(IconTile, { variant: done ? "solid" : "outline", size: "xs", className: cn("shadow-xs [--icon-tile-size:--spacing(7)]", done
                                                ? "bg-success text-white ring-1 ring-white/15"
                                                : "border-ring/30"), "aria-hidden": "true", children: item.icon }), _jsxs("div", { className: "flex min-w-0 flex-col", children: [_jsx(StepperTitle, { className: "data-[state=completed]:text-success-foreground dark:data-[state=completed]:text-success truncate leading-5", children: item.title }), _jsxs(StepperDescription, { className: "truncate text-xs", children: ["Step ", step] }), done && _jsx("span", { className: "sr-only", children: ", completed" })] }), _jsx(StepperIndicator, { className: "data-[state=completed]:bg-success absolute end-[calc(max(0px,var(--frame-panel-radius))*0.4-8px)] top-[calc(max(0px,var(--frame-panel-radius))*0.2-9px)] size-3.5 shadow-sm ring-1 ring-white/8 not-data-[state=completed]:hidden data-[state=completed]:text-white" })] }) }) }, item.title));
                    }) }) }), _jsxs(StepperPanel, { className: "text-center", children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.detail })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsx("p", { className: "text-sm font-medium", children: "Incident resolved" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Every step is recorded and the incident closed." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
