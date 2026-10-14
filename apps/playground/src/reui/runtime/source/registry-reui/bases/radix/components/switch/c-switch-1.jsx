import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Field, { orientation: "horizontal", children: [_jsx(Switch, { id: "switch-basic" }), _jsx(FieldLabel, { htmlFor: "switch-basic", children: "Airplane Mode" })] }) }));
}
