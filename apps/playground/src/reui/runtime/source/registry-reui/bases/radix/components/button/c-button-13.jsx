import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Button, { disabled: true, children: [_jsx(Spinner, { "aria-hidden": "true" }), "Please wait"] }));
}
