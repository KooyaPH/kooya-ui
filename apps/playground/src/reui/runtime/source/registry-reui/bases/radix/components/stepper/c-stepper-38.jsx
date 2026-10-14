"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Stepper, StepperContent, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    {
        title: "Order Placed",
        summary: "Payment confirmed and the order sent to the warehouse.",
        icon: (_jsx(IconPlaceholder, { lucide: "PackageCheckIcon", tabler: "IconPackage", hugeicons: "PackageIcon", phosphor: "PackageIcon", remixicon: "RiBox3Line", className: "size-4", "aria-hidden": "true" })),
    },
    {
        title: "Processing",
        summary: "Items picked, packed and labelled at the Rotterdam hub.",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiCheckboxBlankCircleLine", className: "size-4", "aria-hidden": "true" })),
    },
    {
        title: "Dispatched",
        summary: "Handed to the carrier as 2 parcels under one waybill.",
        icon: (_jsx(IconPlaceholder, { lucide: "SendIcon", tabler: "IconSend", hugeicons: "SentIcon", phosphor: "PaperPlaneTiltIcon", remixicon: "RiSendPlaneLine", className: "size-4", "aria-hidden": "true" })),
    },
    {
        title: "In Transit",
        summary: "Flying from Amsterdam to New York, landing in about 6 hours.",
        icon: (_jsx(IconPlaceholder, { lucide: "PlaneTakeoffIcon", tabler: "IconPlaneDeparture", hugeicons: "AirplaneTakeOff01Icon", phosphor: "AirplaneTakeoffIcon", remixicon: "RiFlightTakeoffLine", className: "size-4", "aria-hidden": "true" })),
    },
    {
        title: "Customs",
        summary: "Import clearance at JFK, usually done within a day.",
        icon: (_jsx(IconPlaceholder, { lucide: "ScanLineIcon", tabler: "IconLineScan", hugeicons: "ScanIcon", phosphor: "ScanIcon", remixicon: "RiScan2Line", className: "size-4", "aria-hidden": "true" })),
    },
    {
        title: "Delivered",
        summary: "Expected at your door on Mar 7 before 18:00.",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", className: "size-4", "aria-hidden": "true" })),
    },
];
// 2x4px pill ticks on a 5.5px SVG tile, the design's pitch. mask-repeat:
// space keeps every tick whole and starts and ends each run 1.75px in, so two
// runs that meet keep the 3.5px gap.
const ticks = "bg-ring/40 mask-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220,0,5.5,4%22%3E%3Crect%20x=%221.75%22%20width=%222%22%20height=%224%22%20rx=%221%22/%3E%3C/svg%3E')] mask-size-[0.34375rem_100%] mask-repeat-space";
// A done step paints solid. The per-style radius outranks a plain class and
// would pinch every joint, so ! squares it.
const bar = `${ticks} m-0 rounded-none! group-data-[orientation=horizontal]/stepper-nav:h-1 data-[state=completed]:bg-success data-[state=completed]:mask-none`;
export default function Pattern() {
    const [current, setCurrent] = useState(4);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // One past the last step marks every step complete. No tab is selected
    // then, so the last one keeps the tablist's tab stop.
    const allDone = current > steps.length;
    // Past the collapsed width (many steps in a small box) the row scrolls, so
    // the current step comes back into view when it changes or the row resizes,
    // and a tab comes into view when focus lands on it (the browser leaves a
    // half-hidden one where it is). Only the row scrolls, never the page.
    const rowRef = useRef(null);
    useEffect(() => {
        const row = rowRef.current;
        if (!row)
            return;
        const reveal = (tab) => {
            if (!tab)
                return;
            const box = row.getBoundingClientRect();
            const { left, right } = tab.getBoundingClientRect();
            if (left < box.left || right > box.right) {
                row.scrollLeft += (left + right - box.left - box.right) / 2;
            }
        };
        const onFocus = (event) => reveal(event.target.closest('[role="tab"]'));
        const observer = new ResizeObserver(() => reveal(row.querySelector('[aria-selected="true"]')));
        observer.observe(row);
        row.addEventListener("focusin", onFocus);
        return () => {
            observer.disconnect();
            row.removeEventListener("focusin", onFocus);
        };
    }, [current]);
    function goTo(step) {
        setCurrent(step);
        // The pressed button disables itself at either end, so focus moves to
        // its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > steps.length)
            prevRef.current?.focus();
    }
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, className: "max-w-200", "aria-label": "Shipment tracking", children: [_jsx("div", { ref: rowRef, className: "@container relative -mx-1 overflow-x-auto px-1 pb-1", children: _jsx(StepperNav, { className: "min-w-max", children: steps.map((item, index) => {
                        const step = index + 1;
                        // Every step but the last grows by the same amount, which places
                        // the labels exactly as justify-between would. The bar row holds
                        // the bar over the label, then the run to the next label.
                        return (_jsxs(StepperItem, { step: step, className: "grid grid-cols-[auto_1fr] grid-rows-[1.25rem_auto] not-last:flex-auto", children: [step === current ? (_jsxs("span", { "aria-hidden": "true", className: cn("grid items-center", step === steps.length
                                        ? "grid-cols-[1fr_auto]"
                                        : "grid-cols-[1fr_auto_1fr]"), children: [_jsx("span", { className: "bg-success h-1 group-first/step:rounded-s-full" }), _jsx(Badge, { variant: "success", className: "px-0.75", children: _jsx(IconPlaceholder, { lucide: "PlaneIcon", tabler: "IconPlaneTilt", hugeicons: "Airplane01Icon", phosphor: "AirplaneTiltIcon", remixicon: "RiPlaneLine", className: "size-3.5 rotate-45 rtl:-scale-x-100 rtl:-rotate-45" }) }), step < steps.length && (_jsx("span", { className: `${ticks} -ms-[0.109375rem] h-1` }))] })) : (_jsx(StepperSeparator, { className: `${bar} group-first/step:rounded-s-full! group-last/step:-me-[0.109375rem]` })), step < steps.length && _jsx(StepperSeparator, { className: bar }), _jsxs(StepperTrigger, { tabIndex: allDone && step === steps.length ? 0 : undefined, className: "data-[state=inactive]:text-ring relative col-start-1 row-start-2 mt-2 gap-1.5 after:absolute after:-inset-1 @max-2xl:min-w-5.5 @max-2xl:justify-center", children: [item.icon, _jsx(StepperTitle, { className: "data-[state=inactive]:text-muted-foreground whitespace-nowrap @max-2xl:sr-only", children: item.title }), step < current && _jsx("span", { className: "sr-only", children: ", done" })] })] }, item.title));
                    }) }) }), _jsxs(StepperPanel, { className: "mt-6 text-center", children: [steps.map((item, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsx("p", { className: "text-sm font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: item.summary })] }, item.title))), _jsxs(StepperContent, { value: steps.length + 1, children: [_jsx("p", { className: "text-sm font-medium", children: "Delivered" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Both parcels arrived and the order is complete." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
