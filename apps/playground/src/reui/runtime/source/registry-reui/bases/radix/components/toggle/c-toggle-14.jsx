"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [muted, setMuted] = useState(false);
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Toggle, { size: "lg", variant: "outline", "aria-label": "Toggle mute", pressed: muted, onPressedChange: setMuted, children: [muted ? (_jsx(IconPlaceholder, { lucide: "VolumeOffIcon", tabler: "IconVolumeOff", hugeicons: "VolumeOffIcon", phosphor: "SpeakerSlashIcon", remixicon: "RiVolumeOffVibrateLine" })) : (_jsx(IconPlaceholder, { lucide: "Volume2Icon", tabler: "IconVolume", hugeicons: "VolumeHighIcon", phosphor: "SpeakerHighIcon", remixicon: "RiVolumeUpLine" })), muted ? "Muted" : "Sound"] }) }));
}
