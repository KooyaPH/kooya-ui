"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Frame, FrameHeader, FramePanel, } from "../../reui/frame.jsx";
import { IconTile } from "../../reui/icon-tile.jsx";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Empty, EmptyDescription, EmptyHeader, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Choose Resolution",
        description: "Pick one of the resolution options",
        empty: "Resolution options appear here",
    },
    {
        title: "Execute Resolution",
        description: "Verify details and proceed",
        empty: "Details to verify appear here",
    },
    {
        title: "Resolution Summary",
        description: "View actions taken",
        empty: "Actions taken appear here",
    },
];
// The frame tile's 1px border, made transparent, plus its 2px inset form the
// 3px ring around a 28px card. The tile also takes the focus ring from the
// pill-shaped trigger, so the ring follows its corners in every style. The
// indicator goes overflow-visible so that ring is not clipped.
const completed = (_jsx(IconTile, { variant: "frame", size: "sm", className: "bg-success/20 after:bg-success in-focus-visible:ring-ring/50 border-transparent text-white [--icon-tile-size:--spacing(8.5)] after:border-white/8 after:shadow-sm in-focus-visible:ring-3", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine" }) }));
// r=7 gives a circumference of 44: the track is eleven 3+1 dashes and the
// arc is 17 long (139 degrees), starting at 11 o'clock as drawn. Only the arc
// spins, so the dashed track holds still.
function Ring({ spin = false }) {
    return (_jsx(IconTile, { variant: "frame", size: "sm", className: "bg-input/50 after:bg-background after:border-ring/30 in-focus-visible:ring-ring/50 border-transparent [--icon-tile-size:--spacing(8.5)] after:shadow-sm in-focus-visible:ring-3", "aria-hidden": "true", children: _jsxs("svg", { viewBox: "0 0 16 16", fill: "none", strokeWidth: "1.6", children: [_jsx("circle", { cx: "8", cy: "8", r: "7", pathLength: 44, strokeDasharray: "3 1", className: "stroke-ring/50" }), spin && (_jsx("circle", { cx: "8", cy: "8", r: "7", pathLength: 44, strokeDasharray: "17 27", strokeDashoffset: "14.4", className: "stroke-success origin-center motion-safe:animate-spin" }))] }) }));
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
    return (_jsx(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "@container max-w-175", "aria-label": "Resolution steps", children: _jsxs(Frame, { variant: "ghost", spacing: "sm", className: "bg-muted dark:bg-input/50", children: [_jsx(FrameHeader, { className: "px-2.75 py-1", children: _jsx(StepperNav, { children: steps.map((item, index) => {
                            const step = index + 1;
                            // The primitive shows loading on the active step only, so every
                            // step carries the flag and the spinner follows the selection.
                            // flex-auto shares the free width equally, so every arrow keeps
                            // the same gap on both sides.
                            return (_jsxs(StepperItem, { step: step, loading: true, className: "min-w-0 not-last:flex-auto", children: [_jsxs(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, className: "min-w-0 gap-2 focus-visible:ring-0", children: [_jsx(StepperIndicator, { className: "size-8.5 overflow-visible bg-transparent data-[state=active]:bg-transparent data-[state=completed]:bg-transparent" }), _jsxs("div", { className: "flex min-w-0 flex-col text-start @max-xl:sr-only", children: [_jsx(StepperTitle, { className: "truncate leading-5", children: item.title }), _jsx(StepperDescription, { className: "truncate text-xs", children: item.description }), step < current && (_jsx("span", { className: "sr-only", children: ", completed" })), step === current && (_jsx("span", { className: "sr-only", children: ", in progress" }))] })] }), step < steps.length && (_jsx("span", { className: "flex flex-1 justify-center px-1.5", children: _jsx(IconPlaceholder, { lucide: "MoveRightIcon", tabler: "IconArrowNarrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLongLine", className: "text-ring/80 size-3.5 shrink-0 rtl:rotate-180", "aria-hidden": "true" }) }))] }, item.title));
                        }) }) }), _jsxs(FramePanel, { className: "py-11 shadow-none", children: [_jsxs(StepperPanel, { children: [steps.map((item, index) => (_jsx(StepperContent, { value: index + 1, children: _jsx(Empty, { className: "p-0", children: _jsx(EmptyHeader, { children: _jsx(EmptyDescription, { className: "text-sm", children: item.empty }) }) }) }, item.title))), _jsx(StepperContent, { value: steps.length + 1, children: _jsx(Empty, { className: "p-0", children: _jsx(EmptyHeader, { children: _jsx(EmptyDescription, { className: "text-sm", children: "Resolution complete" }) }) }) })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }) }));
}
