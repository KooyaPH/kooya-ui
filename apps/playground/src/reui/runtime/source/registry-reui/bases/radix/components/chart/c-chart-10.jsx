"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "Jan", desktop: 300 },
    { month: "Feb", desktop: 600 },
    { month: "Mar", desktop: 500 },
    { month: "Apr", desktop: 600 },
    { month: "May", desktop: 400 },
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
const CustomDuotoneBar = (props) => {
    const { fill, x, y, width, height, dataKey } = props;
    return (_jsxs(_Fragment, { children: [_jsx("rect", { rx: 4, x: x, y: y, width: width, height: height, stroke: "none", fill: `url(#duotone-bar-pattern-${dataKey})` }), _jsx("defs", { children: _jsxs("linearGradient", { id: `duotone-bar-pattern-${dataKey}`, x1: "0", y1: "0", x2: "1", y2: "0", children: [_jsx("stop", { offset: "50%", stopColor: fill, stopOpacity: 0.4 }), _jsx("stop", { offset: "50%", stopColor: fill })] }, dataKey) })] }));
};
export default function ChartDuotone() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Operational Efficiency", _jsxs(Badge, { variant: "success-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), "+12.5%"] })] }), _jsx(CardDescription, { children: "Supply chain performance metrics" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(BarChart, { accessibilityLayer: true, data: chartData, margin: {
                            top: 20,
                            right: 12,
                            bottom: 12,
                            left: 12,
                        }, children: [_jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8 }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => {
                                        return (_jsx("div", { className: "border-border/50 mb-0.5 flex flex-col gap-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) }));
                                    }, formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)", style: {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsx("span", { className: "text-foreground font-semibold", children: Number(value).toLocaleString() })] })) }) }), _jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", shape: _jsx(CustomDuotoneBar, {}), radius: 4 })] }) }) })] }));
}
