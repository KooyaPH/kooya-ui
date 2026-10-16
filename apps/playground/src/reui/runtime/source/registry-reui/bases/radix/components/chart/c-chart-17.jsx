"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Area, CartesianGrid, ComposedChart, Line, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
const chartData = [
    { month: "January", forecast: 2600, forecastArea: 2600 },
    { month: "February", forecast: 4200, forecastArea: 4200 },
    { month: "March", forecast: 2400, forecastArea: 2400 },
    { month: "April", forecast: 5000, forecastArea: 5000 },
    { month: "May", forecast: 2800, forecastArea: 2800 },
    { month: "June", forecast: 5800, forecastArea: 5800 },
    { month: "July", forecast: 3200, forecastArea: 3200 },
    { month: "August", forecast: 6200, forecastArea: 6200 },
    { month: "September", forecast: 3800, forecastArea: 3800 },
];
const chartConfig = {
    forecast: { label: "Forecast", color: "var(--chart-4)" },
    forecastArea: { label: "Forecast", color: "var(--chart-4)" },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Sales Forecast" }), _jsx(CardDescription, { children: "Projected sales performance with trends" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(ComposedChart, { accessibilityLayer: true, data: chartData, margin: { top: 20, right: 0, bottom: 0, left: 0 }, children: [_jsx("defs", { children: _jsxs("pattern", { id: "chart17-forecast-stripe", patternUnits: "userSpaceOnUse", width: "6", height: "6", children: [_jsx("rect", { width: "6", height: "6", fill: "var(--color-forecast)", opacity: "0.04" }), _jsx("path", { d: "M0,6 L6,0", stroke: "var(--color-forecast)", strokeWidth: "0.8", opacity: "0.15" })] }) }), _jsx(CartesianGrid, { vertical: false, strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8, tickFormatter: (value) => value.slice(0, 3) }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => (_jsx("div", { className: "border-border/50 mb-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) })), formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "rounded-xs h-2.5 w-2.5 shrink-0 bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: value != null
                                                    ? `$${Number(value).toLocaleString()}`
                                                    : "—" })] })) }) }), _jsx(ChartLegend, { content: _jsx(ChartLegendContent, {}) }), _jsx(Area, { dataKey: "forecastArea", type: "natural", fill: "url(#chart17-forecast-stripe)", stroke: "none", connectNulls: true, legendType: "none", tooltipType: "none" }), _jsx(Line, { dataKey: "forecast", type: "natural", stroke: "var(--color-forecast)", strokeWidth: 2.5, dot: false, connectNulls: true })] }) }) })] }));
}
