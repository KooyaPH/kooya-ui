"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { week: "W1", signups: 64 },
    { week: "W2", signups: 78 },
    { week: "W3", signups: 52 },
    { week: "W4", signups: 92 },
    { week: "W5", signups: 85 },
    { week: "W6", signups: 110 },
    { week: "W7", signups: 98 },
    { week: "W8", signups: 125 },
];
const chartConfig = {
    signups: {
        label: "Signups",
        color: "var(--chart-3)",
    },
};
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["New Signups", _jsxs(Badge, { variant: "success-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), "+144%"] })] }), _jsx(CardDescription, { children: "Weekly user registration trends" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(AreaChart, { accessibilityLayer: true, data: chartData, margin: { top: 20, right: 2, bottom: 0, left: 2 }, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "chart16-fill", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "var(--color-signups)", stopOpacity: 0.35 }), _jsx("stop", { offset: "95%", stopColor: "var(--color-signups)", stopOpacity: 0 })] }), _jsxs("filter", { id: "chart16-dot-glow", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [_jsx("feGaussianBlur", { stdDeviation: "3", result: "blur" }), _jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })] }), _jsxs("filter", { id: "chart16-line-glow", x: "-10%", y: "-20%", width: "120%", height: "140%", children: [_jsx("feGaussianBlur", { stdDeviation: "8", result: "blur" }), _jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })] })] }), _jsx(CartesianGrid, { vertical: false, strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "week", tickLine: false, axisLine: false, tickMargin: 8 }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-36 gap-2.5", formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold tabular-nums", children: Number(value).toLocaleString() })] })) }) }), _jsx(Area, { dataKey: "signups", type: "natural", fill: "url(#chart16-fill)", stroke: "var(--color-signups)", strokeWidth: 2, filter: "url(#chart16-line-glow)", dot: {
                                    r: 4,
                                    fill: "var(--color-signups)",
                                    strokeWidth: 2,
                                    stroke: "var(--background)",
                                    filter: "url(#chart16-dot-glow)",
                                }, activeDot: { r: 6, strokeWidth: 3, stroke: "var(--background)" } })] }) }) })] }));
}
