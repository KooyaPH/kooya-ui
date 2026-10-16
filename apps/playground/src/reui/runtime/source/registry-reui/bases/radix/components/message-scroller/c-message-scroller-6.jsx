"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Message, MessageAvatar, MessageContent, } from "../../../../../registry/bases/radix/ui/message.jsx";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, useMessageScroller, useMessageScrollerVisibility, } from "../../../../../registry/bases/radix/ui/message-scroller.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const VIEWER_AVATAR = "/reui-assets/images/e93553df2422635515ee.jpg";
const TURNS = [
    {
        id: "th_8n4d7s_q1",
        role: "user",
        author: "Jonas Weber",
        text: "Walk me through the export incident from Friday.",
    },
    {
        id: "th_8n4d7s_2",
        role: "assistant",
        author: "Nimbus",
        text: "It ran from 09:42 to 11:06. One workspace saw empty exports and nobody saw an error.\n\nThe trigger was a saved view whose date range excluded everything recent, and an export inherits the active view.",
    },
    {
        id: "th_8n4d7s_3",
        role: "assistant",
        author: "Nimbus",
        text: "No data was lost, and no other workspace was affected.",
    },
    {
        id: "th_8n4d7s_q2",
        role: "user",
        author: "Jonas Weber",
        text: "Why did it take 84 minutes to find?",
    },
    {
        id: "th_8n4d7s_5",
        role: "assistant",
        author: "Nimbus",
        text: "Because every signal read healthy. The jobs completed, the queue drained, and the error rate never moved.\n\nWe found it when support tied the ticket to the view change, not from an alert.",
    },
    {
        id: "th_8n4d7s_q3",
        role: "user",
        author: "Jonas Weber",
        text: "What would have caught it sooner?",
    },
    {
        id: "th_8n4d7s_7",
        role: "assistant",
        author: "Nimbus",
        text: "A zero row export from a workspace that exported thousands the day before. That is the signal we do not have yet.\n\nIt is cheap to add, because the job already records the row count it wrote.",
    },
    {
        id: "th_8n4d7s_8",
        role: "assistant",
        author: "Nimbus",
        text: "I drafted the threshold as a ratio rather than an absolute, so a genuinely small workspace never pages anyone.",
    },
    {
        id: "th_8n4d7s_q4",
        role: "user",
        author: "Jonas Weber",
        text: "Is the dialog change still the right fix?",
    },
    {
        id: "th_8n4d7s_10",
        role: "assistant",
        author: "Nimbus",
        text: "Yes, and it stands on its own next to the alert. The dialog renders its row count after the request, so a zero currently reads as loading.\n\nShowing the active filter with a settled count turns a silent wrong answer into an obvious one.",
    },
    {
        id: "th_8n4d7s_q5",
        role: "user",
        author: "Jonas Weber",
        text: "Write it up for the review on Thursday.",
    },
    {
        id: "th_8n4d7s_12",
        role: "assistant",
        author: "Nimbus",
        text: "Written. Timeline, contributing factors, and the two actions with owners and dates.\n\nI kept the blameless framing and moved the raw timeline into an appendix, so the meeting can stay on the actions.",
    },
];
/*
 * The navigator addresses rows by messageId, and only a row that carries one is
 * registered with scrollToMessage. Anchoring and prepend detection work without
 * an id, jumping does not.
 */
const QUESTIONS = TURNS.filter((turn) => turn.role === "user");
function TurnNavigator() {
    const { scrollToMessage } = useMessageScroller();
    const { currentAnchorId } = useMessageScrollerVisibility();
    /*
     * The position is derived during render from the reported anchor. Mirroring
     * it into state would need an effect, and that effect would fight every
     * smooth scroll it started.
     */
    const index = Math.max(0, QUESTIONS.findIndex((question) => question.id === currentAnchorId));
    const current = QUESTIONS[index];
    /*
     * align start puts the question at the top of the viewport with the
     * provider's scroll margin above it, so a jump lands on the question and the
     * answer under it rather than halfway through the turn before.
     */
    function goTo(nextIndex) {
        const target = QUESTIONS[nextIndex];
        if (!target)
            return;
        scrollToMessage(target.id, { align: "start", behavior: "smooth" });
    }
    return (_jsxs("div", { className: "flex w-full min-w-0 items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Previous turn", disabled: index <= 0, onClick: () => goTo(index - 1), children: _jsx(IconPlaceholder, { lucide: "ChevronUpIcon", tabler: "IconChevronUp", hugeicons: "ArrowUp01Icon", phosphor: "CaretUpIcon", remixicon: "RiArrowUpSLine", "aria-hidden": "true" }) }), _jsxs("span", { className: "text-muted-foreground min-w-0 flex-1 truncate text-center text-sm", children: [_jsxs("span", { className: "text-foreground font-medium", children: ["Turn ", index + 1, " of ", QUESTIONS.length] }), " ", current.text] }), _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Next turn", disabled: index >= QUESTIONS.length - 1, onClick: () => goTo(index + 1), children: _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" }) })] }));
}
export default function Pattern() {
    return (
    /*
     * The frame owns the height, and the Provider wraps the whole card body so
     * the footer can read and drive the transcript while sitting outside the
     * scroll region.
     */
    _jsx(Card, { className: "h-115 w-full max-w-2xl gap-0 overflow-hidden py-0", children: _jsxs(MessageScrollerProvider, { scrollMargin: 12, children: [_jsxs(CardHeader, { className: "shrink-0 border-b py-4", children: [_jsx(CardTitle, { children: "Export incident review" }), _jsx(CardDescription, { children: "5 questions, 12 messages" })] }), _jsx(CardContent, { className: "min-h-0 flex-1 p-0", children: _jsxs(MessageScroller, { children: [_jsx(MessageScrollerViewport, { "aria-label": "Incident review transcript", children: _jsx(MessageScrollerContent, { className: "gap-5 p-(--card-spacing)", children: TURNS.map((turn) => {
                                        const isUser = turn.role === "user";
                                        return (
                                        /*
                                         * Only the questions carry an anchor, so the reported
                                         * anchor stays on a turn after it scrolls above the fold.
                                         * That is what makes it answer where the reader is rather
                                         * than what happens to be on screen.
                                         */
                                        _jsx(MessageScrollerItem, { messageId: turn.id, scrollAnchor: isUser, children: _jsxs(Message, { align: isUser ? "end" : "start", children: [_jsx(MessageAvatar, { className: "size-8", children: isUser ? (_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: VIEWER_AVATAR, alt: turn.author }), _jsx(AvatarFallback, { children: "JW" })] })) : (_jsxs(_Fragment, { children: [_jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine", "aria-hidden": "true", className: "text-muted-foreground size-4" }), _jsx("span", { className: "sr-only", children: turn.author })] })) }), _jsx(MessageContent, { children: _jsx(Bubble, { variant: isUser ? "muted" : "ghost", align: isUser ? "end" : "start", children: _jsx(BubbleContent, { className: "space-y-2", children: turn.text
                                                                    .split("\n\n")
                                                                    .map((paragraph, index) => (_jsx("p", { className: "whitespace-pre-wrap", children: paragraph }, index))) }) }) })] }) }, turn.id));
                                    }) }) }), _jsx(MessageScrollerButton, { variant: "outline", className: "rounded-full shadow-sm" })] }) }), _jsx(CardFooter, { className: "shrink-0 border-t py-4", children: _jsx(TurnNavigator, {}) })] }) }));
}
