"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [1, 2, 3, 4];
export default function Pattern() {
    const [currentStep, setCurrentStep] = useState(1);
    return (_jsx("div", { className: "w-full max-w-md", children: _jsxs(Stepper, { value: currentStep, onValueChange: setCurrentStep, children: [_jsx(StepperNav, { children: steps.map((step) => (_jsx(StepperItem, { step: step, className: "first:rounded-s-full last:rounded-e-full flex-1 overflow-hidden transition-all duration-300", children: _jsx(StepperTrigger, { className: "w-full flex-col items-start gap-2", asChild: true, children: _jsx(StepperIndicator, { className: "bg-border h-2 w-full rounded-none!", children: _jsx("span", { className: "sr-only", children: step }) }) }) }, step))) }), _jsxs("div", { className: "flex items-center justify-between gap-2.5 py-1", children: [_jsxs(Button, { variant: "link", onClick: () => setCurrentStep((prev) => prev - 1), className: cn("px-0", currentStep === 1 && "pointer-events-none opacity-0"), children: [_jsx(IconPlaceholder, { lucide: "ArrowLeftIcon", tabler: "IconArrowLeft", hugeicons: "ArrowLeft01Icon", phosphor: "ArrowLeftIcon", remixicon: "RiArrowLeftLine", className: "size-4" }), "Back"] }), _jsxs("div", { className: "text-sm font-medium", children: [_jsx("span", { className: "text-foreground", children: currentStep }), " ", _jsxs("span", { className: "text-muted-foreground/60", children: ["/ ", steps.length] })] })] }), _jsx(StepperPanel, { className: "py-6 text-sm", children: steps.map((step) => (_jsxs(StepperContent, { className: "flex w-full items-center justify-center", value: step, children: ["Step ", step, " content"] }, step))) }), _jsx("div", { className: "flex items-center justify-end gap-2.5", children: _jsx(Button, { variant: "outline", onClick: () => setCurrentStep((prev) => prev + 1), disabled: currentStep === steps.length, children: "Next" }) })] }) }));
}
