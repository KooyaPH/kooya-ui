import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-col items-start justify-start gap-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Switch, { id: "switch-sm", size: "sm" }), _jsx(Label, { htmlFor: "switch-sm", children: "Small Switch" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Switch, { id: "switch-default", size: "default" }), _jsx(Label, { htmlFor: "switch-default", children: "Default Switch" })] })] }));
}
