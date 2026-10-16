import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex w-full items-center justify-center p-12", children: _jsx("div", { className: "grid grid-cols-2 gap-2", children: ["left", "top", "bottom", "right"].map((side) => (_jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { className: "text-muted-foreground rounded-lg flex aspect-[2/0.5] items-center justify-center border border-dashed p-4 text-sm capitalize", children: side }), _jsx(ContextMenuContent, { side: side, children: _jsxs(ContextMenuGroup, { children: [_jsx(ContextMenuItem, { children: "Back" }), _jsx(ContextMenuItem, { children: "Forward" }), _jsx(ContextMenuItem, { children: "Reload" })] }) })] }, side))) }) }));
}
