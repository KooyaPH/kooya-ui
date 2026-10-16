import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Progress } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto w-full max-w-xs space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Small progress" }), _jsx("span", { className: "text-muted-foreground text-sm", children: "30%" })] }), _jsx(Progress, { value: 30, className: "h-1" })] }));
}
