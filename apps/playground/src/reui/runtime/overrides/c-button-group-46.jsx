// Owned responsive correction to the actual attributed REUI recipe.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "../../adapters/controls";
import { ButtonGroup } from "../../adapters/controls";
import { IconPlaceholder } from "../../adapters/icons";
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
    const container = useRef(null);
    const [vertical, setVertical] = useState(false);
    useLayoutEffect(() => {
        const node = container.current;
        if (!node)
            return;
        // Six actual native controls total353px; compact borders overlap by5px.
        const update = () => setVertical(node.clientWidth < 348);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    return (_jsx("div", { ref: container, role: "group", "aria-label": "Chart interval", style: { width: "100%", maxWidth: 348, minWidth: 0 }, children: _jsx(ButtonGroup, { orientation: vertical ? "vertical" : "horizontal", style: { width: vertical ? "100%" : undefined, gap: 0 }, children: intervals.map((interval) => (_jsxs(Button, { variant: "outline", size: "sm", className: "h-7 gap-1.5 px-2.5 text-xs tabular-nums", "aria-pressed": active === interval.id, style: {
                    width: vertical ? "100%" : undefined,
                    background: active === interval.id ? "var(--ku-subtle)" : undefined,
                    borderColor: active === interval.id ? "var(--ku-focus)" : undefined,
                }, onClick: () => setActive(interval.id), children: [interval.icon, interval.id] }, interval.id))) }) }));
}
