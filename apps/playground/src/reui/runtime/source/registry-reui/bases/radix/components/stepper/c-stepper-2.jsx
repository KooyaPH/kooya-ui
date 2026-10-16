"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
const steps = [1, 2, 3, 4];
export default function Pattern() {
    return (_jsxs(Stepper, { defaultValue: 2, className: "w-full max-w-md space-y-8", children: [_jsx(StepperNav, { children: steps.map((step) => (_jsxs(StepperItem, { step: step, children: [_jsx(StepperTrigger, { children: _jsx(StepperIndicator, { className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:bg-green-500 data-[state=completed]:text-white data-[state=inactive]:text-gray-500", children: step }) }), steps.length > step && (_jsx(StepperSeparator, { className: "group-data-[state=completed]/step:bg-green-500" }))] }, step))) }), _jsx(StepperPanel, { className: "text-sm", children: steps.map((step) => (_jsxs(StepperContent, { className: "flex w-full items-center justify-center", value: step, children: ["Step ", step, " content"] }, step))) })] }));
}
