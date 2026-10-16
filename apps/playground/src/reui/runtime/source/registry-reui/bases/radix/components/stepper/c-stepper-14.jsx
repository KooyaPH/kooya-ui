"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [1, 2, 3];
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Stepper, { className: "flex flex-col items-center justify-center gap-10", defaultValue: 2, orientation: "vertical", indicators: {
                completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })),
                loading: (_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", className: "size-3.5 animate-spin" })),
            }, children: [_jsx(StepperNav, { children: steps.map((step) => (_jsxs(StepperItem, { step: step, loading: step === 2, children: [_jsx(StepperTrigger, { children: _jsx(StepperIndicator, { className: "data-[state=completed]:bg-success data-[state=completed]:text-white", children: step }) }), steps.length > step && (_jsx(StepperSeparator, { className: "group-data-[state=completed]/step:bg-success" }))] }, step))) }), _jsx(StepperPanel, { className: "w-56 text-center text-sm", children: steps.map((step) => (_jsxs(StepperContent, { value: step, children: ["Step ", step, " content"] }, step))) })] }) }));
}
