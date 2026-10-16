import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle, } from "../../../../../../../adapters/structured.tsx";
const roadmap = [
    {
        id: 1,
        date: "Jan 2025",
        title: "AI Engine Integration",
        description: "Deep integration of advanced LLMs for real-time code generation and context-aware suggestions.",
    },
    {
        id: 2,
        date: "Feb 2025",
        title: "Collaborative Editing",
        description: "Multi-user real-time collaboration with shared cursors and instant synchronization across workspaces.",
    },
    {
        id: 3,
        date: "Mar 2025",
        title: "Visual Theme Builder",
        description: "Interactive interface for creating and managing custom design systems with automated CSS variable generation.",
    },
    {
        id: 4,
        date: "Apr 2025",
        title: "Enterprise Security",
        description: "Role-based access control, SOC2 compliance audit, and enhanced data encryption protocols.",
    },
];
export default function Pattern() {
    return (_jsx(Timeline, { defaultValue: 2, className: "w-full max-w-md", children: roadmap.map((item) => (_jsxs(TimelineItem, { step: item.id, className: "sm:group-data-[orientation=vertical]/timeline:ms-32", children: [_jsxs(TimelineHeader, { children: [_jsx(TimelineSeparator, {}), _jsx(TimelineDate, { className: "sm:group-data-[orientation=vertical]/timeline:absolute sm:group-data-[orientation=vertical]/timeline:-left-32 sm:group-data-[orientation=vertical]/timeline:w-20 sm:group-data-[orientation=vertical]/timeline:text-right", children: item.date }), _jsx(TimelineTitle, { className: "sm:-mt-0.5", children: item.title }), _jsx(TimelineIndicator, {})] }), _jsx(TimelineContent, { children: item.description })] }, item.id))) }));
}
