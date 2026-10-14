"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
const chartData = [
    { name: "mobile", score: 58, fill: "url(#chart28-mobile)" },
    { name: "desktop", score: 76, fill: "url(#chart28-desktop)" },
    { name: "api", score: 92, fill: "url(#chart28-api)" },
];
const chartConfig = {
    score: { label: "Score" },
    mobile: { label: "Mobile", color: "var(--chart-4)" },
    desktop: { label: "Desktop", color: "var(--chart-2)" },
    api: { label: "API", color: "var(--chart-1)" },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { className: "items-center pb-0", children: [_jsx(CardTitle, { children: "Lighthouse Scores" }), _jsx(CardDescription, { children: "Performance audit by platform" })] }), _jsx(CardContent, { className: "flex-1 pb-0", children: _jsx(ChartContainer, { config: chartConfig, className: "mx-auto aspect-square max-h-[300px]", children: _jsxs(RadialBarChart, { data: chartData, innerRadius: 35, outerRadius: 110, barSize: 22, children: [_jsxs("defs", { children: [["mobile", "desktop", "api"].map((key) => (_jsxs("linearGradient", { id: `chart28-${key}`, x1: "0", y1: "0", x2: "1", y2: "0", children: [_jsx("stop", { offset: "0%", stopColor: `var(--color-${key})`, stopOpacity: 0.5 }), _jsx("stop", { offset: "100%", stopColor: `var(--color-${key})`, stopOpacity: 1 })] }, key))), _jsxs("filter", { id: "chart28-glow", x: "-15%", y: "-15%", width: "130%", height: "130%", children: [_jsx("feGaussianBlur", { stdDeviation: "3", result: "blur" }), _jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })] })] }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { className: "min-w-40 gap-2.5", nameKey: "name", formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsxs("span", { className: "text-foreground font-semibold tabular-nums", children: [Number(value), "/100"] })] })) }) }), _jsx(PolarAngleAxis, { type: "number", domain: [0, 100], angleAxisId: 0, tick: false }), _jsx(RadialBar, { dataKey: "score", background: true, cornerRadius: 10, filter: "url(#chart28-glow)", label: {
                                    position: "insideStart",
                                    fill: "#fff",
                                    fontSize: 11,
                                    fontWeight: 600,
                                } }), _jsx(ChartLegend, { content: _jsx(ChartLegendContent, { nameKey: "name" }), className: "-translate-y-2" })] }) }) })] }));
}
