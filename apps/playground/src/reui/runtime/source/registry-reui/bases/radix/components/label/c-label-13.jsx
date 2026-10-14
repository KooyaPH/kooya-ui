import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs(Label, { htmlFor: "label-status", className: "gap-1.5", children: ["Server Status", _jsxs("span", { className: "relative flex size-2", children: [_jsx("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" }), _jsx("span", { className: "relative inline-flex size-2 rounded-full bg-green-500" })] })] }), _jsx(Input, { id: "label-status", defaultValue: "Online", disabled: true })] }));
}
