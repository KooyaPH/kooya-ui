"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
const steps = [1, 2, 3, 4];
export default function Pattern() {
    return (_jsxs(Stepper, { defaultValue: 2, className: "w-full max-w-md space-y-8", children: [_jsx(StepperNav, { children: steps.map((step) => (_jsxs(StepperItem, { step: step, children: [_jsx(StepperTrigger, { children: _jsx(StepperIndicator, { children: step }) }), steps.length > step && (_jsx(StepperSeparator, { className: "group-data-[state=completed]/step:bg-primary" }))] }, step))) }), _jsx(StepperPanel, { className: "text-sm", children: steps.map((step) => (_jsxs(StepperContent, { value: step, className: "flex items-center justify-center", children: ["Step ", step, " content"] }, step))) })] }));
}
