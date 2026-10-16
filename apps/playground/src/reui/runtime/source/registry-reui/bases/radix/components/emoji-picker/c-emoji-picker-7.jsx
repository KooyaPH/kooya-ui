"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { EmojiPicker, EmojiPickerContent, EmojiPickerTrigger, } from "../../reui/emoji-picker.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Item, ItemContent, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/* The tabs a kudos note needs. Nature, food, travel and flags leave the
   browse view only: search still reaches every emoji the filter keeps.
   Recent shares its stored list with every picker in the app but resolves
   through the same filter, so a blocked emoji picked elsewhere never
   resurfaces here. */
const CATEGORIES = [
    "recent",
    "smileys",
    "people",
    "activities",
    "objects",
    "symbols",
];
/* Hexcodes kept out of a workplace recognition tool. */
const BLOCKED = new Set(["1F346", "1F351", "1F4A9", "1F595", "1F52B", "1F92C"]);
/* Module scope, so the filter keeps one identity across renders. */
const workplaceSafe = (emoji) => !BLOCKED.has(emoji.id);
/* A space goes after a word or a sentence mark, never after a space, an
   opening bracket or another emoji, so two picks in a row sit flush. */
const SPACE_AFTER = /[^\s\p{Ps}\p{Pi}\p{Extended_Pictographic}\p{Emoji_Modifier}\p{Regional_Indicator}\u{FE0F}\u{20E3}\u{E007F}]$/u;
/* And before a word, never before the comma or stop that follows it. */
const SPACE_BEFORE = /^[\p{L}\p{N}]/u;
export default function Pattern() {
    const [note, setNote] = useState("");
    const [sent, setSent] = useState(false);
    const noteRef = useRef(null);
    const confirmationRef = useRef(null);
    /* A blurred textarea keeps its selection, so the pick lands at the caret,
       spaced off the words beside it, and the caret stays right after it. */
    const insert = (emoji) => {
        const field = noteRef.current;
        if (!field)
            return;
        const { value, selectionStart, selectionEnd } = field;
        const before = value.slice(0, selectionStart);
        const after = value.slice(selectionEnd);
        const lead = SPACE_AFTER.test(before) ? " " : "";
        const trail = SPACE_BEFORE.test(after) ? " " : "";
        const caret = before.length + lead.length + emoji.length;
        field.value = before + lead + emoji + trail + after;
        field.setSelectionRange(caret, caret);
        setNote(field.value);
    };
    /* Send unmounts with the composer, so focus moves to the confirmation
       instead of falling back to the page body. The frame waits for the
       commit that mounts it. */
    const send = () => {
        setSent(true);
        requestAnimationFrame(() => confirmationRef.current?.focus());
    };
    /* Undo brings the draft back untouched, caret at the end. */
    const undo = () => {
        setSent(false);
        requestAnimationFrame(() => {
            const field = noteRef.current;
            field?.focus();
            field?.setSelectionRange(field.value.length, field.value.length);
        });
    };
    return (_jsxs(Card, { className: "w-full max-w-sm", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "row-span-2 flex items-center gap-3", children: [_jsxs(Avatar, { size: "lg", children: [_jsx(AvatarImage, { src: "/reui-assets/images/e93553df2422635515ee.jpg", alt: "" }), _jsx(AvatarFallback, { children: "DK" })] }), _jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [_jsx(CardTitle, { children: "Kudos for Daniel Kim" }), _jsx(CardDescription, { children: "Staff engineer, Platform" })] })] }) }), _jsx(CardContent, { children: sent ? (
                /* The kudos renders as the feed entry it became. A plain paragraph,
                   not ItemDescription, which clamps to two lines: this is where the
                   sender reads back the whole note. */
                _jsxs(Item, { variant: "muted", children: [_jsx(ItemMedia, { className: "self-start", children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/c6e9e0d487c842b94fea.jpg", alt: "" }), _jsx(AvatarFallback, { children: "MS" })] }) }), _jsxs(ItemContent, { children: [_jsxs(ItemTitle, { children: ["Mira Stone", _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsx("span", { className: "text-muted-foreground font-normal", children: "Just now" })] }), _jsx("p", { className: "wrap-break-word whitespace-pre-wrap", children: note.trim() })] })] })) : (_jsx(Textarea, { ref: noteRef, value: note, onChange: (event) => setNote(event.target.value), placeholder: "Write a note for Daniel", "aria-label": "Kudos for Daniel Kim" })) }), _jsx(CardFooter, { children: sent ? (
                /* Undo sits at the start, away from where Send was, so a double
                   click cannot send and take it back. No gap: the link's own
                   padding spaces it, so it reads as part of the sentence. */
                _jsxs("div", { className: "flex items-center", children: [_jsxs("p", { ref: confirmationRef, tabIndex: -1, className: "text-muted-foreground flex items-center gap-2 outline-none", children: [_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", "aria-hidden": "true", className: "size-4" }), "Posted in #platform"] }), _jsx(Button, { variant: "link", onClick: undo, children: "Undo" })] })) : (_jsxs("div", { className: "flex w-full items-center justify-between gap-2", children: [_jsx("p", { className: "text-muted-foreground", children: "Posts to #platform" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(EmojiPicker, { value: null, "aria-label": "Add emoji", categories: CATEGORIES, emojiVersion: 14, filter: workplaceSafe, onEmojiSelect: ({ value }) => insert(value), children: [_jsx(EmojiPickerTrigger, { variant: "ghost", size: "icon" }), _jsx(EmojiPickerContent, { side: "bottom", align: "end", returnFocus: noteRef })] }), _jsx(Button, { disabled: !note.trim(), onClick: send, children: "Send kudos" })] })] })) }), _jsx("p", { role: "status", className: "sr-only", children: sent ? "Kudos for Daniel Kim posted in #platform" : "" })] }));
}
