import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Avatar, { children: _jsx(AvatarFallback, { children: "AJ" }) }), _jsx(Avatar, { children: _jsx(AvatarFallback, { children: _jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine", className: "size-4", "aria-hidden": "true" }) }) })] }));
}
