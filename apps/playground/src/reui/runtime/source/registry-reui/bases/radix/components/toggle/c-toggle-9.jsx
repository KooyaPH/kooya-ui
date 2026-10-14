"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [pressed, setPressed] = useState(false);
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Toggle, { "aria-label": "Toggle favorite", pressed: pressed, onPressedChange: setPressed, children: pressed ? (_jsx(IconPlaceholder, { lucide: "HeartIcon", tabler: "IconHeart", hugeicons: "FavouriteIcon", phosphor: "HeartIcon", remixicon: "RiHeartLine", className: "fill-current" })) : (_jsx(IconPlaceholder, { lucide: "HeartIcon", tabler: "IconHeart", hugeicons: "FavouriteIcon", phosphor: "HeartIcon", remixicon: "RiHeartLine" })) }) }));
}
