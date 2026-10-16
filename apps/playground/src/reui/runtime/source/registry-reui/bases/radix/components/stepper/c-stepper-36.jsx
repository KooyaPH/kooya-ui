"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { IconTile } from "../../reui/icon-tile.jsx";
import { Stepper, StepperContent, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const stops = [
    {
        code: "SGSIN",
        port: "Singapore",
        carrier: "Maersk Sealand",
        voyage: "214E",
        terminal: "Tuas",
        summary: "Loaded at Tuas onto Maersk Sealand, voyage 214E, and sailed on 17 May.",
        details: [
            { label: "Loaded", value: "16 May" },
            { label: "Departed", value: "17 May" },
            {
                label: "Captain",
                value: "M. Walberg",
                badge: "outline",
                avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
            },
            { label: "B/L", value: "MSK8842A" },
        ],
    },
    {
        code: "LKCMB",
        port: "Colombo",
        carrier: "MSC Aurora",
        voyage: "088W",
        terminal: "SAGT",
        summary: "All 4 containers moved to MSC Aurora at SAGT and sailed on 22 May.",
        details: [
            { label: "Arrived", value: "21 May" },
            { label: "Departed", value: "22 May" },
            { label: "Containers", value: "4×40HC", warning: true },
            { label: "Transship", value: "Done", badge: "success-light" },
        ],
    },
    {
        code: "EGPSD",
        port: "Port Said",
        carrier: "MSC Aurora",
        voyage: "088W",
        terminal: "Med Sea",
        summary: "Through the Suez Canal on 26 May at 18 knots, now a day behind.",
        details: [
            { label: "Passed", value: "26 May" },
            { label: "Speed", value: "18kn" },
            { label: "Delay", value: "+1 day", badge: "warning-light" },
        ],
        progress: 4,
    },
    {
        code: "NLRTM",
        port: "Rotterdam",
        carrier: "MSC Aurora",
        voyage: "088W",
        terminal: "ECT Delta",
        summary: "Due at ECT Delta on 3 June to unload 1 container once customs clear it.",
        details: [
            { label: "ETA", value: "03 Jun" },
            { label: "ETD", value: "04 Jun" },
            { label: "Unload", value: "1×40HC", warning: true },
            { label: "Customs", value: "Pending", badge: "secondary" },
        ],
    },
    {
        code: "DEHAM",
        port: "Hamburg",
        carrier: "DB Cargo",
        voyage: "4410",
        terminal: "CTA",
        summary: "Due on 6 June, then the last 3 containers go on by DB Cargo train 4410.",
        details: [
            { label: "ETA", value: "06 Jun" },
            { label: "ETD", value: "07 Jun" },
            { label: "Unload", value: "3×40HC", warning: true },
            { label: "Onward", value: "Rail", badge: "secondary" },
        ],
    },
];
const segments = 6;
// The 34px ring stays transparent and the 28px dot inside it carries the
// state color, so the 2px gap between them shows whatever surface is behind.
// The theme has no blue token, so the route takes the palette blue-500.
function Anchor({ className }) {
    return (_jsx("span", { className: cn("flex size-7 items-center justify-center rounded-full", className), children: _jsx(IconPlaceholder, { lucide: "AnchorIcon", tabler: "IconAnchor", hugeicons: "AnchorIcon", phosphor: "AnchorIcon", remixicon: "RiAnchorLine", className: "size-3.5", "aria-hidden": "true" }) }));
}
const reached = _jsx(Anchor, { className: "bg-blue-500 text-white" });
const indicators = {
    completed: reached,
    active: reached,
    inactive: _jsx(Anchor, { className: "bg-input text-foreground" }),
};
// The leg at sea is a 13px sine period repeated as a mask over a hard-stop
// gradient: blue for the distance sailed, ring for what is left. The style
// radius would clip the wave where it meets the ends, so it is squared off.
const wave = "bg-transparent bg-linear-to-r from-blue-500 from-75% to-ring/40 to-75% mask-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220,0,13,8%22%3E%3Cpath%20d=%22M0,4Q3.25,-2.5,6.5,4T13,4%22%20fill=%22none%22%20stroke=%22%23000%22%20stroke-width=%221.5%22/%3E%3C/svg%3E')] mask-size-[0.8125rem_0.5rem] mask-repeat-x rounded-none! rtl:bg-linear-to-l rtl:mask-right group-data-[orientation=horizontal]/stepper-nav:h-2";
function Row({ label, className, children, }) {
    return (_jsxs("div", { className: cn("flex items-center gap-1", className), children: [_jsx("dt", { className: "text-muted-foreground shrink-0", children: label }), _jsx("dd", { className: "flex min-w-0 flex-1 items-center justify-end gap-1 self-stretch", children: children })] }));
}
// Skewed from its top end corner, so the slanted bar finishes flush with the
// values above it and leans forward in either direction.
function LegProgress({ value, to }) {
    return (_jsx("span", { role: "progressbar", "aria-label": `Progress to ${to}`, "aria-valuemin": 0, "aria-valuemax": segments, "aria-valuenow": value, className: "flex origin-top-right -skew-x-20 gap-0.5 rtl:origin-top-left rtl:skew-x-20", children: Array.from({ length: segments }, (_, index) => (_jsx("span", { className: cn("h-2 w-2.5 rounded-xs border", index < value
                ? "border-success/60 bg-success/50"
                : "border-ring/60 bg-ring/20") }, index))) }));
}
export default function Pattern() {
    const [current, setCurrent] = useState(3);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // One past the last step marks every step complete. No tab is selected
    // then, so the last one keeps the tablist's tab stop.
    const allDone = current > stops.length;
    function goTo(step) {
        setCurrent(step);
        // The pressed button disables itself at either end, so focus moves to
        // its partner.
        if (step === 1)
            nextRef.current?.focus();
        if (step > stops.length)
            prevRef.current?.focus();
    }
    return (_jsxs(Stepper, { value: current, onValueChange: setCurrent, indicators: indicators, className: "@container flex w-full max-w-250 flex-col gap-6", "aria-label": "Shipment route", children: [_jsxs(StepperNav, { children: [stops.map((stop, index) => {
                        const step = index + 1;
                        const next = stops[index + 1];
                        return (_jsxs(StepperItem, { step: step, className: "min-w-0 items-stretch justify-start group-data-[orientation=horizontal]/stepper-nav:flex-col", children: [_jsxs("div", { className: "-mb-2.5 hidden flex-col items-center gap-1 ps-8.5 whitespace-nowrap @3xl:flex", children: [_jsx("p", { className: "text-sm font-medium", children: stop.carrier }), _jsxs("p", { className: "flex items-center gap-1 text-xs font-medium text-blue-500", children: [stop.voyage, _jsx("span", { "aria-hidden": "true", className: "before:bg-ring/40 flex w-2.5 justify-center before:h-3 before:w-px before:rotate-45" }), stop.terminal] })] }), _jsxs("div", { className: "flex h-8.5 items-center", children: [_jsx(StepperTrigger, { tabIndex: allDone && step === stops.length ? 0 : undefined, "aria-label": stop.port, children: _jsx(StepperIndicator, { className: "border-input/50 size-8.5 border bg-transparent not-data-[state=inactive]:border-blue-500 data-[state=active]:bg-transparent data-[state=completed]:bg-transparent" }) }), _jsx(StepperSeparator, { className: cn("bg-ring/20 m-0 data-[state=completed]:bg-blue-500", step === current && wave) })] }), _jsxs("div", { className: "mt-2.5 flex flex-col gap-2 ps-0.5 pe-4", children: [_jsx(StepperTitle, { className: cn("whitespace-nowrap", !(allDone && step === stops.length) &&
                                                "@max-sm:not-data-[state=active]:sr-only"), children: stop.code }), _jsxs("dl", { className: "hidden flex-col gap-1 text-xs whitespace-nowrap @2xl:flex", children: [stop.details.map((detail, row) => (_jsxs(Row, { label: detail.label, className: row > 1 ? "hidden @3xl:flex" : undefined, children: [_jsx("span", { "aria-hidden": "true", className: "bg-ring/30 mb-1 h-px min-w-1 flex-1 self-end mask-[linear-gradient(to_right,transparent_25%,#000_0_75%,transparent_0)] mask-size-[0.25rem_100%] mask-repeat-space" }), detail.badge ? (_jsxs(Badge, { variant: detail.badge, radius: "full", children: [detail.avatar && (_jsxs(Avatar, { className: "hidden size-3 @4xl:flex", children: [_jsx(AvatarImage, { src: detail.avatar, alt: "" }), _jsx(AvatarFallback, { children: detail.value.charAt(0) })] })), detail.value] })) : (
                                                        // Upcoming stops dim their figures, which stay
                                                        // estimates until the vessel gets there. Counts take
                                                        // yellow-600 to stay legible on white.
                                                        _jsx("span", { className: cn("truncate font-medium", detail.warning
                                                                ? "group-data-[state=inactive]/step:text-warning/60 text-yellow-600"
                                                                : "group-data-[state=inactive]/step:text-muted-foreground"), children: detail.value }))] }, detail.label))), next && stop.progress !== undefined && (_jsx(Row, { className: "hidden @3xl:flex", label: _jsxs(_Fragment, { children: ["To", " ", _jsx("span", { className: "text-foreground font-medium", children: next.code })] }), children: _jsx(LegProgress, { value: stop.progress, to: next.port }) }))] })] })] }, stop.code));
                    }), _jsx(IconTile, { radius: "full", size: "sm", "aria-hidden": "true", className: "[--icon-tile-size:--spacing(8.5)] @3xl:mt-7.5", children: _jsx(IconPlaceholder, { lucide: "ArrowRightIcon", tabler: "IconArrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLine", className: "text-muted-foreground size-3.5 rtl:rotate-180" }) })] }), _jsxs(StepperPanel, { className: "text-center", children: [stops.map((stop, index) => (_jsxs(StepperContent, { value: index + 1, children: [_jsx("p", { className: "text-sm font-medium", children: stop.port }), _jsx("p", { className: "text-muted-foreground text-sm", children: stop.summary })] }, stop.code))), _jsxs(StepperContent, { value: stops.length + 1, children: [_jsx("p", { className: "text-sm font-medium", children: "Arrived in Hamburg" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Discharged at the terminal, the voyage is complete." })] }), _jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: current === 1, onClick: () => goTo(current - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => goTo(current + 1), children: "Next" })] })] })] }));
}
