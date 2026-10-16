"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "Jan", desktop: 340 },
    { month: "Feb", desktop: 600 },
    { month: "Mar", desktop: 510 },
    { month: "Apr", desktop: 620 },
    { month: "May", desktop: 450 },
    { month: "Jun", desktop: 780 },
    { month: "Jul", desktop: 390 },
    { month: "Aug", desktop: 920 },
    { month: "Sep", desktop: 640 },
    { month: "Oct", desktop: 530 },
    { month: "Nov", desktop: 800 },
    { month: "Dec", desktop: 270 },
];
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
};
const True3DBar = (props) => {
    const { fill, x, y, width, height } = props;
    const barX = x;
    const barY = y;
    const barWidth = width;
    const barHeight = height;
    // 3D perspective parameters
    const depth = Math.min(barWidth * 0.3, 15); // Maximum depth of 15px
    const angle = 30; // Isometric angle
    return (_jsxs("g", { children: [_jsx("rect", { x: barX + depth, y: barY - depth, width: barWidth, height: barHeight, fill: "url(#bar-gradient-back)", rx: "3" }), _jsx("polygon", { points: `${barX + barWidth + 3},${barY - 3} ${barX + barWidth + depth - 3},${barY - depth + 3} ${barX + barWidth + depth - 3},${barY + barHeight - depth - 3} ${barX + barWidth + 3},${barY + barHeight - 3}`, fill: "url(#bar-gradient-side)" }), _jsx("polygon", { points: `${barX + 3},${barY - 3} ${barX + barWidth - 3},${barY - 3} ${barX + barWidth + depth - 3},${barY - depth + 3} ${barX + depth + 3},${barY - depth + 3}`, fill: "url(#bar-gradient-top)" }), _jsx("rect", { x: barX, y: barY, width: barWidth, height: barHeight, fill: "url(#bar-gradient-front)", rx: "3" })] }));
};
export default function Chart3D() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Regional Performance", _jsxs(Badge, { variant: "success-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), "+15.7%"] })] }), _jsx(CardDescription, { children: "Global sales distribution by region" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(BarChart, { accessibilityLayer: true, data: chartData, margin: {
                            top: 40,
                            right: 40,
                            bottom: 20,
                            left: 20,
                        }, barCategoryGap: "20%", children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "bar-gradient-front", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-1)", stopOpacity: "0.9" }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-1)", stopOpacity: "0.7" })] }), _jsxs("linearGradient", { id: "bar-gradient-back", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-1)", stopOpacity: "0.5" }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-1)", stopOpacity: "0.3" })] }), _jsxs("linearGradient", { id: "bar-gradient-side", x1: "0", y1: "0", x2: "1", y2: "0", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-1)", stopOpacity: "0.6" }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-1)", stopOpacity: "0.4" })] }), _jsxs("linearGradient", { id: "bar-gradient-top", x1: "0", y1: "0", x2: "1", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "var(--chart-1)", stopOpacity: "0.7" }), _jsx("stop", { offset: "100%", stopColor: "var(--chart-1)", stopOpacity: "0.5" })] })] }), _jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 12 }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => {
                                        return (_jsx("div", { className: "border-border/50 mb-0.5 flex flex-col gap-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) }));
                                    }, formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "bg-chart-1 h-2.5 w-2.5 shrink-0 rounded-xs" }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold", children: Number(value).toLocaleString() })] })) }) }), _jsx(Bar, { dataKey: "desktop", fill: "url(#bar-gradient-front)", shape: _jsx(True3DBar, {}) })] }) }) })] }));
}
