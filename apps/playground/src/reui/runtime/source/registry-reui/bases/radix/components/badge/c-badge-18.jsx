import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Badge, { size: "sm", children: "Small" }), _jsx(Badge, { size: "default", children: "Default" }), _jsx(Badge, { size: "lg", children: "Large" })] }));
}
