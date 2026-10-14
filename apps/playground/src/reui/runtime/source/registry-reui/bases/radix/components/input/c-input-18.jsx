import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx(FieldLabel, { htmlFor: "middle-name", children: "Middle Name" }), _jsx(Badge, { variant: "warning-outline", size: "sm", children: "Optional" })] }), _jsx(Input, { id: "middle-name", placeholder: "Alexander" })] }));
}
