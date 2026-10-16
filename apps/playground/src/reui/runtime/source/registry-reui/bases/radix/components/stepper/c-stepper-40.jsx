"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Resolution",
        detail: "Pick the fix: roll api-gateway back to v2.14.1.",
        icon: (_jsx(IconPlaceholder, { lucide: "LightbulbIcon", tabler: "IconBulb", hugeicons: "Idea01Icon", phosphor: "LightbulbIcon", remixicon: "RiLightbulbLine", className: "size-3.5", "aria-hidden": "true" })),
    },
    {
        title: "Scoping",
        detail: "Limit the change to 6 pods in eu-west-1.",
        icon: (_jsx(IconPlaceholder, { lucide: "TargetIcon", tabler: "IconTarget", hugeicons: "Target01Icon", phosphor: "TargetIcon", remixicon: "RiFocus3Line", className: "size-3.5", "aria-hidden": "true" })),
    },
    {
        title: "Execution",
        detail: "Replace the pods one at a time.",
        icon: (_jsx(IconPlaceholder, { lucide: "WorkflowIcon", tabler: "IconSitemap", hugeicons: "WorkflowCircle01Icon", phosphor: "TreeStructureIcon", remixicon: "RiFlowChart", className: "size-3.5", "aria-hidden": "true" })),
    },
    {
        title: "Verification",
        detail: "Watch error rate and p95 latency for 10 min.",
        icon: (_jsx(IconPlaceholder, { lucide: "CheckSquareIcon", tabler: "IconCheckbox", hugeicons: "CheckmarkSquare02Icon", phosphor: "CheckSquareIcon", remixicon: "RiCheckboxLine", className: "size-3.5", "aria-hidden": "true" })),
    },
    {
        title: "Approval",
        detail: "The incident lead signs off on the fix.",
        icon: (_jsx(IconPlaceholder, { lucide: "ClockCheckIcon", tabler: "IconClockCheck", hugeicons: "ClockCheckIcon", phosphor: "ClockIcon", remixicon: "RiTimeLine", className: "size-3.5", "aria-hidden": "true" })),
    },
    {
        title: "Summary",
        detail: "Record the root cause and follow-ups.",
        icon: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-3.5", "aria-hidden": "true" })),
    },
];
const completed = (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-2.5", "aria-hidden": "true" }));
export default function Pattern() {
    const [current, setCurrent] = useState(3);
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
    return (_jsx("div", { className: "@container mx-auto w-full max-w-lg", children: _jsxs(Stepper, { value: current, onValueChange: setCurrent, orientation: "vertical", indicators: { completed }, className: "flex flex-col gap-6 @md:flex-row @md:items-start", "aria-label": "Incident workflow", children: [_jsx(Frame, { variant: "ghost", spacing: "xs", className: "w-full max-w-45 shrink-0 bg-transparent p-0 [--frame-panel-py-base:--spacing(1.5)]", children: _jsx(StepperNav, { className: "gap-1.5", children: steps.map((item, index) => {
                            const step = index + 1;
                            // Every row is a panel whose border stays transparent until it
                            // is active, so the selection moves without shifting a row, and
                            // gap-1.5 absorbs that border to keep the design's row pitch.
                            // 3px under the ghost panel radius lands on the drawn 8px. The
                            // theme has no blue token, so the active row takes blue-500.
                            return (_jsx(StepperItem, { step: step, children: _jsx(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, asChild: true, className: "text-muted-foreground hover:bg-muted/50 data-[state=active]:bg-muted/50 data-[state=completed]:text-foreground w-full gap-2 rounded-[calc(var(--frame-panel-radius)-3px)] border-transparent bg-transparent shadow-none data-[state=active]:border-(--frame-panel-border-color) data-[state=active]:text-blue-500", children: _jsxs(FramePanel, { children: [item.icon, _jsx(StepperTitle, { className: "min-w-0 flex-1 truncate leading-5", children: item.title }), step < current && (_jsx("span", { className: "sr-only", children: ", completed" })), _jsx(StepperIndicator, { className: "data-[state=completed]:bg-success size-3.5 not-data-[state=completed]:hidden data-[state=completed]:text-white" }), step === current && (_jsx("span", { "aria-hidden": "true", className: "pointer-events-none absolute start-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-e-full bg-blue-500" }))] }) }) }, item.title));
                        }) }) }), _jsx(Separator, { "aria-hidden": "true", className: "@md:hidden" }), _jsx(Separator, { "aria-hidden": "true", orientation: "vertical", className: "hidden @md:block" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-3 px-2.25 text-start @md:px-0", children: [_jsxs(StepperPanel, { children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Step ", index + 1, " of ", steps.length] }), _jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm text-pretty", children: item.detail })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", steps.length, " steps done"] }), _jsx("p", { className: "text-sm font-medium", children: "Incident closed" }), _jsx("p", { className: "text-muted-foreground text-sm text-pretty", children: "Approved and summarized, with every step done." })] })] }), _jsxs("div", { className: "flex justify-start gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }) }));
}
