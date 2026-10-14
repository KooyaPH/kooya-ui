"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
const chartData = [
    { metric: "Speed", value: 88 },
    { metric: "Reliability", value: 94 },
    { metric: "Scalability", value: 72 },
    { metric: "Cost", value: 68 },
    { metric: "Security", value: 82 },
    { metric: "DX", value: 78 },
];
const chartConfig = {
    value: { label: "Score", color: "var(--chart-2)" },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { className: "items-center pb-0", children: [_jsx(CardTitle, { children: "Infrastructure Score" }), _jsx(CardDescription, { children: "Platform performance metrics" })] }), _jsx(CardContent, { className: "flex-1 pb-0", children: _jsx(ChartContainer, { config: chartConfig, className: "mx-auto aspect-square max-h-[280px]", children: _jsxs(RadarChart, { accessibilityLayer: true, data: chartData, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "chart25-fill", x1: "0", y1: "0", x2: "1", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--color-value)", stopOpacity: 0.45 }), _jsx("stop", { offset: "100%", stopColor: "var(--color-value)", stopOpacity: 0.1 })] }), _jsxs("filter", { id: "chart25-glow", x: "-15%", y: "-15%", width: "130%", height: "130%", children: [_jsx("feGaussianBlur", { stdDeviation: "5", result: "blur" }), _jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })] })] }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, {}) }), _jsx(PolarAngleAxis, { dataKey: "metric", tick: { fontSize: 11 } }), _jsx(PolarGrid, { strokeDasharray: "3 3" }), _jsx(PolarRadiusAxis, { angle: 90, domain: [0, 100], tick: false, axisLine: false }), _jsx(Radar, { dataKey: "value", fill: "url(#chart25-fill)", stroke: "var(--color-value)", strokeWidth: 2.5, filter: "url(#chart25-glow)", dot: {
                                    r: 4,
                                    fill: "var(--background)",
                                    strokeWidth: 2.5,
                                    stroke: "var(--color-value)",
                                } })] }) }) })] }));
}
