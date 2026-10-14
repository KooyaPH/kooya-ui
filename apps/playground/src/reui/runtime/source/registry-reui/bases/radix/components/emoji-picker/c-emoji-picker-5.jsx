"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { EMOJI_PICKER_CATEGORIES, EmojiPicker, EmojiPickerContent, EmojiPickerTrigger, } from "../../reui/emoji-picker.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Item, ItemContent, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/* Inline SVG so the example ships no image files. In an app these are the
   workspace's uploads, and any image URL works as `src`. One font size keeps
   one cap height; 4-letter labels are fitted to 44 of the 64 units, so a
   wider system font (Segoe UI, Roboto) cannot push them into the corners. */
const glyph = (text, color, size = 18) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${color}"/><text x="32" y="${32 + size * 0.35}" font-family="system-ui,sans-serif" font-size="${size}" font-weight="800" letter-spacing="-0.5" fill="#fff" text-anchor="middle"${text.length >= 4 ? ' textLength="44" lengthAdjust="spacingAndGlyphs"' : ""}>${text}</text></svg>`)}`;
/* Emoji whose `category` matches a `customCategories` id get their own tab,
   named by its label. The workspace logo replaces the default sparkle, the
   way Discord marks each server's set. */
const WORKSPACE = {
    id: "northwind",
    label: "Northwind Labs",
    icon: (_jsx("img", { src: glyph("N", "#4f46e5", 40), alt: "", width: 16, height: 16, className: "size-4" })),
};
/* The team's set leads, ahead of Frequently used, so it opens first however
   much the picker has been used. */
const CATEGORIES = [WORKSPACE.id, "recent", ...EMOJI_PICKER_CATEGORIES];
/* Two full rows of the default 8 columns, so the set opens as a block of its
   own above Smileys. The id doubles as the shortcode: `:lgtm:`. Where the
   tile prints another word, that word is a second shortcode, so it ties the
   native emoji of that name and the team's set, listed first, wins; a tag
   ranks below a name match. Only the id is stored and rendered, so a typed
   `:ship:` stays text and `:+1:` (a tag) stays the thumbs up. */
const TEAM_EMOJI = [
    { id: "lgtm", label: "Looks good to me", src: glyph("LGTM", "#16a34a") },
    {
        id: "shipit",
        label: "Ship it",
        src: glyph("SHIP", "#7c3aed"),
        shortcodes: ["shipit", "ship"],
    },
    {
        id: "plusone",
        label: "Plus one",
        src: glyph("+1", "#2563eb"),
        tags: ["+1", "agree", "yes"],
    },
    { id: "wip", label: "Work in progress", src: glyph("WIP", "#d97706") },
    {
        id: "blocked",
        label: "Blocked",
        src: glyph("STOP", "#dc2626"),
        shortcodes: ["blocked", "stop"],
    },
    {
        id: "ty",
        label: "Thank you",
        src: glyph("TY", "#db2777"),
        tags: ["thanks"],
    },
    { id: "ack", label: "Acknowledged", src: glyph("ACK", "#475569") },
    {
        id: "hotfix",
        label: "Hotfix",
        src: glyph("FIX", "#ea580c"),
        shortcodes: ["hotfix", "fix"],
    },
    { id: "nit", label: "Nitpick", src: glyph("NIT", "#0891b2") },
    { id: "sync", label: "Let's sync", src: glyph("SYNC", "#65a30d") },
    {
        id: "revert",
        label: "Revert",
        src: glyph("UNDO", "#c026d3"),
        shortcodes: ["revert", "undo"],
    },
    {
        id: "live",
        label: "Live in production",
        src: glyph("LIVE", "#0284c7"),
        tags: ["deployed"],
    },
    { id: "brb", label: "Be right back", src: glyph("BRB", "#ca8a04") },
    {
        id: "looking",
        label: "Taking a look",
        src: glyph("LOOK", "#0d9488"),
        shortcodes: ["looking", "look"],
        tags: ["eyes"],
    },
    { id: "help", label: "Need a hand", src: glyph("HELP", "#e11d48") },
    { id: "qa", label: "Ready for QA", src: glyph("QA", "#9333ea") },
].map((emoji) => ({ ...emoji, category: WORKSPACE.id }));
const BY_CODE = new Map(TEAM_EMOJI.map((emoji) => [`:${emoji.id}:`, emoji]));
/* Custom emoji travel as `:shortcode:` in the stored text and become images
   on render, the way Slack and Discord keep them. `h-lh` fills the line
   box each style sets (20px on nova, 16px on lyra) and the width follows
   the square intrinsic size, so the line keeps its height. */
