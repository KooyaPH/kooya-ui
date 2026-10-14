"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
const chartData = [
    { priority: "critical", bugs: 14, fill: "url(#chart22-critical-pattern)" },
    { priority: "high", bugs: 28, fill: "var(--color-high)" },
    { priority: "medium", bugs: 42, fill: "url(#chart22-medium-pattern)" },
    { priority: "low", bugs: 36, fill: "var(--color-low)" },
];
const chartConfig = {
    bugs: { label: "Bugs" },
    critical: { label: "Critical", color: "var(--destructive)" },
    high: { label: "High", color: "var(--chart-4)" },
    medium: { label: "Medium", color: "var(--chart-3)" },
    low: { label: "Low", color: "var(--chart-5)" },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { className: "items-center pb-0", children: [_jsx(CardTitle, { children: "Bug Priority" }), _jsx(CardDescription, { children: "Open issues by severity level" })] }), _jsx(CardContent, { className: "flex-1 pb-0", children: _jsx(ChartContainer, { config: chartConfig, className: "mx-auto aspect-square max-h-[300px]", children: _jsxs(PieChart, { accessibilityLayer: true, children: [_jsxs("defs", { children: [_jsxs("pattern", { id: "chart22-critical-pattern", patternUnits: "userSpaceOnUse", width: "6", height: "6", children: [_jsx("rect", { width: "6", height: "6", fill: "var(--destructive)", opacity: "0.3" }), _jsx("path", { d: "M0,6 L6,0 M-2,2 L2,-2 M4,8 L8,4", stroke: "var(--destructive)", strokeWidth: "1.5", opacity: "0.9" })] }), _jsxs("pattern", { id: "chart22-medium-pattern", patternUnits: "userSpaceOnUse", width: "5", height: "5", children: [_jsx("rect", { width: "5", height: "5", fill: "var(--chart-3)", opacity: "0.2" }), _jsx("circle", { cx: "2.5", cy: "2.5", r: "1.2", fill: "var(--chart-3)", opacity: "0.7" })] })] }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { className: "min-w-40 gap-2.5", formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: Number(value).toLocaleString() })] })) }) }), _jsx(ChartLegend, { content: _jsx(ChartLegendContent, { nameKey: "priority" }), className: "-translate-y-2" }), _jsx(Pie, { data: chartData, dataKey: "bugs", nameKey: "priority", innerRadius: 40, cornerRadius: 4, paddingAngle: 3, stroke: "var(--background)", strokeWidth: 3, children: chartData.map((entry) => (_jsx(Cell, { fill: entry.fill }, entry.priority))) })] }) }) })] }));
}
