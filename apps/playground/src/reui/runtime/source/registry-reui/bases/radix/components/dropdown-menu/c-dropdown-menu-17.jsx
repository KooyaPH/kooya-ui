import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const icons = {
    bell: (_jsx(IconPlaceholder, { lucide: "BellIcon", tabler: "IconBell", hugeicons: "Notification01Icon", phosphor: "BellIcon", remixicon: "RiNotification3Line", "aria-hidden": "true" })),
    check: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", "aria-hidden": "true" })),
};
export default function Pattern() {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Notifications", children: icons.bell }) }), _jsx(DropdownMenuContent, { align: "start", className: "w-56", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Notifications" }), _jsxs(DropdownMenuItem, { children: [_jsx("span", { className: "flex-1", children: "New message from Alex" }), icons.check] }), _jsx(DropdownMenuItem, { children: _jsx("span", { className: "flex-1", children: "Document approved" }) }), _jsx(DropdownMenuItem, { children: _jsx("span", { className: "flex-1", children: "Pipeline stage updated" }) })] }) })] }));
}
