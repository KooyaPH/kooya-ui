"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "User Details",
        icon: (_jsx(IconPlaceholder, { lucide: "BookUserIcon", tabler: "IconUserSquareRounded", hugeicons: "UserSquareIcon", phosphor: "UserSquareIcon", remixicon: "RiContactsBook2Line", className: "size-4" })),
    },
    {
        title: "Payment Info",
        icon: (_jsx(IconPlaceholder, { lucide: "CreditCardIcon", tabler: "IconCreditCard", hugeicons: "CreditCardIcon", phosphor: "CreditCardIcon", remixicon: "RiBankCardLine", className: "size-4" })),
    },
    {
        title: "Auth OTP",
        icon: (_jsx(IconPlaceholder, { lucide: "LockIcon", tabler: "IconLock", hugeicons: "SquareLock01Icon", phosphor: "LockSimpleIcon", remixicon: "RiLockLine", className: "size-4" })),
    },
];
export default function Pattern() {
    const [currentStep, setCurrentStep] = useState(2);
    return (_jsxs(Stepper, { value: currentStep, onValueChange: setCurrentStep, indicators: {
            completed: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })),
            loading: (_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", className: "size-3.5 animate-spin" })),
        }, className: "w-full max-w-xl space-y-8", children: [_jsx(StepperNav, { className: "gap-3", children: steps.map((step, index) => (_jsxs(StepperItem, { step: index + 1, className: "relative flex-1 items-start", children: [_jsxs(StepperTrigger, { className: "flex grow flex-col items-start justify-center gap-2.5", asChild: true, children: [_jsx(StepperIndicator, { className: "data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=completed]:bg-success size-8 border-2 data-[state=completed]:text-white data-[state=inactive]:bg-transparent", children: step.icon }), _jsxs("div", { className: "flex flex-col items-start gap-1", children: [_jsxs("div", { className: "text-muted-foreground text-[10px] font-semibold uppercase", children: ["Step ", index + 1] }), _jsx(StepperTitle, { className: "group-data-[state=inactive]/step:text-muted-foreground text-start text-base font-semibold", children: step.title }), _jsxs("div", { children: [_jsx(Badge, { size: "sm", variant: "primary-light", className: "hidden group-data-[state=active]/step:inline-flex", children: "In Progress" }), _jsx(Badge, { variant: "success-light", size: "sm", className: "hidden group-data-[state=completed]/step:inline-flex", children: "Completed" }), _jsx(Badge, { variant: "secondary", size: "sm", className: "text-muted-foreground hidden group-data-[state=inactive]/step:inline-flex", children: "Pending" })] })] })] }), steps.length > index + 1 && (_jsx(StepperSeparator, { className: "group-data-[state=completed]/step:bg-success absolute inset-x-0 start-9 top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" }))] }, index))) }), _jsx(StepperPanel, { className: "text-sm", children: steps.map((step, index) => (_jsxs(StepperContent, { value: index + 1, className: "flex items-center justify-center", children: [step.title, " content"] }, index))) }), _jsxs("div", { className: "flex items-center justify-between gap-2.5", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep((prev) => prev - 1), disabled: currentStep === 1, children: "Previous" }), _jsx(Button, { variant: "outline", onClick: () => setCurrentStep((prev) => prev + 1), disabled: currentStep === steps.length, children: "Next" })] })] }));
}
