import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const deployments = [
    {
        id: 1,
        title: "Production Deploy",
        date: "2 minutes ago",
        commit: "a1b2c3d",
        branch: "main",
        status: "success",
        duration: "42s",
    },
    {
        id: 2,
        title: "Staging Deploy",
        date: "15 minutes ago",
        commit: "e4f5g6h",
        branch: "staging",
        status: "success",
        duration: "38s",
    },
    {
        id: 3,
        title: "Preview Deploy",
        date: "1 hour ago",
        commit: "i7j8k9l",
        branch: "feat/auth",
        status: "failed",
        duration: "1m 12s",
    },
    {
        id: 4,
        title: "Production Deploy",
        date: "3 hours ago",
        commit: "m0n1o2p",
        branch: "main",
        status: "success",
        duration: "45s",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsx(Timeline, { defaultValue: 4, children: deployments.map((deploy) => (_jsxs(TimelineItem, { step: deploy.id, className: "group-data-[orientation=vertical]/timeline:ms-10", children: [_jsxs(TimelineHeader, { children: [_jsx(TimelineSeparator, { className: "bg-input! group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TimelineTitle, { className: "text-sm", children: deploy.title }), _jsx(Badge, { variant: deploy.status === "success"
                                            ? "success-light"
                                            : "destructive-light", size: "sm", children: deploy.status })] }), _jsx(TimelineIndicator, { className: cn("flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7", deploy.status === "success"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-destructive text-white"), children: deploy.status === "success" ? (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })) : (_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-3.5" })) })] }), _jsxs(TimelineContent, { children: [_jsxs("div", { className: "text-muted-foreground flex items-center gap-3 text-xs", children: [_jsx("span", { className: "font-mono", children: deploy.commit }), _jsx("span", { children: "\u00B7" }), _jsx("span", { children: deploy.branch }), _jsx("span", { children: "\u00B7" }), _jsx("span", { children: deploy.duration })] }), _jsx(TimelineDate, { className: "mt-1 mb-0", children: deploy.date })] })] }, deploy.id))) }) }));
}
