import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../../../../../registry/bases/radix/ui/chart.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const chartData = [
    { month: "Jan", desktop: 300 },
    { month: "Feb", desktop: 550 },
    { month: "Mar", desktop: 400 },
    { month: "Apr", desktop: 630 },
    { month: "May", desktop: 460 },
    { month: "Jun", desktop: 780 },
    { month: "Jul", desktop: 390 },
    { month: "Aug", desktop: 925 },
    { month: "Sep", desktop: 645 },
    { month: "Oct", desktop: 530 },
    { month: "Nov", desktop: 700 },
    { month: "Dec", desktop: 270 },
];
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
};
export default function ChartBar() {
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Revenue Growth", _jsxs(Badge, { variant: "success-light", className: "ml-2", children: [_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true" }), "+5.2%"] })] }), _jsx(CardDescription, { children: "Monthly revenue performance tracking" })] }), _jsx(CardContent, { children: _jsx(ChartContainer, { config: chartConfig, children: _jsxs(BarChart, { accessibilityLayer: true, data: chartData, children: [_jsx(CartesianGrid, { vertical: false }), _jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false, tickMargin: 8, tickFormatter: (value) => value.slice(0, 3) }), _jsx(ChartTooltip, { cursor: false, content: _jsx(ChartTooltipContent, { indicator: "dot", className: "min-w-40 gap-2.5", labelFormatter: (value) => {
                                        return (_jsx("div", { className: "border-border/50 mb-0.5 flex flex-col gap-0.5 border-b pb-2", children: _jsxs("span", { className: "text-xs font-medium", children: [value, " 2024"] }) }));
                                    }, formatter: (value, name) => (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "bg-chart-1 h-2.5 w-2.5 shrink-0 rounded-xs" }), _jsx("span", { className: "text-muted-foreground", children: chartConfig[name]
                                                            ?.label || name })] }), _jsxs("span", { className: "text-foreground font-semibold", children: ["$", Number(value).toLocaleString()] })] })) }) }), _jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", radius: 4 })] }) }) })] }));
}
