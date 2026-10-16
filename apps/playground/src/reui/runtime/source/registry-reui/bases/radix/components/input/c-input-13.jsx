import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsxs(FieldLabel, { htmlFor: "company", children: ["Company ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "company", placeholder: "Wotso Inc." })] }));
}
