"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle, } from "../../../../../../../adapters/structured.tsx";
const projectJourney = [
    {
        id: 1,
        date: "Oct 2024",
        title: "Kickoff",
        description: "Defining project goals and core team selection.",
    },
    {
        id: 2,
        date: "Nov 2024",
        title: "Discovery",
        description: "User research and requirements gathering phase.",
    },
    {
        id: 3,
        date: "Dec 2024",
        title: "Implementation",
        description: "Core development and sprint execution.",
    },
];
export default function Pattern() {
    return (_jsx(Timeline, { defaultValue: 2, orientation: "horizontal", className: "w-full max-w-xl", children: projectJourney.map((item) => (_jsxs(TimelineItem, { step: item.id, className: "group-data-[orientation=horizontal]/timeline:mt-0", children: [_jsxs(TimelineHeader, { children: [_jsx(TimelineSeparator, { className: "group-data-[orientation=horizontal]/timeline:top-8" }), _jsx(TimelineDate, { className: "mb-10", children: item.date }), _jsx(TimelineTitle, { children: item.title }), _jsx(TimelineIndicator, { className: "group-data-[orientation=horizontal]/timeline:top-8" })] }), _jsx(TimelineContent, { children: item.description })] }, item.id))) }));
}
