import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bubble, BubbleContent, BubbleGroup, } from "../../../../../registry/bases/radix/ui/bubble.jsx";
// Consecutive lines from one sender are one entry with an array of lines, not
// four separate turns. Grouping is a shape in the data first, and BubbleGroup
// is only what renders that shape.
const handoff = [
    {
        id: "g1",
        from: "marco",
        lines: [
            "Pager has been quiet since midnight.",
            "The retry queue drained at 02:10 and stayed at zero.",
            "Runbook link is in the incident, third comment down.",
        ],
    },
    {
        id: "g2",
        from: "you",
        lines: ["Thanks. Anything still open on the payments worker?"],
    },
    {
        id: "g3",
        from: "you",
        lines: [
            "I can pick up the backoff change this morning if nobody has started it.",
            "Otherwise I will watch the dashboard until standup.",
        ],
    },
    {
        id: "g4",
        from: "marco",
        lines: ["Not started, so it is yours. Ticket PLT-812."],
    },
];
export default function Pattern() {
    return (
    // The group's own gap is tighter than this thread gap around it, and that
    // difference is the entire grouping signal. Equalise the two and the reader
    // sees eight unrelated messages instead of four turns.
    _jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-5", children: [handoff.map((group) => (
            // align stays on each Bubble. The group stretches to the column and has
            // no side of its own, so an align passed to it would do nothing at all.
            _jsxs(BubbleGroup, { children: [_jsx("span", { className: "sr-only", children: group.from === "you" ? "You said: " : "Marco said: " }), group.lines.map((line) => (_jsx(Bubble, { variant: group.from === "you" ? "default" : "secondary", align: group.from === "you" ? "end" : "start", children: _jsx(BubbleContent, { children: line }) }, line)))] }, group.id))), _jsx("p", { className: "text-muted-foreground self-end text-xs", children: "Delivered 9:41" })] }));
}
