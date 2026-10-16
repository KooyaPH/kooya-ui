"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "January", visitors: 2400 },
    { month: "February", visitors: 2850 },
    { month: "March", visitors: 2600 },
    { month: "April", visitors: 3100 },
    { month: "May", visitors: 2900 },
    { month: "June", visitors: 3400 },
];
const chartConfig = {
    visitors: {
        label: "Visitors",
        color: "var(--chart-1)",
    },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Website Traffic", _jsxs(Badge, { variant: "success-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), "+24.5%"] })] }), _jsx(CardDescription, { children: "Monthly unique visitor trends" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(AreaChart, { accessibilityLayer: true, data: chartData, margin: { top: 20, right: 0, bottom: 0, left: 0 }, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "chart13-gradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "var(--color-visitors)", stopOpacity: 0.5 }), _jsx("stop", { offset: "95%", stopColor: "var(--color-visitors)", stopOpacity: 0.05 })] }), _jsx("pattern", { id: "chart13-stripe", patternUnits: "userSpaceOnUse", width: "6", height: "6", children: _jsx("path", { d: "M0,6 L6,0", stroke: "var(--color-visitors)", strokeWidth: "0.8", opacity: "0.15" }) })] }), _jsx(CartesianGrid, { vertical: false, strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8, tickFormatter: (value) => value.slice(0, 3) }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => (_jsx("div", { className: "border-border/50 mb-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) })), formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: Number(value).toLocaleString() })] })) }) }), _jsx(Area, { dataKey: "visitors", type: "natural", fill: "url(#chart13-gradient)", stroke: "var(--color-visitors)", strokeWidth: 2 })] }) }) })] }));
}
