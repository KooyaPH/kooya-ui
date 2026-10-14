import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs(Label, { htmlFor: "label-optional", children: ["Phone number", _jsx("span", { className: "text-muted-foreground", children: "(optional)" })] }), _jsx(Input, { id: "label-optional", type: "tel", placeholder: "+1 (555) 000-0000" })] }));
}
