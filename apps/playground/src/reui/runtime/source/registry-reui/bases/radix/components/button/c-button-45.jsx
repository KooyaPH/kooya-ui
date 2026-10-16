import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Button, { variant: "outline", className: "gap-2", "aria-label": "Messages (12)", children: ["Messages", _jsx(Badge, { variant: "destructive-outline", size: "sm", "aria-hidden": "true", children: "12" })] }));
}
