import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Frame, FrameHeader, FramePanel, } from "../../reui/frame.jsx";
import { Timeline, TimelineContent, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle, } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "../../../../../../../adapters/navigation.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const pipelineSteps = [
    {
        id: 1,
        title: "Source Code Checkout",
        duration: "12s",
        status: "completed",
        description: "Successfully fetched latest changes from the main branch.",
        user: {
            name: "Alex Johnson",
            avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        },
    },
    {
        id: 2,
        title: "Dependency Installation",
        duration: "1m 45s",
        status: "completed",
        description: "All npm packages installed and cached for future builds.",
        user: {
            name: "Sarah Chen",
            avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        },
    },
    {
        id: 3,
        title: "Unit & Integration Tests",
        duration: "Running",
        status: "active",
        description: "Running 142 test suites across the entire codebase...",
        user: {
            name: "Michael Rodriguez",
            avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
        },
    },
    {
        id: 4,
        title: "Production Build",
        duration: "Pending",
        status: "pending",
        description: "Optimizing assets and generating static site pages.",
        user: {
            name: "Emma Wilson",
            avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        },
    },
];
function StatusIcon({ status }) {
    if (status === "completed")
        return (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" }));
    if (status === "active")
        return _jsx(Spinner, { className: "size-3.5" });
    return (_jsx(IconPlaceholder, { lucide: "CircleIcon", tabler: "IconCircle", hugeicons: "CircleIcon", phosphor: "CircleIcon", remixicon: "RiCircleLine", className: "size-3.5" }));
}
function StatusBadge({ status, duration, }) {
    const variant = status === "completed"
        ? "success-light"
        : status === "active"
            ? "info-light"
            : "warning-light";
    return (_jsx(Badge, { variant: variant, size: "sm", children: duration }));
}
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-lg", children: _jsx(Timeline, { defaultValue: 3, children: pipelineSteps.map((step) => (_jsxs(TimelineItem, { step: step.id, className: "ms-10 pb-10", children: [_jsxs(TimelineHeader, { children: [_jsx(TimelineSeparator, { className: "group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-7" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TimelineTitle, { className: "text-sm font-semibold", children: step.title }), _jsx(StatusBadge, { status: step.status, duration: step.duration })] }), _jsx(TimelineIndicator, { className: cn("bg-muted text-muted-foreground group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7", step.status === "active" && "ring-primary/20 ring-2"), children: _jsx(StatusIcon, { status: step.status }) })] }), _jsx(TimelineContent, { className: "mt-2", children: _jsx(Frame, { stacked: true, dense: true, spacing: "sm", children: _jsxs(Collapsible, { defaultOpen: true, className: "group/collapsible", children: [_jsx(CollapsibleTrigger, { className: "flex w-full", children: _jsxs(FrameHeader, { className: "flex grow flex-row items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: step.user.avatar, alt: step.user.name }), _jsx(AvatarFallback, { children: step.user.name.charAt(0) })] }), _jsx("span", { className: "text-muted-foreground text-xs font-medium", children: step.user.name })] }), _jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRightIcon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightLine", className: "text-muted-foreground size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })] }) }), _jsx(CollapsibleContent, { children: _jsx(FramePanel, { children: _jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: step.description }) }) })] }) }) })] }, step.id))) }) }));
}
