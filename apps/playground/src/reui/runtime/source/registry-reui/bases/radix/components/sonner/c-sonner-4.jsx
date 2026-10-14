import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast("Default notification"), children: "Default" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast.success("Operation completed", {
                    classNames: { icon: "text-green-500" },
                }), children: "Success" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast.error("Operation failed", {
                    classNames: { icon: "text-destructive" },
                }), children: "Error" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast.warning("Proceed with caution", {
                    classNames: { icon: "text-yellow-500" },
                }), children: "Warning" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast.info("System update available", {
                    classNames: { icon: "text-violet-500" },
                }), children: "Info" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-full", onClick: () => toast.loading("Processing..."), children: "Loading" })] }));
}
