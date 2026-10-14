"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "January", organic: 1200, paid: 580, referral: 320 },
    { month: "February", organic: 1450, paid: 620, referral: 380 },
    { month: "March", organic: 1380, paid: 540, referral: 420 },
    { month: "April", organic: 1650, paid: 710, referral: 460 },
    { month: "May", organic: 1520, paid: 680, referral: 390 },
    { month: "June", organic: 1800, paid: 750, referral: 510 },
];
const chartConfig = {
    organic: { label: "Organic", color: "var(--chart-1)" },
    paid: { label: "Paid", color: "var(--chart-2)" },
    referral: { label: "Referral", color: "var(--chart-3)" },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Traffic Sources", _jsxs(Badge, { variant: "success-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), "+18.3%"] })] }), _jsx(CardDescription, { children: "Visitor acquisition by channel" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(AreaChart, { accessibilityLayer: true, data: chartData, margin: { top: 20, right: 0, bottom: 0, left: 0 }, children: [_jsx("defs", { children: ["organic", "paid", "referral"].map((key) => (_jsxs("linearGradient", { id: `chart14-${key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: `var(--color-${key})`, stopOpacity: 0.5 }), _jsx("stop", { offset: "95%", stopColor: `var(--color-${key})`, stopOpacity: 0.1 })] }, key))) }), _jsx(CartesianGrid, { vertical: false, strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8, tickFormatter: (value) => value.slice(0, 3) }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => (_jsx("div", { className: "border-border/50 mb-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) })), formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: Number(value).toLocaleString() })] })) }) }), _jsx(Area, { dataKey: "referral", type: "natural", stackId: "1", fill: "url(#chart14-referral)", fillOpacity: 0.4, stroke: "var(--color-referral)", strokeWidth: 0.8, strokeDasharray: "3 3" }), _jsx(Area, { dataKey: "paid", type: "natural", stackId: "1", fill: "url(#chart14-paid)", fillOpacity: 0.4, stroke: "var(--color-paid)", strokeWidth: 0.8, strokeDasharray: "3 3" }), _jsx(Area, { dataKey: "organic", type: "natural", stackId: "1", fill: "url(#chart14-organic)", fillOpacity: 0.4, stroke: "var(--color-organic)", strokeWidth: 2 })] }) }) })] }));
}
