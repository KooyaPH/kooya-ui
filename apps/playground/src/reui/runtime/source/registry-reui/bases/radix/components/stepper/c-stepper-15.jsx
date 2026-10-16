"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [{ title: "Account" }, { title: "Profile" }, { title: "Review" }];
export default function Pattern() {
    const [current, setCurrent] = useState(2);
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
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Stepper, { className: "flex flex-col items-center justify-center gap-10", value: current, onValueChange: setCurrent, orientation: "vertical", indicators: {
                completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })),
                loading: (_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", className: "size-3.5 animate-spin" })),
            }, children: [_jsx(StepperNav, { children: steps.map((step, index) => (_jsxs(StepperItem, { step: index + 1, className: "relative items-start not-last:flex-1", children: [_jsxs(StepperTrigger, { tabIndex: allDone && index === steps.length - 1 ? 0 : undefined, className: "items-start gap-2.5 pb-12 last:pb-0", children: [_jsx(StepperIndicator, { className: "data-[state=completed]:bg-success data-[state=completed]:text-white", children: index + 1 }), _jsx("div", { className: "mt-0.5 text-left", children: _jsx(StepperTitle, { children: step.title }) })] }), index < steps.length - 1 && (_jsx(StepperSeparator, { className: "group-data-[state=completed]/step:bg-success absolute inset-y-0 top-7 left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)]" }))] }, index))) }), _jsxs(StepperPanel, { className: "w-56 text-center text-sm", children: [steps.map((step, index) => (_jsxs(StepperContent, { value: index + 1, children: [step.title, " content"] }, index))), _jsx(StepperContent, { value: steps.length + 1, children: "All steps complete" }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }) }));
}
