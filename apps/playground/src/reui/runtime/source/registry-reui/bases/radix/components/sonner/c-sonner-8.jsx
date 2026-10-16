import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: () => toast("Confirm deletion", {
                description: "This item will be permanently deleted. This action cannot be undone.",
                action: {
                    label: "Delete",
                    onClick: () => toast.success("Item deleted"),
                },
                cancel: {
                    label: "Cancel",
                    onClick: () => { },
                },
            }), variant: "outline", className: "w-fit", children: "Confirm Action" }) }));
}
