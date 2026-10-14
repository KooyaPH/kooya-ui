"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
const steps = [
    { title: "User Details" },
    { title: "Payment Info" },
    { title: "Auth OTP" },
    { title: "Preview Form" },
];
export default function Pattern() {
    return (_jsxs(Stepper, { defaultValue: 2, className: "w-full max-w-lg space-y-8", children: [_jsx(StepperNav, { className: "mb-10 gap-5", children: steps.map((step, index) => (_jsx(StepperItem, { step: index + 1, className: "relative flex-1 items-start", children: _jsxs(StepperTrigger, { className: "flex grow flex-col items-start justify-center gap-3.5", children: [_jsx(StepperIndicator, { className: "bg-border data-[state=active]:bg-primary data-[state=completed]:bg-primary h-1 w-full rounded-full", children: _jsx("span", { className: "sr-only", children: index + 1 }) }), _jsx(StepperTitle, { className: "group-data-[state=inactive]/step:text-muted-foreground text-start font-semibold", children: step.title })] }) }, index))) }), _jsx(StepperPanel, { className: "text-sm", children: steps.map((step, index) => (_jsxs(StepperContent, { value: index + 1, className: "flex items-center justify-center", children: [step.title, " content"] }, index))) })] }));
}
