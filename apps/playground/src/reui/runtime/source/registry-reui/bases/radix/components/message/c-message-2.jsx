import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Message, MessageAvatar, MessageContent, } from "../../../../../registry/bases/radix/ui/message.jsx";
/*
 * Hoisted because each person speaks twice. Repeating a 90-character URL per
 * turn is how a thread ends up rendering two crops of one face.
 */
const MICHAEL_AVATAR = "/reui-assets/images/4349381d8a8476edbc4c.jpg";
const SARAH_AVATAR = "/reui-assets/images/dfed3098ae0011e5a5a3.jpg";
/*
 * MessageAvatar is self-end, so the third message runs long on purpose: a
 * wrapped turn is the only state in which the bottom anchoring is visible.
 */
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-6", children: [_jsxs(Message, { children: [_jsx(MessageAvatar, { className: "overflow-visible", children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: MICHAEL_AVATAR, alt: "Michael Rodriguez" }), _jsx(AvatarFallback, { children: "MR" }), _jsx(AvatarBadge, { className: "bg-green-500", children: _jsx("span", { className: "sr-only", children: "Online" }) })] }) }), _jsx(MessageContent, { children: _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "eu-west checkout is timing out. It started around 14:05." }) }) })] }), _jsxs(Message, { align: "end", children: [_jsx(MessageAvatar, { children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: SARAH_AVATAR, alt: "Sarah Chen" }), _jsx(AvatarFallback, { children: "SC" })] }) }), _jsx(MessageContent, { children: _jsx(Bubble, { children: _jsx(BubbleContent, { children: "Looking now. Is it every request or one route?" }) }) })] }), _jsxs(Message, { children: [_jsx(MessageAvatar, { className: "overflow-visible", children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: MICHAEL_AVATAR, alt: "Michael Rodriguez" }), _jsx(AvatarFallback, { children: "MR" }), _jsx(AvatarBadge, { className: "bg-green-500", children: _jsx("span", { className: "sr-only", children: "Online" }) })] }) }), _jsx(MessageContent, { children: _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "Only POST /api/checkout/confirm. p95 went from 240ms to 3.1s and the error rate is sitting at 4.2 percent. Every other route in the region is flat." }) }) })] }), _jsxs(Message, { align: "end", children: [_jsx(MessageAvatar, { children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: SARAH_AVATAR, alt: "Sarah Chen" }), _jsx(AvatarFallback, { children: "SC" })] }) }), _jsx(MessageContent, { children: _jsx(Bubble, { children: _jsx(BubbleContent, { children: "Pulling the traces for that window now." }) }) })] })] }));
}
