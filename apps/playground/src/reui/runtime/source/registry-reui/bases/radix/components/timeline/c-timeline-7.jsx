import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
const roadmapItems = [
    {
        date: "Dec 15, 2025",
        content: (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-muted-foreground", children: "Completed" }), " Beta Program"] })),
        color: "bg-emerald-500",
    },
    {
        date: "Nov 01, 2025",
        content: (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-muted-foreground", children: "Completed" }), " Usability Testing"] })),
        color: "bg-violet-500",
    },
    {
        date: "Oct 15, 2025",
        content: (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-muted-foreground", children: "Initiated" }), " Design Phase"] })),
        color: "bg-fuchsia-500",
    },
    {
        date: "Aug 01, 2024",
        content: (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-muted-foreground", children: "Completed" }), " Requirements Gathering"] })),
        color: "bg-blue-500",
    },
    {
        date: "Jul 15, 2024",
        content: (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-muted-foreground", children: "Started" }), " Project Kickoff"] })),
        color: "bg-red-500",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsx(Timeline, { defaultValue: 0, className: "gap-2.5", children: roadmapItems.map((item, index) => (_jsxs(TimelineItem, { step: index + 1, className: "has-[+[data-completed]]:[&_[data-slot=timeline-separator]]:bg-foreground/20 group-data-[orientation=vertical]/timeline:not-last:pb-0", children: [_jsxs(TimelineHeader, { className: "flex items-center gap-2.5", children: [_jsx(TimelineSeparator, { className: "" }), _jsx(TimelineIndicator, { className: cn("size-2 border-none", item.color) }), _jsx(TimelineDate, { className: "text-muted-foreground/60 mb-0 text-[10px] font-semibold uppercase", children: item.date })] }), _jsx(TimelineContent, { className: "text-foreground text-sm font-medium", children: item.content })] }, index))) }) }));
}
