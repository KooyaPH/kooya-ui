import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
// The sender is carried by the variant and the side together. Colour alone
// leaves anyone who cannot separate the two shades with an unreadable thread,
// and a side alone reads as decoration rather than as authorship.
const thread = [
    {
        id: "m1",
        from: "you",
        text: "Invoice INV-4417 was charged twice on Tuesday. Can you take a look?",
    },
    {
        id: "m2",
        from: "agent",
        text: "Checking now. I can see two authorisations against INV-4417, both for $248.00.",
    },
    {
        id: "m3",
        from: "agent",
        text: "The second one was a retry after the processor timed out, so only the first should have settled.",
    },
    {
        id: "m4",
        from: "you",
        text: "That matches the bank statement. Please refund the retry.",
    },
    {
        id: "m5",
        from: "agent",
        text: "Refunded. It leaves us today and reaches your card in 3 to 5 business days.",
    },
];
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-sm", children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-3 border-b", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: "/reui-assets/images/c6e9e0d487c842b94fea.jpg", alt: "Lena Ortiz" }), _jsx(AvatarFallback, { children: "LO" })] }), _jsxs("div", { className: "flex min-w-0 flex-col gap-1", children: [_jsx(CardTitle, { children: "Lena Ortiz" }), _jsx(CardDescription, { children: "Billing support, replies in a few minutes" })] })] }), _jsx(CardContent, { className: "flex flex-col gap-3", children: thread.map((turn) => (_jsx(Bubble, { align: turn.from === "you" ? "end" : "start", variant: turn.from === "you" ? "default" : "muted", children: _jsxs(BubbleContent, { children: [_jsx("span", { className: "sr-only", children: turn.from === "you" ? "You said: " : "Lena said: " }), turn.text] }) }, turn.id))) })] }));
}
