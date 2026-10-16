"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const intervals = [
    {
        id: "1m",
        icon: (_jsx(IconPlaceholder, { lucide: "ClockIcon", tabler: "IconClock", hugeicons: "ClockIcon", phosphor: "ClockIcon", remixicon: "RiTimeLine", "aria-hidden": "true" })),
    },
    {
        id: "5m",
        icon: (_jsx(IconPlaceholder, { lucide: "ClockIcon", tabler: "IconClock", hugeicons: "ClockIcon", phosphor: "ClockIcon", remixicon: "RiTimeLine", "aria-hidden": "true" })),
    },
    {
        id: "1H",
        icon: (_jsx(IconPlaceholder, { lucide: "ClockIcon", tabler: "IconClock", hugeicons: "ClockIcon", phosphor: "ClockIcon", remixicon: "RiTimeLine", "aria-hidden": "true" })),
    },
    {
        id: "1D",
        icon: (_jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendar", hugeicons: "Calendar02Icon", phosphor: "CalendarIcon", remixicon: "RiCalendarLine", "aria-hidden": "true" })),
    },
    {
        id: "1W",
        icon: (_jsx(IconPlaceholder, { lucide: "CalendarDaysIcon", tabler: "IconCalendarWeek", hugeicons: "Calendar03Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarCheckLine", "aria-hidden": "true" })),
    },
    {
        id: "Auto",
        icon: (_jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "MagicWand01Icon", phosphor: "MagicWandIcon", remixicon: "RiMagicLine", "aria-hidden": "true" })),
    },
];
export default function Pattern() {
    const [active, setActive] = useState("1H");
    return (_jsx(ButtonGroup, { children: intervals.map((interval) => (_jsxs(Button, { variant: "outline", size: "sm", className: cn("h-7 gap-1.5 px-2.5 text-xs tabular-nums", active === interval.id ? "bg-muted" : ""), onClick: () => setActive(interval.id), children: [interval.icon, interval.id] }, interval.id))) }));
}
