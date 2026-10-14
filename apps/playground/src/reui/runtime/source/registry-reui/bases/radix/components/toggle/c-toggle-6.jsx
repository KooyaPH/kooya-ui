import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Toggle, { variant: "outline", "aria-label": "Toggle bookmark", children: [_jsx(IconPlaceholder, { lucide: "BookmarkIcon", tabler: "IconBookmark", hugeicons: "Bookmark02Icon", phosphor: "BookmarkSimpleIcon", remixicon: "RiBookmarkLine", className: "group-data-[state=on]/toggle:fill-accent-foreground" }), "Bookmark"] }) }));
}
