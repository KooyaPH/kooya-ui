import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-fit", children: "Open" }) }), _jsxs(DropdownMenuContent, { children: [_jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuItem, { children: "Profile" }), _jsx(DropdownMenuItem, { children: "Billing" }), _jsx(DropdownMenuItem, { children: "Settings" })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuItem, { children: "GitHub" }), _jsx(DropdownMenuItem, { children: "Support" }), _jsx(DropdownMenuItem, { disabled: true, children: "API" })] })] })] }) }));
}
