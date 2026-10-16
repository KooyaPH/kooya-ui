// Owned responsive and native-trigger correction to the actual attributed REUI recipe.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
// @ts-expect-error attributed generated REUI frame module has no declaration file
import { Frame, FramePanel } from "../source/registry-reui/bases/radix/reui/frame.jsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../adapters/structured";
import { Button } from "../../adapters/controls";
import { Separator } from "../../adapters/layout";
import { IconPlaceholder } from "../../adapters/icons";
const steps = [
    { title: "Resolution", detail: "Weighing a rollback against a hotfix." },
    { title: "Scoping", detail: "Confirming only 6 pods in eu-west-1 are hit." },
    { title: "Execution", detail: "Rolling api-gateway back to v2.14.1." },
    { title: "Verification", detail: "Watching error rate and p95 latency." },
    { title: "Approval", detail: "Waiting on the incident lead to sign off." },
    { title: "Summary", detail: "Writing up the root cause and follow-ups." },
];
// The design draws the 10px check with a 1.2px line: 2.88 on a 24-unit grid.
// *:stroke-[2.88] repeats it on the paths, so the weight holds where a
// wrapper drops the prop.
const completed = (_jsx("span", { className: "border-success bg-success/10 text-success flex size-3.5 items-center justify-center rounded-full border", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", strokeWidth: 2.88, className: "size-2.5 *:stroke-[2.88]", "aria-hidden": "true" }) }));
const pending = (_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiCheckboxBlankCircleLine", className: "text-ring/60 size-3.5", "aria-hidden": "true" }));
// The drawn ring: r=6 at a 1.2px stroke, a 3:1 dashed track and a 140deg
// arc from -118deg. The track is evened out to ten dashes, so no long seam
// dash shows as the arc spins past. The arc starts through its dash offset
// because the spin's CSS transform would replace a rotate() attribute.
const loading = (_jsxs("svg", { viewBox: "0 0 14 14", fill: "none", strokeWidth: 1.2, className: "size-3.5", "aria-hidden": "true", children: [_jsx("circle", { cx: "7", cy: "7", r: "6", pathLength: 40, strokeDasharray: "3 1", transform: "rotate(-54 7 7)", className: "stroke-ring/80" }), _jsx("circle", { cx: "7", cy: "7", r: "6", pathLength: 360, strokeDasharray: "140 220", strokeDashoffset: 118, className: "origin-center stroke-blue-500 motion-safe:animate-spin" })] }));
const indicators = { completed, inactive: pending, loading };
export default function Pattern() {
    // The primitive derives tab ids from the step number alone and points
    // aria-controls at a panel nothing renders, so both are scoped here.
    const id = useId();
    const panelId = `${id}-panel`;
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
    return (_jsx(Stepper, { value: current, onValueChange: setCurrent, orientation: "vertical", indicators: indicators, className: "@container mx-auto w-full max-w-lg", "aria-label": "Incident response", children: _jsxs("div", { className: "flex flex-col gap-6 @md:flex-row @md:items-start", children: [_jsx(Frame, { variant: "ghost", spacing: "xs", className: "w-45 shrink-0 bg-transparent p-0 [--frame-panel-py-base:--spacing(1.5)]", children: _jsx(StepperNav, { className: "gap-1.5", children: steps.map((item, index) => {
                            const step = index + 1;
                            const status = step < current
                                ? "completed"
                                : step === current
                                    ? "in progress"
                                    : "upcoming";
                            // The primitive shows loading on the active step only, so every
                            // step carries the flag and the spinner follows the selection.
                            return (_jsx(StepperItem, { step: step, loading: true, children: _jsx(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, id: `${id}-tab-${step}`, "aria-controls": panelId, style: {
                                        height: "auto",
                                        padding: 0,
                                        background: step === current ? "var(--ku-subtle)" : "transparent",
                                        borderColor: step === current ? "var(--ku-line)" : "transparent",
                                    }, className: "hover:bg-muted/50 data-[state=active]:bg-muted/50 w-full gap-2 rounded-[calc(var(--frame-panel-radius)-3px)] border-transparent bg-transparent px-[calc(var(--frame-panel-px)-1px)] shadow-none data-[state=active]:border-(--frame-panel-border-color)", children: _jsxs(FramePanel, { className: "flex w-full min-w-0 items-center gap-2 border-0 bg-transparent shadow-none", children: [_jsx(StepperIndicator, { style: { minWidth: 14, minHeight: 14, background: "transparent" }, className: "size-3.5 overflow-visible bg-transparent data-[state=active]:bg-transparent data-[state=completed]:bg-transparent" }), _jsx(StepperTitle, { className: "data-[state=inactive]:text-[var(--ku-muted)] min-w-0 flex-1 truncate text-start leading-5 data-[state=active]:text-[var(--ku-focus)]", children: item.title }), _jsxs("span", { className: "sr-only", children: [", ", status] }), step === current && (_jsx("span", { "aria-hidden": "true", className: "pointer-events-none absolute start-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-e-full bg-[var(--ku-focus)]" }))] }) }) }, item.title));
                        }) }) }), _jsx(Separator, { "aria-hidden": "true", className: "@md:hidden" }), _jsx(Separator, { "aria-hidden": "true", orientation: "vertical", className: "hidden @md:block" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-3 px-2 text-start @md:px-0", children: [_jsxs(StepperPanel, { children: [steps.map((item, index) => (_jsx(StepperContent, { value: index + 1, children: _jsxs("div", { id: panelId, children: [_jsxs("p", { className: "text-[var(--ku-muted)] text-xs", children: ["Step ", index + 1, " of ", steps.length] }), _jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-[var(--ku-muted)] text-sm text-pretty", children: item.detail })] }) }, item.title))), _jsx(StepperContent, { value: steps.length + 1, children: _jsxs("div", { id: panelId, children: [_jsxs("p", { className: "text-[var(--ku-muted)] text-xs", children: ["All ", steps.length, " steps done"] }), _jsx("p", { className: "text-sm font-medium", children: "Response complete" }), _jsx("p", { className: "text-[var(--ku-muted)] text-sm text-pretty", children: "The incident is approved, summarized and closed." })] }) })] }), _jsxs("div", { className: "flex justify-start gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }) }));
}
