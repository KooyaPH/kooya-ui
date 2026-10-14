"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { Stepper, StepperContent, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Registration",
        summary: "Create your employee login and confirm your contact details.",
    },
    {
        title: "Paperwork",
        summary: "Sign your contract, tax forms and direct deposit details.",
    },
    {
        title: "Store Tour",
        summary: "Walk the floor, stockroom and break room with your manager.",
    },
    {
        title: "Job Training",
        summary: "Learn the register, returns and opening routine with a mentor.",
    },
    {
        title: "First Shift",
        summary: "Saturday from 9:00 AM to 3:00 PM, paired with your mentor.",
    },
];
export default function Pattern() {
    const [current, setCurrent] = useState(4);
    const labelId = useId();
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
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, className: "@container max-w-200", "aria-labelledby": labelId, children: [_jsxs("div", { className: "mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3", children: [_jsx("p", { id: labelId, className: "text-sm font-medium", children: "Onboarding" }), _jsx(StepperNav, { className: "order-last flex-wrap gap-y-2.5 @3xl:order-none @3xl:flex-1 @3xl:justify-center", children: steps.map((item, index) => {
                            const step = index + 1;
                            // The primitive grows every item but the last; these stay packed.
                            return (_jsxs(StepperItem, { step: step, className: "not-last:flex-none", children: [_jsxs(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, className: "-mx-1.5 -my-1.25 px-1.5 py-1.25", children: [_jsx(StepperTitle, { className: "text-muted-foreground data-[state=active]:text-foreground whitespace-nowrap", children: item.title }), step < current && (_jsx("span", { className: "sr-only", children: ", completed" }))] }), step < steps.length && (_jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", className: "text-ring/50 group-data-[state=completed]/step:text-ring mx-1.5 size-3.5 rtl:rotate-180", "aria-hidden": "true" }))] }, item.title));
                        }) }), _jsxs("p", { className: "text-muted-foreground flex gap-1.5 text-xs whitespace-nowrap tabular-nums", children: [_jsx("span", { children: "Step" }), _jsxs("span", { children: [_jsx("span", { className: "text-foreground", children: Math.min(current, steps.length) }), " ", _jsx("span", { "aria-hidden": "true", children: "/" }), _jsx("span", { className: "sr-only", children: "of" }), " ", steps.length] })] })] }), _jsx("div", { "aria-hidden": "true", className: "flex h-1 gap-1", children: steps.map((item, index) => (_jsx("span", { className: cn("flex-1 rounded-full", index < current ? "bg-foreground" : "bg-ring/20") }, item.title))) }), _jsxs(StepperPanel, { className: "mt-6 text-center", children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.summary })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsx("p", { className: "text-sm font-medium", children: "Onboarding complete" }), _jsxs("p", { className: "text-muted-foreground text-sm", children: ["All ", steps.length, " steps are done, welcome to the team."] })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
