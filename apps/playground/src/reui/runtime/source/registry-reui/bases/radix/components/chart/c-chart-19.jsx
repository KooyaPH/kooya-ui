"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cell, Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
const chartData = [
    { source: "direct", visits: 4200, fill: "var(--color-direct)" },
    { source: "search", visits: 3600, fill: "var(--color-search)" },
    { source: "social", visits: 2800, fill: "var(--color-social)" },
    { source: "email", visits: 1900, fill: "var(--color-email)" },
    { source: "referral", visits: 1400, fill: "var(--color-referral)" },
];
const total = chartData.reduce((s, d) => s + d.visits, 0);
const chartConfig = {
    visits: { label: "Visits" },
    direct: { label: "Direct", color: "var(--chart-1)" },
    search: { label: "Search", color: "var(--chart-2)" },
    social: { label: "Social", color: "var(--chart-3)" },
    email: { label: "Email", color: "var(--chart-4)" },
    referral: { label: "Referral", color: "var(--chart-5)" },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { className: "items-center pb-0", children: [_jsx(CardTitle, { children: "Traffic Sources" }), _jsx(CardDescription, { children: "Where your visitors come from" })] }), _jsx(CardContent, { className: "flex-1 pb-0", children: _jsx(ChartContainer, { config: chartConfig, className: "mx-auto aspect-square max-h-[280px]", children: _jsxs(PieChart, { accessibilityLayer: true, children: [_jsxs("defs", { children: [_jsx("filter", { id: "chart19-3d", x: "-20%", y: "-20%", width: "140%", height: "140%", children: _jsx("feDropShadow", { dx: "0", dy: "8", stdDeviation: "5", floodOpacity: "0.2" }) }), _jsxs("linearGradient", { id: "gradient-direct", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-1)", stopOpacity: 1 }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-1)", stopOpacity: 0.8 })] }), _jsxs("linearGradient", { id: "gradient-search", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-2)", stopOpacity: 1 }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-2)", stopOpacity: 0.8 })] }), _jsxs("linearGradient", { id: "gradient-social", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-3)", stopOpacity: 1 }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-3)", stopOpacity: 0.8 })] }), _jsxs("linearGradient", { id: "gradient-email", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-4)", stopOpacity: 1 }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-4)", stopOpacity: 0.8 })] }), _jsxs("linearGradient", { id: "gradient-referral", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-5)", stopOpacity: 1 }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-5)", stopOpacity: 0.8 })] })] }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { className: "min-w-40 gap-2.5", formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: Number(value).toLocaleString() })] })) }) }), _jsxs(Pie, { data: chartData, dataKey: "visits", nameKey: "source", innerRadius: 65, outerRadius: 95, cornerRadius: 8, paddingAngle: 4, stroke: "var(--background)", strokeWidth: 4, style: { filter: "url(#chart19-3d)" }, children: [chartData.map((entry, index) => (_jsx(Cell, { fill: `url(#gradient-${entry.source})` }, `cell-${index}`))), _jsx(Label, { content: ({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (_jsxs("text", { x: viewBox.cx, y: viewBox.cy, textAnchor: "middle", dominantBaseline: "middle", children: [_jsxs("tspan", { x: viewBox.cx, y: viewBox.cy, className: "fill-foreground text-3xl font-bold tabular-nums", children: [(total / 1000).toFixed(1), "k"] }), _jsx("tspan", { x: viewBox.cx, y: (viewBox.cy || 0) + 22, className: "fill-muted-foreground text-xs", children: "Total Visits" })] }));
                                            }
                                        } })] })] }) }) })] }));
}
