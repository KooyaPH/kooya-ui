"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
// Each step owns a color. Its column sets it as the text color, and the bar
// and indicator inherit it through currentColor. The theme has no blue token,
// so step 3 takes the palette color.
const steps = [
    { color: "text-info", caption: "Enter the card number and expiry" },
    { color: "text-warning", caption: "Add the billing address" },
    { color: "text-blue-500", caption: "Confirm the card with your bank" },
    { color: "text-success", caption: "Review and save the card" },
];
// The design's 3:1 dashed ring on a 12px box, its 1.4 stroke overflowing the
// box. pathLength 36 closes the dashes in nine even segments, turned to start
// at 1 o'clock. Loading dims the track under a 38.5% arc that rests at 11 to
// 4 o'clock when motion is reduced.
function Ring({ spin = false }) {
    return (_jsxs("svg", { viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: "1.4", "aria-hidden": "true", className: "size-3 overflow-visible", children: [_jsx("circle", { cx: "6", cy: "6", r: "6", strokeDasharray: "3 1", pathLength: 36, transform: "rotate(-54 6 6)", strokeOpacity: spin ? 0.4 : 1 }), spin && (_jsx("circle", { cx: "6", cy: "6", r: "6", strokeDasharray: "38.5 61.5", strokeDashoffset: 32.7, pathLength: 100, className: "origin-center motion-safe:animate-spin" }))] }));
}
// Off the active step the indicator sits at 40% opacity, which dims these
// too. Completed and loading are spelled out for screen readers as well.
const indicators = {
    completed: (_jsxs(_Fragment, { children: [_jsxs("svg", { viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", className: "size-3.5", children: [_jsx("circle", { cx: "7", cy: "7", r: "6.3", strokeWidth: "1.4" }), _jsx("path", { d: "m4.33 7.15 1.67 1.54 3.67-3.38", strokeWidth: "1.5" })] }), _jsx("span", { className: "sr-only", children: "Completed" })] })),
    inactive: _jsx(Ring, {}),
    loading: (_jsxs(_Fragment, { children: [_jsx(Ring, { spin: true }), _jsx("span", { className: "sr-only", children: "In progress" })] })),
};
function CardIllustration() {
    return (_jsxs("svg", { width: "200", height: "130", viewBox: "0 0 200 130", fill: "none", "aria-hidden": "true", children: [_jsx("rect", { x: "48", y: "12", width: "120", height: "78", rx: "10", transform: "rotate(6 108 51)", className: "fill-muted/50 dark:fill-muted/25" }), _jsx("rect", { x: "36", y: "18", width: "128", height: "82", rx: "10", strokeWidth: "1.5", className: "fill-background stroke-border" }), _jsx("rect", { x: "52", y: "38", width: "22", height: "16", rx: "3", className: "fill-muted-foreground/15 stroke-muted-foreground/20" }), _jsx("path", { d: "M52 46H74M63 38V54", strokeWidth: "0.8", className: "stroke-muted-foreground/15" }), _jsx("path", { d: "M84 42Q87 46 84 50M88 40Q92 46 88 52M92 38Q97 46 92 54", strokeWidth: "1.5", strokeLinecap: "round", className: "stroke-muted-foreground/20" }), [56, 64, 72, 80, 94, 102, 110, 118].map((cx) => (_jsx("circle", { cx: cx, cy: "68", r: "2", className: cx < 90 ? "fill-muted-foreground/20" : "fill-muted-foreground/15" }, cx))), _jsx("rect", { x: "52", y: "80", width: "40", height: "3", rx: "1.5", className: "fill-muted-foreground/12" }), _jsx("rect", { x: "120", y: "80", width: "28", height: "3", rx: "1.5", className: "fill-muted-foreground/12" }), _jsx("circle", { cx: "140", cy: "88", r: "6", className: "fill-muted-foreground/8" }), _jsx("circle", { cx: "150", cy: "88", r: "6", className: "fill-muted-foreground/12" }), _jsx("circle", { cx: "26", cy: "50", r: "3", className: "fill-primary/10" }), _jsx("circle", { cx: "180", cy: "40", r: "2", className: "fill-primary/10" }), _jsx("path", { d: "M174 70L178 66V74Z", className: "fill-muted-foreground/10" })] }));
}
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
    return (_jsx(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "@container max-w-175", "aria-label": "Add a card", children: _jsx(Frame, { className: "w-full", variant: "ghost", children: _jsxs(FramePanel, { children: [_jsx(StepperNav, { className: "-mx-(--frame-panel-px) -mt-(--frame-panel-py) flex data-[orientation=horizontal]:w-auto", children: steps.map((item, index) => {
                            const step = index + 1;
                            // The primitive shows loading on the active step only, so every
                            // step carries the flag and the spinner follows the selection.
                            return (_jsx(StepperItem, { step: step, loading: true, className: "min-w-0 flex-1", children: _jsx(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, className: "w-full min-w-0 rounded-none focus-visible:ring-inset", children: _jsxs("span", { className: cn("flex h-7.5 min-w-0 flex-1 flex-col justify-between", item.color), children: [_jsx("span", { "aria-hidden": "true", className: "h-1 bg-current group-data-[state=active]/step:h-2 group-data-[state=active]/step:rounded-b-[min(var(--radius-sm)_-_2px,var(--frame-panel-radius))]" }), _jsxs("span", { className: "flex items-center justify-between gap-1 px-3 whitespace-nowrap", children: [_jsxs(StepperTitle, { className: "text-current/60 data-[state=active]:text-current", children: [_jsx("span", { className: "@max-md:sr-only", children: "Step " }), step] }), _jsx(StepperIndicator, { className: "size-3 overflow-visible bg-transparent text-current opacity-40 data-[state=active]:bg-transparent data-[state=active]:text-current data-[state=active]:opacity-100 data-[state=completed]:size-3.5 data-[state=completed]:bg-transparent data-[state=completed]:text-current" })] })] }) }) }, item.caption));
                        }) }), _jsxs(StepperPanel, { className: "mt-6 flex flex-col items-center", children: [_jsx(CardIllustration, {}), steps.map((item, index) => (_jsx(StepperContent, { value: index + 1, children: _jsx("p", { className: "text-muted-foreground text-center text-sm", children: item.caption }) }, item.caption))), _jsx(StepperContent, { value: steps.length + 1, children: _jsx("p", { className: "text-muted-foreground text-center text-sm", children: "Card saved and ready to use" }) })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] }) }) }));
}
