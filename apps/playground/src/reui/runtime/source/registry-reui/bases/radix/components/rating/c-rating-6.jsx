import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Rating } from "../../../../../../../adapters/utility.tsx";
import { Progress } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
const distribution = [
    { stars: 5, count: 124, percentage: 62 },
    { stars: 4, count: 45, percentage: 22 },
    { stars: 3, count: 18, percentage: 9 },
    { stars: 2, count: 8, percentage: 4 },
    { stars: 1, count: 5, percentage: 3 },
];
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto w-full max-w-xs space-y-4", children: [_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("span", { className: "text-3xl font-semibold", children: "4.6" }), _jsx(Rating, { rating: 4.6, size: "sm" }), _jsx("span", { className: "text-muted-foreground text-xs", children: "Based on 200 reviews" })] }), _jsx(Separator, {}), _jsx("div", { className: "space-y-2", children: distribution.map((row) => (_jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsx("span", { className: "text-muted-foreground w-3 text-right text-xs", children: row.stars }), _jsx(Progress, { value: row.percentage, className: "h-1.5 flex-1 **:data-[slot=progress-indicator]:bg-yellow-400" }), _jsx("span", { className: "text-muted-foreground w-7 text-right text-xs", children: row.count })] }, row.stars))) })] }));
}
