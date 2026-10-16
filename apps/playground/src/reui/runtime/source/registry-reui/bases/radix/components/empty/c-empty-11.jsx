import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center p-4", children: _jsxs(Empty, { className: "py-16", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "BookmarkIcon", tabler: "IconBookmark", hugeicons: "Bookmark02Icon", phosphor: "BookmarkSimpleIcon", remixicon: "RiBookmarkLine" }) }), _jsx(EmptyTitle, { children: "No bookmarks" }), _jsx(EmptyDescription, { children: "Items you bookmark will be saved here for quick access." })] }), _jsx(EmptyContent, { children: _jsx(Button, { variant: "outline", size: "sm", children: "Browse Items" }) })] }) }));
}
