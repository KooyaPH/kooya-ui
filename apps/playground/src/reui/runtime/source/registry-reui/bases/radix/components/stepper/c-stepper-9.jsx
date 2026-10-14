"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [{ title: "Account" }, { title: "Profile" }, { title: "Review" }];
export default function Pattern() {
    return (_jsxs(Stepper, { defaultValue: 2, indicators: {
            completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })),
            loading: (_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", className: "size-3.5 animate-spin" })),
        }, className: "w-full max-w-md space-y-8", children: [_jsx(StepperNav, { children: steps.map((step, index) => (_jsxs(StepperItem, { step: index + 1, className: "relative", children: [_jsxs(StepperTrigger, { className: "flex justify-start gap-1.5", children: [_jsx(StepperIndicator, { children: index + 1 }), _jsx(StepperTitle, { children: step.title })] }), steps.length > index + 1 && (_jsx(StepperSeparator, { className: "group-data-[state=completed]/step:bg-primary md:mx-2.5" }))] }, index))) }), _jsx(StepperPanel, { className: "text-sm", children: steps.map((step, index) => (_jsxs(StepperContent, { value: index + 1, className: "flex items-center justify-center", children: [step.title, " content"] }, index))) })] }));
}
