"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    { title: "User Details" },
    { title: "Payment Info" },
    { title: "Auth OTP" },
    { title: "Preview Form" },
];
export default function Pattern() {
    return (_jsxs(Stepper, { defaultValue: 2, indicators: {
            completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })),
            loading: (_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", className: "size-3.5 animate-spin" })),
        }, className: "w-full max-w-lg space-y-8", children: [_jsx(StepperNav, { className: "gap-3", children: steps.map((step, index) => (_jsx(StepperItem, { step: index + 1, className: "relative flex-1 items-start", children: _jsxs(StepperTrigger, { className: "flex grow flex-col items-start justify-center gap-3", children: [_jsx(StepperIndicator, { children: index + 1 }), _jsx(StepperTitle, { className: "group-data-[state=inactive]/step:text-muted-foreground text-start font-semibold", children: step.title })] }) }, index))) }), _jsx(StepperPanel, { className: "text-sm", children: steps.map((step, index) => (_jsxs(StepperContent, { value: index + 1, className: "flex items-center justify-center", children: [step.title, " content"] }, index))) })] }));
}
