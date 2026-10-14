import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center justify-center gap-3", children: [_jsxs(Button, { disabled: true, children: [_jsx(Spinner, {}), "Saving..."] }), _jsxs(Button, { variant: "outline", disabled: true, children: [_jsx(Spinner, {}), "Loading"] }), _jsxs(Button, { variant: "secondary", disabled: true, children: [_jsx(Spinner, {}), "Processing"] })] }));
}
