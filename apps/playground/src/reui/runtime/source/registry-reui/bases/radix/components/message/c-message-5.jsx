import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, } from "../../../../../registry/bases/radix/ui/attachment.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Message, MessageAvatar, MessageContent, } from "../../../../../registry/bases/radix/ui/message.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/*
 * Requested at 448 square because the image variant crops to a square anyway.
 * A wide frame would pay for bytes that never reach a pixel.
 */
const HERO_ARTWORK = "/reui-assets/images/3acf433051cfc0ba518a.jpg";
/*
 * An Attachment is a first-class child of MessageContent. It brings its own
 * border and per-style radius, and an end-aligned row pulls it to the end as
 * it pulls the bubble, so there is no panel to hand-roll.
 */
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-6", children: [_jsxs(Message, { align: "end", children: [_jsx(MessageAvatar, { children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg", alt: "Sarah Chen" }), _jsx(AvatarFallback, { children: "SC" })] }) }), _jsxs(MessageContent, { children: [_jsxs(Attachment, { orientation: "vertical", className: "w-full max-w-56", children: [_jsx(AttachmentMedia, { variant: "image", children: _jsx("img", { src: HERO_ARTWORK, alt: "Gradient artwork for the release banner", width: 448, height: 448, loading: "lazy", decoding: "async" }) }), _jsxs(AttachmentContent, { children: [_jsx(AttachmentTitle, { children: "hero-gradient.png" }), _jsx(AttachmentDescription, { children: "PNG, 212 KB" })] })] }), _jsx(Bubble, { children: _jsx(BubbleContent, { children: "Here is the new release banner. Can you send the palette over?" }) })] })] }), _jsxs(Message, { children: [_jsx(MessageAvatar, { children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/4349381d8a8476edbc4c.jpg", alt: "Michael Rodriguez" }), _jsx(AvatarFallback, { children: "MR" })] }) }), _jsxs(MessageContent, { children: [_jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "Exported, one row per token." }) }), _jsxs(Attachment, { children: [_jsx(AttachmentMedia, { children: _jsx(IconPlaceholder, { lucide: "FileSpreadsheetIcon", tabler: "IconFileSpreadsheet", hugeicons: "GoogleSheetIcon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" }) }), _jsxs(AttachmentContent, { children: [_jsx(AttachmentTitle, { children: "palette-tokens.csv" }), _jsx(AttachmentDescription, { children: "CSV, 184 KB" })] }), _jsx(AttachmentActions, { children: _jsx(AttachmentAction, { type: "button", variant: "secondary", size: "icon-sm", "aria-label": "Download palette-tokens.csv", title: "Download", children: _jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownloadLine", "aria-hidden": "true" }) }) })] })] })] })] }));
}
