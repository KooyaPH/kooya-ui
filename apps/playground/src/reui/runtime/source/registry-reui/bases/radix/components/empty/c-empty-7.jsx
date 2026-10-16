import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center p-4", children: _jsx(Empty, { className: "py-16", children: _jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "InboxIcon", tabler: "IconInbox", hugeicons: "InboxIcon", phosphor: "TrayIcon", remixicon: "RiInboxLine" }) }), _jsx(EmptyTitle, { children: "Inbox zero" }), _jsx(EmptyDescription, { children: "You're all caught up. No new messages." })] }) }) }));
}
