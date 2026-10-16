import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Message, MessageAvatar, MessageContent, MessageGroup, MessageHeader, } from "../../../../../registry/bases/radix/ui/message.jsx";
/*
 * A run from one person gets one portrait, on the last row. The earlier rows
 * still render MessageAvatar, just empty: it keeps its minimum width and holds
 * the spine that the last row sits on. Dropping the slot knocks the run off it.
 */
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-6", children: [_jsxs(MessageGroup, { children: [_jsxs(Message, { children: [_jsx(MessageAvatar, {}), _jsxs(MessageContent, { children: [_jsx(MessageHeader, { children: "Alex Johnson" }), _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "I pulled the eu-west traces for 14:00 to 14:10." }) })] })] }), _jsxs(Message, { children: [_jsx(MessageAvatar, {}), _jsx(MessageContent, { children: _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "Every slow request goes through the tax service." }) }) })] }), _jsxs(Message, { children: [_jsx(MessageAvatar, { children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/e93553df2422635515ee.jpg", alt: "Alex Johnson" }), _jsx(AvatarFallback, { children: "AJ" })] }) }), _jsx(MessageContent, { children: _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "It is a retry loop, not the database. Two retries at 400ms each." }) }) })] })] }), _jsxs(Message, { align: "end", children: [_jsx(MessageAvatar, { children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg", alt: "Emma Wilson" }), _jsx(AvatarFallback, { children: "EW" })] }) }), _jsx(MessageContent, { children: _jsx(Bubble, { children: _jsx(BubbleContent, { children: "That lines up with the 14:04 deploy. Rolling the tax client back." }) }) })] })] }));
}
