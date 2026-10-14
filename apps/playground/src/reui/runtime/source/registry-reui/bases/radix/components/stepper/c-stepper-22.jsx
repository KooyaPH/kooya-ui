"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { IconStack } from "../../reui/icon-stack.jsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Company details",
        description: "Legal name and tax ID for your invoices.",
        color: "text-info",
        icon: (_jsx(IconPlaceholder, { lucide: "Building2Icon", tabler: "IconBuilding", hugeicons: "Building03Icon", phosphor: "BuildingsIcon", remixicon: "RiBuilding2Line", className: "size-4" })),
    },
    {
        title: "Payment method",
        description: "The card charged at each renewal.",
        color: "text-warning",
        icon: (_jsx(IconPlaceholder, { lucide: "CreditCardIcon", tabler: "IconCreditCard", hugeicons: "CreditCardIcon", phosphor: "CreditCardIcon", remixicon: "RiBankCardLine", className: "size-4" })),
    },
    {
        title: "Billing contact",
        description: "Who receives invoices and receipts.",
        // The theme has no blue token, so this step takes the palette color.
        color: "text-blue-500",
        icon: (_jsx(IconPlaceholder, { lucide: "MailIcon", tabler: "IconMail", hugeicons: "Mail01Icon", phosphor: "EnvelopeIcon", remixicon: "RiMailLine", className: "size-4" })),
    },
    {
        title: "Review",
        description: "Confirm the plan and start billing.",
        color: "text-success",
        icon: (_jsx(IconPlaceholder, { lucide: "ClipboardCheckIcon", tabler: "IconClipboardCheck", hugeicons: "TaskDone01Icon", phosphor: "ClipboardTextIcon", remixicon: "RiClipboardLine", className: "size-4" })),
    },
];
// The design's 3:1 dashed ring. pathLength counts the circle as 36 units, so
// the dashes close in nine even segments with no stub at the seam. Loading
// dims the track and lays a 39% arc over it, resting at the design's angle
// (11 to 4 o'clock) when motion is reduced.
function Ring({ spin = false }) {
    return (_jsxs("svg", { viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "1.4", "aria-hidden": "true", className: "size-3.5", children: [_jsx("circle", { cx: "7", cy: "7", r: "6", strokeDasharray: "3 1", pathLength: 36, strokeOpacity: spin ? 0.4 : 1 }), spin && (_jsx("circle", { cx: "7", cy: "7", r: "6", strokeDasharray: "39 61", strokeDashoffset: 33, pathLength: 100, className: "origin-center motion-safe:animate-spin" }))] }));
}
const indicators = {
    // The design draws the 14px ring with a 1.4px line: 2.4 on a 24-unit grid.
    completed: (_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", strokeWidth: 2.4, className: "size-3.5", "aria-hidden": "true" })),
    inactive: _jsx(Ring, {}),
    loading: _jsx(Ring, { spin: true }),
};
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
    return (_jsx(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "@container max-w-175", "aria-label": "Billing setup", children: _jsx(Frame, { className: "w-full", variant: "ghost", children: _jsxs(FramePanel, { children: [_jsxs(StepperPanel, { className: "pt-3", children: [steps.map((item, index) => (_jsx(StepperContent, { value: index + 1, children: _jsxs("div", { className: "flex flex-col items-center text-center", children: [_jsx(IconStack, { "aria-hidden": "true", className: "mb-2", children: item.icon }), _jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground mt-0.5 text-sm text-balance", children: item.description })] }) }, item.title))), _jsx(StepperContent, { value: steps.length + 1, children: _jsxs("div", { className: "flex flex-col items-center text-center", children: [_jsx(IconStack, { "aria-hidden": "true", className: "mb-2", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-4" }) }), _jsx("p", { className: "text-sm font-medium", children: "Billing ready" }), _jsx("p", { className: "text-muted-foreground mt-0.5 text-sm text-balance", children: "Invoices start with your next renewal." })] }) })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] }), _jsx("div", { className: "-mx-(--frame-panel-px) mt-4 -mb-(--frame-panel-py) flex", children: _jsx(StepperNav, { children: steps.map((item, index) => {
                                const step = index + 1;
                                const status = step < current
                                    ? ", completed"
                                    : step === current
                                        ? ", in progress"
                                        : "";
                                // Each step owns a color, which the bar and indicator take
                                // through currentColor. Off the active step the title turns
                                // muted and the indicator dims to 40%. Every step carries the
                                // loading flag so the spinner follows the selection.
                                return (_jsx(StepperItem, { step: step, loading: true, className: "min-w-0 flex-1", children: _jsx(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, "aria-label": `Step ${step}: ${item.title}${status}`, className: "min-w-0 flex-1 rounded-none focus-visible:ring-inset", children: _jsxs("span", { className: cn("flex h-9.5 min-w-0 flex-1 flex-col justify-between pt-2", item.color), children: [_jsxs("span", { className: "flex items-center justify-between gap-1 px-3 whitespace-nowrap", children: [_jsxs(StepperTitle, { className: "text-current/60 data-[state=active]:text-current", children: [_jsx("span", { className: "@max-md:hidden", children: "Step " }), step] }), _jsx(StepperIndicator, { className: "size-3.5 bg-transparent text-current opacity-40 data-[state=active]:bg-transparent data-[state=active]:text-current data-[state=active]:opacity-100 data-[state=completed]:bg-transparent data-[state=completed]:text-current" })] }), _jsx("span", { "aria-hidden": "true", className: "h-1 bg-current transition-all group-data-[state=active]/step:h-2 group-data-[state=active]/step:rounded-t-[min(calc(var(--radius-sm)-2px),var(--frame-panel-radius))]" })] }) }) }, item.title));
                            }) }) })] }) }) }));
}
