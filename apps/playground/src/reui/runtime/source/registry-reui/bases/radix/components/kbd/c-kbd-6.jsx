import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Kbd, KbdGroup } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
const shortcuts = [
    { label: "Search", keys: ["⌘", "K"] },
    { label: "New File", keys: ["⌘", "N"] },
    { label: "Save", keys: ["⌘", "S"] },
    { label: "Undo", keys: ["⌘", "Z"] },
    { label: "Redo", keys: ["⌘", "⇧", "Z"] },
];
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-xs flex-col", children: [_jsx("p", { className: "mb-3 text-sm font-medium", children: "Keyboard Shortcuts" }), _jsx(Separator, {}), _jsx("div", { className: "flex flex-col", children: shortcuts.map((shortcut) => (_jsxs("div", { className: "flex items-center justify-between border-b py-2.5 last:border-b-0", children: [_jsx("span", { className: "text-muted-foreground text-sm", children: shortcut.label }), _jsx(KbdGroup, { children: shortcut.keys.map((key) => (_jsx(Kbd, { children: key }, key))) })] }, shortcut.label))) })] }));
}
