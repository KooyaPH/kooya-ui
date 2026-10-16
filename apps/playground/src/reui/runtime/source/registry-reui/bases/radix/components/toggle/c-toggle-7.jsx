"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [pressed, setPressed] = useState(false);
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Toggle, { "aria-label": "Toggle notifications", pressed: pressed, onPressedChange: setPressed, children: _jsxs("div", { className: "relative", children: [_jsx(IconPlaceholder, { lucide: "BellIcon", tabler: "IconBell", hugeicons: "NotificationIcon", phosphor: "BellIcon", remixicon: "RiNotificationLine" }), !pressed && (_jsx(Badge, { variant: "destructive", size: "xs", className: "absolute -top-2 -right-2 rounded-full!", children: "3" }))] }) }) }));
}
