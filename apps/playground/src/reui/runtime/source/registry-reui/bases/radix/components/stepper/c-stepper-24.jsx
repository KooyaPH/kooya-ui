"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { IconTile } from "../../reui/icon-tile.jsx";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Choose Resolution",
        description: "Pick one of the resolution options",
        detail: "Comparing 3 fixes by risk and time to recover.",
        icon: (_jsx(IconPlaceholder, { lucide: "ListChecksIcon", tabler: "IconListCheck", hugeicons: "CheckListIcon", phosphor: "ListChecksIcon", remixicon: "RiListCheck" })),
    },
    {
        title: "Execute Resolution",
        description: "Verify details and proceed",
        detail: "Rolling back api-gateway to v2.14.1 on 6 pods.",
        icon: (_jsx(IconPlaceholder, { lucide: "WorkflowIcon", tabler: "IconSitemap", hugeicons: "WorkflowCircle01Icon", phosphor: "TreeStructureIcon", remixicon: "RiFlowChart" })),
    },
    {
        title: "Verify Outcome",
        description: "Confirm the issue is resolved",
        detail: "Watching error rate and latency for 10 minutes.",
        icon: (_jsx(IconPlaceholder, { lucide: "ClipboardCheckIcon", tabler: "IconClipboardCheck", hugeicons: "TaskDone02Icon", phosphor: "ClipboardTextIcon", remixicon: "RiClipboardLine" })),
    },
    {
        title: "Resolution Summary",
        description: "View actions taken",
        detail: "Writing up the timeline and every action taken.",
        icon: (_jsx(IconPlaceholder, { lucide: "ScrollTextIcon", tabler: "IconScript", hugeicons: "ScrollIcon", phosphor: "ScrollIcon", remixicon: "RiFileTextLine" })),
    },
];
const completed = (_jsxs("span", { className: "border-success bg-success/10 text-success flex size-4 items-center justify-center rounded-full border", children: [_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3", "aria-hidden": "true" }), _jsx("span", { className: "sr-only", children: "Completed" })] }));
// A repeating conic mask cuts the ring into eleven dashes at the design's 3:1
// rhythm. The stroke overhangs the 14px box by half its width, so it centers
// on the box as the design's does. The spinner is a 139deg arc over it that
// holds still under reduced motion, where it reads as the design's static arc.
function Ring({ spin = false }) {
    return (_jsxs("span", { className: "relative block size-3.5", children: [_jsx("span", { className: "border-ring/50 absolute -inset-[0.8px] rounded-full border-[1.6px] mask-[repeating-conic-gradient(from_36deg,#000_0_calc(270deg/11),transparent_0_calc(360deg/11))]" }), spin && (_jsxs(_Fragment, { children: [_jsx("span", { className: "absolute -inset-[0.8px] rounded-full border-[1.6px] border-blue-500 mask-[conic-gradient(from_-28deg,#000_139deg,transparent_0)] motion-safe:animate-spin" }), _jsx("span", { className: "sr-only", children: "In progress" })] }))] }));
}
const indicators = { completed, inactive: _jsx(Ring, {}), loading: _jsx(Ring, { spin: true }) };
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
    return (_jsx(Stepper, { value: current, onValueChange: setCurrent, orientation: "vertical", indicators: indicators, className: "max-w-115", "aria-label": "Incident resolution", children: _jsxs("div", { className: "flex flex-col gap-6", children: [_jsx(StepperNav, { className: "w-full", children: _jsx(Frame, { variant: "ghost", spacing: "xs", stacked: true, children: steps.map((item, index) => (
                        // The trigger sits inside the padding, so the panel paints the
                        // hover, selected and focus states for the whole row.
                        _jsx(FramePanel, { className: "hover:bg-muted has-data-[state=active]:bg-muted has-focus-visible:ring-ring/50 has-focus-visible:ring-3 has-focus-visible:ring-inset", children: _jsx(StepperItem, { step: index + 1, loading: true, children: _jsxs(StepperTrigger, { tabIndex: allDone && index + 1 === steps.length ? 0 : undefined, className: "w-full gap-2 text-start after:absolute after:inset-0 focus-visible:ring-0", children: [_jsx(IconTile, { variant: "frame", size: "sm", className: "bg-input/50 text-muted-foreground group-data-[state=active]/step:bg-input group-data-[state=completed]/step:bg-success/20 after:border-ring/30 after:bg-background group-data-[state=completed]/step:after:bg-success border-transparent [--icon-tile-icon-size:--spacing(3.5)] [--icon-tile-size:--spacing(8.5)] group-data-[state=active]/step:text-blue-500 group-data-[state=completed]/step:text-white after:shadow-sm group-data-[state=completed]/step:after:border-white/8", "aria-hidden": "true", children: item.icon }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [_jsx(StepperTitle, { children: item.title }), _jsx(StepperDescription, { className: "text-xs", children: item.description })] }), _jsx(StepperIndicator, { className: "size-3.5 overflow-visible bg-transparent data-[state=active]:bg-transparent data-[state=completed]:size-4 data-[state=completed]:bg-transparent" })] }) }) }, item.title))) }) }), _jsxs("div", { className: "flex flex-col gap-3 text-start", children: [_jsxs(StepperPanel, { children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Step ", index + 1, " of ", steps.length] }), _jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.detail })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", steps.length, " steps done"] }), _jsx("p", { className: "text-sm font-medium", children: "Incident resolved" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Every step is complete and the case can close." })] })] }), _jsxs("div", { className: "flex justify-start gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }) }));
}
