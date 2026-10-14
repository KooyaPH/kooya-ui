"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
const chartData = [
    { status: "completed", count: 186, fill: "var(--color-completed)" },
    { status: "inProgress", count: 94, fill: "var(--color-inProgress)" },
    { status: "pending", count: 62, fill: "var(--color-pending)" },
    { status: "cancelled", count: 28, fill: "var(--color-cancelled)" },
];
const totalTasks = chartData.reduce((sum, d) => sum + d.count, 0);
const completionRate = Math.round((chartData[0].count / totalTasks) * 100);
const chartConfig = {
    count: { label: "Tasks" },
    completed: { label: "Completed", color: "var(--chart-1)" },
    inProgress: { label: "In Progress", color: "var(--chart-2)" },
    pending: { label: "Pending", color: "var(--chart-3)" },
    cancelled: { label: "Cancelled", color: "var(--chart-5)" },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { className: "items-center pb-0", children: [_jsx(CardTitle, { children: "Task Status" }), _jsx(CardDescription, { children: "Current sprint task breakdown" })] }), _jsx(CardContent, { className: "flex-1 pb-0", children: _jsx(ChartContainer, { config: chartConfig, className: "mx-auto aspect-square max-h-[280px]", children: _jsxs(PieChart, { accessibilityLayer: true, children: [_jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { className: "min-w-40 gap-2.5", formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: Number(value).toLocaleString() })] })) }) }), _jsx(ChartLegend, { content: _jsx(ChartLegendContent, { nameKey: "status" }), className: "-translate-y-2" }), _jsx(Pie, { data: chartData, dataKey: "count", nameKey: "status", innerRadius: 60, cornerRadius: 5, paddingAngle: 3, stroke: "var(--background)", strokeWidth: 3, children: _jsx(Label, { content: ({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (_jsxs("text", { x: viewBox.cx, y: viewBox.cy, textAnchor: "middle", dominantBaseline: "middle", children: [_jsxs("tspan", { x: viewBox.cx, y: viewBox.cy, className: "fill-foreground text-3xl font-bold tabular-nums", children: [completionRate, "%"] }), _jsx("tspan", { x: viewBox.cx, y: (viewBox.cy || 0) + 22, className: "fill-muted-foreground text-xs", children: "Completed" })] }));
                                        }
                                    } }) })] }) }) })] }));
}
