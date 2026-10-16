import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Message, MessageAvatar, MessageContent, } from "../../../../../registry/bases/radix/ui/message.jsx";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, } from "../../../../../registry/bases/radix/ui/message-scroller.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const VIEWER_AVATAR = "/reui-assets/images/e93553df2422635515ee.jpg";
/*
 * Ids are thread scoped and stable across renders. That is what lets a row be
 * addressed later by scrollToMessage, and what the prepend restore uses to keep
 * a specific row under the reader. Index keys would break both.
 */
const TURNS = [
    {
        id: "th_9f2k4m_1",
        role: "user",
        author: "Jonas Weber",
        text: "Our Stripe webhook is returning 500 on charge.refunded. It started at 09:42 and 41 events are queued behind it.",
    },
    {
        id: "th_9f2k4m_2",
        role: "assistant",
        author: "Nimbus",
        text: "The handler throws before it acknowledges, so Stripe keeps redelivering the same event.\n\nEvery retry lands on the same code path, which is why the queue grows instead of draining. No other event type on that endpoint is affected.",
    },
    {
        id: "th_9f2k4m_3",
        role: "user",
        author: "Jonas Weber",
        text: "What is actually throwing?",
    },
    {
        id: "th_9f2k4m_4",
        role: "assistant",
        author: "Nimbus",
        text: "The refund branch reads charge.payment_intent, and that field is null for refunds created in the dashboard.\n\nThe null reaches the lookup helper, which throws before the 200 goes out. Card refunds carry the intent, dashboard refunds do not, so it only fires for a subset.",
    },
    {
        id: "th_9f2k4m_5",
        role: "user",
        author: "Jonas Weber",
        text: "Can we drain the queue without shipping anything?",
    },
    {
        id: "th_9f2k4m_6",
        role: "assistant",
        author: "Nimbus",
        text: "Not safely. The queued events replay the same branch, so they would fail again and burn the retries you have left.\n\nShip the guard first, then replay. Stripe keeps failed events for three days, so the 41 are not at risk yet.",
    },
    {
        id: "th_9f2k4m_7",
        role: "user",
        author: "Jonas Weber",
        text: "Give me the smallest patch that unblocks it.",
    },
    {
        id: "th_9f2k4m_8",
        role: "assistant",
        author: "Nimbus",
        text: "Return 200 as soon as the signature verifies, then do the refund work on a queue. A webhook acknowledges receipt, not success.\n\nWith that in place a null payment_intent becomes a job that fails and retries on your side, instead of a 500 Stripe has to redeliver.",
    },
    {
        id: "th_9f2k4m_9",
        role: "assistant",
        author: "Nimbus",
        text: "I drafted the change on a branch and left the replay script beside it. Want me to open the pull request?",
    },
];
export default function Pattern() {
    return (
    /*
     * The scroller fills a height constrained parent, so the frame owns the
     * height and the transcript overflows inside it. Drop the fixed height and
     * the page becomes the scroll container, which is a different component.
     */
    _jsxs(Card, { className: "h-100 w-full max-w-2xl gap-0 overflow-hidden py-0", children: [_jsxs(CardHeader, { className: "shrink-0 border-b py-4", children: [_jsx(CardTitle, { children: "Stripe webhook 500s on charge.refunded" }), _jsx(CardDescription, { children: "th_9f2k4m, 9 messages" })] }), _jsx(CardContent, { className: "min-h-0 flex-1 p-0", children: _jsx(MessageScrollerProvider, { children: _jsxs(MessageScroller, { children: [_jsx(MessageScrollerViewport, { "aria-label": "Webhook incident transcript", children: _jsx(MessageScrollerContent, { className: "gap-5 p-(--card-spacing)", children: TURNS.map((turn) => {
                                        const isUser = turn.role === "user";
                                        return (
                                        /*
                                         * scrollAnchor marks the row that starts an exchange. It is
                                         * what last-anchor opening and the previous item peek read,
                                         * so it goes on the question, never on the answer.
                                         */
                                        _jsx(MessageScrollerItem, { messageId: turn.id, scrollAnchor: isUser, children: _jsxs(Message, { align: isUser ? "end" : "start", children: [_jsx(MessageAvatar, { className: "size-8", children: isUser ? (_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: VIEWER_AVATAR, alt: turn.author }), _jsx(AvatarFallback, { children: "JW" })] })) : (_jsxs(_Fragment, { children: [_jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine", "aria-hidden": "true", className: "text-muted-foreground size-4" }), _jsx("span", { className: "sr-only", children: turn.author })] })) }), _jsx(MessageContent, { children: _jsx(Bubble, { variant: isUser ? "muted" : "ghost", align: isUser ? "end" : "start", children: _jsx(BubbleContent, { className: "space-y-2", children: turn.text
                                                                    .split("\n\n")
                                                                    .map((paragraph, index) => (_jsx("p", { className: "whitespace-pre-wrap", children: paragraph }, index))) }) }) })] }) }, turn.id));
                                    }) }) }), _jsx(MessageScrollerButton, { variant: "outline", className: "rounded-full shadow-sm" })] }) }) })] }));
}
