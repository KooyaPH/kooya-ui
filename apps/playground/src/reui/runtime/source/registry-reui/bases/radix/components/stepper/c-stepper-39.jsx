"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { IconTile } from "../../reui/icon-tile.jsx";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Resolution",
        detail: "Choose between a rollback, a scale-out or a hotfix.",
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
        detail: "Write up the timeline, root cause and follow-ups.",
        icon: (_jsx(IconPlaceholder, { lucide: "ScrollTextIcon", tabler: "IconScript", hugeicons: "ScrollIcon", phosphor: "ScrollIcon", remixicon: "RiFileListLine" })),
    },
];
const completed = (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-2.5", "aria-hidden": "true" }));
export default function Pattern() {
    // The primitive derives tab ids from the step number alone and points
    // aria-controls at a panel nothing renders, so both are scoped here.
    const id = useId();
    const panelId = `${id}-panel`;
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
    return (_jsx(Stepper, { value: current, onValueChange: setCurrent, orientation: "vertical", indicators: { completed }, className: "@container w-full max-w-xl pt-2", "aria-label": "Incident resolution", children: _jsxs("div", { className: "flex flex-col gap-6 @md:flex-row @md:items-start", children: [_jsx(Frame, { spacing: "xs", className: "w-full max-w-60 shrink-0 border-0 bg-transparent p-0", children: _jsx(StepperNav, { className: "gap-2", children: steps.map((item, index) => {
                            const step = index + 1;
                            const done = step < current;
                            return (_jsxs(StepperItem, { step: step, className: "relative isolate", children: [_jsx(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, id: `${id}-tab-${step}`, "aria-controls": panelId, asChild: true, className: "hover:border-ring/60 data-[state=active]:border-ring/50 data-[state=active]:bg-input/20 data-[state=completed]:border-success data-[state=completed]:from-success/5 data-[state=completed]:to-success/5 w-full gap-2 rounded-(--frame-panel-radius) px-2.5 shadow-none data-[state=completed]:bg-linear-to-b", children: _jsxs(FramePanel, { children: [_jsx(IconTile, { variant: done ? "solid" : "outline", size: "xs", className: cn("shadow-xs [--icon-tile-size:--spacing(7)]", done
                                                        ? "bg-success border border-white/15 text-white"
                                                        : "border-ring/30"), "aria-hidden": "true", children: item.icon }), _jsxs("div", { className: "flex min-w-0 flex-col", children: [_jsx(StepperTitle, { className: "data-[state=completed]:text-success-foreground dark:data-[state=completed]:text-success truncate leading-5", children: item.title }), _jsxs(StepperDescription, { className: "truncate text-xs", children: ["Step ", step] }), done && _jsx("span", { className: "sr-only", children: ", completed" })] })] }) }), _jsx(StepperIndicator, { className: "data-[state=completed]:bg-success pointer-events-none absolute end-[calc(max(0px,var(--frame-panel-radius))*0.4-0.4375rem)] top-[calc(max(0px,var(--frame-panel-radius))*0.1-0.4375rem)] z-10 size-3.5 border border-white/8 shadow-sm not-data-[state=completed]:hidden data-[state=completed]:text-white" })] }, item.title));
                        }) }) }), _jsx(Separator, { "aria-hidden": "true", className: "@md:hidden" }), _jsx(Separator, { "aria-hidden": "true", orientation: "vertical", className: "hidden @md:block" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-3 text-start", children: [_jsxs(StepperPanel, { children: [steps.map((item, index) => (_jsx(StepperContent, { value: index + 1, children: _jsxs("div", { id: panelId, children: [_jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.detail })] }) }, item.title))), _jsx(StepperContent, { value: steps.length + 1, children: _jsxs("div", { id: panelId, children: [_jsx("p", { className: "text-sm font-medium", children: "Incident resolved" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Every step is done and the incident closed." })] }) })] }), _jsxs("div", { className: "flex justify-start gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }) }));
}
