"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [liked, setLiked] = useState(false);
    const [retweeted, setRetweeted] = useState(false);
    const [shared, setShared] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    return (_jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [_jsxs(Toggle, { variant: "outline", "aria-label": "Like", pressed: liked, onPressedChange: setLiked, children: [_jsx(IconPlaceholder, { lucide: "HeartIcon", tabler: "IconHeart", hugeicons: "FavouriteIcon", phosphor: "HeartIcon", remixicon: "RiHeartLine" }), liked ? 13 : 12] }), _jsxs(Toggle, { variant: "outline", "aria-label": "Retweet", pressed: retweeted, onPressedChange: setRetweeted, children: [_jsx(IconPlaceholder, { lucide: "Repeat2Icon", tabler: "IconRepeat", hugeicons: "RepeatIcon", phosphor: "RepeatIcon", remixicon: "RiRepeatLine" }), retweeted ? 6 : 5] }), _jsxs(Toggle, { variant: "outline", "aria-label": "Share", pressed: shared, onPressedChange: setShared, children: [_jsx(IconPlaceholder, { lucide: "Share2Icon", tabler: "IconShare", hugeicons: "Share08Icon", phosphor: "ShareNetworkIcon", remixicon: "RiStackshareLine" }), shared ? 4 : 3] }), _jsxs(Toggle, { variant: "outline", "aria-label": "Bookmark", pressed: bookmarked, onPressedChange: setBookmarked, children: [_jsx(IconPlaceholder, { lucide: "BookmarkIcon", tabler: "IconBookmark", hugeicons: "Bookmark02Icon", phosphor: "BookmarkSimpleIcon", remixicon: "RiBookmarkLine" }), bookmarked ? 9 : 8] })] }));
}
