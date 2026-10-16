import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const showToast = () => {
        toast("Event has been created", {
            description: "Monday, January 3rd at 6:00pm",
        });
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: showToast, variant: "outline", className: "w-fit", children: "Show Toast with Description" }) }));
}
