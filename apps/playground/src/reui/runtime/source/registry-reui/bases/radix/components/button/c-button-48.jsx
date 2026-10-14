import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Button, { size: "icon", variant: "outline", className: "relative", "aria-label": "Notifications (8)", children: [_jsx(IconPlaceholder, { lucide: "BellIcon", tabler: "IconBell", hugeicons: "NotificationIcon", phosphor: "BellIcon", remixicon: "RiNotificationLine", "aria-hidden": "true" }), _jsx(Badge, { variant: "destructive", size: "xs", className: "absolute -top-1 -right-1 rounded-full px-1", "aria-hidden": "true", children: "8" })] }));
}
