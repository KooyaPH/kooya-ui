"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "Jan", desktop: 120 },
    { month: "Feb", desktop: 250 },
    { month: "Mar", desktop: 200 },
    { month: "Apr", desktop: 170 },
    { month: "May", desktop: 209 },
    { month: "Jun", desktop: 210 },
    { month: "Jul", desktop: 150 },
    { month: "Aug", desktop: 230 },
    { month: "Sep", desktop: 180 },
    { month: "Oct", desktop: 190 },
    { month: "Nov", desktop: 200 },
    { month: "Dec", desktop: 120 },
];
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-3)",
    },
};
const CustomGradientBar = (props) => {
    const { fill, x, y, width, height, dataKey } = props;
    const barX = x;
    const barY = y;
    const barWidth = width;
    const barHeight = height;
    return (_jsxs(_Fragment, { children: [_jsx("defs", { children: _jsxs("linearGradient", { id: `gradient-bar-pattern-${dataKey}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: fill, stopOpacity: 0.7 }), _jsx("stop", { offset: "50%", stopColor: fill, stopOpacity: 0.4 }), _jsx("stop", { offset: "100%", stopColor: fill, stopOpacity: 0.2 })] }) }), _jsx("rect", { x: barX, y: barY, width: barWidth, height: barHeight, stroke: "none", fill: `url(#gradient-bar-pattern-${dataKey})`, rx: "6", ry: "6" })] }));
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Engagement Metrics", _jsxs(Badge, { variant: "success-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), "+2.4%"] })] }), _jsx(CardDescription, { children: "User interaction and click-through rates" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(BarChart, { accessibilityLayer: true, data: chartData, margin: {
                            top: 20,
                            right: 12,
                            bottom: 12,
                            left: 12,
                        }, barCategoryGap: "15%", children: [_jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8 }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => {
                                        return (_jsx("div", { className: "border-border/50 mb-0.5 flex flex-col gap-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) }));
                                    }, formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold", children: Number(value).toLocaleString() })] })) }) }), _jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", shape: _jsx(CustomGradientBar, {}) })] }) }) })] }));
}
