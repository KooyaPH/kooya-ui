"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "Jan", desktop: 340 },
    { month: "Feb", desktop: 870 },
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
        color: "var(--chart-5)",
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
    return (_jsxs("g", { children: [_jsx("rect", { x: barX + depth, y: barY - depth, width: barWidth, height: barHeight, fill: fill, opacity: "0.6", rx: "3" }), _jsx("polygon", { points: `${barX + barWidth + 3},${barY - 3} ${barX + barWidth + depth - 3},${barY - depth + 3} ${barX + barWidth + depth - 3},${barY + barHeight - depth - 3} ${barX + barWidth + 3},${barY + barHeight - 3}`, fill: fill, opacity: "0.7" }), _jsx("polygon", { points: `${barX + 3},${barY - 3} ${barX + barWidth - 3},${barY - 3} ${barX + barWidth + depth - 3},${barY - depth + 3} ${barX + depth + 3},${barY - depth + 3}`, fill: fill, opacity: "0.8" }), _jsx("rect", { x: barX, y: barY, width: barWidth, height: barHeight, fill: fill, rx: "3" })] }));
};
export default function Chart3D() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Financial Forecast", _jsxs(Badge, { variant: "destructive-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingDownIcon", tabler: "IconTrendingDown", hugeicons: "TradeDownIcon", phosphor: "TrendDownIcon", remixicon: "RiArrowRightDownLongLine", "aria-hidden": "true" }), "+8.2%"] })] }), _jsx(CardDescription, { children: "Projected vs actual revenue growth" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(BarChart, { accessibilityLayer: true, data: chartData, margin: {
                            top: 40,
                            right: 40,
                            bottom: 20,
                            left: 20,
                        }, barCategoryGap: "20%", children: [_jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 12 }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => {
                                        return (_jsx("div", { className: "border-border/50 mb-0.5 flex flex-col gap-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) }));
                                    }, formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold", children: Number(value).toLocaleString() })] })) }) }), _jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", shape: _jsx(True3DBar, {}) })] }) }) })] }));
}
