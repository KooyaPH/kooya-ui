import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FieldLabel, { htmlFor: "api-key", children: "API Key" }), _jsx(Badge, { variant: "success-light", children: "New" })] }), _jsx(Input, { id: "api-key", placeholder: "9f82a1c4b7e243d8a6c9f1e2a3b4c5d6" })] }));
}
