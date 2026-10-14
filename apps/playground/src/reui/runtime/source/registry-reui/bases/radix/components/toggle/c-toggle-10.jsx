"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [pressed, setPressed] = useState(false);
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Toggle, { variant: "outline", "aria-label": "Toggle bookmark", pressed: pressed, onPressedChange: setPressed, children: [pressed ? (_jsx(IconPlaceholder, { lucide: "BookmarkCheckIcon", tabler: "IconBookmark", hugeicons: "BookmarkCheck02Icon", phosphor: "BookmarkSimpleIcon", remixicon: "RiBookmarkLine", className: "fill-current" })) : (_jsx(IconPlaceholder, { lucide: "BookmarkIcon", tabler: "IconBookmark", hugeicons: "Bookmark02Icon", phosphor: "BookmarkSimpleIcon", remixicon: "RiBookmarkLine" })), pressed ? "Bookmarked" : "Bookmark"] }) }));
}
