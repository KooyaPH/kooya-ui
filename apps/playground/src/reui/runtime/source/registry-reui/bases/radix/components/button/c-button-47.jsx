import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Button, { "aria-label": "Updates (new)", children: ["Updates", _jsx(Badge, { variant: "success", size: "xs", "aria-hidden": "true", children: "New" })] }));
}
