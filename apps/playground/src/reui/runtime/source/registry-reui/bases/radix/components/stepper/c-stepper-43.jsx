"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { Frame } from "../../reui/frame.jsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
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
// The indicator's own border draws the ring, so one check serves the 18px
// phase ring and the 14px task ring. The drawn 1.2px line is 2.88 on the
// 24-unit grid; *:stroke-[2.88] repeats it where a wrapper drops the prop.
const completed = (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", strokeWidth: 2.88, className: "size-2.5 *:stroke-[2.88]", "aria-hidden": "true" }));
const pending = (_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiCheckboxBlankCircleLine", className: "size-3.5", "aria-hidden": "true" }));
// The drawn ring: r=6 at a 1.2px stroke, a 3:1 dashed track and a 140deg
// arc from -118deg. The track is evened out to ten dashes so no long seam
// dash shows as the arc spins past, and the arc starts through its dash
// offset because the spin's transform would replace a rotate() attribute.
const running = (_jsxs("svg", { viewBox: "0 0 14 14", fill: "none", strokeWidth: 1.2, className: "size-3.5", "aria-hidden": "true", children: [_jsx("circle", { cx: "7", cy: "7", r: "6", pathLength: 40, strokeDasharray: "3 1", transform: "rotate(-54 7 7)", className: "stroke-ring/80" }), _jsx("circle", { cx: "7", cy: "7", r: "6", pathLength: 360, strokeDasharray: "140 220", strokeDashoffset: 118, className: "origin-center stroke-blue-500 motion-safe:animate-spin" })] }));
const taskIndicators = { completed, inactive: pending, loading: running };
export default function Pattern() {
    const id = useId();
    const [phase, setPhase] = useState(3);
    const [task, setTask] = useState(3);
    const [open, setOpen] = useState(true);
    const panelId = `${id}-panel`;
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const atStart = phase === 1 && task === 1;
    // One past the last phase marks every phase and task complete. No tab
    // is selected then, so the last phase keeps the tablist's tab stop.
    const allDone = phase > phases.length;
    // The primitive reports the current step again when it is chosen, so
    // that choice folds or unfolds the phase instead of selecting it.
    function selectPhase(next) {
        if (next === phase) {
            setOpen((value) => !value);
            return;
        }
        setPhase(next);
        setTask(1);
        setOpen(true);
    }
    // Previous and Next walk every task in order and open the phase they
    // land in. The pressed button disables itself at either end, so focus
    // moves to its partner.
    function goTo(toPhase, toTask) {
        setPhase(toPhase);
        setTask(toTask);
        setOpen(true);
        if (toPhase === 1 && toTask === 1)
            nextRef.current?.focus();
        if (toPhase > phases.length)
            prevRef.current?.focus();
    }
    function goPrevious() {
        if (task > 1)
            goTo(phase, task - 1);
        else
            goTo(phase - 1, phases[phase - 2].tasks.length);
    }
    function goNext() {
        if (task < phases[phase - 1].tasks.length)
            goTo(phase, task + 1);
        else
            goTo(phase + 1, 1);
    }
    return (_jsx(Stepper, { value: phase, onValueChange: selectPhase, orientation: "vertical", indicators: { completed }, className: "@container mx-auto w-full max-w-lg", "aria-label": "Ticket resolution", children: _jsxs("div", { className: "flex flex-col gap-6 @md:flex-row @md:items-start", children: [_jsx(StepperNav, { className: "w-full max-w-60 shrink-0 gap-2", children: phases.map((item, index) => {
                        const step = index + 1;
                        const expanded = open && step === phase;
                        const tasksId = `${id}-tasks-${step}`;
                        // A phase folding away after another became current reads as all
                        // done or all pending, never as the live task, and ignores clicks.
                        const progress = step === phase ? task : step < phase ? item.tasks.length + 1 : 0;
                        return (_jsx(StepperItem, { step: step, className: "items-stretch", children: _jsx(Collapsible, { open: expanded, children: _jsxs(Frame, { className: cn("gap-0 overflow-hidden p-2 transition-colors duration-200", !expanded && "-m-px border-transparent bg-transparent"), children: [_jsxs(StepperTrigger, { tabIndex: allDone && step === phases.length ? 0 : undefined, id: `${id}-phase-${step}`, "aria-controls": expanded ? tasksId : undefined, "aria-expanded": expanded, onKeyUp: (event) => {
                                                if (event.key === " ")
                                                    event.preventDefault();
                                            }, className: "relative gap-2 text-start after:absolute after:-inset-2", children: [_jsx(StepperIndicator, { className: "border-border bg-muted/50 text-muted-foreground data-[state=active]:border-ring/50 data-[state=active]:text-foreground data-[state=completed]:border-success data-[state=completed]:bg-success/10 data-[state=completed]:text-success size-4.5 border leading-none font-medium data-[state=active]:bg-transparent", children: step }), _jsx(StepperTitle, { className: "data-[state=inactive]:text-muted-foreground min-w-0 flex-1 truncate leading-5", children: item.title }), step < phase && (_jsx("span", { className: "sr-only", children: ", completed" })), _jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", className: cn("size-3.5 shrink-0 transition-transform", expanded
                                                        ? "text-foreground rotate-90"
                                                        : "text-ring rtl:rotate-180"), "aria-hidden": "true" })] }), _jsx(CollapsibleContent, { id: tasksId, className: "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down -mx-2 overflow-hidden motion-reduce:animate-none", children: _jsx(Stepper, { value: progress, onValueChange: step === phase ? setTask : undefined, orientation: "vertical", indicators: taskIndicators, className: "mt-2.5", "aria-label": `${item.title} tasks`, children: _jsx(StepperNav, { className: "w-full", children: item.tasks.map((label, taskIndex) => {
                                                        const taskStep = taskIndex + 1;
                                                        const status = taskStep < progress
                                                            ? ", completed"
                                                            : taskStep === progress
                                                                ? ", in progress"
                                                                : null;
                                                        return (_jsx(StepperItem, { step: taskStep, loading: true, className: "items-stretch", children: _jsxs(StepperTrigger, { id: `${id}-task-${step}-${taskStep}`, "aria-controls": panelId, className: "data-[state=active]:bg-background relative h-7 gap-2 rounded-none ps-7.5 pe-2 text-start before:absolute before:inset-y-1.25 before:start-0 before:w-0.75 before:rounded-e-full focus-visible:ring-inset data-[state=active]:before:bg-blue-500", children: [_jsx(StepperIndicator, { className: "text-ring/60 data-[state=completed]:border-success data-[state=completed]:bg-success/10 data-[state=completed]:text-success size-3.5 bg-transparent data-[state=active]:bg-transparent data-[state=completed]:border" }), _jsx(StepperTitle, { className: "data-[state=inactive]:text-muted-foreground min-w-0 flex-1 truncate leading-5", children: label }), status && (_jsx("span", { className: "sr-only", children: status }))] }) }, label));
                                                    }) }) }) })] }) }) }, item.title));
                    }) }), _jsx(Separator, { "aria-hidden": "true", className: "@md:hidden" }), _jsx(Separator, { "aria-hidden": "true", orientation: "vertical", className: "hidden @md:block" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-3 px-2 text-start @md:px-0 @md:pt-2", children: [_jsxs(StepperPanel, { children: [phases.map((item, index) => (_jsx(StepperContent, { value: index + 1, children: _jsxs("div", { id: panelId, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: [item.title, ", task ", task, " of ", item.tasks.length] }), _jsx("p", { className: "text-sm font-medium", children: item.tasks[task - 1] })] }) }, item.title))), _jsx(StepperContent, { value: phases.length + 1, children: _jsxs("div", { id: panelId, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", phases.length, " phases done"] }), _jsx("p", { className: "text-sm font-medium", children: "Ticket resolved" })] }) })] }), _jsxs("div", { className: "flex justify-start gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: atStart, onClick: goPrevious, children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: goNext, children: "Next" })] })] })] }) }));
}
