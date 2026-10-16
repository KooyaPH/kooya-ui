import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Button, { variant: "outline", className: "relative gap-2", "aria-label": "Inbox (8 unread)", children: [_jsx(IconPlaceholder, { lucide: "MailIcon", tabler: "IconMail", hugeicons: "MailIcon", phosphor: "EnvelopeIcon", remixicon: "RiMailLine", "aria-hidden": "true" }), "Inbox", _jsx(Badge, { variant: "destructive", size: "sm", className: "absolute -top-1.5 -right-2 rounded-full px-1", "aria-hidden": "true", children: "8" })] }));
}