function renderText(text) {
    return text.split(/(:[a-z0-9_+-]+:)/g).map((part, index) => {
        const emoji = BY_CODE.get(part);
        return emoji ? (_jsx("img", { src: emoji.src, alt: emoji.label, title: part, width: 20, height: 20, className: "inline-block h-lh w-auto align-top" }, index)) : (part);
    });
}
const photo = (id) => `https://images.unsplash.com/photo-${id}?w=96&h=96&dpr=2&q=80`;
const AMARA = {
    name: "Amara Okafor",
    initials: "AO",
    avatar: photo("1519699047748-de8e457a634e"),
};
const MICHAEL = {
    name: "Michael Rodriguez",
    initials: "MR",
    avatar: photo("1500648767791-00dcc994a43e"),
};
const DANIEL = {
    name: "Daniel Kim",
    initials: "DK",
    avatar: photo("1535713875002-d1d0cf377fde"),
};
const PRIYA = {
    name: "Priya Shah",
    initials: "PS",
    avatar: photo("1584308972272-9e4e7685e80f"),
};
const ME = {
    name: "Mira Stone",
    initials: "MS",
    avatar: photo("1494790108377-be9c29b29330"),
};
const ROOT = {
    id: "root",
    author: AMARA,
    time: "9:36 AM",
    text: "Release candidate is on staging :shipit: and one flaky checkout spec is left :wip:",
};
const REPLIES = [
    {
        id: "r1",
        author: MICHAEL,
        time: "9:48 AM",
        text: "Pinned the payment mock :hotfix:",
    },
    {
        id: "r2",
        author: DANIEL,
        time: "9:52 AM",
        text: "Green on all three browsers :lgtm:",
    },
    {
        id: "r3",
        author: PRIYA,
        time: "9:55 AM",
        text: "Release notes are merged :ty: :plusone:",
    },
];
function PostItem({ post, variant, }) {
    return (_jsxs(Item, { variant: variant, children: [_jsx(ItemMedia, { className: "self-start", children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: post.author.avatar, alt: "" }), _jsx(AvatarFallback, { children: post.author.initials })] }) }), _jsxs(ItemContent, { children: [_jsxs(ItemTitle, { children: [post.author.name, _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsx("span", { className: "text-muted-foreground font-normal", children: post.time })] }), _jsx("p", { className: "text-pretty wrap-break-word", children: renderText(post.text) })] })] }));
}
export default function Pattern() {
    const [replies, setReplies] = useState(REPLIES);
    const [text, setText] = useState("");
    const inputRef = useRef(null);
    const empty = !text.trim();
    /* A blurred input keeps its selection, so the shortcode replaces it and
       the caret lands after it. Padding it with spaces keeps it a token of its
       own: in `at 10:30:ty:` the time would swallow the opening colon. */
    const insert = (code) => {
        const field = inputRef.current;
        if (!field)
            return;
        const { value, selectionStart, selectionEnd } = field;
        const start = selectionStart ?? value.length;
        const before = value.slice(0, start);
        const after = value.slice(selectionEnd ?? start);
        const chunk = `${before && !before.endsWith(" ") ? " " : ""}${code}${after.startsWith(" ") ? "" : " "}`;
        const caret = start + chunk.length + (after.startsWith(" ") ? 1 : 0);
        const next = before + chunk + after;
        field.value = next;
        field.setSelectionRange(caret, caret);
        setText(next);
    };
    /* A fixed label, not a clock read, so the server render and the first
       client render agree. Focus goes back to the field for the next reply. */
    const send = () => {
        if (empty)
            return;
        setReplies([
            ...replies,
            {
                id: `r${replies.length + 1}`,
                author: ME,
                time: "Just now",
                text: text.trim(),
            },
        ]);
        setText("");
        inputRef.current?.focus();
    };
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Release 4.2" }), _jsx(CardDescription, { children: "#release-train" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(PostItem, { post: ROOT, variant: "muted" }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-muted-foreground shrink-0 text-xs", children: [replies.length, " ", replies.length === 1 ? "reply" : "replies"] }), _jsx("div", { className: "flex-1", children: _jsx(Separator, {}) })] }), _jsx("div", { role: "log", "aria-label": "Replies", className: "flex flex-col", children: replies.map((reply) => (_jsx(PostItem, { post: reply }, reply.id))) })] })] }) }), _jsx(CardFooter, { children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { ref: inputRef, value: text, onChange: (event) => setText(event.target.value), onKeyDown: (event) => {
                                /* Enter that confirms an IME composition is not a send. */
                                if (event.key === "Enter" && !event.nativeEvent.isComposing)
                                    send();
                            }, placeholder: "Reply", "aria-label": "Reply to thread" }), _jsxs(InputGroupAddon, { align: "inline-end", children: [_jsxs(EmojiPicker, { value: null, "aria-label": "Add emoji", customEmojis: TEAM_EMOJI, customCategories: [WORKSPACE], categories: CATEGORIES, recentStorageKey: "northwind-emoji-recent", onEmojiSelect: ({ value }) => insert(value), children: [_jsx(EmojiPickerTrigger, { variant: "ghost", size: "icon-sm" }), _jsx(EmojiPickerContent, { side: "top", align: "end", returnFocus: inputRef })] }), _jsx(Button, { variant: empty ? "ghost" : "default", size: "icon-sm", "aria-label": "Send reply", "aria-disabled": empty, onClick: send, children: _jsx(IconPlaceholder, { lucide: "SendIcon", tabler: "IconSend", hugeicons: "SentIcon", phosphor: "PaperPlaneRightIcon", remixicon: "RiSendPlaneLine", "aria-hidden": "true" }) })] })] }) })] }));
}
