import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldDescription } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Label, { htmlFor: "label-helper", children: "API Key" }), _jsx(FieldDescription, { children: "Your secret key for API authentication" })] }), _jsx(Input, { id: "label-helper", placeholder: "sk_live_...", className: "font-mono" })] }));
}
