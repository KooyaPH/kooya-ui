"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "Jan", desktop: 342, mobile: 245 },
    { month: "Feb", desktop: 876, mobile: 654 },
    { month: "Mar", desktop: 512, mobile: 389 },
    { month: "Apr", desktop: 629, mobile: 521 },
    { month: "May", desktop: 458, mobile: 367 },
    { month: "Jun", desktop: 781, mobile: 598 },
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
export default function ChartVerticalBars() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Inventory Levels", _jsxs(Badge, { variant: "destructive-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingDownIcon", tabler: "IconTrendingDown", hugeicons: "TradeDownIcon", phosphor: "TrendDownIcon", remixicon: "RiArrowRightDownLongLine", "aria-hidden": "true" }), "-3.2%"] })] }), _jsx(CardDescription, { children: "Stock availability across warehouses" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(BarChart, { accessibilityLayer: true, data: chartData, layout: "vertical", margin: {
                            left: -10,
                            right: 20,
                        }, barCategoryGap: "30%", children: [_jsx(YAxis, { type: "category", dataKey: "month", tickLine: false, tickMargin: 10, axisLine: false }), _jsx(XAxis, { type: "number", tickLine: false, tickMargin: 10, axisLine: false, hide: true }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => {
                                        return (_jsx("div", { className: "border-border/50 mb-0.5 flex flex-col gap-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) }));
                                    }, formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold", children: Number(value).toLocaleString() })] })) }) }), _jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", radius: 2 }), _jsx(Bar, { dataKey: "mobile", fill: "var(--color-mobile)", radius: 2 })] }) }) })] }));
}
