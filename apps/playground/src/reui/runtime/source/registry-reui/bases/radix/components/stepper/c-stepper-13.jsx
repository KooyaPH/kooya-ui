"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    { title: "Account", description: "Create your account" },
    { title: "Profile", description: "Set up your profile" },
    { title: "Review", description: "Confirm your details" },
];
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Stepper, { className: "flex flex-col items-center justify-center gap-10", defaultValue: 2, orientation: "vertical", indicators: {
                completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })),
                loading: (_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", className: "size-3.5 animate-spin" })),
            }, children: [_jsx(StepperNav, { children: steps.map((step, index) => (_jsxs(StepperItem, { step: index + 1, className: "relative items-start not-last:flex-1", children: [_jsxs(StepperTrigger, { className: "items-start gap-2.5 pb-12 last:pb-0", children: [_jsx(StepperIndicator, { className: "data-[state=completed]:bg-success data-[state=completed]:text-white", children: index + 1 }), _jsxs("div", { className: "mt-0.5 text-left", children: [_jsx(StepperTitle, { children: step.title }), _jsx(StepperDescription, { children: step.description })] })] }), index < steps.length - 1 && (_jsx(StepperSeparator, { className: "group-data-[state=completed]/step:bg-success absolute inset-y-0 top-7 left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)]" }))] }, index))) }), _jsx(StepperPanel, { className: "w-56 text-center text-sm", children: steps.map((step, index) => (_jsxs(StepperContent, { value: index + 1, children: [step.title, " content"] }, index))) })] }) }));
}
