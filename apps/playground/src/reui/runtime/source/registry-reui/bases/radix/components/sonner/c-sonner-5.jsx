import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Quick notice", {
                    description: "Disappears in 2 seconds.",
                    duration: 2000,
                }), children: "2s Duration" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Standard notice", {
                    description: "Disappears in 5 seconds.",
                    duration: 5000,
                }), children: "5s Duration" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Extended notice", {
                    description: "Stays for 10 seconds.",
                    duration: 10000,
                }), children: "10s Duration" }), _jsx(Button, { size: "sm", variant: "outline", className: "col-span-3 w-full", onClick: () => toast("Persistent notice", {
                    description: "This toast stays until dismissed.",
                    duration: Infinity,
                    closeButton: true,
                }), children: "Persistent" })] }));
}
