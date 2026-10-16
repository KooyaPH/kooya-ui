"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { EmojiPicker, EmojiPickerCategories, EmojiPickerContent, EmojiPickerFooter, EmojiPickerHeader, EmojiPickerList, EmojiPickerPreview, EmojiPickerSearch, EmojiPickerSkinTone, EmojiPickerTrigger, EmojiPickerValue, useEmojiPicker, } from "../../reui/emoji-picker.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Badge } from "../../../../../../../adapters/layout.tsx";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../../../../../../adapters/utility.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardHeader } from "../../../../../../../adapters/layout.tsx";
import { PopoverTitle } from "../../../../../../../adapters/overlays.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const RANDOM_CATEGORIES = new Set([
    "nature",
    "food",
    "travel",
    "activities",
    "objects",
]);
/* Rendered inside the picker for its loaded emoji and its select(), so
   Random commits and closes the popover exactly like a click on a cell. */
function IconMenuTitle({ titleId }) {
    const { emojis, value, select, clear, setOpen } = useEmojiPicker();
    return (_jsxs("div", { className: "flex items-center justify-between gap-2 px-(--emoji-picker-padding) pt-(--emoji-picker-padding)", children: [_jsx(PopoverTitle, { id: titleId, children: "Icon" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { type: "button", variant: "ghost", size: "sm", disabled: emojis.length === 0, onClick: () => {
                            /* Objects, places, food and nature make page icons. Faces read
                               as a mood, symbols as a status ("Black square button") and
                               flags render as letters on Windows. */
                            const pool = emojis.filter((emoji) => RANDOM_CATEGORIES.has(emoji.category));
                            select(pool[Math.floor(Math.random() * pool.length)]);
                        }, children: "Random" }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", disabled: !value, onClick: () => {
                            /* Closing hands focus back to the trigger, the same button now
                               reading Add icon. */
                            clear();
                            setOpen(false);
                        }, children: "Remove" })] })] }));
}
export default function Pattern() {
    const titleId = useId();
    /* Preselected: the page already has a stored icon, kept as the emoji
       itself so it fits a plain text column. */
    const [icon, setIcon] = useState("🎯");
    const slotRef = useRef(null);
    /* Every style pads a ghost button differently, so the pull is read off the
       button: it puts the glyph, not the box, on the title's edge. The trigger
       stays one node across both states, and each swap resizes it. */
    useLayoutEffect(() => {
        const slot = slotRef.current;
        const button = slot?.firstElementChild;
        if (!slot || !button)
            return;
        const observer = new ResizeObserver(() => {
            const mark = button.querySelector("svg, [data-slot=emoji-picker-value]");
            if (!mark)
                return;
            const box = button.getBoundingClientRect();
            const glyph = mark.getBoundingClientRect();
            const inset = getComputedStyle(slot).direction === "rtl"
                ? box.right - glyph.right
                : glyph.left - box.left;
            slot.style.marginInlineStart = `${-inset}px`;
        });
        observer.observe(button);
        return () => observer.disconnect();
    }, []);
    return (_jsxs(EmojiPicker, { value: icon, onValueChange: setIcon, "aria-label": "Page icon", children: [_jsxs(Card, { className: "w-full max-w-xl", children: [_jsx(CardHeader, { children: _jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Workspace" }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Projects" }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { children: _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { "aria-hidden": "true", className: "flex size-4 shrink-0 items-center justify-center text-base", children: icon ? (_jsx(EmojiPickerValue, {})) : (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File01Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-4" })) }), "Q4 planning"] }) }) })] }) }) }), _jsx(Separator, {}), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-5", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("div", { ref: slotRef, className: "-ms-1.5 flex h-18 items-end", children: icon ? (_jsx(EmojiPickerTrigger, { variant: "ghost", className: "size-18", children: _jsx("span", { className: "text-6xl", children: _jsx(EmojiPickerValue, {}) }) })) : (
                                            /* Still the one trigger, so the popover keeps its anchor
                                               and focus its target. The label matches the text. */
                                            _jsxs(EmojiPickerTrigger, { variant: "ghost", size: "sm", "aria-label": "Add icon", children: [_jsx(IconPlaceholder, { lucide: "SmilePlusIcon", tabler: "IconMoodPlus", hugeicons: "SmilePlusIcon", phosphor: "SmileyIcon", remixicon: "RiEmotionLine", "data-icon": "inline-start", "aria-hidden": "true" }), "Add icon"] })) }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("h2", { className: "text-3xl font-semibold tracking-tight", children: "Q4 planning" }), _jsx("p", { className: "text-muted-foreground", children: "Goals, owners and launch dates for the quarter." })] })] }), _jsx("div", { className: "overflow-x-clip", children: _jsxs("div", { className: "text-muted-foreground -ms-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-2", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg", alt: "" }), _jsx(AvatarFallback, { children: "AO" })] }), _jsx("span", { className: "text-foreground font-medium", children: "Amara Okafor" })] })] }), _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsx(Badge, { variant: "secondary", children: "On track" })] }), _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsx("span", { children: "Edited 2 days ago" })] })] }) })] }) })] }), _jsxs(EmojiPickerContent, { align: "start", "aria-labelledby": titleId, children: [_jsx(IconMenuTitle, { titleId: titleId }), _jsx(EmojiPickerHeader, { children: _jsx(EmojiPickerSearch, {}) }), _jsx(EmojiPickerCategories, {}), _jsx(EmojiPickerList, {}), _jsxs(EmojiPickerFooter, { children: [_jsx(EmojiPickerPreview, {}), _jsx(EmojiPickerSkinTone, {})] })] })] }));
}
