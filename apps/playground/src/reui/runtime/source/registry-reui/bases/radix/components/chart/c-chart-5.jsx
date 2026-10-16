"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "Jan", desktop: 340, mobile: 180 },
    { month: "Feb", desktop: 870, mobile: 420 },
    { month: "Mar", desktop: 510, mobile: 280 },
    { month: "Apr", desktop: 620, mobile: 350 },
    { month: "May", desktop: 450, mobile: 240 },
    { month: "Jun", desktop: 780, mobile: 390 },
];
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
};
export default function ChartBarPattern() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["User Acquisition", _jsxs(Badge, { variant: "destructive-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingDownIcon", tabler: "IconTrendingDown", hugeicons: "TradeDownIcon", phosphor: "TrendDownIcon", remixicon: "RiArrowRightDownLongLine", "aria-hidden": "true" }), "-15%"] })] }), _jsx(CardDescription, { children: "Quarterly user growth tracking" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(BarChart, { accessibilityLayer: true, data: chartData, margin: {
                            top: 20,
                            right: 12,
                            bottom: 12,
                            left: 12,
                        }, children: [_jsxs("defs", { children: [_jsxs("pattern", { id: "chart3-diagonal-stripe-pattern", patternUnits: "userSpaceOnUse", width: "8", height: "8", children: [_jsx("rect", { width: "8", height: "8", fill: "var(--color-desktop)", opacity: "0.1" }), _jsx("path", { d: "M0,8 L8,0 M4,12 L12,4 M-4,4 L4,-4", stroke: "var(--color-desktop)", strokeWidth: "1.5", opacity: "0.6" }), _jsx("path", { d: "M2,10 L10,2 M6,14 L14,6 M-2,6 L6,-2", stroke: "var(--color-desktop)", strokeWidth: "1", opacity: "0.3" })] }), _jsxs("linearGradient", { id: "bar-gradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-1)", stopOpacity: "0.9" }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-1)", stopOpacity: "0.6" })] })] }), _jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8 }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => {
                                        return (_jsx("div", { className: "border-border/50 mb-0.5 flex flex-col gap-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) }));
                                    }, formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold", children: Number(value).toLocaleString() })] })) }) }), _jsx(Bar, { dataKey: "desktop", fill: "url(#chart3-diagonal-stripe-pattern)", stroke: "var(--color-desktop)", strokeWidth: 1, radius: [4, 4, 4, 4] }), _jsx(Bar, { dataKey: "mobile", fill: "var(--color-mobile)", stroke: "var(--color-mobile)", strokeWidth: 1, radius: [4, 4, 4, 4] })] }) }) })] }));
}
