import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: () => toast("File uploaded successfully", {
                description: "report-2025.pdf has been saved to your documents.",
                closeButton: true,
                classNames: {
                    closeButton: "left-auto! -right-4! -top-1!",
                },
            }), variant: "outline", className: "w-fit", children: "Toast with Close Button" }) }));
}
