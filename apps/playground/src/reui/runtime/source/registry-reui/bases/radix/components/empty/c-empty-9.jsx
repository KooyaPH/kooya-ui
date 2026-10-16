import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center p-4", children: _jsx(Empty, { className: "bg-muted py-16", children: _jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "BellOffIcon", tabler: "IconBellOff", hugeicons: "NotificationOff03Icon", phosphor: "BellSlashIcon", remixicon: "RiNotificationOffLine" }) }), _jsx(EmptyTitle, { children: "No notifications" }), _jsx(EmptyDescription, { children: "When you get notifications, they'll show up here." })] }) }) }));
}
