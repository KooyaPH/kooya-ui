"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "January", connections: 48 },
    { month: "February", connections: 62 },
    { month: "March", connections: 62 },
    { month: "April", connections: 85 },
    { month: "May", connections: 85 },
    { month: "June", connections: 110 },
    { month: "July", connections: 110 },
    { month: "August", connections: 135 },
];
const chartConfig = {
    connections: {
        label: "Connections",
        color: "var(--chart-2)",
    },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Active Connections", _jsxs(Badge, { variant: "success-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), "+257%"] })] }), _jsx(CardDescription, { children: "Server connection pool over time" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(AreaChart, { accessibilityLayer: true, data: chartData, margin: { top: 20, right: 2, bottom: 0, left: 2 }, children: [_jsxs("defs", { children: [_jsxs("pattern", { id: "chart15-dot-pattern", patternUnits: "userSpaceOnUse", width: "5", height: "5", children: [_jsx("rect", { width: "5", height: "5", fill: "var(--color-connections)", opacity: "0.08" }), _jsx("circle", { cx: "2.5", cy: "2.5", r: "1", fill: "var(--color-connections)", opacity: "0.5" })] }), _jsxs("linearGradient", { id: "chart15-stroke-grad", x1: "0", y1: "0", x2: "1", y2: "0", children: [_jsx("stop", { offset: "0%", stopColor: "var(--color-connections)", stopOpacity: 0.4 }), _jsx("stop", { offset: "100%", stopColor: "var(--color-connections)", stopOpacity: 1 })] })] }), _jsx(CartesianGrid, { vertical: false, strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8, tickFormatter: (value) => value.slice(0, 3) }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => (_jsx("div", { className: "border-border/50 mb-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) })), formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: Number(value).toLocaleString() })] })) }) }), _jsx(Area, { dataKey: "connections", type: "stepAfter", fill: "url(#chart15-dot-pattern)", stroke: "var(--color-connections)", strokeWidth: 2 })] }) }) })] }));
}
