"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { motion } from "motion/react";
import { Bar, BarChart, XAxis } from "recharts";
import { cn } from "cn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const CustomBar = (props) => {
    const { fill, x, y, width, height, index, activeIndex, value } = props;
    // Custom variables
    const xPos = Number(x || 0);
    const realWidth = Number(width || 0);
    const isActive = index === activeIndex;
    const collapsedWidth = 6;
    // centered bar x-position
    const barX = isActive ? xPos : xPos + (realWidth - collapsedWidth) / 2;
    // centered text x-position
    const textX = xPos + realWidth / 2;
    // Custom bar shape
    return (_jsxs("g", { onMouseEnter: () => props.setActiveIndex(index), children: [_jsx(motion.rect, { style: {
                    willChange: "transform, width", // helps with performance
                }, y: y, initial: { width: collapsedWidth, x: barX }, animate: { width: isActive ? realWidth : collapsedWidth, x: barX }, transition: {
                    duration: activeIndex === index ? 0.5 : 1,
                    type: "spring",
                }, height: height, fill: fill, rx: "3" }), isActive && (_jsx(motion.text, { style: {
                    willChange: "transform, opacity", // helps with performance
                }, className: "font-mono", initial: { opacity: 0, y: -10, filter: "blur(3px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: { opacity: 0, y: -10, filter: "blur(3px)" }, transition: { duration: 0.1 }, x: textX, y: Number(y) - 5, textAnchor: "middle", fill: fill, children: value }, index))] }));
};
const chartData = [
    { month: "January", desktop: 289 },
    { month: "February", desktop: 345 },
    { month: "March", desktop: 412 },
    { month: "April", desktop: 478 },
    { month: "May", desktop: 534 },
    { month: "June", desktop: 456 },
    { month: "July", desktop: 523 },
    { month: "August", desktop: 589 },
    { month: "September", desktop: 467 },
    { month: "October", desktop: 398 },
    { month: "November", desktop: 356 },
    { month: "December", desktop: 423 },
];
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-4)",
    },
};
export default function Pattern() {
    const [activeIndex, setActiveIndex] = useState(undefined);
    const activeData = useMemo(() => {
        if (activeIndex === undefined)
            return null;
        return chartData[activeIndex];
    }, [activeIndex]);
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: ["Conversion Rates", _jsxs("span", { className: cn("ml-auto font-mono text-xl tracking-tighter"), children: ["$", activeData ? activeData.desktop : "123"] }), _jsxs(Badge, { variant: "success-light", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), _jsx("span", { children: "5.2%" })] })] }), _jsx(CardDescription, { children: "Real-time funnel conversion tracking" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(BarChart, { accessibilityLayer: true, data: chartData, onMouseLeave: () => setActiveIndex(undefined), margin: {
                            top: 20,
                            right: 12,
                            bottom: 12,
                            left: 12,
                        }, children: [_jsx(XAxis, { dataKey: "month", tickLine: false, tickMargin: 10, axisLine: false, tickFormatter: (value) => value.slice(0, 3) }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => {
                                        return (_jsx("div", { className: "border-border/50 mb-0.5 flex flex-col gap-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) }));
                                    }, formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold", children: Number(value).toLocaleString() })] })) }) }), _jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", shape: _jsx(CustomBar, { setActiveIndex: setActiveIndex, activeIndex: activeIndex }) })] }) }) })] }));
}
