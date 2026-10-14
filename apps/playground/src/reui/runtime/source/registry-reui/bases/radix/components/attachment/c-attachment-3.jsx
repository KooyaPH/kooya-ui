"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Attachment, AttachmentContent, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger, } from "../../../../../registry/bases/radix/ui/attachment.jsx";
// Thumbnails are requested at the card width and twice the density, so the
// strip never pulls a full size screenshot down to paint a 120px square.
const SHOTS = [
    {
        id: "gradient",
        name: "brand-gradient.png",
        dimensions: "2400 x 1600",
        src: "/reui-assets/images/b5a8406d913545dc0cee.jpg",
        alt: "Purple and orange gradient artwork",
    },
    {
        id: "mesh",
        name: "mesh-backdrop.png",
        dimensions: "1800 x 1200",
        src: "/reui-assets/images/1350f821433b98ad1528.jpg",
        alt: "Blue and violet mesh render",
    },
    {
        id: "spectrum",
        name: "spectrum-wash.jpg",
        dimensions: "3000 x 2000",
        src: "/reui-assets/images/32316c4a6ca2376bd187.jpg",
        alt: "Soft rainbow spectrum wash",
    },
    {
        id: "waves",
        name: "wave-pattern.png",
        dimensions: "1200 x 1200",
        src: "/reui-assets/images/4d3ac3f3881ec891b958.jpg",
        alt: "Magenta and violet wave pattern",
    },
    {
        id: "ink",
        name: "ink-render.png",
        dimensions: "2000 x 1400",
        src: "/reui-assets/images/76562ec89257456438c3.jpg",
        alt: "Colourful ink dispersing in water",
    },
];
export default function Pattern() {
    const [selectedId, setSelectedId] = useState(null);
    // Boots with nothing chosen so the first click is the thing on show, and
    // the selected shot is looked up during render rather than duplicated.
    const selected = SHOTS.find((shot) => shot.id === selectedId) ?? null;
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-2", children: [_jsx(AttachmentGroup, { role: "group", "aria-label": "Screenshots in this thread", children: SHOTS.map((shot) => (
                /*
                 * A vertical card takes its own fixed width, so a w-full here would
                 * collapse the strip into one column and kill the snap scrolling.
                 */
                _jsxs(Attachment, { orientation: "vertical", children: [_jsx(AttachmentMedia, { variant: "image", children: _jsx("img", { src: shot.src, alt: shot.alt, width: 120, height: 120, loading: "lazy", decoding: "async" }) }), _jsx(AttachmentContent, { children: _jsx(AttachmentTitle, { children: shot.name }) }), _jsx(AttachmentTrigger, { type: "button", "aria-label": `Preview ${shot.name}`, "aria-pressed": selectedId === shot.id, onClick: () => setSelectedId(shot.id) })] }, shot.id))) }), _jsx("p", { className: "text-muted-foreground text-xs", "aria-live": "polite", children: selected ? (_jsxs(_Fragment, { children: [selected.name, _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 mx-1.5 inline-block size-1 rounded-full align-middle" }), selected.dimensions] })) : ("Select a shot to see its details.") })] }));
}
