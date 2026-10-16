"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { IconTile } from "../../reui/icon-tile.jsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const moon = (_jsx(IconPlaceholder, { lucide: "MoonIcon", tabler: "IconMoon", hugeicons: "Moon02Icon", phosphor: "MoonIcon", remixicon: "RiMoonLine" }));
const sun = (_jsx(IconPlaceholder, { lucide: "SunIcon", tabler: "IconSun", hugeicons: "Sun01Icon", phosphor: "SunIcon", remixicon: "RiSunLine" }));
const stops = [
    {
        title: "Pickup",
        place: "Memphis, TN",
        km: "0",
        note: "24 pallets loaded and sealed, westbound on I-40.",
        icon: (_jsx(IconPlaceholder, { lucide: "PackagePlusIcon", tabler: "IconPackageImport", hugeicons: "PackageAddIcon", phosphor: "PackageIcon", remixicon: "RiBox3Line" })),
    },
    {
        title: "Overnight rest",
        place: "Amarillo, TX",
        km: "1,155",
        note: "8 hours in the sleeper berth before the next shift.",
        icon: moon,
        rest: "8H",
    },
    {
        title: "Back on the road",
        place: "Amarillo, TX",
        km: "1,155",
        note: "A fresh 11-hour driving window, 1,735 km to go.",
        icon: sun,
    },
    {
        title: "Fuel stop",
        place: "Gallup, NM",
        km: "1,840",
        note: "Refueled with 410 L of diesel and checked the tires.",
        icon: (_jsx(IconPlaceholder, { lucide: "FuelIcon", tabler: "IconGasStation", hugeicons: "FuelStationIcon", phosphor: "GasPumpIcon", remixicon: "RiGasStationLine" })),
    },
    {
        title: "Overnight rest",
        place: "Kingman, AZ",
        km: "2,375",
        note: "8 hours in the sleeper berth, 515 km from delivery.",
        icon: moon,
        rest: "8H",
    },
    {
        title: "Back on the road",
        place: "Kingman, AZ",
        km: "2,375",
        note: "On I-40 to Barstow, then I-15 into Los Angeles.",
        icon: sun,
    },
    {
        title: "Delivery",
        place: "Los Angeles, CA",
        km: "2,890",
        note: "Signed for at dock 4 by the receiving clerk.",
        icon: (_jsx(IconPlaceholder, { lucide: "FlagIcon", tabler: "IconFlag", hugeicons: "Flag03Icon", phosphor: "FlagIcon", remixicon: "RiFlagLine" })),
    },
];
// A gradient cut into 2x6px pill bars by a 6px SVG mask tile, spaced edge to
// edge by mask-repeat: space so no bar is ever clipped. The -2px margins land
// the first and last bar flush with the 4px margins around the leg.
function Leg({ rest, live }) {
    return (_jsxs("div", { className: "relative mx-1 flex min-w-3 flex-1 items-center self-stretch", children: [_jsx(StepperSeparator, { className: "from-input/80 to-input/80 data-[state=active]:from-success/24 data-[state=active]:to-success/80 -mx-0.5 bg-transparent bg-linear-to-r mask-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220,0,6,6%22%3E%3Crect%20x=%222%22%20width=%222%22%20height=%226%22%20rx=%221%22/%3E%3C/svg%3E')] mask-size-[0.375rem_100%] mask-repeat-space group-data-[orientation=horizontal]/stepper-nav:h-1.5 rtl:bg-linear-to-l" }), rest && (_jsx(Badge, { variant: "invert", className: "pointer-events-none absolute inset-0 m-auto @max-xl:hidden", "aria-hidden": "true", children: rest })), live && (_jsx(Badge, { variant: "success", className: cn("pointer-events-none absolute inset-x-0 mx-auto", rest ? "-top-4.5" : "-top-3.5"), "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "TruckIcon", tabler: "IconTruck", hugeicons: "TruckIcon", phosphor: "TruckIcon", remixicon: "RiTruckLine", className: "rtl:-scale-x-100" }) }))] }));
}
export default function Pattern() {
    const [current, setCurrent] = useState(6);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // One past the last step marks every step complete. No tab is selected
    // then, so the last one keeps the tablist's tab stop.
    const allDone = current > stops.length;
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
        // The pressed button disables itself at either end, so focus moves to its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > stops.length)
            prevRef.current?.focus();
    }
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, className: "w-full max-w-200", "aria-label": "Freight route", children: [_jsx("div", { ref: rowRef, className: "@container relative -mx-1 overflow-x-auto px-1 pt-4.5 pb-1", children: _jsx(StepperNav, { className: "min-w-max", children: stops.map((stop, index) => {
                        const step = index + 1;
                        const last = step === stops.length;
                        const active = step === current;
                        // Each stop owns the leg that follows it, so the active stop's
                        // leg is the live one. Rest stops keep a fixed 32px leg.
                        return (_jsxs(StepperItem, { step: step, className: cn(stop.rest && "@xl:w-17.5 @xl:not-last:flex-none"), children: [_jsx(StepperTrigger, { tabIndex: allDone && step === stops.length ? 0 : undefined, "aria-label": `${stop.title}, ${stop.place}`, children: _jsx(StepperIndicator, { className: "border-input/50 size-7.5 border bg-transparent data-[state=active]:bg-transparent data-[state=completed]:bg-transparent", children: _jsx(IconTile, { variant: "solid", size: "xs", radius: "full", className: cn("bg-input text-foreground [--icon-tile-icon-size:--spacing(3)]", last && step <= current && "bg-success text-white"), "aria-hidden": "true", children: stop.icon }) }) }), !last && _jsx(Leg, { rest: stop.rest, live: active })] }, `${stop.title} ${stop.place}`));
                    }) }) }), _jsxs(StepperPanel, { className: "mt-5 text-center", children: [stops.map((stop, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsxs("p", { className: "text-muted-foreground flex items-center justify-center gap-1.5 text-xs whitespace-nowrap", children: [stop.place, _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), "km ", stop.km] }), _jsx("p", { className: "text-sm font-medium", children: stop.title }), _jsx("p", { className: "text-muted-foreground text-sm", children: stop.note })] }, `${stop.title} ${stop.place}`))), _jsxs(StepperContent, { value: stops.length + 1, children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", stops.length, " stops done"] }), _jsx("p", { className: "text-sm font-medium", children: "Trip complete" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "The load is signed for and the trip is closed." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
