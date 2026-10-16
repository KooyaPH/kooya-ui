import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: () => toast("Event has been created"), variant: "outline", className: "w-fit", children: "Show Toast" }) }));
}
