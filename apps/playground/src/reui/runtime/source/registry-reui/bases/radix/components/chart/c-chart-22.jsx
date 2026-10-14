"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label, Pie, PieChart, Sector } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
const chartData = [
    { plan: "free", users: 12800, fill: "var(--color-free)" },
    { plan: "starter", users: 5400, fill: "var(--color-starter)" },
    { plan: "pro", users: 3600, fill: "var(--color-pro)" },
    { plan: "enterprise", users: 1200, fill: "var(--color-enterprise)" },
];
const totalUsers = chartData.reduce((sum, d) => sum + d.users, 0);
const paidUsers = totalUsers - chartData[0].users;
const conversionRate = ((paidUsers / totalUsers) * 100).toFixed(1);
const chartConfig = {
    users: { label: "Users" },
    free: { label: "Free", color: "var(--chart-5)" },
    starter: { label: "Starter", color: "var(--chart-3)" },
    pro: { label: "Pro", color: "var(--chart-2)" },
    enterprise: { label: "Enterprise", color: "var(--chart-1)" },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { className: "items-center pb-0", children: [_jsx(CardTitle, { children: "Conversion Funnel" }), _jsxs(CardDescription, { children: [conversionRate, "% of users are on paid plans"] })] }), _jsx(CardContent, { className: "flex-1 pb-0", children: _jsx(ChartContainer, { config: chartConfig, className: "mx-auto aspect-square max-h-[300px]", children: _jsxs(PieChart, { accessibilityLayer: true, children: [_jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { className: "min-w-40 gap-2.5", formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: Number(value).toLocaleString() })] })) }) }), _jsx(ChartLegend, { content: _jsx(ChartLegendContent, { nameKey: "plan" }), className: "-translate-y-2" }), _jsx(Pie, { data: chartData, dataKey: "users", nameKey: "plan", innerRadius: 55, cornerRadius: 5, paddingAngle: 3, stroke: "var(--background)", strokeWidth: 3, activeShape: ({ outerRadius = 0, ...props }) => (_jsx(Sector, { ...props, outerRadius: outerRadius + 10 })), children: _jsx(Label, { content: ({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (_jsxs("text", { x: viewBox.cx, y: viewBox.cy, textAnchor: "middle", dominantBaseline: "middle", children: [_jsx("tspan", { x: viewBox.cx, y: viewBox.cy, className: "fill-foreground text-2xl font-bold tabular-nums", children: paidUsers.toLocaleString() }), _jsx("tspan", { x: viewBox.cx, y: (viewBox.cy || 0) + 20, className: "fill-muted-foreground text-xs", children: "Paid Users" })] }));
                                        }
                                    } }) })] }) }) })] }));
}
