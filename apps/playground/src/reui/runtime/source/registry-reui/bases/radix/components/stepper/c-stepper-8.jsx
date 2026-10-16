"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    { title: "Account", description: "Create your account" },
    { title: "Profile", description: "Set up your profile" },
    { title: "Complete", description: "Review and finish" },
];
export default function Pattern() {
    return (_jsxs(Stepper, { defaultValue: 2, indicators: {
            completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })),
            loading: (_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", className: "size-3.5 animate-spin" })),
        }, className: "w-full max-w-md space-y-8", children: [_jsx(StepperNav, { children: steps.map((step, index) => (_jsxs(StepperItem, { step: index + 1, className: "relative flex-1 items-start", children: [_jsxs(StepperTrigger, { className: "flex flex-col gap-2.5", children: [_jsx(StepperIndicator, { children: index + 1 }), _jsx(StepperTitle, { children: step.title }), _jsx(StepperDescription, { children: step.description })] }), steps.length > index + 1 && (_jsx(StepperSeparator, { className: "group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-2.5 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" }))] }, index))) }), _jsx(StepperPanel, { className: "text-sm", children: steps.map((step, index) => (_jsxs(StepperContent, { value: index + 1, className: "flex items-center justify-center", children: [step.title, " content"] }, index))) })] }));
}
