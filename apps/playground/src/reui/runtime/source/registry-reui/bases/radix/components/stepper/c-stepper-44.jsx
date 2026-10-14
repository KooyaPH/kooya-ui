"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, useStepItem, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Collapsible, CollapsibleContent, } from "../../../../../../../adapters/navigation.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const phases = [
    {
        title: "Resolution Planning",
        tasks: ["Review Ticket", "Find Root Cause", "Draft Plan"],
    },
    {
        title: "Scope Alignment",
        tasks: ["Confirm Impact", "Agree on Scope", "Assign Owners"],
    },
    {
        title: "Implementation",
        tasks: [
            "Configure Solution",
            "Connect Systems",
            "Apply Changes",
            "Run Workflow",
            "Prepare Output",
        ],
    },
    {
        title: "Outcome Verification",
        tasks: ["Run Tests", "Validate Results", "Confirm with Customer"],
    },
    {
        title: "Final Summary",
        tasks: ["Write Summary", "Share Report", "Close Ticket"],
    },
];
// Every task in reading order, so Previous and Next walk straight across
// phase boundaries, then one stop past the final phase, where every phase
// and task reads complete.
const sequence = [
    ...phases.flatMap((phase, index) => phase.tasks.map((_, taskIndex) => ({
        phase: index + 1,
        task: taskIndex + 1,
    }))),
    { phase: phases.length + 1, task: 1 },
];
// The design draws its icons with a 1.2px line: 2.88 on the 24-unit grid of
// the 10px check, 1.44 on the 20px dashed circle. The *:stroke class repeats
// it on the paths, so the weight holds where a wrapper drops the prop.
function Completed({ className }) {
    return (_jsx("span", { className: cn("border-success bg-success/10 text-success flex items-center justify-center rounded-full border", className), children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", strokeWidth: 2.88, className: "size-2.5 *:stroke-[2.88]", "aria-hidden": "true" }) }));
}
function Pending({ className, strokeWidth, }) {
    return (_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiCheckboxBlankCircleLine", strokeWidth: strokeWidth, className: cn("text-ring/60", className), "aria-hidden": "true" }));
}
// A repeating conic mask cuts the track into dashes at the drawn 3:1 rhythm,
// and a blue-500 arc (the theme has no blue token) spins over it.
function Running({ className, track, arc, }) {
    return (_jsxs("span", { className: cn("relative block", className), children: [_jsx("span", { className: cn("border-ring/60 absolute inset-0 rounded-full border-[1.2px]", track) }), _jsx("span", { className: cn("absolute inset-0 rounded-full border-[1.2px] border-blue-500 motion-safe:animate-spin", arc) })] }));
}
// 16 dashes fit the 22px phase ring and 9 the 13px task ring, and each arc
// keeps its drawn sweep.
const phaseIndicators = {
    completed: _jsx(Completed, { className: "size-5" }),
    inactive: _jsx(Pending, { className: "size-5 *:stroke-[1.44]", strokeWidth: 1.44 }),
    loading: (_jsx(Running, { className: "size-5.5", track: "mask-[repeating-conic-gradient(#000_0_16.875deg,transparent_0_22.5deg)]", arc: "mask-[conic-gradient(from_-17deg,#000_152deg,transparent_0)]" })),
};
const taskIndicators = {
    completed: _jsx(Completed, { className: "size-3.5" }),
    inactive: _jsx(Pending, { className: "size-3.5" }),
    loading: (_jsx(Running, { className: "size-3.25", track: "mask-[repeating-conic-gradient(#000_0_30deg,transparent_0_40deg)]", arc: "mask-[conic-gradient(from_-28deg,#000_140deg,transparent_0)]" })),
};
// The rails are drawn in pieces that stop 2px short of each indicator, the
// gap the design cuts with a white ring. A painted ring would show as a halo
// on any surface that is not exactly the page background. The pieces cross
// the corners of each trigger's box, so they let clicks through.
const phaseSegment = "bg-input pointer-events-none absolute end-3 w-[1.2px] translate-x-1/2 rounded-full rtl:-translate-x-1/2";
const taskSegment = "bg-input pointer-events-none absolute end-2.25 w-px translate-x-1/2 rounded-full rtl:-translate-x-1/2";
const indicator = "bg-transparent data-[state=active]:bg-transparent data-[state=completed]:bg-transparent";
const stepTitle = "data-[state=inactive]:text-muted-foreground whitespace-nowrap";
// Reads the enclosing item's state, so what is announced cannot drift from
// the data-state the trigger is styled by.
function StepStatus() {
    const { state } = useStepItem();
    if (state === "inactive")
        return null;
    return (_jsx("span", { className: "sr-only", children: state === "completed" ? ", completed" : ", in progress" }));
}
export default function Pattern() {
    const id = useId();
    const [current, setCurrent] = useState(3);
    const [task, setTask] = useState(3);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const panelId = `${id}-panel`;
    const position = sequence.findIndex((stop) => stop.phase === current && stop.task === task);
    const last = sequence.length - 1;
    // No tab is selected once every phase is done, so the last phase keeps
    // the tablist's tab stop.
    const allDone = current > phases.length;
    // Reselecting the current phase keeps its progress; a newly chosen one
    // starts on its first task.
    function selectPhase(next) {
        if (next === current)
            return;
        setCurrent(next);
        setTask(1);
    }
    // Crossing into a neighboring phase opens it on its first or last task.
    function goTo(next) {
        setCurrent(sequence[next].phase);
        setTask(sequence[next].task);
        // The pressed button disables itself at either end, so focus moves to
        // its partner.
        if (next === 0)
            nextRef.current?.focus();
        if (next === last)
            prevRef.current?.focus();
    }
    // Side by side from 28rem, which leaves 11rem beside the 15rem stepper for
    // the text and the Previous and Next row. Below that the content stacks
    // under the stepper, end-aligned with its phase titles.
    return (_jsx(Stepper, { value: current, onValueChange: selectPhase, orientation: "vertical", indicators: phaseIndicators, className: "@container mx-auto max-w-lg", "aria-label": "Ticket resolution", children: _jsxs("div", { className: "mx-auto flex max-w-60 flex-col gap-6 @md:max-w-none @md:flex-row @md:items-start", children: [_jsx(StepperNav, { className: "flex @md:w-60 @md:shrink-0", children: phases.map((phase, index) => {
                        const step = index + 1;
                        const active = step === current;
                        // A phase folding away shows its tasks all done or all pending,
                        // never the live one, and ignores clicks on them.
                        const progress = active
                            ? task
                            : step < current
                                ? phase.tasks.length + 1
                                : 0;
                        // The primitive shows loading on the active step only, so every
                        // step carries the flag and the spinner follows the selection. A
                        // min height rather than padding holds the drawn 61px pitch, so an
                        // opening phase grows out of it without a jump.
                        return (_jsxs(StepperItem, { step: step, loading: true, className: "relative min-h-15.25 items-end justify-start last:min-h-0", children: [_jsx("span", { "aria-hidden": "true", className: cn(phaseSegment, "top-0", active ? "h-1.25" : "h-1.5") }), _jsx("span", { "aria-hidden": "true", className: cn(phaseSegment, "bottom-0", active ? "top-7.75" : "top-7.5") }), _jsxs(StepperTrigger, { tabIndex: allDone && step === phases.length ? 0 : undefined, id: `${id}-phase-${step}`, "aria-controls": panelId, className: "gap-2 text-end", children: [_jsxs("span", { className: "flex flex-col", children: [_jsx(StepperTitle, { className: cn(stepTitle, "leading-5"), children: phase.title }), _jsxs(StepperDescription, { className: "text-xs", children: ["Step ", step] })] }), _jsx(StepStatus, {}), _jsx(StepperIndicator, { className: indicator })] }), _jsx(Collapsible, { open: active, children: _jsx(CollapsibleContent, { className: "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden motion-reduce:animate-none", children: _jsx(Stepper, { value: progress, onValueChange: active ? setTask : undefined, orientation: "vertical", indicators: taskIndicators, "aria-label": `${phase.title} tasks`, children: _jsx(StepperNav, { className: "ms-1 me-7.5 mt-2 mb-2.5", children: phase.tasks.map((label, taskIndex) => {
                                                    const taskStep = taskIndex + 1;
                                                    return (_jsxs(StepperItem, { step: taskStep, loading: true, className: "relative items-end", children: [taskIndex > 0 && (_jsx("span", { "aria-hidden": "true", className: cn(taskSegment, "top-0 h-1.5") })), taskStep < phase.tasks.length && (_jsx("span", { "aria-hidden": "true", className: cn(taskSegment, "top-6 bottom-0") })), _jsxs(StepperTrigger, { id: `${id}-task-${step}-${taskStep}`, "aria-controls": panelId, className: "min-h-7.5 gap-1.5 text-end", children: [_jsx(StepperTitle, { className: cn(stepTitle, "font-normal"), children: label }), _jsx(StepStatus, {}), _jsx(StepperIndicator, { className: cn(indicator, "size-4.5") })] })] }, label));
                                                }) }) }) }) })] }, phase.title));
                    }) }), _jsx(Separator, { "aria-hidden": "true", className: "@md:hidden" }), _jsx(Separator, { "aria-hidden": "true", orientation: "vertical", className: "hidden @md:block" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-3 pe-8 text-end @md:pe-0 @md:text-start", children: [_jsxs(StepperPanel, { children: [phases.map((phase, index) => (_jsx(StepperContent, { value: index + 1, children: _jsxs("div", { id: panelId, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Task ", task, " of ", phase.tasks.length] }), _jsx("p", { className: "text-sm font-medium", children: phase.tasks[task - 1] }), _jsx("p", { className: "text-muted-foreground text-sm", children: phase.title })] }) }, phase.title))), _jsx(StepperContent, { value: phases.length + 1, children: _jsxs("div", { id: panelId, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", phases.length, " phases done"] }), _jsx("p", { className: "text-sm font-medium", children: "Ticket resolved" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Every task is complete." })] }) })] }), _jsxs("div", { className: "flex justify-end gap-2 @md:justify-start", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: position === 0, onClick: () => goTo(position - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: position === last, onClick: () => goTo(position + 1), children: "Next" })] })] })] }) }));
}
