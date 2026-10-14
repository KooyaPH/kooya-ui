import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Top Left", {
                    description: "Notification appears in the top left.",
                    position: "top-left",
                }), children: "Top Left" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Top Center", {
                    description: "Notification appears in the top center.",
                    position: "top-center",
                }), children: "Top Center" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Top Right", {
                    description: "Notification appears in the top right.",
                    position: "top-right",
                }), children: "Top Right" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Bottom Left", {
                    description: "Notification appears in the bottom left.",
                    position: "bottom-left",
                }), children: "Bottom Left" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Bottom Center", {
                    description: "Notification appears in the bottom center.",
                    position: "bottom-center",
                }), children: "Bottom Center" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Bottom Right", {
                    description: "Notification appears in the bottom right.",
                    position: "bottom-right",
                }), children: "Bottom Right" })] }));
}
