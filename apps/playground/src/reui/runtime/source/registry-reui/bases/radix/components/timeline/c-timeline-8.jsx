import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle, } from "../../../../../../../adapters/structured.tsx";
const releaseCycle = [
    {
        id: 1,
        date: "Week 1",
        title: "Planning",
        description: "Scope definition and resource planning.",
    },
    {
        id: 2,
        date: "Week 2",
        title: "Design",
        description: "UI/UX design and prototyping.",
    },
    {
        id: 3,
        date: "Week 4",
        title: "Development",
        description: "Core features implementation.",
    },
];
export default function Pattern() {
    return (_jsx(Timeline, { defaultValue: 2, orientation: "horizontal", className: "w-full max-w-xl", children: releaseCycle.map((item) => (_jsxs(TimelineItem, { step: item.id, children: [_jsxs(TimelineHeader, { children: [_jsx(TimelineSeparator, {}), _jsx(TimelineDate, { children: item.date }), _jsx(TimelineTitle, { children: item.title }), _jsx(TimelineIndicator, {})] }), _jsx(TimelineContent, { children: item.description })] }, item.id))) }));
}
