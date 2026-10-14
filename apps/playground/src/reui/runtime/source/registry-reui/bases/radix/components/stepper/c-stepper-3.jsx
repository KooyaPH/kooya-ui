"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [1, 2, 3];
export default function Pattern() {
    return (_jsxs(Stepper, { className: "w-full max-w-md", defaultValue: 2, indicators: {
            completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })),
            loading: (_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", className: "size-3.5 animate-spin" })),
        }, children: [_jsx(StepperNav, { className: "mb-5", children: steps.map((step) => (_jsxs(StepperItem, { step: step, loading: step === 2, children: [_jsx(StepperTrigger, { children: _jsx(StepperIndicator, { className: "data-[state=active]:text-primary-foreground data-[state=active]:bg-primary data-[state=active]:border-primary data-[state=inactive]:border-muted size-5 border-2 data-[state=completed]:border-green-500 data-[state=completed]:bg-green-500 data-[state=completed]:text-white", children: _jsx("span", { className: "bg-primary-foreground hidden size-1.5 rounded-full group-data-[state=active]/step:block" }) }) }), steps.length > step && (_jsx(StepperSeparator, { className: "group-data-[state=completed]/step:bg-green-500" }))] }, step))) }), _jsx(StepperPanel, { className: "text-sm", children: steps.map((step) => (_jsxs(StepperContent, { className: "flex w-full items-center justify-center", value: step, children: ["Step ", step, " content"] }, step))) })] }));
}
