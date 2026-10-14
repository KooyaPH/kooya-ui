import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex w-full items-center justify-center p-12", children: _jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { className: "text-muted-foreground rounded-lg flex aspect-[2/0.5] w-full max-w-[300px] items-center justify-center border border-dashed text-sm", children: "Right click here" }), _jsx(ContextMenuContent, { children: _jsxs(ContextMenuGroup, { children: [_jsx(ContextMenuItem, { children: "Back" }), _jsx(ContextMenuItem, { disabled: true, children: "Forward" }), _jsx(ContextMenuItem, { children: "Reload" })] }) })] }) }));
}
