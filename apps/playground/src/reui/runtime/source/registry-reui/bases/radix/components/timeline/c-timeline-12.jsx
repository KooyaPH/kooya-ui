import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const releases = [
    {
        id: 1,
        version: "v1.0",
        date: "Jan 2025",
        title: "Initial Release",
        status: "released",
    },
    {
        id: 2,
        version: "v1.1",
        date: "Mar 2025",
        title: "Bug Fixes",
        status: "released",
    },
    {
        id: 3,
        version: "v2.0",
        date: "Jun 2025",
        title: "Major Update",
        status: "current",
    },
    {
        id: 4,
        version: "v2.1",
        date: "Sep 2025",
        title: "Improvements",
        status: "upcoming",
    },
];
export default function Pattern() {
    return (_jsx(Timeline, { defaultValue: 3, orientation: "horizontal", className: "w-full max-w-xl", children: releases.map((release) => (_jsxs(TimelineItem, { step: release.id, children: [_jsxs(TimelineHeader, { children: [_jsx(TimelineSeparator, { className: "bg-input! group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:left-2.5 group-data-[orientation=horizontal]/timeline:w-[calc(100%-2.25rem)]" }), _jsx(TimelineDate, { children: release.date }), _jsxs(TimelineTitle, { className: "flex items-center gap-2", children: [release.version, release.status === "current" && (_jsx(Badge, { variant: "primary-light", size: "sm", children: "Current" }))] }), _jsx(TimelineIndicator, { className: cn("flex size-6 items-center justify-center border-none", release.status === "released" && "bg-emerald-500 text-white", release.status === "current" &&
                                "bg-primary text-primary-foreground", release.status === "upcoming" &&
                                "bg-muted text-muted-foreground"), children: release.status === "released" ? (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })) : release.status === "current" ? (_jsx(IconPlaceholder, { lucide: "PlayIcon", tabler: "IconPlayerPlay", hugeicons: "PlayIcon", phosphor: "PlayIcon", remixicon: "RiPlayLine", className: "size-3" })) : (_jsx(IconPlaceholder, { lucide: "CircleIcon", tabler: "IconCircle", hugeicons: "CircleIcon", phosphor: "CircleIcon", remixicon: "RiCircleLine", className: "size-3" })) })] }), _jsx(TimelineContent, { className: "text-xs", children: release.title })] }, release.id))) }));
}
