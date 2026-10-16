"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { DEFAULT_EMOJI_PICKER_I18N, EmojiPicker, EmojiPickerCategories, EmojiPickerContent, EmojiPickerFooter, EmojiPickerHeader, EmojiPickerList, EmojiPickerPreview, EmojiPickerSearch, EmojiPickerSkinTone, EmojiPickerTrigger, EmojiPickerValue, findEmoji, getEmojiValue, useEmojiPicker, } from "../../reui/emoji-picker.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Item, ItemContent, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const INITIAL_REACTIONS = [
    {
        emoji: "🎉",
        label: "party popper",
        people: ["Amara Okafor", "Priya Shah"],
        mine: true,
    },
    {
        emoji: "🚀",
        label: "rocket",
        people: ["Daniel Kim", "Michael Rodriguez", "Priya Shah"],
        mine: false,
    },
    {
        emoji: "👍🏽",
        label: "thumbs up, medium skin tone",
        people: ["Michael Rodriguez", "Amara Okafor"],
        mine: false,
    },
    { emoji: "👀", label: "eyes", people: ["Daniel Kim"], mine: false },
];
/* Untoned on purpose: the row draws them in the tone picked in the footer,
   so a toned 👍 joins the matching pill instead of starting a new one. */
const QUICK_REACTIONS = ["👍", "❤️", "😂", "🎉", "🙏", "👀"];
const TONES = DEFAULT_EMOJI_PICKER_I18N.labels.skinTones;
/* The tone goes into the name, or two pills of one emoji would announce
   the same thing. */
const labelOf = (emoji, tone) => tone > 0 && emoji.skins
    ? `${emoji.label}, ${TONES[tone].toLowerCase()} skin tone`
    : emoji.label;
const countOf = (reaction) => reaction.people.length + (reaction.mine ? 1 : 0);
/* "Amara Okafor, Priya Shah and you": you always come last. */
function namesOf(reaction) {
    const names = reaction.mine ? [...reaction.people, "you"] : reaction.people;
    if (names.length === 1)
        return reaction.mine ? "You" : names[0];
    return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
/* A composed first row in the popover, so the common reactions take one
   click. It goes through the picker's own `select`, so the skin tone, the
   recent list and closing on pick behave exactly like a grid pick. Columns
   one cell wide from the grid's gutter put each glyph over a grid column. */
function QuickReactions({ reactions }) {
    const { emojis, skinTone, select } = useEmojiPicker();
    return (_jsx("div", { role: "group", "aria-label": "Quick reactions", className: "grid auto-cols-(--emoji-picker-cell) grid-flow-col justify-start justify-items-center px-(--emoji-picker-gutter) pt-(--emoji-picker-padding)", children: QUICK_REACTIONS.map((glyph) => {
            /* Undefined until the data arrives, which the trigger starts
               fetching on hover, so the row is rarely disabled for long. */
            const emoji = findEmoji(emojis, glyph);
            const value = emoji ? getEmojiValue(emoji, skinTone) : glyph;
            const mine = reactions.some((reaction) => reaction.mine && reaction.emoji === value);
            return (
            /* Pressed reads as a quiet fill, not a solid primary tile. */
            _jsx(Button, { variant: mine ? "secondary" : "ghost", size: "icon-sm", "aria-pressed": mine, "aria-label": emoji ? labelOf(emoji, skinTone) : glyph, disabled: !emoji, onClick: () => emoji && select(emoji), children: _jsx("span", { "aria-hidden": "true", className: "text-(length:--emoji-picker-emoji) leading-none", children: _jsx(EmojiPickerValue, { value: value }) }) }, glyph));
        }) }));
}
export default function Pattern() {
    const id = useId();
    const [reactions, setReactions] = useState(INITIAL_REACTIONS);
    const [announcement, setAnnouncement] = useState("");
    const triggerRef = useRef(null);
    /* One path for a pill, a quick reaction and a grid pick: reacting with
       an emoji you already used takes yours back, and a pill nobody is left
       on goes away. */
    const toggle = (emoji, label) => {
        const existing = reactions.find((reaction) => reaction.emoji === emoji);
        const mine = !existing?.mine;
        const next = existing
            ? reactions.map((reaction) => reaction.emoji === emoji ? { ...reaction, mine } : reaction)
            : [...reactions, { emoji, label, people: [], mine }];
        const kept = next.filter((reaction) => countOf(reaction) > 0);
        setReactions(kept);
        setAnnouncement(mine ? `You reacted with ${label}` : `Removed your ${label} reaction`);
        /* The pressed pill unmounts with its last reaction, and focus would
           fall to the page; the add button sits beside the row. */
        if (kept.length < next.length)
            triggerRef.current?.focus();
    };
    return (_jsxs(Item, { variant: "outline", className: "max-w-md", children: [_jsx(ItemMedia, { className: "self-start", children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/df73db9a2c25069a422d.jpg", alt: "" }), _jsx(AvatarFallback, { children: "LM" })] }) }), _jsxs(ItemContent, { children: [_jsxs(ItemTitle, { children: ["Lucas Martin", _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsx("span", { className: "text-muted-foreground font-normal", children: "10:42 AM" })] }), _jsx("p", { className: "text-pretty", children: "Dark mode is live for 10% of workspaces. If error rates hold, everyone gets it on Thursday." }), _jsx(TooltipProvider, { children: _jsxs("div", { className: "flex flex-wrap items-center gap-1.5 pt-2", children: [reactions.map((reaction) => {
                                    const count = countOf(reaction);
                                    /* Keyed by the emoji, not the index, so a description never
                                     moves to a neighbour when a pill above it goes away. */
                                    const descriptionId = `${id}-${reaction.emoji}`;
                                    return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: reaction.mine ? "default" : "secondary", size: "sm", "aria-pressed": reaction.mine, "aria-label": `${reaction.label}, ${count} ${count === 1 ? "reaction" : "reactions"}`, "aria-describedby": descriptionId, onClick: () => toggle(reaction.emoji, reaction.label), children: [_jsx("span", { "aria-hidden": "true", className: "text-sm leading-none", children: reaction.emoji }), _jsx("span", { "aria-hidden": "true", className: "tabular-nums", children: count }), _jsxs("span", { id: descriptionId, hidden: true, children: [namesOf(reaction), " reacted with ", reaction.label] })] }) }), _jsx(TooltipContent, { children: namesOf(reaction) })] }, reaction.emoji));
                                }), _jsxs(EmojiPicker, { value: null, "aria-label": "Add reaction", onEmojiSelect: ({ value, emoji, skinTone }) => toggle(value, labelOf(emoji, skinTone)), children: [_jsx(EmojiPickerTrigger, { ref: triggerRef, variant: "secondary", size: "icon-sm", title: "Add reaction", children: _jsx(IconPlaceholder, { lucide: "SmilePlusIcon", tabler: "IconMoodPlus", hugeicons: "SmilePlusIcon", phosphor: "SmileyIcon", remixicon: "RiEmotionLine", "aria-hidden": "true" }) }), _jsxs(EmojiPickerContent, { side: "bottom", align: "end", sideOffset: 20, children: [_jsx(QuickReactions, { reactions: reactions }), _jsx(EmojiPickerHeader, { children: _jsx(EmojiPickerSearch, {}) }), _jsx(EmojiPickerCategories, {}), _jsx(EmojiPickerList, {}), _jsxs(EmojiPickerFooter, { children: [_jsx(EmojiPickerPreview, {}), _jsx(EmojiPickerSkinTone, {})] })] })] })] }) }), _jsx("p", { role: "status", className: "sr-only", children: announcement })] })] }));
}
