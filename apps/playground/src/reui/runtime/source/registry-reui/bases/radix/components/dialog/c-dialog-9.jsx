import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Kbd } from "../../../../../registry/bases/radix/ui/kbd.jsx";
const shortcuts = [
    { keys: ["⌘", "K"], action: "Search" },
    { keys: ["⌘", "B"], action: "Bold" },
    { keys: ["⌘", "I"], action: "Italic" },
    { keys: ["⌘", "S"], action: "Save" },
    { keys: ["⌘", "Z"], action: "Undo" },
    { keys: ["⌘", "⇧", "Z"], action: "Redo" },
    { keys: ["⌘", "N"], action: "New File" },
    { keys: ["⌘", "P"], action: "Quick Open" },
    { keys: ["⌘", "/"], action: "Toggle Comment" },
    { keys: ["⌘", "D"], action: "Duplicate Line" },
];
export default function Pattern() {
    const half = Math.ceil(shortcuts.length / 2);
    const leftColumn = shortcuts.slice(0, half);
    const rightColumn = shortcuts.slice(half);
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Keyboard Shortcuts" }) }), _jsxs(DialogContent, { className: "sm:max-w-lg", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Keyboard Shortcuts" }), _jsx(DialogDescription, { children: "Quick reference for commonly used keyboard shortcuts." })] }), _jsx("div", { className: "grid grid-cols-2 gap-x-6 gap-y-3", children: [leftColumn, rightColumn].map((column, colIndex) => (_jsx("div", { className: "space-y-3", children: column.map((shortcut) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-muted-foreground text-sm", children: shortcut.action }), _jsx("div", { className: "flex gap-1", children: shortcut.keys.map((key, index) => (_jsx(Kbd, { children: key }, index))) })] }, shortcut.action))) }, colIndex))) }), _jsx(DialogFooter, { children: _jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Close" }) }) })] })] }) }));
}
