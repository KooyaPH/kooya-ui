import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
const sides = ["left", "top", "bottom", "right"];
export default function Pattern() {
    return (_jsx("div", { className: "grid grid-cols-2 gap-2", children: sides.map((side) => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-full", children: side.replace("-", " ").charAt(0).toUpperCase() +
                            side.replace("-", " ").slice(1) }) }), _jsx(DropdownMenuContent, { side: side, children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuItem, { children: "Profile" }), _jsx(DropdownMenuItem, { children: "Billing" }), _jsx(DropdownMenuItem, { children: "Settings" })] }) })] }, side))) }));
}
