import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs(Label, { htmlFor: "label-badge", className: "gap-2", children: ["Webhook URL", _jsx(Badge, { variant: "success-light", size: "sm", children: "Active" })] }), _jsx(Input, { id: "label-badge", type: "url", defaultValue: "https://api.example.com/webhooks", className: "font-mono text-xs" })] }));
}
