import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: () => toast("Message archived", {
                description: "The conversation has been moved to archive.",
                action: {
                    label: "Undo",
                    onClick: () => toast.success("Action undone"),
                },
            }), variant: "outline", className: "w-fit", children: "Toast with Action" }) }));
}
