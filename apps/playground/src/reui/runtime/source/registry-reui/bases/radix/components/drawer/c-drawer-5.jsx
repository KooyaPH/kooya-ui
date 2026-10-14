import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "../../../../../../../adapters/overlays.tsx";
const SIDES = [
    { label: "Top", direction: "top" },
    { label: "Right", direction: "right" },
    { label: "Bottom", direction: "bottom" },
    { label: "Left", direction: "left" },
];
export default function Pattern() {
    return (_jsx("div", { className: "flex flex-wrap items-center justify-center gap-2", children: SIDES.map((side) => (_jsxs(Drawer, { direction: side.direction, children: [_jsx(DrawerTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: side.label }) }), _jsxs(DrawerContent, { children: [_jsxs(DrawerHeader, { children: [_jsx(DrawerTitle, { children: "Move Goal" }), _jsx(DrawerDescription, { children: "Set your daily activity goal." })] }), _jsx("div", { className: "no-scrollbar overflow-y-auto px-4", children: Array.from({ length: 10 }).map((_, index) => (_jsx("p", { className: "mb-4 leading-normal", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }, index))) }), _jsxs(DrawerFooter, { children: [_jsx(Button, { children: "Submit" }), _jsx(DrawerClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) })] })] })] }, side.label))) }));
}
