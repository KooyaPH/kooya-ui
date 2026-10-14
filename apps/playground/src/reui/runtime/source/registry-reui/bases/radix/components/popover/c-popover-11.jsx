"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Invite Your Team",
        description: "Add team members by email to collaborate on projects in real time. Assign roles and manage permissions from the team settings.",
    },
    {
        title: "Create a Project",
        description: "Set up your first project with a name, description, and timeline. Choose from templates or start from scratch.",
    },
    {
        title: "Connect Integrations",
        description: "Link tools like GitHub, Slack, and Figma to streamline your workflow and keep everything in sync.",
    },
    {
        title: "Set Up Notifications",
        description: "Customize which events trigger alerts — mentions, due dates, status changes, and deployment updates.",
    },
];
export default function Pattern() {
    const [currentStep, setCurrentStep] = useState(0);
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };
    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;
    return (_jsx("div", { className: "flex min-h-[100px] items-center justify-center", children: _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "CompassIcon", tabler: "IconCompass", hugeicons: "Navigation04Icon", phosphor: "CompassIcon", remixicon: "RiCompassLine", "aria-hidden": "true" }), "Feature Tour"] }) }), _jsxs(PopoverContent, { className: "w-72 gap-2 px-3 pt-3 pb-2", side: "top", sideOffset: 8, children: [_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "leading-tight font-medium", children: steps[currentStep].title }), _jsx("p", { className: "text-muted-foreground", children: steps[currentStep].description })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-muted-foreground", children: [currentStep + 1, " of ", steps.length] }), _jsxs("div", { className: "flex gap-0.5", children: [_jsx(Button, { "aria-label": "Previous step", className: "size-6", disabled: isFirst, onClick: handlePrev, size: "icon", variant: "ghost", children: _jsx(IconPlaceholder, { lucide: "ArrowLeftIcon", tabler: "IconArrowLeft", hugeicons: "ArrowLeft02Icon", phosphor: "ArrowLeftIcon", remixicon: "RiArrowLeftLine", className: "size-3.5", "aria-hidden": "true" }) }), _jsx(Button, { "aria-label": "Next step", className: "size-6", disabled: isLast, onClick: handleNext, size: "icon", variant: "ghost", children: _jsx(IconPlaceholder, { lucide: "ArrowRightIcon", tabler: "IconArrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLine", className: "size-3.5", "aria-hidden": "true" }) })] })] })] })] }) }));
}
