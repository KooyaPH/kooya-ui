import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "cn";
function Kbd({ className, ...props }) {
    return (_jsx("kbd", { "data-slot": "kbd", className: cn("cn-kbd pointer-events-none inline-flex items-center justify-center select-none", className), ...props }));
}
function KbdGroup({ className, ...props }) {
    return (_jsx("kbd", { "data-slot": "kbd-group", className: cn("cn-kbd-group inline-flex items-center", className), ...props }));
}
export { Kbd, KbdGroup };
