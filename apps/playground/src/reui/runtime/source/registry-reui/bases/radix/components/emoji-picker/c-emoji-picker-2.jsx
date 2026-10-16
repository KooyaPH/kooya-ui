"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { EmojiPicker, EmojiPickerContent, EmojiPickerTrigger, } from "../../reui/emoji-picker.jsx";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent, BubbleGroup, } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Message, MessageAvatar, MessageContent, MessageHeader, } from "../../../../../registry/bases/radix/ui/message.jsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const photo = (id) => `https://images.unsplash.com/photo-${id}?w=96&h=96&dpr=2&q=80`;
const AMARA = {
    name: "Amara Okafor",
    initials: "AO",
    avatar: photo("1519699047748-de8e457a634e"),
};
const LUCAS = {
    name: "Lucas Martin",
    initials: "LM",
    avatar: photo("1527980965255-d3b416303d12"),
};
const PRIYA = {
    name: "Priya Shah",
    initials: "PS",
    avatar: photo("1584308972272-9e4e7685e80f"),
};
const MIRA = {
    name: "Mira Stone",
    initials: "MS",
    avatar: photo("1494790108377-be9c29b29330"),
};
const MEMBERS = [AMARA, LUCAS, PRIYA, MIRA];
const THREAD = [
    {
        id: "g0",
        author: PRIYA,
        time: "9:05 AM",
        lines: ["Morning! Slides are in the shared drive."],
    },
    {
        id: "g1",
        author: AMARA,
        time: "9:12 AM",
        lines: ["Launch review moved to 4 PM.", "Can everyone still make it?"],
    },
    {
        id: "g2",
        author: LUCAS,
        time: "9:14 AM",
        lines: ["Works for me 👍"],
    },
    {
        id: "g3",
        time: "9:15 AM",
        lines: ["I'm in. Demo build is ready."],
    },
    {
        id: "g4",
        author: PRIYA,
        time: "9:21 AM",
        lines: ["Same. Big room is booked."],
    },
];
export default function Pattern() {
    const [groups, setGroups] = useState(THREAD);
    const [text, setText] = useState("");
    const logRef = useRef(null);
    const inputRef = useRef(null);
    const empty = !text.trim();
    /* Keyed on the array, not its length: a follow-up joins your last group
       and leaves the length unchanged. */
    useEffect(() => {
        const log = logRef.current;
        if (log)
            log.scrollTop = log.scrollHeight;
    }, [groups]);
    /* A blurred input keeps its selection, so the emoji replaces it and the
       caret lands after it. Set here rather than after focus returns, because
       a Shift+click pick keeps the picker open. */
    const insert = (emoji) => {
        const field = inputRef.current;
        if (!field)
            return;
        const { value } = field;
        const start = field.selectionStart ?? value.length;
        const end = field.selectionEnd ?? start;
        const next = value.slice(0, start) + emoji + value.slice(end);
        const caret = start + emoji.length;
        field.value = next;
        field.setSelectionRange(caret, caret);
        setText(next);
    };
    /* A fixed label, not a clock read, so the server render and the first
       client render agree. */
    const send = () => {
        if (empty)
            return;
        const line = text.trim();
        const last = groups.at(-1);
        setGroups(last && !last.author
            ? [...groups.slice(0, -1), { ...last, lines: [...last.lines, line] }]
            : [
                ...groups,
                { id: `g${groups.length + 1}`, time: "Just now", lines: [line] },
            ]);
        setText("");
        inputRef.current?.focus();
    };
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "#launch-crew" }), _jsx(CardDescription, { children: "4 members" }), _jsx(CardAction, { children: _jsx(AvatarGroup, { "aria-hidden": "true", children: MEMBERS.map((member) => (_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: member.avatar, alt: "" }), _jsx(AvatarFallback, { children: member.initials })] }, member.name))) }) })] }), _jsxs("div", { children: [_jsx(Separator, {}), _jsx(CardContent, { ref: logRef, role: "log", "aria-label": "Messages in #launch-crew", tabIndex: 0, className: "max-h-160 overflow-y-auto", children: _jsx("div", { className: "flex flex-col gap-6 pt-4", children: groups.map((group) => (_jsxs(Message, { align: group.author ? "start" : "end", children: [group.author && (
                                    /* Top-aligned beside the name line, so every group reads
                                     the same way: who, when, then what. The header names the
                                     sender, so the photo stays silent. */
                                    _jsx(MessageAvatar, { "aria-hidden": "true", className: "self-start", children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: group.author.avatar, alt: "" }), _jsx(AvatarFallback, { children: group.author.initials })] }) })), _jsxs(MessageContent, { children: [_jsx(MessageHeader, { children: _jsxs("span", { className: "flex items-center gap-1.5", children: [group.author ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-foreground", children: group.author.name }), _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" })] })) : (
                                                        /* Your own groups show only the time, as chat apps
                                                         do. The hidden word keeps the log from announcing
                                                         a bare time. */
                                                        _jsx("span", { className: "sr-only", children: "You" })), _jsx("span", { className: "font-normal", children: group.time })] }) }), _jsx(BubbleGroup, { className: "w-full", children: group.lines.map((line, index) => (_jsx(Bubble, { variant: group.author ? "muted" : "default", children: _jsx(BubbleContent, { children: line }) }, index))) })] })] }, group.id))) }) })] }), _jsx(CardContent, { children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { ref: inputRef, value: text, onChange: (event) => setText(event.target.value), onKeyDown: (event) => {
                                /* Enter that confirms an IME composition is not a send. */
                                if (event.key === "Enter" && !event.nativeEvent.isComposing)
                                    send();
                            }, placeholder: "Message #launch-crew", "aria-label": "Message #launch-crew" }), _jsxs(InputGroupAddon, { align: "inline-end", children: [_jsxs(EmojiPicker, { value: null, "aria-label": "Add emoji", onEmojiSelect: ({ value }) => insert(value), children: [_jsx(EmojiPickerTrigger, { variant: "ghost", size: "icon-sm" }), _jsx(EmojiPickerContent, { side: "top", align: "end", returnFocus: inputRef })] }), _jsx(Button, { variant: empty ? "ghost" : "default", size: "icon-sm", "aria-label": "Send message", "aria-disabled": empty, onClick: send, children: _jsx(IconPlaceholder, { lucide: "SendIcon", tabler: "IconSend", hugeicons: "SentIcon", phosphor: "PaperPlaneRightIcon", remixicon: "RiSendPlaneLine", "aria-hidden": "true" }) })] })] }) })] }));
}
