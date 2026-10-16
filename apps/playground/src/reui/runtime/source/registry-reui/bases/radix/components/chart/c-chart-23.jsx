"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
const chartData = [
    { skill: "Frontend", score: 92 },
    { skill: "Backend", score: 78 },
    { skill: "DevOps", score: 68 },
    { skill: "Design", score: 74 },
    { skill: "Testing", score: 85 },
    { skill: "Security", score: 62 },
];
const chartConfig = {
    score: { label: "Proficiency", color: "var(--chart-1)" },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { className: "items-center pb-0", children: [_jsx(CardTitle, { children: "Skill Assessment" }), _jsx(CardDescription, { children: "Team proficiency across key areas" })] }), _jsx(CardContent, { className: "flex-1 pb-0", children: _jsx(ChartContainer, { config: chartConfig, className: "mx-auto aspect-square max-h-[280px]", children: _jsxs(RadarChart, { accessibilityLayer: true, data: chartData, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "chart24-fill", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--color-score)", stopOpacity: 0.5 }), _jsx("stop", { offset: "100%", stopColor: "var(--color-score)", stopOpacity: 0.08 })] }), _jsxs("filter", { id: "chart24-glow", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [_jsx("feGaussianBlur", { stdDeviation: "6", result: "blur" }), _jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })] })] }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, {}) }), _jsx(PolarAngleAxis, { dataKey: "skill", tick: { fontSize: 12 } }), _jsx(PolarGrid, { strokeDasharray: "3 3" }), _jsx(Radar, { dataKey: "score", fill: "url(#chart24-fill)", stroke: "var(--color-score)", strokeWidth: 2, filter: "url(#chart24-glow)", dot: { r: 4, fill: "var(--color-score)", strokeWidth: 0 } })] }) }) })] }));
}
