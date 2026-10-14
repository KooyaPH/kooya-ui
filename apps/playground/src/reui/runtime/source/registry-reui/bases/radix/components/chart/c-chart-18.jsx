"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "January", api: 1820, webhook: 1640 },
    { month: "February", api: 2340, webhook: 2160 },
    { month: "March", api: 1960, webhook: 1880 },
    { month: "April", api: 2780, webhook: 2540 },
    { month: "May", api: 2100, webhook: 1920 },
    { month: "June", api: 3120, webhook: 2880 },
    { month: "July", api: 2540, webhook: 2320 },
    { month: "August", api: 3480, webhook: 3160 },
    { month: "September", api: 2860, webhook: 2580 },
    { month: "October", api: 2420, webhook: 2140 },
    { month: "November", api: 3240, webhook: 2960 },
    { month: "December", api: 2680, webhook: 2440 },
];
const chartConfig = {
    api: {
        label: "API Calls",
        color: "var(--chart-1)",
    },
    webhook: {
        label: "Webhooks",
        color: "var(--chart-3)",
    },
};
function CrosshatchPattern({ config }) {
    const entries = Object.entries(config).filter(([, v]) => v.color);
    return (_jsx(_Fragment, { children: entries.map(([key, { color }]) => (_jsxs("pattern", { id: `chart18-crosshatch-${key}`, x: "0", y: "0", width: "8", height: "8", patternUnits: "userSpaceOnUse", children: [_jsx("path", { d: "M0,8 L8,0", stroke: color, strokeWidth: "0.8", opacity: "0.4" }), _jsx("path", { d: "M0,0 L8,8", stroke: color, strokeWidth: "0.8", opacity: "0.2" })] }, key))) }));
}
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Request Volume", _jsxs(Badge, { variant: "success-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), "+12.8%"] })] }), _jsx(CardDescription, { children: "API and webhook traffic over 12 months" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(AreaChart, { accessibilityLayer: true, data: chartData, margin: { top: 20, right: 0, bottom: 0, left: 0 }, children: [_jsx(CartesianGrid, { vertical: false, strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8, tickFormatter: (value) => value.slice(0, 3) }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => (_jsx("div", { className: "border-border/50 mb-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) })), formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: Number(value).toLocaleString() })] })) }) }), _jsx("defs", { children: _jsx(CrosshatchPattern, { config: chartConfig }) }), _jsx(Area, { dataKey: "webhook", type: "natural", fill: "url(#chart18-crosshatch-webhook)", fillOpacity: 0.5, stroke: "var(--color-webhook)", stackId: "a", strokeWidth: 1 }), _jsx(Area, { dataKey: "api", type: "natural", fill: "url(#chart18-crosshatch-api)", fillOpacity: 0.5, stroke: "var(--color-api)", stackId: "a", strokeWidth: 1 })] }) }) })] }));
}
